package workbook2;

import java.io.*;

public class Game {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] xy = br.readLine().split(" ");
        int x = Integer.parseInt(xy[0]), y = Integer.parseInt(xy[1]);
        int z = 100 * y / x;

        if(z >= 99) bw.write(String.valueOf(-1));
        else{
            long left = 1, right = 1000000000, ans = Long.MAX_VALUE;

            while (left <= right){
                long mid = (left + right) / 2;
                long newZ = (100 * (y + mid)) / (x + mid);

                if(z != newZ){
                    ans = Math.min(ans, mid);
                    right = mid - 1;
                }else{
                    left = mid + 1;
                }
            }

            bw.write(String.valueOf(ans));
        }


        bw.flush();
        bw.close();
    }
}
