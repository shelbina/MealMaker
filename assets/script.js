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
    $("#myCarousel").carousel({interval: 1000});
    
    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel").carousel(2);
    });
    $(".item4").click(function(){
        $("#myCarousel").carousel(3);
    });
    $(".item5").click(function(){
        $("#myCarousel").carousel(4);
    })
    
    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel").carousel("next");
    });
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
     addFoodToTable();
   });

   $.ajax({
     url: (queryURLImage),
     method: "GET"
   }).done(function(imageResponse) {
     y = imageResponse.hits[0];
     webformatURL = (y.webformatURL);
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

  console.log(newFood);
  database.ref().push(newFood);
 }

 database.ref().on("child_added", function(childSnapshot, prevChildKey){
  var foodName = childSnapshot.val().foodName;
  var servSize = childSnapshot.val().servSize;
  var calories = childSnapshot.val().calories;
  var fat = childSnapshot.val().fat;
  $("#table-body").append("<tr><td>" + foodName+ "</td><td>" + servSize + "</td><td>" +
    calories + "</td><td>" + fat + "</td></tr>");
   totalCalories.push(calories);



console.log(totalCalories);
 });

     

$("#calc-food").click(function (e) { 
  e.preventDefault();
  
for (var total = 0; i < totalCalories.length; total += totalCalories[i++]);
console.log(total);
var per = (total / 2000) * 100;
var calc = per.toFixed();
console.log(calc);
$(".progress-bar").css("width", calc);
var complete = "<span>" + calc + "% complete</span>";
$("#sr-only").html(complete);

totalHtml = "<p class='text center total-p'> Total calories:<span class= 'cal'>" + total + "</span></p>";
$(".totals").html(totalHtml);
  console.log("Meal Total Clicked!")
});
//button click ref.remove from line 19 in document.ready function


