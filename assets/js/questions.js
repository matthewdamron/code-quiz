// setup score and questionIndex
var score = 0;
var questionIndex = 0;

// find the #page-content id and assign it var pageContentEl
var pageContentEl = document.querySelector("#page-content");

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
    // create list element for my questions
    var listItemEl = document.createElement("li");
    // listItemEl.className = "task-item";

    // create div to hold question info
    var questionInfoEl = document.createElement("div");
    // questionInfoEl.className = "task-info";

    // add question HTML contect to div
    questionInfoEl.innerHTML = '<h3>' + questions[questionIndex].q + '</h3>';

    // add question to list item
    listItemEl.appendChild(questionInfoEl);

    // create choice buttons for question
    var buttonActionsEl = displayChoiceButton();
    // add choice buttons to list
    listItemEl.appendChild(buttonActionsEl);

    // add all items to the list on the pageContentEl
    pageContentEl.appendChild(listItemEl);

}

var displayChoiceButton = function() {
    // create div for the choice buttons
    var buttonContainerEl = document.createElement("div");
    // buttonContainerEl.className = "task-actions";

    for (i = 0; i < questions[i].c.length; i++) {
        // create choice button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = questions[questionIndex].c[i];
        // editButtonEl.className = "btn edit-btn";
        // editButtonEl.setAttribute("data-task-id", taskId);
        buttonContainerEl.appendChild(editButtonEl);
    }

    return buttonContainerEl;
}

displayQuestion();


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