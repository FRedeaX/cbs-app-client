import React from "react";
import { NavItem } from "../../../components/nav/NavItem/NavItem";
import { NavList } from "../../../components/nav/NavList/NavList";

export const Primary = ({ data }) => (
  <NavList>
    {data.map(() => {
      return <NavItem>1</NavItem>;
    })}
  </NavList>
);
