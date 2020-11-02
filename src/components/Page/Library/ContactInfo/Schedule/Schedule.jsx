import React from "react";
import { classJoin } from "../../../../../constant/function";
import classesInfo from "../Contact-info.module.css";
import classes from "./Schedule.module.css";

export const Schedule = (props) => {
  const { schedule } = props;

  function renderScheduleItem(data) {
    return data.map((item) => {
      return (
        <div
          key={item.weekday}
          className={
            item.cleanupDay
              ? classJoin([
                  classesInfo.item,
                  classes.item,
                  classes["item--cleanup-day"],
                ])
              : classJoin([classesInfo.item, classes.item])
          }
        >
          <span
            className={classJoin([classesInfo["left-column"], classes.weekday])}
          >
            {item.weekday}
          </span>
          <span
            className={classJoin([classesInfo["right-column"], classes.time])}
          >
            {item.time}
          </span>
        </div>
      );
    });
  }
  return (
    <div className={classesInfo.info}>
      {/* {console.log("Schedule")} */}
      <h4 className={classesInfo.title}>График работы</h4>
      <div className={classesInfo.list}>{renderScheduleItem(schedule)}</div>
    </div>
  );
};
