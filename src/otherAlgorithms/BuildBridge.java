package otherAlgorithms;

import java.io.*;

public class BuildBridge {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int t = Integer.parseInt(br.readLine());

        for(int i = 0; i < t; i++){
            String[] nm = br.readLine().split(" ");
            int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

            long top = 1, bottom = 1;

            int max = Math.max(m - n, n), min = Math.min(m - n, n);

            for(int j = m; j > max; j--){
                top *= j;
            }

            for(int j = 1; j < min + 1; j++){
                bottom *= j;
            }

            bw.write(String.valueOf(top / bottom) + "\n");
        }

        bw.flush();
        bw.close();
    }
}
