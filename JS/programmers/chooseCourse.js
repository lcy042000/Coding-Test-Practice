function solution(n, paths, gates, summits) {
    var answer = [Infinity, Infinity];
    
    const graph = Array.from(Array(n + 1), () => []);
    const summitSet = new Set(summits);
    const gateSet = new Set(gates);
    
    for(const [i, j, w] of paths){
        if(gateSet.has(i) || summitSet.has(j)) {
            graph[i].push([j, w]);
            continue;
        }
        
        if(gateSet.has(j) || summitSet.has(i)){
            graph[j].push([i, w]);
            continue;
        }
        
        graph[i].push([j, w]);
        graph[j].push([i, w]);
    }
    
    let list = Array(n + 1).fill(Infinity);
    
    const queue = [];
    let idx = 0;
    
    for(const gate of gates){
        queue.push([gate, 0]);
        list[gate] = 0;
    }
    
    while(queue.length > idx){
        const [prev, intensity] = queue[idx++];
        
        if(summitSet.has(prev) || intensity > list[prev]) continue;
        
        const nGraph = graph[prev];
            
        for(const [nNode, w] of nGraph){            
            if(gateSet.has(nNode)) continue;
            
            const nValue = Math.max(intensity, w);
            
            if(list[nNode] <= nValue) continue;       
            
            list[nNode] = nValue;
            queue.push([nNode, nValue]);
        }
    }
    
    summits.sort((a, b) => a - b);
    for(const summit of summits){
        if(answer[1] > list[summit]) answer = [summit, list[summit]];
    }
    
    return answer;
}