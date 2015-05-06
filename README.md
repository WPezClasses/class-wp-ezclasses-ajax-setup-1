# Org: WPezClasses
### Product: Class_WP_ezClasses_Ajax_Setup_1

##### WordPress and Ajax, The ezWay. Lean on this when your WP + Ajax is not strong, or you simply want to think less and do more.

Think of this as all the boilerplate WP Ajax "stuff" that doesn't really change (sans settings / values).

As is The ezWay, you simply customize via the _todo method(s) and boom! you're an Ajax'in' #BadAss.


=======================================================================================

#### WPezClasses: Getting Started
- https://github.com/WPezClasses/wp-ezclasses-docs-getting-started

=======================================================================================

#### See Also

- https://github.com/WPezClasses/class-wp-ezclasses-ajax-request-1


#### Overview

Both Ajax Setup 1 and Ajax Request 1 make heavy use of wp_localize_script(http://codex.wordpress.org/Function_Reference/wp_localize_script)
and make it simple and ez to do so. If you're not familiar with  wp_localize_script() please give that page a read. Thanks.


###### For starters, have a look at js/ez-ez-ajax-setup-1.js.


At the end of the day, an Ajax request, is an Ajax request, is an Ajax request. The general nature of the request doesn't change. It's
static. It's core (if you will) is boilerplate. What does change within that context is the particular details associated with a
given request. That is, the unique functions and values within a given request are what changes. The core of the Ajax request
code (i.e., ez-ez-ajax-setup-1.js) does not.

For example, prior to making an actual Ajax request there is always / often some need for a "before" hook (read: js function). Perhaps
a form's values need to be validated? The browser (read: ez-ajax-setup-1.js) simply needs to know the name of the function - for a
particular request - that needs to be used at that moment for that purpose.

Note: Such request specific "stuff" is defined via the Ajax Request 1 class. You won't see the details for those things in this
particular repo. This is all about the setup. The various Ajax Request 1(s) lean on the foundation of Ajax Setup 1. Got it? Good!


###### In short, the need to repeat slightly modified "core" Ajax-centric .js over and over is no more.


Ajax Setup 1 comes with support for four standard Ajax request scenarios. Each of these has a CSS selector associated with it; that btw
you can change (to fit your needs). That is, those selectors are not hardcoded.

- Link / click ('selector_link' => '.ez-ajax-link')

- Form: Submit ('selector_form_submit' => '.ez-ajax-form-submit')

- Form: Select or Radio on change ('selector_form_on_change' => '.ez-ajax-form-on-change')

- Form: Search (input) ('selector_form_search' => '.ez-ajax-form-search')

Please note: This list is not intended to be 100% complete. It's simply an ez way(s) to accomplish any of these (without having to dev
your own custom code, etc.)


###### Are you ready? This is where the magic happens...


In addition, we add a HTML5 data attribute ('data_wp_localize_name' => 'ezwplocalizename') to each selector-define request. The value of
that data attribute (i.e., the right side of data-ezwplocalizename= )is the wp_localize_script name to use for that request. That is,
it is a key (of sorts) that allows us to separate core code / logic from request-centric args / values.

Boom! You're an Ajax #BadAss.


###### Let's review.


- The selector(s) tells ez-ez-ajax-setup-1.js what to watch

- Once there's an event ez-ajax-setup-1.js looks for data-ezwplocalizename= to get the WP Localize Script name.

- That details defined within that particular data object are what ez-ajax-setup-1.js uses to complete the request.

- Finally, you can also, server-side (in the method that process the request), define a callback (name) to be returned with the response.

- The specific / custom js is maintained in js/my-ez-ajax.js. Mind you, you can put that js where ever you want, just make sure you're
loading it at the right time - after the localize objects but prior to ez-ajax-setup-1.js - which is what Ajax Setup 1 helps you with.


All this might feel a bit difficult to grasp at first - it's certainly not typical WP (in a good way) - but eventually you'll have
a library (and state of mind) of reusable Ajax code, that leans on the steady but flexible core of Ajax Setup 1.

Hardcoded specifics and "how do I do that again" be gone.


#### Examples (Work in progress)


###### Link / click

```<a href="#" class="ez-ajax-link" data-ezwplocalizename="some-localize-name">Click Here to Ajax</a>```

That's it. Well, aside from using Ajax Request 1 to define the particulars (e.g., action, methods, etc.) of this request.

Note: Simple link / click requests can also use a second HTML5 data attribute ('data_link_query_string' => 'ezquerystring') to pass a
"query string" as well. This allows links created dynamically (via WP) to also have link / request specific args attached.

If it helps, think of it this way: In a universe of all link based Ajax requests (defined via a CSS class), this is the unique
CSS id. It just so happens to be a query string. So even general link based request can have specifics.

For forms, you would use hidden inputs for additional args.



- Form: Submit - Example coming soon.

- Form: Select or Radio on change - Example coming soon.

- Form: Search (input) - Example coming soon.