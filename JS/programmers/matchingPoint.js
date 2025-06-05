function solution(word, pages) {
  var answer = 0;

  const metaRegex = "meta property";
  const urlRegex = "https://";
  const wordRegex = "/[d|W]/";

  const htmlParser = (html) => {
    const dom = html.split("\n");
    const meta = dom.findIndex((v) => v.includes(metaRegex));
    const url = dom[meta].match(/https:\S*[^"/>]/gi)[0];
    const bodyStart = dom.findIndex((v) => v.includes("<body>"));
    const bodyEnd = dom.findIndex((v) => v.includes("</body>"));
    const body = dom.slice(bodyStart + 1, bodyEnd);
    const point = body
      .flatMap((v) => v.split(/[\d|\W]/))
      .filter((v) => v === word.toLowerCase()).length;
    const external = body
      .flatMap((v) => v.match(/<a href="https:\S*"/gi))
      .filter((v) => v)
      .map((v) => v.substring(9, v.length - 1));

    return { url, point, external };
  };

  const pageInfos = pages.map((html, idx) => ({
    idx,
    ...htmlParser(html.toLowerCase()),
    ePoint: 0,
  }));

  for (let i = 0; i < pageInfos.length; i++) {
    const url = pageInfos[i].url;
    let linkPoint = 0;

    for (let j = 0; j < pageInfos.length; j++) {
      if (i === j) continue;

      const otherPage = pageInfos[j];

      if (otherPage.external.includes(url)) {
        otherPage.ePoint += 1;
        linkPoint += otherPage.point / otherPage.external.length;
      }
    }

    pageInfos[i] = { ...pageInfos[i], linkPoint };
  }

  answer = pageInfos.reduce((acc, cur, idx) => {
    const { point, linkPoint } = pageInfos[acc];

    return point + linkPoint < cur.point + cur.linkPoint ? idx : acc;
  }, 0);

  return answer;
}
