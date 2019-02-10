//material contact form animation
form();
jQuery('.contact-form').find('.form-control').each(function () {
    var targetItem = jQuery(this).parent();
    if (jQuery(this).val()) {
        jQuery(targetItem).find('label').css({
            'top': '10px',
            'fontSize': '14px'
        });
    }
});

jQuery('.contact-form').find('.form-control').focus(function () {
    jQuery(this).parent('.input-block').addClass('focus');
    jQuery(this).parent().find('label').animate({
        'top': '10px',
        'fontSize': '14px'
    }, 300);
});

jQuery('.contact-form').find('.form-control').blur(function () {
    if (jQuery(this).val().length == 0) {
        jQuery(this).parent('.input-block').removeClass('focus');
        jQuery(this).parent().find('label').animate({
            'top': '25px',
            'fontSize': '18px'
        }, 300);
    }
})

function form() {
    console.log(jQuery('#title').val())
    jQuery('#submit').on('click', (e) => {
        var assignment = {
            title: $('#title').val(),
            desc: $('#prob-desc').val(),
            si: $('#sample-input').val(),
            so: $('#sample-output').val(),
            date: $('#date').val(),
            branch: $('select.branch').val()
        }
        e.preventDefault();
        console.log(assignment);
        jQuery.post('/faculty/newassign', assignment, (response) => {
            alert(response);
            if(response === 'Saved') {
                window.location.href = '/faculty/dashboard';
            }
        })
    });
}

jQuery('#submit').on('click', () => {
    var assignment = {
        title: jQuery('#title').val(),
        description: jQuery('#prob-desc').val(),
        sampleInput: jQuery('#sample-input').val(),
        sampleOutput: jQuery('#sample-output').val()
    }
    jQuery.post('/newassign', assignment, (response) => {
        console.log(response);
    });
});