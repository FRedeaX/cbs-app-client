import { gql } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React from "react";
import { menuItemsGQL, NavItems } from "../NavItems/NavItems";
import classes from "./Nav-list.module.css";

export const NavList = ({
  id,
  data,
  direction = "row",
  subList = false,
  subLvl = 1,
  isSubListReset,
  log,
  className,
  classNameItem,
  isRight = false,
}) => {
  if (subList && subLvl === 4) subLvl = 1;
  if (subList && isSubListReset) subLvl = 2;

  // console.log(log, subLvl);

  const cx = classNamesBind.bind(classes);
  const classNameList = cx(
    {
      body: true,
      "body--right": subList && isRight,
      [direction]: direction,
      subMenu: subList,
      "subMenu--lvl2": subLvl === 2,
      "subMenu--lvl3": subLvl === 3,
    },
    className
  );

  return (
    <ul className={classNameList}>
      <NavItems
        data={data.nodes}
        subItem={subList}
        subLvl={subLvl}
        parentIdList={id}
        className={classNameItem}
        isRight={isRight}
      />
    </ul>
  );
};

export const MenuGQL = {
  fragments: gql`
    fragment MenuGQL on Menu {
      menuItems(where: { parentId: "" }) {
        nodes {
          ...menuItemsGQL
          childItems {
            nodes {
              ...menuItemsGQL
              childItems {
                nodes {
                  ...menuItemsGQL
                  childItems {
                    nodes {
                      ...menuItemsGQL
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ${menuItemsGQL.fragments}
  `,
};
