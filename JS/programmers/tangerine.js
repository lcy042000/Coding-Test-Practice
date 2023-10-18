function solution(k, tangerine) {
    var answer = 0;
    
    const obj = {};
    tangerine.forEach(v => obj[v] = obj[v] ? obj[v] + 1 : 1);
    
    const v = Object.values(obj);
    
    v.sort((a, b) => a - b);
    
    let cnt = 0;
    while(k > 0){
        k -= v.pop();
        cnt++;
    }
    
    answer = cnt;
    return answer;
}