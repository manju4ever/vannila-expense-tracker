const getCurrentMonthExpense = () => {
    const current_month = new Date().getMonth();
    return my_tx_data
        .filter(record => (new Date(record.tx_date).getMonth() === current_month))
        .filter(record => record.tx_type > 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0)
        .toLocaleString();
}

const getTodaysExpense = () => {
    const today = new Date();
    return my_tx_data
    .filter(eachDay => eachDay.tx_type > 0)
    .filter(eachDay => new Date(eachDay.tx_date).getDate() === today.getDate())
    .reduce((cost, record) => cost + parseFloat(record.tx_amt), 0)
    .toLocaleString();
}

const getCashBalance = () => {
    const overall_bal = my_tx_data
        .filter(record => record.tx_type === 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0);

    const total_expense = my_tx_data
        .filter(record => record.tx_type > 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0);
    
    return parseFloat(overall_bal - total_expense).toLocaleString();
}

function updateMonthlySpendUI() {
    document.querySelector("#month_label").innerHTML = getMonthInText(new Date().getMonth(), false) + " Expense(s)";
    document.querySelector("#amt_monthly_spend").innerHTML = "₹ " + getCurrentMonthExpense();
}

function updateTodaySpendUI() {
    const elem = document.querySelector("#amt_todays_spend");
    elem.innerHTML = "₹ " + getTodaysExpense();
}

function updateCashAvailableUI() {
    const elem = document.querySelector("#amt_cash_available");
    elem.innerHTML = "₹ " + getCashBalance();
}

function render() {
    updateMonthlySpendUI();
    updateTodaySpendUI();
    updateCashAvailableUI();
    renderHistoryListUI();
}

document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});

document.querySelector("#spend_itemize_btn").addEventListener("click", () => {
    const 
        spend_date = new Date(),
        spend_category = parseInt(document.querySelector("#spend_cat_actual").value),
        spend_amt = parseFloat(document.querySelector("#spend_amt_actual").value);
    
    console.log(spend_date, spend_category, spend_amt);

    my_tx_data.push({
        tx_date: spend_date,
        tx_amt: spend_amt,
        tx_type: spend_category
    });
    render();
});

render();