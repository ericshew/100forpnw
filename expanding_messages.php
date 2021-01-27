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
$id = 'testimonial-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.


$transition_time = get_field('transition_time');
$headline = get_field('headline');



if ( is_admin() ) {
  
    // $imageUrl = $image['sizes']['medium' ];
    // echo ' <img src=" ' .  esc_url($imageUrl)  . '"><br>';
    // echo '<strong>' . $header . '</strong><br>';
    // echo $narrative . '<br>';
    // echo 'order: ' . $order . ' first';


    echo '<h2>expanding messages block</h2>';
    echo '<strong>headline:  </strong>' . $headline . '<br>';
    echo '<strong>transition time:  </strong>' . $transition_time. ' milliseconds<br>';


    echo '<div class = "wrapper messages">';   
        if ( have_rows('messages') ) {
                $i = 1;
                while ( have_rows('messages') ) : the_row();
                    // echo 'hello';
                    echo '<h3>message #' . $i . ':</h3>';
                    echo '<div class = "indent">'; 
                        $image = get_sub_field('image');
                        // echo $image;
                        echo wp_get_attachment_image( $image['ID'], 'thumbnail', null, array( 'class' => 'image' ) );
                        echo '<br>';
                        $subhead1 =  get_sub_field('subhead_line_1');
                        $subhead2 =  get_sub_field('subhead_line_2');
                        $body = get_sub_field('body');
                        $post_object =  get_sub_field('overflow_page');
                        $overflowPageText =  get_sub_field('overflow_button_text');

                        $title = get_the_title($post_object);
                        $url = get_the_permalink($post_object);

                        echo '<strong>subhead:  </strong>' . $subhead1 . ' | ' . $subhead2 . '<br>';
                        echo '<strong>body:  </strong>' . $body . '<br>';
                        echo $overflowPageText . ' - <a target = "_blank" href = "' . $url . '">' .  $title . '</a><br>';
                        $i++;
                    echo '</div>';
                endwhile;
        } else {
            echo 'there are no messages';
        }
    echo '</div>';






} else {
    $imageUrl = $image['sizes']['large' ];
    echo '<div class = "block expandingMessage inactive ' . $order . 'First">';
        echo '<div class = "boxedWidth">';
        // echo '<div style =  "background-image:url(\''. $imageUrl .'\')">'; echo 'ff</div>';
            echo '<div class = "title">';
                echo '<h2>' . $headline . '</h2>';
            echo '</div>';

            echo '<div class = "wrapper messages">';   
                if ( have_rows('messages') ) {
                    echo '<div class = "images">';   
                        $i = 0;
                        while ( have_rows('messages') ) : the_row();
                            if ($i==0) {
                                $subhead1 =  get_sub_field('subhead_line_1');
                                $subhead2 =  get_sub_field('subhead_line_2');
                                $body = get_sub_field('body');
                                $post_object =  get_sub_field('overflow_page');
                                $overflowPageText =  get_sub_field('overflow_button_text');
                            } 

                            $image = get_sub_field('image');
                    
                            // echo wp_get_attachment_image( $image['ID'], 'thumbnail', null, array( 'class' => 'image' ) );
                            $imageUrl = $image['sizes'][ 'mediumSquare' ];
                            // echo $image;
                            // echo $imageUrl;
                            echo '<div class = "image">';
                                echo '<div class = "element current" style = "background-image:url(\'' . $imageUrl . '\')"></div>';
                            echo '</div>';

                            $i++;
                        endwhile;
                    echo '</div>';
                    echo '<div class = "text">';   
                        echo '<div class = "headlines">';   
                            echo '<h3 class = "subhead1">' . $subhead1 . '</h3>';
                            echo '<h3 class = "subhead2">' . $subhead2 . '</h3>';
                        echo '</div>';
                        echo '<div class = "body wrapper">';  
                            echo '<div class= "body Element">' . $body . '</div>';
                            echo '<a class = "button" href = ' . $url . '>' . $overflowPageText . '</a>';
                        echo '</div>';
                    echo '</div>';
                 }
            echo '</div>';
        echo '</div>';
    echo '</div>';

}

// $thumb = $image['sizes'][ $size ];





?>
