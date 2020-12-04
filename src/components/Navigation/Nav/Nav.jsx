import classNamesBind from "classnames/bind";
import React from "react";
import { NavLink } from "react-router-dom";
import { createMarkup } from "../../../helpers";
import classes from "./Nav.module.css";

export const MAIN = "MAIN",
  SECONDARY = "SECONDARY";

export const Nav = ({ type, data, onClose }) => {
  const cx = classNamesBind.bind(classes);

  function renderNav(menu, isSubMenu) {
    return (
      <ul
        className={cx({
          list: true,
          subMneu: isSubMenu,
          secondary: type === SECONDARY,
        })}
      >
        {renderNavItem(menu)}
      </ul>
    );
  }

  function renderNavItem(menu) {
    return menu.map((item) => (
      <li
        key={item.id}
        className={cx({
          item: true,
          secondary__item: type === SECONDARY,
        })}
      >
        {renderLink(item)}
        {item.childItems &&
          item.childItems.nodes.length !== 0 &&
          renderNav(item.childItems.nodes, true)}
      </li>
    ));
  }

  const renderLink = ({ label, url, childItems }) => {
    if (!url && childItems.nodes.length !== 0) {
      const parentURL = childItems.nodes[0].url.split("/")[3];
      return (
        <span
          className={cx(classes.text, classes.span)}
          data-link={`${parentURL}`}
          dangerouslySetInnerHTML={createMarkup(label)}
        />
      );
    } else if (!url)
      return (
        <span
          className={cx(classes.text, classes.span)}
          dangerouslySetInnerHTML={createMarkup(label)}
        />
      );
    else {
      const uri = new URL(url);
      if (uri.host === "37.230.203.238") {
        return (
          <a
            href={uri.href}
            className={cx(classes.text, classes.link)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onClose(false)}
          >
            {label}
          </a>
        );
      } else {
        return (
          <NavLink
            to={uri.pathname}
            className={cx(classes.text, classes.link)}
            dangerouslySetInnerHTML={createMarkup(label)}
            onClick={() => onClose(false)}
          />
        );
      }
    }
  };

  return renderNav(data.nodes, false);
};
