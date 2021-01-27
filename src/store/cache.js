import { InMemoryCache } from "@apollo/client";
import { overlayVar } from "./variables/overlay";
import { scrollYVar } from "./variables/scrollY";
import { windowWidthVar } from "./variables/windowWidth";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        scrollY: {
          read() {
            return scrollYVar();
          },
        },
        windowWidth: {
          read() {
            return windowWidthVar();
          },
        },
        overlay: {
          read() {
            return overlayVar();
          },
        },

        //Перенаправление кэша
        post(_, { args, toReference }) {
          return toReference({
            __typename: "Post",
            id: args.id,
          });
        },
      },
    },
  },
});
