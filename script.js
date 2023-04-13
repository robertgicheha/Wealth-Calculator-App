 const main = document.getElementById('main');
 const addUserBtn = document.getElementById('add-user');
 const doubleBtn = document.getElementById('double');
 const showMillionairesBtn = document.getElementById('show-millionaires');
 const sortBtn= document.getElementById('sort');
 const calculateWealthBtn = document.getElementById('calculate-wealth');

 const data = [];

 getRandomUser();
 getRandomUser();
 getRandomUser();

 //fetch random user and add money

 async function getRandomUser (){
   const res =  await  fetch('');
   const data =  await res.json();

  console.log(data); 
        

  const user = data.results[0];
//   console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
     console.log(newUser);

     addData(newUser);
 }
//double every user's money
function doubleMoney() {
  data = data.map((user) => {
    return {...user, money: user.money * 2}
  });

  updateDOM();
}

//sort users by richest
function sortByRichest() {
  data.sort((a, b => b.money - a.money));
 
   updateDOM();
}

//Only show millionaires
function showMillionaires() {
 data =  data.filter(user => user.money > 1000000);
}

//Calculate Total wealth
function calculateWealth() {
  const wealth = data.reduce((acc , user => acc += user.money), 0);

  // console.log(wealth);
  // console.log(formatMoney(wealth));
  
  const wealthEL = document.createElement('div');

  wealthEL.innerHTML = `<h3>Total Wealth:  <strong>${formatMoney(wealth)}</stong></h3>`

  main.appendChild(wealthEL);



}

 //add a new object to the data array

 function addData (obj){
    data.push(obj);

    updateDOM();
 }

 //Update DOM and display data

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

  providedData.forEach(item =>{
     const element = document.createElement('div');
     element.classList.add('person');
     element.innerHTML = `<strong>${item.name}</strong> ${ formatMoney(item.money)}`;
     main.appendChild(element);
  })
    
}

//format number as money

function formatMoney (number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click' , getRandomUser);
doubleBtn.addEventListener ('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);