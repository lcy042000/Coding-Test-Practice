function findMax(arr) {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }

  return max;
}

function findMin(arr) {
  let min = Infinity;

  for (let i = 0; i < arr.length; i++) {
    min = Math.min(min, arr[i]);
  }

  return min;
}

function solution(sequence) {
  var answer = 0;

  const arr1 = sequence.slice();
  const arr2 = sequence.slice();

  for (let i = 0; i < sequence.length; i++) {
    if (i % 2 === 0) {
      arr2[i] *= -1;
    } else {
      arr1[i] *= -1;
    }
  }

  const sum1 = Array(arr1.length).fill(0);
  const sum2 = Array(arr2.length).fill(0);

  sum1[0] = arr1[0];
  sum2[0] = arr2[0];

  for (let i = 1; i < sequence.length; i++) {
    sum1[i] = sum1[i - 1] + arr1[i];
    sum2[i] = sum2[i - 1] + arr2[i];
  }

  let max = -Infinity;

  let [sum1Max, sum1Min] = [0, 0];
  let [sum2Max, sum2Min] = [0, 0];

  for (let i = 0; i < sum1.length; i++) {
    if (sum1[sum1Max] <= sum1[i]) sum1Max = i;
    if (sum1[sum1Min] > sum1[i]) sum1Min = i;
  }

  if (sum1Max < sum1Min) {
    const newMin = findMin(sum1.slice(0, sum1Max));
    const newMax = findMax(sum1.slice(sum1Min + 1));

    max = Math.max(
      max,
      sum1[sum1Max] - newMin,
      newMax - sum1[sum1Min],
      sum1[sum1Max]
    );
  } else {
    max = Math.max(max, sum1[sum1Max] - sum1[sum1Min], sum1[sum1Max]);
  }

  for (let i = 0; i < sum2.length; i++) {
    if (sum2[sum2Max] <= sum2[i]) sum2Max = i;
    if (sum2[sum2Min] > sum2[i]) sum2Min = i;
  }

  if (sum2Max < sum2Min) {
    const newMin = findMin(sum2.slice(0, sum2Max));
    const newMax = findMax(sum2.slice(sum2Min + 1));

    max = Math.max(
      max,
      sum2[sum2Max] - newMin,
      newMax - sum2[sum2Min],
      sum2[sum2Max]
    );
  } else {
    max = Math.max(max, sum2[sum2Max] - sum2[sum2Min], sum2[sum2Max]);
  }

  answer = max;

  return answer;
}
