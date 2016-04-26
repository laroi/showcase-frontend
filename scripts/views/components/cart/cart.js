define(['text!./cart.html', '../../../controllers/stateController', '../../../collections/itemCollection'], function (view, State, items) {

    var source   = $(view).html(),
        template = Handlebars.compile(source),
        stateObj = new State.State(),
        render;
    var render = function () {
        var cart_array = [],
            cart;
        if (stateObj.get('user') && stateObj.get('user').cart) {
            cart = stateObj.get('user').cart;
        } else {
            cart = [];
        }
        cart.forEach(function(cart_item, index){
            items.getItemById(cart_item.item, function(cart_obj){
                cart_obj.count = cart_item.count;
                cart_obj.total = parseInt(cart_obj.price,10)*parseInt(cart_obj.count, 10)
                cart_array.push(cart_obj);
                if (index === cart.length -1) {
                     var html = template({cart: cart_array});
                     $('.show-cart').html(html);
                     $('.cart_item_delete').on('click', function () {
                        console.log('delete_click');
                    });
                }
            })
        })
    };
    return {
        render: render
    };
});
