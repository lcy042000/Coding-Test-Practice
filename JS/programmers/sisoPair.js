function solution(weights) {
    var answer = 0;
    const distance = [1, 2, 3 / 2, 4 / 3];
    const map = new Map();
    
    weights.sort((a, b) => b - a);
    
    for(const w of weights){
        for(const d of distance){
            if(map.has(w * d)) answer += map.get(w * d);
        }
        
        map.set(w, (map.get(w) || 0) + 1);
    }
    
    return answer;
}