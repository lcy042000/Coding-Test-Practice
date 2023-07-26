package otherAlgorithms;

import java.io.*;

public class PartialSum {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] ns = br.readLine().split(" ");
        int n = Integer.parseInt(ns[0]), s = Integer.parseInt(ns[1]);
        int[] arr = new int[n], sumArr = new int[n];

        String[] in = br.readLine().split(" ");
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(in[i]);
        }

        sumArr[0] = arr[0];

        for(int i = 1; i < n; i++){
            sumArr[i] = sumArr[i - 1] + arr[i];
        }

        int start = 0, end = 0, minLen = Integer.MAX_VALUE;

        while(start < n && end < n){
            int sum = sumArr[end] - sumArr[start] + arr[start];

            if(sum < s){
                end++;
            }else{
                minLen = Math.min(minLen, end - start + 1);
                start++;
            }
        }

        String result = "";

        if(minLen == Integer.MAX_VALUE){
            result = "0";
        }else{
            result = String.valueOf(minLen);
        }

        bw.write(result);
        bw.flush();
        bw.close();
    }
}
