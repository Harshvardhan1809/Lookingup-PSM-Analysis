import { type answerRateAllData, type rsmData } from '../utilities/types'
import round from './round_number'

const answer_rate_calculator = (scale: number[], sampleSize: number, rsmData: rsmData) => {
  const answerRateData: answerRateAllData = {
    answerRateExpensive: Array(scale.length).fill(0),
    answerRateCheap: Array(scale.length).fill(0),
    answerRateTooExpensive: Array(scale.length).fill(0),
    answerRateTooCheap: Array(scale.length).fill(0)
  }

  for (let i = 0; i < sampleSize; i++) {
    for (let j = scale.length - 1; j >= 0; j--) {
      const { expensiveData: e, cheapData: c, tooExpensiveData: te, tooCheapData: tc } = rsmData.data[i]
      if (c >= scale[j]) answerRateData.answerRateCheap[j] += (1 / sampleSize) * 100
      if (e <= scale[j]) answerRateData.answerRateExpensive[j] += (1 / sampleSize) * 100
      if (tc >= scale[j]) answerRateData.answerRateTooCheap[j] += (1 / sampleSize) * 100
      if (te <= scale[j]) answerRateData.answerRateTooExpensive[j] += (1 / sampleSize) * 100
    }
  }

  // round the result of all kaitouritsu to 3 digits
  for (let i = 0; i < scale.length; i++) {
    answerRateData.answerRateCheap[i] = round(answerRateData.answerRateCheap[i])
    answerRateData.answerRateTooCheap[i] = round(answerRateData.answerRateTooCheap[i])
    answerRateData.answerRateExpensive[i] = round(answerRateData.answerRateExpensive[i])
    answerRateData.answerRateTooExpensive[i] = round(answerRateData.answerRateTooExpensive[i])
  }

  return answerRateData
}

export default answer_rate_calculator
