function solution(bridge_length, weight, truck_weights) {
  var answer = 0;

  let queue = [];
  let truckIdx = 0;

  while (truckIdx < truck_weights.length || queue.length) {
    queue.forEach((v) => (v[1] -= 1));
    queue = queue.filter((v) => v[1] > 0);

    if (
      truckIdx < truck_weights.length &&
      queue.reduce((acc, cur) => (acc += cur[0]), 0) +
        truck_weights[truckIdx] <=
        weight
    ) {
      queue.push([truck_weights[truckIdx++], bridge_length]);
    }

    answer++;
  }

  return answer;
}
