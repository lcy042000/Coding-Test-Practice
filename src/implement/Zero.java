package implement;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Zero {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int K = Integer.parseInt(br.readLine());

        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < K; i++) {
            int num = Integer.parseInt(br.readLine());

            if(num == 0){
                list.remove(list.size() - 1);
            }else{
                list.add(num);
            }
        }

        int sum = 0;

        for (int num :
                list) {
            sum += num;
        }

        bw.write(String.valueOf(sum));
        bw.flush();
        bw.close();
    }
}
