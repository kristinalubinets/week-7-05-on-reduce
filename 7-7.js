/************************************  1662. Check If Two String Arrays are Equivalent ************************************/

/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
*/
var arrayStringsAreEqual = function(word1, word2) {
    return word1.join('') === word2.join('');
};
//Runtime: 86 ms, faster than 54.77% of JavaScript online submissions for Check If Two String Arrays are Equivalent.


/***** Using forEach method *****/

var arrayStringsAreEqual = function(word1, word2) {
    let a = '';
    let b = '';
    
    word1.forEach(el => a += el);
    word2.forEach(el => b += el);
    
    return a === b;
};
//Runtime: 96 ms, faster than 36.26% of JavaScript online submissions for Check If Two String Arrays are Equivalent.



/*****************************************  Own implementation of reduce method ****************************************/

const reduceAr = [3, 5, 2, 7];

Array.prototype.myReduce = function (callback, initialValue) {

  var previousValue = 0;
  var currentValue = 0;

  if(!initialValue) 
    currentValue = 1;
  
  if(initialValue) 
    previousValue = initialValue;
  
  previousValue = this[previousValue];

  for (let i = 1; i < this.length; i++) {

    previousValue = callback(previousValue, this[currentValue++]);
    console.log('sum=' + sum);
  } 
  return sum;
}

const r = reduceAr.myReduce( (a,b) => a + b);
console.log('r=' + r);



/*****************************************  Sum object's values ****************************************/

function myFunction(obj) {
    return Object.values(obj).reduce( (sum, cur) => sum + cur, 0);
}



/*************************************  Swap object keys and values ***********************************/

function myFunction(obj) {
   
    let keyArr = Object.keys(obj);
    let valuesArr = Object.values(obj);
    let newObj = {};

    for( let i = 0; i < keyArr.length; i++) {
        newObj[valuesArr[i]] = keyArr[i]
    }
  return newObj;
}

myFunction({z:'a',y:'b',x:'c',w:'d'});  //Expected: {a:'z',b:'y',c:'x',d:'w'}



/*********************************  Convert array to object with counter *******************************/

function countOccur (arr) {
    let obj = {};
    arr.forEach( el => obj[el] = obj[el] ? obj[el] + 1 : 1  );
    return obj;
}

countOccur([1,2,2,3]);   //Expected: {1:1,2:2,3:1}



/****************************************  Richest Customer Wealth  **************************************/

/**
 * @param {number[][]} accounts
 * @return {number}
*/
var maximumWealth = function(accounts) {
  return  accounts.reduce( (wealthMax, client) => { 
    let currClientWealth =  client.reduce( (sum, balance) => sum + balance, 0);
      return Math.max(wealthMax, currClientWealth)}, 0)
};



/****************************************  Convert Objects to Arrays  **************************************/

function toArray(obj) {
  return Object.entries(obj);
}

console.log(toArray({ shrimp: 15, tots: 12 }));

/******* or ******/

function myEntries(obj) {
  let arr = [];

  for(let i in obj) {
    let inner = [];

    if(i) {
      inner.push(i);
      inner.push(obj[i]);
    }
    arr.push(inner);
  }
  return arr;
}

console.log(myEntries({ a: 1, b: 2 })) //Expected: [["a", 1], ["b", 2]]



/****************************************  JavaScript / Factory Sensors  **************************************/

// @ts-check

export class ArgumentError extends Error {}

export class OverheatingError extends Error {
  constructor(temperature) {
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

/**
 * Check if the humidity level is not too high.
 *
 * @param {number} humidityPercentage
 * @throws {Error}
 */
export function checkHumidityLevel(humidityPercentage) {  
  if (humidityPercentage > 70) throw new Error('Humidity level is above 70%!');
}

/**
 * Check if the temperature is not too high.
 *
 * @param {number|null} temperature
 * @throws {ArgumentError|OverheatingError}
 */
export function reportOverheating(temperature) {
  if(temperature > 500) throw new OverheatingError(temperature);
  if(temperature === null) throw new ArgumentError('The sensor is broken!');
}

/**
 *  Triggers the needed action depending on the result of the machine check.
 *
 * @param {{
 * check: function,
 * alertDeadSensor: function,
 * alertOverheating: function,
 * shutdown: function
 * }} actions
 * @throws {ArgumentError|OverheatingError|Error}
 */
export function monitorTheMachine(actions) {

  try {
    actions.check();
  } catch (error) {
    if (error instanceof ArgumentError) {
      actions.alertDeadSensor();
    }
   else if (error instanceof OverheatingError) {
      if(error.temperature < 600) actions.alertOverheating(error.temperature);
      if(error.temperature > 600) actions.shutdown();
    }
    else throw error;
  }
}