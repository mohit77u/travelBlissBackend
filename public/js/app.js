$(function(){
    // signupForm
    if($('#signupForm').length){
        $("#signupForm").validate({
            rules: {
                name: {
                    required: true,
                },
                username: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                },
                password_confirmation: {
                    required: true,
                },
            }
        });
    }

    // loginForm
    if($('#loginForm').length){
        $("#loginForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                }
            }
        });
    }

    // forgotForm
    if($('#forgotForm').length){
        $("#forgotForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                }
            }
        });
    }

    // resetForm
    if($('#resetForm').length){
        $("#resetForm").validate({
            rules: {
                password: {
                    required: true,
                },
                password_confirmation: {
                    required: true,
                },
            }
        });
    }

    if($('[data-dropdown-toggle]').length){
        
        // handle click toggle dropdown menu
        $(document).on('click', '[data-dropdown-toggle]', function(event){
            event.stopPropagation();
            var parent = $(this).parent('.dropdown')
            var toggleValue = $(this).attr('data-dropdown-toggle')
            var dropdownMenu = $('.dropdown #' + toggleValue)
            parent.toggleClass('show')
            $('.dropdown-menu').not(dropdownMenu).slideUp();
            // var dropdownMenu = parent.find('.dropdown-menu')
            var visible = dropdownMenu.is(':visible')
            if(!visible){
                dropdownMenu.slideDown('slow');
            } else {
                dropdownMenu.slideUp();
            }

        })

        // handle click outside to close dropdown menu
        $('html').on('click', function(event){
            var dropdown = $('.dropdown')
            if(dropdown.hasClass('show')){
                dropdown.removeClass('show')
                dropdown.find('.dropdown-menu').slideUp('fastest')
            }
        })
           
    }
});