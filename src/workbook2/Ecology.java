package workbook2;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

public class Ecology {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Scanner sc = new Scanner(System.in);
        Map<String, Integer> trees = new HashMap<>();

        String word = "";
        int len = 0;
        while(sc.hasNext()){
            word = sc.next();
            len++;
            if(trees.containsKey(word)) trees.replace(word, trees.get(word) + 1);
            else trees.put(word, 0);
        }

        Set<String> strings = trees.keySet();
        strings.stream().sorted();

        for(String s : strings){
            System.out.println(s);
            double per = trees.get(s) / len * 100;
            String re = String.format("%.4d\n", per);
            bw.write(s + " " + re);
        }

        bw.flush();
        bw.close();
    }
}
