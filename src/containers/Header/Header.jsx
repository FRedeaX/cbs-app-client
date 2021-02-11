import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "@yandex/ui/Button/touch-phone";
import classNames from "classnames";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { isMobile as isMobileDevice } from "react-device-detect";
import HeaderSocial from "../../components/header/HeaderSocial/HeaderSocial";
import {
  default as NavList,
  MenuGQL,
} from "../../components/header/NavList/NavList";
import Logo from "../../components/Logo/Logo";
import Layout from "../../components/UI/Layout/Layout";
import { scrollbarWidth } from "../../helpers";
import { delay } from "../../helpers/delay";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
import { IS_HEADER_POS_RESET_FRAGMENT } from "../../store/variables/header";
import {
  GET_OVERLAY_FRAGMENT,
  overlayVar,
} from "../../store/variables/overlay";
import { SCROLLY_FRAGMENT } from "../../store/variables/scrollY";
import { GET_WIDTH_FRAGMENT } from "../../store/variables/windowWidth";
import classes from "./Header.module.css";

const FETCH_MENU = gql`
  query FetchMenu {
    menus {
      nodes {
        ...MenuGQL
      }
    }
  }
  ${MenuGQL.fragments}
`;

const Header = () => {
  const {
    data: { windowWidth, overlay, scrollY, isHeaderPosReset },
  } = useQuery(gql`
    query {
      ${GET_WIDTH_FRAGMENT}
      ${GET_OVERLAY_FRAGMENT}
      ${SCROLLY_FRAGMENT}
      ${IS_HEADER_POS_RESET_FRAGMENT}
    }
  `);

  const [fetchMenus, { data: menus }] = useLazyQuery(FETCH_MENU);

  const [isMobile, setMobile] = useState(isMobileDevice);
  useLayoutEffect(() => {
    if (windowWidth <= 950 && !isMobile) setMobile(true);
    else if (windowWidth > 950 && isMobile) setMobile(false);
  }, [windowWidth, isMobile]);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (!overlay.isOpen) setOpen(false);
  }, [overlay.isOpen]);

  const prevScrollYRef = useRef(0);
  const [isHeaderHidden, setHeaderHidden] = useState(false);
  useEffect(() => {
    if (
      scrollY > 80 &&
      prevScrollYRef.current !== 0 &&
      prevScrollYRef.current < scrollY &&
      !isHeaderHidden
    ) {
      setHeaderHidden(true);
    } else if (
      (scrollY === 0 || prevScrollYRef.current > scrollY) &&
      isHeaderHidden
    ) {
      setHeaderHidden(false);
    }
    prevScrollYRef.current = scrollY;
  }, [scrollY, isHeaderHidden]);

  const [menu, setMenu] = useState(null);
  useLayoutEffect(() => {
    getLocalStorage("hMenu").then(
      (result) => {
        setMenu(result);
        delay(1600).then(() => fetchMenus());
      },
      () => fetchMenus()
    );
  }, [fetchMenus]);

  useEffect(() => {
    if (!menus) return;
    setLocalStorage("hMenu", menus);
  }, [menus]);

  const data = menu || menus;
  return (
    <header
      style={{ right: isHeaderPosReset ? `${scrollbarWidth}px` : "" }}
      className={classNames(classes.header, classes.position, {
        [classes["position--hidden"]]: isHeaderHidden,
      })}
    >
      {/* {console.log("H_Render")} */}
      <Layout page={false} padingTop={false} cls={classes.wrapper}>
        <div className={classes.logo}>
          <Logo />
        </div>
        {data && (
          <>
            <div
              className={classNames({
                [classes.desktop]: !isMobile,
                [classes.mobile]: isMobile,
                [classes["mobile--active"]]: isOpen,
              })}
            >
              <nav className={classes.primary}>
                <NavList
                  data={data.menus.nodes[0].menuItems}
                  isRow={!isMobile}
                  isMobile={isMobile}
                />
              </nav>
              <div
                className={classNames({
                  [classes["secondary_desktop"]]: !isMobile,
                  [classes["secondary_mobile"]]: isMobile,
                })}
              >
                {!isMobile && <HeaderSocial isMobile={false} />}
                <NavList
                  data={data.menus.nodes[1].menuItems}
                  className={classes.ul}
                  isRow={!isMobile}
                  isMobile={isMobile}
                  isRight={!isMobile}
                />
              </div>
            </div>
            {isMobile && (
              <div className={classes.controls}>
                <HeaderSocial isMobile={true} />
                <Button
                  size="m"
                  className={classNames(classes.controls_button, {
                    [classes["controls_button--active"]]: isOpen,
                  })}
                  onClick={() => {
                    overlayVar({ isOpen: !isOpen, zIndex: 2 });
                    setOpen(!isOpen);
                  }}
                  icon={() => <span className={classes.inner} />}
                />
              </div>
            )}
          </>
        )}
      </Layout>
    </header>
  );
};

// function areEqual(prevProps, nextProps) {
//   // console.log(prevProps.location, nextProps.location);
//   console.log(prevProps.isHeaderHidden);
//   if (prevProps.isHeaderHidden !== nextProps.isHeaderHidden) {
//     console.log("changeProps");
//     return false;
//   } else return true;
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(Header);
