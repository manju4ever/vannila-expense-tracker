const sign_map_class = {
    '+': 'credit',
    '-': 'debit',
};

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
