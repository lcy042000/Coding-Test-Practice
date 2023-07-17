package binarySearch;

import java.io.*;
import java.util.Arrays;

public class CutTree {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] s = br.readLine().split(" ");
        int n = Integer.parseInt(s[0]), m = Integer.parseInt(s[1]);

        int[] arr = new int[n];

        String[] input = br.readLine().split(" ");

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(input[i]);
        }

        Arrays.sort(arr);

        int min = 0, max = arr[n - 1];

        while (min <= max){
            int half = (min + max) / 2;
            long sum = 0;

            for (int i = 0; i < n; i++) {
                if(arr[i] > half) sum += arr[i] - half;
            }

            if(sum >= m) min = half + 1;
            else max = half - 1;
        }

        bw.write(String.valueOf(min - 1));
        bw.flush();
        bw.close();
    }
}
