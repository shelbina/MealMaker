// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3VxUOsWXYcjoYzefgW9bW1WJ8pJH6BQ4",
    authDomain: "mealmaker-a5669.firebaseapp.com",
    databaseURL: "https://mealmaker-a5669.firebaseio.com",
    projectId: "mealmaker-a5669",
    storageBucket: "",
    messagingSenderId: "158039007710"
  };

 var webformatURL;

$(document).ready(function () {
  console.log("ready");
});

$("#food-input-button").click(function(e) { 
  e.preventDefault();
  createFoodImage();
  var foodInput = $("#food-input").val().trim();
  console.log(foodInput);
  var applicationIDNutrition = "570420e6";
  var apiKeyNutrition = "3f9b7cc73ed56deaca89dd781453c5e7";
  var queryURLNutrition = "https://api.nutritionix.com/v1_1/search/" + foodInput + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId="+ applicationIDNutrition + "&appKey=" + apiKeyNutrition;

  var apiKeyImage = "key=5847309-0a6ea96477b972ed6e131f630&q=";
  var queryURLImage = "https://pixabay.com/api/?" + apiKeyImage + foodInput + "&image_type=photo";


  
$.ajax ({
    url: (queryURLNutrition),
    method: "GET"
}).done(function(nutritionResponse){
  console.log(nutritionResponse);
});

$.ajax ({
    
    url: (queryURLImage),
    method: "GET"
}).done(function(imageResponse){
  webformatURL = (imageResponse.hits[1].webformatURL);
});

});

function createFoodImage(){
  var newDiv = $("<div>");
  newDiv.addClass = $("food-image");
  var foodImage = $("<img src=" + webformatURL);
  newDiv.append(foodImage);
  $(".panel-body").append(newDiv);
};



// // // Initialize Firebase
// //   var config = {
// //     apiKey: "AIzaSyBKpIFAQruvPekpkeqncOcIPpnnK78U6Zg",
// //     authDomain: "mealmaker-3f984.firebaseapp.com",
// //     databaseURL: "https://mealmaker-3f984.firebaseio.com",
// //     projectId: "mealmaker-3f984",
// //     storageBucket: "mealmaker-3f984.appspot.com",
// //     messagingSenderId: "776198822347"
// //   };
// //   firebase.initializeApp(config);

// // console.log("test");

