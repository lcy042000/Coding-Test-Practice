package swea;

import java.io.*;
import java.util.*;

class ParenNode{
    List<Integer> nums;
    List <String> opers;
    int idx;

    public ParenNode(List<Integer> nums, List<String> opers, int idx) {
        this.nums = nums;
        this.opers = opers;
        this.idx = idx;
    }
}

public class AddParen {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        String equation = br.readLine();

        int maxIdx = N - 1;

        Queue<ParenNode> queue = new LinkedList<>();

        List<Integer> nums = new LinkedList<>();
        for (int i = 0; i < equation.length(); i+=2) {
            nums.add(Integer.parseInt(equation.substring(i, i + 1)));
        }

        List<String> opers = new LinkedList<>();
        for (int i = 1; i < equation.length(); i+=2) {
            opers.add(equation.substring(i, i + 1));
        }

        queue.add(new ParenNode(nums, opers, 0));

        List<ParenNode> result = new ArrayList<>();

        while(!queue.isEmpty()){
            ParenNode node = queue.remove();

            result.add(node);
            for(int i = node.idx; i < node.nums.size() - 1; i++){
                List<Integer> newNums = new LinkedList<>(node.nums.subList(0, node.nums.size()));
                List<String> newOpers = new LinkedList<>(node.opers.subList(0, node.opers.size()));

                String oper = newOpers.remove(i);
                int num1 = newNums.remove(i), num2 = newNums.remove(i);

                if(oper.equals("+")){
                    newNums.add(i, num1 + num2);
                }else if(oper.equals("-")){
                    newNums.add(i, num1 - num2);
                }else{
                    newNums.add(i, num1 * num2);
                }

                queue.add(new ParenNode(newNums, newOpers, i + 1));
            }
        }

        int max = Integer.MIN_VALUE;

        for (int i = 0; i < result.size(); i++) {
            List<Integer> integers = result.get(i).nums;
            List<String> strings = result.get(i).opers;
            int num = integers.remove(0);

            while(!strings.isEmpty()){
                String s = strings.remove(0);

                if(s.equals("+")){
                    num += integers.remove(0);
                }else if(s.equals("-")){
                    num -= integers.remove(0);
                }else{
                    num = num * integers.remove(0);
                }
            }

            max = Math.max(max, num);
        }

        bw.write(String.valueOf(max));
        bw.flush();
        bw.close();
    }
}
