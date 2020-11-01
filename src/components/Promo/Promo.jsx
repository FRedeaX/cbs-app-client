import React from "react";
import { classJoin } from "../../constant/function";
import Title from "../Title/Title";
import classes from "./../Post/Card/Card.module.css";
import classesPromo from "./Promo.module.css";

const Promo = () => {
  return (
    <section className={classesPromo.promo}>
      <header className={classesPromo.header}>
        <Title HtmlTeg="h2">Внимание, читатели!</Title>
      </header>
      <div className={classesPromo.container}>
        <article
          className={classJoin([
            classes.item,
            classes["item--horizontal"],
            classesPromo.item,
          ])}
        >
          <div
            className={classJoin([classes.image, classes["image--horizontal"]])}
          >
            <img
              // src={data.featuredImage.sourceUrl}
              src={`https://cbsbaikonur.ru/wp-content/uploads/2020/10/20201013.jpg`}
              className={classJoin([classes.img, classes["img--horizontal"]])}
              alt="«Королева Книга»"
            />
          </div>

          <div className={classes.info}>
            <div className={classes.text}>
              <h3 className={classes.title}>
                <a
                  href='!#'
                  className={classJoin([
                    classes.link,
                    classesPromo.button,
                    "Promo__zoom",
                  ])}
                >
                  «Королева Книга» – торжественное награждение лучших читателей
                </a>
              </h3>
              <div
                className={classJoin([classes.subtitle, classesPromo.subtitle])}
              >
                «Читательский марафон», «Созвездие лучших читателей»,
                «Путешествие в книжное царство» – подведение итогов конкурсов
                читательских достижений
              </div>
            </div>
          </div>
          {/* <img
            className={classesPromo.img}
            src="https://cbsbaikonur.ru/wp-content/uploads/2020/10/20201013@1600.jpg"
            alt="«Королева Книга» – торжественное награждение лучших читателей."
          /> */}
        </article>
      </div>
    </section>
  );
};

export default Promo;
