// setup score and questionIndex
var score = 0;
var questionIndex = 0;

// find the #page-content id and assign it var showChoicesEl
var showChoicesEl = document.getElementById('showChoices');
var showQuestionEl = document.getElementById('showQuestion');
var showResultEl = document.getElementById('showResult');

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

var displayQuestion = function() {
    
    // listItemEl.setAttribute("data-task-id", questionIndex);

    // create div to hold question info
    // var questionInfoEl = document.createElement("div");
    // questionInfoEl.className = "task-info";
    console.log(score);
    startGameWrapper.style.display = "none"

    if (questionIndex < questions.length) {
        // add question HTML contect to div
        // questionInfoEl.innerHTML = '<h3>' + questions[questionIndex].q + '</h3>';
        showQuestionEl.textContent = questions[questionIndex].q;

        // add question to list item
        // listItemEl.appendChild(questionInfoEl);

        // create list element for my questions
        // var listItemEl = document.createElement("li");
        // listItemEl.id = "list-item";

        // create choice buttons for question
        var buttonActionsEl = displayChoiceButton();
        // add choice buttons to list
        // listItemEl.appendChild(buttonActionsEl);

        // add all items to the list on the showChoicesEl
        showChoicesEl.appendChild(buttonActionsEl);
    }
    else {
        showQuestionEl.textContent = "";
        endGame();
    }
}

var displayChoiceButton = function() {
    // create div for the choice buttons
    var buttonContainerEl = document.createElement("div");
    // buttonContainerEl.className = "task-actions";

    for (i = 0; i < questions[i].c.length; i++) {
        // create choice button
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = questions[questionIndex].c[i];
        choiceButtonEl.className = "btn";
        // choiceButtonEl.setAttribute("data-choice-id", questions[questionIndex].a);
        buttonContainerEl.appendChild(choiceButtonEl);
    }

    return buttonContainerEl;
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

    
    
    // find the #page-content id and assign it var showChoicesEl
    var taskSelected = document.getElementById("list-item");
    // taskSelected.parentNode.removeChild(taskSelected);
    
    taskSelected.remove();

    questionIndex++;
    


    displayQuestion();

    // check if the clicked item is the edit button
    // if (targetEl.matches(".edit-btn")) {
    //     // var taskId = event.target.getAttribute("data-task-id");
    //     editTask(taskId);
    // }

    // // check if the clicked item is the delete button
    // else if (targetEl.matches(".delete-btn")) {
    //     // var taskId = event.target.getAttribute("data-task-id");
    //     deleteTask(taskId);
    // }
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

var startGame = function() {
    displayQuestion();
}

var endGame = function() {
    alert('You sore is ' + score);
}

var highscore = function() {
    // create list element for my questions
    var listItemEl = document.createElement("li");
    listItemEl.id = "list-item";

    var listItem

    // create choice buttons for question
    var buttonActionsEl = displayChoiceButton();
    // add choice buttons to list
    listItemEl.appendChild(buttonActionsEl);

    // add all items to the list on the showChoicesEl
    showChoicesEl.appendChild(listItemEl);
}

showChoicesEl.addEventListener("click", taskButtonHandler);






// TODO: Iterate over the questions array and display each question in a confirmation box
// for (var i = 0; i < questions.length; i++) {
//     var answer = confirm(questions[i].q);

//     if (answer === true && questions[i].a === 't' || answer === false && questions[i].a === 'f') {
//         score++;
//         alert('You got the correct answer!');
//     }
//     else {
//         alert('You got the wrong answer!');
//     }
// }



// Renders questions and choices to page: 
// var displayQuestion = function (questionIndex) {
//     // Clears existing data 
//     questionsDiv.innerHTML = "";
//     ulCreate.innerHTML = "";
//     // For loops to loop through all info in array
//     for (var i = 0; i < questions.length; i++) {
//         // Appends question title only
//         var userQuestion = questions[questionIndex].title;
//         var userChoices = questions[questionIndex].choices;
//         questionsDiv.textContent = userQuestion;
//     }
//     // New for each for question choices
//     userChoices.forEach(function (newItem) {
//         var listItem = document.createElement("li");
//         listItem.textContent = newItem;
//         questionsDiv.appendChild(ulCreate);
//         ulCreate.appendChild(listItem);
//         listItem.addEventListener("click", (compare));
//     })
// }

// displayQuestion();

// alert('Your final score is ' + score);