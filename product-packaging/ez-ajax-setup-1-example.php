<?php
/**
 * Maybe you make this a plugin. Maybe it's baked into you theme. Where ever you put it, you're
 * also telling setup that your request specific js will be in js/my-ez-ajax-example.js.
 *
 * Note: The js in that file atm is for the (MailChimp API) "real" example, as seen in Ajax Request 1.
 *
 * Yes, you're seeing it correctly. To get Setup for Ajax requests, this is all you need. The rest
 * of the magic - sans what you'd do in my-ez-ajax-example.js - is contained in the individual request.
 *
 *
 * Created by PhpStorm.
 * User: wpezclasses
 * Date: 5/6/2015
 * Time: 9:14 PM
 */


if ( ! class_exists('Class_WP_ezClasses_Ajax_Setup_1_Example') ) {

    class Class_WP_ezClasses_Ajax_Setup_1_Example extends Class_WP_ezClasses_Ajax_Setup_1
    {


        /**
         * Note: Any of the other defaults can be TODOs. The TODOs here are the most typical / minimum.
         */
        protected function ajax_todo()
        {
            $arr_todo = array(
                'ajax_js_handle'            => 'ez-ajax-setup-1',               // you'll need this value in your request(s) class
                'my_js_handle'              => 'my-ez-ajax-example',           // you'll need this value in your request(s) class
                'my_js_src'                 => plugin_dir_url(__FILE__) . 'js/my-ez-ajax-example.js',
            );
            return $arr_todo;
        }


    }
}

Class_WP_ezClasses_Ajax_Setup_1_Example::ez_new();