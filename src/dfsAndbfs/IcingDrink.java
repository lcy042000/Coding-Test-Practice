package dfsAndbfs;

import java.io.*;

public class IcingDrink {
    static int N = 0, M = 0;
    static int[][] graph = null;

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

        int result = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if(dfs(i, j)) result++;
            }
        }

        bw.write(String.valueOf(result));
        bw.flush();
        bw.close();
    }

    private static boolean dfs(int x, int y){
        if(x <= -1 || x >= N || y <= -1 || y >= M) return false;

        if(graph[x][y] == 0) {
            graph[x][y] = 1;

            dfs(x - 1, y);
            dfs(x, y - 1);
            dfs(x + 1, y);
            dfs(x, y + 1);

            return true;
        }

        return false;
    }
}
