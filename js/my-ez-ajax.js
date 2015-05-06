// copy this into your own local / custom my-ez-ajax just to make sure everything is working, etc. then refactor as you see fit.

var ezAS1 = ezAjaxSetup1;

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