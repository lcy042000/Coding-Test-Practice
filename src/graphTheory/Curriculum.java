package graphTheory;

import java.io.*;
import java.util.*;

public class Curriculum {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());

        int[] indegeree = new int[n + 1];
        List<List<Integer>> graph = new ArrayList<>(n+1);

        for (int i = 0; i < n + 1; i++) {
            graph.add(new ArrayList<>());
        }

        int[] time = new int[n + 1];

        for (int i = 1; i < n + 1; i++) {
            String[] input = br.readLine().split(" ");

            time[i] = Integer.parseInt(input[0]);

            for(int j = 1; j < input.length - 1; j++){
                indegeree[i] += 1;
                graph.get(Integer.parseInt(input[j])).add(i);
            }
        }

        int[] result = Arrays.copyOf(time, time.length);
        Queue<Integer> queue = new LinkedList<>();

        for (int i = 1; i < n + 1; i++) {
            if(indegeree[i] == 0) queue.add(i);
        }

        while(!queue.isEmpty()){
            int now = queue.remove();

            List<Integer> inGraph = graph.get(now);

            for (int i = 0; i < inGraph.size(); i++) {
                result[i] = Math.max(result[i], result[now] + time[i]);
                indegeree[i] -= 1;

                if(indegeree[i] == 0) queue.add(i);
            }
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i < n + 1; i++) {
            sb.append(result[i] + "\n");
        }

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }
}
