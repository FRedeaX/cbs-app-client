import { gql, makeVar } from "@apollo/client";
import { delay } from "../../../helpers/delay";

export const scrollYVar = makeVar(window.scrollY);

export const SCROLLY_FRAGMENT = "scrollY @client";
export const SCROLLY = gql`
  query scrollY {
    ${SCROLLY_FRAGMENT}
  }
`;

let prevScrollY = 0;
window.addEventListener("scroll", () => {
  delay(200).then(() => {
    const _scrollY = window.scrollY;
    if (prevScrollY !== _scrollY) {
      prevScrollY = _scrollY;
      scrollYVar(_scrollY);
    }
  });
});
