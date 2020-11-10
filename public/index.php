<?php
  // getTemplate();
  // function getTemplate(){
  $TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
?>
<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <!-- <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,600,700|Montserrat+Alternates:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet"> -->
    <!-- <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" as="font"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- <meta name="theme-color" content="#ffffff" /> -->
    <!-- <meta
      name="description"
      content="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур"
    /> -->
    <link rel="apple-touch-icon" href="<?php echo $TEMPLATE_PATH; ?>/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json" />
    <!--
        If you're reading this from "view source" in your browser, it might not make sense as
        these tokens have already been evaluated and replaced, even in this remark blurb.

        Notice the use of "php echo $TEMPLATE_PATH;" and %PUBLIC_URL% in the tags above.
        Both will be replaced with the URL of the `public` folder during the build (%PUBLIC_URL%) or
        at render time (php echo $TEMPLATE_PATH;)
        Only files inside the `public` folder can be referenced like this.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run wpbuild`.
    -->

    <link rel="stylesheet" href="<?php echo $TEMPLATE_PATH; ?>/vendor.min.css">
    <title>Библиотеки города Байконур</title>
  </head>
  <body style="min-height: 6000px;" class="wp-embed-responsive">
  <noscript>
      You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <div id="modal_root"></div>
    <!--
        This PHP file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run `npm run wpstart` or `yarn wpstart`.
        To create a production bundle, use `npm run wpbuild` or `yarn wpbuild`.
    -->
    
    <script async src="https://unpkg.com/cross-fetch@3.0.6/dist/cross-fetch.js"></script>
    <script async src="https://unpkg.com/es7-object-polyfill@1.0.1/build/es7-object-polyfill.browser.js"></script>

    <script type="text/javascript" >
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(33186213, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    </script>

    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script async src="https://cbsbaikonur.ru/wp-content/plugins/ml-slider/assets/sliders/flexslider/jquery.flexslider.min.js"></script>
    <link rel="stylesheet" href="https://cbsbaikonur.ru/wp-content/plugins/ml-slider/assets/sliders/flexslider/flexslider.css"> -->
    <!-- <link rel="stylesheet" href="https://cbsbaikonur.ru/wp-content/plugins/ml-slider/assets/metaslider/public.css"> -->
  </body>
</html>   
  <!-- }   -->