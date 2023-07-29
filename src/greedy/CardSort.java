package greedy;

import java.io.*;
import java.util.PriorityQueue;
import java.util.Queue;

public class CardSort {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        Queue<Integer> queue = new PriorityQueue<>();

        for (int i = 0; i < n; i++) {
            queue.add(Integer.parseInt(br.readLine()));
        }

        int result = 0;

        while(queue.size() > 1){
            int a = queue.remove(), b = queue.remove();

            result += a + b;
            queue.add(a + b);
        }

        bw.write(String.valueOf(result));

        bw.flush();
        bw.close();
    }
}
