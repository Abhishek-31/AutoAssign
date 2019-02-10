
// var assignments = jQuery('#assignments').text();

var parentDiv = document.getElementById('masterDiv');

jQuery.get('/faculty/fetchassignments', (assignments) => {
    console.log(assignments);
    assignments.forEach(assignment => {
        var string = `<div class="cards"><a href="">${assignment.title}</a><br><br><br>${assignment.branch}:<div style="inline" id="First assign"></div>`
        jQuery('#masterDiv').append(string);
    });
})


