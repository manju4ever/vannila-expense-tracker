const short_month = [
    'jan', 'feb', 'mar', 
    'apr', 'may', 'jun', 
    'jul', 'aug', 'sep', 
    'oct', 'nov', 'dev'
];

const long_month = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'Novemember', 'December',
]

const getMonthInText = (digit, short = true) => {
    if(short) return short_month[digit];
    return long_month[digit];
}

function getTxFormattedDate(dateStr) {
   const day = new Date(dateStr);
   return `${day.getDate()}.${getMonthInText(day.getMonth()).toUpperCase()}.${day.getFullYear()}`;
}



