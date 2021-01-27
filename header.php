<?php
/**
 * The template for displaying the header.
 *
 * @package GeneratePress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>

<?php

$pageID = get_the_ID();

$forceTopMargin = get_field( "force_top_margin_on_top_block",$pageID );
$hideTopMenu = get_field( "hide_top_hamburger_menu",$pageID );
$hideTopLogoMobile = get_field( "hide_top_logo_mobile",$pageID );
$class = '';

if ($forceTopMargin) {
	$class .= "forceTopMargin ";

}

if ($hideTopMenu) {
	$class .= "hideTopMenu ";
	
}

if ($hideTopLogoMobile) {
	$class .= "hideTopLogoMenu ";
	
}


// echo $class;

?>




<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<?php $SD_division_meta = get_post_meta( get_the_ID(), 'SD-division-meta',true ); ?>
<body id = "SD" <?php generate_body_schema();?> <?php body_class(array('SD',$SD_division_meta,$class)); ?>>
	<?php
	/**
	 * generate_before_header hook.
	 *
	 * @since 0.1
	 *
	 * @hooked generate_do_skip_to_content_link - 2
	 * @hooked generate_top_bar - 5
	 * @hooked generate_add_navigation_before_header - 5
	 */



	/**
	 * generate_after_header hook.
	 *
	 * @since 0.1
	 *
	 * @hooked generate_featured_page_header - 10
	 */
	do_action( 'generate_after_header' );
	?>




<div id = "responsiveTrigger" class = "	enabled loading">
	<div class = "bar"></div>
	<div class = "bar"></div>
	<div class = "bar"></div>
</div>

<div id = "responsiveMenu">
	<?php wp_nav_menu(array('menu' => 'primary')); ?>
	<?php wp_nav_menu(array('menu' => 'social')); ?>	
</div>





<div id="navbar">
		<div class="boxedWidth wrapper">
			<div class="identity">
				<div class="logo notReady"><a href="/"><img class="alignnone style-svg size-medium" src="/wp-content/uploads/logo.svg" /></a></div>
			</div>
		</div>
	</div>
	<!-- <div id="navbarPush"></div> -->


	<div id="page" class="hfeed site grid-container container grid-parent">
		<div id="content" class="site-content">



		
			<?php
			/**
			 * generate_inside_container hook.
			 *
			 * @since 0.1
			 */
			do_action( 'generate_inside_container' );
