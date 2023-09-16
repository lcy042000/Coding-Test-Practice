package workbook2;

import java.io.*;
import java.util.Arrays;

public class CircuitOfSalesmen {
    static int n;
    static int end;
    static int[][] graph, dp;
    static int MAX = 987654321;
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        n = Integer.parseInt(br.readLine());
        end = (1 << n) - 1;
        graph = new int[n][n];

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < n; j++) {
                graph[i][j] = Integer.parseInt(s[j]);
            }
        }

        dp = new int[1 << n][n];

        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }

        bw.write(String.valueOf(tsp(1, 0)));
        bw.flush();
        bw.close();
    }

    static int tsp(int visited, int cur){
        if(visited == end) {
            if(graph[cur][0] > 0){
                return graph[cur][0];
            }else{
                return MAX;
            }
        }

        if(dp[visited][cur] != -1) return dp[visited][cur];

        dp[visited][cur] = MAX;

        for (int i = 0; i < n; i++) {
            if(graph[cur][i] == 0 || (visited & (1 << i)) != 0) continue;

            dp[visited][cur] = Math.min(dp[visited][cur], tsp(visited | (1 << i), i) + graph[cur][i]);
        }

        return dp[visited][cur];
    }
}
