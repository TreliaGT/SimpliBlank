# SimpliBlank
A blank starter theme for SimpliWeb. Removes all block editor support, cleans the admin and the head.

## Usage

### Setup

#### Custom PHP Functions
Any custom php functions create a php file as a child in INC folder and it will automatically be included. It will not work if in a child folder, you will then need to include that manually

### Custom Menu Areas
In the functions.php is an array for defining menu areas
```
define('MENUS', $menus = [
    'main-menu' => __('Main Menu'),
    'footer-menu' => __('Footer Menu'),
]);
```

### Custom Widget Areas
In the functions.php is an array for defining widetised areas
```
define('WIDGETS', $widgets = [
    'primary-sidebar' => __('Primary Sidebar'),
    'footer-widgets' => __('Footer Widgets'),
]);
```

### Custom Image Sizes
In the functions.php is an array for defining custom image sizes. it has 2 examples already in there, one scales by defining 'crop' => false, and the other crops the image by defining 'crop' => true.

```
define('IMAGE_SIZES', $image_sizes = [
    // example cropped image
    'c370x370' => [
        'width' => 370,
        'height' => 370,
        'crop' => true,
    ],
    // example scaled image
    's150x150' => [
        'width' => 150,
        'height' => 150,
        'crop' => false,
    ],
]);
```

### Custom Logo Size
In the functions.php is an array for defining the custom logo support and size
```
define('LOGO_SIZE', $logo_size = [
    'width' => 100,
    'height' => 400
]);
```

### CSS
SimpliBlank theme is built to use SCSS, all scss can go in the /assets/scss and import into the main style.scss
I use the [Live Sass Compiler by Glenn Marks](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass) extension in my VS Code

### JS
SimpliBlank theme does not have jquery enqueued aso is setup to use Vanilla JS. Just drop your JS into /assets/js/script.js

### Helper Functions
SimpliBlank theme has a fe helper functions to help with PHP. These can be found in /inc/helpers.php

#### simpli_schema_type
Used in the body tag to add schema to pages

#### simpli_numbered_pagination
Add as numbered pagination for archive pages etc for standard archive you can see it in place on index.php but for custom queries
```
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = [
    'post_type' => ['post'],
    'posts_per_page' => 9,
    'paged' => $paged
];
$query = new WP_Query($args);
if ($query->have_posts()) : while ($query->have_posts() ) : $query->the_post();
endwhile;
simpli_numbered_pagination();
wp_reset_postdata();
else;
endif;
```

#### ifne
This is when querying an array variable, it saves having to do isset checks etc so it avoids errors. Usage is ifne($array, $key, $default). Default is empty string if not defined
```
<?php
$array = [
    'name' => 'My Name',
    'email' => 'email@domain.com'
];
?>
<a href="<?php echo ifne($array, 'email'); ?>">Email <?php echo ifne($array, 'name'); ?></a>
```

#### phoneurl
This converts a string value phone number to a link. so define the phone how it might display in the front end. Usage is phoneurl($string, $country_code). Country Code is default Australia +61
```
<?php
$phone = '(08) 1234 5678';
?>
<a href="<?php echo phoneurl($phone) ?>"><?php echo $phone ?></a>
// <a href="tel:+61812345678">(08) 1234 5678</a>
```

or mobile example
```
<?php
$phone = '0412 345 678';
?>
<a href="<?php echo phoneurl($phone) ?>"><?php echo $phone ?></a>
// <a href="tel:+61412345678">0412 345 678</a>
```

#### isarr
This just returns true of false if an array is valid. It not only checks it is an array format like is_array it also checks it has values. Usage isarr($array0);
returns false because it is empty array
```
$array = [];
if(isarr($array)) {

}
```

returns false because it is a string, not an array
```
$array = 'This is an Array';
if(isarr($array)) {

}
```

returns true because it is an array with values
```
$array = $array = [
    'name' => 'My Name',
    'email' => 'email@domain.com'
];
if(isarr($array)) {

}
```

#### get_time_ago
Returns how long ago a post was published in minutes, weeks, months or years and plurals as necessary. Usage get_time_ago($post_id);

```
$post_id = get_the_ID();
echo get_time_ago($post_id);
```

#### acfimg
This ouputs the image url for a defined size from the array output by the Advanced Custom Fields (ACF) image field. Usage acfimage($image_array, $size). $size default is full if empty

```
$image = get_field($image_field_id) ?? [];
if(isarr($image)) {
    $image_url = acfimg($image, 'c370x370'); // where c370x370 is a custom size
}
```

### calculate_reading_time
Calculates how long it will take to read an article by how many words are the content based on the average reading time of 225 words per minute. Usage calculate_reading_time($post_id, $post_meta); $post_meta defaults to the_content but you can use a custom field id

The Content example
```
calculate_reading_time(get_the_ID());
```

or to use a post_meta value
```
calculate_reading_time(get_the_ID(), 'custom_wysiwyg');
```

## SASS Mixins
There are two sass mixins included to assist with writing scss

### pxtorem
This converts any px value to rem based on a 16px default. Usage pxtorem($value).
```
p {
    font-size: pxtorem(16); // outputs as font-size: 1rem;
}
h1 {
    font-size: pxtorem(32); // outputs as font-size: 2rem;
}
```

### breakpoint
This allows scss to be set for different breakpoints without needing to write media queries. Usage @include breakpoint($size).
Sizes are defined in the mixin.scss as the following breakpoints
```
$breakpoints: (
    sm: pxtorem(540),
    md: pxtorem(720),
    lg: pxtorem(960),
    xl: pxtorem(1140)
);
```

Usage
```
h1 {
    font-size: pxtorem(32); // 

    @include breakpoint(lg) {
        font-size: pxtorem(45);
    }
}
```

this would ouput like this after compiling
```
h1 {
  font-size: 2rem; // 32px
}
@media (min-width: 60rem) { // breakpoint min-width: 960px;
  h1 {
    font-size: 2.8125rem; // 45px
  }
}
```