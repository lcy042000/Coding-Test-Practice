function solution(enroll, referral, seller, amount) {
  let answer = Array(enroll.length).fill(0);

  for (let i = 0; i < seller.length; i++) {
    let currentName = seller[i];
    let currentPrice = amount[i] * 100;
    let sellerIndex = 0;
    let hasParent = true;
    for (let j = 0; j < enroll.length; j++) {
      if (enroll[j] === currentName) {
        sellerIndex = j;
        break;
      }
    }
    while (hasParent) {
      // 추천인이 존재하지 않을 때까지 금액의 10% 전달을 반복한다
      let addingValue = currentPrice - Math.floor(currentPrice * 0.1);
      answer[sellerIndex] += addingValue; // 금액의 10%를 제외한 금액은 판매자의 누적금액에 더한다
      if (referral[sellerIndex] === "-") {
        // 추천인이 존재하지 않는 경우
        hasParent = false;
      } else {
        currentName = referral[sellerIndex];
        currentPrice = Math.floor(currentPrice * 0.1);
        if (currentPrice < 1) {
          // 전달 금액이 1보다 작은 경우
          hasParent = false;
        } else {
          // 추천인이 존재하면 금액의 10%를 추천인에게 전달한다
          for (let j = 0; j < sellerIndex; j++) {
            // 해당 판매자 추천인인 무조건 판매자보다 앞에 위치
            if (enroll[j] === currentName) {
              sellerIndex = j;
              break;
            }
          }
        }
      }
    }
  }

  return answer;
}