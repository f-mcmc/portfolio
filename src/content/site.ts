export type Locale = "uz" | "ru" | "en";

export const locales: readonly Locale[] = ["uz", "ru", "en"] as const;

export const TELEGRAM_USERNAME = "kadirjanovvm";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;
export const GITHUB_URL = "https://github.com/f-mcmc";

export const localePath: Record<Locale, string> = {
  uz: "/",
  ru: "/ru/",
  en: "/en/",
};

export const localeLabel: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export interface Service {
  name: string;
  includes: string;
  price: string;
  time: string;
}

export interface Project {
  id: string;
  name: string;
  kind: string;
  summary: string;
  stack: readonly string[];
  github: string;
  demo?: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface ChatLine {
  from: "bot" | "user";
  text: string;
}

export interface SiteContent {
  htmlLang: string;
  meta: { title: string; description: string };
  name: string;
  nav: { services: string; work: string; process: string; contact: string };
  hero: {
    eyebrow: string;
    scroll: string;
    title: string;
    lead: string;
    cta: string;
    secondary: string;
  };
  chat: {
    botName: string;
    status: string;
    lines: readonly ChatLine[];
    buttons: readonly string[];
  };
  stats: readonly { value: number; label: string }[];
  story: { desk: { title: string; text: string }; live: { title: string; text: string } };
  chips: readonly string[];
  mission: string;
  services: { title: string; note: string; from: string; items: readonly Service[] };
  work: {
    title: string;
    lead: string;
    hint: string;
    demo: string;
    code: string;
    close: string;
    items: readonly Project[];
  };
  process: { title: string; steps: readonly Step[] };
  contact: {
    title: string;
    text: string;
    cta: string;
    github: string;
  };
  footer: string;
}

// Loyihalar faqat github.com/f-mcmc dan olingan.
// Quyidagi repolar sayt ro'yxatiga ATAYLAB kiritilmagan: syne, K-house.
const GH = "https://github.com/f-mcmc";

const repos = {
  stroy: { id: "stroymarket", name: "StroyMarket", stack: ["Next.js", "TypeScript", "Django REST"], github: `${GH}/StroyMarket`, demo: "https://murodulloh-stroymarket.vercel.app" },
  klinika: { id: "klinika-online", name: "Klinika Online", stack: ["Next.js", "TypeScript", "PostgreSQL"], github: `${GH}/klinika-online`, demo: "https://murodulloh-klinika.vercel.app" },
  restoran: { id: "restoran-online-order", name: "Restoran Order", stack: ["Next.js", "TypeScript", "PostgreSQL", "Telegram"], github: `${GH}/restoran-online-order`, demo: "https://murodulloh-restoran.vercel.app" },
  barbershop: { id: "barbershop-booking", name: "Barbershop Booking", stack: ["Next.js", "TypeScript", "PostgreSQL", "Telegram"], github: `${GH}/barbershop-booking`, demo: "https://murodulloh-barbershop.vercel.app" },
  qarz: { id: "qarz-daftar", name: "Qarz Daftar", stack: ["Next.js", "TypeScript", "PostgreSQL"], github: `${GH}/qarz-daftar`, demo: "https://murodulloh-qarz-daftar.vercel.app" },
  // Market-S repo = "Stroyopttorg": do'kon sayti + /admin panel. Demo: stroyadmin.vercel.app (egasi tasdiqlagan).
  market: { id: "stroy-admin", name: "Stroy Admin", stack: ["Next.js", "TypeScript", "RTK Query", "Tailwind"], github: `${GH}/Market-S`, demo: "https://stroyadmin.vercel.app" },
  barber: { id: "barber-booking", name: "Barber Booking", stack: ["React", "TypeScript", "Vite", "Zustand", "Tailwind"], github: `${GH}/barber-booking` },
  bot: { id: "resume-bot", name: "Resume Bot", stack: ["Node.js", "Telegraf", "PDFKit"], github: `${GH}/Resume-bot-on-Telegram` },
} as const;

type RepoKey = keyof typeof repos;

function project(key: RepoKey, kind: string, summary: string): Project {
  return { ...repos[key], kind, summary };
}

export const content: Record<Locale, SiteContent> = {
  uz: {
    htmlLang: "uz",
    meta: {
      title: "Murodulloh — sayt va Telegram bot buyurtma qilish",
      description:
        "Kafe, salon, klinika va do'konlar uchun sayt, onlayn yozilish va Telegram botlar. Narxlar va ishlar namunasi.",
    },
    name: "Murodulloh",
    nav: { services: "Narxlar", work: "Ishlarim", process: "Qanday ishlaymiz", contact: "Bog'lanish" },
    hero: {
      eyebrow: "Murodulloh · Toshkent",
      scroll: "Pastga aylantiring",
      title: "Biznesingiz uchun sayt va Telegram bot",
      lead: "Kafe, salon, klinika va do'konlarga mijoz olib keladigan sayt yoki bot qilib beraman. Kichik loyiha 1–2 haftada tayyor bo'ladi.",
      cta: "Telegram'da yozish",
      secondary: "Narxlarni ko'rish",
    },
    chat: {
      botName: "Barber Shop bot",
      status: "bot",
      lines: [
        { from: "user", text: "/start" },
        { from: "bot", text: "Assalomu alaykum! Qaysi xizmatga yozilasiz?" },
        { from: "user", text: "Soch olish" },
        { from: "bot", text: "Ertaga bo'sh vaqtlar:" },
      ],
      buttons: ["10:00", "13:30", "17:00"],
    },
    stats: [{ value: 8, label: "ta loyiha" }, { value: 5, label: "ta jonli demo" }, { value: 3, label: "ta til" }],
    story: { desk: { title: "G'oyadan tayyor saytgacha", text: "Biznesingizni tinglayman, keyin sayt yoki botni o'zim qurib beraman." }, live: { title: "Har bir loyiha ochiladi", text: "Barcha ishlarim internetda jonli. Mijozlaringiz bosib ko'ra oladi." } },
    chips: ["Next.js", "Telegram bot", "TypeScript", "PostgreSQL", "uz · ru · en"],
    mission: "Men shunchaki chiroyli emas, mijoz olib keladigan saytlar qilaman: tez ochiladi, telefonda qulay va aynan sizning biznesingizga moslangan.",
    services: {
      title: "Xizmatlar va narxlar",
      note: "Narxlar boshlanish narxi. Loyihani muhokama qilib, yakuniy narxni alohida kelishamiz: u ishning hajmiga qarab o'zgaradi. Boshlashdan oldin 50% oldindan to'lanadi.",
      from: "Boshlanishi",
      items: [
        {
          name: "Landing sahifa",
          includes: "Bitta sahifali sayt: xizmatlar, narxlar, manzil, xarita, Telegram tugmasi. Telefonda chiroyli ochiladi.",
          price: "1 500 000 so'm",
          time: "5–7 kun",
        },
        {
          name: "Telegram bot",
          includes: "Buyurtma qabul qiladigan, savollarga javob beradigan yoki ariza yig'adigan bot. Arizalar sizga keladi.",
          price: "800 000 so'm",
          time: "3–7 kun",
        },
        {
          name: "Onlayn yozilish",
          includes: "Mijoz usta, xizmat va vaqtni o'zi tanlaydi. Salon, barbershop va klinikalar uchun.",
          price: "2 500 000 so'm",
          time: "1–2 hafta",
        },
        {
          name: "Katalog yoki kichik do'kon",
          includes: "Mahsulotlar ro'yxati, filtrlar, mahsulot sahifasi va «Bir klikda sotib olish» tugmasi.",
          price: "3 500 000 so'm",
          time: "2–3 hafta",
        },
        {
          name: "Saytni tuzatish va yangilash",
          includes: "Matn, rasm, narxlarni almashtirish, xatolarni tuzatish, saytni tezlashtirish.",
          price: "200 000 so'm",
          time: "1–2 kun",
        },
      ],
    },
    work: {
      title: "Ishlarim",
      lead: "Barcha loyihalar GitHub'da ochiq, ko'pchiligining jonli demosi bor.",
      hint: "Kartochkalarni sudrang va uloqtiring, bosib oching.",
      demo: "Jonli demo",
      code: "Kod (GitHub)",
      close: "Yopish",
      items: [
        project("stroy", "Internet-do'kon", "Qurilish mollari do'koni: katalog, savat, shaxsiy kabinet. Backend Django REST'da."),
        project("klinika", "Onlayn yozilish", "Klinikaga onlayn yozilish: shifokorlar jadvali va qabulxona uchun admin panel."),
        project("restoran", "Buyurtma tizimi", "Restoran onlayn buyurtma: buyurtma holati, admin panel va Telegram xabarnomalari."),
        project("barbershop", "Onlayn yozilish", "Barbershopga yozilish: admin panel va Telegram'ga xabarnoma."),
        project("qarz", "Veb-ilova", "Mahalla do'konlari uchun nasiya (qarz) daftari."),
        project("market", "Sayt va admin panel", "Qurilish do'koni sayti va admin panel: buyurtmalar, rollar va uch tilli interfeys."),
        project("barber", "Veb-ilova", "Mijoz usta, xizmat va bo'sh vaqtni tanlab yoziladi, yozilganlarini alohida sahifada ko'radi."),
        project("bot", "Telegram bot", "Bot savollar beradi, javoblarni tekshiradi va tayyor rezyumeni PDF qilib yuboradi."),
      ],
    },
    process: {
      title: "Qanday ishlaymiz",
      steps: [
        { title: "Yozasiz", text: "Telegram'da biznesingiz va nima kerakligini qisqa yozasiz." },
        { title: "Kelishamiz", text: "Aniq narx, muddat va sahifalar ro'yxatini yozib beraman." },
        { title: "Qilaman", text: "50% oldindan to'lovdan keyin boshlayman va jarayonni ko'rsatib boraman." },
        { title: "Topshiraman", text: "Sayt ishga tushadi, qolgan 50% to'lanadi. Bir oy bepul kichik tuzatishlar." },
      ],
    },
    contact: {
      title: "Loyihangiz bormi?",
      text: "Telegram'da yozing, odatda bir kun ichida javob beraman.",
      cta: "@kadirjanovvm ga yozish",
      github: "GitHub profilim",
    },
    footer: "Murodulloh, Toshkent",
  },
  ru: {
    htmlLang: "ru",
    meta: {
      title: "Мурадулло — сайты и Telegram-боты на заказ",
      description:
        "Сайты, онлайн-запись и Telegram-боты для кафе, салонов, клиник и магазинов. Цены и примеры работ.",
    },
    name: "Мурадулло",
    nav: { services: "Цены", work: "Работы", process: "Как работаем", contact: "Связаться" },
    hero: {
      eyebrow: "Мурадулло · Ташкент",
      scroll: "Прокрутите вниз",
      title: "Сайт и Telegram-бот для вашего бизнеса",
      lead: "Делаю сайты и ботов для кафе, салонов, клиник и магазинов, которые приводят клиентов. Небольшой проект — за 1–2 недели.",
      cta: "Написать в Telegram",
      secondary: "Посмотреть цены",
    },
    chat: {
      botName: "Barber Shop бот",
      status: "бот",
      lines: [
        { from: "user", text: "/start" },
        { from: "bot", text: "Здравствуйте! На какую услугу записать?" },
        { from: "user", text: "Стрижка" },
        { from: "bot", text: "Свободное время на завтра:" },
      ],
      buttons: ["10:00", "13:30", "17:00"],
    },
    stats: [{ value: 8, label: "проектов" }, { value: 5, label: "живых демо" }, { value: 3, label: "языка" }],
    story: { desk: { title: "От идеи до готового сайта", text: "Выслушаю ваш бизнес и сам соберу сайт или бота." }, live: { title: "Каждый проект открывается", text: "Все работы живут в интернете. Можно открыть и посмотреть." } },
    chips: ["Next.js", "Telegram-бот", "TypeScript", "PostgreSQL", "uz · ru · en"],
    mission: "Я делаю сайты, которые не просто красивы, а приводят клиентов: быстро открываются, удобны с телефона и заточены под ваш бизнес.",
    services: {
      title: "Услуги и цены",
      note: "Указана начальная цена. Итоговую стоимость мы обсудим и согласуем отдельно: она зависит от объёма работы. Перед началом — предоплата 50%.",
      from: "от",
      items: [
        {
          name: "Лендинг",
          includes: "Одностраничный сайт: услуги, цены, адрес, карта, кнопка Telegram. Удобно открывается с телефона.",
          price: "1 500 000 сум",
          time: "5–7 дней",
        },
        {
          name: "Telegram-бот",
          includes: "Бот принимает заказы, отвечает на вопросы или собирает заявки. Заявки приходят вам.",
          price: "800 000 сум",
          time: "3–7 дней",
        },
        {
          name: "Онлайн-запись",
          includes: "Клиент сам выбирает мастера, услугу и время. Для салонов, барбершопов и клиник.",
          price: "2 500 000 сум",
          time: "1–2 недели",
        },
        {
          name: "Каталог или небольшой магазин",
          includes: "Список товаров, фильтры, страница товара и кнопка «Купить в один клик».",
          price: "3 500 000 сум",
          time: "2–3 недели",
        },
        {
          name: "Правки и обновление сайта",
          includes: "Замена текстов, фото и цен, исправление ошибок, ускорение сайта.",
          price: "200 000 сум",
          time: "1–2 дня",
        },
      ],
    },
    work: {
      title: "Работы",
      lead: "Все проекты открыты на GitHub, у большинства есть живое демо.",
      hint: "Перетаскивайте и бросайте карточки, нажмите, чтобы открыть.",
      demo: "Живое демо",
      code: "Код (GitHub)",
      close: "Закрыть",
      items: [
        project("stroy", "Интернет-магазин", "Магазин стройматериалов: каталог, корзина, личный кабинет. Бэкенд на Django REST."),
        project("klinika", "Онлайн-запись", "Запись в клинику онлайн: расписание врачей и админ-панель для регистратуры."),
        project("restoran", "Система заказов", "Онлайн-заказ в ресторане: статус заказа, админ-панель и уведомления в Telegram."),
        project("barbershop", "Онлайн-запись", "Запись в барбершоп: админ-панель и уведомления в Telegram."),
        project("qarz", "Веб-приложение", "Долговая тетрадь для магазинов у дома."),
        project("market", "Сайт и админ-панель", "Сайт строительного магазина и админ-панель: заказы, роли и интерфейс на трёх языках."),
        project("barber", "Веб-приложение", "Клиент выбирает мастера, услугу и свободное время, а свои записи видит на отдельной странице."),
        project("bot", "Telegram-бот", "Бот задаёт вопросы, проверяет ответы и присылает готовое резюме в PDF."),
      ],
    },
    process: {
      title: "Как работаем",
      steps: [
        { title: "Пишете", text: "Коротко пишете в Telegram о бизнесе и о том, что нужно." },
        { title: "Договариваемся", text: "Присылаю точную цену, срок и список страниц." },
        { title: "Делаю", text: "Начинаю после предоплаты 50% и показываю промежуточные результаты." },
        { title: "Сдаю", text: "Сайт запускается, оплачиваются оставшиеся 50%. Месяц бесплатных мелких правок." },
      ],
    },
    contact: {
      title: "Есть проект?",
      text: "Напишите в Telegram, обычно отвечаю в течение дня.",
      cta: "Написать @kadirjanovvm",
      github: "Мой GitHub",
    },
    footer: "Мурадулло, Ташкент",
  },
  en: {
    htmlLang: "en",
    meta: {
      title: "Murodulloh — websites and Telegram bots",
      description:
        "Websites, online booking and Telegram bots for cafes, salons, clinics and shops. Prices and past work.",
    },
    name: "Murodulloh",
    nav: { services: "Prices", work: "Work", process: "How it works", contact: "Contact" },
    hero: {
      eyebrow: "Murodulloh · Tashkent",
      scroll: "Scroll down",
      title: "Websites and Telegram bots for your business",
      lead: "I build websites and bots that bring customers to cafes, salons, clinics and shops. A small project is ready in 1–2 weeks.",
      cta: "Message me on Telegram",
      secondary: "See prices",
    },
    chat: {
      botName: "Barber Shop bot",
      status: "bot",
      lines: [
        { from: "user", text: "/start" },
        { from: "bot", text: "Hi! Which service would you like to book?" },
        { from: "user", text: "Haircut" },
        { from: "bot", text: "Free times tomorrow:" },
      ],
      buttons: ["10:00", "13:30", "17:00"],
    },
    stats: [{ value: 8, label: "projects" }, { value: 5, label: "live demos" }, { value: 3, label: "languages" }],
    story: { desk: { title: "From idea to finished site", text: "I listen to your business, then build the site or bot myself." }, live: { title: "Every project is live", text: "All my work is online. Open it and see for yourself." } },
    chips: ["Next.js", "Telegram bot", "TypeScript", "PostgreSQL", "uz · ru · en"],
    mission: "I build websites that don't just look good, they bring customers: they load fast, work well on phones and fit your business.",
    services: {
      title: "Services and prices",
      note: "Prices shown are starting prices. We agree the final price separately after discussing your project, and it depends on the scope of the work. 50% is paid upfront before work starts. Prices in Uzbek soʻm.",
      from: "from",
      items: [
        {
          name: "Landing page",
          includes: "A one-page site: services, prices, address, map, Telegram button. Looks right on phones.",
          price: "1,500,000 UZS",
          time: "5–7 days",
        },
        {
          name: "Telegram bot",
          includes: "Takes orders, answers questions or collects requests, and sends them to you.",
          price: "800,000 UZS",
          time: "3–7 days",
        },
        {
          name: "Online booking",
          includes: "Customers pick the specialist, service and time themselves. For salons, barbershops and clinics.",
          price: "2,500,000 UZS",
          time: "1–2 weeks",
        },
        {
          name: "Catalog or small shop",
          includes: "Product list, filters, product pages and a one-click order button.",
          price: "3,500,000 UZS",
          time: "2–3 weeks",
        },
        {
          name: "Fixes and updates",
          includes: "Change texts, photos and prices, fix bugs, make the site faster.",
          price: "200,000 UZS",
          time: "1–2 days",
        },
      ],
    },
    work: {
      title: "Work",
      lead: "All projects are public on GitHub, most have a live demo.",
      hint: "Drag and throw the cards, click to open.",
      demo: "Live demo",
      code: "Code (GitHub)",
      close: "Close",
      items: [
        project("stroy", "Online shop", "Building supplies shop: catalog, cart, user account. Backend on Django REST."),
        project("klinika", "Online booking", "Clinic appointment booking: doctors' schedule and a reception admin panel."),
        project("restoran", "Order system", "Restaurant online ordering: order status, admin panel and Telegram notifications."),
        project("barbershop", "Online booking", "Barbershop booking with an admin panel and Telegram notifications."),
        project("qarz", "Web app", "A debt ledger for neighbourhood shops."),
        project("market", "Site and admin panel", "A building-supplies shop site with an admin panel: orders, roles and a three-language interface."),
        project("barber", "Web app", "Customers choose a barber, a service and a free slot, and see their bookings on a separate page."),
        project("bot", "Telegram bot", "The bot asks questions, validates the answers and sends back a finished resume as a PDF."),
      ],
    },
    process: {
      title: "How it works",
      steps: [
        { title: "You message me", text: "Tell me on Telegram about your business and what you need." },
        { title: "We agree", text: "I send an exact price, deadline and list of pages." },
        { title: "I build it", text: "I start after a 50% deposit and show progress along the way." },
        { title: "I hand it over", text: "The site goes live and the other 50% is paid. One month of free small fixes." },
      ],
    },
    contact: {
      title: "Have a project?",
      text: "Message me on Telegram. I usually reply within a day.",
      cta: "Message @kadirjanovvm",
      github: "My GitHub",
    },
    footer: "Murodulloh, Tashkent",
  },
};
