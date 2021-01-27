import { gql } from "@apollo/client";
import classNamesBind from "classnames/bind";
import React, { memo } from "react";
import { default as NavItems, menuItemsGQL } from "../NavItems/NavItems";
import classes from "./Nav-list.module.css";

const NavList = ({
  id,
  data,
  isRow = false,
  isMobile = false,
  headerLabel = false,
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

  const cx = classNamesBind.bind(classes);
  const classNameList = cx(
    {
      body: true,
      "body--right": subList && isRight,
      row: isRow,
      "subMenu-desktop": subList && !isMobile,
      "subMenu-mobile": subList && isMobile && subLvl >= 1,
      "subMenu-mobile--padding": subList && isMobile,

      "subMenu-desktop--lvl2": subLvl === 2 && !isMobile,
      "subMenu-desktop--lvl3": subLvl === 3 && !isMobile,
    },
    className
  );

  const listOpenHendler = (event, isBack = false) => {
    const { target } = event;
    if (isBack) {
      target.parentNode.parentNode.classList.remove(
        `${classes["subMenu-mobile--active"]}`
      );
    } else {
      target.nextSibling.classList.add(`${classes["subMenu-mobile--active"]}`);
    }
  };

  const closeAllHendler = (event) => {
    event.stopPropagation();
    if (event.target.nodeName === "UL")
      document
        .querySelectorAll(`.${classes["subMenu-mobile"]}`)
        .forEach((node) =>
          node.classList.remove(`${classes["subMenu-mobile--active"]}`)
        );
  };

  // console.log("L_Render");
  return (
    <ul className={classNameList} onClick={closeAllHendler}>
      {}
      <NavItems
        data={data.nodes}
        subItem={subList}
        subLvl={subLvl}
        parentIdList={id}
        className={classNameItem}
        isRight={isRight}
        isMobile={isMobile}
        headerLabel={headerLabel}
        onClick={listOpenHendler}
      />
    </ul>
  );
};

export default memo(NavList);

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
