<?php

function sd_register_blocks() {

	

	if( ! function_exists( 'acf_register_block_type' ) )

		return;

	acf_register_block_type( array(

		'name'			=> 'block-slider',

		'title'			=> __( 'slider' ),

        // 'render_template'	=> 'partials/block-team-member.php',block-project-row.php

        'render_template'	=> 'php/customblocks/slider.php',

		'category'		=> 'climate-solutions',

		'icon'			=> 'images-alt2',

		'mode'			=> 'auto',

		'keywords'		=> array(  'row', 'project', 'slider', 'climate solutions' )





    ));

    acf_register_block_type( array(

		'name'			=> 'block-expanding-messages',

		'title'			=> __( 'expanding messages' ),

        // 'render_template'	=> 'partials/block-team-member.php',block-project-row.php

        'render_template'	=> 'php/customblocks/expanding_messages.php',

		'category'		=> 'climate-solutions',

		'icon'			=> 'admin-site',

		'mode'			=> 'auto',

		'keywords'		=> array(  'row', 'expanding messages',  'climate solutions' )





    ));

    acf_register_block_type( array(

		'name'			=> 'block-stories',

		'title'			=> __( 'stories' ),

        // 'render_template'	=> 'partials/block-team-member.php',block-project-row.php

        'render_template'	=> 'php/customblocks/stories.php',

		'category'		=> 'climate-solutions',

		'icon'			=> 'format-quote',

		'mode'			=> 'auto',

		'keywords'		=> array(  'row', 'project', 'stories', 'climate solutions' )





    ));

    acf_register_block_type( array(

		'name'			=> 'block-who-we-are',

		'title'			=> __( 'who we are' ),

        // 'render_template'	=> 'partials/block-team-member.php',block-project-row.php

        'render_template'	=> 'php/customblocks/who_we_are.php',

		'category'		=> 'climate-solutions',

		'icon'			=> 'networking',

		'mode'			=> 'auto',

		'keywords'		=> array(  'row', 'project', 'who we are', 'climate solutions' )





	));


	acf_register_block_type( array(

		'name'			=> 'block-form',

		'title'			=> __( 'form' ),

        // 'render_template'	=> 'partials/block-team-member.php',block-project-row.php

        'render_template'	=> 'php/customblocks/form.php',

		'category'		=> 'climate-solutions',

		'icon'			=> 'networking',

		'mode'			=> 'auto',

		'keywords'		=> array(  'row', 'project', 'who we are', 'form', 'climate solutions' )





	));






}













add_action('acf/init', 'sd_register_blocks' );





function sd_block_categories( $categories ) {

    $category_slugs = wp_list_pluck( $categories, 'slug' );

    return in_array( 'gwg', $category_slugs, true ) ? $categories : array_merge(

        $categories,

        array(

            array(

                'slug'  => 'climate-solutions',

                'title' => __( 'Climate Solutions' ),

                'icon'  => null,

            ),

        )

    );

}



add_filter( 'block_categories', 'sd_block_categories' );



?>