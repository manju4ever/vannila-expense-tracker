const getCurrentMonthExpense = () => {
    const current_month = new Date().getMonth();
    return my_tx_data
        .filter(record => (new Date(record.tx_date).getMonth() === current_month))
        .filter(record => record.tx_type > 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0)
        .toLocaleString();
}

const getRateChangeForMonth = () => {
    const 
        current_month = new Date().getMonth(),
        last_month = current_month - 1;
    const current_month_expense = my_tx_data
        .filter(record => (new Date(record.tx_date).getMonth() === current_month))
        .filter(record => record.tx_type > 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0)
    const last_month_expense = my_tx_data
        .filter(record => (new Date(record.tx_date).getMonth() === last_month))
        .filter(record => record.tx_type > 0)
        .reduce((cost, record) =>  cost + parseFloat(record.tx_amt), 0)
    return (((current_month_expense - last_month_expense) / (current_month_expense + last_month_expense)) * 100).toFixed(2);
}

const getRateChangeForDay = () => {
    const today = new Date();
    const records_of_this_month = my_tx_data.filter(record => (new Date(record.tx_date)).getMonth() === today.getMonth());
    const current_day_expense = records_of_this_month
        .filter(record => (new Date(record.tx_date).getDate()) === today.getDate())
        .filter(record => record.tx_type > 0)
        .reduce((cost, rec) => cost + parseFloat(rec.tx_amt), 0);
    const last_day_expense = records_of_this_month
        .filter(record => (new Date(record.tx_date).getDate()) === today.getDate() - 1)
        .filter(record => record.tx_type > 0)
        .reduce((cost, rec) => cost + parseFloat(rec.tx_amt), 0);  
    return (((current_day_expense - last_day_expense) / last_day_expense) * 100).toFixed(2);
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
const up = '↑', down = '↓';
const sign_class_map = {
    [up]: 'credit',
    [down] : 'debit'
};
function updateMonthlySpendUI() {
    document.querySelector("#month_label").innerHTML = getMonthInText(new Date().getMonth(), false) + " Expense(s)";
    document.querySelector("#amt_monthly_spend").innerHTML = "₹ " + getCurrentMonthExpense();
    const monthly_change = getRateChangeForMonth();
    document.querySelector("#monthly_change_rate").innerHTML = (monthly_change < 0 ? down + monthly_change : up + monthly_change) + "%";
    document.querySelector("#monthly_change_rate").className = monthly_change < 0 ? 'credit' : 'debit';
}

function updateTodaySpendUI() {
    const elem = document.querySelector("#amt_todays_spend");
    elem.innerHTML = "₹ " + getTodaysExpense();
    const daily_change = getRateChangeForDay();
    document.querySelector("#day_change_rate").innerHTML = (daily_change < 0 ? down + daily_change : up + daily_change) + "%";
    document.querySelector("#day_change_rate").className = daily_change < 0 ? 'credit' : 'debit';
}

function updateCashAvailableUI() {
    const elem = document.querySelector("#amt_cash_available");
    elem.innerHTML = "₹ " + getCashBalance();
}

document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});


function render() {
    updateMonthlySpendUI();
    updateTodaySpendUI();
    updateCashAvailableUI();
    renderHistoryListUI();
    console.log(getRateChangeForMonth(), getRateChangeForDay());
}

render();

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