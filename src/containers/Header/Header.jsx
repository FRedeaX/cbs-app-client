import { gql, useQuery } from "@apollo/client";
import React from "react";
import { navItemGQL } from "../../components/nav/NavItem/NavItem";

const FETCH_MENU = gql`
  query FetchMenu {
    menus {
      nodes {
        id
        menuItems {
          nodes {
            ...navItemGQL
          }
        }
      }
    }
  }
  ${navItemGQL.fragments}
`;

const FETCH_MENU_1 = gql`
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
  // const data = menu ? menu : dataMenu;
  console.log(dataMenu);
  return <div></div>;
};

export default Header;
