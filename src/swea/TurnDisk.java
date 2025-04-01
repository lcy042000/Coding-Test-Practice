package swea;

import java.util.*;
import java.io.*;

public class TurnDisk {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] nmt = br.readLine().split(" ");
		int n = Integer.parseInt(nmt[0]), m = Integer.parseInt(nmt[1]), t = Integer.parseInt(nmt[2]);
		
		int[][] disks = new int[n][m];
		
		for(int i = 0; i < n; i++) {
			String[] nums = br.readLine().split(" ");
			
			for(int j = 0; j < m; j++) {
				disks[i][j] = Integer.parseInt(nums[j]);
			}
		}
		
		for(int i = 0; i < t; i++) {
			String[] info = br.readLine().split(" ");
			int x = Integer.parseInt(info[0]), d = Integer.parseInt(info[1]), k = Integer.parseInt(info[2]);
			int nDir = d == 0 ? k : (m - k);
			
			for(int j = 1; j * x <= n; j++) {
				int[] dist = disks[j * x - 1];
				int[] nDist = new int[m];
				
				for(int l = 0; l < m; l++) {
					nDist[(l + nDir) % m] = dist[l];
				}
				
				disks[j * x - 1] = nDist;
			}
			
			Set<String> deleteIdxs = new HashSet();
			boolean isDeleted = false;
			
			for(int cx = 0; cx < n; cx++) {
				for(int cy = 0; cy < m; cy++) {
					int num = disks[cx][cy];
					
					if(num == 0) continue;
					
					if(num == disks[cx][(cy + 1) % m]) {
						isDeleted = true;
						deleteIdxs.add(cx + "/" + cy);
						deleteIdxs.add(cx + "/" + ((cy + 1) % m));
					}
					
					if(cx + 1 < n && num == disks[cx + 1][cy]) {
						isDeleted = true;
						deleteIdxs.add(cx + "/" + cy);
						deleteIdxs.add((cx + 1) + "/" + cy);
					}
					
					
				}
			}
			
			if(isDeleted) {
				for(String idx : deleteIdxs) {
					String[] xy = idx.split("/");
					
					disks[Integer.parseInt(xy[0])][Integer.parseInt(xy[1])] = 0;
				}
			}else {
				int sum = 0, cnt = 0;
				
				for(int cx = 0; cx < n; cx++) {
					for(int cy = 0; cy < m; cy++) {
						if(disks[cx][cy] != 0) {
							cnt++;
							sum += disks[cx][cy];
						}
					}
				}
				
				double avg = (double)sum / cnt;
				
				for(int cx = 0; cx < n; cx++) {
					for(int cy = 0; cy < m; cy++) {
						if(disks[cx][cy] != 0) {
							if(disks[cx][cy] < avg) {
								disks[cx][cy] += 1;
							}else if(disks[cx][cy] > avg){
								disks[cx][cy] -= 1;
							}
						}
					}
				}
			}
		}
		
		int result = 0;
		
		for(int i = 0; i < n; i++) {
			for(int j = 0; j < m; j++) {
				result += disks[i][j];
			}
		}
		
		bw.write(String.valueOf(result));
		bw.flush();
	}
}
