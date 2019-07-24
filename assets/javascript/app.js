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

var trainName= "";
var trainDestination= "";
var trainTime= "";
var trainFrequency= 0;

var firstTimeConverted = moment(trainTime, "HH:mmA").subtract(1, "years");
    console.log(firstTimeConverted);

var currentTime = moment();
    console.log(moment(currentTime).format("hh:mmA"));

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log(database);

    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainTime = moment($("#first-train-time").val().trim(), "HH:mm").format("x");
    trainFrequency = $("#train-frequency").val().trim();


    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Choo-Choo! All Aboard!");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train-time").val("");
    $("#train-frequency").val("");
});

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

// var trainNextTime = moment.unix(trainTime).format("HH:mmA");

// var trainNextArrival = moment().diff(moment(trainTime, "X"), "minutes");
// console.log(trainNextArrival);

// var minutesAway = trainNextArrival * trainFrequency;
// console.log(minutesAway);

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mmA"));

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
);

$("#train-table > tbody").append(newRow);

});