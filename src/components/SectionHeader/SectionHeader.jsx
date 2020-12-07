import classNames from "classnames";
import React, { memo } from 'react';
import { Link } from "react-router-dom";
import Title from './../Title/Title';
import classes from './Section-header.module.css';

const SectionHeader = ({ children, url, cls }) => {
  // let cx = classNames.bind(classes);
  return <div className={ classNames(classes.header, cls) }>    
    { url
      ? <Title HtmlTeg="h2"><Link to={ url } className={ classes.link }>{ children }</Link></Title>
      : <Title HtmlTeg="h2">{ children }</Title>}
  </div>
}

export default memo(SectionHeader);