import { kaitouritsuData } from "../utilities/types";

const range_finder = (scale: number[], yasuiKaitouritsu: kaitouritsuData, takaiKaitouritsu: kaitouritsuData) => {

    // if yasuikaitouritsu becomes greater than takaikaitouritsu; i.e. the parity switches

    for(let i=0; i<scale.length; i++){
        if(yasuiKaitouritsu[i] < takaiKaitouritsu[i]){
            let upperIndex = i;
            return upperIndex;
        }
    }

}

export default range_finder;