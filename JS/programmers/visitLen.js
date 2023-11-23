const dirList = {
    U: 0,
    D: 1,
    R: 2,
    L: 3,
}

function solution(dirs) {
    var answer = 0;
    const isVisited = Array.from(Array(121) , () => Array(4).fill(0));
    
    let cur = [5, 5];
    const com = dirs.split("");
    
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, 1, -1];
    
    for(let i = 0; i < com.length; i++){
        const [x, y] = cur;
        const dir = dirList[com[i]];
        
        const nx = x + dx[dir];
        const ny = y + dy[dir];
        
        if(nx < 0 || nx > 10 || ny < 0 || ny > 10) continue;
        
        cur = [nx, ny];
        
        if(0 < dir && dir < 3){
            const idx = x * 11 + y;
            isVisited[idx][dir] += 1;
        }else if(dir === 3){
            const idx = nx * 11 + ny;
            isVisited[idx][2] += 1;
        }else if(dir === 0){
            const idx = nx * 11 + ny;
            isVisited[idx][1] += 1;
        }
    }
    
    isVisited.forEach(row => row.forEach(col => col > 0 && answer++));
    
    return answer;
}