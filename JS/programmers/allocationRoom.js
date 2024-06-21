function solution(k, room_number) {
  var answer = [];

  const map = new Map();

  const allocationRoom = (num) => {
    if (!map.has(num)) {
      map.set(num, num + 1);
      return num;
    }

    const nNum = allocationRoom(map.get(num));
    map.set(num, nNum + 1);
    return nNum;
  };

  return room_number.map(allocationRoom);
}
