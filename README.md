# Train Time

## Yee-haw, get along little doggies! In this project I created an Old West themed train schedule. The user is able to add a new train to the Station using the form on the right, select the start time, and how often it returns to the station. This information is converted using Moment js and the data is made persistent using Firebase. All aboard the Wild West Train Station!


## Check it out!: 
[Open Here](https://fayelinks.github.io/TrainTime/ "Train Time")

## Code Example:

```
database.ref().on("child_added", function(childSnapshot) {

trainName = childSnapshot.val().name;
trainDestination = childSnapshot.val().destination;
trainTime = childSnapshot.val().time;
trainFrequency = childSnapshot.val().frequency;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

// Current Time
var currentTime = moment();

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = (diffTime % trainFrequency);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
nextTrain = (moment(nextTrain).format("hh:mm A"));
```

## Built With:
* HTML
* Javascript
* JQuery
* CSS
* Bootstrap
* Firebase
* Momentjs

## Authors: 
* Alison Kelly
