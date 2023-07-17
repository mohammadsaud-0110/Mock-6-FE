const URL = '';

let title = "";
let description = "";
let totalQue = 0;
let allQuestions = [];

let QueEnterDiv = document.querySelector("#QueForm");

let startBuild = document.querySelector("#startBuild");
startBuild.addEventListener("click", (e) => {
    e.preventDefault();
    title = document.querySelector("#title").value;
    description = document.querySelector("#description").value;
    totalQue = document.querySelector("#numQue").value;
    if(title == "" || description == "" || totalQue == "" || totalQue < 1 || totalQue > 20){
        alert("Enter Proper and Valid Details");
    }
    else{
        document.querySelector("#title").style.cursor = "none";
        document.querySelector("#description").style.cursor = "none";
        document.querySelector("#numQue").style.cursor = "none";
        document.querySelector("#startBuild").style.cursor = "none";
        appendInputBox();
    }
})

function appendInputBox(){
    let inputBoxes = '';
    for (let i = 1; i <= totalQue; i++) {
        inputBoxes += `
                <div class="ques" id="que${i}">
                    <input type="text" id="title${i}" placeholder="Enter Question Number ${i}" >
                    <input type="text" id="opt1${i}" placeholder="Enter Option 1">
                    <input type="text" id="opt2${i}" placeholder="Enter Option 2">
                    <input type="text" id="opt3${i}" placeholder="Enter Option 3">
                    <input type="text" id="opt4${i}" placeholder="Enter Option 4">
                    <input type="text" id="ans${i}" placeholder="Enter Correct option/s separated by commas (,) ">
                    <button id='addQue${i}' onclick=" addQue(event,${i})">Add</button>
                </div>
            `;
    }
    // inputBoxes += `<input id="submit" type="submit" value="Create">`
    QueEnterDiv.innerHTML = inputBoxes;
}

function addQue(e,i){
    e.preventDefault();
    let qtitle = document.querySelector(`#title${i}`).value;
    let opt1 = document.querySelector(`#opt1${i}`).value;
    let opt2 = document.querySelector(`#opt2${i}`).value;
    let opt3 = document.querySelector(`#opt3${i}`).value;
    let opt4 = document.querySelector(`#opt4${i}`).value;
    let ans = document.querySelector(`#ans${i}`).value;
    if(qtitle.value = "" || opt1 == "" || opt2 == "" || opt3 == "" || opt4 == "" || ans == ""){
        alert("Enter Questions Details");
    }
    else{
        console.log(qtitle,opt1,opt2,opt3,opt4,ans);
        ans = ans.trim().split(",");
        for(let j=0; j < ans.length; j++){
            ans[j] = ans[j].trim();
        }
        let newQue = {
            title: qtitle,
            answerOptions: [opt1, opt2, opt3, opt4],
            correctOptions: ans
        }
        console.log(newQue);
        allQuestions.push(newQue);
    }
    
}


let postQuiz = document.querySelector("#postQuiz");
postQuiz.addEventListener("click", async (e)=>{
    e.preventDefault();
    let obj = {
        creator: localStorage.getItem("userEmail"),
        title,
        description,
        questions: allQuestions
    }
    await fetch(`${URL}/quiz/createQuiz`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
    .then((res) => {
        return res.json();
    })
    .then((data)=>{
        alert(data.msg);
        window.location.href = "./dashboard.html";
    })
    .catch((err)=>alert(err.message));
})
