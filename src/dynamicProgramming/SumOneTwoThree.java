package dynamicProgramming;

import java.io.*;

public class SumOneTwoThree {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int T = Integer.parseInt(br.readLine());
        int[] dp = new int[11];

        dp[1] = 1;
        dp[2] = 2;
        dp[3] = 4;

        for(int i = 4; i < dp.length; i++){
            dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
        }

        for (int i = 0; i < T; i++) {
            bw.write(dp[Integer.parseInt(br.readLine())] + "\n");
        }

        bw.flush();
        bw.close();
    }
}
