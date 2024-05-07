function solution(board) {
    var answer = 1;
    
    const arr = board.join("").split("");
    const plus = [];
    const minus = [];
    
    arr.forEach((v, i) => {
        if(v === "O") plus.push(i);
        if(v === "X") minus.push(i);
    });
    
    if(plus.length < minus.length || plus.length - minus.length > 1) return 0;
    
    const wins = ["012", '345', "678", "036", "147", "258", "048", "246"];
    
    const isWin = (list) => {
        if(list.length < 3) return false;
        if(list.length === 3 && wins.includes(list.join(""))) return true;
        
        for(let i = 0; i < wins.length; i++){
            const win = wins[i].split("").map(Number);
            if(list.includes(win[0]) && list.includes(win[1]) && list.includes(win[2])) return true;
        }
        
        return false;
    };
    
    if(isWin(plus) && isWin(minus)) return 0;
    if(isWin(plus) && plus.length - minus.length !== 1) return 0;
    if(isWin(minus) && minus.length !== plus.length) return 0;
    
    return answer;
}