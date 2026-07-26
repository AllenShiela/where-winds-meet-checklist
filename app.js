// ===================================
// WHERE WINDS MEET CHECKLIST
// Version 1.0
// ===================================

const checkboxes = document.querySelectorAll(".taskCheck");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const resetTime = document.getElementById("resetTime");

const STORAGE_KEY = "wwm-daily-checklist";
const DATE_KEY = "wwm-last-date";

// ----------------------
// Daily Reset
// ----------------------

function today() {
    return new Date().toDateString();
}

function checkReset() {
    const lastDate = localStorage.getItem(DATE_KEY);

    if (lastDate !== today()) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(DATE_KEY, today());
    }
}

// ----------------------
// Save
// ----------------------

function saveChecklist() {

    const data = [];

    checkboxes.forEach(box => {
        data.push(box.checked);
    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// ----------------------
// Load
// ----------------------

function loadChecklist() {

    const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

    if (!saved) return;

    checkboxes.forEach((box,index)=>{

        if(saved[index]){
            box.checked=true;
        }

    });

}

// ----------------------
// Progress
// ----------------------

function updateProgress(){

    const total = checkboxes.length;

    let complete = 0;

    checkboxes.forEach(box=>{

        if(box.checked){
            complete++;
        }

    });

    const percent = (complete/total)*100;

    progressFill.style.width =
        percent + "%";

    progressText.innerHTML =
        complete + " / " + total + " Completed";

}

// ----------------------
// Reset Countdown
// ----------------------

function updateResetClock(){

    const now = new Date();

    const tomorrow = new Date();

    tomorrow.setDate(now.getDate()+1);

    tomorrow.setHours(0,0,0,0);

    const diff = tomorrow-now;

    const hrs=Math.floor(diff/1000/60/60);

    const mins=Math.floor((diff/1000/60)%60);

    resetTime.innerHTML=
    hrs+"h "+mins+"m until reset";

}

checkboxes.forEach(box=>{

    box.addEventListener("change",()=>{

        saveChecklist();

        updateProgress();

    });

});

checkReset();

loadChecklist();

updateProgress();

updateResetClock();

setInterval(updateResetClock,60000);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js");
    });
}
