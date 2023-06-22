package greedy;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class NumberCardGame {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input1 = br.readLine().split(" ");

        int N = Integer.parseInt(input1[0]), M = Integer.parseInt(input1[1]);

        List<List<Integer>> arrs = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            String[] in = br.readLine().split(" ");

            List<Integer> arr = new ArrayList<>(M);

            for (int j = 0; j < M; j++) {
                arr.add(Integer.parseInt(in[j]));
            }

            arr.sort(Comparator.naturalOrder());
            arrs.add(arr);
        }

        int min = Integer.MIN_VALUE;

        for (int i = 0; i < arrs.size(); i++) {
            if(min < arrs.get(i).get(0)) min = arrs.get(i).get(0);
        }

        bw.write(String.valueOf(min));
        bw.flush();
        bw.close();
    }
}
