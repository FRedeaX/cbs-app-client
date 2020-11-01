import React, { useState } from "react";
import { classJoin } from "../../../../../constant/function";
import classesInfo from "../Contact-info.module.css";
import classes from "./Telefon.module.css";

export const Telefon = (props) => {
  const { telefon } = props;
  const [countTel, setCountTel] = useState(3);

  function renderTelefonItem(data) {
    return data
      .filter((tel, index) => index < countTel)
      .map((item, index) => {
        // if (index < countTel)
        return (
          <div
            key={index}
            className={classJoin([classesInfo.item, classes.item])}
          >
            <div className={classesInfo["left-column"]}>
              <h5 className={classes.subtitle}>{item.position}</h5>
              <span className={classes.description}>{item.name}</span>
            </div>
            <a
              className={classJoin([
                classesInfo["right-column"],
                classes.number,
              ])}
              href={`tel:833622${item.tel}`}
            >
              {item.tel}
            </a>
          </div>
        );
      });
  }

  function hendleClick(e) {
    if (countTel === telefon.length) {
      setCountTel(3);
      e.target.textContent = "Показать ещё";
    } else {
      setCountTel(telefon.length);
      e.target.textContent = "Скрыть";
    }
  }
  return (
    <div className={classJoin([classesInfo.info, classesInfo["info--mt"]])}>
      {/* {console.log("Telefon")} */}
      <h4 className={classJoin([classesInfo.title, classes.title])}>Телефон</h4>
      <div className={classJoin([classesInfo.list, classes.list])}>
        {renderTelefonItem(telefon)}
        {telefon.length > 1 ? (
          <button className={classes.button} onClick={(e) => hendleClick(e)}>
            Показать ещё
          </button>
        ) : null}
      </div>
    </div>
  );
};
