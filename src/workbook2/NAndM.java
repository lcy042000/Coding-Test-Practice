package workbook2;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class NAndM {
    static List<String> list = new ArrayList<>();
    static int n, m;
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] nm = br.readLine().split(" ");
        n = Integer.parseInt(nm[0]);
        m = Integer.parseInt(nm[1]);

        dfs("", 1);
        for(String s : list){
            bw.write(s + "\n");
        }

        bw.flush();
        bw.close();
    }

    static void dfs(String num, int min){
        if(num.length() == m){
            String s = "";
            String[] ss = num.split("");

            for (int i = 0; i < m; i++) {
                s += ss[i] + " ";
            }

            list.add(s);
            return;
        }

        for (int i = min; i <= n; i++) {
            String s = num + i;
            dfs(s, i);
        }
    }
}
