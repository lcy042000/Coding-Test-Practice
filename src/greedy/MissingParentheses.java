package greedy;

import java.io.*;

public class MissingParentheses {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] plus = br.readLine().split("-");

        int result = 0;

        for (int i = 0; i < plus.length; i++) {
            String[] values = plus[i].split("\\+");
            int sum = 0;

            for (int j = 0; j < values.length; j++) {
                sum += Integer.parseInt(values[j]);
            }

            if(i == 0){
                result += sum;
            }else result -= sum;
        }

        bw.write(String.valueOf(result));

        bw.flush();
        bw.close();
    }
}
