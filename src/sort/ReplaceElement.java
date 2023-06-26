package sort;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class ReplaceElement {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String input = br.readLine();

        int N = Integer.parseInt(input.split(" ")[0]) , K = Integer.parseInt(input.split(" ")[1]);

        List<Integer> A = new ArrayList<>(N), B = new ArrayList<>(N);

        String[] a = br.readLine().split(" ");
        String[] b = br.readLine().split(" ");

        for (int i = 0; i < N; i++) {
            A.add(Integer.parseInt(a[i]));
            B.add(Integer.parseInt(b[i]));
        }

        A.sort(Comparator.naturalOrder());
        B.sort(Comparator.reverseOrder());

        for (int i = 0; i < K; i++) {
            if(A.get(i) < B.get(i)){
                int tmp = A.remove(i);
                A.add(i, B.remove(i));
                B.add(i, tmp);
            }else {
                break;
            }
        }

        AtomicInteger sum = new AtomicInteger();

        A.forEach(num -> sum.addAndGet(num));

        bw.write(String.valueOf(sum));
        bw.flush();
        bw.close();
    }
}
