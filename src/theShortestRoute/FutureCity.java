package theShortestRoute;

import java.io.*;

public class FutureCity {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

        int[][] graph = new int[n + 1][n + 1];

        for (int i = 0; i < n + 1; i++) {
            for (int j = 0; j < n + 1; j++) {
                graph[i][j] = Integer.MAX_VALUE;
            }
        }

        for (int i = 1; i < n + 1; i++) {
            graph[i][i] = 0;
        }

        for (int i = 1; i < m + 1; i++) {
            String[] input = br.readLine().split(" ");
            int a = Integer.parseInt(input[0]), b = Integer.parseInt(input[1]);

            graph[a][b] = 1;
            graph[b][a] = 1;
        }

        for (int i = 1; i < n + 1; i++) {
            for (int j = 1; j < n + 1; j++) {
                for (int k = 1; k < n + 1; k++) {
                    if(graph[j][i] == Integer.MAX_VALUE || graph[i][k] == Integer.MAX_VALUE){
                        graph[j][k] = graph[j][k];
                    }else{
                        graph[j][k] = Math.min(graph[j][k], graph[j][i] + graph[i][k]);
                    }
                }
            }
        }

        String[] input = br.readLine().split(" ");
        int x = Integer.parseInt(input[0]), k = Integer.parseInt(input[1]);

        String result = "";

        if(graph[1][k] == Integer.MAX_VALUE || graph[k][x] == Integer.MAX_VALUE){
            result = "-1";
        }else{
            result = String.valueOf(graph[1][k] + graph[k][x]);
        }

        bw.write(result);
        bw.flush();
        bw.close();
    }
}
