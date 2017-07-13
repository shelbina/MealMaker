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

//vars for MealMaker Page
var foodName;
var servSize;
var calories;
var totalFat = [];
var fat;
var totalCalories = [];
var i = 0;
var total = 0;
 
 //vars for login page
var txtEmail = $("#txtEmail");
var txtPassword = $("#txtPassword");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignUp");
var btnLogout = $("#btnLogout");

$(btnLogin).click(function (e) { 
  var email = txtEmail.val().trim();
  var pass = txtPassword.val().trim();
  var auth = firebase.auth();
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  
});
$(btnSignUp).click(function (e) { 
  var email = txtEmail.val().trim();
  var pass = txtPassword.val().trim();
  var auth = firebase.auth();
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log(firebaseUser);
    console.log("Logged in A-Ok.")
    $("#btnLogout").removeClass("hide");
  } else {
    console.log("not logged in");
    $("#btnLogout").addClass("hide");
  }
});

$("#btnLogout").click(function (e) { 
  firebase.auth().signOut();


 });
  


 $(document).ready(function() {
   console.log("ready");
   clickAddFood();
    
});
 $("#clear-menu").click(function(e) {
   database.ref().remove();
   location.reload(true);
 });
 
 $("#food-input").keyup(function (e) { 
   if(e.which == 13) {
     $(this).blur();
     $("#food-input-button").focus().click();
   }
 });
 
 
function clickAddFood(){
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

     calories = x.nf_calories;
      totalCalories.push(calories);
   fat = x.nf_total_fat;
   totalFat.push(fat);
   
 
     addFoodToTable();
     bar();
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
  foodName = $("#food-input").val("");
}

 function createFoodImage() {
   var foodImage = $("<img height=200px width=200px src=" + webformatURL + ">");
   $(".panel-body").append(foodImage);
 }
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
 };



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
var i = 0;
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
var i = 0
for (var fattotal = 0 ; i < totalFat.length; fattotal += totalFat[i++]);
fat_totalHtml = "<p class='text center total-c'> Total Fat :<span class= 'cal'>" + fattotal + "</span></p>";
$(".totals1").html(fat_totalHtml);
  console.log("Meal Total Clicked!");
});
function bar() {
console.log(totalCalories);
 		var i = 0
for (var total = 0 ; i < totalCalories.length; total += totalCalories[i++]);
console.log(total);
var per = (total / 2000) * 100;
var calc = per.toFixed();
console.log(calc);
$(".progress-bar").css("width", calc + "%");
var complete = "<span>" + calc + "% complete</span>";
$("#sr-only").html(complete);
  };

//button click ref.remove from line 19 in document.ready function



 