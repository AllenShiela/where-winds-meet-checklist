const dailyTasks = [
  "Log In",
  "Claim Daily Rewards",
  "Complete Daily Quests",
  "Spend Vitality",
  "Defeat World Boss",
  "Guild Donation",
  "Guild Activity",
  "Arena Matches",
  "Treasure Hunt",
  "Explore Map",
  "Collect Resources",
  "Craft Equipment"
];

const today = new Date().toDateString();

const savedDate = localStorage.getItem("dailyDate");

if(savedDate !== today){
    localStorage.setItem("dailyDate", today);
    localStorage.removeItem("dailyProgress");
}

let completed =
JSON.parse(localStorage.getItem("dailyProgress")) || [];

const container = document.querySelector(".menu-grid");

container.innerHTML = "";

dailyTasks.forEach((task,index)=>{

const card=document.createElement("div");

card.className="menu-card";

card.innerHTML=`
<label>

<input
type="checkbox"
${completed.includes(index)?"checked":""}
>

${task}

</label>
`;

const checkbox=card.querySelector("input");

checkbox.addEventListener("change",()=>{

if(checkbox.checked){

completed.push(index);

}else{

completed=completed.filter(i=>i!==index);

}

localStorage.setItem(
"dailyProgress",
JSON.stringify(completed)
);

updateDashboard();

});

container.appendChild(card);

});

function updateDashboard(){

const done=completed.length;

const total=dailyTasks.length;

document.getElementById("completedTasks").textContent=done;

document.getElementById("remainingTasks").textContent=
total-done;

document.getElementById("progressPercent").textContent=
Math.round(done/total*100)+"%";

}

updateDashboard();

function resetCountdown(){

const now=new Date();

const reset=new Date();

reset.setHours(4,0,0,0);

if(now>reset){

reset.setDate(reset.getDate()+1);

}

const diff=reset-now;

const h=Math.floor(diff/1000/60/60);

const m=Math.floor(diff/1000/60)%60;

const s=Math.floor(diff/1000)%60;

document.getElementById("resetTimer").textContent=
`${h}h ${m}m ${s}s`;

}

setInterval(resetCountdown,1000);

resetCountdown();
