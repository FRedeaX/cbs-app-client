// import React from "react";
// import { connect } from "react-redux";
// import { Route } from "react-router-dom";
// // import { Route, Switch } from "react-router-dom";
// import HomePage from "../HomePage/HomePage";
// import Page from "../Page/Page";

// const Router = (props) => {
//   const initialRout = [];
//   // initialRout.push(`${(<Route path="/post/:slug" component={ModalRoot} />)}`);
//   // initialRout.push(`${ <Route path="/page/biblioteki" exact component={ Library } /> }`);
//   // initialRout.push(`${ <Route path="/post" exact component={ RedirectToHome } /> }`);
//   // initialRout.push(`${ <Redirect to = "/" />} }`);

//   // initialRout.push(`${(<Switch>)}`);
//   initialRout.push(`${(<Route path="/page/:slug" component={Page} />)}`);
//   initialRout.push(`${(<Router path="/" component={HomePage} />)}`);
//   {
//     /* initialRout.push(`${(</Switch>)}`); */
//   }

//   // useEffect(() => {
//   //   if (menus) {
//   //     // renderRoute(menus);
//   //   }
//   // }, [menus]);

//   const renderRoute = (route = initialRout) => {
//     //console.log(route.join(" "));

//     return route.join(" ");
//   };

//   return (
//     // <Switch>
//     //   <Route path="/page/:slug" component={Page} />
//     //   <Route path="/" component={HomePage} />;
//     //   <Redirect to="/" />
//     // </Switch>
//     renderRoute()
//   );
// };

// function mapStateToProps(state) {
//   return {
//     menus: state.header.menus,
//   };
// }

// export default connect(mapStateToProps)(Router);
