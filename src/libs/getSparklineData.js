/**
 * @module getSparklineData
 * @category Utilities
 * @description Returns average and regression data for a 1-d array
 * @param {number[]} data
 */

import regression from "regression";

export default function getSparklineData(data, period) {
  var average = data.reduce((total, next) => total + next.qty, 0) / period;

  const obj = {
    average: average.toFixed(1),
  };
  return obj;
}
