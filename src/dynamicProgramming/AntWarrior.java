package dynamicProgramming;

import java.io.*;

public class AntWarrior {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        String[] inputs = br.readLine().split(" ");

        int[] food = new int[N];

        for (int i = 0; i < N; i++) {
            food[i] = Integer.parseInt(inputs[i]);
        }

        int[] dp = new int[N];

        dp[0] = food[0];
        dp[1] = Math.max(food[0], food[1]);

        for (int i = 2; i < N; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + food[i]);
        }

        bw.write(String.valueOf(dp[N-1]));
        bw.flush();
        bw.close();
    }
}
