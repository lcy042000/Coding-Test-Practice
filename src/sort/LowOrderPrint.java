package sort;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LowOrderPrint {
    static class Student implements Comparable<Student>{
        String name;
        int score;

        public Student(String name, int score) {
            this.name = name;
            this.score = score;
        }

        public String getName() {
            return name;
        }

        public int getScore() {
            return score;
        }

        @Override
        public int compareTo(Student o) {
            if(score < o.getScore()) {
                return -1;
            }else if(score > o.getScore()){
                return 1;
            }

            return 0;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        List<Student> list = new ArrayList<>(N);

        for (int i = 0; i < N; i++) {
            String[] in = br.readLine().split(" ");

            list.add(i, new Student(in[0], Integer.parseInt(in[1])));
        }

        Collections.sort(list);

        StringBuilder sb = new StringBuilder();

        list.forEach(std -> sb.append(std.getName() + " "));

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }
}
