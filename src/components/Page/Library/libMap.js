ymaps.ready(init);
let filials = [
  {
    name: "Центральная городская библиотека",
    title: "Центральной городской библиотеки",
    address: "5-й мкр., дом 3 «А»",
    slug: "cgb",
    monday: "10:00-19:00",
    tuesday: "10:00-19:00",
    wednesday: "10:00-19:00",
    thursday: "10:00-19:00",
    friday: "10:00-19:00",
    saturday: "Выходной",
    sunday: "10:00-17:00",
    cleanupDay: "Последняя среда месяца",
    email: "cbsbaikonur@yandex.ru",
    telefon: [
      {
        position: "Директор",
        name: "Неспанова Ольга Васильевна",
        tel: "50287",
      },
      {
        position: "Заместитель директора",
        name: "Некрасова Марина Викторовна",
        tel: "50181",
      },
      {
        position: "Главный бухгалтер",
        name: "Шагабудинова Людмила Васильевна",
        tel: "50293",
      },
      {
        position: "Юрисконсульт",
        name: "Кулмурзаева Анжелика Андреевна",
        tel: "51361",
      },
      {
        position: "Главный инженер",
        name: "Досбаева Эльмира Багдатовна",
        tel: "50181",
      },
      {
        position: "Заведующая отделом обслуживания ЦГБ",
        position_desc:
          "Заведующая отделом обслуживания Центральной городской библиотеки",
        name: "Трошина Виктория Борисовна",
        tel: "51176",
      },
      {
        position: "Ученый секретарь ЦГБ",
        position_desc: "Ученый секретарь Центральной городской библиотеки",
        name: "Семёнова Ирина Владимировна",
        tel: "50181",
      },
      {
        position: "Заведующая отделом комплектования",
        name: "Крицкая Лариса Валентиновна",
        tel: "51361",
      },
      {
        position: "Заведующая ИБО ЦГБ",
        position_desc:
          "Заведующая информационо-библиографическим отделом Центральной городской библиотеки",
        name: "Останина Анна Васильевна",
        tel: "51361",
      },
    ],
    pointX: 45.6222,
    pointY: 63.2986,
  },
  {
    name: "Центральная городская детская библиотека им. А.С. Пушкина",
    title: "Центральной городской детской библиотеки им. А.С. Пушкина",
    address: "ул. Максимова, д.10, здание ЦРТДиЮ (первый этаж)",
    slug: "cgdb",
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "10:00-17:00",
    sunday: "Выходной",
    cleanupDay: "Последняя среда месяца",
    telefon: [
      {
        position: "Заведующая ЦГДБ им. А.С. Пушкина",
        position_desc:
          "Заведующая Центральной городской детской библиотеки им.А.С. Пушкина",
        name: "Демина Светлана Викторовна",
        tel: "7-29-81",
      },
    ],
    pointX: 45.6244,
    pointY: 63.328,
  },
  {
    name: "Библиотека им. Т.Г. Шевченко (филиал №1)",
    title: "Библиотеки им. Т.Г. Шевченко",
    address: "ул. Янгеля, дом 23 «А»",
    slug: "f1",
    monday: "10:00-19:00",
    tuesday: "10:00-19:00",
    wednesday: "10:00-19:00",
    thursday: "10:00-19:00",
    friday: "10:00-19:00",
    saturday: "10:00-17:00",
    sunday: "Выходной",
    cleanupDay: "Последний четверг месяца",
    pointX: 45.6362,
    pointY: 63.3138,
  },
  {
    name: "Библиотека семейного чтения (филиал №5)",
    title: "Библиотеки семейного чтения",
    address: "7-й мкр., дом 7, кв. 39-40",
    slug: "f5",
    monday: "10:00-19:00",
    tuesday: "10:00-19:00",
    wednesday: "10:00-19:00",
    thursday: "10:00-19:00",
    friday: "10:00-19:00",
    saturday: "10:00-17:00",
    sunday: "Выходной",
    cleanupDay: "Последний четверг месяца",
    pointX: 45.6145,
    pointY: 63.2928,
  },
  {
    name:
      "Отдел организации Единого фонда, книгохранения и технической литературы",
    title:
      "Отдела организации Единого фонда, книгохранения и технической литературы",
    address: "ул. Титова, дом 6",
    slug: "ooef",
    monday: "08:30-19:00",
    tuesday: "08:30-19:00",
    wednesday: "08:30-19:00",
    thursday: "08:30-19:00",
    friday: "08:30-19:00",
    saturday: "10:00-17:00",
    sunday: "Выходной",
    cleanupDay: "Последняя среда месяца",
    pointX: 45.6166,
    pointY: 63.3189,
  },
];

function init() {
  let myMap = new ymaps.Map("map", {
    center: [45.6246, 63.308],
    zoom: 14,
    controls: ["zoomControl"],
  });

  for (let index = 0; index < filials.length; index++) {
    let placemark = new ymaps.Placemark(
      [filials[index].pointX, filials[index].pointY],
      {
        id: index,
        balloonContent: filials[index].name,
      },
      {
        preset: "twirl#greenStretchyIcon",
      }
    );
    myMap.geoObjects.add(placemark);
    placemark.events.add("click", function (e) {
      const id = placemark.properties.get("id");
      fillInfo(id);
    });
  }
}
const title = document.querySelector(".library__title"),
  subtitle = document.querySelector(".library__subtitle"),
  scheduleListTime = document.querySelectorAll(".schedule__time");
let divList;

function fillInfo(id) {
  fillSchedule(id);
  fillEmail(id);
  fillTelefon(id);
}

function fillSchedule(id) {
  title.textContent = filials[id].name;
  subtitle.textContent = filials[id].address;
  scheduleListTime[0].textContent = filials[id].monday;
  scheduleListTime[1].textContent = filials[id].tuesday;
  scheduleListTime[2].textContent = filials[id].wednesday;
  scheduleListTime[3].textContent = filials[id].thursday;
  scheduleListTime[4].textContent = filials[id].friday;
  scheduleListTime[5].textContent = filials[id].saturday;
  scheduleListTime[6].textContent = filials[id].sunday;
  scheduleListTime[7].textContent = filials[id].cleanupDay;
}

function fillEmail(id) {
  const email = document.querySelector(".email__description");
  email.textContent = filials[id].email;
  email.href = "mailto:" + filials[id].email;
}

function fillTelefon(id) {
  if (divList) divList.remove();

  const telefon = document.querySelector(".telefon");
  divList = document.createElement("div");

  filials[id].telefon.length < 2
    ? divList.classList.add("library-info__list", "telefon__list")
    : divList.classList.add(
        "library-info__list",
        "telefon__list",
        "telefon__list--more"
      );

  filials[id].telefon.forEach((element, index) => {
    const divItem = document.createElement("div"),
      div = document.createElement("div"),
      h4 = document.createElement("h4"),
      span = document.createElement("span"),
      a = document.createElement("a");

    index < 2
      ? divItem.classList.add("library-info__item", "telefon__item")
      : divItem.classList.add(
          "library-info__item",
          "telefon__item",
          "telefon__item--more"
        );

    div.classList.add("library-info__left-column");
    h4.classList.add("library-info__subtitle");
    span.classList.add("telefon__description");
    a.classList.add("library-info__right-column", "telefon__number");

    h4.textContent = element.position;
    span.textContent = element.name;
    a.textContent = element.tel;
    a.href = "tel:" + element.tel;
    div.appendChild(h4);
    div.appendChild(span);
    divItem.appendChild(div);
    divItem.appendChild(a);
    divList.appendChild(divItem);
  });

  telefon.appendChild(divList);

  if (filials[id].telefon.length > 2)
    divList.appendChild(createButtonTelefoneMore());

  function createButtonTelefoneMore() {
    button = document.createElement("button");
    button.classList.add("telefon__btn", "btn");
    button.textContent = "Показать ещё";
    let isHidden = true;
    button.addEventListener(
      "click",
      () => {
        divList.classList.toggle("telefon__list--more");
        isHidden
          ? ((button.textContent = "Скрыть"), (isHidden = !isHidden))
          : ((button.textContent = "Показать ещё"), (isHidden = !isHidden));
      },
      false
    );
    return button;
  }
}

window.onload = fillInfo(0);
