export const asyncLoadScript = (src, obj = false) => {
  return new Promise((resolve, reject) => {
    if (obj) {
      return resolve();
    }
    let script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.addEventListener("load", function () {
      resolve();
    });
    script.addEventListener("error", function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  });
};

// export const getTag = (m, e, t, r, i, k, a) => {
//   m[i] =
//     m[i] ||
//     function () {
//       (m[i].a = m[i].a || []).push(arguments);
//     };
//   m[i].l = 1 * new Date();
//   k = e.createElement(t);
//   a = e.getElementsByTagName(t)[0];
//   k.async = 1;
//   k.src = r;
//   a.parentNode.insertBefore(k, a);
// };

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
