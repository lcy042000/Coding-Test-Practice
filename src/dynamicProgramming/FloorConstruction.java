package dynamicProgramming;

import java.io.*;

public class FloorConstruction {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        int[] dp = new int[N + 1];

        dp[1] = 1;
        dp[2] = 3;

        for (int i = 3; i < N + 1; i++) {
            dp[i] = (dp[i-1] + dp[i-2] * 2) % 796796;
        }

        bw.write(String.valueOf(dp[N]));
        bw.flush();
        bw.close();
    }
}
