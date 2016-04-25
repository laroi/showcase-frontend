define(['text!./cart.html', '../../../controllers/stateController', '../../../collections/itemCollection'], function (view, State, items) {

    var source   = $(view).html(),
        template = Handlebars.compile(source),
        stateObj = new State.State(),
        render;
    var render = function () {
        var cartObj = [],
            cart;
	if (stateObj.get('user') && stateObj.get('user').cart) {
		cart = stateObj.get('user').cart;
	} else {
		cart = [];
	}
    items.getItemById(cart, function(cart_obj){
             var html = template({cart: cart_obj});
            $('#nav-container').append(html);
    })
        cart.forEach(function(ind_cart) {
//            cartObj.push(items.getItemById(ind_cart))

        });
            };
    return {
        render: render
    };
});
