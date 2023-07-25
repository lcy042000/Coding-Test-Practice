package otherAlgorithms;

import java.io.*;

public class EratosthenesSieve {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        int n = Integer.parseInt(input[0]), k = Integer.parseInt(input[1]);
        int count = 0;

        boolean[] arr = new boolean[n + 1];

        for (int i = 2; i < n + 1; i++) {
            if(!arr[i]){
                int j = 1;

                while(i * j <= n){
                    if(!arr[i * j]){
                        arr[i * j] = true;
                        count++;

                        if(count == k){
                            bw.write(String.valueOf(i * j));
                            break;
                        }
                    }

                    j++;
                }
            }
        }

        bw.flush();
        bw.close();
    }
}
