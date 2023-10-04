package workbook2;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StringGame2 {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int t = Integer.parseInt(br.readLine());
        List<String[]> game = new ArrayList<>();

        for (int i = 0; i < t; i++) {
            String st = br.readLine();
            String k = br.readLine();

            game.add(new String[]{st, k});
        }

        for(String[] g : game){
            int[] re = solution(g);

            if(re[0] == Integer.MAX_VALUE) bw.write("-1\n");
            else bw.write(String.valueOf(re[0]) + " " + String.valueOf(re[1]) + "\n");
        }

        bw.flush();
        bw.close();
    }

    static int[] solution(String[] game){
        String st = game[0];
        int k = Integer.parseInt(game[1]);

        List<Integer>[] arr = new List['z' - 'a' + 1];

        for (int i = 0; i < arr.length; i++) {
            arr[i] = new ArrayList<>();
        }

        String[] chs = st.split("");

        for(int i = 0; i < chs.length; i++){
            char v = chs[i].charAt(0);
            arr[v - 'a'].add(i);
        }

        int min = Integer.MAX_VALUE - 1, max = Integer.MIN_VALUE;

        for (int i = 0; i < arr.length; i++) {
            if(arr[i].size() < k) continue;

            for(int j = k - 1; j < arr[i].size(); j++){
                int dist = arr[i].get(j) - arr[i].get(j - k + 1);

                min = Math.min(min, dist);
                max = Math.max(max, dist);
            }
        }

        return new int[]{min + 1, max + 1};
    }
}
