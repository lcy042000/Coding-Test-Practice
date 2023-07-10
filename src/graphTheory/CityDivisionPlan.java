package graphTheory;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CityDivisionPlan {
    static class Node implements Comparable<Node>{
        int cost;
        int a;
        int b;

        public Node(int cost, int a, int b) {
            this.cost = cost;
            this.a = a;
            this.b = b;
        }

        public int getCost() {
            return cost;
        }

        public int getA() {
            return a;
        }

        public int getB() {
            return b;
        }

        @Override
        public int compareTo(Node o) {
            if(cost > o.getCost()){
                return 1;
            }else if(cost == o.getCost()){
                return 0;
            }else{
                return -1;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

        int[] parent = new int[n + 1];

        for (int i = 0; i < n + 1; i++) {
            parent[i] = i;
        }

        List<Node> edge = new ArrayList<>();
        int result = 0;

        for (int i = 1; i < m + 1; i++) {
            String[] input = br.readLine().split(" ");
            int a = Integer.parseInt(input[0]), b = Integer.parseInt(input[1]), cost = Integer.parseInt(input[2]);

            edge.add(new Node(cost, a, b));
        }

        Collections.sort(edge);

        int last = 0;

        for (int i = 0; i < edge.size(); i++) {
            Node node = edge.get(i);

            if(findParent(parent, node.a) != findParent(parent, node.b)){
                parent = unionParent(parent, node.a, node.b);
                result += node.cost;
                last = node.cost;
            }
        }

        bw.write(String.valueOf(result - last));
        bw.flush();
        bw.close();
    }

    private static int findParent(int[] parent, int x){
        if(parent[x] != x) parent[x] = findParent(parent, parent[x]);

        return parent[x];
    }

    private static int[] unionParent(int[] parent, int a, int b){
        int aParent = findParent(parent, a), bParent = findParent(parent, b);

        if(aParent < bParent) parent[b] = aParent;
        else parent[a] = bParent;

        return parent;
    }
}
