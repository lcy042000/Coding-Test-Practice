package workbook2;

import java.io.*;
import java.util.Arrays;

public class FirstGrade {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int[] nums = new int[n];
        long[][] dp = new long[n - 1][21];

        String[] s = br.readLine().split(" ");
        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(s[i]);
        }

        for (int i = 0; i < n - 1; i++) {
            Arrays.fill(dp[i], 0L);
        }

        dp[0][nums[0]] = 1L;

        for(int i = 1; i < n - 1; i++){
            for(int j = 0; j <= 20; j++){
                if(dp[i - 1][j] > 0L){
                    if(j + nums[i] <= 20) dp[i][j + nums[i]] += dp[i - 1][j];
                    if(j - nums[i] >= 0) dp[i][j - nums[i]] += dp[i - 1][j];
                }
            }
        }

        bw.write(String.valueOf(dp[n - 2][nums[n - 1]]));
        bw.flush();
        bw.close();
    }
}
