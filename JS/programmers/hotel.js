function solution(book_time) {
  var answer = 0;

  book_time.sort((a, b) => {
    const [aStartTime, aStartM] = a[0].split(":");
    const [bStartTime, bStartM] = b[0].split(":");

    if (aStartTime !== bStartTime) {
      return aStartTime - bStartTime;
    } else {
      if (aStartM !== bStartM) return aStartM - bStartM;
      else {
        const [aCloseTime, aCloseM] = a[1].split(":");
        const [bCloseTime, bCloseM] = b[1].split(":");

        if (aCloseTime !== bCloseTime) return aCloseTime - bCloseTime;
        else return aCloseM - bCloseM;
      }
    }
  });

  const hotel = [];

  for (let i = 0; i < book_time.length; i++) {
    const [startTime, startM] = book_time[i][0].split(":").map(Number);
    let [closeTime, closeM] = book_time[i][1].split(":").map(Number);
    closeM += 10;

    if (closeM >= 60) {
      closeTime += 1;
      closeM -= 60;
    }

    const idx = hotel.findIndex((v) => v <= startTime * 60 + startM);

    if (idx < 0) hotel.push(closeTime * 60 + closeM);
    else hotel[idx] = closeTime * 60 + closeM;
  }

  answer = hotel.length;

  return answer;
}
