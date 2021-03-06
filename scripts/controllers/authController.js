define([], function () {
    var Auth = function () {
        var authObj = {
        accessToken: "",
        expiresIn: 0,
        grantedScopes: "",
        signedRequest: "",
        userID:""
        }
        var init = function(){
        }();
        var setCredentials =  function (options){
            if (options.accessToken) {
                authObj.accessToken = options.accessToken;
            }
            if (options.expiresIn) {
                authObj.expiresIn = options.expiresIn;
            }
            if (options.grantedScopes) {
                authObj.grantedScopes = options.grantedScopes;
            }
            if (options.signedRequest) {
                authObj.signedRequest = options.signedRequest;
            }
            if (options.userID) {
                authObj.userID = options.userID;
            }
            return;
        };
        var getCredentials = function (cred) {
            if (authObj[cred]) {
                return authObj[cred];
            }
        };
        return {
            setCredentials: setCredentials,
            getCredentials: getCredentials
        }
    }
    return new Auth();
})
