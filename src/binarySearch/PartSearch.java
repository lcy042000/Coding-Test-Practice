package binarySearch;

import java.io.*;

public class PartSearch {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        String[] A = br.readLine().split(" ");

        int M = Integer.parseInt(br.readLine());
        String[] B = br.readLine().split(" ");

        int[] arr = new int[N], bArr = new int[M];

        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(A[i]);
        }

        for (int i = 0; i < M; i++) {
            bArr[i] = Integer.parseInt(B[i]);
        }

        for (int i = 0; i < M; i++) {
            if (binarySearch(arr, bArr[i])) bw.write("yes ");
            else bw.write("no ");
        }

        bw.flush();
        bw.close();
    }

    private static boolean binarySearch(int[] arr, int target){
        int start = 0, end = arr.length - 1;

        while(start <= end){
            int mid = (end + start) / 2;

            if(arr[mid] == target) {
                return true;
            }
            else if(arr[mid] < target) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }

        return false;
    }
}
