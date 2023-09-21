package workbook2;

import java.io.*;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Omok {
    static int[][][] visited = new int[4][19][19];
    static String[][] map = new String[19][19];
    static int[] dx = {1, 1, 0, -1}, dy = {0, 1, 1, 1};
    static Queue<int[]> queue = new LinkedList<>();

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 19; j++) {
                Arrays.fill(visited[i][j], -1);
            }
        }

        for (int i = 0; i < 19; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < 19; j++) {
                if(s[j].equals("1")){
                    for (int k = 0; k < 4; k++) {
                        visited[k][i][j] = 1;
                    }

                    map[i][j] = "b";
                }else if(s[j].equals("2")){
                    for (int k = 0; k < 4; k++) {
                        visited[k][i][j] = 1;
                    }

                    map[i][j] = "w";
                }else{
                    map[i][j] = "n";
                }
            }
        }

        boolean isEnd = false;
        for (int i = 0; i < 19; i++) {
            for (int j = 0; j < 19; j++) {
                if(!map[j][i].equals("n")){
                    for (int k = 0; k < 4; k++) {
                        if(visited[k][j][i] == 1){
                            queue.add(new int[]{k, j, i});

                            if(bfs()){
                                isEnd = true;
                                if (map[j][i].equals("b")) {
                                    bw.write("1\n");
                                } else {
                                    bw.write("2\n");
                                }
                                bw.write(String.valueOf(j + 1) + " " + String.valueOf(i + 1));
                            }
                        }
                    }
                }
            }
        }

        if(!isEnd) bw.write("0");

        bw.flush();
        bw.close();
    }

    static boolean bfs(){
        while(!queue.isEmpty()){
            int[] xyz = queue.remove();
            int x = xyz[1], y = xyz[2], dir = xyz[0];
            int nx = x + dx[dir], ny = y + dy[dir];

            if(nx < 0 || 19 <= nx || ny < 0 || 19 <= ny){
                if(visited[dir][x][y] == 5){
                    queue = new LinkedList<>();
                    return true;
                }
                continue;
            }

            if(map[nx][ny] != map[x][y]){
                if(visited[dir][x][y] == 5){
                    queue = new LinkedList<>();
                    return true;
                }
                continue;
            }

            visited[dir][nx][ny] = visited[dir][x][y] + 1;
            queue.add(new int[]{dir, nx, ny});
        }

        return false;
    }
}
