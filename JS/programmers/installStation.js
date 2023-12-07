function solution(n, stations, w) {
    var answer = 0;

    const range = w * 2 + 1;
    
    stations.forEach((v, i) => {
        if(i === 0){
            const min = v - w;
            const distance = min - 1;
            if(distance > 0){
                answer += Math.ceil(distance / range);
            }
        }else{
            const min = v - w;
            const before = stations[i - 1] + w + 1;
            const distance = min - before;
            
            answer += Math.ceil(distance / range);
        }
        
        if(i === stations.length - 1){
            const max = v + w;
            
            answer += Math.ceil((n - max) / range)
        }
    });
    
    
    return answer;
}