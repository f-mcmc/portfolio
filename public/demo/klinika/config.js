/*
  ============================================================
  SAYTNI SOZLASH — faqat shu faylni o'zgartirasiz.
  ============================================================
*/
window.SITE = {
  name: "Shifo Med",
  kind: "Klinika",
  tagline: "Ko'p tarmoqli oilaviy klinika · Toshkent, Yunusobod",
  address: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi 108",
  phone: "+998 71 200 00 00",
  instagram: "shifomed.uz",

  // Qabulga yozilish so'rovlari keladigan Telegram username (@ belgisisiz)
  telegram: "shifomed_qabul",

  openHour: 8,
  closeHour: 18,
  stepMinutes: 30,
  workDays: "Dushanba – Shanba",
  closedOnSunday: true,

  map: { lat: 41.3646, lng: 69.2869 },

  // Yo'nalishlar va xizmatlar
  departments: [
    {
      name: "Terapiya",
      services: [
        { name: "Terapevt ko'rigi", price: 120000 },
        { name: "Takroriy ko'rik (14 kun ichida)", price: 80000 },
      ],
    },
    {
      name: "Stomatologiya",
      services: [
        { name: "Konsultatsiya va ko'rik", price: 50000 },
        { name: "Tish tozalash (professional)", price: 350000 },
        { name: "Plomba qo'yish", price: 400000 },
      ],
    },
    {
      name: "Pediatriya",
      services: [
        { name: "Pediatr ko'rigi", price: 150000 },
        { name: "Uyga chaqirish", price: 300000 },
      ],
    },
    {
      name: "Diagnostika",
      services: [
        { name: "UZI (bitta a'zo)", price: 150000 },
        { name: "EKG", price: 80000 },
        { name: "Umumiy qon tahlili", price: 60000 },
      ],
    },
  ],

  doctors: [
    { name: "Dilnoza Karimova", specialty: "Terapevt", experience: "12 yil tajriba" },
    { name: "Aziz Rahimov", specialty: "Stomatolog", experience: "9 yil tajriba" },
    { name: "Malika Yusupova", specialty: "Pediatr", experience: "15 yil tajriba" },
    { name: "Rustam Aliyev", specialty: "UZI shifokori", experience: "10 yil tajriba" },
  ],
};
