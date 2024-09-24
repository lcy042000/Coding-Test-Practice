package swea;

import java.util.*;
import java.io.*;

public class MagicForest {
    static class Node{
        int x, y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    static int[][] graph;
    static int R, C, K;
    static int point = 0;
    static int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};

    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));


        String[] rck = br.readLine().split(" ");
        R = Integer.parseInt(rck[0]);
        C = Integer.parseInt(rck[1]);
        K = Integer.parseInt(rck[2]);
        graph = new int[R + 3][C];

        for(int i = 0; i < K; i++) {
            String[] cd = br.readLine().split(" ");
            int c = Integer.parseInt(cd[0]) - 1, d = Integer.parseInt(cd[1]);

            addNode(c, d);
        }

        bw.write(String.valueOf(point));
        bw.flush();
        bw.close();
    }

    static void cleanGraph() {
        graph = new int[R + 3][C];
    }

    static boolean isDown(int x, int y) {
        if(x >= R + 1) return false;

        return graph[x + 1][y - 1] < 1 && graph[x + 2][y] < 1 && graph[x + 1][y + 1] < 1;
    }

    static boolean isLeft(int x, int y) {
        if(y < 2) return false;

        return graph[x - 1][y - 1] < 1 && graph[x][y - 2] < 1 && graph[x + 1][y - 1] < 1;
    }

    static boolean isRight(int x, int y) {
        if(y >= C - 2) return false;

        return graph[x - 1][y + 1] < 1 && graph[x][y + 2] < 1 && graph[x + 1][y + 1] < 1;
    }

    static int turnLeft(int exit) {
        return (exit + 3) % 4;
    }

    static int turnRight(int exit) {
        return (exit + 1) % 4;
    }

    static int[] calcMove(int x, int y) {
        if(isDown(x, y)) return new int[]{x + 1, y};
        if(isLeft(x, y) && isDown(x, y - 1)) return new int[] {x + 1, y - 1};
        if(isRight(x, y) && isDown(x, y + 1)) return new int[] {x + 1, y + 1};

        return new int[] {x, y};
    }

    static boolean isMove(int cv, int nv) {
        if(cv == 3) return true;
        if(cv == 1) return true;
        if(cv == 2 && nv == 1) return true;

        return false;
    }

    static int calcPoint(int x, int y) {
        Queue<Node> queue = new LinkedList();
        boolean[][] isVisited = new boolean[R + 3][C];

        queue.add(new Node(x, y));
        int max = x;

        while(!queue.isEmpty()) {
            Node cur = queue.remove();

            for(int i = 0; i < 4; i++) {
                int nx = cur.x + dx[i], ny = cur.y + dy[i];

                if(nx < 3 || nx >= R + 3 || ny < 0 || ny >= C || graph[nx][ny] < 1) continue;
                if(isVisited[nx][ny]) continue;

                if(!isMove(graph[cur.x][cur.y], graph[nx][ny])) continue;

                isVisited[nx][ny] = true;

                max = Math.max(max, nx);
                queue.add(new Node(nx, ny));
            }
        }

        return max - 3;
    }

    static void addNode(int y, int exit) {
        int cx = 1, cy = y, cexit = exit;

        while(true) {
            int[] next = calcMove(cx, cy);
            int nx = next[0], ny = next[1];

            if(nx == cx && ny == cy) break;

            if(nx == cx + 1 && ny == cy) {
                cx = nx;
                cy = ny;
                continue;
            }

            if(nx == cx + 1 && ny == cy - 1) {
                cx = nx;
                cy = ny;
                cexit = turnLeft(cexit);
                continue;
            }

            if(nx == cx + 1 && ny == cy + 1) {
                cx = nx;
                cy = ny;
                cexit = turnRight(cexit);
                continue;
            }
        }

        if(cx <= 3) {
            cleanGraph();
            return;
        }

        graph[cx][cy] = 1; // 중심 좌표
        graph[cx - 1][cy] = 2; // 북
        graph[cx][cy + 1] = 2; // 동
        graph[cx + 1][cy] = 2; // 남
        graph[cx][cy - 1] = 2; // 서
        graph[cx + dx[cexit]][cy + dy[cexit]] = 3; // 출구

        int cPoint = calcPoint(cx + dx[cexit], cy + dy[cexit]);
        point += (cPoint + 1);

    }
}

