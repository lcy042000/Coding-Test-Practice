package workbook2;

import java.io.*;

public class Round {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nk = br.readLine().split(" ");
        int n = Integer.parseInt(nk[0]);
        long k = Long.valueOf(nk[1]);
        long[] lens = new long[n];

        String[] s = br.readLine().split(" ");
        for (int i = 0; i < n; i++) {
            lens[i] = Integer.parseInt(s[i]);
        }

        long len = k;

        for (int i = 0; i < n; i++) {
            len -= lens[i];

            if(len < 0){
                bw.write(String.valueOf(i + 1));
                break;
            }
        }

        if(len >= 0){
            for(int i = n - 1; i >= 0; i--){
                len -= lens[i];

                if(len < 0){
                    bw.write(String.valueOf(i + 1));
                    break;
                }
            }
        }
        bw.flush();
        bw.close();
    }
}
