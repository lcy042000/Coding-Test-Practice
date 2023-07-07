package theShortestRoute;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.PriorityQueue;

public class Telegram {
    static class Node{
        int node;
        int distance;

        public Node(int node, int dist) {
            this.node = node;
            this.distance = dist;
        }

        public int getNode() {
            return node;
        }

        public void setNode(int node) {
            this.node = node;
        }

        public int getDistance() {
            return distance;
        }

        public void setDistance(int distance) {
            this.distance = distance;
        }
    }

    static class queueNode implements Comparable<queueNode>{
        private int priority;
        private int value;

        public queueNode(int priority, int value) {
            this.priority = priority;
            this.value = value;
        }

        public int getPriority() {
            return priority;
        }

        public void setPriority(int priority) {
            this.priority = priority;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int value) {
            this.value = value;
        }

        @Override
        public int compareTo(queueNode o) {
            if(this.priority > o.getPriority()){
                return 1;
            }else if(this.priority < o.getPriority()){
                return -1;
            }else{
                return 0;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]), start = Integer.parseInt(nm[2]);

        List<List<Node>> graph = new ArrayList<>(n + 1);
        int[] distance =  new int[n + 1];

        for (int i = 0; i < n + 1; i++) {
            graph.add(new ArrayList<>());
            distance[i] = Integer.MAX_VALUE;
        }

        for (int i = 1; i < m + 1; i++) {
            String[] input = br.readLine().split(" ");
            int a = Integer.parseInt(input[0]), b = Integer.parseInt(input[1]), c = Integer.parseInt(input[2]);

            graph.get(a).add(new Node(b, c));
        }

        PriorityQueue<queueNode> queue = new PriorityQueue<>();
        queue.add(new queueNode(0, start));
        distance[start] = 0;

        while(!queue.isEmpty()){
            queueNode node = queue.remove();
            int dist = node.priority, now = node.value;

            if(distance[now] < dist){
                continue;
            }

            Iterator<Node> iterator = graph.get(now).iterator();

            while(iterator.hasNext()){
                Node next = iterator.next();
                int cost = dist + next.distance;

                if(cost < distance[next.node]){
                    distance[next.node] = cost;
                    queue.add(new queueNode(cost, next.node));
                }
            }
        }

        int city = 0, time = 0;

        for (int i = 1; i < n + 1; i++) {
            if(distance[i] != Integer.MAX_VALUE && i != start){
                city++;
                time = Math.max(time, distance[i]);
            }
        }

        bw.write(String.valueOf(city) + " " + String.valueOf(time));
        bw.flush();
        bw.close();
    }
}
