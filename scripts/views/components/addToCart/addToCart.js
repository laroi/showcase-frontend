define([ 'text!./addToCart.html',
         '../../../controllers/stateController', 
         '../../../collections/itemCollection',
         '../../../models/user'], 
         function (view, State, items, user) {

    var source   = $(view).html(),
        template = Handlebars.compile(source),
        stateObj = new State.State(),
        render,
        addToCart,
        updateTotal,
        userObj = user.User(),
        populateCart;
    populateCart = function () {
        var cart = stateObj.get('user').cart || [];
        $('.cart-count').html(cart.length || 0);
    } 
    updateTotal = function (){
        $('#item-count-val').on('change', function (e) {
            $('.model-item-total').html(parseInt($('.model-item-price').html(),10)*(parseInt($(e.target).val() || 1,10)));
        })
    }
    addToCart = function () { 
        var cart = (stateObj.get('user') && stateObj.get('user').cart)? stateObj.get('user').cart : [],
        found = false;
        cart.forEach(function(ind_cart){
            if (ind_cart.item === $('.model-container').attr('id')) {
                found = true;
                return;
            }
        });
        if (!found){
            cart.push({item: $('.model-container').attr('id'), count:$('#item-count-val').val()}); 
            stateObj.set('user.cart', cart);
            userObj.addToCart(cart);
            populateCart(); 
            $('#modal-add-to-cart').modal('hide');
        }
    }
    render = function (id) {
        items.getItemById(id, function(item_obj){
            var html = template({item: item_obj});
            $('#cart-cont').html(html);
            $('#modal-add-to-cart').modal('show');
            updateTotal();
            $('#btn-add-to-cart').on('click', addToCart);
        });
    };
    return {
        render: render
    };
});
