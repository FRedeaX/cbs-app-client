import { gql } from "@apollo/client";
import { compose } from "@bem-react/core";
import {
  Button as ButtonDesktop,
  withSizeM,
  withViewDefault,
  withWidthMax,
} from "@yandex/ui/Button/touch-phone";
import { Icon } from "@yandex/ui/Icon/touch-phone/bundle";
import classNamesBind from "classnames/bind";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { createMarkup } from "../../../helpers";
import { overlayVar } from "../../../store/variables/overlay";
import NavList from "../NavList/NavList";
import classes from "./Nav-item.module.css";

const NavItems = ({
  data,
  subItem,
  subLvl,
  parentIdList,
  className,
  isRight,
  isMobile,
  headerLabel,
  onClick,
}) => {
  const cx = classNamesBind.bind(classes);
  const Button = compose(
    withSizeM,
    withViewDefault,
    withWidthMax
  )(ButtonDesktop);
  // const Icon = compose(withTypeArrow)(IconDesktop);

  // console.log("I_Render");
  return (
    <>
      {headerLabel && (
        <li className={cx(className)}>
          <Button
            width="max"
            size="m"
            iconLeft={(className) => (
              <Icon
                type="arrow"
                direction="left"
                className={cx(className, [classes["icon_width"]])}
              />
            )}
            className={classes.button}
            onClick={(event) => onClick(event, true)}
          >
            <span
              className={classes.text}
              dangerouslySetInnerHTML={createMarkup(headerLabel)}
            />
          </Button>
        </li>
      )}

      {data.map(({ id, parentId, label, url, childItems }) => {
        const { host, pathname } = new URL(url || "https://cbsbaikonur.ru/");
        if (!!childItems?.nodes.length && subItem) subLvl++;

        return (
          <li
            key={id}
            className={cx(
              {
                desktop: !isMobile,
                "desktop--overlay":
                  !!childItems?.nodes.length &&
                  parentId === parentIdList &&
                  !isMobile,
                "desktop--overlay-radius": isRight,
                "mobile--margin-left": isMobile && subItem,
              },
              className
            )}
          >
            {!!childItems?.nodes.length && isMobile ? (
              <Button
                width="max"
                size="m"
                iconRight={(className) => (
                  <Icon
                    type="arrow"
                    direction="right"
                    className={cx(className, [classes["icon_width"]])}
                  />
                )}
                className={classes.button}
                onClick={onClick}
              >
                <span
                  className={classes.text}
                  dangerouslySetInnerHTML={createMarkup(label)}
                />
              </Button>
            ) : (
              <>
                {host === "37.230.203.238" ? (
                  <a href={url} className={classes.link}>
                    <span className={classes.text}>{label}</span>
                  </a>
                ) : (
                  <NavLink
                    to={pathname}
                    className={cx({
                      link: true,
                      "link--cursor": !!childItems?.nodes.length,
                    })}
                    activeClassName={classes.link_active}
                    aria-current={!!childItems?.nodes.length ? false : "page"}
                    onClick={() => overlayVar({ isOpen: false })}
                  >
                    <span
                      className={cx({ text: true, "text--mb": subItem })}
                      dangerouslySetInnerHTML={createMarkup(label)}
                    />
                  </NavLink>
                )}
              </>
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
                isMobile={isMobile}
                headerLabel={!!childItems?.nodes.length && isMobile && label}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default memo(NavItems);

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
