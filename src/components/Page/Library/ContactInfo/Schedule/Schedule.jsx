import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { classJoin } from "../../../../../helpers";
import classesInfo from "../Contact-info.module.css";
import classes from "./Schedule.module.css";

export const Schedule = ({ schedule, scheduleSecondary }) => {
  const { search } = useLocation();
  // const [isSchedule, setSchedule] = useState(false);

  // const isSchedule = location.pathname.split("=")[1];
  const isSchedule = useMemo(() => {
    return new URLSearchParams(search).has("schedule");
  }, [search]);

  const lib = useMemo(() => {
    const s = new URLSearchParams(search);
    return s.has("lib") ? `lib=${s.get("lib")}` : null;
  }, [search]);

  // useEffect(() => {
  //   const q = new URLSearchParams(window.location.search);
  //   const searchParams = q.get("schedule");
  //   setSchedule(searchParams);
  //   console.log(searchParams);
  // }, [isSchedule]);
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
            className={
              isSchedule
                ? classJoin([classesInfo["left-column"], classes.day])
                : classJoin([classesInfo["left-column"], classes.weekday])
            }
          >
            {item.weekday}
          </span>
          <span className={classes.time}>{item.time}</span>
        </div>
      );
    });
  }
  return (
    <div className={classesInfo.info}>
      <div className={classes.header}>
        <h4 className={classJoin([classesInfo.title, classes.title])}>
          График работы
        </h4>
        {!!scheduleSecondary.length && (
          <div className={classes.controls}>
            <NavLink
              to={{
                pathname: "/biblioteki/",
                search:
                  isSchedule && new URLSearchParams(search).has("lib")
                    ? `?lib=${new URLSearchParams(search).get("lib")}`
                    : search,
                state: {
                  scrollToTop: false,
                },
              }}
              isActive={() => !isSchedule}
              activeClassName={classes.active}
              className={classes.link}
              aria-current={"step"}
            >
              Ежедневный
            </NavLink>
            <NavLink
              to={{
                pathname: "/biblioteki/",
                search: isSchedule
                  ? search
                  : !isSchedule && lib
                  ? `?${lib}&schedule=1`
                  : "?schedule=1",
                state: {
                  scrollToTop: false,
                },
              }}
              isActive={() => !!isSchedule}
              activeClassName={classes.active}
              className={classes.link}
              aria-current={"step"}
            >
              Праздничные дни
            </NavLink>
          </div>
        )}
      </div>
      <div className={classesInfo.list}>
        {renderScheduleItem(isSchedule ? scheduleSecondary : schedule)}
      </div>
    </div>
  );
};
