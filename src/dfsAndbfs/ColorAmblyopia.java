package dfsAndbfs;

import java.io.*;

public class ColorAmblyopia {
    static String[][] graph;
    static boolean[][] visited;
    static int n;
    static int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        n = Integer.parseInt(br.readLine());
        graph = new String[n][n];
        visited = new boolean[n][n];

        for (int i = 0; i < n; i++) {
            String[] in = br.readLine().split("");
            for (int j = 0; j < n; j++) {
                graph[i][j] = in[j];
            }
        }

        int count = 0, amblyopiaCount = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(!visited[i][j]){
                    count++;
                    dfs(i, j, graph[i][j]);
                }
            }
        }

        visited = new boolean[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(graph[i][j].equals("G")) graph[i][j] = "R";
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(!visited[i][j]){
                    amblyopiaCount++;
                    dfs(i, j, graph[i][j]);
                }
            }
        }

        bw.write(String.valueOf(count) + " " + String.valueOf(amblyopiaCount));
        bw.flush();
        bw.close();
    }

    static void dfs(int x, int y, String color){
        if(x >= 0 && x < n && y >= 0 && y < n && !visited[x][y] && graph[x][y].equals(color)){
            visited[x][y] = true;

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                dfs(nx, ny, color);
            }
        }
    }
}
