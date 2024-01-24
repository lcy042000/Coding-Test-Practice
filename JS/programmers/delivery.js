function solution(N, road, K) {
    var answer = 0;
    
    const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
    const isVisited = Array(N + 1).fill(Infinity);

    const queue = [];
    let idx = 0;
    
    road.forEach(v => {
        const [start, end, value] = v;
        
        graph[start][end] = Math.min(graph[start][end], value);
        graph[end][start] = Math.min(graph[end][start], value);
        
        if(start === 1){
            isVisited[end] = Math.min(isVisited[end], value);
            queue.push([start, end, isVisited[end]]);
        }
        
        if(end === 1){
            isVisited[start] = Math.min(isVisited[start], value);
            queue.push([1, start, isVisited[start]]);
        }
    });
    
    while(queue.length > idx){
        const [start, end, value] = queue[idx++];
        
        const nextLine = graph[end];
        
        for(let i = 2; i < N + 1; i++){
            if(nextLine[i] < 0) continue;
            
            const nextValue = value + nextLine[i];
            
            if(isVisited[i] <= nextValue) continue;
            
            isVisited[i] = nextValue;
            queue.push([end, i, nextValue]);
        }
    }
    
    answer = isVisited.filter(v => v <= K).length + 1;
    
    return answer;
}