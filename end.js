
const userName=document.getElementById('username');
const saveScoreBtn=document.getElementById('saveScoreBtn');
const finalScore=document.getElementById('finalScore');
const mostRecentStore=localStorage.getItem('mostRecentScore');
const highScores=JSON.parse(localStorage.getItem("highScores"))||[];
const MAX_HIGH_SCORES=5;

console.log(mostRecentStore);
finalScore.innerText=mostRecentStore;

userName.addEventListener('keyup',()=>{
    console.log(userName.input);
    saveScoreBtn.disabled=!userName.value;
})

saveHighScore=e=>{
    e.preventDefault();

    const score={
        score:mostRecentStore,
        name:userName.value
    };

    highScores.push(score);
    highScores.sort((a,b)=> b.score-a.score);
    highScores.splice(5);

    console.log(highScores);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign('/');
    


}