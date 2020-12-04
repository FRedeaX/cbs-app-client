import { gql } from '@apollo/client';
import classNames from 'classnames';
import React from 'react';
import { createMarkup } from '../../../helpers';
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

const PosterItem = ({data: { posterDate, title, content, excerpt, posterDepartments }, cls}) => {
  const date = posterDate.date.split('/');

  return (
    <div className={classNames(classes.wrapper, cls)}>
      <div className={classes.header}>
        <span className={classes.date}>{ date[0] }</span>
        <span className={classes.month}>{ getStringMonth(date[1]) }</span>
        <span className={classes.type} title={"Мероприятия будут проведены в онлайн-режиме на сайте ГКУ ЦБС"}>онлайн</span>
      </div>
      <div className={classes.body}>
        <h3 className={classes.title}>{ title }</h3>
        <div className={classes.content} dangerouslySetInnerHTML={createMarkup(content)} />
        <div className={classes.description}>{ excerpt }</div>
      </div>
      <div className={classes.footer}>
        <span>{ posterDepartments.nodes[0].name }</span>
        <span className={classes.info} title={"Cправки по телефону"}>{ posterDepartments.nodes[0].description }</span>
      </div>
    </div>
  )
}

export default PosterItem;

const getStringMonth = (month) => {
  switch (month) {
    case '01':
      return 'Январь';
    case '02':
      return 'Феваль';
    case '03':
      return 'Март';
    case '04':
      return 'Апрель';
    case '05':
      return 'Май';
    case '06':
      return 'Июнь';
    case '07':
      return 'Июль';
    case '08':
      return 'Август';
    case '09':
      return 'Сентябрь';
    case '10':
      return 'Октябрь';
    case '11':
      return 'Ноябрь';
    case '12':
      return 'Декабрь';
    default:
      break;
  }
}