<?php

// if accessed directly, then exit
if (!defined('ABSPATH')) {
    exit;
}

// set theme directory
define('THEME_DIR', get_template_directory());
define('THEME_URI', get_template_directory_uri());

// include all php files in the inc folder
foreach (glob(THEME_DIR . '/inc/*.php') as $filename) {
    include $filename;
}

// Setup menus
define('MENUS', $menus = [
    'main-menu' => __('Main Menu'),
    'footer-menu' => __('Footer Menu'),
]);

// Setup widget areas
define('WIDGETS', $widgets = [
    'primary-sidebar' => __('Primary Sidebar'),
    'footer-widgets' => __('Footer Widgets'),
]);

// Setup custom image sizes
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

// Setup custom logo size
define('LOGO_SIZE', $logo_size = [
    'width' => 100,
    'height' => 400
]);