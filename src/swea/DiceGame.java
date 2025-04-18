import java.util.*;
import java.io.*;
import java.util.stream.Collectors;

public class Main {
    static private class Point{
        int x, y;

        public Point(int x, int y){
            this.x = x;
            this.y = y;
        }

        public Point(Point point){
            this.x = point.x;
            this.y = point.y;
        }

        public String toString(){
            return this.x + " " + this.y + "/";
        }
    }

    static private class Node{
        Point point;
        List<Point> route;
        Set<Integer> isVisited;

        public Node(Point point, List<Point> route, Set<Integer> isVisited){
            this.point = point;
            this.route = route;
            this.isVisited = isVisited;
        }
    }

    static int n, m;
    static Point dragon, park;
    static int[] udlrx = {-1, 1, 0, 0}, udlry = {0, 0, -1, 1},
    lrudx = {0, 0, -1, 1}, lrudy = {-1, 1, 0, 0};
    static int[][] map;
    static boolean[][] viewMap;
    static List<Point> wrs = new ArrayList(), routeToPark = new ArrayList();

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        n = Integer.parseInt(input[0]);
        m = Integer.parseInt(input[1]);
        map = new int[n][n];
        viewMap = new boolean[n][n];

        input = br.readLine().split(" ");
        dragon = new Point(Integer.parseInt(input[0]), Integer.parseInt(input[1]));
        park = new Point(Integer.parseInt(input[2]), Integer.parseInt(input[3]));

        input = br.readLine().split(" ");
        for(int i = 0; i < m; i++){
            wrs.add(new Point(Integer.parseInt(input[i * 2]), Integer.parseInt(input[i * 2 + 1])));
        }

        for(int i = 0; i < n; i++){
            input = br.readLine().split(" ");
            for(int j = 0; j < n; j++){
                map[i][j] = Integer.parseInt(input[j]);
            }
        }

        bfs();

        if(routeToPark.size() == 0) {
            bw.write(String.valueOf(-1));
            bw.flush();
            return;
        }
        
        // bw.write(routeToPark);
        // bw.flush();
    }

    static void bfs(){
        ArrayDeque<Node> queue = new ArrayDeque();
        List<Point> origin = new ArrayList();
        origin.add(new Point(dragon));
        Set<Integer> originVisited = new HashSet();
        originVisited.add(dragon.x * n + dragon.y);
        queue.add(new Node(dragon, origin, originVisited));
        
        while(!queue.isEmpty()){
            Node node = queue.poll();
            int x = node.point.x, y = node.point.y;
            List<Point> route = node.route;
            Set<Integer> isVisited = node.isVisited;
            
            for(int i = 0; i < 4; i++){
                int nx = x + udlrx[i], ny = y + udlry[i];

                if(nx < 0 || n <= nx || ny < 0 || n <= ny || isVisited.contains(nx * n + ny)) continue;
                if(map[nx][ny] == 1) continue;

                if(nx == park.x && ny == park.y) {
                    route.add(new Point(nx, ny));
                    routeToPark = route;
                    return;
                }

                List<Point> nRoute = route.stream().map(Point::new).collect(Collectors.toList());
                Set<Integer> nVisited = new HashSet(isVisited);

                nRoute.add(new Point(nx, ny));
                nVisited.add(nx * n + ny);
                
                queue.add(new Node(new Point(nx, ny), nRoute, nVisited));
            }
        }
    }
}