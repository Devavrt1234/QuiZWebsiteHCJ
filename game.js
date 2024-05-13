// console.log('hello world from game');
const question=document.getElementById('question');
const choices=Array.from(document.getElementsByClassName('choice-text'));
const progressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressBarfull=document.getElementById('progress-bar-full');
const progressBar=document.getElementById('progressBar');
const body=document.getElementById('body');
const loader=document.getElementById('loader');
const loaderinner=document.getElementById('loaderinner');
const game=document.getElementById('game');
// console.log(progressBarfull);
let currentQuestion={};
let acceptingAnswers=true;
let score=0;
let questionCounter=0;
let realcount=0;
let availableQuestions=[];

let CORRECT_BONUS=10;
let MAX_QUESTIONS=12;

let questions=[
    {
        "question":"Inside which HTML element do we put the javascript?",
        "choice1":"<script>",
        "choice2":"<javascript>",
        "choice3":"<js>",
        "choice4":"<scripting>",
        "answer":1
    }
];

// API DATA HANDLING
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(res=>{

    
    console.log(res);
    return res.json();
}).then(loadedQuestions=>{
    let count=0;
    console.log(loadedQuestions);
    questions=loadedQuestions.results.map(loadedQuestion=>{
        count++;
        const formattedQuestion={
            question:loadedQuestion.question
        }

        const answerChoices=[...loadedQuestion.incorrect_answers];
        formattedQuestion.answer=Math.floor(Math.random()*3)+1;
        console.log("hi random ans"+Math.floor(Math.random()*3)+1);
        answerChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer)
        // inserting at random index of answerChoices array using splice js es6 function
        // if 0 is changed from 0 to 1,2 3 etc then acc to the index range loadedQuestion.correct_answer will be inserted
        // then it won't insert at random position
        // The zero-based location in the array from which to start removing elements.
        // @param deleteCount — The number of elements to remove.
        // @param items — Elements to insert into the array in place of the deleted elements.

        // console.log("hi answerChoices "+[...answerChoices]);

        answerChoices.forEach((choice,index)=>{
            formattedQuestion['choice'+(index+1)]=choice;
        })
        MAX_QUESTIONS=count;
        return formattedQuestion;
    })
    
    loader.style.display='none'
    game.style.display='inline';
    startGame();
    
}).catch(err=>{
    console.log(err);
    // SITE PRESTIGE PROTECTING BY MAKING AVAILABLE DATA WITHOUT API DATA
    alert('hi something went wrong,now fetching from questions.json file');
   
    loader.style.display='none'
    game.style.display='inline';
    fetch('questions.json').then((res)=>{
        return res.json();
    }).then((loadedQuestion)=>{
        console.log(loadedQuestion);
        questions=loadedQuestion;
        startGame();
    }).catch((err)=>{
        alert('sorry unable to fetch from any of the available sources');
    })
})

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    console.log(availableQuestions);
    realcount=questions.length;
    getNewQuestion();
}

getNewQuestion=()=>{

    if(availableQuestions.length===0||questionCounter>MAX_QUESTIONS){
       
       localStorage.setItem("mostRecentScore","Your Score:"+score);
       return window.location.assign("/end.html");
    }
    // es6
    questionCounter++;
   
    progressText.innerText='Question'+ ` ${questionCounter}`+"/"+`${MAX_QUESTIONS}`;
    progressText.style.color='white'
    // update the progress bar
   

    const questionIndex=Math.floor(Math.random()*availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;


    choices.forEach(choice => {
   
        // const number=choice.dataset.number;
        const number=choice.dataset['number'];
        console.log(number);
        choice.innerText=currentQuestion['choice'+number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
    
}


progressBar.style.backgroundColor='white';
choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if(!acceptingAnswers){
            return;
        }

        acceptingAnswers=false;

        const selectedChoice=e.target;
        console.log(selectedChoice);
        //  target Returns the object to which event is dispatched (its target).
        const selectedAnswer=selectedChoice.dataset['number'];

        

        const classToApply=selectedAnswer==currentQuestion.answer?"correct":'incorrect';
    
        selectedChoice.parentElement.classList.add(classToApply);
        if(classToApply==="correct"){
    
            incrementScore(CORRECT_BONUS);
           
        }
       
         progressBar.style.width=Math.floor(Math.random()*10)+1;
         
        setTimeout(()=>{
            progressBarfull.style.backgroundColor='#56eb8f';
            progressBarfull.style.width=questionCounter==0?'0%':`${(questionCounter/MAX_QUESTIONS)*100}%`;
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },500);

        console.log('hi->'+selectedAnswer);
        // getNewQuestion();
    })
})

incrementScore=num=>{
    score+=num;
    scoreText.innerText=score;
}

startGame();


