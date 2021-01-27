import { gql, makeVar } from "@apollo/client";
import { delay } from "../../../helpers/delay";

export const windowWidthVar = makeVar(window.innerWidth);

export const GET_WIDTH_FRAGMENT = "windowWidth @client";
export const GET_WIDTH = gql`
  query GetWidth {
    ${GET_WIDTH_FRAGMENT}
  }
`;

window.addEventListener("resize", () =>
  delay(350).then(() => windowWidthVar(window.innerWidth))
);
