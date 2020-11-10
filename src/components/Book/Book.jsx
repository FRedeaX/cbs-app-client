import React, { memo } from "react";
import Carousel from "../Carusel/Carousel";
import SectionHeader from "../SectionHeader/SectionHeader";
import classes from "./Book.module.css";
import BookItem from "./BookItem/BookItem";

const Book = ({ data }) => {
  console.log(data);

  return (
    <section className={classes.section}>
      <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
      <Carousel>
        {data.map(book => <BookItem key={book.id} node={book}/>)}
      </Carousel>
    </section>
  )
};

export default memo(Book);