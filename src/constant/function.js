export function createMarkup(text) {
  return { __html: text };
}

export function classJoin(classes) {
  return classes.join(" ");
}

export const scrollbarWidth = getScrollbarWidth();
function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

let timeout;
export const throttler = (func) => {
  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null;
      func();
    }, 66);
  }
};
