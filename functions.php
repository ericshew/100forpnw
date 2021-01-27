<?php

/**

 * GeneratePress child theme functions and definitions.

 *

 * Add your custom PHP in this file.

 * Only edit this file if you have direct access to it on your server (to fix errors if they happen).

 */







//part of child theme... did not make





register_sidebar( array(

	'name'          => 'Cache',

	'id'            => 'sdcache',

	'before_widget' => '',

	'after_widget'  => '',

	'before_title'  => '',

	'after_title'   => '',

) );









include_once dirname(__FILE__) . '/php/register_custom_blocks.php';  





function myplugin_settings() {

    // Add tag metabox to page

    register_taxonomy_for_object_type('post_tag', 'page');

    // Add category metabox to page

    register_taxonomy_for_object_type('category', 'page');

}

 // Add to the admin_init hook of your theme functions.php file

add_action( 'init', 'myplugin_settings' );





























function print_menu_shortcode($atts, $content = null) {

	extract(shortcode_atts(array( 'name' => null, 'class' => null, 'container_id' => null ), $atts));

	return wp_nav_menu( array( 'menu' => $name, 'menu_class' => $class, 'container_id' => $container_id, 'echo' => false ) );

	}



	add_shortcode('menu', 'print_menu_shortcode');







function generatepress_child_enqueue_scripts() {

	if ( is_rtl() ) {

		wp_enqueue_style( 'generatepress-rtl', trailingslashit( get_template_directory_uri() ) . 'rtl.css' );

	}

}

add_action( 'wp_enqueue_scripts', 'generatepress_child_enqueue_scripts', 100 );











// add_action('wp_enqueue_scripts','Load_Template_Scripts_wpa83855');

// function Load_Template_Scripts_wpa83855(){

//     if ( is_page_template('SDportfolio.php') ) {

//         wp_enqueue_script('my-script', 'path/to/script.js');

//     } 

// }









// limit fontawesome icons for performance

add_filter( 'generate_fontawesome_essentials', 'tu_fontawesome_essentials' );

function tu_fontawesome_essentials() {

    return true;

}









add_action( 'after_setup_theme', 'setup' );

function setup() {

	add_theme_support( 'post-thumbnails' ); // This feature enables post-thumbnail support for a theme

	// To enable only for posts:

	//add_theme_support( 'post-thumbnails', array( 'post' ) );

	// To enable only for posts and custom post types:

	//add_theme_support( 'post-thumbnails', array( 'post', 'movie' ) );

	 

	// Register a new image size.

	// This means that WordPress will create a copy of the post image with the specified dimensions

	// when you upload a new image. Register as many as needed.

	// Adding custom image sizes (name, width, height, crop)

	// add_image_size( 'homeslider-image', 1024, 768, false );

	add_image_size( 'hero', 600, 300, true );

	add_image_size( 'slider', 350, 350, true );

	add_image_size( 'mediumSquare', 200, 200, true );

	add_image_size( 'logoSmall', 200, 200, false );



}





add_filter( 'image_size_names_choose', 'custom_image_sizes_choose' );

function custom_image_sizes_choose( $sizes ) {

	$custom_sizes = array(

		'hero' => 'hero',

		'slider' => 'slider',

		'mediumSquare' => 'mediumSquare',

		'logo' => 'logoSmall'



	);

	return array_merge( $sizes, $custom_sizes );

}				

		





// add_image_size( 'custom-size', 220, 180 ); // 220 pixels wide by 180 pixels tall, soft proportional crop mode











// remove version flag on all scripts for performance

add_filter( 'style_loader_src', 'generate_remove_cssjs_ver', 10, 2 );

add_filter( 'script_loader_src', 'generate_remove_cssjs_ver', 10, 2 );

function generate_remove_cssjs_ver( $src ) {

	if( strpos( $src, '?ver=' ) )

		$src = remove_query_arg( 'ver', $src );



	return $src;

}



add_action( 'init', 'generate_disable_wp_emojicons' );





//remove emojis for performance

function generate_disable_wp_emojicons()

{

	// all actions related to emojis

	remove_action( 'admin_print_styles', 'print_emoji_styles' );

	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );

	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );

	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

}





function sd_display_navbar (){

	if ( is_active_sidebar( 'sdnavbar' ) ) :

		ob_start();

		dynamic_sidebar( 'sdnavbar' ); 

		return ob_get_clean();

	endif; 

	return '';

}

add_shortcode( 'display_navbar', 'sd_display_navbar' );

















function sd_shortcode_show_homeslider() {

		

	ob_start();

	?>



	<?php

	echo '<div id = "SDslider">';

		if( have_rows('element') ):

			echo '<div class = "element">';

			// loop through the rows of data

			

			the_row();

					$title = get_sub_field('title');

					$image = get_sub_field('image');

					$page = get_sub_field('page');







				

					if ($page) {

						// echo 'this is the page';	

						// echo '<div class = "page"><h3>' . $page . '</h2></div>';

					}





					if ($image) {



				



						$imageurl = $image['sizes']['homeslider-image'];

						// echo '<div class = "image">' . $imageurl . '</div>';

		

						?>

						<div class = "banner">

							<div class = "navigation left"><div class = "button"></div></div>

							<div class = "wrapper">

							

								<div class = "image"  style= "	background-image: url(<?php echo $imageurl  ?>); background-size: cover;   " >	</div> 

							</div>

							<div class = "navigation right"><div class = "button"></div></div>

						</div>

						<?php



					if ($title) {

						echo '<div class = "boxedWidth">';

							echo '<div class = "title"><h2>' . $title . '</h2></div>';

						echo '</div>';

					}





					}	



				echo "</div>"; // element

				



				echo '<div class = "boxedWidth">';

					echo '<div class = "interface"> </div>';

					echo '<div class = "cta button"><a class = "page" href=" ' .  $page   . '">learn more</a>  </div>';

				echo '</div>';

	

		endif;

		reset_rows(); 



		echo "</div>"; // homeslider





?>



	<?php 

	return ob_get_clean();

}

add_shortcode( 'show_homeslider', 'sd_shortcode_show_homeslider' );





function admin_style() {

	wp_enqueue_style('admin-styles', get_stylesheet_directory_uri().'/css/admin/SDadmin.css');

  }

  add_action('admin_enqueue_scripts', 'admin_style');



  https://cleanpnw.wpengine.com/wp-content/themes/generatepress/css/admin/SDadmin.css

// enqueue all scripts

function add_theme_scripts() {

	



	wp_enqueue_script( 'SDlibrary', get_stylesheet_directory_uri() . '/js/modules/library.js', array ( 'jquery' ), null, true);

	wp_enqueue_script( 'SDload', get_stylesheet_directory_uri() . '/js/modules/load.js', array ( 'jquery', 'SDlibrary' ), null, true);

	wp_enqueue_script( 'SDlazyload', get_stylesheet_directory_uri() . '/js/modules/lazyload.js', array ( 'jquery', 'SDload' ), null, true);

	// wp_enqueue_script( 'SDnavbar', get_stylesheet_directory_uri() . '/js/modules/navbar.js', array ( 'jquery', 'SDload' ), null, true);

	wp_enqueue_script( 'SDblockLibrary', get_stylesheet_directory_uri() . '/js/modules/blocks/library.js', array ( 'SDlazyload' ), null, true);

	wp_enqueue_script( 'SDslider', get_stylesheet_directory_uri() . '/js/modules/blocks/slider.js', array ( 'SDlazyload', 'SDblockLibrary' ), null, true);

	wp_enqueue_script( 'SDstories', get_stylesheet_directory_uri() . '/js/modules/blocks/stories.js', array ( 'SDlazyload', 'SDblockLibrary' ), null, true);

	wp_enqueue_script( 'SDexpandingMessages', get_stylesheet_directory_uri() . '/js/modules/blocks/expandingMessages.js', array ( 'SDlazyload', 'SDblockLibrary' ), null, true);

	wp_enqueue_script( 'SDwhoWeAre', get_stylesheet_directory_uri() . '/js/modules/blocks/whoWeAre.js', array ( 'SDlazyload', 'SDblockLibrary' ), null, true);



	wp_enqueue_script( 'GSAP'	, get_stylesheet_directory_uri() . '/js/greensock/gsap.min.js', array ( 'jquery' ), null, true);

	wp_enqueue_script( 'GSAPSplitText'	, get_stylesheet_directory_uri() . '/js/greensock/SplitText.min.js', array ( 'jquery','GSAP' ), null, true);

	// wp_enqueue_script( 'GSAPCustomEase'	, get_stylesheet_directory_uri() . '/js/greensock/CustomEase.min.js', array ( 'jquery','GSAP' ), null, true);









	wp_enqueue_script( 'bigtext'	, get_stylesheet_directory_uri() . '/js/textfill/jquery.textfill.min.js', array ( 'jquery' ), null, true);







	wp_enqueue_script( 'SDresponsivemenuJS', get_stylesheet_directory_uri() . '/js/modules/responsiveMenu.js', array ( 'jquery' ), null, true);











	wp_enqueue_style( 'SDfontsCSS', get_stylesheet_directory_uri() . '/css/fonts.css', array(), 'null', 'all');

	wp_enqueue_style( 'SDmainCSS', get_stylesheet_directory_uri() . '/css/main.css', array(), 'null', 'all');

	wp_enqueue_style( 'SDstandardCSS', get_stylesheet_directory_uri() . '/css/modules/standards.css', array(), 'null', 'all');

	wp_enqueue_style( 'SDresponsiveemenuCSS', get_stylesheet_directory_uri() . '/css/modules/responsiveMenu.css', array(), 'null', 'all');

	wp_enqueue_style( 'SDblocksCSS', get_stylesheet_directory_uri() . '/css/modules/blocks.css', array(), 'null', 'all');

	wp_enqueue_style( 'SDnavbarCSS', get_stylesheet_directory_uri() . '/css/modules/navbar.css', array(), 'null', 'all');



	













	if ( is_page_template( 'SDhome.php' )  ) { 



       wp_enqueue_style( 'SDhomeCSS', get_stylesheet_directory_uri() . '/css/templates/home.css', array(), 'null', 'all');

	

	}



	



	  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {

		wp_enqueue_script( 'comment	-reply' );

	  }

  }

  add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );







  ?>