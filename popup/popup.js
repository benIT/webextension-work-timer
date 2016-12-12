chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    document.getElementById('time').innerHTML = timeFormater(request.time);
});


document.getElementById('settings').addEventListener('click', function () {
//todo
});


document.getElementById('pause').addEventListener('click', function () {
	 chrome.runtime.sendMessage({pause : true}, function(response) {
     });
});

document.getElementById('resume').addEventListener('click', function () {
     chrome.runtime.sendMessage({resume : true}, function(response) {
     });
});

function timeFormater (timeInSeconds) {
    var date = new Date(null);
    date.setSeconds(timeInSeconds);
    return date.toISOString().substr(11, 8);
}