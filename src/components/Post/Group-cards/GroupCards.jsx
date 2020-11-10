import React from "react";
import Carousel from "../../Carusel/Carousel";
import Card from "../Card/Card";
import classes from "./Group-cards.module.css";

const GroupCards = ({ data, title, description, length }) => {
  
  return (
    <div className={ classes.container }>
      {/* {console.log("render GroupCards")} */}
      <div className={classes.head}>
        <h3 className={classes.title}>{title}</h3>
        {description && <span className={classes.description}>{description}</span>}
      </div>
      <Carousel length={ length }>
        { data.map((postByTag) => (
          <Card key={ postByTag.id } data={ postByTag } cls={ classes.article }/>
        )) }
      </Carousel>
    </div>
  );
};

export default GroupCards;
