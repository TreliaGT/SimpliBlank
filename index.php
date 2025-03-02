<?php get_header(); ?>

<?php
if ( have_posts() ) : while ( have_posts() ) : the_post();
endwhile;
simpli_numbered_pagination();
else :
endif;
?>

<?php get_footer(); ?>