package dfsAndbfs;

import java.io.*;
import java.util.Stack;

public class NofCElements {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);
        int[][] graph = new int[n + 1][n + 1];
        boolean[] visited = new boolean[n + 1];

        Stack<Integer> stack = new Stack<>();
        int count = 0;

        for (int i = 0; i < m; i++) {
            String[] ab = br.readLine().split(" ");
            int a = Integer.parseInt(ab[0]), b = Integer.parseInt(ab[1]);

            graph[a][b] = 1;
            graph[b][a] = 1;
        }

        while(includes(visited)){
            int node = findIndex(visited);
            count++;
            stack.push(node);
            visited[node] = true;

            while(!stack.empty()){
                int cur = stack.pop();

                for (int i = 1; i < n + 1; i++) {
                    if(graph[cur][i] == 1 && !visited[i]){
                        stack.push(i);
                        visited[i] = true;
                    }
                }
            }
        }

        bw.write(String.valueOf(count));

        bw.flush();
        bw.close();
    }

    static boolean includes(boolean[] visited){
        for (int i = 1; i < visited.length; i++) {
            if(!visited[i]) return true;
        }

        return false;
    }

    static int findIndex(boolean[] visited){
        for(int i = 1; i < visited.length; i++){
            if(!visited[i]) return i;
        }

        return -1;
    }
}
