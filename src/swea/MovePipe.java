package swea;

import java.io.*;
import java.util.Stack;

public class MovePipe {
    static int N;
    static int[][] graph;

    static int[] rowDx = {0, 1};
    static int[] rowDy = {1, 1};

    static int[] colDx = {1, 1};
    static int[] colDy = {0, 1};

    static int[] diaDx = {0, 1, 1};
    static int[] diaDy = {1, 1, 0};

    static class Node{
        int dir;
        int x, y;

        public Node(int dir, int x, int y) {
            this.dir = dir;
            this.x = x;
            this.y = y;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        graph = new int[N][N];

        for (int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");

            for (int j = 0; j < N; j++) {
                graph[i][j] = Integer.parseInt(line[j]);
            }
        }

        Stack<Node> stack = new Stack<>();
        int cnt = 0;
        stack.add(new Node(0, 0, 1));

        while(!stack.isEmpty()){
            Node cur = stack.pop();

            int[] dx = cur.dir == 0 ? rowDx : cur.dir == 1 ? colDx : diaDx;
            int[] dy = cur.dir == 0 ? rowDy : cur.dir == 1 ? colDy : diaDy;

            for (int i = 0; i < dx.length; i++) {
                int nx = cur.x + dx[i], ny = cur.y + dy[i];

                if(nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                if(graph[nx][ny] == 1) continue;

                int nDir = dx[i] == 0 && dy[i] == 1 ? 0 : dx[i] == 1 && dy[i] == 0 ? 1 : 2;

                if(nDir == 2 && (graph[nx - 1][ny] == 1 || graph[nx][ny - 1] == 1)) continue;

                if(nx == N - 1 && ny == N - 1){
                    cnt++;
                    continue;
                }

                stack.add(new Node(nDir, nx, ny));
            }
        }

        bw.write(String.valueOf(cnt));
        bw.flush();
        bw.close();
    }
}
