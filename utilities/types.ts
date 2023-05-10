
type sheetRowData = {
    t: string,
    w?: string,
    v: number
}

type sheetDataType = {
    [key: string] : sheetRowData, 
}

// remodel types to exploit the capabilities of typescript

type rowRSMData = {
    expensiveData : number,
    cheapData : number,
    tooExpensiveData : number,
    tooCheapData : number,
}

type rsmData = {
    data: rowRSMData[],
    idealPrice : number,
    compromisePrice : number,
    highestPrice : number,
    lowestPrice : number
}

type answerRateAllData = {
    answerRateExpensive: number[],
    answerRateCheap: number[],
    answerRateTooExpensive: number[],
    answerRateTooCheap: number[],
}

type priceObject = {
    idealPrice: number,
    compromisePrice: number,
    highestPrice: number,
    lowestPrice: number
}

export { sheetRowData, sheetDataType, rowRSMData, rsmData, answerRateAllData, priceObject };
