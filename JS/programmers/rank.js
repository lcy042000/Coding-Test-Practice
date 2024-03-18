function bfs(graph, start){
    const queue = graph[start];
    let idx = 0;
    const isVisited = Array(graph.length).fill(false);
    
    isVisited[start] = true;
    
    for(const node of queue){
        isVisited[node] = true;
    }
    
    while(queue.length > idx){
        const node = queue[idx++];
        
        const nexts = graph[node];
        
        for(const next of nexts){
            if(isVisited[next]) continue;
            
            queue.push(next);
            isVisited[next] = true;
        }
    }
    
    return idx;
}

function solution(n, results) {
    var answer = 0;
    
    const win = Array.from(Array(n + 1), () => Array());
    const lose = Array.from(Array(n + 1), () => Array());
    
    for(const [a, b] of results){
        win[a].push(b);
        lose[b].push(a);
    }
    
    for(let i = 1; i < n + 1; i++){
        const winCnt = bfs(win, i);
        const loseCnt = bfs(lose, i);
        
        if(winCnt + loseCnt === n - 1) answer++;
    }
    
    return answer;
}