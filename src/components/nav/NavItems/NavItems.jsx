import { gql } from "@apollo/client";
import { compose } from "@bem-react/core";
import {
  Button as ButtonDesktop,
  withSizeM,
  withViewDefault,
} from "@yandex/ui/Button/desktop";
import classNamesBind from "classnames/bind";
import React from "react";
import { isMobile } from "react-device-detect";
import { NavLink } from "react-router-dom";
import { createMarkup } from "../../../helpers";
import { NavList } from "../NavList/NavList";
import classes from "./Nav-item.module.css";

export const NavItems = ({
  data,
  subItem,
  subLvl,
  parentIdList,
  className,
  isRight,
}) => {
  const Button = compose(withSizeM, withViewDefault)(ButtonDesktop);
  const cx = classNamesBind.bind(classes);

  return data.map(({ id, parentId, label, url, childItems }) => {
    const { host, pathname } = new URL(url || "https://cbsbaikonur.ru/");
    // console.log(!!childItems?.nodes.length && subItem, subLvl, label);
    if (!!childItems?.nodes.length && subItem) subLvl++;
    // console.log(
    //   label,
    //   !!childItems?.nodes.length,
    //   subItem,
    //   parentId === parentIdList
    // );
    return (
      <li
        key={id}
        className={cx(
          {
            li: true,
            "li--overlay":
              !!childItems?.nodes.length && parentId === parentIdList,
            "li--overlay-right": isRight,
          },
          className
        )}
      >
        {url ? (
          <>
            {host === "37.230.203.238" ? (
              <a href={url} className={classes.link}>
                <span className={classes.text}>{label}</span>
              </a>
            ) : (
              <NavLink to={pathname} className={classes.link}>
                <span
                  className={cx({ text: true, "text--mb": subItem })}
                  dangerouslySetInnerHTML={createMarkup(label)}
                />
              </NavLink>
            )}
          </>
        ) : !url && !!childItems?.nodes.length && subItem && isMobile && 0 ? (
          <Button
            view="default"
            size="m"
            className={cx({ text: true, "text--mb": subItem })}
          >
            {label}
          </Button>
        ) : (
          <span
            className={cx(classes.text, classes["text--cursor"])}
            dangerouslySetInnerHTML={createMarkup(label)}
          />
        )}
        {!!childItems?.nodes.length && (
          <NavList
            id={!parentIdList && id}
            data={childItems}
            direction="column"
            subList={true}
            subLvl={subItem ? subLvl : 1}
            isSubListReset={parentIdList && parentIdList === parentId}
            isRight={isRight}
            log={label}
          />
        )}
      </li>
    );
  });
};

export const menuItemsGQL = {
  fragments: gql`
    fragment menuItemsGQL on MenuItem {
      id
      label
      url
      parentId
    }
  `,
};
