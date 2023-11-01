function solution(triangle) {
    var answer = 0;
   
    let dp = Array(triangle[triangle.length - 1].length).fill(0);
    
    for(let i = triangle.length - 1; i > 0; i--){
        const arr = [];
        
        for(let j = 0; j < triangle[i].length - 1; j++){
            arr.push(Math.max(triangle[i][j] + dp[j], triangle[i][j + 1] + dp[j + 1]));
        }
        
        dp = arr;
    }

    answer = dp[0] + triangle[0][0];
    return answer;
}