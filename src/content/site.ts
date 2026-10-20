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
  name: string;
  kind: string;
  summary: string;
  stack: readonly string[];
  link?: { href: string; label: string };
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
  services: { title: string; note: string; from: string; items: readonly Service[] };
  work: { title: string; lead: string; items: readonly Project[] };
  process: { title: string; steps: readonly Step[] };
  contact: {
    title: string;
    text: string;
    cta: string;
    github: string;
  };
  footer: string;
}

const projectsStack = {
  booking: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
  restaurant: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
  resumeBot: ["Node.js", "Telegraf", "PDFKit"],
  catalog: ["Next.js", "TypeScript", "TanStack Query", "Django REST API"],
  admin: ["React", "TypeScript", "Vite", "Recharts", "Three.js"],
  dental: ["React", "TanStack Start", "Tailwind"],
} as const;

const links = {
  restaurant: "https://murodulloh-restoran.vercel.app",
  admin: "https://stroyadmin.vercel.app",
  booking: "https://murodulloh-barbershop.vercel.app",
  resumeBot: "https://github.com/f-mcmc/Resume-bot-on-Telegram",
  catalog: "https://murodulloh-stroymarket.vercel.app",
} as const;

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
    services: {
      title: "Xizmatlar va narxlar",
      note: "Narx loyihaga qarab aniq kelishiladi. Ishni boshlashdan oldin 50% oldindan to'lanadi.",
      from: "",
      items: [
        {
          name: "Landing sahifa",
          includes: "Bitta sahifali sayt: xizmatlar, narxlar, manzil, xarita, Telegram tugmasi. Telefonda chiroyli ochiladi.",
          price: "1 500 000 so'mdan",
          time: "5–7 kun",
        },
        {
          name: "Telegram bot",
          includes: "Buyurtma qabul qiladigan, savollarga javob beradigan yoki ariza yig'adigan bot. Arizalar sizga keladi.",
          price: "800 000 so'mdan",
          time: "3–7 kun",
        },
        {
          name: "Onlayn yozilish",
          includes: "Mijoz usta, xizmat va vaqtni o'zi tanlaydi. Salon, barbershop va klinikalar uchun.",
          price: "2 500 000 so'mdan",
          time: "1–2 hafta",
        },
        {
          name: "Katalog yoki kichik do'kon",
          includes: "Mahsulotlar ro'yxati, filtrlar, mahsulot sahifasi va «Bir klikda sotib olish» tugmasi.",
          price: "3 500 000 so'mdan",
          time: "2–3 hafta",
        },
        {
          name: "Saytni tuzatish va yangilash",
          includes: "Matn, rasm, narxlarni almashtirish, xatolarni tuzatish, saytni tezlashtirish.",
          price: "200 000 so'mdan",
          time: "1–2 kun",
        },
      ],
    },
    work: {
      title: "Ishlarim",
      lead: "Kodni GitHub'da ochiq ko'rish mumkin.",
      items: [
        {
          name: "Barbershopga onlayn yozilish",
          kind: "Veb-ilova, backend bilan",
          summary: "Mijoz usta, xizmat va bo'sh vaqtni tanlab yoziladi; bitta vaqtga ikki kishi yozila olmaydi. Egasi admin panelda yozilishlarni, tushumni, ustalar va xizmatlarni boshqaradi, yangi yozilish Telegram'ga keladi.",
          stack: projectsStack.booking,
          link: { href: links.booking, label: "Saytni ochish" },
        },
        {
          name: "Restoran uchun onlayn buyurtma",
          kind: "Veb-ilova, backend bilan",
          summary: "Mijoz menyudan taom tanlaydi, yetkazib berish yoki olib ketishni belgilaydi va buyurtma holatini jonli kuzatadi. Restoran admin panelda buyurtmalarni bosqichma-bosqich yuritadi, narx va stop-listni o'zi boshqaradi, kunlik tushumni ko'radi.",
          stack: projectsStack.restaurant,
          link: { href: links.restaurant, label: "Saytni ochish" },
        },
        {
          name: "Rezyume yaratuvchi Telegram bot",
          kind: "Telegram bot",
          summary: "Bot savollar beradi, javoblarni tekshiradi va tayyor rezyumeni PDF qilib yuboradi.",
          stack: projectsStack.resumeBot,
          link: { href: links.resumeBot, label: "GitHub" },
        },
        {
          name: "StroyMarket — qurilish mollari do'koni",
          kind: "Internet-do'kon, jamoaviy loyiha",
          summary: "Haqiqiy backend'ga ulangan do'kon: katalog daraxti va mega-menyu, qidiruv, savat, buyurtma, ro'yxatdan o'tish va shaxsiy kabinet. API integratsiyasi, katalog, blog va akkaunt qismlari menga tegishli.",
          stack: projectsStack.catalog,
          link: { href: links.catalog, label: "Saytni ochish" },
        },
        {
          name: "Do'kon uchun admin panel",
          kind: "Boshqaruv paneli",
          summary: "Buyurtmalar, to'lovlar, ombor, mijozlar, hisobotlar va xodimlar rollari bitta joyda.",
          stack: projectsStack.admin,
          link: { href: links.admin, label: "Saytni ochish" },
        },
        {
          name: "Stomatologiya klinikasi sayti",
          kind: "Landing sahifa",
          summary: "Xizmatlar va narxlar, shifokorlar, qabulga yozilish formasi.",
          stack: projectsStack.dental,
        },
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
    services: {
      title: "Услуги и цены",
      note: "Точная цена согласуется под проект. Перед началом работы — предоплата 50%.",
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
      lead: "Код можно посмотреть на GitHub.",
      items: [
        {
          name: "Онлайн-запись в барбершоп",
          kind: "Веб-приложение с бэкендом",
          summary: "Клиент выбирает мастера, услугу и свободное время; одно время не могут занять двое. Владелец в админ-панели видит записи и выручку, управляет мастерами и услугами, новые записи приходят в Telegram.",
          stack: projectsStack.booking,
          link: { href: links.booking, label: "Открыть сайт" },
        },
        {
          name: "Онлайн-заказ для ресторана",
          kind: "Веб-приложение с бэкендом",
          summary: "Клиент выбирает блюда, доставку или самовывоз и в реальном времени следит за статусом заказа. Ресторан ведёт заказы по этапам в админ-панели, сам меняет цены и стоп-лист, видит дневную выручку.",
          stack: projectsStack.restaurant,
          link: { href: links.restaurant, label: "Открыть сайт" },
        },
        {
          name: "Telegram-бот для резюме",
          kind: "Telegram-бот",
          summary: "Бот задаёт вопросы, проверяет ответы и присылает готовое резюме в PDF.",
          stack: projectsStack.resumeBot,
          link: { href: links.resumeBot, label: "GitHub" },
        },
        {
          name: "StroyMarket — магазин стройматериалов",
          kind: "Интернет-магазин, командный проект",
          summary: "Магазин на реальном бэкенде: дерево каталога и мега-меню, поиск, корзина, заказ, регистрация и личный кабинет. На мне — интеграция с API, каталог, блог и аккаунт.",
          stack: projectsStack.catalog,
          link: { href: links.catalog, label: "Открыть сайт" },
        },
        {
          name: "Админ-панель магазина",
          kind: "Панель управления",
          summary: "Заказы, оплаты, склад, клиенты, отчёты и роли сотрудников в одном месте.",
          stack: projectsStack.admin,
          link: { href: links.admin, label: "Открыть сайт" },
        },
        {
          name: "Сайт стоматологии",
          kind: "Лендинг",
          summary: "Услуги и цены, врачи, форма записи на приём.",
          stack: projectsStack.dental,
        },
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
    services: {
      title: "Services and prices",
      note: "The exact price is agreed per project. 50% is paid upfront before work starts. Prices in Uzbek soʻm.",
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
      lead: "The code is public on GitHub.",
      items: [
        {
          name: "Barbershop online booking",
          kind: "Full-stack web app",
          summary: "Customers pick a barber, a service and a free slot; the same slot can never be booked twice. The owner manages bookings, revenue, barbers and services in an admin panel and gets new bookings in Telegram.",
          stack: projectsStack.booking,
          link: { href: links.booking, label: "Live demo" },
        },
        {
          name: "Restaurant online ordering",
          kind: "Full-stack web app",
          summary: "Customers pick dishes, choose delivery or pickup and track their order status live. The restaurant moves orders through stages in an admin panel, edits prices and the stop list, and sees daily revenue.",
          stack: projectsStack.restaurant,
          link: { href: links.restaurant, label: "Live demo" },
        },
        {
          name: "Resume builder Telegram bot",
          kind: "Telegram bot",
          summary: "The bot asks questions, validates the answers and sends back a finished resume as a PDF.",
          stack: projectsStack.resumeBot,
          link: { href: links.resumeBot, label: "GitHub" },
        },
        {
          name: "StroyMarket — building supplies store",
          kind: "Online shop, team project",
          summary: "A store on a real backend: category tree and mega-menu, search, cart, checkout, sign-up and personal account. My part: API integration, catalog, blog and account.",
          stack: projectsStack.catalog,
          link: { href: links.catalog, label: "Live demo" },
        },
        {
          name: "Shop admin panel",
          kind: "Dashboard",
          summary: "Orders, payments, stock, customers, reports and staff roles in one place.",
          stack: projectsStack.admin,
          link: { href: links.admin, label: "Live demo" },
        },
        {
          name: "Dental clinic website",
          kind: "Landing page",
          summary: "Services and prices, doctors, and an appointment form.",
          stack: projectsStack.dental,
        },
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
