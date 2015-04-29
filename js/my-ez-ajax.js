// copy this into your own local / custom my-ez-ajax just to make sure everything is working, etc. then refactor as you see fit.

var ezAS1 = ezAjaxSetup1;

beforeAjax = function(thisThis, thisData, objName){
    console.log('TODO - beforeAjax ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return true;
}

alwaysAjax = function(thisThis, thisData, objName){
    console.log('TODO - alwaysAjax ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return true;
}

doneAjaxTrue = function(thisThis, thisData, objName, thisResp){
    console.log('TODO - doneAjaxTrue ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return 'TODO';
}

doneAjaxFalse = function(thisThis, thisData, objName, thisResp){
    console.log('TODO - doneAjaxFalse ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return 'TODO';
}

failAjax = function(thisThis, thisData, objName){
    console.log('TODO - failAjax ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return 'TODO';
}

searchEmptyAjax = function(thisThis, thisData, objName){
    console.log('TODO - searchEmptyAjax ' + $(thisThis).data(ezAS1.data_wp_localize_name));
    return 'TODO';
}


demo_callback = function(aThis, thisData, objWPL, thisResp){
    console.log('demo_callback > cb_data - ' + thisResp.cb_data);
    return 'true';
}