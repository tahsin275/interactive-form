const name = document.querySelector('#name');
const email = document.querySelector('#email');
const role = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
const tshirtSize = document.querySelector('#size');
const tshirtDesign = document.querySelector('#design');
const tshirtColor = document.querySelector('#color');
const activities = document.querySelector('#activities-box');
const activityCost = document.querySelector('#activities-cost');

window.addEventListener('load',()=>{
    name.focus();
    otherRole.style.display = 'none';
    tshirtColor.classList.add('disabled');
})

role.addEventListener('change',()=>{
    if(role.value == 'other'){
        otherRole.style.display = 'inline-block';
    } else {
        otherRole.style.display = 'none';
    }
})

tshirtDesign.addEventListener('change',() => {
    tshirtColor.classList.remove('disabled');
    // 
    const options = tshirtColor.children;
    for (let i = 0; i < options.length; i++){
        if(options[i].getAttribute('data-theme') != tshirtDesign.value){
            options[i].setAttribute('hidden','hidden');
        } else {
            options[i].removeAttribute('hidden');
        }
    }
})

let totalCost = 0;

activities.addEventListener('click', (e)=> {
    e.stopPropagation();
    if(e.target.tagName == 'INPUT'){
        if(e.target.checked){
            totalCost += parseInt(e.target.getAttribute('data-cost'));
            activityCost.innerText = totalCost;
            console.log(totalCost);
        } else {
            totalCost -= parseInt(e.target.getAttribute('data-cost'));
            activityCost.innerText = totalCost;
            console.log(totalCost);
        }
    }
})