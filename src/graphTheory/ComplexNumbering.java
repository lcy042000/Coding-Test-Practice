package graphTheory;

import java.io.*;
import java.util.*;
import java.util.stream.Stream;

public class ComplexNumbering {
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

        int n = Integer.parseInt(br.readLine());
        int[][] graph = new int[n][n];
        int[][] visited = new int[n][n];

        for(int i = 0; i < n; i++){
            String[] input = br.readLine().split("");
            for (int j = 0; j < n; j++) {
                graph[i][j] = Integer.parseInt(input[j]);
                visited[i][j] = -1;
            }
        }

        int count = 1;
        int[] dx = {-1, 0, 1, 0}, dy = {0, -1, 0, 1};

        Queue<Node> queue = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(visited[i][j] != -1 || graph[i][j] == 0) continue;

                queue.add(new Node(i, j));

                while(!queue.isEmpty()){
                    Node node = queue.remove();
                    int x = node.x, y = node.y;

                    if(visited[x][y] != -1) continue;

                    if(graph[x][y] == 0){
                        visited[x][y] = 0;
                    }else{
                        visited[x][y] = count;
                    }

                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];

                        if(0 <= nx && nx < n && 0 <= ny && ny < n){
                            if(graph[nx][ny] != 0 && visited[nx][ny] == -1){
                                queue.add(new Node(nx, ny));
                            }
                        }
                    }
                }
                count++;
            }
        }

        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if(visited[i][j] == -1) continue;

                if(map.containsKey(visited[i][j])){
                    map.put(visited[i][j], map.get(visited[i][j]) + 1);
                }else {
                    map.put(visited[i][j], 1);
                }
            }
        }

        bw.write(String.valueOf(map.size()) + "\n");

        Collection<Integer> values = map.values();

        Object[] objects = values.toArray();
        Arrays.sort(objects);

        for (int i = 0; i < objects.length; i++) {
            bw.write(String.valueOf(objects[i]) + "\n");
        }

        bw.flush();
        bw.close();
    }
}
