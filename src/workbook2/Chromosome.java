package workbook2;

import java.io.*;

public class Chromosome {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());

        for (int i = 0; i < n; i++) {
            if(isCorrect(br.readLine())) bw.write("Infected!\n");
            else bw.write("Good\n");
        }

        bw.flush();
        bw.close();
    }

    static boolean isCorrect(String word){
        if(word.length() < 3) return false;

        if(word.charAt(0) > 'F') return false;

        int aStart = word.indexOf("A");
        while(word.charAt(aStart) == 'A'){
            aStart++;
        }

        if(aStart == word.length() || word.charAt(aStart) != 'F') return false;

        while(word.charAt(aStart) == 'F') aStart++;

        if(aStart == word.length() || word.charAt(aStart) != 'C') return false;
        while (word.charAt(aStart) == 'C'){
            aStart++;

            if(aStart == word.length()) return true;
        }

        if('F' < word.charAt(aStart)) return false;
        if(aStart + 1 != word.length()) return false;

        return false;
    }
}
