function solution(r1, r2) {
    var answer = 0;
    
    for(let i = 1; i <= r2; i++){
        let y = i <= r1 ? Math.ceil(Math.sqrt(r1 ** 2 - i ** 2)) : 0;
        const max = Math.floor(Math.sqrt(r2 ** 2 - i ** 2));
        
        answer += (max - y) + 1;
    }
    
    return answer * 4;
}