package dfsAndbfs;

import java.io.*;
import java.util.Stack;

public class Virus {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int n = Integer.parseInt(br.readLine()), m = Integer.parseInt(br.readLine());

        boolean[][] graph = new boolean[n + 1][n + 1];

        for(int i = 0; i < m; i++){
            String[] ab = br.readLine().split(" ");
            int a = Integer.parseInt(ab[0]), b = Integer.parseInt(ab[1]);

            graph[a][b] = true;
            graph[b][a] = true;
        }

        boolean[] visited = new boolean[n + 1];
        Stack<Integer> stack = new Stack<>();

        stack.push(1);
        visited[1] = true;

        while(!stack.empty()){
            int top = stack.pop();

            boolean[] arr = graph[top];

            for (int i = 1; i < arr.length; i++) {
                if(arr[i] && !visited[i]){
                    stack.push(i);
                    visited[i] = true;
                }
            }
        }

        int count = 0;

        for (int i = 2; i < visited.length; i++) {
            if(visited[i]) count++;
        }

        bw.write(String.valueOf(count));
        bw.flush();
        bw.close();
    }
}
