
var assignments = jQuery('#assignments').text();

var parentDiv = document.getElementById('masterDiv');

console.log(typeof(assignments));
assignments.forEach(assignment => {
    var string = `<div class="cards"><a href="">${assignment.title}</a><br><br><br>${assignment.branch}:<div style="inline" id="First assign"></div>`
    parentDiv.append(string);
});
