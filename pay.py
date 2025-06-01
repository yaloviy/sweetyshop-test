import hashlib
import json
import time
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import (
    WebAppInfo, 
    ReplyKeyboardMarkup, 
    KeyboardButton,
    LabeledPrice,
    PreCheckoutQuery,
)
from urllib.parse import quote

BOT_TOKEN = ""
PROVIDER_TOKEN = ""

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()




@dp.message(Command("start"))
async def start(message: types.Message):
    first_name = quote(message.from_user.first_name or "")
    last_name = quote(message.from_user.last_name or "")
    username = quote(message.from_user.username or "")
    
    web_app_url = f"https://yaloviy.github.io/sweetyshop-test/catalog?firstname={first_name}&lastname={last_name}&username={username}"

    markup = ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Открыть каталог", web_app=WebAppInfo(url=web_app_url))],
            [KeyboardButton(text="О нас")]
        ],
        resize_keyboard=True
    )
    await message.answer(
        "Добро пожаловать в магазин SweetyShop!✨\nНажмите кнопку ниже, чтобы выбрать товары",
        reply_markup=markup
    )
    

@dp.message(lambda message: message.text == "О нас")
async def send_info(message: types.Message):
    info_text = (
        "🛍️ <strong>SweetyShop</strong> - ваш сладкий рай с 2013 года! 🍫🍬\n\n"
        "Мы – команда опытных кондитеров с 12-летним стажем, создающая изысканные десерты, в которых мастерство сочетается с безупречным вкусом.\n\n"
        "<em>Наши преимущества:</em>\n"
        "• ✨ Собственное производство – готовим только из натуральных ингредиентов\n"
        "• 🧑‍🍳 Ручная работа – каждое лакомство создано с душой и вниманием к деталям\n"
        "• 🎁 Авторские сладости – у нас есть то, чего нет ни у кого другого!\n\n"
        "<em>В приложении вы найдёте:</em>\n"
        "• 📞 Контакты – адреса кафе и телефоны для заказов\n"
        "• 🛒 Товары – от классики до эксклюзивных наборов\n"
        "• 🔒 Гарантии – проверка свежести каждой партии\n\n"
        "С любовью, ваш <strong>SweetyShop!</strong>🍰"
        
    )
    await message.answer(info_text, parse_mode="HTML")

    try:
        await message.delete()
    except Exception as e:
            print(f"{e}")

orders_storage = {}

@dp.message()
async def handle_webapp_data(message: types.Message):
    if message.web_app_data: 
        try:
            data = json.loads(message.web_app_data.data)
            
            total = 0
            
            prices = [
                LabeledPrice(label=f"{product["name"]} x{product['count']}", amount=product["price"] * product['count'] * 100)
                for product in data
            ]
            
            order_data = f"{message.chat.id}_{int(time.time())}"
            
            payload = hashlib.md5(order_data.encode()).hexdigest()
            
            orders_storage[payload] = {
                "products": data,
                "user_id": message.chat.id,
                "order_id": payload
            }
            
            response_text = "📦 Ваш заказ:\n\n"

            for product in data:
                response_text += (
                    f"• {product['name']}\n"
                    f"   Количество: {product['count']}\n"
                    f"   Цена: {product['price']}₽ x {product['count']} = {product['price'] * product['count']}₽\n\n"
                )
                total += product['price'] * product['count']

            response_text += f"💳 *Итого: {total}₽*\n\nНажмите кнопку ниже для оплаты."

            await message.answer(response_text, parse_mode="Markdown")
            
            await bot.send_invoice(
                chat_id=message.chat.id,
                title=f"Оплата заказа №{payload}",
                description=f"Количество товаров: {sum(product['count'] for product in data)}",
                provider_token=PROVIDER_TOKEN,
                currency="RUB",
                prices=prices,
                payload = payload,
                start_parameter="create_invoice_SweetyShop",
                need_name=True,
                need_phone_number=True,
                need_shipping_address=True
            )


        except Exception as e:
            await message.answer(f"Ошибка: {str(e)}")


@dp.pre_checkout_query()
async def pre_checkout_handler(query: PreCheckoutQuery):
    print(f"PreCheckout received: {query}")
    await bot.answer_pre_checkout_query(query.id, ok=True)
    
    order_data = orders_storage[query.invoice_payload]
    products_text = "\n".join(
        f"• {p['name']} ×{p['count']} - {p['price']}₽"
        for p in order_data["products"]
    )
    
    if "TEST" in PROVIDER_TOKEN:
        await bot.send_message(
            chat_id=query.from_user.id,
            text= f"✅ Тестовая Оплата прошла успешно!\n"
                  f"Спасибо за ваш заказ в SweetyShop!\n\n"
                  f"<b>Номер заказа:</b> <code>{query.invoice_payload}</code>\n"
                  f"<b>Сумма:</b> {query.total_amount / 100}₽",
                  parse_mode="HTML"
        )

        admin = "5339434086"
        await bot.send_message(
            chat_id=admin,
            text=f"💰 <b>Новый платеж!</b>\n\n"
                f"👤 Пользователь: <a href='tg://user?id={query.from_user.id}'>{query.from_user.first_name}</a>\n"
                f"📞 Телефон: <code>+{query.order_info.phone_number if query.order_info else 'не указан'}</code>\n\n"
                f"📦 <b>Номер заказа:</b> <code>{query.invoice_payload}</code>\n\n"
                f"🏠 <b>Адрес доставки:</b>\n"
                f"• Страна: {query.order_info.shipping_address.country_code}\n"
                f"• Город: {query.order_info.shipping_address.city}\n"
                f"• Улица: {query.order_info.shipping_address.street_line1}\n"
                f"• Доп. адрес: {query.order_info.shipping_address.street_line2 if query.order_info.shipping_address.street_line2 else 'не указано'}\n"
                f"• Индекс: {query.order_info.shipping_address.post_code}\n\n"
                f"🛍️ <b>Товары:</b>\n{products_text}\n\n"
                f"💳<b>Оплата:</b> {query.total_amount/100}₽",
            parse_mode="HTML"
        )
        
        
        
    
if __name__ == "__main__":
    print("Bot start")
    dp.run_polling(bot)
