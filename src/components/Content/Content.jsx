import classNamesBind from "classnames/bind";
import React from "react";
import { createMarkup } from "../../constant/function";
// import { fetchHeader } from "../../store/action/header";
import classes from "./Content.module.css";

const Content = ({ text, cls }) => {
  const cx = classNamesBind.bind(classes);
  // const contentRef = useRef();
  // const [reRende, setReRender] = useState(false);

  // useEffect(() => {
  //   const a = contentRef.current.querySelectorAll("a");
  //   console.log(a);
  //   console.log("1", text);

  //   // text.find((item) => console.log(item));

  //   Object.values(a).map((link) => {
  //     if (link.children.length) return null;

  //     const reactLink = <Link to={link.pathname}>{link.innerText}</Link>;
  //     // const l = document.createElement("Link");
  //     // l.to = link.pathname;
  //     // l.textContent = link.innerText;

  //     console.log(reactLink);

  //     link.replaceWith(`${(<Link to={link.pathname}>{link.innerText}</Link>)}`);

  //     return console.log("2", reRende);
  //   });
  //   setReRender(true);
  // }, [contentRef, reRende, setReRender]);
  return (
    <div
      // ref={contentRef}
      className={cx(classes.content, cls)}
      dangerouslySetInnerHTML={createMarkup(text)}
    />
  );
};

export default Content;
