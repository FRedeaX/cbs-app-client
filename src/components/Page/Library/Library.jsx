import React, { useEffect, useState } from "react";
import { asyncLoadScript } from "../../../helpers";
import Title, { SUBTITLE } from "../../Title/Title";
import Layout from "../../UI/Layout/Layout";
import { urlMap as src } from "./../../../constant/api";
import Seo from "./../../Seo/Seo";
import ContactInfo from "./ContactInfo/ContactInfo";
import classes from "./Library.module.css";
import LibraryInfo from "./LibraryInfo/LibraryInfo";
let map;

const Library = () => {
  const [filial, setFilial] = useState(filials.cgb);

  // const isMapLoaded = useSelector((state) => state.UI.mapLoaded);
  // const dispatch = useDispatch();
  // const setApiLoaded = useCallback(
  //   (isload) => {
  //     dispatch(setApiLoad(isload));
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    // function loadScript(src) {
    //   return new Promise((resolve, reject) => {
    //     if (window.ymaps) {
    //       return resolve();
    //     }
    //     let script = document.createElement("script");
    //     script.async = true;
    //     script.src = src;
    //     script.addEventListener("load", function () {
    //       document.body.style.minHeight = "";
    //       resolve();
    //     });
    //     script.addEventListener("error", function (e) {
    //       reject(e);
    //     });
    //     document.body.appendChild(script);
    //   });
    // }

    function init() {
      let zoom = 14;
      let center = [45.6246, 63.308];
      const FOCUS_ZOOM = 17;
      if (window.matchMedia("(max-width: 446px)").matches) {
        zoom = 13;
        center = [45.626, 63.308];
      }
      map = new window.ymaps.Map("map", {
        center,
        zoom,
        controls: ["zoomControl"],
      });

      Object.values(filials).forEach((item) => {
        let placemark = new window.ymaps.Placemark(
          [item.pointX, item.pointY],
          {
            id: item.slug,
            balloonContentHeader: item.name,
            balloonContentBody: item.address,
          },
          {
            preset: "twirl#greenStretchyIcon",
          }
        );
        map.geoObjects.add(placemark);
        placemark.events.add("click", function (e) {
          const id = placemark.properties.get("id");
          findFilial(id);

          let targetObject = e.get("target");
          if (targetObject.geometry.getType() === "Point") {
            // map.panTo(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
            map.setCenter(targetObject.geometry.getCoordinates(), FOCUS_ZOOM);
          }
        });
        placemark.events.add("balloonclose", function (e) {
          map.setZoom(zoom);
          map.setCenter([45.6246, 63.308]);
        });
      });
    }

    asyncLoadScript(src, window.ymaps).then(function () {
      window.ymaps.ready(init);
    });
  }, []);

  useEffect(() => {
    const selectPlacemark = () => {
      let geoObjects = window.ymaps.geoQuery(map.geoObjects);

      // выделим выбранный
      let selected = geoObjects
        .search(`properties.id = '${filial.slug}'`)
        .setOptions("preset", "islands#redIcon");

      // все остальные перекрасим обратно
      geoObjects.remove(selected).setOptions("preset", "islands#blueIcon");
    };

    if (map) selectPlacemark();
  }, [filial]);

  const findFilial = (id) => {
    //console.log(id, "test");
    const findFilial = Object.values(filials).find((item) => item.slug === id);
    setFilial(findFilial);
  };

  const renderControls = () => {
    //console.log("button");
    return Object.values(filials).map((item) => {
      return (
        <button
          key={item.slug}
          type="button"
          className={filial.slug === item.slug ? classes.active : null}
          data-slug={item.slug}
          onClick={(e) => findFilial(e.target.attributes[1].value)}
        >
          {item.shortName}
        </button>
      );
    });
  };
  return (
    <>
      {/* {console.log("Library", filial)} */}
      <Seo title={"Библиотеки"} description={"График работы библиотек"} />
      <div className={classes.body}>
        <Layout>
          <div className={classes.title}>
            <h2>{filial.name}</h2>
          </div>
          {/* <div className={classes.subtitle}> */}
          <Title type={SUBTITLE} HtmlTeg={"h3"} cls={classes.subtitle}>
            {filial.address}
          </Title>
          {/* </div> */}
          <div className={classes.controls}>{renderControls()}</div>
          <div className={classes.content}>
            <div id="map" className={classes.map}></div>
            <aside className={classes.aside}>
              <ContactInfo
                schedule={filial.schedule}
                email={filial.email}
                telefon={filial.telefon}
              />
            </aside>
            <div className={classes.info}>
              {filial.url && <LibraryInfo url={filial.url} />}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Library;

const weekday = {
  monday: "пн",
  tuesday: "вт",
  wednesday: "ср",
  thursday: "чт",
  friday: "пт",
  saturday: "сб",
  sunday: "вс",
  cleanupDay: "Санитарный день",
};

const filials = {
  cgb: {
    shortName: "ЦГБ",
    name: "Центральная городская библиотека",
    title: "Центральной городской библиотеки",
    address: "5-й мкр, дом 3«А»",
    slug: "cgb",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "Выходной",
      },
      {
        weekday: weekday.sunday,
        time: "10:00-17:00",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
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
  cgdb: {
    shortName: "ЦГДБ",
    name: "Центральная городская детская библиотека им. А.С. Пушкина",
    title: "Центральной городской детской библиотеки им. А.С. Пушкина",
    address: "ул. Максимова, дом 10, здание ЦРТДиЮ (первый этаж)",
    slug: "cgdb",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.tuesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.wednesday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.thursday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.friday,
        time: "09:00-18:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    telefon: [
      {
        position: "Заведующая ЦГДБ им. А.С. Пушкина",
        position_desc:
          "Заведующая Центральной городской детской библиотеки им.А.С. Пушкина",
        name: "Демина Светлана Викторовна",
        tel: "72981",
      },
    ],
    pointX: 45.6244,
    pointY: 63.328,
  },
  f1: {
    shortName: "Филиал №1",
    name: "Библиотека им. Т.Г. Шевченко (филиал №1)",
    title: "Библиотеки им. Т.Г. Шевченко",
    address: "ул. Янгеля, дом 23«А»",
    slug: "f1",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последний четверг месяца",
      },
    ],
    telefon: [
      {
        position: "Заведующая библиотекой – филиал №1",
        name: "Кузнецова Ольга Игоревна",
        tel: "71925",
      },
    ],
    pointX: 45.6362,
    pointY: 63.3138,
  },
  f5: {
    shortName: "Филиал №5",
    name: "Библиотека семейного чтения (филиал №5)",
    title: "Библиотеки семейного чтения",
    address: "7-й мкр, дом 7, кв. 39-40",
    slug: "f5",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.friday,
        time: "10:00-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последний четверг месяца",
      },
    ],
    telefon: [
      {
        position: "Заведующая библиотекой – филиал №5",
        name: "Залгараева Баян Мадинаевна",
        tel: "54993",
      },
    ],
    pointX: 45.6145,
    pointY: 63.2928,
  },
  ooef: {
    shortName: "ОЕФКиТЛ",
    name:
      "Отдел организации Единого фонда, книгохранения и технической литературы",
    title:
      "Отдела организации Единого фонда, книгохранения и технической литературы",
    address: "ул. Титова, дом 6",
    slug: "ooef",
    url: "",
    schedule: [
      {
        weekday: weekday.monday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.tuesday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.wednesday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.thursday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.friday,
        time: "08:30-19:00",
      },
      {
        weekday: weekday.saturday,
        time: "10:00-17:00",
      },
      {
        weekday: weekday.sunday,
        time: "Выходной",
      },
      {
        cleanupDay: true,
        weekday: weekday.cleanupDay,
        time: "Последняя среда месяца",
      },
    ],
    telefon: [
      {
        position: "Заведующая отделом ЕФКиТЛ",
        position_desc:
          "Заведующая отделом Единого фонда, книгохранения и технической литературы",
        name: "Савина Лариса Геннадьевна",
        tel: "75309",
      },
    ],
    pointX: 45.6166,
    pointY: 63.3189,
  },
};
