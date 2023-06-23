package greedy;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class TheLawLargeNumber {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] input1 = br.readLine().split(" ");
        String[] input2 = br.readLine().split(" ");

        int N = Integer.parseInt(input1[0]), M = Integer.parseInt(input1[1]), K = Integer.parseInt(input1[2]);

        List<Integer> arr = new ArrayList<>(N);

        for (int i = 0; i < N; i++) {
            arr.add(Integer.parseInt(input2[i]));
        }

        arr.sort(Comparator.reverseOrder());

        int one = arr.get(0) * K + arr.get(1);
        int result = (M / (K + 1)) * one + (M % (K + 1)) * arr.get(0);

        bw.write(String.valueOf(result));
        bw.flush();
        bw.close();
    }
}
