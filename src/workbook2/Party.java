package workbook2;

import java.io.*;

public class Party {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

        int[][] board = new int[n][n];

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            for (int j = 0; j < n; j++) {
                board[i][j] = Integer.parseInt(s[j]);
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++) {
                    if(j == k) continue;

                    board[j][k] = Math.min(board[j][k], board[j][i] + board[i][k]);
                }
            }
        }

        for (int i = 0; i < m; i++) {
            String[] s = br.readLine().split(" ");
            int start = Integer.parseInt(s[0]), end = Integer.parseInt(s[1]), time = Integer.parseInt(s[2]);

            if(board[start - 1][end - 1] <= time) bw.write("Enjoy other party\n");
            else bw.write("Stay here\n");
        }

        bw.flush();
        bw.close();
    }
}
