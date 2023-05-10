import { kakaku, kakakuIndex, kaitouritsuAllData } from "../utilities/types";
import intersection_calculator from "./intersection_calculator";
import range_finder from "./range_finder";

const price_finder = (scale: number[], kaitouritsuAllData: kaitouritsuAllData) => {

    

    // find the 理想価格 - too cheap and too expensive
    let risouKakakuIndex: kakakuIndex = range_finder(scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    let risouKakaku: kakaku = intersection_calculator(risouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);

    // find the 妥協価格 - cheap and expensive

    let dakyouKakakuIndex: kakakuIndex = range_finder(scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    let dakyouKakaku: kakaku = intersection_calculator(dakyouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_expensive"]);

    // find the 最高価格 - cheap and too expensive
    let saikouKakakuIndex: kakakuIndex = range_finder(scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    let saikouKakaku: kakaku = intersection_calculator(saikouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);

    // find the 最低品質保証価格 - too cheap and expensive
    let saiteiKakakuIndex: kakakuIndex = range_finder(scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    let saiteiKakaku: kakaku = intersection_calculator(saiteiKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_expensive"]);

    const priceObject: any = {
        risou : risouKakaku,
        dakyou: dakyouKakaku,
        saikou: saikouKakaku,
        saitei: saiteiKakaku
    }

    return priceObject;
}

export default price_finder;