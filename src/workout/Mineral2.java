package workout;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class Mineral2 {
    static int r = 0, c = 0;
    static String[][] graph;
    static int[] dx = {0, -1, 0, 1}, dy = {-1, 0, 1, 0};

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] rc = br.readLine().split(" ");
        r = Integer.parseInt(rc[0]);
        c = Integer.parseInt(rc[1]);

        graph = new String[r][c];

        for (int i = 0; i < r; i++) {
            String[] in = br.readLine().split("");
            for (int j = 0; j < c; j++) {
                graph[i][j] = in[j];
            }
        }

        int n = Integer.parseInt(br.readLine());
        String[] in = br.readLine().split(" ");

        for (int i = 0; i < n; i++) {
            int v = Integer.parseInt(in[i]);

            if(i % 2 == 0){
                int x = (v - r) * -1, y = 0;

                while(true){
                    if(graph[x][y].equals("x")){
                        graph[x][y] = ".";

                        for (int j = 0; j < 4; j++) {
                            int nx = x + dx[j], ny = y + dy[j];

                            if (nx < 0 || ny < 0 || ny >= c || nx >= r) continue;

                            if(graph[nx][ny].equals("x")){
                                bfs(new int[]{nx, ny});
                            }
                        }

                        break;
                    }else if(y == c - 1){
                        break;
                    }else{
                        y++;
                    }
                }
            }else{
                int x = (v - r) * -1, y = c - 1;

                while(true){
                    if(graph[x][y].equals("x")){
                        graph[x][y] = ".";

                        for (int j = 0; j < 4; j++) {
                            int nx = x + dx[j], ny = y + dy[j];

                            if (nx < 0 || ny < 0 || ny >= c || nx >= r) continue;

                            if(graph[nx][ny].equals("x")){
                                bfs(new int[]{nx, ny});
                            }
                        }

                        break;
                    }else if(y == 0){
                        break;
                    }else{
                        y--;
                    }
                }

            }
        }


        bw.write(print(graph).toString());
        bw.flush();
        bw.close();
    }

    static void drop(String[][] list){
        int min = Integer.MAX_VALUE;

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if(!list[i][j].equals("-")){
                    list[i][j] = graph[i][j];
                }
            }
        }

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if(list[i][j].equals("-")){
                    int cnt = 0, x = i + 1;

                    while(x < r && !list[x][j].equals("x")){
                        cnt++;
                        x++;
                    }

                    min = Math.min(min, cnt);
                }
            }
        }

        for(int i = r - 1; i >= 0; i--){
            if(includes(list[i])){
                for (int j = 0; j < list[i].length; j++) {
                    if(list[i][j].equals("-")){
                        graph[i][j] = ".";
                        graph[i + min][j] = "x";
                    }
                }
            }
        }
    }

    static boolean includes(String[] list){
        for (int i = 0; i < list.length; i++) {
            if(list[i].equals("-")) return true;
        }

        return false;
    }

    static void bfs(int[] start){
        boolean[][] visited = new boolean[r][c];
        Queue<int[]> queue = new LinkedList<>();

        queue.add(start);
        visited[start[0]][start[1]] = true;

        String[][] list = new String[r][c];

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                list[i][j] = ".";
            }
        }

        while(!queue.isEmpty()){
            int[] xy = queue.remove();
            int x = xy[0], y = xy[1];

            list[x][y] = "-";

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];

                if(nx < 0 || ny < 0 || ny >= c) continue;

                if(nx >= r){
                    return;
                }

                if(!visited[nx][ny] && graph[nx][ny].equals("x")){
                    visited[nx][ny] = true;
                    queue.add(new int[]{nx, ny});
                }
            }
        }

        drop(list);
    }

    static StringBuilder print(String[][] list){
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                sb.append(list[i][j]);
            }

            sb.append("\n");
        }

        return sb;
    }
}
