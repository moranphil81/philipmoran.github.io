// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowercaseSet="abcdefghijklmnopqrstuvwxyz"
var uppercaseSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var numbersSet="1234567890"
var specialCharactersSet="!@#$%^&*?<>+.-=,;:"

function generatePassword() {
  console.log("generatePaswword")
  var randomPassword="";
  var validSet=""
  //logic reassgn random password


  //get user input


  //get length from user
  var length = parseInt(prompt("How long do you want your password 8-128"))
  if(isNaN(length)){
    alert ("length must be a number")
    return ""
  
  }

  //check length to make sure it is between 8-128
  if (length < 8) {
    alert("make sure password is at least 8 characters")
    return ""
  }
  if (length > 128) {
    alert("make sure password doesnt exceed 128 characters")
    return ""

  }

  var lowercase = prompt("do you want lowercase letters (yes/no)? ")
  var uppercase = prompt("Do you want uppercase letters (yes/no)? ")
  var numbers = prompt("Do you want numbers (yes/no)?")
  var specialCharacters = prompt("Do you want special characters (yes/no)?")
  //get character types
  if (lowercase == "yes") {
    console.log("user wants lowercase")
    validSet+=lowercaseSet 

  }
  if (uppercase=="yes"){
    console.log("user wants uppercase")
    validSet+=uppercaseSet 
  }
  if (numbers=="yes"){
    console.log("user wants numbers")
    validSet+=numbersSet 
  }


  if (specialCharacters=="yes"){
    console.log("user wants special characters")
    validSet+=specialCharactersSet 
  }
  if (validSet.length>0) {
    for(i=0;i<length;i++){
        randomPassword+=validSet[Math.floor(Math.random()*validSet.length)]
      }
  } else {
    alert("you must select at least one of the character options")
    return ""
  }
 
  return randomPassword
}





// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
