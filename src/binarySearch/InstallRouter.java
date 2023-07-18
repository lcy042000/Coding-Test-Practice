package binarySearch;

import java.io.*;
import java.util.Arrays;

public class InstallRouter {
    static int n;
    static int c;
    static int[] arr;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] nc = br.readLine().split(" ");
        n = Integer.parseInt(nc[0]);
        c = Integer.parseInt(nc[1]);

        arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        Arrays.sort(arr);

        long min = 1, max = arr[n - 1];

        while(min <= max){
            long mid = (min + max) / 2;

            if(isPossible(mid) < c) max = mid - 1;
            else min = mid + 1;
        }

        bw.write(String.valueOf(min - 1));
        bw.flush();
        bw.close();
    }

    private static int isPossible(long distance){
        int count = 1;
        int curIndex = 0;

        for (int i = 1; i < n; i++) {
            if(arr[i] - arr[curIndex] >= distance){
                count++;
                curIndex = i;
            }
        }

        return count;
    }
}
