package dynamicProgramming;

import java.io.*;

public class MakeItOne {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        int[] dp = new int[N+1];

        for (int i = 2; i < N + 1; i++) {
            dp[i] = dp[i-1] + 1;

            if(i % 2 == 0){
                dp[i] = Math.min(dp[i], dp[i/2] + 1);
            }

            if(i % 3 == 0){
                dp[i] = Math.min(dp[i], dp[i/3] + 1);
            }

            if(i % 5 == 0){
                dp[i] = Math.min(dp[i], dp[i/5] + 1);
            }
        }

        bw.write(String.valueOf(dp[N]));

        bw.flush();
        bw.close();
    }
}
