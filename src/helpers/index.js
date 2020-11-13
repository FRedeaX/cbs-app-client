export const asyncLoadScript = (src, obj) => {
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

export const getTag = () => {
  asyncLoadScript("https://mc.yandex.ru/metrika/tag.js", window.ym).then(() =>
    window.ym(33186213, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  );
};
