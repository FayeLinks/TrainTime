var firebaseConfig = {
    apiKey: "AIzaSyCHrgLQdd9hKh9mXf_WbRHR2bCnEIGnhQk",
    authDomain: "traintime-6bedf.firebaseapp.com",
    databaseURL: "https://traintime-6bedf.firebaseio.com",
    projectId: "traintime-6bedf",
    storageBucket: "",
    messagingSenderId: "1084562431127",
    appId: "1:1084562431127:web:315ce964c93157ea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Assign global variables

var trainName= "";
var trainDestination= "";
var trainTime= "";
var trainFrequency= 0;

// On click function to push the value of the inputs to Firebase
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log(database);

    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = $("#first-train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

// Storing the inputs in Firebase under specified key names
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };
// push each new created train to the database rather than clear the present ones
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

// alert to show new train was successfully added
    alert("Choo-Choo! All Aboard!");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train-time").val("");
    $("#train-frequency").val("");
});

// take the stored information saved in Firebase and use that stored information to do math on
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

trainName = childSnapshot.val().name;
trainDestination = childSnapshot.val().destination;
trainTime = childSnapshot.val().time;
trainFrequency = childSnapshot.val().frequency;

console.log(trainName);
console.log(trainDestination);
console.log(trainTime);
console.log(trainFrequency);


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
    console.log(moment(currentTime).format("HH:mm A"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = (diffTime % trainFrequency);
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log(nextTrain);
nextTrain = (moment(nextTrain).format("hh:mm A"));


var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain + " minutes"),
);

$("#train-table > tbody").append(newRow);

});