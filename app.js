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

function createHistoryItemUI({ tx_date, tx_type, tx_amt }) {
    const spend_date_elem = document.createElement('div'),
          spend_type_elem = document.createElement('div'),
          spend_amount_elem = document.createElement('div');    
    spend_date_elem.className = "spend_date";
    spend_type_elem.className = "spend_type";
    
    const spend_sign = tx_type == 0 ? '+' : '-';

    spend_date_elem.innerHTML = getTxFormattedDate(tx_date);
    spend_type_elem.innerHTML = tx_type_map[tx_type];
    spend_amount_elem.innerHTML = spend_sign + " ₹" + parseFloat(tx_amt).toLocaleString();
    spend_amount_elem.className = sign_map_class[spend_sign] + " " + "spend_amount";

    return [spend_date_elem, spend_type_elem, spend_amount_elem];
}

function renderHistoryListUI() {
    const spend_history_container = document.querySelector("#spend_history_list_container");
    spend_history_container.innerHTML = "";
    const spend_history_ul = document.createElement("ul");
    const all_history_items = my_tx_data
    .sort((a, b) => +(new Date(b.tx_date)) - +(new Date(a.tx_date)))
    .map(record => {
        const spend_history_item_li = document.createElement("li");
        spend_history_item_li.className = "spend_history_item";
        const history_item_ui = createHistoryItemUI(record);
        history_item_ui.forEach(elem => {
            spend_history_item_li.appendChild(elem);
        });
        return spend_history_item_li;
    });
    all_history_items.forEach(elem => {
        spend_history_ul.appendChild(elem);
    });
    spend_history_container.append(spend_history_ul);
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
}

document.querySelector("#spend_itemize_btn").addEventListener("click", () => {
    const spend_date = new Date(),
        spend_category = parseInt(document.querySelector("#spend_cat_actual").value),
        spend_amt = parseFloat(document.querySelector("#spend_amt_actual").value);

    my_tx_data.push({
        tx_date: spend_date,
        tx_amt: spend_amt,
        tx_type: spend_category
    });
    render();
});

// Let the magic begin
render();