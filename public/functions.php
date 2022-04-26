<?php
/**
 * cbsApp functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package cbsApp
 */
if ( ! function_exists( 'cbsApp_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */

	function cbsApp_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on cbsApp, use a find and replace
		 * to change 'cbsApp' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'cbsApp', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'header_menu' => esc_html__( 'Основное меню', 'cbsApp' ),
			'header_menu-other' => esc_html__( 'Дополнительное меню', 'cbsApp' ),
			'header_menu-social' => esc_html__( 'Меню для ссылок на соц.сети', 'cbsApp' ),
			'footer_menu' => esc_html__( 'Меню footer', 'cbsApp' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'cbsApp_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'cbsApp_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function cbsApp_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'cbsApp_content_width', 640 );
}
add_action( 'after_setup_theme', 'cbsApp_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cbsApp_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'cbsApp' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'cbsApp' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'cbsApp_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
// wp_register_style( 'cbsApp__swiper', get_template_directory_uri() . 'swiper.css', array(), '4.5.0' );
function cbsApp_scripts() {
	wp_enqueue_style( 'cbsApp-style', get_stylesheet_uri() );
	// wp_enqueue_style( 'swiper', get_template_directory_uri() . '/swiper.css' );

	// wp_enqueue_script( 'cbsApp-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	// wp_enqueue_script( 'cbsApp-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	// wp_enqueue_script( 'cbsApp__header', get_template_directory_uri() . '/js/header.js', array(), '1.0.0', true );
	// wp_enqueue_script( 'cbsApp__search', get_template_directory_uri() . '/js/search.js', array(), '1.0.0', true );

	// wp_enqueue_script( 'cbsApp__anons', get_template_directory_uri() . '/js/anons.js', array('cbsApp__swiper'), '1.0.0', true );
	// wp_enqueue_script( 'cbsApp__book', get_template_directory_uri() . '/js/book.js', array('cbsApp__swiper'), '1.0.0', true );
	// wp_enqueue_script( 'cbsApp__cssGridMasonry', get_template_directory_uri() . '/js/cssGridMasonry.js', array( ), '1.0.0', true );


	// wp_enqueue_script( 'cbsApp-script', get_template_directory_uri() . '/js/functions.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'cbsApp_scripts' );

//Preview url
add_filter( 'preview_post_link', 'the_preview_fix' );
function the_preview_fix() {
	$slug = get_permalink();
	return "/preview/" + "$slug";
}

// отключаем создание миниатюр файлов для указанных размеров
add_filter( 'intermediate_image_sizes', 'delete_intermediate_image_sizes' );
function delete_intermediate_image_sizes( $sizes ){
	// размеры которые нужно удалить
	return array_diff( $sizes, [
		'medium_large',
		'1536x1536',
		'2048x2048',
	] );
}

// Отключение замены символов в содержимом поста:
// remove_filter('the_content', 'wptexturize');
// В заголовке поста:
// remove_filter('the_title', 'wptexturize');
// В тексте комментария:
remove_filter('comment_text', 'wptexturize');
// В цитате:
remove_filter('the_excerpt', 'wptexturize');

// Отключаем автоформатирование в кратком(анонсе) посте
remove_filter( 'the_excerpt', 'wpautop' );
/**
 * Удаление конструкции [...] на конце краткого описания
 */
add_filter('excerpt_more', function($more) {
	if (is_singular( 'poster' )) {
		return false;
	}
	return '...';
});

/**
 * отрывок (excerpt) у страниц
 */
add_action('init', 'page_excerpt');
function page_excerpt() {
	add_post_type_support( 'page', 'excerpt' );
}

/**
 * Удаление формирования описания из контента
 */
add_filter( 'excerpt_length', function() {
	if (is_singular( 'poster' )) {
		return 0;
	}
	return 55;
} );

/**
 * подключение кастомных стилей для гутенберга
 */
add_action( 'after_setup_theme', 'gutenberg_setup_theme' );
function gutenberg_setup_theme(){
	add_theme_support( 'editor-styles' );
	add_editor_style( 'editor-style.css' );
}

add_action('admin_head', 'style_admin');
function style_admin(){
	wp_enqueue_style("style-admin", get_bloginfo('stylesheet_directory')."/style-admin.css");
}

/**
 * Implement the Custom Header feature.
 */
// require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
// require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
// require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
// require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
// if ( defined( 'JETPACK__VERSION' ) ) {
	// require get_template_directory() . '/inc/jetpack.php';
// }
/**
 * Загрузка файлов webp
 */
function webp_upload_mimes($mimes) {
	$mimes['webp'] = 'image/webp';
	return $mimes;
}

/**
 * Убрать из загрузки
 */
function plug_disable_emoji() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  add_filter( 'tiny_mce_plugins', 'plug_disable_tinymce_emoji' );
}
add_action( 'init', 'plug_disable_emoji', 1 );

/**
 * Очистить в tinymce
 */
function plug_disable_tinymce_emoji( $plugins ) {
  return array_diff( $plugins, array( 'wpemoji' ) );
}


add_filter('upload_mimes', 'webp_upload_mimes');

add_filter( 'post_thumbnail_html', 'htm_remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'htm_remove_width_attribute', 10 );
function htm_remove_width_attribute($html) {
	$html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
	return $html;
}


/**
 * подключение jQuery с CDN google
 */
// add_action( 'wp_enqueue_scripts', 'switchjQueryCDN' );
// function switchjQueryCDN() {
// 	// отменяем зарегистрированный jQuery
// 	wp_deregister_script('jquery-core');
// 	wp_deregister_script('jquery');

// 	// регистрируем
// 	wp_register_script( 'jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', false, null, true );
// 	wp_register_script( 'jquery', false, array('jquery-core'), null, true );

// 	// подключаем
// 	wp_enqueue_script( 'jquery' );
// }

/**
 * metaboxes function.
 */
// require get_template_directory() . '/inc/metaboxes.php';
/**
 * metaboxes Taxonomy.
 */
// require get_template_directory() . '/admin/taxonomyMetaBox.php';

/*
 * Добавление чекбокса в меню (не выводится в GraphiQL)
 */
// add_action( 'wp_nav_menu_item_custom_fields', 'true_menu_field', 10, 5 );
// function true_menu_field( $item_id, $item, $depth, $args, $id ) {
// 	// можете сюда также вкинуть wp_nonce_field и его проверку в следующем шаге
// 	$is_logged_in = get_post_meta( $item_id, '_menu_loggedin', true );

// 	echo '<p class="description">
// 		<label>
// 			<input type="checkbox" ' . checked( 'yes', $is_logged_in, false ) . ' name="menu-item-loggedin[' . $item_id . ']">
// 			Только для зарегистрированных пользователей
// 		</label>
// 	</p>';
// }
// add_action( 'wp_update_nav_menu_item', 'true_update_menu', 10, 2 );
// function true_update_menu( $menu_id, $menu_item_db_id ) {
// 	// если добавляли nonce-поле, то тут его валидация

// 	$meta_value = isset( $_POST[ 'menu-item-loggedin' ][ $menu_item_db_id ] ) && 'on' == $_POST[ 'menu-item-loggedin' ][ $menu_item_db_id ] ? 'yes' : 'no';
// 	update_post_meta( $menu_item_db_id, '_menu_loggedin', $meta_value );
// }


// add_action( 'init', function() {
//    register_post_type( 'docs', [
//       'show_ui' => true,
//       'labels'  => [
//       	'menu_name' => __( 'Docs', 'your-textdomain' ),//@see https://developer.wordpress.org/themes/functionality/internationalization/
//       ],
//       'show_in_graphql' => true,
//       'hierarchical' => true,
//       'graphql_single_name' => 'document',
//       'graphql_plural_name' => 'documents',
//    ] );
// } );

// add_action('init', function() {
//   register_taxonomy( 'doc_tag', 'docs', [
//     'labels'  => [
// 			'menu_name' => __( 'Document Tags', 'your-textdomain' ),
// 		],
//     'show_in_graphql' => true,
//     'graphql_single_name' => 'documentTag',
//     'graphql_plural_name' => 'documentTags',
//   ]);
// });
/**
 * Книги
 */
add_action( 'init', 'register_book_post_type' );
function register_book_post_type() {
	register_post_type('book', array(
		'label'               => 'Книги',
		'labels'              => array(
			'name'          => 'Книги',
			'singular_name' => 'Книга',
			'menu_name'     => 'Книги',
			'all_items'     => 'Все книги',
			'add_new'       => 'Добавить книгу',
			'add_new_item'  => 'Добавить новую книгу',
			'edit'          => 'Редактировать',
			'edit_item'     => 'Редактировать книгу',
			'new_item'      => 'Новая книга',
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false, // исключать ли этот тип записей из поиска по сайту
		'show_in_nav_menus'		=> true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_rest'        => true, // редактор Гутенберг
		'rest_base'           => 'book',
		'menu_position'       => 4,
		'capability_type'     => 'post',//array('book', 'books'),
		'map_meta_cap'        => true,
		'hierarchical'        => true,//тома?
		'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ),
		'taxonomies'          => array( 'bookAuthor', 'bookGenre', 'bookYear','bookPublisher' ),
		'has_archive'         => false,
		'rewrite'             => array( 'slug'=>'book', 'with_front'=> false ),//array( 'slug'=>'book', 'with_front'=>false, 'pages'=>false, 'feeds'=>false, 'feed'=>false ),

		'show_in_graphql' 			=> true,
		'graphql_single_name' 	=> 'book',
		'graphql_plural_name' 	=> 'books',
	) );


	register_taxonomy('bookAuthor', array('book'), array(
		'labels'                => array(
			'name'              => 'Авторы',
			'singular_name'     => 'Автор',
			'search_items'      => 'Поиск по автору',
			'popular_items'			=> 'Популярные авторы',
			'all_items'         => 'Все авторы',
			'parent_item'       => null,
			'parent_item_colon' => null,
			'edit_item'         => 'Редактировать данные автора',
			'update_item'       => 'Обновить',
			'add_new_item'      => 'Добавить нового автора',
			'view_item'					=> 'Перейти',
			'new_item_name'     => 'Добавить автора',
			'choose_from_most_used' => 'Часто используемые',
		),
		'description'           => 'Авторы книг', // описание таксономии
		'public'                => true,
		'show_in_rest' 					=> true, // Таксономи в редакторе Гутенберг
		// 'rest_base'							=> 'bookGenres', //не обязательно для graphql?
		// 'rest_controller_class'	=> 'bookGenres', //не обязательно для graphql?
		'rewrite'               => array('slug'=>'book/author', 'with_front'=>false, 'feed'=>false ),
		'sort'									=> true,
		'show_admin_column'     => true, // Позволить или нет авто-создание колонки таксономии в таблице ассоциированного типа записи. (с версии 3.5)
		'show_in_graphql' => true,
    'graphql_single_name' => 'bookAuthor',
    'graphql_plural_name' => 'bookAuthors',
	) );

	register_taxonomy('bookGenre', array('book'), array(
		'labels'                => array(
			'name'              => 'Жанры',
			'singular_name'     => 'Жанр',
			'search_items'      => 'Искать жанр',
			'popular_items'			=> 'Популярные жанры',
			'all_items'         => 'Все жанры',
			'parent_item'       => 'Родит. жанр',
			'parent_item_colon' => 'Родит. жанр:',
			'edit_item'         => 'Редактировать данные жанра',
			'update_item'       => 'Обновить',
			'add_new_item'      => 'Добавить новый жанр',
			'view_item'					=> 'Перейти',
			'new_item_name'     => 'Добавить жанр',
			'choose_from_most_used' => 'Часто используемые',
		),
		'description'           => 'Жанры книг', // описание таксономии
		'public'                => true,
		'show_in_rest' 					=> true, // Таксономи в редакторе Гутенберг
		'rest_base'							=> 'bookGenres', //не обязательно для graphql?
		'rest_controller_class'	=> 'bookGenre', //не обязательно для graphql?
		'hierarchical'          => true,
		'rewrite'               => array('slug'=>'book/genre', 'hierarchical'=>true, 'with_front'=>false, 'feed'=>false ),
		// 'sort'									=> true,
		'show_admin_column'     => true, // Позволить или нет авто-создание колонки таксономии в таблице ассоциированного типа записи. (с версии 3.5)
		'show_in_graphql' => true,
    'graphql_single_name' => 'bookGenre',
    'graphql_plural_name' => 'bookGenres',
	) );

	register_taxonomy('bookYear', array('book'), array(
		'labels'                => array(
			'name'              => 'Год издания',
			'singular_name'     => 'Год издания',
			'search_items'      => 'Поиск по году издания',
			'all_items'         => 'Все годы издания',
			'parent_item'       => null,
			'parent_item_colon' => null,
			'edit_item'         => 'Редактировать год издания',
			'update_item'       => 'Обновить',
			'add_new_item'      => 'Добавить новый год издания',
			'view_item'					=> 'Перейти',
			'new_item_name'     => 'Добавить новый год издания',
			'choose_from_most_used' => 'Часто используемые',
		),
		'description'           => 'Год издания книги', // описание таксономии
		'public'                => true,
		'show_in_rest' 					=> true, // Таксономи в редакторе Гутенберг
		// 'rest_base'							=> 'bookGenres', //не обязательно для graphql?
		// 'rest_controller_class'	=> 'bookGenres', //не обязательно для graphql?
		'rewrite'               => array('slug'=>'book/year', 'with_front'=>false, 'feed'=>false ),
		// 'sort'									=> true,
		'show_admin_column'     => true, // Позволить или нет авто-создание колонки таксономии в таблице ассоциированного типа записи. (с версии 3.5)
		'show_in_graphql' => true,
    'graphql_single_name' => 'bookYear',
    'graphql_plural_name' => 'bookYears',
	) );

	register_taxonomy('bookPublisher', array('book'), array(
		'labels'                => array(
			'name'              => 'Издательство',
			'singular_name'     => 'Издательство',
			'search_items'      => 'Поиск по издателям',
			'all_items'         => 'Все издатели',
			'parent_item'       => null,
			'parent_item_colon' => null,
			'edit_item'         => 'Редактировать издателя',
			'update_item'       => 'Обновить',
			'add_new_item'      => 'Добавить нового издателя',
			'view_item'					=> 'Перейти',
			'new_item_name'     => 'Добавить нового издателя',
			'choose_from_most_used' => 'Часто используемые',
		),
		'public'                => true,
		'show_in_rest' 					=> true, // Таксономи в редакторе Гутенберг
		// 'rest_base'							=> 'bookGenres', //не обязательно для graphql?
		// 'rest_controller_class'	=> 'bookGenres', //не обязательно для graphql?
		'rewrite'               => array('slug'=>'book/publisher', 'with_front'=>false, 'feed'=>false ),
		// 'sort'									=> true,
		'show_admin_column'     => true, // Позволить или нет авто-создание колонки таксономии в таблице ассоциированного типа записи. (с версии 3.5)
		'show_in_graphql' => true,
    'graphql_single_name' => 'bookPublisher',
    'graphql_plural_name' => 'bookPublishers',
	) );
}

/**
 * Анонсы
 */
add_action( 'init', 'register_poster_post_type' );
function register_poster_post_type() {
	register_taxonomy('posterDepartment', array('poster'), array(
		'label'                 => 'Филиалы', // определяется параметром $labels->name
		'labels'                => array(
			'name'              => 'Филиалы',
			'singular_name'     => 'Филиал',
			'search_items'      => 'Искать филиал',
			'all_items'         => 'Все филиалы',
			'parent_item'       => 'Родит. филиал',
			'parent_item_colon' => 'Родит. филиал:',
			'edit_item'         => 'Редактировать данные филиала',
			'update_item'       => 'Обновить',
			'add_new_item'      => 'Добавить новый филиала',
			'new_item_name'     => 'Добавить филиал',
			'menu_name'         => 'Филиалы',
		),
		'description'           => 'Рубрики для раздела вопросов', // описание таксономии
		'public'                => true,
		// 'show_in_nav_menus'     => false, // равен аргументу public
		// 'show_ui'               => true, // равен аргументу public
		'show_in_rest' 					=> true, // Таксономи в редакторе Гутенберг
		// 'show_tagcloud'         => false, // равен аргументу show_ui
		'hierarchical'          => true,
		'rewrite'               => array('slug'=>'poster/department', 'hierarchical'=>false, 'with_front'=>false, 'feed'=>false ),
		'show_admin_column'     => true, // Позволить или нет авто-создание колонки таксономии в таблице ассоциированного типа записи. (с версии 3.5)
		'show_in_graphql' => true,
    'graphql_single_name' => 'posterDepartment',
    'graphql_plural_name' => 'posterDepartments',
	) );

	register_post_type('poster', array(
		'label'               => 'Анонсы',
		'labels'              => array(
			'name'          => 'Анонсы',
			'singular_name' => 'Анонс',
			'menu_name'     => 'Анонсы',
			'all_items'     => 'Все анонсы',
			'add_new'       => 'Добавить анонс',
			'add_new_item'  => 'Добавить новый анонс',
			'edit'          => 'Редактировать',
			'edit_item'     => 'Редактировать анонс',
			'new_item'      => 'Новый анонс',
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'show_ui'             => true,
		'show_in_rest'        => true, // редактор Гутенберг
		'rest_base'           => '',
		'show_in_menu'        => true,
		'exclude_from_search' => true, // исключать ли этот тип записей из поиска по сайту
		'capability_type'     => 'post',
		'map_meta_cap'        => true,
		'hierarchical'        => false,
		'rewrite'             => array( 'slug'=>'poster', 'with_front'=>false, 'pages'=>false, 'feeds'=>false, 'feed'=>false ),
		'has_archive'         => false,
		'query_var'           => true,
		'menu_position'       => 5,
		'supports'            => array( 'title', 'editor', 'excerpt' ),
		'taxonomies'          => array( 'posterDepartment' ),

		'show_in_graphql' 			=> true,
		'graphql_single_name' 	=> 'poster',
		'graphql_plural_name' 	=> 'posters',
	) );
}

/**
 * Добавление произвольного поля в рубрику "филиалы"
 */
// add_action('init', 'register_additional_term_fields');
// function register_additional_term_fields(){
// 	new trueTaxonomyMetaBox( array(
// 		'id'       => 'location', // id играет роль префикса названий полей
// 		'taxonomy' => array('taxonomyAnons'), // названия таксономий, для которых нужно добавить ниже перечисленные поля
// 		'args'     => array(
// 			array(
// 				'id'    => 'adres', // атрибуты name и id без префикса, получится "location_adres"
// 				'title' => 'Адрес филиала',
// 				'type'  => 'text',
// 				'desc'  => '',
// 				'std'   => '', // по умолчанию
// 			),
// 		)
// 	) );
// }
