(function () {
  "use strict";

  const site = window.SITE;
  const sum = (n) => n.toLocaleString("ru-RU").replace(/ /g, " ") + " so'm";
  const pad = (n) => String(n).padStart(2, "0");
  const hours = `${pad(site.openHour)}:00 – ${pad(site.closeHour)}:00`;

  // ---- Text from config ----
  const values = {
    name: site.name,
    tagline: site.tagline,
    address: site.address,
    phone: site.phone,
    hoursShort: hours,
    hoursLong: `${site.workDays}, ${hours}`,
    workDays: site.workDays,
    departmentsCount: `${site.departments.length} ta`,
    instagramText: "@" + site.instagram,
  };
  const hrefs = {
    phone: "tel:" + site.phone.replace(/[^\d+]/g, ""),
    instagram: "https://instagram.com/" + site.instagram,
  };
  document.querySelectorAll("[data-config]").forEach((el) => {
    const v = values[el.dataset.config];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-href]").forEach((el) => {
    const v = hrefs[el.dataset.href];
    if (v) el.setAttribute("href", v);
  });
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelector(".map").src = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&output=embed`;
  document.title = `${site.name} — qabulga yozilish`;

  // ---- Services by department ----
  const tabs = document.querySelector(".tabs");
  const list = document.querySelector(".service-list");
  let active = 0;
  function renderServices() {
    tabs.innerHTML = "";
    site.departments.forEach((d, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(i === active));
      b.textContent = d.name;
      b.addEventListener("click", () => {
        active = i;
        renderServices();
      });
      tabs.appendChild(b);
    });
    list.innerHTML = "";
    site.departments[active].services.forEach((s) => {
      const li = document.createElement("li");
      li.innerHTML = "<span></span><strong></strong>";
      li.querySelector("span").textContent = s.name;
      li.querySelector("strong").textContent = sum(s.price);
      list.appendChild(li);
    });
  }
  renderServices();

  // ---- Doctors ----
  const doctorList = document.querySelector(".doctor-list");
  site.doctors.forEach((d) => {
    const li = document.createElement("li");
    const initials = d.name
      .split(" ")
      .map((p) => p.charAt(0))
      .join("")
      .slice(0, 2);
    li.innerHTML = `<span class="doctor__avatar" aria-hidden="true"></span><strong></strong><span class="doctor__spec"></span><span class="doctor__exp"></span>`;
    li.querySelector(".doctor__avatar").textContent = initials;
    li.querySelector("strong").textContent = d.name;
    li.querySelector(".doctor__spec").textContent = d.specialty;
    li.querySelector(".doctor__exp").textContent = d.experience;
    doctorList.appendChild(li);
  });

  // ---- Appointment form ----
  const form = document.querySelector(".book-form");
  const err = form.querySelector(".form-error");
  const depSel = form.elements.namedItem("department");
  const docSel = form.elements.namedItem("doctor");
  const dateInput = form.elements.namedItem("date");
  const timeSel = form.elements.namedItem("time");

  site.departments.forEach((d, i) => depSel.add(new Option(d.name, String(i))));
  docSel.add(new Option("Farqi yo'q", ""));
  site.doctors.forEach((d, i) => docSel.add(new Option(`${d.name} — ${d.specialty}`, String(i))));

  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayStr = () => ymd(new Date());
  dateInput.min = todayStr();
  dateInput.value = todayStr();

  function fillTimes() {
    const prev = timeSel.value;
    timeSel.innerHTML = "";
    const chosen = new Date(dateInput.value + "T12:00:00");
    if (site.closedOnSunday && chosen.getDay() === 0) {
      timeSel.add(new Option("Yakshanba — dam olish kuni", ""));
      return;
    }
    const isToday = dateInput.value === todayStr();
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + 30;
    for (let m = site.openHour * 60; m < site.closeHour * 60; m += site.stepMinutes) {
      if (isToday && m < nowMin) continue;
      const t = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
      timeSel.add(new Option(t, t));
    }
    if (timeSel.options.length === 0) timeSel.add(new Option("Bu kunga vaqt qolmagan", ""));
    if ([...timeSel.options].some((o) => o.value === prev)) timeSel.value = prev;
  }
  dateInput.addEventListener("change", fillTimes);
  fillTimes();
  // Bugun vaqt qolmagan bo'lsa, keyingi ish kunini tanlaymiz
  for (let i = 1; !timeSel.value && i <= 7; i++) {
    dateInput.value = ymd(new Date(Date.now() + i * 86400000));
    fillTimes();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name").value.trim();
    const phone = form.elements.namedItem("phone").value.trim();
    const note = form.elements.namedItem("note").value.trim();
    let message = "";
    if (!timeSel.value) message = "Boshqa kunni tanlang.";
    else if (name.length < 2) message = "Ism va familiyangizni yozing.";
    else if (phone.replace(/\D/g, "").length < 9) message = "Telefon raqamini to'liq yozing.";
    err.hidden = !message;
    err.textContent = message;
    if (message) return;

    const dep = site.departments[Number(depSel.value)].name;
    const doc = docSel.value === "" ? "Farqi yo'q" : site.doctors[Number(docSel.value)].name;
    const lines = [
      `Qabulga yozilish (${site.name})`,
      "",
      `Yo'nalish: ${dep}`,
      `Shifokor: ${doc}`,
      `Vaqt: ${dateInput.value}, ${timeSel.value}`,
      `Bemor: ${name}`,
      `Telefon: ${phone}`,
    ];
    if (note) lines.push(`Shikoyat: ${note}`);
    window.open(`https://t.me/${site.telegram}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
})();
