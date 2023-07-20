package theShortestRoute;

import java.io.*;
import java.util.*;

public class TheShortestRoute {
    static class Node implements Comparable<Node>{
        int index;
        int value;

        public Node(int index, int value){
            this.index = index;
            this.value = value;
        }

        @Override
        public int compareTo(Node o) {
            if(value > o.value){
                return 1;
            }else if(value < o.value){
                return -1;
            }else{
                return 0;
            }
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] ve = br.readLine().split(" ");
        int v = Integer.parseInt(ve[0]), e = Integer.parseInt(ve[1]);
        int start = Integer.parseInt(br.readLine());

        List<List<Node>> graph = new ArrayList<>(v + 1);
        int[] arr = new int[v + 1];

        for (int i = 0; i < v + 1; i++) {
            graph.add(new ArrayList<>());
            arr[i] = Integer.MAX_VALUE;
        }

        arr[start] = 0;

        for (int i = 0; i < e; i++) {
            String[] uvw = br.readLine().split(" ");
            int u = Integer.parseInt(uvw[0]), V = Integer.parseInt(uvw[1]), w = Integer.parseInt(uvw[2]);

            graph.get(u).add(new Node(V, w));
        }

        Queue<Node> queue = new PriorityQueue<>();
        queue.add(new Node(start, 0));

        while(!queue.isEmpty()){
            Node node = queue.remove();
            int index = node.index, value = node.value;

            List<Node> list = graph.get(index);

            if(arr[index] < value) continue;

            for (int i = 0; i < list.size(); i++) {
                Node vw = list.get(i);

                if(arr[vw.index] > arr[index] + vw.value){
                    arr[vw.index] = arr[index] + vw.value;
                    queue.add(new Node(vw.index, arr[vw.index]));
                }
            }
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i < arr.length; i++) {
            if(arr[i] == Integer.MAX_VALUE) sb.append("INF\n");
            else sb.append(String.valueOf(arr[i]) + "\n");
        }

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }
}
