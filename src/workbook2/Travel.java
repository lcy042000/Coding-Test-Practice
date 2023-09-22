package workbook2;

import java.io.*;
import java.util.Arrays;

public class Travel {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nk = br.readLine().split(" ");
        int n = Integer.parseInt(nk[0]), k = Integer.parseInt(nk[1]);

        int[][] table = new int[n + 1][4];
        long[][] dp = new long[n + 1][k + 1];

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            table[i][0] = Integer.parseInt(s[0]);
            table[i][1] = Integer.parseInt(s[1]);
            table[i][2] = Integer.parseInt(s[2]);
            table[i][3] = Integer.parseInt(s[3]);
        }

        for (int i = 0; i < n + 1; i++) {
            Arrays.fill(dp[i], -1l);
        }

        dp[0][0] = 0l;

        for (int i = 1; i < n + 1; i++) {
            for (int j = 0; j < k + 1; j++) {
                if(dp[i - 1][j] > -1l){
                    if(j + table[i][0] <= k){
                        if(dp[i][j + table[i][0]] < dp[i - 1][j] + table[i][1]){
                            dp[i][j + table[i][0]] = dp[i - 1][j] + table[i][1];
                        }
                    }

                    if (j + table[i][2] <= k) {
                        if(dp[i][j + table[i][2]] < dp[i - 1][j] + table[i][3]){
                            dp[i][j + table[i][2]] = dp[i - 1][j] + table[i][3];
                        }
                    }
                }
            }
        }

        long max = -1l;

        for (int i = 0; i < k + 1; i++) {
            if(max < dp[n][i]) max = dp[n][i];
        }

        bw.write(String.valueOf(max));
        bw.flush();
        bw.close();
    }
}
