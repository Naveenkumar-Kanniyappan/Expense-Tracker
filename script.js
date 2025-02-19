let balance = document.getElementById("balance");
let  money_plus = document.getElementById("money-plus");
let  money_minus = document.getElementById("money-minus");
let  list = document.getElementById("list");
let  form = document.getElementById("form");
let  text = document.getElementById("text");
let  amount = document.getElementById("amount");

let transactions = [];

function addTransaction(event) {
    event.preventDefault();
    
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter text and amount');
        return;
    }

    let  transaction = {
        id: Math.floor(Math.random() * 1000000000),
        text: text.value,
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    addTransactionToList(transaction);
    updateValues();

    text.value = '';
    amount.value = '';
}

function addTransactionToList(transaction) {
    let  sign = transaction.amount < 0 ? "-" : "+";
    let  item = document.createElement("li");
    
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    
    item.innerHTML = `
        ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    
    list.appendChild(item);
}

function updateValues() {
    let  amounts = transactions.map(transaction => transaction.amount);

    let  total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    let  income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    let  expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

    balance.innerHTML = `₹${total}`;
    money_plus.innerHTML = `+₹${income}`;
    money_minus.innerHTML = `-₹${Math.abs(expense)}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    refreshUI();
}

function refreshUI() {
    list.innerHTML = "";
    transactions.forEach(addTransactionToList);
    updateValues();
}

refreshUI();

form.addEventListener('submit', addTransaction);
