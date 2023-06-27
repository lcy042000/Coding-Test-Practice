package binarySearch;

import java.io.*;
import java.util.Arrays;

public class MakeRiceCake {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        int N = Integer.parseInt(input[0]), M = Integer.parseInt(input[1]);

        String[] cake = br.readLine().split(" ");

        int[] arr = new int[N];

        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(cake[i]);
        }

        Arrays.sort(arr);

        bw.write(String.valueOf(binarySearch(arr, M)));
        bw.flush();
        bw.close();
    }

    private static int binarySearch(int[] arr, int M){
        int start = 0, end = arr[arr.length - 1], result = 0;

        while(start <= end){
            int mid = (start + end) / 2;
            int sum = 0;

            for (int i = 0; i < arr.length; i++) {
                if(arr[i] > mid) sum += arr[i] - mid;
            }

            if(sum < M){
                end = mid - 1;
            }else{
                result = mid;
                start = mid + 1;
            }
        }

        return result;
    }
}
