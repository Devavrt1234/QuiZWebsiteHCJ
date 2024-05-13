const highScoresList=document.getElementById('highScoresList');
const highScores=JSON.parse(localStorage.getItem('highScores'))||[];
//converting from string back to array from the localStorage web
console.log(highScores);
// Cross-Site Scripting (XSS) Vulnerability: LocalStorage shares many characteristics with cookies, including security risks. If a website is vulnerable to XSS attacks, LocalStorage can be exploited. Hackers can steal cookies and masquerade as a user with their login session for that site. Storing sensitive information like passwords in LocalStorage simplifies this process for attackers1.
// Lack of Control: Unlike server-side storage, LocalStorage doesn’t provide developers with control over the stored data. Once data is stored, developers cannot easily update or modify it. Users would need to manually delete the LocalStorage file if necessary1.
highScoresList.innerHTML=highScores.map((score)=>{
    // console.log(score);
    return `<li class='high-score'>${score.name}-${score.score}</li>`;
}).join("");