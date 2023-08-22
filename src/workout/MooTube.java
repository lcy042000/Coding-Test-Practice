package workout;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class MooTube {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nq = br.readLine().split(" ");
        int n = Integer.parseInt(nq[0]), ques = Integer.parseInt(nq[1]);
        List<List<int[]>> list = new ArrayList<>(n + 1);

        for (int i = 0; i < n + 1; i++) {
            list.add(new LinkedList<>());
        }

        for (int i = 0; i < n - 1; i++) {
            String[] in = br.readLine().split(" ");
            int p = Integer.parseInt(in[0]), q = Integer.parseInt(in[1]), r = Integer.parseInt(in[2]);

            list.get(p).add(new int[]{q, r});
            list.get(q).add(new int[]{p, r});
        }

        for (int i = 0; i < ques; i++) {
            String[] kv = br.readLine().split(" ");
            int k = Integer.parseInt(kv[0]), v = Integer.parseInt(kv[1]);

            boolean[] visited = new boolean[n + 1];
            Queue<Integer> queue = new LinkedList<>();
            visited[v] = true;
            queue.add(v);
            int count = 0;

            while(!queue.isEmpty()){
                int cur = queue.remove();

                for(int[] a : list.get(cur)){
                    if(!visited[a[0]] && a[1] >= k){
                        visited[a[0]] = true;
                        count++;
                        queue.add(a[0]);
                    }
                }
            }

            bw.write(String.valueOf(count) + "\n");
        }

        bw.flush();
        bw.close();
    }
}
