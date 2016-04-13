define(['../models/item', '../controllers/requestController', '../couch-views/views'], function (itemModel, requestController, views) {
    var getAllItems = function (options, callback) {
        var items = [], 
            item = {},
            gender_type,
            dress_type,
            price;
            if (options) {
                gender_type = options.gender_type,
                dress_type = options.dress_type,
                price = options.price;
            }
        requestController.callView({view_name: views.getAllItems, reduce: true}, function (err, data) {
            data.rows.forEach(function (mat) {
                console.log(JSON.stringify(mat));
                item = new itemModel(mat.id);
                item.gender_type = mat.key[0];
                item.dress_type = mat.key[1];
                item.dates.addedOn = mat.key[2];
                item.title = mat.key[3];
                item.price = mat.key[4];
                item.images.thumb = mat.key[5];
                items.push(item);
                
            });
            callback(err, items);
        });
        
    };
    return {
        getAllItems: getAllItems
    }
})
