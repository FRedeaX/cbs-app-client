import classNames from "classnames";
import React, { memo } from 'react';
import Title from './../Title/Title';
import classes from './SectionHeader.module.css';

const SectionHeader = ({ children, cls }) => {
  // let cx = classNames.bind(classes);
  return <div className={ classNames(classes.header, cls) }>    
    <Title HtmlTeg="h2">{ children }</Title>
  </div>
}

export default memo(SectionHeader);