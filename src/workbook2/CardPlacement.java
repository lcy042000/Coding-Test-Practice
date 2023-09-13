package workbook2;

import java.io.*;
import java.util.HashSet;

public class CardPlacement {
    static int n, k;
    static String[] nums;
    static boolean[] isVisited;
    static HashSet<String> arr;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        n = Integer.parseInt(br.readLine());
        k = Integer.parseInt(br.readLine());
        nums = new String[n];

        for (int i = 0; i < n; i++) {
            nums[i] = br.readLine();
        }

        isVisited = new boolean[n];
        arr = new HashSet<>();

        dfs(0, "");
        bw.write(String.valueOf(arr.size()));

        bw.flush();
        bw.close();
    }

    static void dfs(int cnt, String sum){
        if(cnt == k){
            arr.add(sum);
            return;
        }

        for (int i = 0; i < n; i++) {
            if(isVisited[i]) continue;

            isVisited[i] = true;
            dfs(cnt + 1, sum + nums[i]);
            isVisited[i] = false;
        }
    }
}
