function solution(n) {
    var answer = 0;
    
    if(n % 2) return 0;
    
    const dp = Array(n + 1).fill(0);
    dp[2] = 3;
    
    for(let i = 4; i <= n; i += 2){
        let cnt = dp[i - 2] * dp[2] + 2;
        
        for(let j = i - 4; j > 0; j -= 2){
            cnt += dp[j] * 2;
        }
        
        dp[i] = cnt % 1000000007;
    }
    
    return dp[n];
}