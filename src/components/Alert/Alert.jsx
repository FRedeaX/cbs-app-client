import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import Layout from "../UI/Layout/Layout";
import classes from "./Alert.module.css";

const Alert = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const storage = window.localStorage.getItem("isAlertHidden");
    setVisible(!storage);
  }, []);

  const onCloseHendler = () => {
    window.localStorage.setItem("isAlertHidden", true);
    setVisible(false);
  };
  return (
    isVisible && (
      <div className={classes.wrapper}>
        <Layout page={false}>
          {children}
          <Button cls={classes.close} type="button" onClick={onCloseHendler} />
        </Layout>
      </div>
    )
  );
};

export default Alert;
