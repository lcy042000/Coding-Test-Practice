package workbook2;

import java.io.*;

public class ContinuousSum {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        String[] s = br.readLine().split(" ");
        int[] arr = new int[n];

        int cur = 0, best = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            int num = Integer.parseInt(s[i]);
            cur = Math.max(num, cur + num);
            best = Math.max(best, cur);
        }

        bw.write(String.valueOf(best));
        bw.flush();
        bw.close();
    }
}
