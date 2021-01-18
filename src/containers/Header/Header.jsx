import { gql, useQuery } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React from "react";
import Logo from "../../components/Logo/Logo";
import { MenuGQL, NavList } from "../../components/nav/NavList/NavList";
import Layout from "../../components/UI/Layout/Layout";
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
  const { data: dataMenu } = useQuery(FETCH_MENU);
  // const [menu, setMenu] = useState(null);
  // useLayoutEffect(() => {
  //   // const storage = JSON.parse(window.localStorage.getItem("hMenu"));
  //   // setMenu(storage);

  //   // if (!storage) {
  //   //   fetchMenu();
  //   // } else {
  //   setTimeout(() => {
  //     fetchMenu();
  //   }, 1600);
  //   // }
  // }, [fetchMenu]);

  // useEffect(() => {
  //   if (!dataMenu) return;
  //   window.localStorage.setItem("hMenu", JSON.stringify(dataMenu));
  // }, [dataMenu]);
  const data = dataMenu; //menu ? menu : dataMenu; // menu || dataMenu
  console.log(dataMenu);
  const cx = classNamesBind.bind(classes);
  return (
    <header className={classes.header}>
      <Layout page={false} cls={classes.wrapper}>
        <div className={classes.logo}>
          <Logo />
        </div>
        {data && (
          <div
            className={cx({
              navigation: true,
              // "navigation--active": isOpen,
            })}
          >
            <nav className={classes.primary}>
              {/* <Primary data={data} /> */}
              <NavList data={data.menus.nodes[0].menuItems} />
            </nav>
            <div className={classes.secondary}>
              <NavList
                data={data.menus.nodes[1].menuItems}
                className={classes.ul}
                isRight={true}
              />
            </div>
          </div>
        )}
      </Layout>
    </header>
  );
};

export default Header;
