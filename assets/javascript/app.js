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

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log(database);

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = moment($("#first-train-time").val().trim(), "HH:mm").format("x");
    var trainFrequency = $("#train-frequency").val().trim();


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

var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var trainFrequency = childSnapshot.val().frequency;

console.log(trainName);
console.log(trainDestination);
console.log(trainTime);
console.log(trainFrequency);

var trainNextTime = moment.unix(trainTime).format("HH:mm");

var trainNextArrival = moment().diff(moment(trainTime, "X"), "minutes");
console.log(trainNextArrival);

var minutesAway = trainNextArrival * trainFrequency;
console.log(minutesAway);

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainNextTime),
    $("<td>").text(minutesAway),
);

$("#train-table > tbody").append(newRow);

});