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

// remodel types to exploit the capabilities of typescript

type rowRSMData = {
    expensiveData : number,
    cheapData : number,
    tooExpensiveData : number,
    tooCheapData : number,
}

type rsmData = {
    data: rowRSMData[],
    risouKakaku : number,
    dakyouKakaku : number,
    saikouKakaku : number,
    saiteiKakaku : number
}

type kaitouritsuAllData = {
    kaitouritsu_expensive: number[],
    kaitouritsu_cheap: number[],
    kaitouritsu_tooExpensive: number[],
    kaitouritsu_tooCheap: number[],
}
export { priceData, kaitouritsuData, kakakuIndex, kakaku, sheetRowData, sheetDataType, rowRSMData, rsmData, kaitouritsuAllData };
