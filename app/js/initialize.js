// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Do something
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");

    var info = document.getElementById('instructions');

    var showInfoTrigger = document.getElementById('show-info');
    showInfoTrigger.addEventListener('click', function(e) {
    	e.preventDefault();
    	info.classList.remove('hide');
    });

    var closeInfoTrigger = document.getElementById('close-info');
    closeInfoTrigger.addEventListener('click', function(e) {
    	e.preventDefault();
    	info.classList.add('hide');
    });
}