function solution(str1, str2) {
  var answer = 0;

  const strOne = makeArray(str1.toLowerCase());
  const strTwo = makeArray(str2.toLowerCase());

  const inter = findIntersection(strOne, strTwo);
  const combine = findCombination(strOne, strTwo);

  if (combine === 0) {
    answer = 1 * 65536;
  } else {
    answer = parseInt((inter / combine) * 65536);
  }

  return answer;
}

function makeArray(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const char1 = arr.charAt(i);
    const char2 = arr.charAt(i + 1);

    if (
      "a".charAt(0) > char1 ||
      "a".charAt(0) > char2 ||
      "z".charAt(0) < char1 ||
      "z".charAt(0) < char2
    )
      continue;

    newArr.push(char1 + char2);
  }

  return newArr;
}

function findIntersection(arr1, arr2) {
  const newArr = [];

  for (let i = 0; i < arr1.length; i++) {
    const word = arr1[i];

    if (newArr.includes(word)) continue;

    if (!arr2.includes(word)) continue;

    const sameArr1 = arr1.filter((v) => v === word);
    const sameArr2 = arr2.filter((v) => v === word);

    if (sameArr1.length < sameArr2.length) {
      newArr.push(...sameArr1);
    } else {
      newArr.push(...sameArr2);
    }
  }

  return newArr.length;
}

function findCombination(arr1, arr2) {
  const newArr = [];

  for (let i = 0; i < arr1.length; i++) {
    const word = arr1[i];

    if (newArr.includes(word)) continue;

    const sameArr1 = arr1.filter((v) => v === word);
    const sameArr2 = arr2.filter((v) => v === word);

    if (sameArr1.length < sameArr2.length) {
      newArr.push(...sameArr2);
    } else {
      newArr.push(...sameArr1);
    }
  }

  for (let i = 0; i < arr2.length; i++) {
    const word = arr2[i];

    if (newArr.includes(word)) continue;

    newArr.push(...arr2.filter((v) => v === word));
  }

  return newArr.length;
}
