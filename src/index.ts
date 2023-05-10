import max_data_value_calculator from './max_data_value_calculator'
import price_finder from './price_finder.js'
import answer_rate_calculator from './answer_rate_calculator'

import { type sheetRowData, type sheetDataType, rowRSMData, rsmData, type answerRateAllData, type priceObject } from './../utilities/types'

const XLSX = require('xlsx')

/// / READ ALL DATA FROM CSV
const unitPrice = 50
const data = XLSX.readFile('PSMrawdata.csv')
const sheetData: sheetDataType = data.Sheets.Sheet1
console.log(sheetData)

const rsmData: rsmData = {
  data: [],
  idealPrice: 0,
  compromisePrice: 0,
  highestPrice: 0,
  lowestPrice: 0
}

let rowRSMData: rowRSMData = {
  expensiveData: 0,
  cheapData: 0,
  tooExpensiveData: 0,
  tooCheapData: 0
}

for (const [key, val] of Object.entries(sheetData)) {
  const value: sheetRowData = sheetData[key]
  if (key[0] === 'B' && value.t === 'n') rowRSMData.expensiveData = value.v
  else if (key[0] === 'C' && value.t === 'n') rowRSMData.cheapData = value.v
  else if (key[0] === 'D' && value.t === 'n') rowRSMData.tooExpensiveData = value.v
  else if (key[0] === 'E' && value.t === 'n') {
    rowRSMData.tooCheapData = value.v
    rsmData.data.push(rowRSMData)
    rowRSMData = {
      expensiveData: 0,
      cheapData: 0,
      tooExpensiveData: 0,
      tooCheapData: 0
    }
  };
}

/// / MAKE THE SCALE FOR THE X-AXIS
const maxValue = max_data_value_calculator(rsmData)
const sampleSize = rsmData.data.length
const scale: number[] = []
for (let i = 1; i < maxValue / unitPrice + 1; i++) scale.push(unitPrice * i)

/// / CALCULATE ANSWER RATE FOR EACH TYPE
const answerRateData: answerRateAllData = answer_rate_calculator(scale, sampleSize, rsmData)

// FIND ALL THE PRICES
const prices: priceObject = price_finder(scale, answerRateData)

const { idealPrice: ideal, compromisePrice: compromise, highestPrice: highest, lowestPrice: lowest } = prices
console.log('lowestPrice', lowest) // correct 246
console.log('highestPrice', highest) // 293
console.log('compromisePrice', compromise) // 279
console.log('idealPrice', ideal) // correct 265
