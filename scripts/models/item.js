define(['controllers/requestController'], function (request) {
    //Do setup work here
    var item = function(item_id) {
        var save = function (item_id) {
            var doc = {
                _id: item_id,
                _rev : this._rev || '',
                _attachments: this._attachments || [],
                dates: this.dates || {},
                description : this.description || '',
                dress_type: this.dress_type,
                gender_type: this.gender_type || '',
                images: this.images || {'thumb':'', 'full':[]},
                material_type: this.material_type || '',
                price : this.price || 0,
                title : this.title || '',
                stock: this.stock || ''
            }
        };
            return  {
                _id: item_id,
                _rev : '',
                _attachments: [],
                dates: {},
                description : '',
                dress_type: '',
                gender_type: '',
                images: {'thumb':'', 'full':[]},
                material_type: '',
                price : 0,
                title : '',
                stock: 0,
                save: save
            };
        
    };
    return item
});
