var applicationIDNutrition = "570420e6";
var apiKeyNutrition = "3f9b7cc73ed56deaca89dd781453c5e7";
var queryURLNutrition = "https://api.nutritionix.com/v1_1/search/cheeseburger?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId="+ applicationIDNutrition + "&appKey=" + apiKeyNutrition + "";


$.ajax ({
    url: (queryURLNutrition),
    method: "GET"
}).done(function(nutritionResponse){
  console.log(nutrtitionResponse);
});

$.ajax ({
    url: (queryURLimage),
    method: "GET"
}).done(function(imageResponse){
  console.log(imageResponse);
});




// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKpIFAQruvPekpkeqncOcIPpnnK78U6Zg",
    authDomain: "mealmaker-3f984.firebaseapp.com",
    databaseURL: "https://mealmaker-3f984.firebaseio.com",
    projectId: "mealmaker-3f984",
    storageBucket: "mealmaker-3f984.appspot.com",
    messagingSenderId: "776198822347"
  };
  firebase.initializeApp(config);

console.log("test");

