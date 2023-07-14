package implement;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Stack {
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        List<Integer> stack = new ArrayList<>();
        StringBuilder sb = new StringBuilder();

        for(int i = 0; i < N; i++){
            String[] s = br.readLine().split(" ");

            switch (s[0]){
                case "push":{
                    stack.add(Integer.parseInt(s[1]));
                    break;
                }
                case "pop":{
                    if(stack.size() == 0){
                        sb.append(-1 + "\n");
                    }else{
                        sb.append(stack.remove(stack.size() - 1) + "\n");
                    }

                    break;
                }
                case "size": {
                    sb.append(stack.size() + "\n");
                    break;
                }
                case "empty": {
                    if(stack.isEmpty()) sb.append(1 + "\n");
                    else sb.append(0 + "\n");

                    break;
                }
                case "top": {
                    if(stack.isEmpty()) sb.append(-1 + "\n");
                    else sb.append(stack.get(stack.size() - 1) + "\n");

                    break;
                }
                default: continue;
            }
        }

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }
}
