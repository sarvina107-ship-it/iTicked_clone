const { Markup } = require('telegraf');
const { t, formatPrice } = require('./i18n');

function getLanguageKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🇷🇺 Русский', 'set_lang_ru'),
      Markup.button.callback('🇺🇿 O\'zbekcha', 'set_lang_uz')
    ]
  ]);
}

function getMainMenuKeyboard(lang) {
  return Markup.keyboard([
    [t(lang, 'btn_afisha'), t(lang, 'btn_search')],
    [t(lang, 'btn_my_tickets'), t(lang, 'btn_about')],
    [t(lang, 'btn_change_lang')]
  ]).resize();
}

function getCategoriesKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'cat_all'), 'cat_all')],
    [
      Markup.button.callback(t(lang, 'cat_concerts'), 'cat_concerts'),
      Markup.button.callback(t(lang, 'cat_theater'), 'cat_theater')
    ],
    [
      Markup.button.callback(t(lang, 'cat_sport'), 'cat_sport'),
      Markup.button.callback(t(lang, 'cat_kids'), 'cat_kids')
    ],
    [Markup.button.callback(t(lang, 'cat_festivals'), 'cat_festivals')]
  ]);
}

function getEventCardKeyboard(lang, eventId) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'btn_buy_ticket'), `buy_${eventId}`)],
    [Markup.button.callback(t(lang, 'btn_categories'), 'show_categories')]
  ]);
}

function getSectorsKeyboard(lang, event) {
  const buttons = event.sectors.map(sector => {
    const name = sector.name[lang] || sector.name.ru;
    const priceStr = formatPrice(sector.price);
    return [Markup.button.callback(`${name} — ${priceStr} ${lang === 'uz' ? "so'm" : 'сум'}`, `sector_${event.id}_${sector.id}`)];
  });

  buttons.push([Markup.button.callback(t(lang, 'btn_back'), `view_${event.id}`)]);
  return Markup.inlineKeyboard(buttons);
}

function getQuantityKeyboard(lang, eventId, sectorId) {
  const rows = [
    [
      Markup.button.callback('1 шт.', `qty_${eventId}_${sectorId}_1`),
      Markup.button.callback('2 шт.', `qty_${eventId}_${sectorId}_2`),
      Markup.button.callback('3 шт.', `qty_${eventId}_${sectorId}_3`)
    ],
    [
      Markup.button.callback('4 шт.', `qty_${eventId}_${sectorId}_4`),
      Markup.button.callback('5 шт.', `qty_${eventId}_${sectorId}_5`),
      Markup.button.callback('6 шт.', `qty_${eventId}_${sectorId}_6`)
    ],
    [Markup.button.callback(t(lang, 'btn_back'), `buy_${eventId}`)]
  ];
  return Markup.inlineKeyboard(rows);
}

function getPhoneRequestKeyboard(lang) {
  return Markup.keyboard([
    [Markup.button.contactRequest(t(lang, 'btn_share_contact'))],
    [t(lang, 'btn_back')]
  ]).resize();
}

function getPaymentKeyboard(lang, orderId) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(t(lang, 'btn_pay_click'), `pay_${orderId}_click`),
      Markup.button.callback(t(lang, 'btn_pay_payme'), `pay_${orderId}_payme`)
    ],
    [
      Markup.button.callback(t(lang, 'btn_pay_cash'), `pay_${orderId}_cash`)
    ],
    [
      Markup.button.callback(t(lang, 'btn_back'), 'cancel_order')
    ]
  ]);
}

function getAdminKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('📊 Статистика', 'admin_stats')],
    [Markup.button.callback('📋 Последние 5 заказов', 'admin_recent_orders')],
    [Markup.button.callback('📢 Рассылка всем пользователям', 'admin_broadcast_prompt')]
  ]);
}

module.exports = {
  getLanguageKeyboard,
  getMainMenuKeyboard,
  getCategoriesKeyboard,
  getEventCardKeyboard,
  getSectorsKeyboard,
  getQuantityKeyboard,
  getPhoneRequestKeyboard,
  getPaymentKeyboard,
  getAdminKeyboard
};
