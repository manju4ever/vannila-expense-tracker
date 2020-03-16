const sign_map_class = {
    '+': 'credit',
    '-': 'debit',
};

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
