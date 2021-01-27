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





$blockID  = $block['id'];







// $blocks2 = parse_blocks( $pid->post_content );

// echo $blocks2;

// echo '<pre>'; print_r($blocks2); echo '</pre>';



// echo render_block( $block );





if ( is_admin() ) {

  

    // $imageUrl = $image['sizes']['medium' ];

    // echo ' <img src=" ' .  esc_url($imageUrl)  . '"><br>';

    // echo '<strong>' . $header . '</strong><br>';

    // echo $narrative . '<br>';

    // echo 'order: ' . $order . ' first';





    echo '<h2>slider block</h2>';



    echo '<div class = "wrapper images">';   

        if ( have_rows('images') ) {

        

                while ( have_rows('images') ) : the_row();

                    $image = get_sub_field('image');

                    // echo $image;

                    echo wp_get_attachment_image( $image['ID'], 'thumbnail', null, array( 'class' => 'image' ) );

                    echo ' ';

                endwhile;

                echo '<div class = "label"><strong>images:</strong><br><br></div>';

        } else {

            echo 'there are no images';

        }

    echo '</div>';



    echo '<strong>headline:  </strong>' . $headline;

    echo '<strong>transition time:  </strong>' . $transition_time. ' milliseconds<br>';



    echo '<div class = "wrapper ctas">';   

    echo '<strong>calls to action: </strong><br>';

    if ( have_rows('ctas') ) {

            $i =0;

            while ( have_rows('ctas') ) : the_row();

                $text = get_sub_field('button_text');

                $post_object = get_sub_field('page');

        

                $title = get_the_title($post_object);

                $url = get_the_permalink($post_object);

                echo $i . ':  ' . $text . ' - <a target = "_blank" href = "' . $url . '">' .  $title . '</a><br>';

                $i++;

            endwhile;

    

    } else {

        echo 'there are no calls to action';

    }

echo '</div>';







} else {

    // echo 'hello';

//   <script type="text/javascript" src="/js/modules//blocks/slider.js"></script>



  echo '<div class = "block slider notReady" data-blockID = "' . $blockID . '">';

    

        echo '<div class = "imageWrapper">';

            echo '<div class = "offset horizontal"></div>';  

            echo '<div class = "frame">';

                echo '<div class = "offset vertical">';

                    echo '<div class = "parallax">';

                        echo '<div class = "burns">';

                            if ( have_rows('images') ) {

                                $i = 0;

                          

                                while ( have_rows('images') ) : the_row();

                               

                                    $image = get_sub_field('image');

                                    // echo $image;

                                    $imageUrl = $image['sizes'][ 'slider' ];

                                    if ($i == 0) {

                                        // echo '<div class = "image" style = "background-image:url(\'' . $imageUrl . '\'")></div>';

                                        echo '<div class = "image current" style = "background-image:url(\'' . $imageUrl . '\')"></div>';

                                    } else {

                                        echo '<div class = "image" data-loadstatus= "notLoaded" data-bkgimage= "' . $imageUrl .  '"></div>';

                                    }

                                    $i++;

                                endwhile;

                            } 

                        echo '</div>';

                    echo '</div>';

                echo '</div>';

            echo '</div>';

        echo '</div>';
    echo '<div class = "borderWrapper">';
        echo '<div class = "border"></div>';
    echo '</div>';


    
    echo '<div class = "text boxedWidth">';    

        echo '<div class = "message">';

            echo $headline;

        echo '</div>';

 





        



  

       

        echo '<div class = "CTAs">';

            if ( have_rows('ctas') ) {

                while ( have_rows('ctas') ) : the_row();

                    $text = get_sub_field('button_text');

              

                    // $field_key = $field['key'];

                    $post_object = get_sub_field('page');

                    $url = get_the_permalink($post_object);

                    echo '<a class = "button coloredBkg" href = "' . $url . '">' .  $text . '</a>';     

                endwhile;

            } 

        echo '</div>';
        echo '<div class = "logo">';
            echo '<a href="/"><img src="/wp-content/uploads/logo.svg" class="style-svg"/></a>';
        echo '</div>';

    echo '</div>';

    

  echo '</div>';

}



// $thumb = $image['sizes'][ $size ];











?>

