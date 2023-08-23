package workout;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NewGame {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int[] dx = {100, 0, 0, -1, 1}, dy = {100, 1, -1, 0, 0};

        String[] nk = br.readLine().split(" ");
        int n = Integer.parseInt(nk[0]), k = Integer.parseInt(nk[1]);
        int [][] graph = new int[n + 2][n + 2];

        for (int i = 0; i < n + 2; i++) {
            graph[0][i] = 2;
            graph[i][0] = 2;
            graph[n + 1][i] = 2;
            graph[i][n + 1] = 2;
        }

        for (int i = 1; i < n + 1; i++) {
            String[] row = br.readLine().split(" ");
            for (int j = 1; j < n + 1; j++) {
                graph[i][j] = Integer.parseInt(row[j - 1]);
            }
        }

        List<int[]> list = new ArrayList<>();
        list.add(new int[0]);
        List<Integer>[][] board = new List[n + 2][n + 2];
        for (int i = 0; i < n + 2; i++) {
            for (int j = 0; j < n + 2; j++) {
                board[i][j] = new ArrayList<>();
            }
        }

        for (int i = n + 1; i < n + k + 1; i++) {
            String[] rcv = br.readLine().split(" ");
            int r = Integer.parseInt(rcv[0]), c = Integer.parseInt(rcv[1]), v = Integer.parseInt(rcv[2]);

            board[r][c].add(i - n);
            list.add(new int[]{r, c, v});
        }

        int turn = 0;

        while(true){
            turn++;

            if(turn > 1000){
                bw.write("-1");
                break;
            }

            for (int i = 1; i < list.size(); i++) {
                int r = list.get(i)[0], c = list.get(i)[1], dir = list.get(i)[2];

                if(board[r][c].size() == 0 || board[r][c].get(0) != i) continue;

                int nx = r + dx[dir], ny = c + dy[dir], next = graph[nx][ny];

                if(next == 2){
                    if(dir % 2 == 0){
                        dir -= 1;
                    }else{
                        dir += 1;
                    }

                    list.get(i)[2] = dir;

                    nx = r + dx[dir];
                    ny = c + dy[dir];
                    next = graph[nx][ny];
                }

                if(next == 0){
                    List<Integer> horses = board[r][c];
                    board[r][c] = new ArrayList<>();
                    for(int horse : horses){
                        board[nx][ny].add(horse);
                        list.set(horse, new int[]{nx, ny, list.get(horse)[2]});
                    }
                }else if(next == 1){
                    List<Integer> horses = board[r][c];
                    board[r][c] = new ArrayList<>();
                    Collections.reverse(horses);
                    for(int horse : horses){
                        board[nx][ny].add(horse);
                        list.set(horse, new int[]{nx, ny, list.get(horse)[2]});
                    }
                }

                if(board[nx][ny].size() >= 4) {
                    System.out.println(String.valueOf(turn));
                    return;
                }
            }
        }

        bw.flush();
        bw.close();
    }
}
