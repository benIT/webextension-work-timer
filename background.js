function App() 
{
  this.time;
  this.intervalId;
  this.appState;
}

const APP_DEFAULT_TIME = 3600;

const APP_STATE_RUNNING = 1;

const APP_STATE_PAUSE = 2;

App.prototype.createCountdown= function () {
  self=this;
  self.intervalId = setInterval(function () {
    self.time--;
    chrome.runtime.sendMessage({time : self.time});
  }, 1000);
  self.appState=APP_STATE_RUNNING
}

App.prototype.init = function (time) {
  self=this;
  self.time=time;
  self.appState=APP_STATE_RUNNING;
  self.createCountdown() ;
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.pause && self.appState==APP_STATE_RUNNING) {
        /*alert("pause backgroundjs");*/
        clearInterval(self.intervalId);
        chrome.runtime.sendMessage({time : self.time});
        self.appState=APP_STATE_PAUSE;
      }
      if(request.resume && self.appState==APP_STATE_PAUSE ) {
        /*alert("resume backgroundjs");*/
        self.createCountdown() ;
        chrome.runtime.sendMessage({time : self.time});
      }

      if(request.settings ) {
        self.time = request.time ; 
      }
    });
}
var app = new App();
var time = localStorage.getItem('time') || APP_DEFAULT_TIME
app.init(time);