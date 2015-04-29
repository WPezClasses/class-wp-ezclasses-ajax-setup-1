(function($) {
	$(document).ready(function() {
        
        var ezAS1 = ezAjaxSetup1;

        // get wp_localize_script() name for this event / request
        wpLocalName = function(aThis){
            var wpLocalizeName = $(aThis).data(ezAS1.data_wp_localize_name);
            if (typeof wpLocalizeName != 'undefined') {
                return window[wpLocalizeName];
            }
            console.log(ezAS1.data_wp_localize_name_error);
            return false;
        };

        // simple link click
        $(ezAS1.selector_link).on('click', function(e) {
            e.preventDefault();
            var wpLocal = wpLocalName(this);
            if (wpLocal) {
                // data-ezquerystring lets us pass the "query string"
                var thisData = $(this).data(ezAS1.data_link_query_string);
                ezDoAjax(this, thisData, wpLocal);
            }
        });

        //form - submit
        $(ezAS1.selector_form_submit).submit( function(e) {
            e.preventDefault();
            var wpLocal = wpLocalName(this);
            if (wpLocal) {
                var dataForm = $(this).serialize();
                ezDoAjax(this, dataForm, wpLocal);
            }
        });

        // form - on change (select or radio)
        $(ezAS1.selector_form_on_change + ' select' + ',' +  ezAS1.selector_form_on_change + ' :radio').change( function(e) {
            e.preventDefault();
            thisForm = $(this).parent(ezAS1.selector_form_on_change);
            var wpLocal = wpLocalName(thisForm);
            if (wpLocal) {
                var dataForm = thisForm.serialize();
                ezDoAjax(thisForm, dataForm, wpLocal);
            }
        });

        // form - search
        var ezTimeOut;
        $(ezAS1.selector_form_search + ' input').keyup( function(e) {
            e.preventDefault();
            thisForm = $(this).parent(ezAS1.selector_form_seach);
            var wpLocal = wpLocalName(thisForm);
            if (wpLocal) {
                clearTimeout(ezTimeOut);
                if ( $(this).val() == '' ){

                    console.log('empty');
                    // typically to hide the spinner
                    ezSearchEmptyAjax = wpLocal.ajax_search_empty;
                    if ( window[ezSearchEmptyAjax] != undefined ){
                        // the input might be empty but perhaps there are hidden(s)?
                        dataForm = thisForm.serialize();
                        window[ezSearchEmptyAjax](thisForm, dataForm, wpLocal);
                    }
                    clearTimeout(ezTimeOut);
                } else {
                    ezTimeOut = setTimeout( function() {
                        var dataForm = thisForm.serialize();
                        // use the ajax_before to expose the spinner
                        ezDoAjax(thisForm, dataForm, wpLocal);
                    }, wpLocal.search_keyup_timeout_duration);
                }
            }
        });

        //now that the page "event" has taken place and been preprocessed, do the ajax
        ezDoAjax = function(aThis, thisData, objWPL) {
            ezBeforeAjax = objWPL.ajax_before;
            var boolBeforeAjax = objWPL.ajax_before_bool_default;
            if ( window[ezBeforeAjax] != undefined ){
                boolBeforeAjax = window[ezBeforeAjax](aThis, thisData, objWPL);
            }
            if (boolBeforeAjax){
                var data = {
                    action: objWPL.action,
                    nonce:  objWPL.nonce,
                    data: thisData,
                };

                $.ajax({
                    url: objWPL.ajax_url,
                    data: data,
                    type: objWPL.ajax_type,
                    dataType: objWPL.ajax_data_type,

                }).always(function(){

                    ezAlwaysAjax = objWPL.ajax_always;
                    if ( ezAlwaysAjax != false && window[ezAlwaysAjax] != undefined ){
                        window[ezAlwaysAjax](aThis, thisData, objWPL);
                    }

                }).done( function(thisResp){
                    flagCB = objWPL.ajax_done_bool_default;
                    if ( thisResp.status ) {
                        thisCB = thisResp.cb;
                        if ( thisCB != false && window[thisCB] != undefined ){
                            flagCB = window[thisCB](aThis, thisData, objWPL, thisResp);
                        }
                    }
                    // to avoid either of these have the thisCB return a string. that is something other than bool (true / false)
                    ezDoneAjaxTrue = objWPL.ajax_done_true;
                    if ( flagCB == true && ezDoneAjaxTrue != false && window[ezDoneAjaxTrue] != undefined ){
                        window[ezDoneAjaxTrue](aThis, thisData, objWPL, thisResp);
                    }
                    ezDoneAjaxFalse = objWPL.ajax_done_false;
                    if ( flagCB == false && ezDoneAjaxFalse != false && window[ezDoneAjaxFalse] != undefined ){
                        window[ezDoneAjaxFalse](aThis, thisData, objWPL, thisResp);
                    }

                }).fail( function(){
                    ezFailAjax = objWPL.ajax_done;
                    if ( ezFailAjax != false && window[ezFailAjax] != undefined ){
                        window[ezFailAjax](aThis, thisData, objWPL);
                     }
                });
            } else{
                alert('do ajax = false TODO remove');
            }
        }; // close ajax
	});
})(jQuery);