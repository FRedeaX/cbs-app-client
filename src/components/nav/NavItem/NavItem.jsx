import { gql } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React from "react";
import classes from "./Nav-item.module.css";

export const NavItem = ({ children }) => {
  const cx = classNamesBind.bind(classes);

  return <li className={cx({ li: true })}>{children}</li>;
};

const childItemsGQL = {
  fragments: gql`
    fragment childItemsGQL on MenuItemToMenuItemConnection {
      id
      label
      url
    }
  `,
};

export const navItemGQL = {
  fragments: gql`
    fragment navItemGQL on MenuItem {
      id
      label
      url
      childItems {
        nodes {
          ...childItemsGQL
        }
      }
    }
    ${childItemsGQL.fragments}
  `,
};

// const node = {
//   fragments: gql`
//     fragment node on Menus {
//       id
//       label
//       path
//     }
//   `,
// };
