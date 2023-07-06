package dynamicProgramming;

import java.io.*;

public class MonetaryComposition {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] NM = br.readLine().split(" ");

        int N = Integer.parseInt(NM[0]), M = Integer.parseInt(NM[1]);
        int[] coins = new int[N], dp = new int[M + 1];

        for (int i = 1; i < M + 1; i++) {
            dp[i] = 10001;
        }

        for (int i = 0; i < N; i++) {
            for (int j = coins[i]; j < M + 1; j++) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }

        String result = "";

        if(dp[M] == 10001){
            result = "-1";
        }else{
            result = String.valueOf(dp[M]);
        }

        bw.write(result);
        bw.flush();
        bw.close();
    }
}
