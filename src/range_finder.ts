const range_finder = (scale: number[], expensiveAnswerRate: number[], cheapAnswerRate: number[]) => {

    // if yasuikaitouritsu becomes greater than takaikaitouritsu; i.e. the parity switches

    for(let i=0; i<scale.length; i++){
        if(expensiveAnswerRate[i] < cheapAnswerRate[i]){
            let upperIndex = i;
            return upperIndex;
        }
    }

}

export default range_finder;