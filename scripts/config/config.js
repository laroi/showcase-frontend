define([], function () {
    var config = {
            couchdb:{
                protocol:'http',
                host: 'localhost',
                port: 80,
                proxy: 'data',
                url: function (){
                   return window.location.protocol + '//' + window.location.host + '/' + this.proxy +'/textiles/'
                }
            },
            api : {
                protocol:'http',
                host: 'localhost',
                port: 80,
                proxy: 'api/v1',
                url: function (){
                   return  window.location.protocol + '//' + window.location.host + '/' + this.proxy + '/';
                }
            }
        }
        
        return config;
    
});
