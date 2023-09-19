package workbook2;

import java.io.*;
import java.util.*;

public class BabyShark2 {
    static int[] dx = {0, -1, -1, -1, 0, 1, 1, 1}, dy = {-1, -1, 0, 1, 1, 1, 0, -1};
    static Queue<int[]> queue = new LinkedList<>();
    static int n, m;
    static int[][] visited;
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

          String[] nk = br.readLine().split(" ");
          n = Integer.parseInt(nk[0]);
          m = Integer.parseInt(nk[1]);
          int[][] map = new int[n][m];
          visited = new int[n][m];
          List<int[]> sharks = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < m; j++) {
                map[i][j] = Integer.parseInt(s[j]);

                if(map[i][j] == 1) sharks.add(new int[]{i, j});
            }
        }

        int[][] newArr = new int[n][m];
        for (int i = 0; i < n; i++) {
            Arrays.fill(newArr[i], Integer.MAX_VALUE);
        }

        for (int i = 0; i < sharks.size(); i++) {
            int[] xy = sharks.get(i);

            visited = new int[n][m];

            for (int j = 0; j < n; j++) {
                Arrays.fill(visited[j], -1);
            }
            visited[xy[0]][xy[1]] = 0;
            queue = new LinkedList<>();
            queue.add(new int[]{xy[0], xy[1]});
            bfs();

            for (int j = 0; j < n; j++) {
                for (int k = 0; k < m; k++) {
                    if(visited[j][k] >= 0) newArr[j][k] = Math.min(visited[j][k], newArr[j][k]);
                }
            }
        }

        int max = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                max = Math.max(newArr[i][j], max);
            }
        }
        bw.write(String.valueOf(max));
        bw.flush();
        bw.close();
    }

    static void bfs(){
        while(!queue.isEmpty()){
            int[] xy = queue.remove();

            for (int i = 0; i < 8; i++) {
                int nx = xy[0] + dx[i], ny = xy[1] + dy[i];

                if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

                if(visited[nx][ny] > -1) continue;

                visited[nx][ny] = visited[xy[0]][xy[1]] + 1;
                queue.add(new int[]{nx, ny});
            }
        }
    }
}
