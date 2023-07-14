package greedy;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CoinZero {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] NM = br.readLine().split(" ");
        int N = Integer.parseInt(NM[0]), M = Integer.parseInt(NM[1]);

        List<Integer> coins = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            int coin = Integer.parseInt(br.readLine());

            if(coin <= M){
                coins.add(coin);
            }
        }

        int count = 0;

        for (int i = coins.size() - 1; i > -1; i--) {
            if(M == 0) break;
            else if(M < coins.get(i)) continue;
            else{
                count += (M / coins.get(i));
                M %= coins.get(i);
            }
        }

        bw.write(String.valueOf(count));

        bw.flush();
        bw.close();
    }
}
