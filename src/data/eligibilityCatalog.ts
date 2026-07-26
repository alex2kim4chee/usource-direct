import { EMAIL_ADDRESS } from './landingData';

export type EligibilityStatus = 'approved' | 'review' | 'restricted' | 'rejected';
export type EligibilityResultStatus = EligibilityStatus | 'unknown';

export interface EligibilityCategory {
  id: string;
  status: EligibilityStatus;
  title: string;
  badgeText: string;
  description: string;
  items: string[];
  aliases: string[];
  limits?: {
    unitValueUsd?: number;
    maxUnitsPerRecipient?: number;
    maxWeightKgPerRecipient?: number;
    note: string;
  };
}

export interface EligibilityMatch {
  category: EligibilityCategory;
  matchedTerm: string;
  score: number;
}

export interface EligibilityCheckResult {
  status: EligibilityResultStatus;
  title: string;
  details: string;
  badge: string;
  matchedCategory?: string;
  matchedTerm?: string;
  mailtoHref?: string;
}

const statusPriority: Record<EligibilityStatus, number> = {
  approved: 1,
  review: 2,
  restricted: 3,
  rejected: 4,
};

const stopWords = new Set([
  'для',
  'без',
  'или',
  'под',
  'над',
  'при',
  'the',
  'and',
  'with',
  'from',
  'товар',
  'товары',
  'набор',
  'аксессуар',
  'аксессуары',
]);

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/&/g, ' and ')
    .replace(/[^a-zа-я0-9]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const getTokens = (value: string) =>
  normalizeSearchText(value)
    .split(' ')
    .filter((token) => token.length > 2 && !stopWords.has(token));

const extractUsdPrices = (value: string) => {
  const prices: number[] = [];
  const patterns = [
    /(?:\$|us\$|usd|долл\.?|доллар[а-я]*)\s*(\d{2,6}(?:[.,]\d{1,2})?)/gi,
    /(\d{2,6}(?:[.,]\d{1,2})?)\s*(?:\$|us\$|usd|долл\.?|доллар[а-я]*)/gi,
  ];

  for (const pattern of patterns) {
    for (const match of value.matchAll(pattern)) {
      const rawPrice = match[1]?.replace(',', '.');
      const price = rawPrice ? Number(rawPrice) : NaN;
      if (Number.isFinite(price)) prices.push(price);
    }
  }

  return prices;
};

const extractQuantities = (value: string) => {
  const quantities: number[] = [];
  const patterns = [
    /(?:qty|quantity|кол-?во|количество)\s*[:=]?\s*(\d{1,3})/gi,
    /(\d{1,3})\s*(?:шт\.?|штук[аи]?|ед\.?|единиц[аы]?|pcs?|pieces?|units?)/gi,
    /(?:x|х|×)\s*(\d{1,3})/gi,
    /(\d{1,3})\s*(?:x|х|×)\b/gi,
  ];

  for (const pattern of patterns) {
    for (const match of value.matchAll(pattern)) {
      const quantity = Number(match[1]);
      if (Number.isFinite(quantity)) quantities.push(quantity);
    }
  }

  return quantities;
};

const extractWeightsKg = (value: string) => {
  const weights: number[] = [];
  const kgPattern = /(\d{1,4}(?:[.,]\d{1,3})?)\s*(?:кг|kg|kilograms?)(?=$|[^a-zа-я0-9])/giu;
  const gramPattern = /(\d{2,6}(?:[.,]\d{1,2})?)\s*(?:грамм[а-я]*|гр\.?|г|grams?|gr|g)(?=$|[^a-zа-я0-9])/giu;

  for (const match of value.matchAll(kgPattern)) {
    const rawWeight = match[1]?.replace(',', '.');
    const weight = rawWeight ? Number(rawWeight) : NaN;
    if (Number.isFinite(weight)) weights.push(weight);
  }

  for (const match of value.matchAll(gramPattern)) {
    const rawWeight = match[1]?.replace(',', '.');
    const weight = rawWeight ? Number(rawWeight) / 1000 : NaN;
    if (Number.isFinite(weight)) weights.push(weight);
  }

  return weights;
};

const getQuerySignals = (query: string) => ({
  highestUsdPrice: Math.max(0, ...extractUsdPrices(query)),
  highestQuantity: Math.max(0, ...extractQuantities(query)),
  highestWeightKg: Math.max(0, ...extractWeightsKg(query)),
});

const scoreTerm = (query: string, term: string) => {
  const normalizedTerm = normalizeSearchText(term);
  if (!query || !normalizedTerm) return 0;
  if (normalizedTerm === query) return 120;
  if (normalizedTerm.includes(query)) return 95 + Math.min(query.length, 24);
  if (query.includes(normalizedTerm) && normalizedTerm.length > 3) {
    return 82 + Math.min(normalizedTerm.length, 20);
  }

  const queryTokens = getTokens(query);
  const termTokens = getTokens(normalizedTerm);
  if (!queryTokens.length || !termTokens.length) return 0;

  const matchedTokens = queryTokens.filter((queryToken) =>
    termTokens.some(
      (termToken) =>
        termToken === queryToken ||
        termToken.includes(queryToken) ||
        queryToken.includes(termToken)
    )
  );

  const coverage = matchedTokens.length / queryTokens.length;
  if (coverage >= 1) return 70 + matchedTokens.length * 6;
  if (coverage >= 0.67 && matchedTokens.length >= 2) return 52 + matchedTokens.length * 5;
  return 0;
};

export const buildEligibilityMailto = (query: string) => {
  const product = query.trim() || 'новая категория товара';
  const subject = `Проверка товара: ${product}`;
const body = [
    'Здравствуйте, USource Direct.',
    '',
    `Хочу проверить товар/категорию: ${product}`,
    '',
    'Ссылка на товар в США:',
    '',
    'Цена товара в США за единицу:',
    '',
    'Количество единиц на получателя:',
    '',
    'Канал продаж / аудитория:',
    '',
    'Желаемая розничная цена:',
    '',
    'Пожалуйста, подскажите предварительный статус: подходит, требует проверки, ограничен или запрещен.',
  ].join('\n');

  return `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const makeUnknownResult = (query: string): EligibilityCheckResult => ({
  status: 'unknown',
  title: 'Статус: Не найдено в списках',
  details:
    'Товар не обнаружен ни в одном из наших предварительных списков. Это не означает, что он подходит или запрещен: нужна ручная проверка конкретной ссылки, состава, цены за единицу, продавца и маршрута доставки.',
  badge: 'Отправить на проверку',
  mailtoHref: buildEligibilityMailto(query),
});

const formatCategoryLimit = (category: EligibilityCategory) => {
  if (!category.limits) return '';

  const parts = [];
  if (category.limits.unitValueUsd) {
    parts.push(`до $${category.limits.unitValueUsd} за единицу`);
  }
  if (category.limits.maxUnitsPerRecipient) {
    parts.push(`не больше ${category.limits.maxUnitsPerRecipient} единиц в одни руки`);
  }
  if (category.limits.maxWeightKgPerRecipient) {
    parts.push(`не более ${category.limits.maxWeightKgPerRecipient} кг на 1 получателя`);
  }

  return parts.join(', ');
};

const makeLimitResult = (
  query: string,
  match: EligibilityMatch,
  violations: string[]
): EligibilityCheckResult => ({
  status: 'restricted',
  title: 'Статус: Ограничено лимитом категории',
  details: `Для этой категории в частной отправке действует лимит: ${formatCategoryLimit(
    match.category
  )}. ${violations.join(' ')} Нужен отдельный маршрут или ручное подтверждение.`,
  badge: 'Превышен лимит',
  matchedCategory: match.category.title,
  matchedTerm: match.matchedTerm,
  mailtoHref: buildEligibilityMailto(query),
});

const getLimitResult = (query: string, match: EligibilityMatch) => {
  const { limits } = match.category;
  if (!limits) return null;

  const signals = getQuerySignals(query);
  const violations: string[] = [];

  if (limits.unitValueUsd && signals.highestUsdPrice > limits.unitValueUsd) {
    violations.push(
      `В запросе обнаружена цена $${signals.highestUsdPrice.toFixed(2)} за единицу.`
    );
  }

  if (
    limits.maxUnitsPerRecipient &&
    signals.highestQuantity > limits.maxUnitsPerRecipient
  ) {
    violations.push(
      `В запросе обнаружено количество ${signals.highestQuantity}, что выше лимита.`
    );
  }

  if (
    limits.maxWeightKgPerRecipient &&
    signals.highestWeightKg > limits.maxWeightKgPerRecipient
  ) {
    violations.push(
      `В запросе обнаружен вес ${signals.highestWeightKg.toFixed(2)} кг, что выше лимита.`
    );
  }

  return violations.length ? makeLimitResult(query, match, violations) : null;
};

const makeResult = (
  match: EligibilityMatch,
  query: string
): EligibilityCheckResult => {
  const { category, matchedTerm } = match;
  const statusCopy: Record<EligibilityStatus, Pick<EligibilityCheckResult, 'title' | 'details'>> = {
    approved: {
      title: 'Статус: Одобрен для пилота',
      details:
        'Категория обычно подходит для частной отправки: понятная потребительская логистика, низкий регуляторный риск и возможность штучного выкупа после заказа.',
    },
    review: {
      title: 'Статус: Требует уточнения',
      details:
        'Категория требует индивидуального анализа: состав, сертификация, батареи, габариты, хрупкость или требования перевозчика могут изменить решение.',
    },
    restricted: {
      title: 'Статус: Ограничено',
      details:
        'Категория может подпадать под транспортные, таможенные, экспортные или документарные ограничения. Не запускаем без ручной проверки и подтверждения условий.',
    },
    rejected: {
      title: 'Статус: Не подходит',
      details:
        'Категория имеет высокий риск запрета, санкционного контроля, dual-use, опасного груза или иных ограничений. Для модели частной отправки по умолчанию не принимается.',
    },
  };

  const details =
    category.id === 'brand-luxury' || category.id === 'apparel-footwear'
      ? 'Бренд сам по себе не является причиной для отказа в модели частной отправки. Проверяем оригинальность товара, продавца и главное условие: цена до $300 за единицу.'
      : statusCopy[category.status].details;
  const limitText = formatCategoryLimit(category);
  const detailsWithLimit = limitText ? `${details} Лимит категории: ${limitText}.` : details;

  return {
    status: category.status,
    title: statusCopy[category.status].title,
    details: `${detailsWithLimit} Совпадение: ${matchedTerm}.`,
    badge: category.badgeText,
    matchedCategory: category.title,
    matchedTerm,
    mailtoHref: buildEligibilityMailto(query),
  };
};

export const ELIGIBILITY_CATEGORIES: EligibilityCategory[] = [
  {
    id: 'home-storage',
    status: 'approved',
    title: 'Дом, хранение и организация пространства',
    badgeText: 'Одобрено по умолчанию',
    description: 'Низкорисковые товары для дома без электроники, жидкостей и специальных разрешений.',
    items: ['органайзеры', 'контейнеры', 'коробки для хранения', 'вешалки', 'полки', 'корзины'],
    aliases: ['home organization', 'storage bins', 'drawer organizer', 'closet organizer', 'кабельный органайзер', 'органайзер для косметики', 'органайзер для кухни', 'органайзер для обуви', 'storage box'],
  },
  {
    id: 'home-decor',
    status: 'approved',
    title: 'Декор, интерьер и lifestyle-аксессуары',
    badgeText: 'Одобрено по умолчанию',
    description: 'Интерьерные предметы без хрупких конструкций, ценных материалов и культурных ограничений.',
    items: ['постеры', 'рамки', 'свечные держатели без свечей', 'декоративные подушки', 'настенные таблички', 'вазы из пластика или металла'],
    aliases: ['home decor', 'wall art', 'poster', 'frame', 'decorative pillow', 'interior decor', 'настенный декор', 'декоративная статуэтка', 'подсвечник'],
  },
  {
    id: 'kitchen-manual',
    status: 'approved',
    title: 'Кухонные аксессуары без сложной электроники',
    badgeText: 'Одобрено по умолчанию',
    description: 'Ручные кухонные принадлежности и аксессуары без нагревателей, батарей и контакта с опасными веществами.',
    items: ['лопатки', 'формы для выпечки', 'мерные ложки', 'силиконовые коврики', 'контейнеры для еды', 'разделочные доски'],
    aliases: ['kitchen tools', 'baking mold', 'measuring spoon', 'silicone mat', 'food container', 'cutting board', 'кухонная утварь', 'терка', 'венчик', 'шеф нож кухонный'],
  },
  {
    id: 'crafts-hobby',
    status: 'approved',
    title: 'Хобби, творчество и рукоделие',
    badgeText: 'Одобрено по умолчанию',
    description: 'Материалы и инструменты для творчества без растворителей, аэрозолей и опасной химии.',
    items: ['кисти', 'пряжа', 'скетчбуки', 'наборы для вышивки', 'маркеры на водной основе', 'модели для сборки без моторов'],
    aliases: ['craft kit', 'art supplies', 'paint brushes', 'yarn', 'embroidery kit', 'scrapbooking', 'скрапбукинг', 'акварельные кисти', 'маркеры', 'миниатюры'],
  },
  {
    id: 'stationery-gifts',
    status: 'approved',
    title: 'Канцелярия, подарочные наборы и офисные мелочи',
    badgeText: 'Одобрено по умолчанию',
    description: 'Небольшие товары для письма, подарков и рабочего стола без электроники и жидкостей.',
    items: ['ежедневники', 'ручки', 'планеры', 'наклейки', 'закладки', 'подарочные коробки'],
    aliases: ['stationery', 'planner', 'notebook', 'premium pen', 'stickers', 'bookmark', 'journal', 'bullet journal', 'канцелярия премиум', 'подарочный набор'],
  },
  {
    id: 'textile-softgoods',
    status: 'approved',
    title: 'Текстиль и мягкие товары',
    badgeText: 'Одобрено по умолчанию',
    description: 'Тканевые consumer goods без санитарных, медицинских или детских safety claims.',
    items: ['пледы', 'наволочки', 'полотенца', 'чехлы', 'салфетки', 'тканевые сумки'],
    aliases: ['blanket', 'throw blanket', 'pillow cover', 'towel', 'table runner', 'fabric bag', 'текстиль', 'плед', 'полотенце', 'наволочка'],
  },
  {
    id: 'travel-bags',
    status: 'approved',
    title: 'Путешествия, сумки и everyday carry',
    badgeText: 'Одобрено по умолчанию',
    description: 'Сумки и аксессуары без встроенных батарей, GPS-трекеров и признаков контрафакта.',
    items: ['рюкзаки', 'несессеры', 'упаковочные кубы', 'чехлы для чемодана', 'багажные бирки', 'кошельки'],
    aliases: ['backpack', 'travel pouch', 'packing cubes', 'luggage tag', 'wallet', 'edc pouch', 'travel organizer', 'сумка', 'рюкзак', 'органайзер для путешествий'],
  },
  {
    id: 'apparel-footwear',
    status: 'approved',
    title: 'Одежда, обувь и fashion-бренды до $300',
    badgeText: 'Частная отправка до $300',
    description: 'Бренд сам по себе не является причиной для отказа; проверяем оригинальность и лимит стоимости за единицу.',
    items: ['брендовая одежда', 'брендовая обувь', 'кроссовки', 'худи', 'головные уборы', 'аксессуары до $300'],
    aliases: ['clothing', 'hoodie', 'sneakers', 't shirt', 'cap', 'socks', 'streetwear', 'nike shoes', 'nike sneakers', 'adidas shoes', 'обувь nike', 'adidas обувь', 'одежда из США'],
    limits: {
      unitValueUsd: 300,
      note: 'Брендовые fashion-товары допускаются в частной отправке при цене до $300 за единицу.',
    },
  },
  {
    id: 'pet-accessories',
    status: 'approved',
    title: 'Товары для животных без кормов и ветпрепаратов',
    badgeText: 'Одобрено по умолчанию',
    description: 'Аксессуары для питомцев без еды, лекарств, биоматериалов и ветеринарных claims.',
    items: ['поводки', 'ошейники', 'игрушки', 'лежанки', 'миски', 'сумки-переноски'],
    aliases: ['pet accessories', 'dog leash', 'cat toy', 'pet bed', 'pet bowl', 'harness', 'амуниция для собак', 'игрушка для кошки', 'лежанка'],
  },
  {
    id: 'books-education',
    status: 'approved',
    title: 'Книги, обучение и печатные материалы',
    badgeText: 'Одобрено по умолчанию',
    description: 'Печатные материалы без запрещенного, экстремистского, взрослого или санкционного содержания.',
    items: ['книги', 'учебники', 'рабочие тетради', 'карточки', 'настольные учебные материалы', 'плакаты'],
    aliases: ['book', 'textbook', 'workbook', 'flash cards', 'learning cards', 'educational poster', 'книга', 'учебник', 'карточки для обучения'],
  },
  {
    id: 'games-collectibles',
    status: 'approved',
    title: 'Настольные игры, коллекционирование и фан-мерч',
    badgeText: 'Одобрено по умолчанию',
    description: 'Consumer collectibles без контрафакта, азартных элементов, батарей и брендовых нарушений.',
    items: ['настольные игры', 'пазлы', 'карточные игры без gambling', 'фигурки', 'коллекционные карточки', 'комиксы'],
    aliases: ['board game', 'puzzle', 'trading cards', 'collectible figure', 'comic book', 'lego set', 'funko pop', 'настолка', 'пазл'],
  },
  {
    id: 'simple-accessories',
    status: 'approved',
    title: 'Простые аксессуары для техники без батарей',
    badgeText: 'Одобрено по умолчанию',
    description: 'Низкорисковые аксессуары без радио, памяти, шифрования, аккумуляторов и активной электроники.',
    items: ['чехлы для телефона', 'кабели', 'подставки', 'защитные стекла', 'ремешки для часов без электроники', 'сумки для ноутбука'],
    aliases: ['phone case', 'screen protector', 'laptop sleeve', 'charging cable', 'usb cable', 'watch band', 'tablet stand', 'чехол iphone', 'защитное стекло'],
  },
  {
    id: 'cosmetics',
    status: 'review',
    title: 'Косметика, уход и beauty-продукты',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Нужна проверка состава, объема, жидкости, спирта, SPF/medical claims и требований перевозчика.',
    items: ['кремы', 'сыворотки', 'лосьоны', 'маски', 'шампуни', 'декоративная косметика'],
    aliases: ['cosmetics', 'skin care', 'serum', 'face cream', 'makeup', 'lotion', 'shampoo', 'lipstick', 'mascara', 'крем для лица', 'косметика', 'уходовая косметика'],
  },
  {
    id: 'children-products',
    status: 'review',
    title: 'Детские товары, игрушки и safety-products',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются возрастные ограничения, безопасность материалов, маркировка, мелкие детали и сертификация.',
    items: ['игрушки для детей', 'детская посуда', 'рюкзаки для детей', 'развивающие наборы', 'детские аксессуары', 'товары для младенцев'],
    aliases: ['kids toys', 'baby products', 'toddler toy', 'infant accessories', 'children safety', 'детские игрушки', 'игрушка 3+', 'детская бутылочка', 'прорезыватель'],
  },
  {
    id: 'portable-electronics',
    status: 'approved',
    title: 'Портативная электроника и гаджеты',
    badgeText: 'До $2500 / 2 ед.',
    description: 'Бытовая электроника допускается для частной отправки при лимите стоимости и количества на получателя.',
    items: ['смартфоны', 'ноутбуки', 'планшеты', 'наушники', 'умные часы', 'малые гаджеты'],
    aliases: ['electronics', 'gadget', 'headphones', 'earbuds', 'smart watch', 'fitness tracker', 'bluetooth speaker', 'smartphone', 'phone', 'iphone', 'laptop', 'macbook', 'ipad', 'tablet', 'электроника', 'айфон', 'ноутбук', 'планшет', 'airpods', 'умные часы'],
    limits: {
      unitValueUsd: 2500,
      maxUnitsPerRecipient: 2,
      note: 'Электроника допускается до $2500 за единицу и не больше 2 единиц в одни руки.',
    },
  },
  {
    id: 'brand-luxury',
    status: 'approved',
    title: 'Брендовые consumer goods и premium accessories до $300',
    badgeText: 'Частная отправка до $300',
    description: 'Оригинальные брендовые товары допускаются в частной отправке при соблюдении лимита стоимости за единицу.',
    items: ['брендовые аксессуары', 'premium fashion', 'лимитированные коллекции', 'designer goods до $300', 'редкие коллекционные товары до $300', 'брендовые сумки до $300'],
    aliases: ['luxury brand', 'designer bag', 'limited edition sneakers', 'premium watch', 'брендовая сумка', 'louis vuitton', 'gucci', 'supreme', 'jordan limited', 'брендовый аксессуар'],
    limits: {
      unitValueUsd: 300,
      note: 'Оригинальные брендовые товары допускаются в частной отправке при цене до $300 за единицу.',
    },
  },
  {
    id: 'fragile-items',
    status: 'review',
    title: 'Хрупкие товары и сложная упаковка',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются риск повреждения, упаковка, страхование, габариты и правила возврата.',
    items: ['стеклянные предметы', 'керамика', 'зеркала', 'светильники', 'коллекционные витрины', 'интерьерные конструкции'],
    aliases: ['glass item', 'ceramic vase', 'mirror', 'lamp', 'fragile decor', 'glassware', 'хрупкий товар', 'керамическая кружка', 'зеркало'],
  },
  {
    id: 'sports-gear',
    status: 'review',
    title: 'Спортивная экипировка и protective gear',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются назначение, защитные claims, габариты, материалы и риск пересечения с tactical goods.',
    items: ['шлемы для спорта', 'защитные очки', 'спортивные перчатки', 'экипировка', 'инвентарь для фитнеса', 'товары для outdoor'],
    aliases: ['sports gear', 'helmet', 'protective goggles', 'fitness equipment', 'outdoor gear', 'cycling helmet', 'ski goggles', 'спортивный шлем', 'велошлем'],
  },
  {
    id: 'auto-accessories',
    status: 'review',
    title: 'Автомобильные аксессуары и гаджеты',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются электронные модули, безопасность, совместимость, бренд, назначение и транспортные ограничения.',
    items: ['держатели', 'коврики', 'органайзеры', 'автогаджеты', 'датчики', 'инструменты для ухода'],
    aliases: ['car accessory', 'auto gadget', 'car organizer', 'dash accessory', 'car mat', 'obd scanner', 'автомобильный аксессуар', 'держатель в машину'],
  },
  {
    id: 'small-appliances',
    status: 'approved',
    title: 'Бытовая техника и устройства с питанием',
    badgeText: 'До $2500 / 2 ед.',
    description: 'Consumer-устройства с питанием допускаются при лимите стоимости и количества; опасные батареи выделяются отдельно.',
    items: ['мини-приборы', 'кухонная техника', 'устройства ухода', 'электрические щетки', 'портативные вентиляторы', 'лампы'],
    aliases: ['small appliance', 'electric toothbrush', 'portable fan', 'desk lamp', 'kitchen appliance', 'hair dryer', 'электрическая щетка', 'фен', 'лампа'],
    limits: {
      unitValueUsd: 2500,
      maxUnitsPerRecipient: 2,
      note: 'Бытовая электроника допускается до $2500 за единицу и не больше 2 единиц в одни руки.',
    },
  },
  {
    id: 'wellness-devices',
    status: 'review',
    title: 'Wellness-устройства без лекарственных claims',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются медицинские заявления, FDA/сертификация, батареи, назначение и инструкции.',
    items: ['массажеры', 'фитнес-трекеры', 'ортопедические аксессуары', 'wellness gadgets', 'устройства для сна', 'товары для восстановления'],
    aliases: ['massager', 'wellness device', 'sleep aid', 'recovery tool', 'posture corrector', 'ортопедический корректор', 'массажер', 'device for pain'],
  },
  {
    id: 'organic-materials',
    status: 'review',
    title: 'Натуральные материалы, дерево, кожа и мех',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются происхождение, CITES, санитарные ограничения, материалы животного происхождения и маркировка.',
    items: ['деревянные изделия', 'кожаные аксессуары', 'меховые элементы', 'шерсть', 'перья', 'ракушки'],
    aliases: ['wood product', 'leather goods', 'fur trim', 'wool item', 'feather accessory', 'shell decor', 'дерево', 'кожа', 'мех'],
  },
  {
    id: 'wireless-smart-home',
    status: 'approved',
    title: 'Smart home, Bluetooth и Wi-Fi устройства',
    badgeText: 'До $2500 / 2 ед.',
    description: 'Consumer smart-home и беспроводные устройства допускаются при лимите стоимости и количества; скрытое наблюдение выделяется отдельно.',
    items: ['умные лампы', 'датчики', 'bluetooth-аксессуары', 'wi-fi устройства', 'трекеры', 'умные кнопки'],
    aliases: ['smart home', 'wifi device', 'bluetooth device', 'airtag', 'tracker', 'smart bulb', 'умный дом', 'датчик движения', 'gps tracker'],
    limits: {
      unitValueUsd: 2500,
      maxUnitsPerRecipient: 2,
      note: 'Consumer electronics допускается до $2500 за единицу и не больше 2 единиц в одни руки.',
    },
  },
  {
    id: 'art-antiques',
    status: 'review',
    title: 'Искусство, антиквариат и коллекционные ценности',
    badgeText: 'Индивидуальный комплаенс',
    description: 'Проверяются происхождение, культурные ограничения, стоимость, документы и риски повреждения.',
    items: ['картины', 'антикварные предметы', 'винтажные вещи', 'коллекционные объекты', 'скульптуры', 'редкие издания'],
    aliases: ['artwork', 'antique', 'vintage collectible', 'rare book', 'sculpture', 'painting', 'антиквариат', 'винтаж', 'картина'],
  },
  {
    id: 'lithium-batteries',
    status: 'restricted',
    title: 'Литиевые аккумуляторы, power banks и батареи',
    badgeText: 'Ограничено перевозкой',
    description: 'Отдельные аккумуляторы и устройства с батареями требуют проверки Wh, упаковки и правил перевозчика.',
    items: ['power bank', 'литиевые батареи', 'аккумуляторы', 'зарядные станции', 'battery pack', 'сменные аккумуляторы'],
    aliases: ['powerbank', 'power bank', 'lithium battery', 'li ion battery', 'battery pack', 'portable charger', 'пауэрбанк', 'литий ионный аккумулятор', 'акб'],
  },
  {
    id: 'flammable-liquids',
    status: 'restricted',
    title: 'Жидкости, аэрозоли, духи и легковоспламеняющиеся товары',
    badgeText: 'Ограничено перевозкой',
    description: 'Жидкости, спирт, аэрозоли и pressurized containers могут быть hazardous material.',
    items: ['духи', 'аэрозоли', 'лак для ногтей', 'спреи', 'клей', 'растворители'],
    aliases: ['perfume', 'fragrance', 'aerosol', 'nail polish', 'spray', 'flammable liquid', 'cologne', 'духи', 'парфюм', 'аэрозоль'],
  },
  {
    id: 'food-feed',
    status: 'restricted',
    title: 'Еда, напитки, корма и биологические продукты',
    badgeText: 'Ограничено санитарно',
    description: 'Пищевые и животные продукты требуют санитарной проверки; скоропортящиеся товары обычно не принимаются.',
    items: ['еда', 'напитки', 'корма', 'лакомства для животных', 'чай', 'кофе'],
    aliases: ['food', 'snacks', 'beverage', 'pet food', 'dog treats', 'tea', 'coffee', 'еда из США', 'корм', 'лакомство для собак'],
  },
  {
    id: 'plants-seeds',
    status: 'restricted',
    title: 'Растения, семена, почва и agricultural goods',
    badgeText: 'Ограничено фитосанитарно',
    description: 'Растительные товары требуют фитосанитарной проверки и часто не подходят для штучной модели.',
    items: ['семена', 'растения', 'почва', 'луковицы', 'сухие травы', 'агронаборы'],
    aliases: ['seeds', 'plant', 'soil', 'bulb', 'agricultural product', 'garden seeds', 'семена растений', 'саженцы', 'почва'],
  },
  {
    id: 'animal-origin',
    status: 'restricted',
    title: 'Материалы животного происхождения и CITES',
    badgeText: 'Ограничено документами',
    description: 'Риск CITES, санитарных требований и запрета для частей животных, экзотических материалов и трофеев.',
    items: ['изделия из кости', 'перья', 'кораллы', 'раковины', 'экзотическая кожа', 'таксидермия'],
    aliases: ['ivory', 'coral', 'shell', 'exotic leather', 'taxidermy', 'feather', 'bone item', 'слоновая кость', 'коралл', 'чучело'],
  },
  {
    id: 'alcohol-tobacco-vape',
    status: 'restricted',
    title: 'Алкоголь, табак, vape и nicotine goods',
    badgeText: 'Ограничено законом',
    description: 'Возрастные, акцизные, таможенные и транспортные ограничения делают категорию непригодной для обычного пилота.',
    items: ['алкоголь', 'табак', 'вейпы', 'жидкости для vape', 'никотиновые товары', 'сигары'],
    aliases: ['alcohol', 'wine', 'whiskey', 'tobacco', 'vape', 'e-liquid', 'nicotine', 'cigar', 'вейп', 'электронная сигарета'],
  },
  {
    id: 'medical-devices',
    status: 'restricted',
    title: 'Медицинские приборы и health-tech',
    badgeText: 'Ограничено сертификацией',
    description: 'Медицинское назначение, диагностика, лечение и FDA/сертификация требуют ручной проверки.',
    items: ['тонометры', 'глюкометры', 'медицинские датчики', 'ортезы', 'диагностические приборы', 'CPAP аксессуары'],
    aliases: ['medical device', 'blood pressure monitor', 'glucose meter', 'cpap', 'orthosis', 'diagnostic device', 'тонометр', 'глюкометр'],
  },
  {
    id: 'chemicals-cleaners',
    status: 'restricted',
    title: 'Химия, cleaners, adhesives и industrial consumables',
    badgeText: 'Ограничено перевозкой',
    description: 'Состав, hazard class, MSDS, flammability и правила перевозчика определяют возможность поставки.',
    items: ['чистящие средства', 'клеи', 'смолы', 'эпоксидные составы', 'масла', 'реактивы'],
    aliases: ['chemical', 'cleaner', 'adhesive', 'epoxy resin', 'industrial oil', 'reagent', 'клей', 'эпоксидка', 'реактив'],
  },
  {
    id: 'software-digital',
    status: 'restricted',
    title: 'ПО, лицензии, CAD/CAM/ERP и digital goods',
    badgeText: 'Ограничено экспортом',
    description: 'Digital/software поставки могут подпадать под отдельные экспортные и санкционные ограничения.',
    items: ['enterprise software', 'CAD', 'CAM', 'ERP', 'CRM', 'license keys'],
    aliases: ['software', 'saas', 'cad software', 'cam software', 'erp', 'crm', 'license key', 'ключ лицензии', 'solidworks', 'autocad'],
  },
  {
    id: 'industrial-tools',
    status: 'restricted',
    title: 'Промышленные инструменты, станки и manufacturing equipment',
    badgeText: 'Ограничено экспортом',
    description: 'Промышленное назначение требует проверки HS/ECCN, end-use, CHPL и санкционных правил.',
    items: ['станки', 'CNC комплектующие', 'измерительное оборудование', 'промышленные инструменты', 'насосы', 'датчики'],
    aliases: ['machine tool', 'cnc parts', 'industrial equipment', 'manufacturing equipment', 'measurement equipment', 'industrial sensor', 'станок', 'cnc', 'чпу'],
  },
  {
    id: 'precious-goods',
    status: 'restricted',
    title: 'Драгоценности, валюта, precious metals и financial instruments',
    badgeText: 'Ограничено законом',
    description: 'Высокая стоимость, декларирование, AML, страхование и таможенные ограничения требуют отдельной проверки.',
    items: ['золото', 'серебро', 'бриллианты', 'монеты', 'слитки', 'подарочные карты'],
    aliases: ['gold', 'silver', 'diamond', 'coin', 'bullion', 'gift card', 'precious metal', 'золотая монета', 'бриллиант'],
  },
  {
    id: 'vehicle-parts',
    status: 'restricted',
    title: 'Авто-, авиа-, морские и safety-critical parts',
    badgeText: 'Ограничено end-use',
    description: 'Запчасти для транспорта могут быть safety-critical, industrial или dual-use и требуют ручной проверки.',
    items: ['автозапчасти', 'датчики двигателя', 'тормозные компоненты', 'авиационные детали', 'морские детали', 'диагностика'],
    aliases: ['auto parts', 'engine sensor', 'brake part', 'aircraft part', 'marine part', 'obd tool', 'авиазапчасти', 'запчасти для лодки'],
  },
  {
    id: 'weapons-ammo',
    status: 'rejected',
    title: 'Оружие, боеприпасы и комплектующие',
    badgeText: 'Запрещено к работе',
    description: 'Категория исключается из B2B/B2C пилота из-за оружейного, экспортного и транспортного регулирования.',
    items: ['огнестрельное оружие', 'патроны', 'магазины', 'стволы', 'затворы', 'амуниция'],
    aliases: ['firearm', 'gun', 'ammo', 'ammunition', 'magazine', 'rifle', 'pistol', 'оружие', 'пистолет', 'винтовка', 'патроны'],
  },
  {
    id: 'knives-tactical',
    status: 'rejected',
    title: 'Ножи, tactical gear и self-defense',
    badgeText: 'Запрещено к работе',
    description: 'Высокий риск оружейной классификации, ограничений перевозчика и таможенного запрета.',
    items: ['ножи', 'кастеты', 'электрошокеры', 'перцовые баллончики', 'тактические аксессуары', 'самооборона'],
    aliases: ['knife', 'switchblade', 'tactical knife', 'pepper spray', 'stun gun', 'self defense', 'нож', 'складной нож', 'тактический нож'],
  },
  {
    id: 'optics-night-vision',
    status: 'rejected',
    title: 'Прицелы, ночное видение, тепловизоры и weapon optics',
    badgeText: 'Запрещено к работе',
    description: 'Оптика военного/охотничьего назначения может подпадать под export controls и не принимается.',
    items: ['прицелы', 'коллиматоры', 'ночное видение', 'тепловизоры', 'дальномеры', 'оружейная оптика'],
    aliases: ['rifle scope', 'scope', 'red dot sight', 'night vision', 'thermal scope', 'rangefinder', 'прицел', 'тепловизор', 'коллиматор'],
  },
  {
    id: 'drones-uav',
    status: 'rejected',
    title: 'Дроны, FPV, UAV и компоненты беспилотников',
    badgeText: 'Запрещено к работе',
    description: 'Дроны и компоненты имеют высокий dual-use риск и не подходят для модели.',
    items: ['дроны', 'FPV комплекты', 'полетные контроллеры', 'ESC', 'пропеллеры для дронов', 'камеры для FPV'],
    aliases: ['drone', 'uav', 'fpv drone', 'flight controller', 'esc drone', 'drone motor', 'дрон', 'квадрокоптер', 'fpv'],
  },
  {
    id: 'military-protective',
    status: 'rejected',
    title: 'Военное, броня, ballistic и tactical protective gear',
    badgeText: 'Запрещено к работе',
    description: 'Военное и защитное снаряжение исключается из-за export/end-use риска.',
    items: ['бронежилеты', 'баллистические шлемы', 'плитоноски', 'тактические разгрузки', 'военная форма', 'пластины брони'],
    aliases: ['body armor', 'ballistic helmet', 'plate carrier', 'armor plate', 'military gear', 'tactical vest', 'броня', 'бронежилет', 'плитоноска'],
  },
  {
    id: 'dual-use-electronics',
    status: 'rejected',
    title: 'Dual-use электроника, микросхемы и RF components',
    badgeText: 'Запрещено к работе',
    description: 'Компоненты из high-priority/dual-use зон не принимаются для пилотной модели.',
    items: ['микросхемы', 'полупроводники', 'RF модули', 'трансиверы', 'микроконтроллеры', 'печатные платы'],
    aliases: ['integrated circuit', 'microchip', 'semiconductor', 'rf transceiver', 'microcontroller', 'pcb', 'fpga', 'микросхема', 'чип', 'радиочастотный модуль'],
  },
  {
    id: 'navigation-avionics',
    status: 'rejected',
    title: 'Навигация, avionics, GPS и aerospace components',
    badgeText: 'Запрещено к работе',
    description: 'Aerospace/navigation товары имеют повышенный export-control и military end-use риск.',
    items: ['GPS модули', 'авионика', 'инерциальные датчики', 'гироскопы', 'компасы для авиации', 'антенны'],
    aliases: ['gps module', 'avionics', 'inertial sensor', 'gyroscope', 'imu', 'aerospace component', 'gps модуль', 'авионика', 'гироскоп'],
  },
  {
    id: 'oil-gas',
    status: 'rejected',
    title: 'Oil & gas, drilling и energy-sector equipment',
    badgeText: 'Запрещено к работе',
    description: 'Оборудование для нефтегазовой отрасли имеет отдельные экспортные ограничения и не подходит.',
    items: ['буровое оборудование', 'насосы высокого давления', 'клапаны', 'компрессоры', 'датчики для скважин', 'seismic equipment'],
    aliases: ['drilling equipment', 'oil gas equipment', 'pressure pump', 'valve', 'compressor', 'seismic equipment', 'буровая', 'нефтегаз', 'скважина'],
  },
  {
    id: 'supplements-vitamins',
    status: 'approved',
    title: 'БАДы, витамины и wellness supplements до 2 кг',
    badgeText: 'До 2 кг / получатель',
    description: 'БАДы и витамины допускаются для частной отправки при лимите веса на одного получателя.',
    items: ['БАДы', 'витамины', 'минералы', 'protein supplements', 'omega-3', 'wellness supplements'],
    aliases: ['supplement', 'supplements', 'vitamin', 'vitamins', 'minerals', 'protein powder', 'omega 3', 'fish oil', 'collagen', 'magnesium', 'бад', 'бады', 'витамины', 'омега 3', 'рыбий жир', 'коллаген', 'магний'],
    limits: {
      maxWeightKgPerRecipient: 2,
      note: 'БАДы и витамины допускаются при весе не более 2 кг на 1 получателя.',
    },
  },
  {
    id: 'prescription-drugs',
    status: 'rejected',
    title: 'Лекарства, рецептурные препараты и controlled substances',
    badgeText: 'Запрещено к работе',
    description: 'Лекарства, рецептурные препараты, controlled substances и лечебные claims не принимаются в пилотную модель.',
    items: ['лекарства', 'рецептурные препараты', 'стероиды', 'controlled substances', 'наркотические вещества', 'лекарственные препараты'],
    aliases: ['medicine', 'drug', 'prescription', 'rx drug', 'steroid', 'cbd', 'controlled substance', 'лекарство', 'рецептурный препарат', 'таблетки', 'стероиды'],
  },
  {
    id: 'dangerous-goods',
    status: 'rejected',
    title: 'Опасные грузы, взрывчатые вещества и pyrotechnics',
    badgeText: 'Запрещено к работе',
    description: 'Опасные грузы не принимаются из-за hazardous material и перевозочных запретов.',
    items: ['фейерверки', 'пиротехника', 'взрывчатые вещества', 'газовые баллоны', 'боевые смеси', 'токсичные вещества'],
    aliases: ['fireworks', 'explosive', 'gas cylinder', 'hazmat', 'toxic chemical', 'flammable gas', 'фейерверк', 'пиротехника', 'баллон'],
  },
  {
    id: 'counterfeit-replica',
    status: 'rejected',
    title: 'Контрафакт, replicas и trademark infringement',
    badgeText: 'Запрещено к работе',
    description: 'Подделки и реплики брендов не принимаются ни при каких условиях.',
    items: ['реплики', 'подделки', 'контрафакт', 'fake бренд', 'копии luxury', 'пиратские товары'],
    aliases: ['counterfeit', 'replica', 'fake designer', 'knockoff', 'trademark fake', 'подделка', 'реплика', 'копия бренда'],
  },
  {
    id: 'sanctioned-enduse',
    status: 'rejected',
    title: 'Санкционные товары, end-use и sanctioned parties',
    badgeText: 'Запрещено к работе',
    description: 'Любой риск санкционного лица, военного end-use или запрещенной страны/территории блокирует заявку.',
    items: ['санкционные товары', 'товары для военного использования', 'запросы от sanctioned parties', 'Crimea/DNR/LNR', 'Belarus end-use', 'military end user'],
    aliases: ['sanctions', 'sdn', 'ofac', 'military end use', 'crimea', 'dnr', 'lnr', 'belarus military', 'санкции', 'военное использование'],
  },
  {
    id: 'surveillance-spy',
    status: 'rejected',
    title: 'Скрытое наблюдение, spy gear и interception devices',
    badgeText: 'Запрещено к работе',
    description: 'Скрытые камеры, прослушка и interception devices имеют высокий правовой риск.',
    items: ['скрытые камеры', 'прослушка', 'gps маяки для слежки', 'перехватчики', 'spy cameras', 'жучки'],
    aliases: ['spy camera', 'hidden camera', 'wiretap', 'surveillance device', 'gps tracker for spying', 'bug device', 'скрытая камера', 'прослушивающее устройство'],
  },
  {
    id: 'live-endangered',
    status: 'rejected',
    title: 'Живые животные, endangered species и запрещенные биоматериалы',
    badgeText: 'Запрещено к работе',
    description: 'Живые животные и запрещенные биоматериалы не подходят для модели и часто запрещены.',
    items: ['живые животные', 'насекомые', 'биоматериалы', 'части исчезающих видов', 'слоновая кость', 'кровь или ткани'],
    aliases: ['live animal', 'insects', 'biological sample', 'endangered species', 'ivory', 'blood sample', 'животное', 'биоматериал'],
  },
];

const searchableTermsFor = (category: EligibilityCategory) => [
  category.title,
  category.description,
  category.badgeText,
  category.limits?.note ?? '',
  ...category.items,
  ...category.aliases,
];

export const categoryMatchesQuery = (category: EligibilityCategory, query: string) => {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  return searchableTermsFor(category).some((term) => scoreTerm(normalizedQuery, term) > 0);
};

export const checkEligibility = (query: string): EligibilityCheckResult => {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) return makeUnknownResult(query);

  let bestMatch: EligibilityMatch | null = null;

  for (const category of ELIGIBILITY_CATEGORIES) {
    for (const term of searchableTermsFor(category)) {
      const score = scoreTerm(normalizedQuery, term);
      if (!score) continue;

      const candidate: EligibilityMatch = { category, matchedTerm: term, score };
      if (
        !bestMatch ||
        candidate.score > bestMatch.score ||
        (candidate.score === bestMatch.score &&
          statusPriority[candidate.category.status] > statusPriority[bestMatch.category.status])
      ) {
        bestMatch = candidate;
      }
    }
  }

  if (!bestMatch || bestMatch.score < 52) return makeUnknownResult(query);
  if (bestMatch.category.status !== 'rejected') {
    const limitResult = getLimitResult(query, bestMatch);
    if (limitResult) return limitResult;
  }

  return makeResult(bestMatch, query);
};

export const eligibilityStats = {
  categories: ELIGIBILITY_CATEGORIES.length,
  searchableTerms: ELIGIBILITY_CATEGORIES.reduce(
    (total, category) => total + searchableTermsFor(category).length,
    0
  ),
  byStatus: ELIGIBILITY_CATEGORIES.reduce<Record<EligibilityStatus, number>>(
    (acc, category) => {
      acc[category.status] += 1;
      return acc;
    },
    { approved: 0, review: 0, restricted: 0, rejected: 0 }
  ),
};
