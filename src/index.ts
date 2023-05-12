import maxDataValueCalculator from "./maxDataValueCalculator";
import priceFinder from "./priceFinder.js";
import answerRateCalculator from "./answerRateCalculator";

import {
	type SheetRowData,
	type SheetDataType,
	RowPsmData,
	PsmData,
	type AnswerRateAllData,
	type PriceObject,
} from "./../utilities/types";

const XLSX = require("xlsx");

//// READ ALL DATA FROM CSV
const unitPrice = 50;
const data = XLSX.readFile("PSMrawdata.csv");
const sheetData: SheetDataType = data.Sheets.Sheet1;
// console.log(sheetData);

const psmData: PsmData = {
	data: [],
	idealPrice: 0,
	compromisePrice: 0,
	highestPrice: 0,
	lowestPrice: 0,
};

let rowPsmData: RowPsmData = {
	expensiveData: 0,
	cheapData: 0,
	tooExpensiveData: 0,
	tooCheapData: 0,
};

for (const [key] of Object.entries(sheetData)) {
	const value: SheetRowData = sheetData[key];
	if (key[0] === "B" && value.t === "n") rowPsmData.expensiveData = value.v;
	else if (key[0] === "C" && value.t === "n") rowPsmData.cheapData = value.v;
	else if (key[0] === "D" && value.t === "n") rowPsmData.tooExpensiveData = value.v;
	else if (key[0] === "E" && value.t === "n") {
		rowPsmData.tooCheapData = value.v;
		psmData.data.push(rowPsmData);
		rowPsmData = {
			expensiveData: 0,
			cheapData: 0,
			tooExpensiveData: 0,
			tooCheapData: 0,
		};
	}
}

/// / MAKE THE SCALE FOR THE X-AXIS
const maxValue = maxDataValueCalculator(psmData);
const sampleSize = psmData.data.length;
const scale: number[] = [];
for (let i = 1; i < maxValue / unitPrice + 1; i++) scale.push(unitPrice * i);

/// / CALCULATE ANSWER RATE FOR EACH TYPE
const answerRateData: AnswerRateAllData = answerRateCalculator(scale, sampleSize, psmData);

// FIND ALL THE PRICES
const prices: PriceObject = priceFinder(scale, answerRateData);

const { idealPrice: ideal, compromisePrice: compromise, highestPrice: highest, lowestPrice: lowest } = prices;
console.log("lowestPrice", lowest); // correct 246
console.log("highestPrice", highest); // 293
console.log("compromisePrice", compromise); // 279
console.log("idealPrice", ideal); // correct 265
