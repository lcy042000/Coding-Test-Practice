package implement;

import java.io.*;

public class RoyalNight {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split("");

        char col = input[0].charAt(0);
        int row = Integer.parseInt(input[1]);

        int[] dx = {-1, 1, -1, 1, -2, -2, 2, 2};
        int[] dy = {2, 2, -2, -2, 1, -1, 1, -1};

        int count = 0;

        for (int i = 0; i < 8; i++) {
            if(col + dx[i] >= 'a' && col + dx[i] <= 'h'
            && row + dy[i] >= 1 && row + dy[i] <= 8){
                count++;
            }
        }

        bw.write(String.valueOf(count));
        bw.flush();
        bw.close();
    }
}
