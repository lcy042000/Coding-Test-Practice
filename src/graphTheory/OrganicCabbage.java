package graphTheory;

import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class OrganicCabbage {
    static class Node{
        int x;
        int y;

        public Node(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int t = Integer.parseInt(br.readLine());

        int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};

        for(int i = 0; i < t; i++){
            String[] mnk = br.readLine().split(" ");
            int n = Integer.parseInt(mnk[1]), m = Integer.parseInt(mnk[0]), k = Integer.parseInt(mnk[2]);

            int[][] graph = new int[n][m], visited = new int[n][m];

            for (int j = 0; j < k; j++) {
                String[] in = br.readLine().split(" ");
                graph[Integer.parseInt(in[1])][Integer.parseInt(in[0])] = 1;
            }

            Queue<Node> queue = new LinkedList<>();
            queue.add(new Node(0, 0));

            int count = 1;

            for (int j = 0; j < n; j++) {
                for (int l = 0; l < m; l++) {
                    if(visited[j][l] != 0 || graph[j][l] == 0) continue;

                    queue.add(new Node(j, l));

                    while(!queue.isEmpty()){
                        Node node = queue.remove();
                        int x = node.x, y = node.y;

                        if(visited[x][y] != 0) continue;

                        if(graph[x][y] == 0) visited[x][y] = 0;
                        else visited[x][y] = count;

                        for (int o = 0; o < 4; o++) {
                            int nx = x + dx[o], ny = y + dy[o];

                            if(0 <= nx && nx < n && 0 <= ny && ny < m ){
                                if(graph[nx][ny] > 0) queue.add(new Node(nx, ny));
                            }
                        }
                    }

                    count++;
                }
            }

            bw.write(String.valueOf(count - 1) + "\n");
        }

        bw.flush();
        bw.close();
    }
}
