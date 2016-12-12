function App() 
{
  this.time = 3600;
  this.intervalId=null;
  this.appState=null;
}

App.prototype.APP_STATE_RUNNING = 1;

App.prototype.APP_STATE_PAUSE = 2;

App.prototype.createCountdown= function () {
  self=this;
  intervalId = setInterval(function () {
    self.time--;
    chrome.runtime.sendMessage({time : self.time});
  }, 1000);
  self.appState=App.APP_STATE_RUNNING
  return intervalId ; 
}

App.prototype.init = function () {
  self=this;
  self.appState=App.APP_STATE_RUNNING;
  self.intervalId=self.createCountdown() ;
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if(request.pause && self.appState==App.APP_STATE_RUNNING) {
        /*alert("pause backgroundjs");*/
        clearInterval(self.intervalId);
        chrome.runtime.sendMessage({time : self.time});
        self.appState=App.APP_STATE_PAUSE;
      }
      if(request.resume && self.appState==App.APP_STATE_PAUSE ) {
        /*alert("resume backgroundjs");*/
        self.intervalId=self.createCountdown() ;
        chrome.runtime.sendMessage({time : self.time});
      }
    });
}

var app = new App();
app.init();