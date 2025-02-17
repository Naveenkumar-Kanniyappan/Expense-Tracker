let balance = document.getElementById("balance");
let income = document.querySelector(".income");
let expense = document.querySelector(".expense");
let historyList = document.querySelector(".history-list");

document.getElementById("add-transaction").addEventListener("click", () => {
    let name = document.getElementById("text").value.trim();
    let amount = parseFloat(document.getElementById("amount").value);

    if (name && !isNaN(amount) && amount !== 0) {
        let listItem = document.createElement("li");
        listItem.setAttribute("id","data-amount", amount);
        listItem.innerHTML = `
            <span>${name}</span>
            <span>${amount.toFixed(2)}</span>
            <div id=icone> 
                <i class="fas fa-trash delete-btn"></i>
            </div>
        `;

        historyList.appendChild(listItem);

        updateTotalAmount(amount);

        listItem.querySelector(".delete-btn").addEventListener("click", () => {
            let itemAmount = parseFloat(listItem.getAttribute("data-amount"));
            updateTotalAmount(-itemAmount);
            listItem.remove();
        });

        document.getElementById("text").value = "";
        document.getElementById("amount").value = "";
    } else {
        alert("Please enter valid text and amount");
    }
});

function updateTotalAmount(amount) {
    let currentBalance = parseFloat(balance.textContent.replace("$", "")) || 0;
    let currentIncome = parseFloat(income.textContent.replace("Income: $", "")) || 0;
    let currentExpense = parseFloat(expense.textContent.replace("Expense: $", "")) || 0;

    currentBalance += amount;

    if (amount > 0) {
        currentIncome += amount;
    } else {
        currentExpense += Math.abs(amount);
    }

    balance.textContent = `$${currentBalance.toFixed(2)}`;
    income.textContent = `Income: $${currentIncome.toFixed(2)}`;
    expense.textContent = `Expense: $${currentExpense.toFixed(2)}`;
}
