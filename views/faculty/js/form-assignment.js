//material contact form animation
form();
$('.contact-form').find('.form-control').each(function () {
    var targetItem = $(this).parent();
    if ($(this).val()) {
        $(targetItem).find('label').css({
            'top': '10px',
            'fontSize': '14px'
        });
    }
})
$('.contact-form').find('.form-control').focus(function () {
    $(this).parent('.input-block').addClass('focus');
    $(this).parent().find('label').animate({
        'top': '10px',
        'fontSize': '14px'
    }, 300);
})
$('.contact-form').find('.form-control').blur(function () {
    if ($(this).val().length == 0) {
        $(this).parent('.input-block').removeClass('focus');
        $(this).parent().find('label').animate({
            'top': '25px',
            'fontSize': '18px'
        }, 300);
    }
})

function form() {
    console.log($('#title').val())
    $('#submit').on('click', (e) => {
        var assignment = {
            title: $('#title').val(),
            desc: $('#prob-desc').val(),
            si: $('#sample-input').val(),
            so: $('#sample-output').val(),
            date: $('#date').val()
        }
        e.preventDefault();
        console.log(assignment);
        $.post('/faculty/newassign', assignment, (response) => {
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