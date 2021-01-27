<?php

/**
 * Testimonial Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.

$blockID  = $block['id'];

// Create class attribute allowing for custom "className" and "align" values.



$code = get_field('code');


$image_background = get_field('image_background');



$image_url = $image_background['sizes']['hero' ];



$blockID  = $block['id'];



if ( is_admin() ) {
  



    echo '<h2>code block</h2>';

    
    echo '<strong>code:  </strong><pre>' . $code . '</pre><br>';
    echo '<strong>background image:  <br></strong>';

    echo wp_get_attachment_image( $image_background['ID'], 'thumbnail', null, array( 'class' => 'image' ) );




} else {
    // echo '<div class = "block code notReady backgroundValue'. $image_url . '"  data-blockID = "' . $blockID . '">';
    echo '<div class = "block code notReady backgroundValue"    style = "background-image:url(\''. $image_url .'\')"  data-blockID = "' . $blockID . '">';
        echo '<div class = "boxedWidth" >';
            echo $code;
        echo '</div>';
    echo '</div>';

}

// $thumb = $image['sizes'][ $size ];





?>
