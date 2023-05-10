var XLSX = require("xlsx");
import intersection_calculator from "./intersection_calculator.js";
import range_finder from "./range_finder.js";
import max_data_value_calculator from "./max_data_value_calculator";
import { priceData, kaitouritsuData, kakakuIndex, kakaku, sheetRowData, sheetDataType, rowRSMData, rsmData, kaitouritsuAllData } from "./../utilities/types";
import price_finder from "./price_finder.js";

const expensiveData: priceData = [];
const cheapData: priceData = [];
const tooExpensiveData: priceData = [];
const tooCheapData: priceData = [];

// improvements - exploit type creation to the max, categorise data as rows, get rid of 4 function calls, rename objects in english

//// READ ALL DATA FROM CSV 
const unitPrice = 50;
const data = XLSX.readFile("PSMrawdata.csv");
let sheetData : sheetDataType = data["Sheets"]["Sheet1"];
console.log(sheetData);

const rsmData: rsmData = {
  data : [],
  risouKakaku : 0,
  dakyouKakaku : 0,
  saikouKakaku : 0,
  saiteiKakaku : 0
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
const kaitouritsuAllData : kaitouritsuAllData = {
  kaitouritsu_expensive: Array(scale.length).fill(0),
  kaitouritsu_cheap: Array(scale.length).fill(0),
  kaitouritsu_tooExpensive: Array(scale.length).fill(0),
  kaitouritsu_tooCheap: Array(scale.length).fill(0),
}

for (let i=0; i< sampleSize; i++){
  for(let j = scale.length-1; j>=0; j--){
    const {expensiveData: e, cheapData : c, tooExpensiveData : te,tooCheapData : tc} = rsmData["data"][i];
    if (c >= scale[j]) kaitouritsuAllData["kaitouritsu_cheap"][j] += (1 / sampleSize) * 100;
    if (e <= scale[j]) kaitouritsuAllData["kaitouritsu_expensive"][j] += (1 / sampleSize) * 100;
    if (tc >= scale[j]) kaitouritsuAllData["kaitouritsu_tooCheap"][j] += (1 / sampleSize) * 100;
    if (te <= scale[j]) kaitouritsuAllData["kaitouritsu_tooExpensive"][j] += (1 / sampleSize) * 100;
  }
}

// round the result of all kaitouritsu to 3 digits
for (let i = 0; i < scale.length; i++) {
  kaitouritsuAllData["kaitouritsu_cheap"][i] = Number(kaitouritsuAllData["kaitouritsu_cheap"][i].toFixed(1));
  kaitouritsuAllData["kaitouritsu_tooCheap"][i] = Number(kaitouritsuAllData["kaitouritsu_tooCheap"][i].toFixed(1));
  kaitouritsuAllData["kaitouritsu_expensive"][i] = Number(kaitouritsuAllData["kaitouritsu_expensive"][i].toFixed(1));
  kaitouritsuAllData["kaitouritsu_tooExpensive"][i] = Number(kaitouritsuAllData["kaitouritsu_tooExpensive"][i].toFixed(1));
}



// FIND ALL THE PRICES
const {risou: risouKakaku, dakyou: dakyouKakaku, saikou: saikouKakaku, saitei: saiteiKakaku} = price_finder(scale, kaitouritsuAllData);



console.log("saiteikakaku", saiteiKakaku); // correct 246
console.log("saikoukakaku", saikouKakaku); // 293
console.log("dakyoukakaku", dakyouKakaku); // 279
console.log("risoukakaku", risouKakaku); // correct 265
