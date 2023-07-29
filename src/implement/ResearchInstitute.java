package implement;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class ResearchInstitute {
    static int n, m;
    static int[][] graph;
    static int result = Integer.MIN_VALUE;
    static int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};

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

        String[] nm = br.readLine().split(" ");
        n = Integer.parseInt(nm[0]);
        m = Integer.parseInt(nm[1]);

        graph = new int[n][m];

        for (int i = 0; i < n; i++) {
            String[] in = br.readLine().split(" ");

            for (int j = 0; j < m; j++) {
                graph[i][j] = Integer.parseInt(in[j]);
            }
        }

        dfs(0);

        bw.write(String.valueOf(result));
        bw.flush();
        bw.close();
    }

    static void dfs(int wall){
        if(wall == 3){
            getSafeArea();

            return;
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if(graph[i][j] == 0){
                    graph[i][j] = 1;
                    dfs(wall + 1);
                    graph[i][j] = 0;
                }
            }
        }
    }

    static void getSafeArea(){
        Queue<Node> queue = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if(graph[i][j] == 2){
                    queue.add(new Node(i, j));
                }
            }
        }

        int[][] arr = new int[n][m];

        for (int i = 0; i < n; i++) {
            arr[i] = graph[i].clone();
        }

        while (!queue.isEmpty()){
            Node node = queue.remove();
            int x = node.x, y = node.y;

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];

                if(nx >= 0 && nx < n && ny >= 0 && ny < m && arr[nx][ny] == 0){
                    arr[nx][ny] = 2;
                    queue.add(new Node(nx, ny));
                }
            }
        }

        int count = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if(arr[i][j] == 0){
                    count++;
                }
            }
        }

        result = Math.max(count, result);
    }
}
