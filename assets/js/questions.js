// setup intital variables
var score = 0;
var questions = [];
var questionIndex = 0;
var highscoreArray = [];
var timeLimit = 80;


// set variables elements to getElementById
var showChoicesEl = document.getElementById('choicesWrapper');
var showQuestionEl = document.getElementById('showQuestion');
var showResultEl = document.getElementById('showResult');
var sortedHighscoresEl = document.getElementById('sortedHighscores');
var countdownEl = document.getElementById('countdown');

// setup htmlQuestions and answers in an array
var htmlQuestions = [
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

var cssQuestions = [
    {
        q: 'What does CSS stand for?',
        c: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        a: 'Cascading Style Sheets'
    },
    {
        q: 'Which HTML attribute is used to define inline styles?',
        c: ['font', 'styles', 'class', 'style'],
        a: 'style'
    },
    {
        q: 'Which is the correct CSS syntax?',
        c: ['{body:color=black;}', 'body {color:black;}', '{body;color:black}', 'body:color=black;'],
        a: 'body {color:black;}'
    },
    {
        q: 'How do you insert a comment in a CSS file?',
        c: ["'this is a comment", '/* this is a comment */', '// this is a comment //', '// this is a comment'],
        a: '/* this is a comment */'
    },
    {
        q: 'Which CSS property controls the text size?',
        c: ['text-style', 'text-size', 'font-size', 'font-style'],
        a: 'text-size'
    }
]

var jsQuestions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?',
        c: ['<scripting>', '<js>', '<javascript>', '<script>'],
        a: '<script>'
    },
    {
        q: '<p id="demo">This is a demonstration.</p>',
        c: ['document.getElementById("demo").innerHTML = "Hello World!";', 'document.getElementByName("p").innerHTML = "Hello World";', '#demo.innerHTML = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";'],
        a: 'document.getElementById("demo").innerHTML = "Hello World!";'
    },
    {
        q: 'How do you write "Hello World" in an alert box?',
        c: ['msg("Hello World");', 'alert("Hello World:);', 'alertBox("Hello World");', 'msgBox("Hello World");'],
        a: 'alert("Hello World");'
    },
    {
        q: 'How to write and IF statment in JavaScript?',
        c: ['if i = 5 then', 'if i = 5', 'if (i === 5)', 'if i === 5 then'],
        a: 'if (i === 5)'
    },
    {        
        q: 'How does a FOR loop start?',
        c: ['for (i = 0; i <= 5; i++)', 'for i = 1 = 5', 'for (i <= 5; i++)', 'for (i = 0; i <= 5)'],
        a: 'for (i = 0; i <= 5; i++)'
    }
]

// show only the startGameWrapper section
startGameWrapper.style.display = 'inline-block';
showHighscoreWrapper.style.display = 'none';
endGameWrapper.style.display = 'none';
questionWrapper.style.display = 'none';

var startGame = function() {
    // concat all the question arrays into one and suffle them
    questions = [];
    questions = htmlQuestions.concat(cssQuestions, jsQuestions);
    shuffle(questions);
    console.log(questions);
    
    // reset the highscoreArray to empty
    highscoreArray = [];
    // start the timer
    countdownTimer();
    // load the highscores into the highscoreArray
    loadHighscore();
    // display the questions to start playing
    displayQuestion();
}

var countdownTimer = function() {
    // start of the countdown timer
    var timeInterval = setInterval(function () {
        if (timeLimit > 1) {
            // display timer and countdown
            countdownEl.textContent = timeLimit + ' seconds remaining';
            // decrement 'timeLimit' by 1
            timeLimit--;
        }
        else if (timeLimit === 1) {
            // dispaly timer and countdown
            countdownEl.textContent = timeLimit + ' second remaining';
            // decrement 'timeLimit' by 1
            timeLimit--;
        }
        else {
            // clear question items
            countdownEl.textContent = '';
            showQuestionEl.textContent = '';
            try {
                document.getElementById('choiceButtonContainer').remove();
            }
            catch(err) {

            }
            
            // clear timer
            clearInterval(timeInterval);

            // run endGame function
            endGame();
        }
    }, 1000)
}

var displayQuestion = function() {
    // show only the questionWrapper section
    startGameWrapper.style.display = 'none';
    showHighscoreWrapper.style.display = 'none';
    endGameWrapper.style.display = 'none';
    questionWrapper.style.display = 'inline';
  
    // start asking question until no more questions or time runs out
    if (questionIndex < questions.length) {
        // display question
        showQuestionEl.textContent = questions[questionIndex].q;

        // create choice buttons for question
        var createChoiceButtonsEl = createChoiceButtons();

        // add choice buttons to the showChoicesEl
        showChoicesEl.appendChild(createChoiceButtonsEl);
    }
    else {
        // clear question contect
        showQuestionEl.textContent = "";

        // run endGame function
        endGame();
    }
}

var createChoiceButtons = function() {
    // create div container for the choice buttons
    var choiceButtonContainerEl = document.createElement("div");
    choiceButtonContainerEl.id = "choiceButtonContainer";

    // for loop to make button for each question choice
    for (i = 0; i < questions[i].c.length; i++) {
        // create choice button
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = questions[questionIndex].c[i];
        choiceButtonEl.className = "btn";
        
        // add choice button to the choiceButtonContainerEl
        choiceButtonContainerEl.appendChild(choiceButtonEl);
    }

    // return the container of buttons
    return choiceButtonContainerEl;
}

var choiceButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    
    // test if targetEl is a button
    if (targetEl.matches(".btn")) {
        // get textContent from target
        var choiceButtonContent = targetEl.textContent;

        // check if clicked button is correct or wrong with passing value of textContent
        checkAnswer(choiceButtonContent);
    }
    else {
        return false;
    }

    // remove choiceButtonContainer after the question has been checked and ready to move on
    document.getElementById("choiceButtonContainer").remove();

    // increment asked questions by 1
    questionIndex++;

    // run displayQuestion to continue
    displayQuestion();
}

var checkAnswer = function (choiceButtonContent) {
    // check to see if the clicked button is correct
    if (choiceButtonContent === (questions[questionIndex].a)) {
        // show correct
        showResultEl.textContent = 'Correct!';
        // increment score by 7 points
        score = score + 7;
        // show the correct responce for a setInterval time
        var timeInterval = setInterval(function () {
            showResultEl.textContent = '';
            clearInterval(timeInterval);
        }, 1000)
    }
    else {
        // show wrong
        showResultEl.textContent = 'Wrong!';
        // decerment score by 3 points
        score = score - 3;
        // decerment timeLimit by 10 seconds
        timeLimit = timeLimit - 10;
        // show the wrong responce for a setInterval time
        var timeInterval = setInterval(function () {
            showResultEl.textContent = '';
            clearInterval(timeInterval);
        }, 1000)
    }
}

var endGame = function() {
    // set timeLimit to 0
    timeLimit = 0;

    // show only the startGameWrapper section
    startGameWrapper.style.display = 'none';
    showHighscoreWrapper.style.display = 'none';
    endGameWrapper.style.display = 'inline';

    // display finalGameScore score
    var finalGameScoreEl = document.getElementById('finalGameScore');
    finalGameScoreEl.textContent = 'Your finial score is ' + score + '!';
}

var saveHighscore = function() {
    // get finalGameName from input box
    var finalGameNameEl = document.getElementById('finalGameName');
    var finalGameName = finalGameNameEl.value;

    // save finalGameName and finalGameScore to object
    var finalGameObj = {
        name: finalGameName,
        score: score
    };

    // push highscoreObj to highscoreArray
    highscoreArray.push(finalGameObj);

    // save highscoreArray to localStorage
    localStorage.setItem("codingQuizHighscores", JSON.stringify(highscoreArray));

    // go to highscore display
    showHighscore();
}

var loadHighscore = function() {
    // set highscoreArray to empty
    highscoreArray = [];

    // retreve the highscores from localStorage
    var savedCodingQuizHighscore = localStorage.getItem("codingQuizHighscores");

    // check if the savedCodingQuizHighscore is null is so return false to exit the function
    if (!savedCodingQuizHighscore) {
        return false;
    }

    // convert the tasks from a stringify format to array format
    savedCodingQuizHighscore = JSON.parse(savedCodingQuizHighscore);

    // push savedCodingQuizHighscore into the highscoreArray
    for (i = 0; i < savedCodingQuizHighscore.length; i++) {
        highscoreArray.push(savedCodingQuizHighscore[i]);
    }

    // sort the highscoreArray in descending order based on the score
    highscoreArray = highscoreArray.sort(function(a, b){return b.score - a.score});
}

var clearLocalSotrage = function() {
    // reamove the localStorage
    localStorage.removeItem('codingQuizHighscores');

    // remove the highscoreListContainer
    document.getElementById("highscoreListContainer").remove();
}

var showHighscore = function() {
    // get the highscores from localStorage for display
    loadHighscore();

    // show only the showHighscoreWrapper section
    startGameWrapper.style.display = 'none';
    showHighscoreWrapper.style.display = 'inline';
    endGameWrapper.style.display = 'none';
    questionWrapper.style.display = 'none';

    // create list item for the highscoreArray
    var listContainerEl = document.createElement('ol');
    listContainerEl.id = 'highscoreListContainer';
    
    // for loop to create all the highscores from the highscoreArray into a list
    for (i = 0; i < highscoreArray.length; i++) {
        var listItemEl = document.createElement('li');
        listItemEl.innerHTML = highscoreArray[i].name + " " + highscoreArray[i].score + "<br>";
        listContainerEl.appendChild(listItemEl);
    }

    // add the list of highscores into the listContainerEl
    sortedHighscoresEl.appendChild(listContainerEl);
}

var shuffle = function (array) {
    var newarr=[]
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue;
    }

    return newarr;
}

// addEventListener to listen to click on questions
showChoicesEl.addEventListener("click", choiceButtonHandler);