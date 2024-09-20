package swea;


import java.util.*;
import java.io.*;

public class ColorTree {

    static class Node {
        int pid, mid, color, maxDepth, pIdx;
        List<Integer> cIdxs;

        public Node(int pid, int mid, int color, int maxDepth, int pIdx) {
            this.pid = pid;
            this.mid = mid;
            this.color = color;
            this.maxDepth = maxDepth;
            this.pIdx = pIdx;
            this.cIdxs = new ArrayList<Integer>();
        }

        public int readColor() {
            return color;
        }
    }

    static List<Node> list = new ArrayList<Node>();

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());

        for (int i = 0; i < N; i++) {
            String[] in = br.readLine().split(" ");
            int cmd = Integer.parseInt(in[0]);

            switch (cmd) {
                case 100:
                    addNode(Integer.parseInt(in[1]), Integer.parseInt(in[2]), Integer.parseInt(in[3]), Integer.parseInt(in[4]));
                    break;
                case 200:
                    int updateNode = findNodeIdx(Integer.parseInt(in[1]));
                    updateColor(updateNode, Integer.parseInt(in[2]));
                    break;
                case 300:
                    Node colorNode = findNode(Integer.parseInt(in[1]));
                    String str = String.valueOf(colorNode.color) + "\n";
                    bw.append(str);
                    break;
                case 400:
                    bw.append(String.valueOf(readPoint()) + "\n");
                    break;
            }
        }

        bw.flush();
        bw.close();
    }

    static Node findNode(int mid) {
        Node result = null;

        for (Node node : list) {
            if (node.mid == mid) {
                result = node;
                break;
            }
        }

        return result;
    }

    static int findNodeIdx(int mid) {
        int idx = -1;

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).mid == mid) {
                idx = i;
                break;
            }
        }

        return idx;
    }

    static boolean checkDepth(int pidx, int curDepth) {
        Node parent = list.get(pidx);

        if (parent.maxDepth < curDepth)
            return false;

        if (parent.pid == -1)
            return true;

        int parentIdx = findNodeIdx(parent.pid);

        return checkDepth(parentIdx, curDepth + 1);
    }

    static void addNode(int mid, int pid, int color, int maxDepth) {
        if (pid == -1) {
            list.add(new Node(pid, mid, color, maxDepth, -1));
            return;
        }

        int parentIdx = findNodeIdx(pid);

        if(parentIdx == -1) return;

        boolean isAddNode = checkDepth(parentIdx, 2);

        if (!isAddNode)
            return;

        list.get(parentIdx).cIdxs.add(list.size());
        list.add(new Node(pid, mid, color, maxDepth, parentIdx));
    }

    static void updateColor(int idx, int color) {
        Queue<Integer> queue = new LinkedList();

        queue.add(idx);

        while(!queue.isEmpty()) {
            int cur = queue.remove();

            list.get(cur).color = color;
            List<Integer> children = list.get(cur).cIdxs;

            queue.addAll(children);
        }
    }

    static int cntDiffColor(int idx) {
        Set<Integer> colors = new HashSet();
        Queue<Integer> queue = new LinkedList();

        queue.add(idx);

        while (!queue.isEmpty()) {
            int curIdx = queue.remove();

            colors.add(list.get(curIdx).color);

            List<Integer> children = list.get(curIdx).cIdxs;

            queue.addAll(children);
        }

        return colors.size();
    }

    static int readPoint() {
        int point = 0;

        for (int i = 0; i < list.size(); i++) {
            point += Math.pow(cntDiffColor(i), 2);
        }

        return point;
    }
}
