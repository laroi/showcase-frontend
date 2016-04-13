requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        libs: '../libs',
        text: '../libs/text'
        
    }
});

// Start the main app logic.
requirejs(['./views/launch/launch', './views/mainHeader/mainHeader'],
function (launch, header) {
var launchPage;
$(document).ready(function() {
  $.ajaxSetup({ cache: true });
 // $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1072039282817505',
      cookie     : true,
      xfbml      : true,
      version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    });
    launchPage = function(){
        launch.LaunchPage();
    };
    crossroads.addRoute('/',launchPage);
    //itemCollection.getAllItems();
    
    crossroads.parse('/');
    $(window).on('hashchange', function (e) {
        crossroads.parse(location.hash);
    });
//});
    
  });
});


