package workout;

import java.io.*;
import java.util.*;

public class CrossRoad {
    static class Node implements Comparable<Node>{
        int node, value;

        public Node(int node, int value) {
            this.node = node;
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

        String[] nkr = br.readLine().split(" ");
        int n = Integer.parseInt(nkr[0]), k = Integer.parseInt(nkr[1]), r = Integer.parseInt(nkr[2]);
        List<List<Node>> graph = new ArrayList<>(n * n);

        for (int i = 0; i < n * n; i++) {
            graph.add(new ArrayList<>());
        }

        int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};

        List<List<Integer>> road = new ArrayList<>();
        for (int i = 0; i < n * n; i++) {
            road.add(new ArrayList<>());
        }
        for(int i = 0; i < r; i++){
            String[] in = br.readLine().split(" ");
            int x1 = Integer.parseInt(in[0]) - 1, y1 = Integer.parseInt(in[1]) - 1, x2 = Integer.parseInt(in[2]) - 1, y2 = Integer.parseInt(in[3]) - 1;

            road.get(x1 * n + y1).add(x2 * n + y2);
            road.get(x2 * n + y2).add(x1 * n + y1);
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                for (int l = 0; l < 4; l++) {
                    int nx = i + dx[l], ny = j + dy[l];

                    if(nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

                    if(road.get(i * n + j).contains(nx * n + ny)){
                        graph.get(i * n + j).add(new Node(nx * n + ny, 1));
                    }else{
                        graph.get(i * n + j).add(new Node(nx * n + ny, 0));
                    }
                }
            }
        }

        List<int[]> horses = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            String[] in = br.readLine().split(" ");

            horses.add(new int[]{Integer.parseInt(in[0]) - 1, Integer.parseInt(in[1]) - 1});
        }

        int cnt = 0;

        for(int i = 0; i < horses.size(); i++){
            int[] horse = horses.get(i);
            int start = horse[0] * n + horse[1];

            Queue<Node> queue = new PriorityQueue<>();
            queue.add(new Node(start, 0));

            int[] dist = new int[n * n];
            Arrays.fill(dist, Integer.MAX_VALUE);
            dist[start] = 0;

            while (!queue.isEmpty()){
                Node node = queue.remove();
                int cur = node.node, cost = node.value;

                if(dist[cur] < cost) continue;

                for (int j = 0; j < graph.get(cur).size(); j++) {
                    Node next = graph.get(cur).get(j);
                    int nextNode = next.node, nextCost = next.value;

                    if(dist[nextNode] > nextCost + cost){
                        dist[nextNode] = nextCost + cost;
                        queue.add(new Node(nextNode, dist[nextNode]));
                    }
                }
            }

            for (int j = i + 1; j < horses.size(); j++){
                int[] other = horses.get(j);

                if(dist[other[0] * n + other[1]] > 0) cnt++;
            }
        }

        bw.write(String.valueOf(cnt));
        bw.flush();
        bw.close();
    }
}
