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

export const getTag = (m, e, t, r, i, k, a) => {
  m[i] =
    m[i] ||
    function () {
      (m[i].a = m[i].a || []).push(arguments);
    };
  m[i].l = 1 * new Date();
  k = e.createElement(t);
  a = e.getElementsByTagName(t)[0];
  k.async = 1;
  k.src = r;
  a.parentNode.insertBefore(k, a);
};
