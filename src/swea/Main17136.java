package swea;

import java.io.*;

public class Main17136 {
    static int[][] graph = new int[10][10];
    static int[] paper = {0, 5, 5, 5, 5, 5};
    static int result = Integer.MAX_VALUE;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        for (int i = 0; i < 10; i++) {
            String[] in = br.readLine().split(" ");
            for (int j = 0; j < 10; j++) {
                graph[i][j] = Integer.parseInt(in[j]);
            }
        }

        dfs(0, 0, 0);

        bw.write(result == Integer.MAX_VALUE ? String.valueOf(-1) : String.valueOf(result));
        bw.flush();
    }

    static void dfs(int x, int y, int cnt){
        if(result <= cnt) return;

        if(x > 9){
            result = Math.min(result, cnt);
            return;
        }

        if(y > 9){
            dfs(x + 1, 0, cnt);
            return;
        }

        if(graph[x][y] == 1){
            for (int i = 5; i > 0 ; i--) {
                if(paper[i] > 0 && isPossible(x, y, i)){
                    attachPaper(x, y, i, 0);
                    paper[i] -= 1;
                    dfs(x, y + 1, cnt + 1);
                    attachPaper(x, y, i, 1);
                    paper[i] += 1;
                }
            }
        }else{
            dfs(x, y + 1, cnt);
        }
    }

    static boolean isPossible(int x, int y, int w){
        if(x + w > 10 || y + w > 10) return false;

        for (int i = x; i < x + w; i++) {
            for (int j = y; j < y + w; j++) {
                if(graph[i][j] == 0) return false;
            }
        }

        return true;
    }

    static void attachPaper(int x, int y, int w, int num){
        for (int i = x; i < x + w; i++) {
            for (int j = y; j < y + w; j++) {
                graph[i][j] = num;
            }
        }
    }
}
