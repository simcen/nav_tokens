require.config({
    paths: {
        "app": "../app"
    }
});
require([
    "splunkjs/mvc",
    "splunkjs/mvc/utils",
    "splunkjs/mvc/tokenutils",
    "underscore",
    'splunk.util',    
    "jquery"  
], function(
        mvc,
        utils,
        TokenUtils,
        _,
        splunkUtil,        
        $       
    ) {

    // Tokens
    var submittedTokens = mvc.Components.getInstance('submitted', {create: true});
    var defaultTokens   = mvc.Components.getInstance('default', {create: true});

    var urlTokens = { }
    var navUrls   = [ 'token_test1', 'token_test2' ]


    defaultTokens.on("change:component", function(formQuery, component) {
        urlTokens.component = encodeURIComponent(component);

        _.each(navUrls, function(navUrl){
            console.log("here");
            //el = $("li.nav-item-"+navUrl+">a");
            el = $("a[href*=\""+navUrl+"\"]").not("a[target='_blank']").not(".external").not(".btn");
            if (el != undefined) {              
                console.debug("el", el) ;
                urlQuery = _.map(urlTokens, function(val, key) { 
                    return 'form.' + key + '=' + val;
                });
                url = splunkUtil.make_url('app/' + utils.getCurrentApp() + '/' + navUrl) + '?' + urlQuery.join('&');
                el.attr('href', url );
            }
        });

    });

    defaultTokens.on("change:filter", function(formQuery, filter) {
        urlTokens.filter = encodeURIComponent(filter);

        _.each(navUrls, function(navUrl){
            el = $("a[href*=\""+navUrl+"\"]").not("a[target='_blank']").not(".external").not(".btn");
            if (el != undefined) {               
                urlQuery = _.map(urlTokens, function(val, key) { 
                    return 'form.' + key + '=' + val;
                });
                url = splunkUtil.make_url('app/' + utils.getCurrentApp() + '/' + navUrl) + '?' + urlQuery.join('&');
                el.attr('href', url );
            }
        });

    });

});    