define(['controllers/requestController'], function (request) {
    //Do setup work here
    var userInstance;
    var user = function(user_id) {
        var cart = [],
            favorite = [];
            return  {
                _id: user_id,
                _rev : '',
                address: '',
                dob: '',
                email : '',
                first_name: '',
                last_name: '',
                gender: '',
                location: {location:"", lat:"", long:""},
                phone: '',
                prof_pic: '',
                addToCart: function (item) {
                },
                addToFavorite: function (item) {
                },
                getCart : function () {
                },
                getFavorite: function () {
                }
            };
        
    };
    return {
        User: function (user_id) {
            if (!userInstance) {
                userInstance = user(user_id)
            }
            return userInstance;
        }
    }
});
