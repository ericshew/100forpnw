<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package GeneratePress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
global $post; 
if ( has_post_thumbnail() ) {
	$featured_image = get_the_post_thumbnail_url($post, 'hero-image' );


}

$title = get_the_title();


// echo '<h1>hello</h1>';
echo '<div class = "hero wrapper">';
	echo '<div class = "images wrapper parallax">';
		echo '<div class = "images wrapper burns">';
			echo '<div class = "image" style= " background-image: url( ' . $featured_image . ')"></div>';
		echo '</div>';
	echo '</div>';
	echo '<div class = "pageTitle">' . $title  . '</div>';
echo '</div>';







get_header(); ?>

	<div id="primary" <?php generate_content_class();?>>
		<main id="main" <?php generate_main_class(); ?>>
			<?php
			/**
			 * generate_before_main_content hook.f
			 *
			 * @since 0.1
			 */
			do_action( 'generate_before_main_content' );	

			while ( have_posts() ) : the_post();

				get_template_part( 'content', 'page' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || '0' != get_comments_number() ) : ?>

					<div class="comments-area">
						<?php comments_template(); ?>
					</div>

				<?php endif;

			endwhile;
			
			/**
			 * generate_after_main_content hook.
			 *
			 * @since 0.1
			 */
			do_action( 'generate_after_main_content' );
			?>
			

		</main><!-- #main -->
	</div><!-- #primary -->



	<?php
	/**
	 * generate_after_primary_content_area hook.
	 *
	 * @since 2.0
	 */
	 do_action( 'generate_after_primary_content_area' );

	 generate_construct_sidebars();



	 
get_footer();


