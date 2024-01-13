function solve(expression, operator){
    const stack = [];
    let idx = 0;
    
    while(expression.length > idx){
        const value = expression[idx++];
        
        if(value === operator){
            const before = Number(stack.pop());
            const after = Number(expression[idx++]);
            const newValue = value === "*" ? before * after : value === "+" ? before + after : before - after;
            
            stack.push(newValue);
        }else{
            stack.push(value);
        }
    }
    
    return stack;
}

function solution(expression) {
    var answer = 0;
    
    const seq = [
        ['-', '+', '*'],
        ['-', '*', '+'],
        ['+', '*', '-'],
        ['+', '-', '*'],
        ['*', '-', '+'],
        ['*', '+', '-']
    ];
    
    const newExp = expression.split(/(\D)/).map(v => {
        if(Number.isInteger(v)) return Number(v);
        else return v;
    });
    
    seq.forEach(v => {
        let exp = newExp;
        
        v.forEach(value => {
            exp = solve(exp, value);
        });
        
        answer = Math.max(answer, Math.abs(exp));
    });
    
    return answer;
}