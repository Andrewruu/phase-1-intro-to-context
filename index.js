/* Your Code Here */

let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(arrays){
    return arrays.map(function(newArray){
            return createEmployeeRecord(newArray)
        })
}

let createTimeInEvent = function(emp, dateTime){
    let [date,hours] = dateTime.split(' ')
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hours,10),
        date,
    })
    return emp
}
let createTimeOutEvent = function(emp,dateTime){
    let [date,hours] = dateTime.split(' ')
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hours,10),
        date,
    })
    return emp
}
let hoursWorkedOnDate = function(emp, day){
    let inTime = emp.timeInEvents.find(function(dateTime){
        return dateTime.date === day
    })
    let outTime = emp.timeOutEvents.find(function(dateTime){
        return dateTime.date === day
    })
    return (outTime.hour - inTime.hour)/100
}
let wagesEarnedOnDate = function(emp, day){
    let wage = hoursWorkedOnDate(emp, day)
        * emp.payPerHour
    return wage
}
let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(emp){
        return emp.firstName === firstName
      })
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function (memo, d) {
        return memo + allWagesFor(d)
    }, 0) 
}

let allWagesFor = function(emp){
    let eligibleDates = emp.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(emp, d)
    }, 0)

    return payable
}
