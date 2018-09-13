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

    function row(year, month, principal, interestRate) {

        var monthName = moment().month(month-1).format('MMM');
        var d = days(year,month)
        var i = interest(principal, interestRate, d)
        return [ 
            `${monthName} ${month}`
            , d 
            , 173.86
            , i
        ]
    }

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    var p = 6000;
    var m = 0;
    var y = 2018;
    var r = 0.2436;
    var smp = 173.86;

    while (p > 0) {
        m++
        var monthName = moment().month(m-1).format('MMM');
        var d = days(y,m)
        var i = interest(p, r, d)
        var pp = smp - i;
        p = p + i - smp;
        p <= 0 ? p = 0 : p = p;
        table.push([ 
            `${monthName} ${m}`
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

    console.log(table.toString());
}
