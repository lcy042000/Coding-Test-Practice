package implement;

import java.io.*;

public class GameDevelop {
    static int direction = 0;
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] input = br.readLine().split(" ");
        int N = Integer.parseInt(input[0]), M = Integer.parseInt(input[1]);

        String[] input2 = br.readLine().split(" ");
        int x = Integer.parseInt(input2[0]), y = Integer.parseInt(input2[1]);
        direction = Integer.parseInt(input2[2]);

        int[][] arr = new int[N][M], visited = new int[N][M];

        for (int i = 0; i < N; i++) {
            String[] nums = br.readLine().split(" ");
            for (int j = 0; j < M; j++) {
                arr[i][j] = Integer.parseInt(nums[j]);
                visited[i][j] = 0;
            }
        }

        visited[x][y] = 1;

        int[] dx = {-1, 0, 1,0}, dy = {0, 1, 0, -1};

        int turnTime = 0, count = 1;

        while(true){
            turnLeft();

            int nx = x + dx[direction], ny = y + dy[direction];

            if(visited[nx][ny] == 0 && arr[nx][ny] == 0){
                x = nx;
                y = ny;
                count++;
                turnTime = 0;
                continue;
            }else{
                turnTime++;
            }

            if(turnTime == 4){
                x = nx;
                y = ny;
            }else{
                break;
            }

            turnTime = 0;
        }

        bw.write(String.valueOf(count));
        bw.flush();
        bw.close();
    }

    private static void turnLeft(){
        direction -= 1;

        if(direction == -1) direction = 3;
    }
}
