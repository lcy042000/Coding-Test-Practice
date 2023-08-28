package workout;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ToAddParentheses {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int[][][] arr = new int[n][n][2];
        String[] exp = br.readLine().split("");

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                arr[i][j][0] = Integer.MIN_VALUE;
                arr[i][j][1] = Integer.MAX_VALUE;
            }
        }

        for (int i = 0; i < n; i+=2) {
            arr[i][i][0] = Integer.parseInt(exp[i]);
            arr[i][i][1] = Integer.parseInt(exp[i]);
        }

        for(int j = 2; j < n; j += 2){
            for(int i = 0; i < n - j; i += 2){
                for(int k = 2; k <= j; k += 2){
                    String op = exp[i + k - 1];
                    List<Integer> list = new ArrayList<>();

                    list.add(calculate(arr[i][i + k - 2][0], arr[i + k][i + j][0], op));
                    list.add(calculate(arr[i][i + k - 2][0], arr[i + k][i + j][1], op));
                    list.add(calculate(arr[i][i + k - 2][1], arr[i + k][i + j][0], op));
                    list.add(calculate(arr[i][i + k - 2][1], arr[i + k][i + j][1], op));

                    list.sort(Comparator.reverseOrder());

                    arr[i][i + j][0] = Math.max(list.get(0), arr[i][i + j][0]);
                    arr[i][i + j][1] = Math.min(list.get(3), arr[i][i + j][1]);
                }
            }
        }

        bw.write(String.valueOf(arr[0][n - 1][0]));
        bw.flush();
        bw.close();
    }

    static int calculate(int num1, int num2, String op){
        switch (op){
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            default:
                return -1;
        }
    }
}
