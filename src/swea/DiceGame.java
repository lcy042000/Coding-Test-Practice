package swea;

import java.io.*;
import java.util.*;

public class DiceGame {
	static Map<Integer, Integer> map = new HashMap(), spMap = new HashMap();
	static int max = Integer.MIN_VALUE;
	static int[] diceNums = new int[10], horseDir = {0, 0, 0, 0}, horses = {0, 0, 0, 0};
	
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] input = br.readLine().split(" ");
		
		for(int i = 0; i < 10; i++) {
			diceNums[i] = Integer.parseInt(input[i]);
		}
		
		setMap();

		dfs(0, 0);
		
		bw.write(String.valueOf(max));
		bw.flush();
	}
	
	private static void setMap() {
		for(int i = 0; i <= 20; i++) {
			map.put(i * 2, (i + 1) * 2);
		}
		
		spMap.put(13, 16);
		spMap.put(16, 19);
		spMap.put(19, 25);
		spMap.put(25, 30);
		spMap.put(30, 35);
		spMap.put(35, 40);
		spMap.put(40, 41);
		spMap.put(22, 24);
		spMap.put(24, 25);
		spMap.put(28, 27);
		spMap.put(27, 26);
		spMap.put(26, 25);
	}
	
	private static boolean isBlue(int num) {
		if(0 < num && num < 40 && num % 10 == 0) return true;
		
		return false;
	}
	
	private static void dfs(int key, int point) {
		if(10 == key || isEnd()) {
			max = max < point ? point : max;
			return;
		}
		
		int moveCnt = diceNums[key];
		
		for(int i = 0; i < 4; i++) {
			if(40 < horses[i]) continue;
			
			int num = horses[i];
			int dir = horseDir[i];
			int nextNum = num;
			
			if(dir == 0 && isBlue(num)) {
				horseDir[i] = 1;
				
				switch(num) {
					case 10:
						nextNum = arriveNum(1, 13, moveCnt - 1);
						break;
					case 20:
						nextNum = arriveNum(1, 22, moveCnt - 1);
						break;
					case 30:
						nextNum = arriveNum(1, 28, moveCnt - 1);
						break;
				}
			}else {
				nextNum = arriveNum(dir, num, moveCnt);
			}
			
			if(isDuplication(nextNum, horseDir[i], i)) {
				horseDir[i] = dir;
				continue;
			}

			horses[i] = nextNum;
			int nPoint = 40 < nextNum ? 0 : nextNum;
			dfs(key + 1, point + nPoint);
			horseDir[i] = dir;
			horses[i] = num;
		}
	}
	
	private static boolean isEnd() {
		for(int i = 0; i < 4; i++) {
			if(horses[i] <= 40) return false;
		}
		
		return true;
	}
	
	private static int arriveNum(int dir, int startNum, int moveCnt) {
		int cnt = 0, curNum = startNum;
		
		while(cnt < moveCnt) {
			cnt++;
			
			if(40 < curNum) return curNum;

			curNum = dir == 0 ? map.get(curNum) : spMap.get(curNum);
		}
		
		return curNum;
	}
	
	private static boolean isDuplication(int key, int dir, int idx) {
		if(40 < key) return false;
		
		for(int i = 0; i < 4; i++) {
			if(i == idx) continue;
			if(horses[i] == key && (horseDir[i] == dir || key == 40)) return true;
		}
		
		return false;
	}
}
