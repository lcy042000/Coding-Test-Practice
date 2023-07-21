package theShortestRoute;

import java.io.*;

public class Floyd {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int m = Integer.parseInt(br.readLine());

        int[][] graph = new int[n + 1][n + 1];

        for (int i = 0; i < n + 1; i++) {
            for (int j = 0; j < n + 1; j++) {
                graph[i][j] = Integer.MAX_VALUE;
            }
        }

        for (int i = 0; i < m; i++) {
            String[] input = br.readLine().split(" ");
            int start = Integer.parseInt(input[0]), end = Integer.parseInt(input[1]), value = Integer.parseInt(input[2]);

            graph[start][end] = Math.min(graph[start][end], value);
        }

        for (int i = 1; i < n + 1; i++) {
            for (int j = 1; j < n + 1; j++) {
                for (int k = 1; k < n + 1; k++) {
                    if(j == k) graph[j][k] = 0;
                    else {
                        if(graph[j][k] > 0 && graph[j][i] + graph[i][k] > 0) {
                            graph[j][k] = Math.min(graph[j][k], graph[j][i] + graph[i][k]);
                        }
                    }
                }
            }
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i < n + 1; i++) {
            for (int j = 1; j < n + 1; j++) {
                if(graph[i][j] == Integer.MAX_VALUE || graph[i][j] < 0) sb.append(String.valueOf(0));
                else sb.append(String.valueOf(graph[i][j]));

                sb.append(" ");
            }
            sb.append("\n");
        }

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }
}
