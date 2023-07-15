package dfsAndbfs;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class LabyrinthSearch {
    static class Node{
        int x;
        int y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

        int[][] graph = new int[n][m];

        for (int i = 0; i < n; i++) {
            String[] row = br.readLine().split("");

            for (int j = 0; j < m; j++) {
                graph[i][j] = Integer.parseInt(row[j]);
            }
        }

        int[] dx = {0, 1, 0, -1}, dy = {1, 0, -1, 0};

        Queue<Node> queue = new LinkedList<>();
        queue.add(new Node(0, 0));

        while(!queue.isEmpty()){
            Node node = queue.remove();

            for (int i = 0; i < 4; i++) {
                int nx = node.x + dx[i], ny = node.y + dy[i];

                if(nx >= 0 && ny >= 0 && nx < n && ny < m && graph[nx][ny] == 1){
                    queue.add(new Node(nx, ny));
                    graph[nx][ny] = graph[node.x][node.y] + 1;
                }
            }
        }

        bw.write(String.valueOf(graph[n - 1][m - 1]));
        bw.flush();
        bw.close();
    }
}
