var events = []
var states = []
var transitions = []

var eventsJArray = []
var statesJArray = []
var transitionJArray = []

//Events
function setEventNames() {
  var eventValue = document.getElementsByName("eventName")[0].value;
  if(eventValue != ""){
    var eventObj = new Object();
    eventObj.eventName = eventValue;
    eventObj.eventType = "continuous";
    eventsJArray.push(eventObj);

    events.push(eventValue);
    document.getElementById("eventText").innerHTML = "Added Events: <br>" + events;


  } else alert("Event Name is empty");

  var select = document.getElementById("event"); 
  select.options[select.options.length] = new Option(events[select.options.length], events[select.options.length]);
}

//States
function setStateNames() {
  var stateValue = document.getElementsByName("stateName")[0].value;
  if(stateValue != ""){
    states.push(stateValue);
    document.getElementById("stateText").innerHTML = "Added States: <br>" +states;


  } else alert("State Name is empty");
  var select = document.getElementById("state"); 
  select.options[select.options.length] = new Option(states[select.options.length], states[select.options.length]); 
  var nextStateElement = document.getElementById("nextState"); 
  nextStateElement.options[nextStateElement.options.length] = new Option(states[nextStateElement.options.length], states[nextStateElement.options.length]);
}

//Transitions
function setTransition() {
  var duplicate = false;
  var stateName = document.getElementsByName('state')[0].value;
  var eventName = document.getElementsByName('event')[0].value;
  var nextState = document.getElementsByName('nextState')[0].value;
  var direction = document.getElementsByName('direction')[0].value;

  if(statesJArray.length > 0) {
    for(var i = 0; i < statesJArray.length; i++) {
        var obj = statesJArray[i];
        if(obj.stateName == stateName) {
          var tArray = obj.transition;
          for(var i = 0; i < tArray.length; i++) {
            var tObj = tArray[i];
            if(tObj.event != eventName) {
              var transitionObj = new Object();
              transitionJArray = [];
              transitionObj.event = eventName;
              transitionObj.nextState = nextState;
              transitionObj.direction = direction;
              tArray.push(transitionObj);
          } }
          console.log(obj.transition);
         duplicate = true;
        } 
    }
  }
  if(stateName != "" || eventName != "" || nextState != "" || direction != ""){
    transitions.push(" State: " + stateName + ", Event: " + eventName +", Next State: " + nextState +", Direction: " + direction + "<br>");

    document.getElementById("transitionText").innerHTML = "Added Transitions: <br>" + transitions;

    if(!duplicate) {
      var transitionObj = new Object();
      transitionJArray = [];
      transitionObj.event = eventName;
      transitionObj.nextState = nextState;
      transitionObj.direction = direction;
      transitionJArray.push(transitionObj);

      var statesObj = new Object();
      statesObj.stateName = stateName;
      statesObj.transition = transitionJArray;
      statesJArray.push(statesObj);
    } 
  } else alert("Empty parameter");
  
}

//On Submit press
var handleFormSubmit = function handleFormSubmit(event) {
event.preventDefault();
var obj = new Object();
obj.stateMachineName = document.getElementsByName("stateMachineName")[0].value;
obj.initialState = document.getElementsByName("initialState")[0].value;
obj.events = eventsJArray;
obj.states = statesJArray;

var dataContainer = document.getElementsByClassName('results__display')[0];
dataContainer.textContent = JSON.stringify(obj, null, "  ");
download('config_direction.json', JSON.stringify(obj));


};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


var form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);