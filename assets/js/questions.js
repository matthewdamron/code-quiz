// setup score and questionIndex
var score = 0;
var questionIndex = 0;
var highscoreArray = [];

// find the #page-content id and assign it var showChoicesEl
var showChoicesEl = document.getElementById('choicesWrapper');
var showQuestionEl = document.getElementById('showQuestion');
var showResultEl = document.getElementById('showResult');
var sortedHighscoresEl = document.getElementById('sortedHighscores');

// setup questions and answers in an array
var questions = [
    {
        q: 'What does HTML stand for?',
        c: ['Home Tool Markup Language', 'Hyperlins and Text Markup Language', 'Hyper Text Markup Language', 'Hyper Time Media Language'],
        a: 'Hyper Text Markup Language'
    },
    {
        q: 'Choose the correct HTML element for the largest heading?',
        c: ['<h1>', '<h6>', '<heading>', '<head>'],
        a: '<h1>'
    },
    {
        q: 'Which character is used to indicate an end tag?',
        c: ['<', '^', '*', '/'],
        a: '/'
    },
    {
        q: 'What is the correct HTML for making a checkbox?',
        c: ['<input type="checkbox">', '<checkbox>', '<check>', '<input type="check">'],
        a: '<input type="checkbox">'
    },
    {
        q: 'Which HTML element is used to specify a footer for a document or section?',
        c: ['<section>', '<bottom>', '<footer>', '<div>'],
        a: '<footer>'
    }
]

var startGame = function() {
    highscoreArray = [];
    loadHighscore();
    displayQuestion();
}

var displayQuestion = function() {


    console.log(score);
    startGameWrapper.style.display = "none"

    if (questionIndex < questions.length) {
        // add question HTML contect to div
        // questionInfoEl.innerHTML = '<h3>' + questions[questionIndex].q + '</h3>';
        showQuestionEl.textContent = questions[questionIndex].q;


        // create choice buttons for question
        var choiceButtonActionsEl = displayChoiceButton();
        // add choice buttons to list
        // listItemEl.appendChild(choiceButtonActionsEl);

        // add all items to the list on the showChoicesEl
        showChoicesEl.appendChild(choiceButtonActionsEl);
    }
    else {
        showQuestionEl.textContent = "";
        endGame();
    }
}

var displayChoiceButton = function() {
    // create div for the choice buttons
    var choiceButtonContainerEl = document.createElement("div");
    choiceButtonContainerEl.id = "choiceButtonContainer";

    for (i = 0; i < questions[i].c.length; i++) {
        // create choice button
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = questions[questionIndex].c[i];
        choiceButtonEl.className = "btn";
        // choiceButtonEl.setAttribute("data-choice-id", questions[questionIndex].a);
        choiceButtonContainerEl.appendChild(choiceButtonEl);
    }

    return choiceButtonContainerEl;
}

var taskButtonHandler = function (event) {
    // get target elemnt from event
    var targetEl = event.target;
    
    // var choiceId = targetEl.getAttribute("data-choice-id")
    var choiceId = targetEl.textContent;
    // var taskId = choiceId.textContent;

    if (targetEl.matches(".btn")) {
        checkAnswer(choiceId);
    }
    else {
        return false;
    }

    document.getElementById("choiceButtonContainer").remove();

    questionIndex++;

    displayQuestion();
}

var checkAnswer = function (choiceId) {
    if (choiceId === (questions[questionIndex].a)) {
        showResultEl.textContent = 'Correct!';
        score = score + 5;
        var timeInterval = setInterval(function () {
            showResultEl.textContent = '';
            clearInterval(timeInterval);
        }, 1000)
    }
    else {
        showResultEl.textContent = 'Wrong!';
        score = score - 3;
        var timeInterval = setInterval(function () {
            showResultEl.textContent = '';
            clearInterval(timeInterval);
        }, 1000)
    }
}

var endGame = function() {
    highscoreWrapper.style.display = "inline";
    var highscore = document.getElementById('highscore');
    highscore.textContent = 'Your finial score is ' + score + '!';
}

var saveHighscore = function() {
    var highscoreNameEl = document.getElementById('highscoreNameId');
    var highscoreName = highscoreNameEl.value;
    console.log(highscoreName);
    var highscoreObj = {
        name: highscoreName,
        score: score
    };
    highscoreArray.push(highscoreObj);
    localStorage.setItem("codingQuizHighscores", JSON.stringify(highscoreArray));
    showHighscore();
}

var loadHighscore = function() {
    highscoreArray = [];
    // retreve the tasks from localStorage
    var savedCodingQuizHighscore = localStorage.getItem("codingQuizHighscores");

    // check if the tasks is null is so return false to exit the function
    if (!savedCodingQuizHighscore) {
        return false;
    }

    // convert the tasks from a stringify format to array format
    savedCodingQuizHighscore = JSON.parse(savedCodingQuizHighscore);

    for (i = 0; i < savedCodingQuizHighscore.length; i++) {
        highscoreArray.push(savedCodingQuizHighscore[i]);
    }

    highscoreArray = highscoreArray.sort(function(a, b){return b.score - a.score});
    console.log(highscoreArray);

}

var clearLocalSotrage = function() {
    localStorage.removeItem('codingQuizHighscores');
    document.getElementById("highscoreListContainer").remove();
}

var showHighscore = function() {
    loadHighscore();
    startGameWrapper.style.display = "none";
    questionWrapper.style.display = "none";
    highscoreWrapper.style.display = "none";
    showHighscoreWrapper.style.display = "inline";

    

    // create list item
    var listContainerEl = document.createElement('ul');
    listContainerEl.id = 'highscoreListContainer';
    
    for (i = 0; i < highscoreArray.length; i++) {
        var listItemEl = document.createElement('li');
        listItemEl.innerHTML = highscoreArray[i].name + " " + highscoreArray[i].score + "<br>";
        listContainerEl.appendChild(listItemEl);
    }
    sortedHighscores.appendChild(listContainerEl);
}



showHighscoreWrapper.style.display = "none";
highscoreWrapper.style.display = "none";
showChoicesEl.addEventListener("click", taskButtonHandler);



// // add task id as a custom attribute using the taskIdCounter
// listItemEl.setAttribute("data-task-id", taskIdCounter);
// // add draggable attribute to the listItemEl
// listItemEl.setAttribute("draggable", "true");

// // create div to hold task info and add to list item
// var taskInfoEl = document.createElement("div");
// taskInfoEl.className = "task-info";

// // add HTML contect to div
// taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

// // add taskInfoEl into the HTML
// listItemEl.appendChild(taskInfoEl);

// // create the task
// var taskActionsEl = createTaskActions(taskIdCounter);
// listItemEl.appendChild(taskActionsEl);

// // add taskId to taskDataObj
// taskDataObj.id = taskIdCounter;
// // push taskDataObj to task array
// tasks.push(taskDataObj);