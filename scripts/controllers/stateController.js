define([], function () {
    var stateInstance;
    var state = function() {
        
        return  {
            destroy: function () {
                localStorage.removeItem('ginza');
                return;
            },
            remove: function (key) {
                var local_storage_value = JSON.parse(localStorage.getItem('ginza'));
                delete local_storage_value[key];
                localStorage.setItem('ginza', JSON.parse(local_storage_value));
                return
            },
            set : function (key, value) {
                var local_storage_value, keys;
                if (localStorage.getItem('ginza')) {
                    local_storage_value = JSON.parse(localStorage.getItem('ginza'));
                } else {
                    local_storage_value = {};
                }
                keys = key.split('.');
                if (keys.length < 2) {
                    local_storage_value[keys[0]] = value;
                } else {
                    local_storage_value[keys[0]][keys[1]] = value;
                }
                localStorage.setItem('ginza', JSON.stringify(local_storage_value));
                return
            },
            get: function (key) {
                if (localStorage.getItem('ginza')) {
                    var local_storage_value = JSON.parse(localStorage.getItem('ginza'));
                    return local_storage_value[key];
                }
                return undefined;
            }
        };
        
    };
    return {
        State: function () {
            if (!stateInstance) {
                stateInstance = new state();
            }
            return stateInstance;
        }
    }
});
