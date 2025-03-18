package swea;

import java.io.*;
import java.util.*;

public class Laboratory3{
    static int n, m;
    static int[][] map;
    static int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
    static int result = Integer.MAX_VALUE;

    static class Node{
        int x, y, value;

        public Node(int x, int y, int value){
            this.x = x;
            this.y = y;
            this.value = value;
        }
    }

    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] nm = br.readLine().split(" ");
        n = Integer.parseInt(nm[0]);
        m = Integer.parseInt(nm[1]);
        map = new int[n][n];

        for(int i = 0; i < n; i++){
            String[] nums = br.readLine().split(" ");

            for(int j = 0; j < n; j++){
                int num = Integer.parseInt(nums[j]);

                if(num == 0) map[i][j] = num;
                else if(num == 1) map[i][j] = -1;
                else map[i][j] = -2;
            }
        }

        calc(new ArrayDeque<Node>(), 0, -1);
        
        result = result == Integer.MAX_VALUE ? -1 : result;

        bw.write(String.valueOf(result));
        bw.flush();

    }

    static void calc(ArrayDeque<Node> queue, int x, int y){
        if(queue.size() == m){
            int value = bfs(queue);
            
            if(value < 0) return;
            if(value < result) result = value;
      
            return;
        }

        for(int i = x; i < n; i++){
            for(int j = i == x ? y + 1 : 0; j < n; j++){
                if(map[i][j] != -2) continue;

                queue.add(new Node(i, j, 0));
                calc(queue, i, j);
                queue.removeLast();
            }
        }
    }

    static int bfs(ArrayDeque<Node> origin){
        ArrayDeque<Node> queue = origin.clone();
        Set<Integer> isVisited = new HashSet();
        int max = 0;

        for(Node node : queue){
            isVisited.add(node.x * n + node.y);
        }

        while(!queue.isEmpty()){
            Node node = queue.remove();
            int x = node.x, y = node.y, value = node.value;

            for(int i = 0; i < 4; i++){
                int nx = x + dx[i], ny = y + dy[i];

                if(nx < 0 || n <= nx || ny < 0 || n <= ny || isVisited.contains(nx * n + ny)) continue;
                if(map[nx][ny] == -1) continue;

                isVisited.add(nx * n + ny);
                
                if(map[nx][ny] != -2) {
                	max = max < value + 1 ? value + 1 : max;
                }
                
                queue.add(new Node(nx, ny, value + 1));
            }
        }

        return isFilled(isVisited) ? max : -1;
    }
    
    static boolean isFilled(Set<Integer> isVisited) {
    	for(int i = 0; i < n; i++) {
    		for(int j = 0; j < n; j++) {
    			if(map[i][j] < 0) continue;
    			
    			if(!isVisited.contains(i * n + j)) return false;
    		}
    	}
    	
    	return true;
    }
}