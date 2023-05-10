
const intersection_calculator = (index: number, scale: number[], cheapAnswerRate: number[], expensiveAnswerRate: number[]) => {

    // x3,x4 negative slope; cheap curve

    let y1 = expensiveAnswerRate[index-1];
    let y2 = expensiveAnswerRate[index];
    let y3 = cheapAnswerRate[index-1];
    let y4 = cheapAnswerRate[index];

    let x1 = scale[index-1];
    let x2 = scale[index];
    let x3 = scale[index-1];
    let x4 = scale[index];

    let x: number = ((y3-y1)*(x1-x2)*(x3-x4)+x1*(y1-y2)*(x3-x4)-x3*(y3-y4)*(x1-x2))/((y1-y2)*(x3-x4)-(x1-x2)*(y3-y4));
    return Math.round(x);
}

export default intersection_calculator;