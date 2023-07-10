package graphTheory;

import java.io.*;

public class Teaming {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        int n = Integer.parseInt(nm[0]), m = Integer.parseInt(nm[1]);

        int[] parent = new int[n + 1];

        for (int i = 0; i < n + 1; i++) {
            parent[i] = i;
        }

        for (int i = 1; i < m + 1; i++) {
            String[] input = br.readLine().split(" ");
            int oper = Integer.parseInt(input[0]), a = Integer.parseInt(input[1]), b = Integer.parseInt(input[2]);

            if(oper == 1){
                if(findParent(parent, a) == findParent(parent, b)) bw.write("YES\n");
                else bw.write("NO\n");
            }else{
                parent = unionParent(parent, a, b);
            }
        }

        bw.flush();
        bw.close();
    }

    private static int findParent(int[] parent, int x){
        if(parent[x] != x) parent[x] = findParent(parent, parent[x]);

        return parent[x];
    }

    private static int[] unionParent(int[] parent, int a, int b){
        int aParent = findParent(parent, a), bParent = findParent(parent, b);

        if(aParent < bParent) parent[b] = aParent;
        else parent[a] = bParent;

        return parent;
    }
}
