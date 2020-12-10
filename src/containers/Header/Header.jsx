import { gql, useQuery } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { MAIN, Nav, SECONDARY } from "../../components/Navigation/Nav/Nav";
import Social from "../../components/Social/Social";
import Layout from "../../components/UI/Layout/Layout";
import Overlay from "../../components/UI/Overlay/Overlay";
import { classJoin } from "../../helpers";
// import { fetchHeader } from "../../store/action/header";
import classes from "./Header.module.css";

const FETCHMENU = gql`
  query FetchMenu {
    menus {
      nodes {
        id
        menuItems(where: { parentId: "" }) {
          nodes {
            id
            label
            url
            childItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(FETCHMENU);

  const [isScroll, setScroll] = useState(false);
  useEffect(() => {
    const hendleScroll = () => {
      if (window.pageYOffset >= 1 && !isScroll) {
        setScroll(true);
      } else if (window.pageYOffset < 1 && isScroll) {
        setScroll(false);
      }
    };
    document.addEventListener("scroll", hendleScroll);
    return () => document.removeEventListener("scroll", hendleScroll);
  }, [isScroll]);

  const [isOpen, setOpen] = useState(false);
  const hendleOpenMenu = () => {
    isOpen ? setOpen(false) : setOpen(true);
  };

  const { pathname } = useLocation();
  const [navDataLink, setNavDataLink] = useState(null);
  useEffect(() => {
    if (!loading) setNavDataLink(document.querySelectorAll("[data-link]"));
  }, [loading]);

  useEffect(() => {
    if (navDataLink) {
      const parentURL = pathname.split("/")[1];
      Object.values(navDataLink).find((li) => AddClassParentURL(li, parentURL));
    }
  }, [pathname, navDataLink]);

  function AddClassParentURL(item, parentURL) {
    if (item.getAttribute("data-link") === parentURL)
      item.classList.add("active");
    else item.classList.remove("active");
  }

  if (error) return console.error(error);

  const RenderSocial = () => (
    <div className={classes.social}>
      <Social
        type={"vk"}
        url={"https://vk.com/cbsbaikonur"}
        clsSVG={classJoin([classes.svg, classes["svg--vk"]])}
      />
      <Social
        type={"ok"}
        url={"https://ok.ru/vbibliotek"}
        clsSVG={classJoin([classes.svg, classes["svg--ok"]])}
      />
      <Social
        type={"youtube"}
        url={"https://www.youtube.com/channel/UC0o0y_ci_obgPga8Wnlq0aA/"}
        clsSVG={classJoin([classes.svg, classes["svg--youtube"]])}
      />
    </div>
  );

  const cx = classNamesBind.bind(classes);
  return (
    <header className={cx({ header: true, "header--scrolled": isScroll })}>
      <Layout page={false}>
        <div className={classes.grid}>
          <div className={classes.logo}>
            <Logo />
          </div>
          {data && (
            <>
              <div
                className={cx({
                  navigation: true,
                  "navigation--active": isOpen,
                })}
              >
                <nav className={classes.nav} id="nav">
                  <Nav
                    type={MAIN}
                    data={data.menus.nodes[0].menuItems}
                    onClose={setOpen}
                  />
                </nav>
                <div className={classes.secondary}>
                  <div className={classes["desktop-icons"]}>
                    {/* <Litres /> */}
                    <RenderSocial />
                  </div>
                  <Nav
                    type={SECONDARY}
                    data={data.menus.nodes[1].menuItems}
                    onClose={setOpen}
                  />
                  {/* <div
                    className={classes["tablet-icons"]}
                    onClick={() => setOpen(false)}
                  >
                    <Litres />
                  </div> */}
                </div>
              </div>
              <div className={classes.controls}>
                {/* при уменьшении высоты происходит перерендер RenderSocial */}
                <RenderSocial />
                <button
                  className={cx({
                    button: true,
                    "button--active": isOpen,
                  })}
                  type="button"
                  onClick={hendleOpenMenu}
                >
                  <div className={classes.line}></div>
                </button>
              </div>
              <Overlay
                open={isOpen}
                type={"nav"}
                onClick={() => setOpen(false)}
              />
            </>
          )}
        </div>
      </Layout>
    </header>
  );
};

export default memo(Header);
