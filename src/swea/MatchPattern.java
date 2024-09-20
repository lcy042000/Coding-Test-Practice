package swea;

import java.util.*;

class MatchPattern {

    private static final int UP		= 0;
    private static final int RIGHT	= 1;
    private static final int DOWN	= 2;
    private static final int LEFT	= 3;

    private static class Node implements Comparable<Node>{
        int[] board;
        int cost;
        List<Integer> history;

        Node(int[] init, int cost, List<Integer> history){
            this.board = init;
            this.cost = cost;
            this.history = history;
        }

        @Override
        public int compareTo(Node o) {
            return this.cost - o.cost;
        }
    }

    private static class MoveNode{
        int[] nBoard;
        int dir;

        MoveNode(int[] nBoard, int dir){
            this.nBoard = nBoard;
            this.dir = dir;
        }
    }

    public void solve(int[][] board, int[][] pattern, int callCntLimit) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        Set<String> isVisited = new HashSet<>();

        int[] flatBoard = new int[25];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                flatBoard[i * 5 + j] = board[i][j];
            }
        }

        int cost = calcCost(flatBoard, pattern);
        Node init = new Node(flatBoard, cost, new ArrayList<>());

        if(isMatched(flatBoard, pattern)){
            moveBoard(init.history);
            return;
        }

        pq.add(init);
        isVisited.add(Arrays.toString(init.board));

        while(!pq.isEmpty()){
            Node curNode = pq.poll();
//            if(pq.size() >= 17500) break;
            if(isMatched(curNode.board, pattern)){
                moveBoard(curNode.history);
                break;
            }

            List<MoveNode> nBoards = findNextBoard(curNode.board);

            for (int i = 0; i < nBoards.size(); i++) {
                MoveNode moveNode = nBoards.get(i);
                String nBoardStr = Arrays.toString(moveNode.nBoard);
                if(isVisited.contains(nBoardStr)) continue;

                List<Integer> nHistory = new ArrayList<>(curNode.history);
                nHistory.add(moveNode.dir);

                if(nHistory.size() >= callCntLimit) break;

                isVisited.add(nBoardStr);
                pq.add(new Node(moveNode.nBoard, calcCost(moveNode.nBoard, pattern), nHistory));
            }
        }
    }

    static int findZero(int[] board){
        int idx = -1;

        for (int i = 0; i < 25; i++) {
            int x = i / 5, y = i % 5;
            if(board[x * 5 + y] == 0) return i;
        }
        return idx;
    }

    static int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};

    static List<MoveNode> findNextBoard(int[] board){
        int zeroIdx = findZero(board);
        int i = zeroIdx / 5, j = zeroIdx % 5;
        List<MoveNode> nBoards = new ArrayList<>();

        for (int k = 0; k < 4; k++) {
            int nx = i + dx[k], ny = j + dy[k];

            if(nx < 0 || nx > 4 || ny < 0 || ny > 4) continue;

            nBoards.add(swapZero(board, i, j, k));
        }

        return nBoards;
    }

    static MoveNode swapZero(int[] board, int i, int j, int dir){
        int[] nBoard = Arrays.copyOf(board, board.length);
        int nx = i + dx[dir], ny = j + dy[dir];

        nBoard[i * 5 + j] = board[nx * 5 + ny];
        nBoard[nx * 5 + ny] = 0;

        return new MoveNode(nBoard, dir);
    }

    static int calcCost(int[] board, int[][] pattern){
        int cost = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                int min = Integer.MAX_VALUE;

                if(board[(i + 1) * 5 + (j + 1)] == pattern[i][j]) continue;

                for (int k = 0; k < 25; k++) {
                    if(board[k] == pattern[i][j]){
                        int x = k / 5, y = k % 5;
                        min = Math.min(min, Math.abs(x - i) + Math.abs(y - j));
                    }
                }

                cost += min;
            }
        }

        return cost;
    }

    static boolean isMatched(int[] board, int[][] pattern){
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if(board[(i + 1) * 5 + (j + 1)] != pattern[i][j]) return false;
            }
        }

        return true;
    }

    static void moveBoard(List<Integer> history){
        for (int dir: history) {
            Solution.swap(dir);
        }
    }
}
