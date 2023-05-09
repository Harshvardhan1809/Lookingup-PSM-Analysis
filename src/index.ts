var XLSX = require("xlsx");
import intersection_calculator from "./intersection_calculator.js";
import range_finder from "./range_finder.js";
import 

//// READ ALL DATA FROM CSV 
const unitPrice = 50;
const data = XLSX.readFile("PSMrawdata.csv");
let sheetData = data["Sheets"];
sheetData = sheetData["Sheet1"];

const expensiveData: number[] = [];
const cheapData: number[] = [];
const tooExpensiveData: number[] = [];
const tooCheapData: number[] = [];

for (let [key, val] of Object.entries(sheetData)) {
  let value = sheetData[key];
  if (key[0] == "B" && value.t === "n") expensiveData.push(value.v);
  else if (key[0] == "C" && value.t === "n") cheapData.push(value.v);
  else if (key[0] == "D" && value.t === "n") tooExpensiveData.push(value.v);
  else if (key[0] == "E" && value.t === "n") tooCheapData.push(value.v);
}


//// MAKE THE SCALE FOR THE X-AXIS
const maxSamples: number[] = [];
// maxSamples finds the max input value to create the scale
maxSamples.push(Math.max(...expensiveData));
maxSamples.push(Math.max(...cheapData));
maxSamples.push(Math.max(...tooExpensiveData));
maxSamples.push(Math.max(...tooCheapData));

const maxValue = Math.max(...maxSamples);
const sampleSize = expensiveData.length;

// next step: create X-axis 0 to maxValue with unit as 50yen // cheap - 50, ..... 600
// kaitouritsu:
const scale = [];
for (let i = 1; i < maxValue / unitPrice + 1; i++) {
  scale.push(unitPrice * i);
}



// CALCULATE KAITOURITSU FOR EACH TYPE
const kaitouritsu_expensive = Array(scale.length).fill(0);
const kaitouritsu_cheap = Array(scale.length).fill(0);
const kaitouritsu_tooExpensive = Array(scale.length).fill(0);
const kaitouritsu_tooCheap = Array(scale.length).fill(0);
// calculate values for cheap
for (let i = 0; i < sampleSize; i++) {
  for (let j = scale.length - 1; j >= 0; j--) {
    if (cheapData[i] >= scale[j]) kaitouritsu_cheap[j] += (1 / 36) * 100;
  }
}
// calculate values for expensive
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (expensiveData[i] <= scale[j])
      kaitouritsu_expensive[j] += (1 / 36) * 100;
  }
}
// calculate values for too cheap
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (tooCheapData[i] >= scale[j]) kaitouritsu_tooCheap[j] += (1 / 36) * 100;
  }
}
// calculate values for too expensive
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (tooExpensiveData[i] <= scale[j])
      kaitouritsu_tooExpensive[j] += (1 / 36) * 100;
  }
}

// round the result of all kaitouritsu to 3 digits
for (let i = 0; i < scale.length; i++) {
  kaitouritsu_cheap[i] = Number(kaitouritsu_cheap[i].toFixed(1));
  kaitouritsu_tooCheap[i] = Number(kaitouritsu_tooCheap[i].toFixed(1));
  kaitouritsu_expensive[i] = Number(kaitouritsu_expensive[i].toFixed(1));
  kaitouritsu_tooExpensive[i] = Number(kaitouritsu_tooExpensive[i].toFixed(1));
}



// find the 理想価格 - too cheap and too expensive
let risouKakakuIndex = range_finder(scale, kaitouritsu_tooCheap, kaitouritsu_tooExpensive);
let risouKakaku = intersection_calculator(risouKakakuIndex, scale, kaitouritsu_tooCheap, kaitouritsu_tooExpensive);

// find the 妥協価格 - cheap and expensive

let dakyouKakakuIndex = range_finder(scale, kaitouritsu_cheap, kaitouritsu_expensive);
let dakyouKakaku = intersection_calculator(dakyouKakakuIndex, scale, kaitouritsu_cheap, kaitouritsu_expensive);

// find the 最高価格 - cheap and too expensive
let saikouKakakuIndex = range_finder(scale, kaitouritsu_cheap, kaitouritsu_tooExpensive);
let saikouKakaku = intersection_calculator(saikouKakakuIndex, scale, kaitouritsu_cheap, kaitouritsu_tooExpensive);

// find the 最低品質保証価格 - too cheap and expensive
let saiteiKakakuIndex = range_finder(scale, kaitouritsu_tooCheap, kaitouritsu_expensive);
let saiteiKakaku = intersection_calculator(saiteiKakakuIndex, scale, kaitouritsu_tooCheap, kaitouritsu_expensive);



console.log("saiteikakaku", saiteiKakaku); // correct 246
console.log("saikoukakaku", saikouKakaku); // 293
console.log("dakyoukakaku", dakyouKakaku); // 279
console.log("risoukakaku", risouKakaku); // correct 265
