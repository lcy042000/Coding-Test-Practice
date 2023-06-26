package sort;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FromUpToDown {
    static int N = -1;

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());

        List<Integer> arr = new ArrayList<>(N);

        for (int i = 0; i < N; i++) {
            arr.add(Integer.parseInt(br.readLine()));
        }

        StringBuilder sb = new StringBuilder();
        quickSort(arr).forEach(num -> sb.append(num + " "));

        bw.write(sb.toString());
        bw.flush();
        bw.close();
    }

    private static List<Integer> quickSort(List<Integer> arr){

        if(arr.size() <= 1) return arr;

        int pivot = arr.get(0);
        List<Integer> tail = arr.subList(1, arr.size());

        List<Integer> left = tail.stream().filter(num -> num > pivot).collect(Collectors.toList());
        List<Integer> right = tail.stream().filter(num -> num <= pivot).collect(Collectors.toList());

        List<Integer> result = new ArrayList<>();

        result.addAll(quickSort(left));
        result.add(pivot);
        result.addAll(quickSort(right));

        return result;
    }
}
