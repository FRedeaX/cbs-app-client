import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BatchHttpLink } from "@apollo/link-batch-http";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import { isBrowser, isMobile } from "react-device-detect";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { YMInitializer } from "react-yandex-metrika";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import smoothscroll from "smoothscroll-polyfill";
import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./store/rootReducer";
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// const link = createPersistedQueryLink().concat(
//   // createHttpLink({ uri: "https://cbsbaikonur.ru/graphql" })
//   createHttpLink({
//     uri: "https://cbsbaikonur.ru/graphql",
//     useGETForQueries: true,
//   })
// );
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({ uri: "https://cbsbaikonur.ru/graphql" }),
//   // link: new HttpLink({ uri: "/graphql" }),
//   // link: link,
//   //  resolvers
//   //  typeDefs,
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new BatchHttpLink({
    uri: "/graphql",
    // useGETForQueries: true,
  }),
  // link,
});

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://bfc2b39f80b04a1687664d6696c0a265@o397370.ingest.sentry.io/5251759",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  // applyMiddleware(thunk)
);

smoothscroll.polyfill();
// if (process.env.NODE_ENV === "production")
//   getTag(
//     window,
//     document,
//     "script",
//     "https://mc.yandex.ru/metrika/tag.js",
//     "ym"
//   );

if (isBrowser) document.documentElement.classList.add("ua_browser_desktop");
else if (isMobile) document.documentElement.classList.add("ua_browser_mobile");

const app = (
  <React.StrictMode>
    {process.env.NODE_ENV === "production" && (
      <YMInitializer
        accounts={[33186213]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
      />
    )}
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
