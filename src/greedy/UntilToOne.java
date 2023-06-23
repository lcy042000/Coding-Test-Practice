package greedy;

import java.io.*;

public class UntilToOne {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        int N = Integer.parseInt(input[0]), K = Integer.parseInt(input[1]);

        int count = 0;

        while(N != 1){
            count++;

            if(N % K == 0){
                N /= K;
            }else{
                N -= 1;
            }
        }

        bw.write(String.valueOf(count));
        bw.flush();
        bw.close();
    }
}
