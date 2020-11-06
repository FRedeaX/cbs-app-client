import React, { memo } from "react";
import Carousel from "../Carusel/Carousel";
import Layout from "../UI/Layout/Layout";
import SectionHeader from "./../SectionHeader/SectionHeader";
import BookItem from "./BookItem/BookItem";


const Book = ({ data }) => {
  console.log(data);

  return (
    <section>
      <Layout page={true}>
        <SectionHeader HtmlTeg="h2">Обзоры книг</SectionHeader>
        <Carousel>
          {data.map(book => <BookItem key={book.id} node={book}/>)}
        </Carousel>
      </Layout>
    </section>
  )
};

export default memo(Book);