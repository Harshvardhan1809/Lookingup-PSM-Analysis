type priceData = number[];
type kaitouritsuData = number[];

type kakakuIndex = number;
type kakaku = number;

type sheetRowData = {
    t: string,
    w?: string,
    v: number
}

type sheetDataType = {
    [key: string] : sheetRowData, 
}

export { priceData, kaitouritsuData, kakakuIndex, kakaku, sheetDataType, sheetRowData };

// remodel types to exploit the capabilities of typescript

type kakakuValues = {
    index: number,
    value: number
}

type rowRSMData = {
    expensiveData : number,
    cheapData : number,
    tooExpensiveData : number,
    tooCheapData : number,
}

type rsmData = {

}