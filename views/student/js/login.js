console.log('Print SOmething');

var submit = document.getElementById('submit');

submit.addEventListener('click', (e) => {
    console.log('Submit button clicked')
    e.preventDefault();
    var email = jQuery('#email').val(),
        password = jQuery('#password').val();

    console.log(email, password)
    jQuery.post('/student/login', { email, password }, (response) => {
        console.log('Token', response);
        console.log(typeof (response));
        localStorage.setItem('token', response);
        var obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + response
            }
        }
        //window.location.href = '/faculty/dashboard';
        // jQuery.get('/faculty/dashboard', obj);
        // fetch('http://localhost:3000/faculty/dashboard', obj)
        //     .then((data) => {
        //         console.log(data);
        //     });
        $.ajax({
            url: '/student/dashboard',
            type: 'get',
            contentType: "text/html",
            ...obj,
            success: function (data, status) {
                console.log("Success!!");
                console.log(data);
                console.log(status);

            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Desc: " + desc + "\nErr:" + err);
            }
        });
    });
})
