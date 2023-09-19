package workbook2;

import java.io.*;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class BreakingTheWall {
    static int n, m;
    static int[][] map;
    static int[][][] visited;
    static Queue<int[]> queue = new LinkedList<>();

    static int[] dx = {0, -1, 0, 1}, dy = {-1, 0, 1, 0};
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        n = Integer.parseInt(nm[0]);
        m = Integer.parseInt(nm[1]);

        map = new int[n][m];
        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split("");
            for (int j = 0; j < m; j++) {
                map[i][j] = Integer.parseInt(s[j]);
            }
        }

        visited = new int[2][n][m];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < n; j++) {
                Arrays.fill(visited[i][j], -1);
            }
        }

        visited[0][0][0] = 1;

        queue.add(new int[]{0, 0, 0});

        bw.write(String.valueOf(bfs()));
        bw.flush();
        bw.close();
    }

    static int bfs(){
        while(!queue.isEmpty()){
            int[] abc = queue.remove();
            int x = abc[0], y = abc[1], isBroken = abc[2];

            if(x == n - 1 && y == m - 1) return visited[isBroken][x][y];

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];

                if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

                if(map[nx][ny] == 0 && visited[isBroken][nx][ny] == -1){
                    visited[isBroken][nx][ny] = visited[isBroken][x][y] + 1;
                    queue.add(new int[]{nx, ny, isBroken});
                }else if(map[nx][ny] == 1 && isBroken == 0 && visited[1][nx][ny] == -1){
                    visited[1][nx][ny] = visited[0][x][y] + 1;
                    queue.add(new int[]{nx, ny, 1});
                }
            }
        }

        return -1;
    }
}
