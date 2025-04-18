import java.util.*;
import java.io.*;
import java.util.stream.Collectors;
import java.lang.*;

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

    static int n, m, dragonDir = -1;
    static Point dragon, park;
    static int[] udlrx = {-1, 1, 0, 0}, udlry = {0, 0, -1, 1},
    lrudx = {0, 0, -1, 1}, lrudy = {-1, 1, 0, 0};
    static int[][] map, wrsMap;
    static boolean[][] viewMap;
    static List<Point> routeToPark = new ArrayList();
    static Set<Integer> rocks = new HashSet();

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        n = Integer.parseInt(input[0]);
        m = Integer.parseInt(input[1]);
        map = new int[n][n];
        viewMap = new boolean[n][n];
        wrsMap = new int[n][n];

        input = br.readLine().split(" ");
        dragon = new Point(Integer.parseInt(input[0]), Integer.parseInt(input[1]));
        park = new Point(Integer.parseInt(input[2]), Integer.parseInt(input[3]));

        input = br.readLine().split(" ");
        for(int i = 0; i < m; i++){
            wrsMap[Integer.parseInt(input[i * 2])][Integer.parseInt(input[i * 2 + 1])] += 1;
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

        for(int i = 1; i < routeToPark.size() - 1; i++){
            Point curDragon = routeToPark.get(i);

            if(0 < wrsMap[curDragon.x][curDragon.y]){
                wrsMap[curDragon.x][curDragon.y] = 0;
            }

            viewDragon(curDragon.x, curDragon.y);
            for(int l = 0; l < n; l++){
                for(int k = 0; k < n; k++){
                    bw.write(viewMap[l][k] ? String.valueOf(1) : String.valueOf(0));
                }
                bw.write("\n");
            }
            int[] info = moveWr(curDragon.x, curDragon.y);
            
            int moveCnt = info[0];

            bw.write(moveCnt + " " + rocks.size() + " " + info[1] + "\n");
        }
        
        bw.write(String.valueOf(0));
        bw.flush();
    }

    static int[] moveWr(int dragonX, int dragonY){
        int moveCnt = 0, dieCnt = 0;

        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(wrsMap[i][j] < 1) continue;
                if(rocks.contains(i * n + j)) continue;
                
                int x = i, y = j, wrCnt = wrsMap[i][j];
                
                for(int k = 0; k < 4; k++){
                    int nx = x + udlrx[k], ny = y + udlry[k];

                    if(nx < 0 || n <= nx || ny < 0 || n <= ny) continue;
                    if(viewMap[nx][ny]) continue;
                    if(Math.abs(dragonX - nx) + Math.abs(dragonY - ny) 
                    >= Math.abs(dragonX - x) + Math.abs(dragonY - y)) continue;

                    x = nx;
                    y = ny;
                    moveCnt += wrCnt;
                    wrsMap[nx][ny] += wrCnt;
                    wrsMap[i][j] = 0;
                    break;
                }

                if(dragonX == x && dragonY == y){
                    dieCnt += wrCnt;
                    wrsMap[x][y] -= wrCnt;
                    continue;
                }

                for(int k = 0; k < 4; k++){
                    int nx = x + lrudx[k], ny = y + lrudy[k];

                    if(nx < 0 || n <= nx || ny < 0 || n <= ny) continue;
                    if(viewMap[nx][ny]) continue;
                    if(Math.abs(dragonX - nx) + Math.abs(dragonY - ny) 
                    >= Math.abs(dragonX - x) + Math.abs(dragonY - y)) continue;

                    moveCnt += wrCnt;
                    wrsMap[nx][ny] += wrCnt;
                    wrsMap[x][y] -= wrCnt;
                    x = nx;
                    y = ny;
                    break;
                }

                if(dragonX == x && dragonY == y){
                    dieCnt += wrCnt;
                    wrsMap[x][y] -= wrCnt;
                }
            }
        }

        return new int[]{moveCnt, dieCnt};
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

    static void viewDragon(int x, int y){
        rocks = new HashSet<Integer>();

        int[][] dx = {{-1, -1}, {1, 1}, {1, -1}, {-1, 1}},
        dy = {{-1, 1}, {1, -1}, {-1, -1}, {1, 1}};

        for(int i = 0; i < 4; i++){
            Set<Integer> nRocks = new HashSet();
            boolean[][] nViewMap = new boolean[n][n];

            nRocks.addAll(viewFoward(x, y, i, nViewMap));
            
            for(int j = 0; j < 2; j++){
                int nx = x + dx[i][j], ny = y + dy[i][j];

                if(nx < 0 || n <= nx || ny < 0 || n <= ny) continue;

                nRocks.addAll(viewSide(nx, ny, i, j, nViewMap));
            }

            if(rocks.size() < nRocks.size()){
                rocks = nRocks;
                dragonDir = i;
                viewMap = nViewMap;
            }
        }
    }

    static Set<Integer> viewFoward(int cx, int cy, int dir, boolean[][] nViewMap){
        Set<Integer> things = new HashSet();

        if(wrsMap[cx][cy] >= 1) return things;

        ArrayDeque<Integer> queue = new ArrayDeque();
        Set<Integer> isVisited = new HashSet();

        queue.add(cx * n + cy);
        isVisited.add(cx * n + cy);

        int[] dx = {-1, 1, 0, 0}, dy = {0, 0, -1, 1};

        while(!queue.isEmpty()){
            int idx = queue.poll();
            int x = idx / n, y = idx % n;

            int nx = x + dx[dir], ny = y + dy[dir];

            if(nx < 0 || n <= nx || ny < 0 || n <= ny || isVisited.contains(nx * n + ny)) continue;

            nViewMap[nx][ny] = true;

            if(wrsMap[nx][ny] >= 1){
                things.add(nx * n + ny);
                break;
            }

            isVisited.add(nx * n + ny);
            queue.add(nx * n + ny);
        }

        return things;
    }

    static Set<Integer> viewSide(int cx, int cy, int dir, int side, boolean[][] nViewMap){
        Set<Integer> things = new HashSet();

        nViewMap[cx][cy] = true;

        if(wrsMap[cx][cy] >= 1) {
            things.add(cx * n + cy);
            return things;
        }

        ArrayDeque<Integer> queue = new ArrayDeque();
        Set<Integer> isVisited = new HashSet();

        queue.add(cx * n + cy);
        isVisited.add(cx * n + cy);

        int[][][] dx = {{{-1, -1}, {-1, -1}},
        {{1, 1}, {1, 1}},
        {{0, 1}, {0, -1}},
        {{0, -1}, {0, 1}}},
        dy = {{{0, -1}, {0, 1}},
        {{0, 1}, {0, -1}},
        {{-1, -1}, {-1, -1}},
        {{1, 1}, {1, 1}}};

        while(!queue.isEmpty()){
            int idx = queue.poll();
            int x = idx / n, y = idx % n;

            nViewMap[x][y] = true;

            if(wrsMap[x][y] >= 1) {
                things.add(x * n + y);
                continue;
            }

            for(int i = 0; i < 2; i++){
                int nx = x + dx[dir][side][i], ny = y + dy[dir][side][i];

                if(nx < 0 || n <= nx || ny < 0 || n <= ny) continue;
                if(isVisited.contains(nx * n + ny)) continue;

                isVisited.add(nx * n + ny);
                queue.add(nx * n + ny);
            }
        }

        return things;
    }
}