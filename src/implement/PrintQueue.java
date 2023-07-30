package implement;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class PrintQueue {
    static class Node{
        int index, value;

        public Node(int index, int value) {
            this.index = index;
            this.value = value;
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int t = Integer.parseInt(br.readLine());

        for (int i = 0; i < t; i++) {
            String[] nm = br.readLine().split(" ");
            int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

            String[] in = br.readLine().split(" ");
            List<Node> arr = new ArrayList<>();

            for (int j = 0; j < n; j++) {
                arr.add(new Node(j, Integer.parseInt(in[j])));
            }

            while(!arr.isEmpty()){
                Node top = arr.get(0);

                if(arr.stream().allMatch(v -> v.value <= top.value)){
                    arr.remove(0);

                    if(top.index == m){
                        bw.write(n - arr.size() + "\n");
                        break;
                    }
                }else{
                    arr.add(arr.remove(0));
                }
            }
        }

        bw.flush();
        bw.close();
    }
}
