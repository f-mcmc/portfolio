/*
  ============================================================
  SAYTNI SOZLASH — faqat shu faylni o'zgartirasiz.
  ============================================================
*/
window.SITE = {
  name: "Ustara",
  kind: "Barbershop",
  tagline: "Erkaklar sartaroshxonasi · Toshkent, Chilonzor",
  address: "Toshkent, Chilonzor tumani, Bunyodkor ko'chasi 12",
  phone: "+998 90 123 45 67",
  instagram: "ustara.barbershop",

  // Yozilish so'rovlari keladigan Telegram username (@ belgisisiz)
  telegram: "ustara_barbershop",

  // Ish vaqti (soatlar) va yozilish oralig'i (daqiqa)
  openHour: 10,
  closeHour: 20,
  stepMinutes: 30,

  map: { lat: 41.2856, lng: 69.2034 },

  services: [
    { name: "Soch olish", duration: "30 daqiqa", price: 60000 },
    { name: "Soch + soqol", duration: "60 daqiqa", price: 90000 },
    { name: "Soqol olish va shakl berish", duration: "30 daqiqa", price: 40000 },
    { name: "Bolalar soch olishi (12 yoshgacha)", duration: "30 daqiqa", price: 45000 },
    { name: "Soch bo'yash", duration: "90 daqiqa", price: 150000 },
    { name: "Yuz parvarishi", duration: "30 daqiqa", price: 70000 },
  ],

  masters: [
    { name: "Jasur", role: "Katta usta, 8 yil tajriba" },
    { name: "Sardor", role: "Usta, fade va klassika" },
    { name: "Bekzod", role: "Soqol bo'yicha usta" },
  ],
};
