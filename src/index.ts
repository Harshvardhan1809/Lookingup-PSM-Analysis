var XLSX = require("xlsx");
import max_data_value_calculator from "./max_data_value_calculator";
import { sheetRowData, sheetDataType, rowRSMData, rsmData, answerRateAllData, priceObject } from "./../utilities/types";
import price_finder from "./price_finder.js";


//// READ ALL DATA FROM CSV 
const unitPrice = 50;
const data = XLSX.readFile("PSMrawdata.csv");
let sheetData : sheetDataType = data["Sheets"]["Sheet1"];
console.log(sheetData);

const rsmData: rsmData = {
  data : [],
  idealPrice : 0,
  compromisePrice : 0,
  highestPrice : 0,
  lowestPrice : 0
}

let rowRSMData : rowRSMData = {
  expensiveData : 0,
  cheapData : 0,
  tooExpensiveData : 0,
  tooCheapData : 0,
};

for (let [key, val] of Object.entries(sheetData)) {
  let value: sheetRowData = sheetData[key];
  if (key[0] == "B" && value.t === "n") rowRSMData['expensiveData'] = value.v;
  else if (key[0] == "C" && value.t === "n") rowRSMData['cheapData'] = value.v;
  else if (key[0] == "D" && value.t === "n") rowRSMData['tooExpensiveData'] = value.v;
  else if (key[0] == "E" && value.t === "n"){ 
    rowRSMData['tooCheapData'] = value.v;
    rsmData['data'].push(rowRSMData);
    rowRSMData = {
      expensiveData : 0,
      cheapData : 0,
      tooExpensiveData : 0,
      tooCheapData : 0,
    };
  };
}


//// MAKE THE SCALE FOR THE X-AXIS
const maxValue = max_data_value_calculator(rsmData);
const sampleSize = rsmData["data"].length;
const scale: number[] = [];
for (let i = 1; i < maxValue / unitPrice + 1; i++) {
  scale.push(unitPrice * i);
}


// CALCULATE KAITOURITSU FOR EACH TYPE
const answerRateData : answerRateAllData = {
  answerRateExpensive: Array(scale.length).fill(0),
  answerRateCheap: Array(scale.length).fill(0),
  answerRateTooExpensive: Array(scale.length).fill(0),
  answerRateTooCheap: Array(scale.length).fill(0),
}

for (let i=0; i< sampleSize; i++){
  for(let j = scale.length-1; j>=0; j--){
    const {expensiveData: e, cheapData : c, tooExpensiveData : te,tooCheapData : tc} = rsmData["data"][i];
    if (c >= scale[j]) answerRateData["answerRateCheap"][j] += (1 / sampleSize) * 100;
    if (e <= scale[j]) answerRateData["answerRateExpensive"][j] += (1 / sampleSize) * 100;
    if (tc >= scale[j]) answerRateData["answerRateTooCheap"][j] += (1 / sampleSize) * 100;
    if (te <= scale[j]) answerRateData["answerRateTooExpensive"][j] += (1 / sampleSize) * 100;
  }
}

// round the result of all kaitouritsu to 3 digits
for (let i = 0; i < scale.length; i++) {
  answerRateData["answerRateCheap"][i] = Number(answerRateData["answerRateCheap"][i].toFixed(1));
  answerRateData["answerRateTooCheap"][i] = Number(answerRateData["answerRateTooCheap"][i].toFixed(1));
  answerRateData["answerRateExpensive"][i] = Number(answerRateData["answerRateExpensive"][i].toFixed(1));
  answerRateData["answerRateTooExpensive"][i] = Number(answerRateData["answerRateTooExpensive"][i].toFixed(1));
}


// FIND ALL THE PRICES
const prices : priceObject = price_finder(scale, answerRateData);
const {idealPrice: ideal, compromisePrice: compromise, highestPrice: highest, lowestPrice: lowest} = prices;
console.log("lowestPrice", lowest); // correct 246
console.log("highestPrice", highest); // 293
console.log("compromisePrice", compromise); // 279
console.log("idealPrice", ideal); // correct 265
