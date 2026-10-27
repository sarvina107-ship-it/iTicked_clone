require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const { events } = require('./data/events');
const storage = require('./storage');
const { t, formatPrice } = require('./i18n');
const { generateQRCodeBuffer } = require('./qr');
const keyboards = require('./keyboards');

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID ? String(process.env.ADMIN_ID).trim() : null;
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.error('FATAL: BOT_TOKEN is not defined in .env file!');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// User state tracker for booking and admin flows
const userStates = new Map();

// Helper to get user state
function getState(userId) {
  return userStates.get(String(userId)) || {};
}

function setState(userId, state) {
  userStates.set(String(userId), { ...getState(userId), ...state });
}

function clearState(userId) {
  userStates.delete(String(userId));
}

// ----------------------------------------------------
// Express Web Server (Required for Render Web Service)
// ----------------------------------------------------
app.use(express.json());

app.get('/', (req, res) => {
  const stats = storage.getStats();
  res.json({
    status: 'ONLINE',
    service: 'iTicket.uz Telegram Bot Clone',
    timestamp: new Date().toISOString(),
    stats
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// ----------------------------------------------------
// Telegram Bot Handlers
// ----------------------------------------------------

// Middleware: register user in storage
bot.use(async (ctx, next) => {
  if (ctx.from) {
    const existing = storage.getUser(ctx.from.id);
    if (!existing) {
      storage.setUser(ctx.from.id, {
        firstName: ctx.from.first_name || '',
        lastName: ctx.from.last_name || '',
        username: ctx.from.username || '',
        lang: 'ru'
      });
    }
  }
  return next();
});

// /start command
bot.start(async (ctx) => {
  clearState(ctx.from.id);
  const user = storage.getUser(ctx.from.id);
  const lang = user?.lang || 'ru';

  await ctx.reply(
    t(lang, 'welcome'),
    {
      parse_mode: 'Markdown',
      ...keyboards.getMainMenuKeyboard(lang)
    }
  );

  // Also suggest language choice on first start
  if (!user || !user.langChoosen) {
    storage.setUser(ctx.from.id, { langChoosen: true });
    await ctx.reply(
      t(lang, 'choose_lang'),
      keyboards.getLanguageKeyboard()
    );
  }
});

// Language switcher callbacks
bot.action('set_lang_ru', async (ctx) => {
  await ctx.answerCbQuery();
  storage.setUserLanguage(ctx.from.id, 'ru');
  await ctx.reply('🇷🇺 Язык установлен: Русский', keyboards.getMainMenuKeyboard('ru'));
});

bot.action('set_lang_uz', async (ctx) => {
  await ctx.answerCbQuery();
  storage.setUserLanguage(ctx.from.id, 'uz');
  await ctx.reply('🇺🇿 Til o\'rnatildi: O\'zbekcha', keyboards.getMainMenuKeyboard('uz'));
});

// Change language via menu
bot.hears(['🌐 Сменить язык', '🌐 Tilni o\'zgartirish'], async (ctx) => {
  const lang = storage.getUserLanguage(ctx.from.id);
  await ctx.reply(t(lang, 'choose_lang'), keyboards.getLanguageKeyboard());
});

// About & Support
bot.hears(['ℹ️ О нас / Поддержка', 'ℹ️ Biz haqimizda / Aloqa'], async (ctx) => {
  const lang = storage.getUserLanguage(ctx.from.id);
  await ctx.reply(t(lang, 'about_text'), {
    parse_mode: 'Markdown',
    disable_web_page_preview: false
  });
});

// Categories & Afisha
bot.hears(['🎫 Афиша и билеты', '🎫 Afisha va chiptalar'], async (ctx) => {
  clearState(ctx.from.id);
  const lang = storage.getUserLanguage(ctx.from.id);
  await ctx.reply(t(lang, 'cat_title'), keyboards.getCategoriesKeyboard(lang));
});

bot.action('show_categories', async (ctx) => {
  await ctx.answerCbQuery();
  const lang = storage.getUserLanguage(ctx.from.id);
  await ctx.reply(t(lang, 'cat_title'), keyboards.getCategoriesKeyboard(lang));
});

// Handle Category Selection
bot.action(/cat_(all|concerts|theater|sport|kids|festivals)/, async (ctx) => {
  await ctx.answerCbQuery();
  const category = ctx.match[1];
  const lang = storage.getUserLanguage(ctx.from.id);

  let filtered = events;
  if (category !== 'all') {
    filtered = events.filter(e => e.category === category);
  }

  if (filtered.length === 0) {
    return ctx.reply(t(lang, 'event_not_found'));
  }

  for (const event of filtered) {
    const title = event.title[lang] || event.title.ru;
    const desc = event.description[lang] || event.description.ru;
    const venue = event.venue[lang] || event.venue.ru;
    const date = event.date[lang] || event.date.ru;
    const minPrice = Math.min(...event.sectors.map(s => s.price));

    const caption = `🎭 **${title}**\n\n` +
      `📝 ${desc}\n\n` +
      `${t(lang, 'event_date')} ${date}\n` +
      `${t(lang, 'event_venue')} ${venue}\n` +
      `${t(lang, 'event_age')} ${event.ageLimit}\n` +
      `${t(lang, 'event_price_from')} **${formatPrice(minPrice)} ${lang === 'uz' ? "so'm" : 'сум'}**`;

    try {
      await ctx.replyWithPhoto(event.image, {
        caption,
        parse_mode: 'Markdown',
        ...keyboards.getEventCardKeyboard(lang, event.id)
      });
    } catch {
      // Fallback if image load fails
      await ctx.reply(caption, {
        parse_mode: 'Markdown',
        ...keyboards.getEventCardKeyboard(lang, event.id)
      });
    }
  }
});

// View single event
bot.action(/view_(ev-\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const eventId = ctx.match[1];
  const event = events.find(e => e.id === eventId);
  const lang = storage.getUserLanguage(ctx.from.id);

  if (!event) return ctx.reply(t(lang, 'event_not_found'));

  const title = event.title[lang] || event.title.ru;
  const desc = event.description[lang] || event.description.ru;
  const venue = event.venue[lang] || event.venue.ru;
  const date = event.date[lang] || event.date.ru;
  const minPrice = Math.min(...event.sectors.map(s => s.price));

  const caption = `🎭 **${title}**\n\n` +
    `📝 ${desc}\n\n` +
    `${t(lang, 'event_date')} ${date}\n` +
    `${t(lang, 'event_venue')} ${venue}\n` +
    `${t(lang, 'event_age')} ${event.ageLimit}\n` +
    `${t(lang, 'event_price_from')} **${formatPrice(minPrice)} ${lang === 'uz' ? "so'm" : 'сум'}**`;

  await ctx.reply(caption, {
    parse_mode: 'Markdown',
    ...keyboards.getEventCardKeyboard(lang, event.id)
  });
});

// Step 1: Start buying ticket -> choose sector
bot.action(/buy_(ev-\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const eventId = ctx.match[1];
  const event = events.find(e => e.id === eventId);
  const lang = storage.getUserLanguage(ctx.from.id);

  if (!event) return ctx.reply(t(lang, 'event_not_found'));

  setState(ctx.from.id, { eventId, step: 'choose_sector' });

  const title = event.title[lang] || event.title.ru;
  const msg = `🎟 **${title}**\n\n${t(lang, 'event_select_sector')}`;

  await ctx.reply(msg, {
    parse_mode: 'Markdown',
    ...keyboards.getSectorsKeyboard(lang, event)
  });
});

// Step 2: Choose sector -> choose quantity
bot.action(/sector_(ev-\d+)_(.+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const eventId = ctx.match[1];
  const sectorId = ctx.match[2];
  const event = events.find(e => e.id === eventId);
  const lang = storage.getUserLanguage(ctx.from.id);

  if (!event) return ctx.reply(t(lang, 'event_not_found'));

  const sector = event.sectors.find(s => s.id === sectorId);
  if (!sector) return ctx.reply(t(lang, 'event_not_found'));

  const sectorName = sector.name[lang] || sector.name.ru;
  setState(ctx.from.id, {
    eventId,
    sectorId,
    sectorName,
    sectorPrice: sector.price,
    step: 'choose_quantity'
  });

  const msg = t(lang, 'booking_step_sector', {
    sector: sectorName,
    price: formatPrice(sector.price)
  });

  await ctx.reply(msg, {
    parse_mode: 'Markdown',
    ...keyboards.getQuantityKeyboard(lang, eventId, sectorId)
  });
});

// Step 3: Choose quantity -> ask for full name
bot.action(/qty_(ev-\d+)_(.+)_\d+/, async (ctx) => {
  await ctx.answerCbQuery();
  const parts = ctx.match[0].split('_');
  const eventId = parts[1];
  const sectorId = parts[2];
  const quantity = parseInt(parts[3], 10);

  const event = events.find(e => e.id === eventId);
  const lang = storage.getUserLanguage(ctx.from.id);

  if (!event) return ctx.reply(t(lang, 'event_not_found'));
  const sector = event.sectors.find(s => s.id === sectorId);
  if (!sector) return ctx.reply(t(lang, 'event_not_found'));

  const totalPrice = sector.price * quantity;
  const sectorName = sector.name[lang] || sector.name.ru;

  setState(ctx.from.id, {
    eventId,
    sectorId,
    sectorName,
    sectorPrice: sector.price,
    quantity,
    totalPrice,
    step: 'waiting_for_name'
  });

  const msg = t(lang, 'booking_step_qty', {
    qty: quantity,
    total: formatPrice(totalPrice)
  });

  await ctx.reply(msg, { parse_mode: 'Markdown' });
});

// Step 4 & 5: Handle text messages (Name, Phone number, Search, Admin Broadcast)
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const lang = storage.getUserLanguage(ctx.from.id);
  const state = getState(ctx.from.id);

  // Check navigation button clicks first
  if (text === '⬅️ Назад в меню' || text === '⬅️ Asosiy menyuga') {
    clearState(ctx.from.id);
    return ctx.reply(t(lang, 'main_menu'), keyboards.getMainMenuKeyboard(lang));
  }

  // Admin Broadcast Text
  if (state.step === 'admin_waiting_broadcast' && String(ctx.from.id) === ADMIN_ID) {
    clearState(ctx.from.id);
    const users = storage.getAllUsers();
    let sentCount = 0;
    for (const u of users) {
      try {
        await bot.telegram.sendMessage(u.userId, `📢 **Оповещение iTicket.uz:**\n\n${text}`, { parse_mode: 'Markdown' });
        sentCount++;
      } catch (e) {
        // user may have blocked bot
      }
    }
    return ctx.reply(`✅ Рассылка успешно отправлена ${sentCount} пользователям!`);
  }

  // Search Step
  if (state.step === 'waiting_for_search') {
    clearState(ctx.from.id);
    const query = text.toLowerCase();
    const results = events.filter(e => {
      const ruTitle = (e.title.ru || '').toLowerCase();
      const uzTitle = (e.title.uz || '').toLowerCase();
      const ruDesc = (e.description.ru || '').toLowerCase();
      const uzDesc = (e.description.uz || '').toLowerCase();
      const venue = (e.venue.ru || '').toLowerCase();
      return ruTitle.includes(query) || uzTitle.includes(query) || ruDesc.includes(query) || uzDesc.includes(query) || venue.includes(query);
    });

    if (results.length === 0) {
      return ctx.reply(t(lang, 'search_empty'));
    }

    await ctx.reply(`🔎 Найдено мероприятий: ${results.length}`);
    for (const event of results) {
      const title = event.title[lang] || event.title.ru;
      const desc = event.description[lang] || event.description.ru;
      const venue = event.venue[lang] || event.venue.ru;
      const date = event.date[lang] || event.date.ru;
      const minPrice = Math.min(...event.sectors.map(s => s.price));

      const caption = `🎭 **${title}**\n\n` +
        `📝 ${desc}\n\n` +
        `${t(lang, 'event_date')} ${date}\n` +
        `${t(lang, 'event_venue')} ${venue}\n` +
        `${t(lang, 'event_price_from')} **${formatPrice(minPrice)} ${lang === 'uz' ? "so'm" : 'сум'}**`;

      await ctx.reply(caption, {
        parse_mode: 'Markdown',
        ...keyboards.getEventCardKeyboard(lang, event.id)
      });
    }
    return;
  }

  // Booking Flow: Waiting for Name
  if (state.step === 'waiting_for_name') {
    setState(ctx.from.id, {
      fullName: text,
      step: 'waiting_for_phone'
    });

    const msg = t(lang, 'booking_step_phone', { name: text });
    return ctx.reply(msg, keyboards.getPhoneRequestKeyboard(lang));
  }

  // Booking Flow: Waiting for Phone (typed manually)
  if (state.step === 'waiting_for_phone') {
    const phone = text;
    return finalizeOrderDraft(ctx, phone);
  }
});

// Booking Flow: Phone shared via contact button
bot.on('contact', async (ctx) => {
  const state = getState(ctx.from.id);
  if (state.step === 'waiting_for_phone' && ctx.message.contact) {
    const phone = ctx.message.contact.phone_number;
    return finalizeOrderDraft(ctx, phone);
  }
});

// Finalize order draft & show payment options
async function finalizeOrderDraft(ctx, phone) {
  const lang = storage.getUserLanguage(ctx.from.id);
  const state = getState(ctx.from.id);
  const event = events.find(e => e.id === state.eventId);

  if (!event) {
    clearState(ctx.from.id);
    return ctx.reply(t(lang, 'event_not_found'), keyboards.getMainMenuKeyboard(lang));
  }

  const draftId = `DR-${Date.now().toString().slice(-6)}`;
  setState(ctx.from.id, {
    phone,
    draftId,
    step: 'waiting_for_payment'
  });

  const eventTitle = event.title[lang] || event.title.ru;
  const eventVenue = event.venue[lang] || event.venue.ru;
  const eventDate = event.date[lang] || event.date.ru;

  const msg = t(lang, 'booking_step_payment', {
    orderId: draftId,
    event: eventTitle,
    date: eventDate,
    venue: eventVenue,
    sector: state.sectorName,
    qty: state.quantity,
    total: formatPrice(state.totalPrice),
    name: state.fullName,
    phone
  });

  // Switch back to normal menu keyboard and show payment inline buttons
  await ctx.reply(t(lang, 'main_menu'), keyboards.getMainMenuKeyboard(lang));
  await ctx.reply(msg, {
    parse_mode: 'Markdown',
    ...keyboards.getPaymentKeyboard(lang, draftId)
  });
}

// Handle payment button click
bot.action(/pay_(DR-\d+)_(click|payme|cash)/, async (ctx) => {
  await ctx.answerCbQuery();
  const draftId = ctx.match[1];
  const method = ctx.match[2];
  const lang = storage.getUserLanguage(ctx.from.id);
  const state = getState(ctx.from.id);
  const event = events.find(e => e.id === state.eventId);

  if (!event || state.draftId !== draftId) {
    return ctx.reply(t(lang, 'event_not_found'));
  }

  const eventTitle = event.title[lang] || event.title.ru;
  const eventVenue = event.venue[lang] || event.venue.ru;
  const eventDate = event.date[lang] || event.date.ru;

  let paymentMethodName = 'Click Uzbekistan';
  if (method === 'payme') paymentMethodName = 'Payme';
  if (method === 'cash') paymentMethodName = 'Оплата в кассе (Бронь)';

  // Create real ticket order in storage
  const order = storage.createOrder({
    userId: ctx.from.id,
    username: ctx.from.username || '',
    name: state.fullName,
    phone: state.phone,
    eventId: event.id,
    eventTitle,
    venue: eventVenue,
    date: eventDate,
    sector: state.sectorName,
    quantity: state.quantity,
    totalPrice: state.totalPrice,
    paymentMethod: paymentMethodName
  });

  clearState(ctx.from.id);

  // Generate QR Code for entrance
  const qrPayload = `ITICKET:${order.orderId}:${order.userId}:${order.eventId}:${order.quantity}TK`;
  const qrBuffer = await generateQRCodeBuffer(qrPayload);

  // Success message to user
  const successCaption = `${t(lang, 'order_success_title')}\n\n` +
    t(lang, 'order_success_text', {
      orderId: order.orderId,
      event: eventTitle,
      date: eventDate,
      venue: eventVenue,
      sector: state.sectorName,
      qty: state.quantity,
      total: formatPrice(order.totalPrice)
    });

  await ctx.replyWithPhoto({ source: qrBuffer }, {
    caption: successCaption,
    parse_mode: 'Markdown'
  });

  // Notify Admin (ID 1633967629)
  if (ADMIN_ID) {
    try {
      const adminMsg = t('ru', 'admin_new_order', {
        orderId: order.orderId,
        name: order.name,
        phone: order.phone,
        username: order.username || 'не указан',
        userId: order.userId,
        event: order.eventTitle,
        date: order.date,
        sector: order.sector,
        qty: order.quantity,
        total: formatPrice(order.totalPrice),
        paymentMethod: paymentMethodName
      });

      await bot.telegram.sendMessage(ADMIN_ID, adminMsg, { parse_mode: 'Markdown' });
    } catch (adminErr) {
      console.error('Failed to notify admin:', adminErr.message);
    }
  }
});

// Cancel Order
bot.action('cancel_order', async (ctx) => {
  await ctx.answerCbQuery();
  clearState(ctx.from.id);
  const lang = storage.getUserLanguage(ctx.from.id);
  await ctx.reply(t(lang, 'main_menu'), keyboards.getMainMenuKeyboard(lang));
});

// Search command / button
bot.hears(['🔍 Поиск мероприятий', '🔍 Tadbirlarni qidirish'], async (ctx) => {
  const lang = storage.getUserLanguage(ctx.from.id);
  setState(ctx.from.id, { step: 'waiting_for_search' });
  await ctx.reply(t(lang, 'search_prompt'));
});

// My Tickets
bot.hears(['🎟 Мои билеты', '🎟 Mening chiptalarim'], async (ctx) => {
  clearState(ctx.from.id);
  const lang = storage.getUserLanguage(ctx.from.id);
  const orders = storage.getUserOrders(ctx.from.id);

  if (orders.length === 0) {
    return ctx.reply(t(lang, 'my_tickets_empty'), { parse_mode: 'Markdown' });
  }

  await ctx.reply(t(lang, 'my_tickets_title'), { parse_mode: 'Markdown' });

  for (const order of orders) {
    const qrPayload = `ITICKET:${order.orderId}:${order.userId}:${order.eventId}:${order.quantity}TK`;
    const qrBuffer = await generateQRCodeBuffer(qrPayload);

    const caption = `🎫 **Билет #{orderId}**\n\n` +
      `🎭 Мероприятие: **{event}**\n` +
      `🗓 Дата: {date}\n` +
      `📍 Локация: {venue}\n` +
      `🎫 Сектор: {sector} ({qty} шт.)\n` +
      `💰 Сумма: {total} сум\n` +
      `💳 Оплата: {paymentMethod}\n` +
      `📅 Оформлен: {createdAt}`;

    const text = caption
      .replace('{orderId}', order.orderId)
      .replace('{event}', order.eventTitle)
      .replace('{date}', order.date)
      .replace('{venue}', order.venue)
      .replace('{sector}', order.sector)
      .replace('{qty}', order.quantity)
      .replace('{total}', formatPrice(order.totalPrice))
      .replace('{paymentMethod}', order.paymentMethod)
      .replace('{createdAt}', new Date(order.createdAt).toLocaleString('ru-RU'));

    await ctx.replyWithPhoto({ source: qrBuffer }, {
      caption: text,
      parse_mode: 'Markdown'
    });
  }
});

// ----------------------------------------------------
// Admin Panel (/admin)
// ----------------------------------------------------
bot.command('admin', async (ctx) => {
  if (String(ctx.from.id) !== ADMIN_ID) {
    return ctx.reply('⛔️ У вас нет прав доступа к панели администратора.');
  }

  await ctx.reply(
    '👑 **Панель управления iTicket.uz Admin**\n\nВыберите действие:',
    {
      parse_mode: 'Markdown',
      ...keyboards.getAdminKeyboard()
    }
  );
});

bot.action('admin_stats', async (ctx) => {
  if (String(ctx.from.id) !== ADMIN_ID) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.answerCbQuery();

  const stats = storage.getStats();
  const msg = `📊 **Статистика iTicket.uz Bot:**\n\n` +
    `👥 Всего пользователей: **${stats.totalUsers}**\n` +
    `🎟 Всего оформлено заказов: **${stats.totalOrders}**\n` +
    `💰 Общая сумма продаж: **${formatPrice(stats.totalRevenue)} сум**`;

  await ctx.reply(msg, { parse_mode: 'Markdown' });
});

bot.action('admin_recent_orders', async (ctx) => {
  if (String(ctx.from.id) !== ADMIN_ID) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.answerCbQuery();

  const orders = storage.getAllOrders().slice(-5).reverse();
  if (orders.length === 0) {
    return ctx.reply('Пока нет заказов.');
  }

  let text = '📋 **Последние заказы:**\n\n';
  for (const o of orders) {
    text += `🔹 **#${o.orderId}** — ${o.name} (${o.phone})\n` +
      `   Событие: ${o.eventTitle}\n` +
      `   Сектор: ${o.sector} (${o.quantity} шт.) — ${formatPrice(o.totalPrice)} сум\n` +
      `   Дата: ${new Date(o.createdAt).toLocaleString('ru-RU')}\n\n`;
  }

  await ctx.reply(text, { parse_mode: 'Markdown' });
});

bot.action('admin_broadcast_prompt', async (ctx) => {
  if (String(ctx.from.id) !== ADMIN_ID) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.answerCbQuery();

  setState(ctx.from.id, { step: 'admin_waiting_broadcast' });
  await ctx.reply('📢 Введите текст сообщения для рассылки всем пользователям бота:');
});

// ----------------------------------------------------
// Error handling & Server Launch
// ----------------------------------------------------
bot.catch((err, ctx) => {
  console.error(`Error for user ${ctx.from?.id}:`, err);
});

// Start Express Web Server
app.listen(PORT, () => {
  console.log(`🌐 Web server is running on port ${PORT}`);
});

// Launch Telegram Bot
bot.launch().then(() => {
  console.log('🤖 iTicket.uz Telegram Bot successfully started!');
  console.log(`👑 Admin ID: ${ADMIN_ID}`);
}).catch(err => {
  console.error('Failed to start bot:', err);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
