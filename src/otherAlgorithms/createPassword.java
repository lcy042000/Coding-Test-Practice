package otherAlgorithms;

import java.io.*;
import java.util.Arrays;

public class createPassword {
    static int l;
    static int c;
    static boolean[] visited;
    static String[] arr;
    static String s = "";
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] lc = br.readLine().split(" ");
        l = Integer.parseInt(lc[0]);
        c = Integer.parseInt(lc[1]);
        arr = br.readLine().split(" ");
        visited = new boolean[c];

        Arrays.stream(arr).sorted();
        dfs(0, 0, 0 ,0);
        bw.write(s);
        bw.flush();
        bw.close();
    }

    static void dfs(int idx, int cnt, int vowel, int consonant){
        if(cnt == l){
            if(vowel >= 1 && consonant >= 2){
                for(int i = 0; i < visited.length; i++){
                    if(visited[i]) {
                        s += arr[i];
                    }
                }

                s += "\n";
            }
        }

        for(int i = idx; i < c; i++){
            if(!visited[i]){
                visited[i] = true;

                if(arr[i].equals("a") || arr[i].equals("e") || arr[i].equals("i") || arr[i].equals("o") || arr[i].equals("u")){
                    dfs(i + 1, cnt + 1, vowel + 1, consonant);
                }else{
                    dfs(i + 1, cnt + 1, vowel, consonant + 1);
                }

                visited[i] = false;
            }
        }
    }
}
