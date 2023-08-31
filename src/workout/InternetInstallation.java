package workout;

import java.io.*;
import java.util.*;

public class InternetInstallation {
    static int n, p, k;
    static List<List<int[]>> list;
    static int[] dist;

    static class Node implements Comparable<Node>{
        int index, value;

        public Node(int index, int value) {
            this.index = index;
            this.value = value;
        }

        @Override
        public int compareTo(Node o) {
            return this.value - o.value;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] npk = br.readLine().split(" ");
        n = Integer.parseInt(npk[0]);
        p = Integer.parseInt(npk[1]);
        k = Integer.parseInt(npk[2]);

        list = new ArrayList<>();

        for (int i = 0; i < n + 1; i++) {
            list.add(new LinkedList<>());
        }

        int maxValue = -1;

        for (int i = 0; i < p; i++) {
            String[] abv = br.readLine().split(" ");
            int a = Integer.parseInt(abv[0]), b = Integer.parseInt(abv[1]), v = Integer.parseInt(abv[2]);

            list.get(a).add(new int[]{b, v});
            list.get(b).add(new int[]{a, v});

            maxValue = Math.max(v, maxValue);
        }

        dist = new int[n + 1];

        int start = 0, result = -1;

        while(start <= maxValue){
            int mid = (start + maxValue) / 2;

            if(dijkstra(mid)){
                result = mid;
                maxValue = mid - 1;
            }else{
                start = mid + 1;
            }
        }

        bw.write(String.valueOf(result));
        bw.flush();
        bw.close();
    }

    static boolean dijkstra(int d){
        Queue<Node> queue = new PriorityQueue<>();

        for (int i = 0; i < n + 1; i++) {
            dist[i] = Integer.MAX_VALUE;
        }

        dist[1] = 0;
        queue.add(new Node(1, 0));

        while(!queue.isEmpty()){
            int index = queue.peek().index;
            int value = queue.peek().value;

            queue.remove();

            if(dist[index] < value) continue;

            for(int[] arr : list.get(index)){
                int next = arr[0], nextValue = value;

                if(arr[1] > d) nextValue++;

                if(nextValue < dist[next]){
                    dist[next] = nextValue;
                    queue.add(new Node(next, nextValue));
                }
            }
        }

        return dist[n] <= k;
    }
}
