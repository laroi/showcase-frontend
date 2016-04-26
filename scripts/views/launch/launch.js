define([
    '../../models/user',
    '../../collections/itemCollection',
    'text!./launch.html',
    '../../config/config',
    '../../controllers/requestController',
    '../../controllers/authController',
    '../../controllers/stateController',
    '../components/register/register',
    '../components/addToCart/addToCart',
    '../components/cart/cart'
    
], function (user, items, view, config, request, auth, state, register, addToCartView,  cartView) {
    var source   = $(view).html(),
        facebook_cred,
        template = Handlebars.compile(source),
        isExistUser,
        setUser,
        loginHandler,
        activateLogout,
        acticateLogin,
        handleLogout,
        activateControls,
        enableControls,
        disableControls,
        byepassLogin = true,
        showBuy,
        addToFavorites,
        addToCart,
        userObj,
        populateCart,
        stateObj = new state.State(),
    setUser = function (user_data) {
        if (!user_data) {
            user_data = stateObj.get('user');
        }
        if (user_data && user_data._id) {
            userObj = user.User(user_data._id);
            userObj._rev = user_data._rev;
            userObj.address = user_data.address;
            userObj.dob = user_data.dob;
            userObj.email = user_data.email;
            userObj.first_name = user_data.first_name;
            userObj.last_name = user_data.last_name;
            userObj.gender = user_data.gender;
            userObj.location = user_data.location;
            userObj.phone = user_data.phone;
            userObj.prof_pic = user_data.prof_pic;
            userObj.cart = user_data.cart;
            userObj.favorites = user_data.favorites;
            stateObj.set('user', userObj);
        }
    };
    activateLogout = function () {
        $('.log-in').hide();
        $('.log-out').show();
        $('.user-name').css('visibility', 'visible');
        $('#name').html(stateObj.get('user').first_name);
        $('.log-out').on('click', handleLogout);    
    };
    activateControls = function () {
        if (stateObj.get('cred')) {
            enableControls();
        } else {
            disableControls();
        }
    };
    activateLogin = function () {
        $('.log-out').hide()
        $('.log-in').show()
        $('.user-name').css('visibility', 'hidden');
        $('#name').html('');
        $('.log-in').on('click', loginHandler);
        $('.cart').on('click', showCart);
    }
    enableControls = function () {
        $('.buy').on('click', showBuy);
        $('.favorites').on('click', addToFavorites);
        $('.add-to-cart').on('click', addToCart);
        $('.buy').css('cursor', 'pointer');
        $('.favorites').css('cursor', 'pointer');
        $('.add-to-cart').css('cursor', 'pointer');
        
    }
    disableControls = function () {
        $('.buy').off('click');
        $('.favorites').off('click');
        $('.add-to-cart').off('click');
        $('.buy').css('cursor', 'not-allowed');
        $('.favorites').css('cursor', 'not-allowed');
        $('.add-to-cart').css('cursor', 'not-allowed');
    };
    showBuy = function () {
        console.log("Add Buy function logic here");
    };
    populateCart = function () {
        var cart = stateObj.get('user') ? (stateObj.get('user').cart || []) : [];
        $('.cart-count').html(cart.length || 0)
    };
    populateFavorites = function () {
        var favorites = stateObj.get('user') ? (stateObj.get('user').favorites || []) : [];
        favorites.forEach(function(fav) {
            $('#'+fav).find('.detail-second-row').find('.favorites').addClass('favorited')
        })
    }
    addToFavorites = function (e) {
        if ($(e.target).hasClass('favorited')) {
            makeUnFavorite(e);
        } else {
            makeFavorite(e);
        }
    };
    addToCart = function (e) {
        addToCartView.render($(e.target).parents('.ind-item-container').attr('id'))
/*      var cart = (stateObj.get('user') && stateObj.get('user').cart)? stateObj.get('user').cart : [];
        cart.push($(e.target).parents('.ind-item-container').attr('id'))
        stateObj.set('user.cart', cart);
        userObj.addToCart(cart);
        populateCart();
        */
    };
    makeFavorite = function (e) {
        var favorites = (stateObj.get('user') && stateObj.get('user').favorites)? stateObj.get('user').favorites : [];
        favorites.push($(e.target).parents('.ind-item-container').attr('id'));
        stateObj.set('user.favorites', favorites);
        userObj.addToFavorite(favorites);
        $(e.target).addClass('favorited'); 
    }
    makeUnFavorite = function (e) {
        var favorites = (stateObj.get('user') && stateObj.get('user').favorites)? stateObj.get('user').favorites : [],
            index = favorites.indexOf($(e.target).parents('.ind-item-container').attr('id'));
        if (index > -1) {
            favorites.splice(index,1);
        }
         stateObj.set('user.favorites', favorites);
         userObj.addToFavorite(favorites);
         $(e.target).removeClass('favorited');
    }
    showCart = function () {
        if ($('#cart').css('display') === 'none') {
            $('#cart').show();
        } else {
            $('#cart').hide();
        }
    }
    Handlebars.registerHelper('image', function(id, image) {
        return config.couchdb.url() + id + '/' + image;
    });
    handleLogout = function () {
        stateObj.destroy();
        $('.log').removeClass('log-out');
        $('.log').addClass('log-in');
        window.location.reload();
        
    }
    isExistUser = function (fb_id, callback) {
        request.get(config.api.url()+'user/' + fb_id, function(err, data) {
            if (!err) {
                if (data) {
                    user.User(data._id);
                    callback(undefined, data);
                } else {
                    callback(true, undefined)
                }
            } else {
                if (err.headers.status === 404) {
                    callback(true, undefined)
                }
            }
        });
    };
    loginHandler = function(){
        if (!byepassLogin) {
            FB.login(function (response) {
                facebook_cred = response.authResponse;
                isExistUser(facebook_cred.userID, function(err, data) {
                    if (err) {
                        if (response.status === 'connected') {
                            FB.api(facebook_cred.userID+'?fields=email,birthday, first_name, last_name, picture', function(response) {
                                console.log(response);
                                $('#name').html('<b>'+response.first_name+'</b>')
                                register.render(response);
                            })
                        }
                    } else {
                        //auth.setCredentials(facebook_cred);
                        stateObj.set('cred', facebook_cred);
                        setUser(data);
                        activateControls();
                        populateCart();
                        populateFavorites();
                        activateLogout();
                    }
                });
            },{
            scope: 'email, user_birthday, public_profile',  
            return_scopes: true
        });
        } else {
            var data = '"{"cred":{"accessToken":"CAAPPA5ijOeEBAHnIigLGPj8MbcxyjR8L4mRWEZBhb4RLiGLXirI6ZA4TK414Sy0dPOKG7lHfBeTk1X3RU4FFCqDuvU3BN5p6ILVZAR2GvXP55R3t8HZBOcrPt2IXpz5MeNvYCNLXoSP8cjiXCuJ3SVixlKTZAMeVF0ZCSUQqopEhCE3jGBHojGm7j8ZAZBjByUxoAtnoP0OZAVgZDZD","userID":"10208560148504231","expiresIn":5939,"signedRequest":"nd603YPH8ffraUAbZ62cGCvp3mwFuRXEfyH7plc-Ai0.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUJXc1dvakRqdVp6NnFVWUExY2R3dGNyd2lGYUlvcXdLQzVhbFZCRlM2MEJibHhWZ1hFQjBodUxNN0VaMUJBOGhqaWtQOGk4Z0oyWUQycHlndU5GWWZhdDN3cmRGWmNHZUg5M2NsUmd0R2ZnTHc2UzhpYnFwZFJXMEFfOVhjYTZHZGh6dnktN3lSYUZhdk95V3REWks4clRJdGVrYjg2NXRZcFBnY3ZHeFROODBRQlc3SjIwLUI2X0ZEMHZnLVVqcVBuVnNaaTZnT1hMSEVrNlRQYVRZZlVBbk1GTG5CdURhU29WZGd3VkswT0IwcjE3NGN1bmZQeWl6N2pSeTBGaUxVQmRXU19nVVJCeVktVVJIdEhhdnEyeVhvd1NJRlkwd0dBSExkNDhmZnNNenUyUlFRYjU0LWhaUGZpWHJLVVY0Q25ZSndFQlNFX2RyUENTa1NMaThLZCIsImlzc3VlZF9hdCI6MTQ1OTc4Njg2MSwidXNlcl9pZCI6IjEwMjA4NTYwMTQ4NTA0MjMxIn0","grantedScopes":"user_birthday,email,contact_email,public_profile"},"user":{"_id":"10208560148504231","_rev":"1-9d661d09556c885bf03843a31200d8db","address":"asassa","dob":"16-02-1989","email":"akbarali1klr@gmail.com","first_name":"Akbar","last_name":"Ali","location":"Perinthalmanna","phone":"8792535492","prof_pic":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xlt1/v/t1.0-1/c0.0.50.50/p…59f478899c&oe=57630B95&__gda__=1466471929_cbc3eb9315733c66542eca56f96b036b"}}"';
		isExistUser('10208560148504231', function(err, data) {
                    if (!err) {
			 stateObj.set('cred', data);
                        setUser(data);
                        activateControls();
                        activateLogout();
                        populateCart();
                        populateFavorites()
                        }
                    }); 
                               }
    };
    var instance;
    var launchPage = function () {
        var init,
            render;
            
        
        
        render = function(callback) {
            items.getAllItems(undefined, function (err, items) {
                if (!err) {
                    console.log(items);
                    var html = template({items: items});
                    $('#right-container').html(html);
                    callback();
                } else {
                    $('#right-container').html("<b>There was some problem in loading data</b>");
                    callback();
                }
            });
        }
       
        init = function() {
            render(function () {
                activateControls();
                setUser();
                cartView.render();
                activateLogin();
                populateCart();
                populateFavorites();
            });
        }();
    };


    //console.log(items.getAllItems())

    return {
        LaunchPage:function () {
             if (!instance) {
                instance = launchPage();
            }
            return instance;
        }
    }
});
