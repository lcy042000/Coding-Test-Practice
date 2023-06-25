package dfsAndbfs;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class EscapeMaze {
    static int N = 0, M = 0;
    static int[][] graph = null;
    static int[] dx = {-1, 1, 0, 0}, dy = {0, 0, -1, 1};

    static class Node{
        int x, y;

        public Node(int x, int y){
            this.x = x;
            this.y = y;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] NM = br.readLine().split(" ");

        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);

        graph = new int[N][M];

        for (int i = 0; i < N; i++) {
            String[] nums = br.readLine().split("");

            for (int j = 0; j < M; j++) {
                graph[i][j] = Integer.parseInt(nums[j]);
            }
        }

        bw.write(String.valueOf(bfs(0, 0)));
        bw.flush();
        bw.close();
    }

    private static int bfs(int x, int y){
        Queue<Node> queue = new LinkedList<>();

        queue.add(new Node(x, y));

        while(!queue.isEmpty()){
            Node node = queue.remove();
            int newX = node.getX(), newY = node.getY();

            for (int i = 0; i < 4; i++) {
                int nx = newX + dx[i], ny = newY + dy[i];

                if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

                if(graph[nx][ny] == 0) continue;

                if(graph[nx][ny] == 1){
                    graph[nx][ny] = graph[newX][newY] + 1;
                    queue.add(new Node(nx, ny));
                }
            }
        }

        return graph[N - 1][M - 1];
    }
}
