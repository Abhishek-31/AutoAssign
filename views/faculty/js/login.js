console.log('Print SOmething');

var submit = document.getElementById('submit');

submit.addEventListener('click', (e) => {
    console.log('Submit button clicked')
    e.preventDefault();
    var email = jQuery('#email').val(),
        password = jQuery('#password').val();

        console.log(email, password)
    jQuery.post('/faculty/login', { email, password }, (response) => {
        console.log('Token', response);
        localStorage.setItem('token', response);
            var obj = {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response
                }
            }
        // window.location.href = '/faculty/dashboard';
        fetch('/faculty/dashboard', obj, (response) => {
            console.log(response);
        });
    });
})
