var view = {
    name : "Joe",
    occupation : "Web Developer"
};
function loadtemp(){
    var output = Mustache.render("{{name}} is a  {{occupation}}", view);
    document.getElementById('person').innerHTML = output;
}