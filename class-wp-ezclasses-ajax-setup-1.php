<?php
/**
 * The (js) foundation for your ez Ajax requests
 *
 * PHP version 5.3
 *
 * LICENSE: TODO
 *
 * @package WPezClasses
 * @author Mark Simchock <mark.simchock@alchemyunited.com>
 * @since 0.5.0
 */

/**
 * CHANGE LOG
 *
 */

/**
 * -- TODO --
 *
 * - https://gist.github.com/jtsternberg/2445968b4f50b654c923
 * - https://thomasgriffin.io/a-creative-approach-to-efficient-and-scalable-wordpress-api-endpoints/
 * - http://torquemag.io/improved-wordpress-front-end-ajax-processing/
 */

if ( ! class_exists('Class_WP_ezClasses_Ajax_Setup_1') ) {

    class Class_WP_ezClasses_Ajax_Setup_1 extends Class_WP_ezClasses_Master_Singleton
    {

        protected $_version;
        protected $_url;
        protected $_path;
        protected $_path_parent;
        protected $_basename;
        protected $_file;

        protected $_arr_init;

        protected $_obj_wp_enqueue;
        protected $_obj_conditional_tags;


        protected function __construct()
        {
        }

        public function ez__construct()
        {

            $this->setup();

            $this->_arr_init = WPezHelpers::ez_array_merge(array($this->init_defaults(), $this->ajax_todo()));

            $this->_obj_wp_enqueue = Class_WP_ezClasses_ezCore_WP_Enqueue::ez_new();
            $this->_obj_conditional_tags = Class_WP_ezClasses_ezCore_Conditional_Tags::ez_new();

            if ($this->_arr_init['wp_enqueue_scripts_active']) {
                add_action('wp_enqueue_scripts', array($this, 'ajax_wp_enqueue_scripts'), $this->_arr_init['wp_enqueue_scripts_priority']);
            }
            if ($this->_arr_init['admin_enqueue_scripts_active']) {
                add_action('admin_enqueue_scripts', array($this, 'ajax_wp_enqueue_scripts'), $this->_arr_init['admin_enqueue_scripts_priority']);
            }

        }

        /**
         * Note: Any of the init_defaults can be TODOs. The TODOs here are the most typical / minimum.
         */
        protected function ajax_todo()
        {
            $arr_todo = array(
                'ajax_js_handle'            => 'ez-ajax-setup-1',
                'my_js_handle'              => 'my-ez-ajax',
                'my_js_src'                 => $this->_url . 'js/my-ez-ajax.js',
            );
            return $arr_todo;
        }


        /**
         * @return array
         */
        public function init_defaults()
        {

            //     $str_protocol = isset( $_SERVER["HTTPS"] ) ? 'https://' : 'http://';

            $arr_defaults = array(

                'wp_enqueue_scripts_active'         => true,
                'wp_enqueue_scripts_priority'       => 10,
                'admin_enqueue_scripts_active'      => true,
                'admin_enqueue_scripts_priority'    => 10,

                'ajax_js_handle'            => 'ez-ajax-setup-1',           // when enqueue'ing what handle do you want to assign to the ajax-setup-1.js
                'ajax_js_min'               => false,   // .min = TODO

                'my_js_active'              => true,
                'my_js_handle'              => 'my-ez-ajax',
                'my_js_src'                 => $this->_url . 'js/my-ez-ajax.js',
                'my_js_localize_active'     => false,                        // Note: If 'my_js_active' is false then this is ignored anyway
                'my_js_localize_name'       => 'TODO',                      // be sure to use this if you set my_js_localize_active to true


                'link_active'               => true,
                'selector_link'             => '.ez-ajax-link',

                'form_submit_active'        => true,
                'selector_form_submit'      => '.ez-ajax-form-submit',

                'form_on_change_active'     => true,
                'selector_form_on_change'   => '.ez-ajax-form-on-change',

                'form_search_active'        => true,
                'selector_form_search'      => '.ez-ajax-form-search',

                'data_wp_localize_name'         => 'ezwplocalizename',       // data attribute - .data(Obj.data_wp_localize_name) - that tells us which wp_localize_script() name we should use to get other args for this request.
                'data_link_query_string'        => 'ezquerystring',          // data attribute - *only for (simple) link requests* - lets us pass some data, in classic query sting / serialize format please

                'data_wp_localize_name_error'   => 'No data attribute (data_wp_localize_name) or (the value of) data_wp_localize_name is not a wp_localize_script() name',
            );

            return $arr_defaults;
        }


        /**
         * Your custom js of CBs etc for your ajax requesting pleasure
         *
         * @return array
         */
        protected function my_js_enqueue_todo()
        {

            $arr_init = $this->_arr_init;

            return array(

                'my_js_enqueue_todo' => array(

                    'active'                => $arr_init['my_js_active'],
                    'host'                  => 'my bespoke plugin',
                    'note'                  => "",
                    'conditional_tags'      => array(),
                    'type'                  => 'script',
                    'handle'                => $arr_init['my_js_handle'],
                    'src'                   => $arr_init['my_js_src'],
                    'deps'                  => array('jquery'),
                    'ver'                   => '0.0.1',
                    //	'media'				=> NULL,
                    'in_footer'             => true,
                ),
            );
        }

        /**
         * Perhaps you want to localize some "stuff" for your .js. This array will be wp localized using 'my_js_localize_name'
         *
         * For example, maybe you don't want to hardcode your error msgs into your js and would instead to pass them in on a proj by proj basis.
         *
         * @return array
         */
        protected function my_js_localize_todo()
        {

            return array();

        }


        /**
         * May or may not be a TODO.
         *
         * Define when the js should / should not be enqueue'd based on WPezClasses conditional_tags
         *
         * In short Class_WP_ezClasses_Core_Conditional_Tags takes a tag and value and evaluates them.
         * for example,
         *  -- Instead of updating a conditional if ( is_admin() && is_x() && ! is_y() && ...)
         *  -- You would have $x = array( 'is_admin' => true, 'is_x' => true, 'is_y' => false, ...) and  then (pseudo code) if ( $obj_init->conditional_tags_evaluate($x) ) {}
         *
         * Which means you can update logic / rules by updating an array (instead of actual code).
         *
         */
        public function wp_enqueue_conditional()
        {

            $arr_load_when = array(
                'tags' => array(
                    'is_admin' => true,
                    'is_admin' => false,
                )
            );

            $arr_cond_tag = $this->_obj_conditional_tags->conditional_tags_evaluate($arr_load_when);

            if (isset($arr_cond_tag) && isset($arr_cond_tag['status']) && $arr_cond_tag['status'] === true) {
                return true;
            }
            return false;
        }


        /**
         * just the basic values the ajax-requests-1.js needs to do its "stuff". this is passed via wp_localize_script (see below)
         *
         */
        protected function setup_localize()
        {

            $arr_init = $this->_arr_init;

            $selector_link = $arr_init['link_active'];
            if ($arr_init['link_active']) {
                $selector_link = $arr_init['selector_link'];
            }

            $selector_form_submit = $arr_init['form_submit_active'];
            if ($arr_init['form_submit_active']) {
                $selector_form_submit = $arr_init['selector_form_submit'];
            }

            $selector_form_on_change = $arr_init['form_on_change_active'];
            if ($arr_init['form_on_change_active']) {
                $selector_form_on_change = $arr_init['selector_form_on_change'];
            }

            $selector_form_search = $arr_init['form_search_active'];
            if ($arr_init['form_search_active']) {
                $selector_form_search = $arr_init['selector_form_search'];
            }

            $arr_js_localize = array(

                'selector_link'                 => $selector_link,
                'selector_form_submit'          => $selector_form_submit,
                'selector_form_on_change'       => $selector_form_on_change,
                'selector_form_search'          => $selector_form_search,

                'data_wp_localize_name'         => $arr_init['data_wp_localize_name'],
                'data_link_query_string'        => $arr_init['data_link_query_string'],

                'data_wp_localize_name_error'   => $arr_init['data_wp_localize_name_error'],
            );

            return $arr_js_localize;
        }


        /*
         * enqueues the js
         */
        public function ajax_wp_enqueue_scripts()
        {
            $arr_init = $this->_arr_init;

            // Only load the js when?
            $bool_conditional = $this->wp_enqueue_conditional();

            if ($bool_conditional) {

                $arr_args['arr_args'] = $this->ajax_enqueue();

                $this->_obj_wp_enqueue->ez_rs($arr_args);
                $this->_obj_wp_enqueue->wp_enqueue_do($this->ajax_enqueue());

                $this->ajax_wp_localize_script();
            }
        }

        /*
         * Class_WP_ezClasses_Core_WP_Enqueue takes an array of this format / args and "automates" the enqueue'ing.
         *
         * Do not change (unless you feel you must)
         */
        public function ajax_enqueue()
        {

            $arr_init = $this->_arr_init;

            $arr_deps = array('jquery');
            // if the my_js isn't active then we can't have it drive the deps here
            if ( $arr_init['my_js_active'] === true ) {
                $arr_deps = array('jquery', $arr_init['my_js_handle']);
            }

            $str_min = '';
            if ( $arr_init['ajax_js_min' ] === true ){
                $str_min = '.min';
            }

            $arr_scripts_and_styles = array(

                'wp_ezc_ajax_js' => array(
                    'active'            => true,
                    'host'              => 'WPezClasses',                    // for internal use
                    'note'              => 'TODO',                           // for internal use
                    'conditional_tags'  => array(),
                    'type'              => 'script',
                    'handle'            => $arr_init['ajax_js_handle'],
                    'src'               => $this->_url . 'js/ajax-setup-1'. $str_min . '.js',
                    'deps'              => $arr_deps,
                    'ver'               => '0.5.0',
                    //	'media'				=> NULL'
                    'in_footer'         => true,
                ),
            );

            $arr_scripts_and_styles = WPezHelpers::ez_array_merge(array($arr_scripts_and_styles, $this->my_js_enqueue_todo()));
            return $arr_scripts_and_styles;
        }


        protected function ajax_wp_localize_script(){

            $arr_init = $this->_arr_init;

            // wp_localize_script() must always be after its mother script (and never prior)
            $str_handle = $arr_init['ajax_js_handle'];
            if ($arr_init['my_js_active'] === true) {
                $str_handle = $arr_init['my_js_handle'];

                if ($arr_init['my_js_localize_active'] === true) {

                    wp_localize_script(
                        $str_handle,
                        $arr_init['my_js_localize_name'],
                        $this->my_js_localize_todo()
                    );
                }
            }

            // wp_localize_script() must always be after its mother script (and never prior)
            wp_localize_script(
                $str_handle,
                'ezAjaxSetup1',                       // DO NOT CHANGE. the .js expects this name.
                $this->setup_localize()
            );
        }


        /**
         * The usual suspects
         */
        protected function setup()
        {
            $this->_version = '0.5.0';
            $this->_url = plugin_dir_url(__FILE__);
            $this->_path = plugin_dir_path(__FILE__);
            $this->_path_parent = dirname($this->_path);
            $this->_basename = plugin_basename(__FILE__);
            $this->_file = __FILE__;
        }

    }
}