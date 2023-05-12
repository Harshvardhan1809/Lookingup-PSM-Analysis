type SheetRowData = {
	t: string;
	w?: string;
	v: number;
};

type SheetDataType = {
	[key: string]: SheetRowData;
};

// remodel types to exploit the capabilities of typescript

type RowPsmData = {
	expensiveData: number;
	cheapData: number;
	tooExpensiveData: number;
	tooCheapData: number;
};

type PsmData = {
	data: RowPsmData[];
} & PriceObject;

type AnswerRateAllData = {
	answerRateExpensive: number[];
	answerRateCheap: number[];
	answerRateTooExpensive: number[];
	answerRateTooCheap: number[];
};

type PriceObject = {
	idealPrice: number;
	compromisePrice: number;
	highestPrice: number;
	lowestPrice: number;
};

type Types = "ideal" | "compromise" | "highest" | "lowest";

type Coordinate = {
	x: number;
	y: number;
};

export { SheetRowData, SheetDataType, RowPsmData, PsmData, AnswerRateAllData, PriceObject, Types, Coordinate };
