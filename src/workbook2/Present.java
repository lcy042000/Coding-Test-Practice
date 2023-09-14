package workbook2;

import java.io.*;

public class Present {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String n = br.readLine();
        String[] arr = br.readLine().split("");
        int cnt = 0;

        for(int i = 1; i < Integer.parseInt(n); i++){
            if(arr[i].equals("W") && arr[i - 1].equals("E")) cnt++;
        }

        bw.write(String.valueOf(cnt));
        bw.flush();
        bw.close();
    }
}
