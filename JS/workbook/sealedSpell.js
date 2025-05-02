function strToNum(str){
    let nums = [];
    
    for(let i = 0; i < str.length; i++){
        nums.push(str[i].charCodeAt() - 96);
    }
    
    nums = nums.reverse();
    let result = 0;
    
    for(let i = 0; i < nums.length; i++){
        const num = nums[i];
        result += num * Math.pow(26, i);
    }
    
    return result;
}

function numToStr(num){
    let strs = [];
    
    while(num){
        num--;
        strs.push(String.fromCharCode((num % 26) + 97));
        num = Math.floor(num / 26);
    }
    
    strs = strs.reverse();
    
    return strs.join("");
}

function solution(n, bans) {
    var answer = '';
    
    const sortedBans = [];
    let idx = n;
    
    for(let i = 0; i < bans.length; i++){
        const num = strToNum(bans[i]);
        
        sortedBans.push(num);
    }
    
    sortedBans.sort((a, b) => a - b);
    
    for(const num of sortedBans){
        if(num <= idx) idx++;
        else break;
    }
    
    answer = numToStr(idx);
    
    return answer;
}