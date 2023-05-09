import {kaitouritsu_cheap, kaitouritsu_expensive, kaitouritsu_tooCheap, kaitouritsu_tooExpensive} from "./index.js";
import {scale, sampleSize, unitPrice} from "./index.js";
// x3,x4 negative slope; cheap curve

const intersection_calculator = (index, cheapKaitouritsu, expensiveKaitouritsu, cheapData, expensiveData) => {

    let y1 = expensiveKaitouritsu[index];
    let y2 = expensiveKaitouritsu[index+1];
    let y3 = cheapKaitouritsu[index];
    let y4 = cheapKaitouritsu[index+1];

    let x1 = scale[index];
    let x2 = scale[index+1];
    let x3 = scale[index];
    let x4 = scale[index+1];

    let x = ((y3-y1)*(x1-x2)*(x3-x4)+x1*(y1-y2)*(x3-x4)-x3*(y3-y4)*(x1-x2))/((y1-y2)*(x3-x4)-(x1-x2)*(y3-y4));
    return Math.round(x);
}

export default intersection_calculator;