package binarySearch;

import java.io.*;

public class CutLANcable {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] nk = br.readLine().split(" ");
        int n = Integer.parseInt(nk[0]), k = Integer.parseInt(nk[1]);

        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        int max = arr[n - 1];
        int min = 0;

        while(min < max){
            int mid = (max + min) / 2;

            int sum = 0;

            for (int i = 0; i < n; i++) {
                sum += arr[i] / mid;
            }

            if(sum >= k) min = mid + 1;
            else max = mid;
        }

        bw.write(String.valueOf(min - 1));
        bw.flush();
        bw.close();
    }
}
