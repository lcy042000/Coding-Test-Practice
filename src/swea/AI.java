package swea;

import java.io.*;
import java.util.*;

class Human{
    int a, b, c;

    public Human(int a, int b, int c) {
        this.a = b + c;
        this.b = a + c;
        this.c = a + b;
    }
}

class Node{
    int next;
    boolean[] isVisited;
    int sum;

    public Node(int next, boolean[] isVisited, int sum) {
        this.next = next;
        this.isVisited = isVisited;
        this.sum = sum;
    }
}

public class AI {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int t = Integer.parseInt(br.readLine());

        int[] result = new int[t];

        for (int i = 0; i < t; i++) {
            int n = Integer.parseInt(br.readLine());

            if (n < 3) {
                for (int j = 0; j < n; j++) {
                    br.readLine();
                }
                result[i] = -1;
                continue;
            }

            List<Human> humans = new ArrayList<>();

            for (int j = 0; j < n; j++) {
                String[] in = br.readLine().split(" ");
                humans.add(new Human(Integer.parseInt(in[0]), Integer.parseInt(in[1]), Integer.parseInt(in[2])));
            }

            Stack<Node> stack = new Stack<>();

            for (int j = 0; j < 3; j++) {
                boolean[] isVisited = new boolean[3];
                isVisited[j] = true;
                int sum = j == 0 ? humans.get(0).a : j == 1 ? humans.get(0).b : humans.get(0).c;
                stack.add(new Node(1, isVisited, sum));
            }

            int min = Integer.MAX_VALUE;

            while(!stack.isEmpty()){
                Node node = stack.pop();

                Set<Integer> set = zeros(node.isVisited);
                set = getMin(humans.get(node.next), set);
                Iterator<Integer> it = set.iterator();

                while (it.hasNext()){
                    int j = it.next();

                    int sum = node.sum;

                    switch (j){
                        case 0:
                            sum += humans.get(node.next).a;
                            break;
                        case 1:
                            sum += humans.get(node.next).b;
                            break;
                        case 2:
                            sum += humans.get(node.next).c;
                            break;
                    }

                    if(sum >= min) continue;

                    boolean[] isVisited = node.isVisited.clone();
                    isVisited[j] = true;

                    if(node.next + 1 == n){
                        boolean isTrue2 = true;

                        for (int k = 0; k < 3; k++) {
                            if(!isVisited[k]) isTrue2 = false;
                        }

                        if(!isTrue2){
                            continue;
                        }

                        min = Math.min(min, sum);
                    }else{
                        stack.push(new Node(node.next + 1, isVisited, sum));
                    }
                }
            }

            result[i] = min;
        }

        for (int i = 0; i < result.length; i++) {
            bw.write("#" + String.valueOf(i + 1) + " " + String.valueOf(result[i]) + "\n");
        }

        bw.flush();
        bw.close();
    }

    static Set<Integer> zeros(boolean[] isVisited){
        Set<Integer> set = new HashSet<>();

        for (int i = 0; i < 3; i++) {
            if(!isVisited[i]) set.add(i);
        }

        return set;
    }

    static Set<Integer> getMin(Human h, Set<Integer> set){
        int m = h.a;
        int idx = 0;

        if(m > h.b){
            m = h.b;
            idx = 1;
        }

        if(m > h.c){
            m = h.c;
            idx = 2;
        }

        set.add(idx);

        return set;
    }
}
