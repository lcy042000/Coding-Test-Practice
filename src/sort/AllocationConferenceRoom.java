package sort;

import java.io.*;
import java.util.Arrays;

public class AllocationConferenceRoom {
    static class Node implements Comparable<Node>{
        int start;
        int end;

        public Node(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        public int compareTo(Node o) {
            if(end < o.end){
                return -1;
            }else if(end > o.end){
                return 1;
            }else{
                return start - o.start;
            }
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int n = Integer.parseInt(br.readLine());
        Node[] arr = new Node[n];
        int maxEnd = -1;

        for (int i = 0; i < n; i++) {
            String[] s = br.readLine().split(" ");
            int start = Integer.parseInt(s[0]), end = Integer.parseInt(s[1]);

            if(maxEnd < end) maxEnd = end;

            arr[i] = new Node(start, end);
        }

        Arrays.sort(arr);

        int count = 1;
        Node time = arr[0];

        for (int i = 1; i < n; i++) {
            if(time.end <= arr[i].start){
                time = arr[i];
                count++;
            }
        }

        bw.write(String.valueOf(count));
        bw.flush();
        bw.close();
    }
}
