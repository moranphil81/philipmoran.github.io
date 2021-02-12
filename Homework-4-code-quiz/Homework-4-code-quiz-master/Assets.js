
var endingSection =document.getElementById("ending")
var score = 0;
var questionIndex = 0;
var startButton = document.getElementById("startButton")
var introSection = document.getElementById("Intro")
var gameSection = document.getElementById("Game")
var timerText = document.getElementById("timerText")
var questionSection = document.getElementById("Questions")
var secondsRemaining = 69


var tracker = null
console.log(timerText)

// Start working code 
// Declared variables

var stopInterval = function () {
    console.log('End!');
    clearInterval(timer);
}
window.addEventListener('load', function() {
    for(let i=0;i<questions.length;i++){
        console.log(i)
        createQuestion(questions[i].title, questions[i].choices,questions[i].answer,i)
    }
    if(localStorage.getItem("leaders")==null){
        localStorage.setItem("leaders", JSON.stringify([]))
    }
    
})




startButton.addEventListener("click", function () {
    introSection.style.display = "none"
    gameSection.style.display = "block"
    timer=setInterval(function () {
    
        // console.log(secondsRemaining)
    
    
    
        secondsRemaining = secondsRemaining - 1
        if(secondsRemaining<=0){
            clearInterval(timer)
            gameSection.style.display="none"
            endingSection.style.display="block" 
            showScores()
        }
        var minutes = Math.floor(secondsRemaining / 60)
        var seconds = secondsRemaining % 60
        if (seconds < 10) {
            seconds = "0" + seconds
    
        }
        // console.log (minutes, seconds) 
        timerText.textContent = minutes + ":" + seconds
    
    }, 1000)
})


// Var with array and object for questions 

var questions = [
    {
        title: "Which of the following is the correct syntax to redirect a url using JavaScript?",
        choices: ["document.location='http://www.newlocation.com'","browser.location='http://www.newlocation.com'", "navigator.location='http://www.newlocation.com'","window.location='http://www.newlocation.com'"],
        answer: "window.location='http://www.newlocation.com'",
    },
        
    {
        title: "Which built-in method returns the characters in a string beginning at the specified location?",
        choices: ["substr", "getSubstring", "slice", "none"],
        answer: "substr",
    },
    {
        title: "Which of the following function of String object is used to match a regular expression against a string?",
        choices: ["concat()", "match()", "search()", "replace"],
        answer: "match()",
    },
    {
        title: "Which of the following function of Array object joins all elements of an array into a string?",
        choices: ["A - pop()", "push()","reduce()","reduceRight"],
        answer: "reduceRight",
    },




];

function createQuestion(title, choices, answer, index) {
    //title,buttons,answer
    var divElement = document.createElement("div")
    divElement.setAttribute("id","index"+index)
    var titleElement = document.createElement("h2")
    titleElement.textContent = title
    divElement.appendChild(titleElement)
    for (i = 0; i < choices.length; i++) {
        var choiceOption = document.createElement("button")
        choiceOption.textContent = choices[i]
        
        choiceOption.addEventListener("click",function (e) {
            
            // alert("you got it!")
            
            if(e.target.textContent==answer){
                score=score+1
            } 
            else{
                secondsRemaining-=10
            }
            questionIndex=questionIndex+1 
            document.getElementById("index"+index).style.display="none"
            console.log(score)
            console.log(questionIndex)
            if(questionIndex<questions.length){
                document.getElementById("index"+ questionIndex).style.display="block"
            }
            else {
                
                gameSection.style.display="none"
                endingSection.style.display="block"
                clearInterval(timer)
                showScores()
            }
        })




        divElement.appendChild(choiceOption)
    } 
    questionSection.appendChild(divElement)
}

function showScores(){
    document.getElementById('score').textContent=score
    document.getElementById('total').textContent=questions.length

    let highScores = JSON.parse(localStorage.getItem('leaders') || '[]')
    Scores.innerHTML = ''
    for(let i = 0; i < highScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = highScores[i].initials + " " + highScores[i].score;
        Scores.appendChild(createLi);
    }
}

var Scores = document.querySelector("#Scores");
var initialsInput=document.getElementById("initials")
var submitButton = document.getElementById("submit")
var clearButton = document.getElementById("clear");
var hasSubmitted = false
submitButton.addEventListener('click', function() {
    if(initialsInput.value != '' && !hasSubmitted){
        scoreSubmission = {initials: initialsInput.value, score: score}
        let highScores = JSON.parse(localStorage.getItem('leaders') || '[]')
        Scores.innerHTML = ''
        highScores.push(scoreSubmission)
        for(let i = 0; i < highScores.length; i++) {
            var createLi = document.createElement("li");
            createLi.textContent = highScores[i].initials + " " + highScores[i].score;
            Scores.appendChild(createLi);
        }
        localStorage.setItem("leaders", JSON.stringify(highScores))
        hasSubmitted=true;
    }
})

clearButton.addEventListener("click", function () {
    localStorage.removeItem("leaders");
    Scores.innerHTML = '';
});