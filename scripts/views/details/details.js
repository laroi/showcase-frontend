define([
    '../../models/user',
    '../../collections/itemCollection',
    'text!./details.html',
    '../../config/config',
    '../../controllers/requestController',
    '../../controllers/authController',
    '../../controllers/stateController',
    '../components/cart/cart'
    
], function (user, items, view, config, request, auth, state, register, cartView) {
    var source   = $(view).html(),
        template = Handlebars.compile(source),
        setUser,
        userObj,
        stateObj = new state.State(),
        instance;
    var detailsPage = function () {
        var init,
            render;
        render = function(item_id) {
            items.getItemById(item_id, function (err, itemObj) {
                if (!err) {
                    var html = template({item: itemObj});
                    $('#main-container').html(html);
                    callback();
                } else {
                    $('#right-container').html("<b>There was some problem in loading data</b>");
                    callback();
                }
            });
        } 
    };
    //console.log(items.getAllItems())
    return {
        DetailsPage: function () {
             if (!instance) {
                instance = detailsPage();
            }
            return instance;
        }
    }
});
