 var config = {
   apiKey: "AIzaSyBKpIFAQruvPekpkeqncOcIPpnnK78U6Zg",
   authDomain: "mealmaker-3f984.firebaseapp.com",
   databaseURL: "https://mealmaker-3f984.firebaseio.com",
   projectId: "mealmaker-3f984",
   storageBucket: "mealmaker-3f984.appspot.com",
   messagingSenderId: "776198822347"
 };

 firebase.initializeApp(config);

 var database = firebase.database();
var foodName;
var servSize;
var calories;
var fat;
 $(document).ready(function() {
   console.log("ready");
   database.ref().remove();
 });

 $("#food-input-button").click(function(e) {
   e.preventDefault();
   var foodInput = $("#food-input").val().trim();
   clearTextBoxes();
   var applicationIDNutrition = "570420e6";
   var apiKeyNutrition = "3f9b7cc73ed56deaca89dd781453c5e7";
   var queryURLNutrition = "https://api.nutritionix.com/v1_1/search/" + foodInput +
     "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=" +
     applicationIDNutrition + "&appKey=" + apiKeyNutrition;

   var apiKeyImage = "key=5847309-0a6ea96477b972ed6e131f630&q=";
   var queryURLImage = "https://pixabay.com/api/?" + apiKeyImage + foodInput + "&image_type=photo";
   




   $.ajax({
     url: (queryURLNutrition),
     method: "GET"
   }).done(function(nutritionResponse) {
     x = nutritionResponse.hits[0].fields;
     console.log(nutritionResponse);
     addFoodToTable();
   });

   $.ajax({

     url: (queryURLImage),
     method: "GET"
   }).done(function(imageResponse) {
     y = imageResponse.hits[0];
     webformatURL = (y.webformatURL);
     console.log("Click this " + webformatURL);
     console.log(imageResponse);
     createFoodImage();
   });

 });

 function clearTextBoxes() {
  trainName = $("#food-input").val("");
}

 function createFoodImage() {
   var foodImage = $("<img height=200px width=200px src=" + webformatURL + ">");
   $(".panel-body").append(foodImage);
 }

 function addFoodToTable(){
   var newFood = {
    foodName: x.item_name,
    servSize: x.nf_serving_size_qty,
    calories: x.nf_calories,
    fat: x.nf_total_fat,
  };
  database.ref().push(newFood);
  console.log(newFood.foodName);
  console.log(newFood.servSize);
  console.log(newFood.calories);
  console.log(newFood.fat);
 }

 database.ref().on("child_added", function(childSnapshot, prevChildKey){
  var foodName = childSnapshot.val().foodName;
  var servSize = childSnapshot.val().servSize;
  var calories = childSnapshot.val().calories;
  var fat = childSnapshot.val().fat;
    console.log(foodName);
  console.log(servSize);
  console.log(calories);
  console.log(fat);

  
  $("#table-body").append("<tr><td>" + foodName+ "</td><td>" + servSize + "</td><td>" +
    calories + "</td><td>" + fat + "</td></tr>");
 });

//button click ref.remove from line 19 in document.ready function
