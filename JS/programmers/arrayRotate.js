function solution(rows, columns, queries) {
    var answer = [];
    const arr = Array(rows * columns + 1);
    
    for(let i = 0; i < rows * columns + 1; i++){
        arr[i] = i;
    }
    
    queries.forEach(v => {
        const [x1, y1, x2, y2] = v;
        const stack = [];
        
        for(let i = (x1 - 1) * columns + y1; i <= (x1 - 1) * columns + y2; i++){
            stack.push(arr[i]);
        }
        for(let i = x1 * columns + y2; i <= (x2 - 1) * columns + y2; i += columns){
            stack.push(arr[i]);
        }
        for(let i = (x2 - 1) * columns + y2 - 1; i >= (x2 - 1) * columns + y1; i--){
            stack.push(arr[i]);
        }
        for(let i = (x2 - 2) * columns + y1; i > (x1 - 1) * columns + y1; i -= columns){
            stack.push(arr[i]);
        }
        
        answer.push(Math.min(...stack));
        
        const temp = stack.pop();
        stack.splice(0, 0, temp);
        stack.reverse();
        
        for(let i = (x1 - 1) * columns + y1; i <= (x1 - 1) * columns + y2; i++){
            arr[i] = stack.pop();
        }
        for(let i = x1 * columns + y2; i <= (x2 - 1) * columns + y2; i += columns){
            arr[i] = stack.pop();
        }
        for(let i = (x2 - 1) * columns + y2 - 1; i >= (x2 - 1) * columns + y1; i--){
            arr[i] = stack.pop();
        }
        for(let i = (x2 - 2) * columns + y1; i > (x1 - 1) * columns + y1; i -= columns){
            arr[i] = stack.pop();
        }
    });
    
    return answer;
}