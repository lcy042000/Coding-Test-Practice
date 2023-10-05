package workbook2;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SuffixArray {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String word = br.readLine();
        List<String> arr = new ArrayList<>();

        for (int i = 0; i < word.length(); i++) {
            arr.add(word.substring(i));
        }

        Collections.sort(arr);

        for (int i = 0; i < arr.size(); i++) {
            bw.write(arr.get(i) + "\n");
        }

        bw.flush();
        bw.close();
    }
}