var config = {
    apiKey: "AIzaSyDtxPt5F3HxeTDkRtLB91v9vvKYZbjYkYc",
    authDomain: "first-class-project-81374.firebaseapp.com",
    databaseURL: "https://first-class-project-81374.firebaseio.com",
    projectId: "first-class-project-81374",
    storageBucket: "first-class-project-81374.appspot.com",
    messagingSenderId: "990832383630",
    appId: "1:990832383630:web:44fbc8a019b419e6dd1bdf",
    measurementId: "G-110NWEL0EX"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var firstTrnTime = $("#first-train-input").val().trim();
    var trnFreq = $("#frequency-input").val().trim();
  
    var newTrn = {
      name: trnName,
      destination: trnDest,
      firstTime: firstTrnTime,
      frequency: trnFreq
    };
  
    database.ref().push(newTrn);
  
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.firstTime);
    console.log(newTrn.frequency);
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().destination;
    var firstTrnTime = childSnapshot.val().firstTime;
    var trnFreq = childSnapshot.val().frequency;
  
    console.log(trnName);
    console.log(trnDest);
    console.log(firstTrnTime);
    console.log(trnFreq);
  
    var firstTrnTimeConv = moment(firstTrnTime, "hh:mm a").subtract(1, "years");

    var currentTime = moment().format("HH:mm a");
    console.log("Current Time:" + currentTime);

    var trnTimeCurrentTimeDiff = moment().diff(moment(firstTrnTimeConv), "minutes");

    var timeLeft = trnTimeCurrentTimeDiff % trnFreq;

    var minutesAway = trnFreq - timeLeft;

    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
  
    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + trnFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });