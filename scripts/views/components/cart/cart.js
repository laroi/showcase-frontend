define(['text!./cart.html', '../../../controllers/stateController', '../../../collections/itemCollection'], function (view, State, items) {

    var source   = $(view).html(),
        template = Handlebars.compile(source),
        stateObj = new State.State(),
        render;
    var render = function () {
        var cartObj = [];
        stateObj.get('user').cart.forEach(function(ind_cart) {
            cartObj.push(items.getItemById(ind_cart))
        });
        var html = template({cart: cartObj});
        $('body').append(html);
        $('#cart').show();
    };
    return {
        render: render
    };
});
