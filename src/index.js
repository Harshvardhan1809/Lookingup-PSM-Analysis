import * as fs from "fs";
import XLSX from "xlsx";
import intersection_calculator from "./intersection_calculator.js";

const unitPrice = 50;
const data = XLSX.readFile("PSMrawdata.csv");
let sheetData = data["Sheets"];
sheetData = sheetData["Sheet1"];
// console.log(sheetData);

const expensiveData = [];
const cheapData = [];
const tooExpensiveData = [];
const tooCheapData = [];

for (const [key, value] of Object.entries(sheetData)) {
  if (key[0] == "B" && value.t === "n") expensiveData.push(value.v);
  else if (key[0] == "C" && value.t === "n") cheapData.push(value.v);
  else if (key[0] == "D" && value.t === "n") tooExpensiveData.push(value.v);
  else if (key[0] == "E" && value.t === "n") tooCheapData.push(value.v);
}

const maxSamples = [];
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
console.log(scale);

// calculate the kaitouritsu for each type
const kaitouritsu_expensive = Array(scale.length).fill(0);
const kaitouritsu_cheap = Array(scale.length).fill(0);
const kaitouritsu_tooExpensive = Array(scale.length).fill(0);
const kaitouritsu_tooCheap = Array(scale.length).fill(0);

// calculate values for cheap
// console.log(cheapData)
for (let i = 0; i < sampleSize; i++) {
  for (let j = scale.length - 1; j >= 0; j--) {
    if (cheapData[i] >= scale[j]) kaitouritsu_cheap[j] += (1 / 36) * 100;
  }
}
// console.log("kaitouritsu_cheap", kaitouritsu_cheap);

// calculate values for expensive
// console.log(expensiveData)
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (expensiveData[i] <= scale[j])
      kaitouritsu_expensive[j] += (1 / 36) * 100;
  }
}
// console.log("kaitouritsu_expensive", kaitouritsu_expensive);

// calculate values for too cheap
// console.log(tooCheapData)
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (tooCheapData[i] >= scale[j]) kaitouritsu_tooCheap[j] += (1 / 36) * 100;
  }
}
// console.log("kaitouritsu_tooCheap", kaitouritsu_tooCheap);

// calculate values for too expensive
// console.log(tooExpensiveData)
for (let i = 0; i < sampleSize; i++) {
  for (let j = 0; j < scale.length; j++) {
    if (tooExpensiveData[i] <= scale[j])
      kaitouritsu_tooExpensive[j] += (1 / 36) * 100;
  }
}
// console.log("kaitouritsu_tooExpensive", kaitouritsu_tooExpensive);

// round the result of all kaitouritsu to 3 digits
for (let i = 0; i < scale.length; i++) {
  console.log("bc", kaitouritsu_cheap[i].toFixed(1))
  kaitouritsu_cheap[i] = Number(kaitouritsu_cheap[i].toFixed(1));
  kaitouritsu_tooCheap[i] = Number(kaitouritsu_tooCheap[i].toFixed(1));
  kaitouritsu_expensive[i] = Number(kaitouritsu_expensive[i].toFixed(1));
  kaitouritsu_tooExpensive[i] = Number(kaitouritsu_tooExpensive[i].toFixed(1));
}

console.log("kaitouritsu_cheap", kaitouritsu_cheap);
console.log("kaitouritsu_expensive", kaitouritsu_expensive);
console.log("kaitouritsu_tooCheap", kaitouritsu_tooCheap);
console.log("kaitouritsu_tooExpensive", kaitouritsu_tooExpensive);


// do the necessary exports
export {kaitouritsu_cheap, kaitouritsu_expensive, kaitouritsu_tooCheap, kaitouritsu_tooExpensive};
export {scale, sampleSize, unitPrice};


// finding the intersection of two lines
// since we want the intersection which leads to the minimum value, we add the both the arrays
// find the percentage which is smallest; that is the higher bound of the intersection range

// find the 理想価格 - too cheap and too expensive
let risouKakakuArray = [];
let risouKakaku = 0;
for(let i=0; i<kaitouritsu_tooCheap.length; i++){
    risouKakakuArray[i] = kaitouritsu_tooCheap[i] + kaitouritsu_tooExpensive[i];
}
let risouKakakuIndex = risouKakakuArray.indexOf(Math.min(...risouKakakuArray));
risouKakaku = intersection_calculator(risouKakakuIndex, kaitouritsu_tooCheap, kaitouritsu_tooExpensive, tooCheapData, tooExpensiveData);
console.log("risouKakakuArray", risouKakakuArray);


// find the 妥協価格 - cheap and expensive
let dakyouKakakuArray = [];
let dakyouKakaku = 0;
for(let i=0; i<kaitouritsu_cheap.length; i++){
    dakyouKakakuArray[i] = kaitouritsu_cheap[i] + kaitouritsu_expensive[i];
}
let dakyouKakakuIndex = dakyouKakakuArray.indexOf(Math.min(...dakyouKakakuArray));
dakyouKakaku = intersection_calculator(dakyouKakakuIndex, kaitouritsu_cheap, kaitouritsu_expensive, cheapData, expensiveData);
console.log("daikyouKakakuArray", dakyouKakakuArray);


// find the 最高価格 - cheap and too expensive
let saikouKakakuArray = [];
let saikouKakaku = 0;
for(let i=0; i<kaitouritsu_cheap.length; i++){
    saikouKakakuArray[i] = (kaitouritsu_cheap[i] + kaitouritsu_tooExpensive[i]);
}
let saikouKakakuIndex = saikouKakakuArray.indexOf(Math.min(...saikouKakakuArray));
saikouKakaku = intersection_calculator(saikouKakakuIndex, kaitouritsu_cheap, kaitouritsu_tooExpensive, cheapData, tooExpensiveData);
console.log("saikouKakakuArray", saikouKakakuArray);


// find the 最低品質保証価格 - too cheap and expensive
let saiteiKakakuArray = [];
let saiteiKakaku = 0;
for(let i=0; i<kaitouritsu_tooCheap.length; i++){
    saiteiKakakuArray[i] = kaitouritsu_tooCheap[i] + kaitouritsu_expensive[i];
}
let saiteiKakakuIndex = saiteiKakakuArray.indexOf(Math.min(...saiteiKakakuArray));
saiteiKakaku = intersection_calculator(saiteiKakakuIndex, kaitouritsu_tooCheap, kaitouritsu_expensive, tooCheapData, expensiveData);
console.log("saiteiKakakuArray", saiteiKakakuArray);


console.log("saiteikakaku", saiteiKakaku); // correct
console.log("saikoukakaku", saikouKakaku); // 293
console.log("dakyoukakaku", dakyouKakaku); // 279
console.log("risoukakaku", risouKakaku); // correct

// indices
// dakyou - 5
// risou - 4

// saitei - 4 
// saikou - 5