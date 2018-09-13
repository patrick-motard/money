var moment = require('moment');
var Table = require('cli-table2');
// var dailyInterest = 6000 * (0.2436 / 365) * 31;

function days(year, month) {
    var days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    return days;
}

function interest(principal, interestRate, daysSincePayment) {
    return Math.round((principal *( interestRate / 365) * daysSincePayment) * 100) / 100
}

module.exports = () => {

    const table = new Table({
        head: ['date', 'days', 'payment', 'interest', 'principal paid', 'principal' ]
    });
    var p = 6000; // principal
    var m = 11; // first month - 1 (11 = december, 0 = january)
    var y = 2012; // first year
    var r = 0.2436; // interest rate
    var smp = 173.86; // standar monthly payment

    while (p > 0) {
        m++
        var monthName = moment().month(m-1).format('MMM');
        var d = days(y,m);
        var i = interest(p, r, d);
        smp > p ? smp = p : smp = smp;
        p = p + i - smp;
        p <= 1 ? p = 0 : p = p;
        var pp = smp - i;
        table.push([ 
            `${monthName}(${m}) ${y}`
            , d 
            , smp.toFixed(2)
            , i.toFixed(2)
            , pp.toFixed(2)
            , p.toFixed(2)
        ]);

        if (m===12) {
            y = y+1;
            m = 0
        }
    }

    return table.toString();
}

console.log(module.exports());
