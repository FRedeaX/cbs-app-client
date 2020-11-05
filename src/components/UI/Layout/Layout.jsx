import classNamesBind from "classnames/bind";
import React from "react";
import classes from "./Layout.module.css";

const Layout = ({page, children}) => {
  const cx = classNamesBind.bind(classes);
  return (
    <div className={cx({layout:true, page: page})}>
      {children}
    </div>
  )
}  

export default Layout;
