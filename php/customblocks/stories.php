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
$id = 'testimonial-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}
// Create class attribute allowing for custom "className" and "align" values.

$transition_time = get_field('transition_time');
$max_stories = get_field('max_stories');
$order = get_field('order');
$image_background = get_field ('image_background');
$image_url_frontend = $image_background['sizes']['hero' ];

if ( is_admin() ) {
  
$image_url_admin = $image_background['sizes']['medium' ];
    echo '<h2>stories block</h2>';
    echo ' <img src=" ' .  esc_url($image_url_admin)  . '"><br>';
    echo '<strong>background image</strong><br><br>';
    // echo $image_url;
  
    echo '<strong>order:  </strong>' . $order . '<br>';
    echo '<strong>maximum number of stories:  </strong>' . $max_stories . '<br>';
    echo '<strong>transition time:  </strong>' . $transition_time. ' milliseconds<br>';
    
 
} else {
    echo '<div class = "block stories" data-blockID = "' . $blockID . '">';
        if ($order == 'date') {
            $sortOrder = 'DESC';
            $orderCat = 'date';
        } else {
            $sortOrder = 'ASC';
            $orderCat = 'title';
        }
   
        $args = [
            'order'         => $sortOrder ?: 'ASC',
            'orderby' => $orderCat ?: 'title',
            // 'categories' => $categories,
            // 'posts_per_page' => $postsperpage ?: 1000,
            // 'tags' => $tags,
            // 'offset' => $tags,
            // 'id' =>$id,
            'post_type' => 'story'
        ];
        $loop = new WP_Query($args);
        // $data = [];
        echo '<div class = "boxedWidth">';
            echo '<div class = "background">';
                echo '<div class = "burns">';
                    echo '<div class = "element" style = "background-image:url(\'' . $image_url_frontend . '\')"></div>';
                echo '</div>';
            echo '</div>';
            echo '<div class = "content">';
                echo '<div class = "image notReady">';
                    echo '<div class = "interface"></div>';
                    $i = 0;
                    while ( $loop->have_posts() ) : $loop->the_post(); 
                    // foreach($posts as $post) {
                        $post_id = get_the_ID();
                        // $featuredImage = get_the_post_thumbnail();
                        $featuredImage = get_the_post_thumbnail_url($post_id,"large");
            
                        if ($i == 0){
                            $title= get_field( 'title',$post_id) . ', '; 
                            $city = get_field( 'city',$post_id) . ', '; 
                            $state = get_field( 'state',$post_id); 
                            $large_quote = get_field( 'large_quote',$post_id); 
                            $small_quote = get_field( 'small_quote',$post_id); 
                            $permalink=  get_permalink();
                            // $data[$i]['url'] = get_permalink();fs
                            $organization = get_field( 'organization',$post_id); 
                            $name = get_the_title();
                            $content = get_the_content();
                            echo '<div class = "current outerWrapper">';
                                echo '<div class = "element" style = "background-image:url(\'' . $featuredImage . '\')"></div>';
                            
                            echo '</div>';
                            } else {
                                echo '<div class = "outerWrapper">';
                                    echo '<div class = "element" data-loadstatus= "notLoaded" data-bkgimage= "' . $featuredImage .  '"></div>';
                                    // echo $featuredImage;
                                echo '</div>';
                            }                
                        $i++;
                    endwhile;
                    echo '<div class = "outerWrapper background"></div>';
                echo '</div>';
                echo '<div class = "text notReady">';
                    echo '<div class = "quote large">';
                        echo $large_quote;
                    echo '</div>';
                    echo '<div class = "quote small">';
                        echo $small_quote;
                    echo '</div>';
                    echo '<div class = "details">';
                            echo '<span class = "name">';
                                echo '<span class = "element">';
                                    echo $name;
                                echo '</span>';
                            echo '</span>';
                        echo '<span class = "title">';
                            echo '<span class = "element">';
                                echo $title;
                            echo '</span>';
                        echo '</span>';
                        echo '<span class = "organization">';
                            echo '<span class = "element">';
                                echo $organization;
                            echo '</span>';
                        echo '</span>';
                        echo '<span class = "city">';
                            echo '<span class = "element">';
                                echo $city;
                            echo '</span>';
                        echo '</span>';
                        echo '<span class = "state">';
                            echo '<span class = "element">';
                                echo $state;
                            echo '</span>';
                        echo '</span>';
                    echo '</div>';
                    if (!empty($content)) {
                        echo '<a class = "button readMore" href ="' . $permalink . '">read more</a>';
                    }
                echo '</div>';
            echo '</div>';
        echo '</div>';
    echo '</div>';
}


?>
