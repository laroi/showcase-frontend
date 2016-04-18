define(['text!./registerModel.html', '../../../controllers/requestController', '../../../config/config'], function (view, request, config) {

    var source   = $(view).html(),
        template = Handlebars.compile(source),
        register,
        user_details;
    var render = function (user) {
        var locations = ['Kolathur', 'Perinthalmanna'];
        user_details = user;
        var html = template({user: user, locations: locations});
        $('body').append(html);
        $('#reg-modal').modal('show');
        $('.dropdown-menu li').on('click', function(){    
            $('.loc-name').html($(this).html());    
        })
        $('#datetimepicker1').datepicker().on('changeDate', function (ev) {
            $('.datepicker').hide();
        });
        $("#datetimepicker1").datepicker("update", new Date(user.birthday));
        $('#register-user').on('click', register)
       
    };
    register = function () {
        var validate;
        validate = function () {
            var isValid = true,
                highlight = function (element) {
                    $(element).css('border', '1px solid red');
                },
                deHighlight = function (element) {
                    $(element).css('border', '1px solid rgb(204, 204, 204)');
                };
            if ($('#phone_number').val().length === 0)  {
                isValid = false;
                highlight('#phone_number');
            } else {
                deHighlight('#phone_number');
            }
            if ($('#email').val().length === 0)  {
                isValid = false;
                highlight('#email');
            } else {
                deHighlight('#email');
            }
            if ($('.loc-name').html() === 'Location')  {
                isValid = false;
                 highlight('#pref-loc-drop');
            } else {
                deHighlight('#pref-loc-drop');
            }
            return isValid
        };
        if (validate()) {
        var data = {
                first_name : user_details.first_name,
                last_name : user_details.last_name,
                location : $('.loc-name').html().trim(),
                address : $('#address').val().trim(),
                phone : $('#phone_number').val().trim(),
                email : $('#email').val().trim(),
                dob : $('#datetimepicker1').data('datepicker').getFormattedDate('dd-mm-yyyy'),
                prof_pic : user_details.picture.data.url
            }
            request.put(config.api.url()+'user/'+user_details.id, data, 'application/x-www-form-urlencoded', function (err, data) {
                if (!err) {
                    console.log(data);
                    
                } else {
                    console.log(err);
                }
            });
        }
    }
    return {
        render: render
        };
    //console.log(items.getAllItems())
});
