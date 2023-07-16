package sort;

import java.io.*;
import java.util.Arrays;

public class FindNumber {
    static int[] arr;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int n = Integer.parseInt(br.readLine());
        String[] nums = br.readLine().split(" ");

        arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(nums[i]);
        }

        Arrays.sort(arr);

        int m = Integer.parseInt(br.readLine());

        String[] input = br.readLine().split(" ");

        for (int i = 0; i < m; i++) {
            int num = Integer.parseInt(input[i]);

            if(binarySearch(num, 0, n - 1)) bw.write(String.valueOf(1) + "\n");
            else bw.write(String.valueOf(0) + "\n");
        }

        bw.flush();
        bw.close();
    }

    static boolean binarySearch(int x, int start, int end){
        int half = (start + end) / 2;

        if(start > end) return false;
        if(arr[half] == x) return true;
        else if(arr[half] > x){
            return binarySearch(x, start, half - 1);
        }else{
            return binarySearch(x, half + 1, end);
        }
    }
}
