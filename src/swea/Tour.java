package swea;

import java.util.*;
import java.io.*;

public class Tour {
    static class Node implements Comparable<Node>{
        int id, rev, cost, dest;

        public Node(int id, int rev, int cost, int dest) {
            this.id = id;
            this.rev = rev;
            this.cost = cost;
            this.dest = dest;
        }

        public int getGain() {
            return this.cost == Integer.MAX_VALUE ? -1 : this.rev - this.cost;
        }

        @Override
        public int compareTo(Node other) {
            int profit = this.getGain(), otherP = other.getGain();

            if(profit < 0 && otherP < 0) {
                return this.id - other.id;
            }

            if(profit < 0 && otherP >= 0) {
                return 1;
            }

            if(profit >= 0 && otherP < 0) {
                return -1;
            }

            if(profit == otherP) {
                return this.id - other.id;
            }

            return otherP - profit;
        }
    }

    static int N, M, start;
    static int[] dist;
    static List<int[]> graph;
    static Queue<Node> pq = new PriorityQueue<Node>();
    static boolean[] isExist = new boolean[30001];

    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int Q = Integer.parseInt(br.readLine());

        for(int i = 0; i < Q; i++) {
            String[] in = br.readLine().split(" ");

            int cmd = Integer.parseInt(in[0]), id, rev, dest;

            switch(cmd) {
                case 100:
                    makeTour(in);
                    updateGraph();
                    break;
                case 200:
                    id = Integer.parseInt(in[1]);
                    rev = Integer.parseInt(in[2]);
                    dest = Integer.parseInt(in[3]);

                    int cost = calcCost(dest);
                    pq.add(new Node(id, rev, cost, dest));
                    isExist[id] = true;
                    break;
                case 300:
                    id = Integer.parseInt(in[1]);
                    isExist[id] = false;
                    break;
                case 400:
                    if(pq.isEmpty()) {
                        bw.append("-1\n");
                        break;
                    }

                    Node root = pq.peek();

                    while(root != null && !isExist[root.id]) {
                        pq.poll();
                        root = pq.peek();
                    }

                    if(root == null || root.getGain() < 0) {
                        bw.append("-1\n");
                        break;
                    }

                    bw.append(root.id + "\n");
                    isExist[root.id] = false;
                    pq.poll();
                    break;
                case 500:
                    start = Integer.parseInt(in[1]);
                    updateGraph();
                    clearQueue();
                    break;
            }
        }

        bw.flush();
        bw.close();
    }

    static void clearQueue() {
        Queue<Node> nQueue = new PriorityQueue<Node>();
        List<Node> list = new ArrayList();

        pq.forEach(node -> {
            int nCost = calcCost(node.dest);

            list.add(new Node(node.id, node.rev, nCost, node.dest));
        });

        nQueue.addAll(list);

        pq = nQueue;
    }

    static int calcCost(int dest) {
        return dist[dest];
    }

    static void makeTour(String[] infos) {
        N = Integer.parseInt(infos[1]);
        M = Integer.parseInt(infos[2]);
        graph = new ArrayList<int[]>();
        start = 0;

        for (int i = 0; i < N; i++) {
            int[] arr = new int[N];
            Arrays.fill(arr, Integer.MAX_VALUE);
            arr[i] = 0;

            graph.add(arr);
        }

        for(int i = 3; i < infos.length - 2; i += 3) {
            int u = Integer.parseInt(infos[i]),
                    v = Integer.parseInt(infos[i + 1]),
                    w = Integer.parseInt(infos[i + 2]);

            int[] arr1 = graph.get(u), arr2 = graph.get(v);

            if(arr1[v] <= w) continue;

            arr1[v] = w;
            arr2[u] = w;
        }
    }

    static void updateGraph() {
        Queue<int[]> queue = new PriorityQueue<int[]>((arr1, arr2) -> arr1[1] - arr2[1]);

        dist = new int[N];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;

        queue.add(new int[] {start, 0});

        while(!queue.isEmpty()) {
            int[] infos = queue.poll();
            int dest = infos[0], value = infos[1];

            if(dist[dest] < value) continue;

            int[] nArr = graph.get(dest);

            for(int idx = 0; idx < N; idx++) {
                if(nArr[idx] == Integer.MAX_VALUE) continue;

                int nValue = value + nArr[idx];

                if(dist[idx] <= nValue) continue;

                dist[idx] = nValue;
                queue.add(new int[] {idx, nValue});
            }
        }
    }
}
