import React, { memo } from 'react';
import Title from './../Title/Title';
import classes from './SectionHeader.module.css';

const SectionHeader = ({children}) => {
  return <div className={ classes.header }>    
    <Title HtmlTeg="h2">{ children }</Title>
  </div>
}

export default memo(SectionHeader);