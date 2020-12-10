import React from "react";
import Layout from "../UI/Layout/Layout";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <Layout page={false}>
        <div className={classes.body}>
          {process.env.NODE_ENV === "production" && (
            <a
              href="https://metrika.yandex.ru/stat/?id=33186213&amp;from=informer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "10px", color: "initial" }}
            >
              <img
                src="https://informer.yandex.ru/informer/33186213/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
                style={{
                  width: "88px",
                  height: "31px",
                  border: 0,
                  borderRadius: 0,
                }}
                alt="Яндекс.Метрика"
                title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                className="ym-advanced-informer skip"
                data-cid="33186213"
                data-lang="ru"
              />
            </a>
          )}
          {/* <Litres /> */}
        </div>
      </Layout>
    </div>
  );
}

export default Footer;
