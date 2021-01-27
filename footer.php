<?php
/**
 * The template for displaying the footer.
 *
 * @package GeneratePress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

	</div><!-- #content -->
</div><!-- #page -->

<?php
/**
 * generate_before_footer hook.
 *
 * @since 0.1
 */
do_action( 'generate_before_footer' );
?>


<div <?php generate_footer_class(); ?>>
	<?php
	/**
	 * generate_before_footer_content hook.
	 *
	 * @since 0.1
	 */
	do_action( 'generate_before_footer_content' );

	/**
	 * generate_footer hook.
	 *
	 * @since 1.3.42
	 *
	 * @hooked generate_construct_footer_widgets - 5
	 * @hooked generate_construct_footer - 10
	 */

	
	echo '<div class =  "footer">';
		echo '<div class = "boxedWidth">';
			echo '<div class = "footerCTA">';

			echo '</div>';
			echo '<div class = "identity">';
				echo '<div class = "logo">';
					echo '<a href="/"><img class="alignnone style-svg size-medium" src="/wp-content/uploads/logo.svg" /></a>';
				echo '</div>';
				echo '<div class = "social">';
					wp_nav_menu(array('menu' => 'social'));
				echo '</div>';
			echo '</div>';
			echo '<div class = "address">';
				echo '1402 Third Ave, #1200, Seattle, WA 98101<br>';
				echo '<a href = "mailto:info@100forPNW.org"> info@100forPNW.org</a>';
				echo '<div class = "logo">';
				echo '</div>';                         
			echo '</div>';
		echo '</div>';
		echo '<div class = "appendix">';
			echo '<div class = "menu">';
				wp_nav_menu(array('menu' => 'footer'));
			echo '</div>';	
			echo '<div class = "credits">';
				echo '&copy' . ' ';
				echo date('Y') . ' ';
				echo 'Climate Solutions | site by <a target = "_blank" href="https://shew-design.com">Shew Design</a>';	
			echo '</div>';	
		echo '</div>';	
	echo '</div>';	
	
	
	do_action( 'generate_footer' );

	/**
	 * generate_after_footer_content hook.
	 *
	 * @since 0.1
	 */
	do_action( 'generate_after_footer_content' );

	?>
</div><!-- .site-footer -->




</body>
</html>


<?php
/**
 * generate_after_footer hook.m
 *
 * @since 2.1
 */
do_action( 'generate_after_footer' );

wp_footer();
?>






</body>
</html>
