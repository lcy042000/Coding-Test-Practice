package theShortestRoute;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class FindMinimumCost {
    static class Node {
        int node;
        int value;

        public Node(int node, int value) {
            this.node = node;
            this.value = value;
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int m = Integer.parseInt(br.readLine());

        List<List<Node>> graph = new ArrayList<>(n + 1);

        for (int i = 0; i < n + 1; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < m; i++) {
            String[] sev = br.readLine().split(" ");
            int start = Integer.parseInt(sev[0]), end = Integer.parseInt(sev[1]), value = Integer.parseInt(sev[2]);

            graph.get(start).add(new Node(end, value));
        }

        String[] sten = br.readLine().split(" ");
        int start = Integer.parseInt(sten[0]), end = Integer.parseInt(sten[1]);

        int[] dist = new int[n + 1];

        for (int i = 0; i < n + 1; i++) {
            dist[i] = Integer.MAX_VALUE;
        }

        dist[start] = 0;
        Queue<Node> queue = new LinkedList<>();
        queue.add(new Node(start, 0));

        while(!queue.isEmpty()){
            Node node = queue.remove();

            if(node.value > dist[node.node]) continue;

            List<Node> list = graph.get(node.node);

            for(Node cur : list){
                if(dist[cur.node] > dist[node.node] + cur.value){
                    dist[cur.node] = dist[node.node] + cur.value;
                    queue.add(new Node(cur.node, dist[cur.node]));
                }
            }
        }

        bw.write(String.valueOf(dist[end]));
        bw.flush();
        bw.close();
    }
}
