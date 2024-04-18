package swea;

import java.io.*;

public class Main17281 {
    static int N, max;
    static int[][] data;
    static boolean[] visit, base;
    static int[] arr;
    static StringBuilder sb;

    public static void main(String[] args) throws Exception {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        sb = new StringBuilder();

        N = stoi(in.readLine());
        data = new int[N][9];
        for (int i = 0; i < N; ++i) {
            String[] splitedLine = in.readLine().split(" ");
            for (int j = 0; j < 9; ++j) {
                data[i][j] = stoi(splitedLine[j]);
            }
        }

        max = 0;
        visit = new boolean[9];
        arr = new int[9];
        base = new boolean[3];
        visit[3] = true;
        arr[3] = 0;
        permutation(1);

        System.out.println(max);
    }

    private static void permutation(int pNum) {
        if (pNum == 9) {
            int score = simulation();
            max = Math.max(score, max);
            return;
        }
        for (int i = 0; i < 9; ++i) {
            if (visit[i]) // i번째 타순이 이미 배정되어있다.
                continue;

            visit[i] = true;
            arr[i] = pNum; // i번째 타순에 pNum플레이어를 배정한다.
            permutation(pNum + 1);
            visit[i] = false;
        }
    }

    private static int simulation() {
        // 타순이 고정되었다. 시뮬레이션 시작.
        int score = 0;
        int playerIndex = 0;

        for (int i = 0; i < N; ++i) { // N번의 이닝이 진행된다.
            // 이닝의 시작에는 주자가 없다.
            base[0] = false;
            base[1] = false;
            base[2] = false;

            int outCount = 0; // 이닝의 시작에는 아웃카운트가 0이다.
            while (outCount < 3) {
                int curPlayer = arr[playerIndex];
                playerIndex = (playerIndex + 1) % 9; // 다음 타자 번호 수정

                int act = data[i][curPlayer];
                if (act == 0)
                    outCount++;
                else
                    score += movePlayer(act);
            }
        }
        return score;
    }

    private static int movePlayer(int act) {
        int score = 0;
        // 타자 주자를 움직인다.
        if (act == 4) {
            // 홈런인경우
            for (int i = 0; i < 3; ++i)
                if (base[i]) { // 주자가 있다면 홈런 점수에 1점씩 추가된다.
                    base[i] = false;
                    score++;
                }
            score++; // 타자 주자의 점수도 더해야한다.
        } else {
            // 존재하는 주자를 모두 이동시켜본다.
            for (int i = 0; i < act; ++i) {
                if (base[2]) { // 3루 주자가 이동
                    base[2] = false;
                    score++;
                }

                if (base[1]) { // 2루 주자가 이동
                    base[1] = false;
                    base[2] = true;
                }

                if (base[0]) { // 1루 주자가 이동
                    base[0] = false;
                    base[1] = true;
                }
            }
            // 타자 주자를 움직인다.
            base[act - 1] = true;
        }
        return score;
    }

    private static int stoi(String s) {
        return Integer.parseInt(s);
    }
}
