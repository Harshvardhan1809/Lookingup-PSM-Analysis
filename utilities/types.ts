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