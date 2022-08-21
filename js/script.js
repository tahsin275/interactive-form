// Caching the dom elements
const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const role = document.querySelector('#title');
const otherRole = document.querySelector('#other-job-role');
const tshirtSize = document.querySelector('#size');
const tshirtDesign = document.querySelector('#design');
const tshirtColor = document.querySelector('#color');
const activities = document.querySelector('#activities-box');
const activityCost = document.querySelector('#activities-cost');
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// OnLoad functionality (manipulating the form using javascript)
window.addEventListener('load',()=>{
    name.focus();
    otherRole.style.display = 'none';
    tshirtColor.classList.add('disabled');
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
    const payments = paymentMethod.children;
    payments[1].setAttribute('selected','selected');
})

role.addEventListener('change',()=>{
    if(role.value == 'other'){
        otherRole.style.display = 'inline-block';
    } else {
        otherRole.style.display = 'none';
    }
})

// Selecting T-Shirt design (filtering color based on the t-shirt type)
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

// Calculating total cost of activity
let totalCost = 0;
let totalActivity = 0;

activities.addEventListener('click', (e)=> {
    e.stopPropagation();
    if(e.target.tagName == 'INPUT'){
        if(e.target.checked){
            totalCost += parseInt(e.target.getAttribute('data-cost'));
            activityCost.innerHTML = `Total: $${totalCost}`;
            console.log(totalCost);
            totalActivity++;
        } else {
            totalCost -= parseInt(e.target.getAttribute('data-cost'));
            activityCost.innerHTML = `Total: $${totalCost}`;
            console.log(totalCost);
            totalActivity--;
        }
    }
})

// Selecting payment method (one payment method at a time)
paymentMethod.addEventListener('change',(e)=>{
    const payment = e.target.value;
    if (payment == 'paypal'){
        paypal.style.display = 'block';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (payment == 'bitcoin') {
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'block';
    } else {
        paypal.style.display = 'none';
        creditCard.style.display = 'block';
        bitcoin.style.display = 'none';
    }
})

// Form validation

// Name Validation
function validateName(el){
    const hint = document.querySelector('#name-hint.hint');
    const name = el.value.trim();
    if(name.length == 0){
        console.log('Please enter a valid name');
        hint.style.display = 'block';
        el.parentNode.className = 'not-valid error-border';
    } else {
        console.log('name validated')
        hint.style.display = 'none';
        el.parentNode.className = 'valid';
    }
}

// Email Validation
function validateEmail(el){
    const hint = document.querySelector('#email-hint.hint');
    const email = el.value.trim();
    if(email.length == 0){
        console.log('Please enter a valid email');
        hint.style.display = 'block';
        el.parentNode.className = 'not-valid error-border';
    } else if (!email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        console.log('Please enter a valid email');
        hint.style.display = 'block';
        el.parentNode.className = 'not-valid error-border';
    } else {
        console.log('email validated')
        hint.style.display = 'none';
        el.parentNode.className = 'valid';
    }

}

// Activity Validation
function validateActivity(el){
    const hint = document.querySelector('#activities-hint.hint');
    if(totalActivity > 0){
        activities.className = 'activities-box valid';
        hint.style.display = 'none';
    } else {
        activities.className = 'activities-box not-valid error-border';
        hint.style.display = 'block';
    }
}

// Credit Card Validation
function validateCreditCard(el){
    if(el.value == 'credit-card'){
        const cardNumber = document.querySelector('#cc-num');
        const cardHint = document.querySelector('#cc-hint.hint');
        const zip = document.querySelector('#zip');
        const zipHint = document.querySelector('#zip-hint.hint');
        const cvv = document.querySelector('#cvv');
        const cvvHint = document.querySelector('#cvv-hint.hint');
        if(cardNumber.value.length < 13 || cardNumber.value.length > 16){
            cardHint.style.display = 'block';
            cardNumber.parentNode.className = 'not-valid error-border';
        } else {
            cardHint.style.display = 'none';
            cardNumber.parentNode.className = 'valid';
        }
        if(zip.value.length != 5){
            zipHint.style.display = 'block';
            zip.parentNode.className = 'not-valid error-border';
        } else {
            zipHint.style.display = 'none';
            zip.parentNode.className = 'valid';
        }
        if(cvv.value.length != 3){
            cvvHint.style.display = 'block';
            cvv.parentNode.className = 'not-valid error-border';
        } else {
            cvvHint.style.display = 'none';
            cvv.parentNode.className = 'valid';
        }
    }
}

// Form submit
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    validateName(name);
    validateEmail(email);
    validateActivity(activities);
    validateCreditCard(paymentMethod);
})