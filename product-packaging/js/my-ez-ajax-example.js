/**
 *
 */

var ezAS1 = ezAjaxSetup1;

(function($) {
    $(document).ready(function () {

        // validates the email
        ezRegexEmailValidation = function (email) {
            // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        // displays the msg
        ezEmailSignupMsg = function (thisThis, thisMsg) {

            var theParent = $(thisThis).parent('.email');   // for the sake of brevity, these selectors were hardcoded, at least for now
            var theMsgWrap = theParent.find('.email-msg-wrap');
            var theMsg = theParent.find('.email-msg');
            theMsgWrap.show();
            theMsg.html(thisMsg);
        }

        // closed / hides the msg
        $('.email-msg-wrap').on('click', function (e) {
            $(this).hide()
        });

        // an email is submitted
        ezEmailSubmit = function (thisThis, thisData, objName) {
            console.log('ezEmailValidation ');

            var thisEmail = $(thisThis).find("input[name=email]").val();
            var emailTest = ezRegexEmailValidation(thisEmail);
            if (emailTest) {
                // email is good. request!
                var theMsg = objName.args.doingRequest;
                ezEmailSignupMsg(thisThis, theMsg)
                return true;
            } else {
                // client side
                var theMsg = objName.args.invalidEmail;
                ezEmailSignupMsg(thisThis, theMsg)
                return false;
            }
        }

        ezCbMcSignup = function(){
            console.log( ezCbMcSignup);
            return true;
        }

        ezDoneTrueMcSignup = function (thisThis, thisData, objName, thisResp) {
            var theMsg = objName.args.addSuccess;
            ezEmailSignupMsg(thisThis, theMsg)
        }

        ezDoneFalseMcSignup = function (thisThis, thisData, objName, thisResp) {
            // server side
            // TODO - check for other errors.
            var theMsg = objName.args.invalidEmail;
            ezEmailSignupMsg(thisThis, theMsg)
        }

        // =============================
        // We're not using these (below) for this example.
        //
        // They left here strictly to make it easier for you to play around once you decide to do so.
        //
        // Until the documentation is more complete, you'll have to review js/ez-ajax-setup-1.js on your own to
        // see where / when each of these "fires."
        // =============================
        //
        ezAjaxBefore = function(thisThis, thisData, objName){
            console.log('TODO - ezAjaxBefore');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return true;
        }

        ezAjaxBeforeFalse = function(thisThis, thisData, objName){
            console.log('TODO - ezAjaxBeforeFalse');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return true;
        }

        ezAjaxAlways = function(thisThis, thisData, objName){
            console.log('TODO - ezAjaxAlways');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return true;
        }

        ezAjaxDoneTrue = function(thisThis, thisData, objName, thisResp){
            console.log('TODO - ezAjaxDoneTrue');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'TODO';
        }

        ezAjaxDoneFalse = function(thisThis, thisData, objName, thisResp){
            console.log('TODO - ezAjaxDoneFalse');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'TODO';
        }

        ezAjaxFail = function(thisThis, thisData, objName){
            console.log('TODO - failAjax ');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'TODO';
        }

        ezAjaxSearchEmpty = function(thisThis, thisData, objName){
            console.log('TODO - ezAjaxSearchEmpty');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'TODO';
        }


        ezCallbackDemo1 = function(aThis, thisData, objWPL, thisResp){
            console.log('TODO - ezCallbackDemo1 ');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'true';
        }

        ezCallbackDemo2 = function(aThis, thisData, objWPL, thisResp){
            console.log('TODO - ezCallbackDemo2 ');
            console.log( $(thisThis).data(ezAS1.wp_localize_name) );
            return 'true';
        }
    });
})(jQuery);
