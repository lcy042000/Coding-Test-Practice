package dfsAndbfs;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class Tomato {
    static class Node{
        int x, y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] mn = br.readLine().split(" ");
        int m = Integer.parseInt(mn[0]), n = Integer.parseInt(mn[1]);
        int[][] graph = new int[n][m];
        Queue<Node> queue = new LinkedList<>();
        int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};

        boolean isRipen = true;

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < m; j++) {
                graph[i][j] = Integer.parseInt(s[j]);

                if(graph[i][j] == 0) isRipen = false;
                else if(graph[i][j] == 1) queue.add(new Node(i, j));
            }
        }

        if(isRipen){
            bw.write("0");
        }else{
            while (!queue.isEmpty()){
                Node node = queue.remove();

                for (int i = 0; i < 4; i++) {
                    int nx = node.x + dx[i], ny = node.y + dy[i];

                    if(nx < 0 || nx >= n || ny < 0 || ny >= m || graph[nx][ny] < 0) continue;

                    if(graph[nx][ny] == 0){
                        graph[nx][ny] = graph[node.x][node.y] + 1;
                        queue.add(new Node(nx, ny));
                    }else{
                        graph[nx][ny] = Math.min(graph[nx][ny], graph[node.x][node.y] + 1);
                    }
                }
            }

            int result = 0, max = Integer.MIN_VALUE;

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if(graph[i][j] == 0) result = -1;
                    else if(graph[i][j] > 0) max = Math.max(max, graph[i][j]);
                }
            }

            if(result == -1) bw.write("-1");
            else bw.write(String.valueOf(max - 1));
        }

        bw.flush();
        bw.close();
    }
}
