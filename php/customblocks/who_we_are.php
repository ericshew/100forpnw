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

$headline = get_field('headline');
$image_background = get_field('image_background');
$body = get_field('body');
$image_url = $image_background['sizes']['hero' ];
$backgroundValue = get_field('backgroundValue');

if ( is_admin() ) {
  
    // $imageUrl = $image['sizes']['medium' ];
    // echo ' <img src=" ' .  esc_url($imageUrl)  . '"><br>';
    // echo '<strong>' . $header . '</strong><br>';
    // echo $narrative . '<br>';
    // echo 'order: ' . $order . ' first';

    echo '<h2>who we are block</h2>';
    
    echo '<strong>headline:  </strong>' . $headline . '<br>';
    echo '<strong>body:  </strong>' . $body;
    echo ' <img src=" ' .  esc_url($image_url)  . '"><br>';
    echo '<strong>background image</strong><br><br>';
    echo '<strong>background value:  </strong>' . $backgroundValue;


    if ( have_rows('partners') ) {
        $i = 1;
        while ( have_rows('partners') ) : the_row();
            echo '<h3>partner #' . $i . ':</h3>';
            $name = get_sub_field('partner_name');
            $logo = get_sub_field('partner_logo');
            echo '<strong>name:  </strong>' . $name . '<br>';
            echo wp_get_attachment_image( $logo['ID'], 'thumbnail', null, array( 'class' => 'image' ) );

        endwhile;
        }

} else {
    echo '<div class = "block whoWeAre notReady backgroundValue'. $backgroundValue . '"  data-blockID = "' . $blockID . '">';
        echo '<div class = "boxedWidth">';
                echo '<div class = "wrapper" style =  "background-image:url(\''. $image_url .'\')">'; 
                echo '<div class = "title">';
                    echo '<h2>' . $headline . '</h2>';
                echo '</div>';
                echo '<div class = "body">';
                    echo  $body;
                echo '</div>';
                echo '<div class = "partners">';
                    if ( have_rows('partners') ) {
                        $i = 0;
                        while ( have_rows('partners') ) : the_row();
                            echo '<div class = "partner">';
                                $name = get_sub_field('partner_name');
                                $logo = get_sub_field('partner_logo');
                                
                                if (!empty($logo) ) {
                                    echo wp_get_attachment_image( $logo['ID'], 'logoSmall', null, array( 'class' => 'image' ) );
                                    }
                                else {
                                    echo $name;
                                } 
                            echo '</div>';
                    
                
                        endwhile;
                
                        } else {
                            echo 'no rows';
                        }


                    echo '</div>';
                echo '</div>';
        echo '</div>';
    echo '</div>';
}
// $thumb = $image['sizes'][ $size ];


?>
