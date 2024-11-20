function solution(board) {
    var answer = 0;
    const len = board.length;
    
    const wDx = [[0, 0], [0, 0], [-1, -1], [1, 1],
                 [-1, 0], [-1, 0], [0, 1], [0, 1]];
    const wDy = [[-1, 0], [1, 2], [0, 1], [0, 1],
                 [0, 0], [1, 1], [0, 0], [1, 1]];
    const turnWx = [-1, -1, 1, 1];
    const turnWy = [1, 0, 1, 0];
    
    const hDx = [[-1, 0], [1, 2], [0, 1], [0, 1],
                 [1, 1], [1, 1], [0, 0], [0, 0]];
    const hDy = [[0, 0], [0, 0], [-1, -1], [1, 1],
                 [-1, 0], [0, 1], [-1, 0], [0, 1]];
    const turnHx = [0, 0, 1, 1];
    const turnHy = [-1, 1, -1, 1];
    
    const moveWidth = (x, y, index) => {
        return [(x + wDx[index][0]), (y + wDy[index][0]),
               (x + wDx[index][1]), (y + wDy[index][1])];
    }
    
    const moveHeight = (x, y, index) => {
        return [(x + hDx[index][0]), (y + hDy[index][0]),
                (x + hDx[index][1]), (y + hDy[index][1])];
    }
    
    const queue = [[0, false, 0]];
    const isVisited = new Set();
    let idx = 0;
    
    isVisited.add('0/1');
    
    while(queue.length > idx){
        const [p1, wh, cnt] = queue[idx++];
        const p1x = parseInt(p1 / len), p1y = p1 % len;
        
        for(let i = 0; i < 8; i++){
            const [nx1, ny1, nx2, ny2] = 
                  !wh ? moveWidth(p1x, p1y, i) : moveHeight(p1x, p1y, i);

            if(nx1 < 0 || nx1 >= len || ny1 < 0 
               || ny1 >= len || board[nx1][ny1]) continue;
            if(nx2 < 0 || nx2 >= len || ny2 < 0 
               || ny2 >= len || board[nx2][ny2]) continue;
            if(isVisited.has(`${nx1 * len + ny1}/${nx2 * len + ny2}`)) continue;
            
            if(i >= 4){
                const tx = !wh ? turnWx[i - 4] + p1x : turnHx[i - 4] + p1x;
                const ty = !wh ? turnWy[i - 4] + p1y : turnHy[i - 4] + p1y;
                
                if(board[tx][ty]) continue;
            }
            
            if((nx1 === len - 1 && ny1 === len - 1)
              || (nx2 === len - 1 && ny2 === len - 1)) {
                return cnt + 1;
            }
            
            queue.push([nx1 * len + ny1, i >= 4 ? !wh : wh, cnt + 1]);
            isVisited.add(`${nx1 * len + ny1}/${nx2 * len + ny2}`);
        }
    }
    
    return answer;
}