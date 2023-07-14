package greedy;

import java.io.*;
import java.util.Arrays;

public class ATM {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String N = br.readLine();
        int n = Integer.parseInt(N);

        String[] s = br.readLine().split(" ");
        int[] nums = new int[n];

        for (int i = 0; i < n; i++) {
            nums[i] = Integer.parseInt(s[i]);
        }

        Arrays.sort(nums);

        int[] sums = new int[n];
        sums[0] = nums[0];
        int sum = nums[0];

        for (int i = 1; i < n; i++) {
            sums[i] += sums[i-1] + nums[i];
            sum += sums[i];
        }

        bw.write(String.valueOf(sum));

        bw.flush();
        bw.close();
    }
}
