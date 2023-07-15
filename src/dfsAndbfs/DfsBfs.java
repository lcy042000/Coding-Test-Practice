package dfsAndbfs;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class DfsBfs {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] nmv = br.readLine().split(" ");
        int n = Integer.parseInt(nmv[0]), m = Integer.parseInt(nmv[1]), v = Integer.parseInt(nmv[2]);

        boolean[][] graph = new boolean[n + 1][n + 1];

        for(int i = 0; i < m; i++){
            String[] s = br.readLine().split(" ");
            int a = Integer.parseInt(s[0]), b = Integer.parseInt(s[1]);

            graph[a][b] = true;
            graph[b][a] = true;
        }

        boolean[] dfsV = new boolean[n + 1];
        dfsV[v] = true;
        StringBuilder dfsSB = new StringBuilder();
        dfsSB.append(v + " ");

        dfs(v, graph, dfsV, dfsSB);

        boolean[] bfsV = new boolean[n + 1];
        bfsV[v] = true;

        Queue<Integer> queue = new LinkedList<>();
        StringBuilder bfsSB = new StringBuilder();

        queue.add(v);

        while(!queue.isEmpty()){
            int cur = queue.remove();

            bfsSB.append(cur + " ");

            for(int i = 1; i < n + 1; i++){
                if(graph[cur][i] && !bfsV[i]){
                    queue.add(i);
                    bfsV[i] = true;
                }
            }
        }

        bw.write(dfsSB.toString() + "\n");
        bw.write(bfsSB.toString());
        bw.flush();
        bw.close();
    }

    public static void dfs(int node, boolean[][] graph, boolean[] dfsV, StringBuilder dfsSB){
        for(int i = 1; i < graph[node].length; i++){
            boolean b = graph[node][i];

            if(b && !dfsV[i]){
                dfsV[i] = true;
                dfsSB.append(i + " ");
                dfs(i, graph, dfsV, dfsSB);
            }
        }
    }
}
