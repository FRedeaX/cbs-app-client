import { gql } from '@apollo/client';
import React from 'react';
import classes from './Poster-item.module.css';

export const posterItem = {
  fragments: gql`
    fragment posterItem on Poster {
      content
      excerpt
      posterDepartments {
        nodes {
          name
          description
        }
      }
      posterDate {
        date
      }
      title
      id
    }
  `
}

const PosterItem = ({data: { posterDate, title, content, excerpt, posterDepartments }}) => {
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        {posterDate.date}
      </div>
      <div className={classes.body}>
        { title }
        { content }
        { excerpt }
      </div>
      <div className={classes.footer}>
        { posterDepartments.nodes[0].name }
        { posterDepartments.nodes[0].description }
      </div>
    </div>
  )
}

export default PosterItem;