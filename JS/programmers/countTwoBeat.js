function makeBinary(num){
    const arr = [];
    let number = num;
    
    while(number > 0){
        arr.push(number % 2);
        number = parseInt(number / 2);
    }
    
    return arr.reverse();
}

function makeDemical(arr){
    const bi = arr.reverse();
    let num = 0;
    
    return bi.reduce((acc, cur) => acc += (cur * (2 ** num++)), 0);
}

function findLastIndex(arr){
    let idx = -1;
    
    for(let i = arr.length - 1; i > -1; i--){
        if(arr[i] === 0) {
            idx = i;
            break;
        }
    }
    
    return idx;
}

function solution(numbers) {
    var answer = [];
    
    numbers.forEach(v => {
        if(v % 2 === 0){
            answer.push(v + 1);
        }else{
            const bi = makeBinary(Number(v));
            const idx = findLastIndex(bi);
            
            if(idx > -1){
                bi[idx] = 1;
                
                if(idx + 1 < bi.length){
                    bi[idx + 1] = 0;
                }
            }else{
                bi.splice(0, 0, 1);
                bi[1] = 0;
            }
            
        
            const demical = makeDemical(bi);
            answer.push(demical);
        }
    });
    
    return answer;
}