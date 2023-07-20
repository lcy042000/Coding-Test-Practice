package theShortestRoute;

import java.io.*;

public class FindRoute {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int[][] graph = new int[n][n];

        for (int i = 0; i < n; i++) {
            String[] input = br.readLine().split(" ");

            for (int j = 0; j < input.length; j++) {
                graph[i][j] = Integer.parseInt(input[j]);
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    if(graph[j][i] == 1 && graph[i][k] == 1){
                        graph[j][k] = 1;
                    }
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                bw.write(String.valueOf(graph[i][j]) + " ");
            }
            bw.write("\n");
        }

        bw.flush();
        bw.close();
    }
}
