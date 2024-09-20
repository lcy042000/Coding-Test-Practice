package swea;

import java.util.*;

public class FriendApp {
    static final int MAXL		= 5;
    static final int MAXF		= 10;
    static int userLen;

    private static class User implements Comparable<User>{
        int id, withF;

        User(int id, int withF){
            this.id = id;
            this.withF = withF;
        }

        @Override
        public int compareTo(User o) {
            if(this.withF == o.withF) return this.id - o.id;

            return o.withF - this.withF;
        }
    }

    static Map<Integer, Set<Integer>> users = new HashMap<>();

    public void init(int N)
    {
        userLen = N;

        for (int i = 1; i < N + 1; i++) {
            users.put(i, new HashSet<>());
        }
    }

    public void add(int id, int F, int ids[])
    {
        for (int i = 0; i < F; i++) {
            int friendId = ids[i];

            Set<Integer> myFriends = users.get(id);
            myFriends.add(friendId);
            users.put(id, myFriends);

            Set<Integer> yourFriends = users.get(friendId);
            yourFriends.add(id);
            users.put(friendId, yourFriends);
        }
    }

    public void del(int id1, int id2)
    {
        Set<Integer> myF = users.get(id1), yourF = users.get(id2);

        myF.remove(id2);
        yourF.remove(id1);

        users.put(id1, myF);
        users.put(id2, yourF);
    }

    public int recommend(int id, int list[])
    {
        Set<Integer> myF = users.get(id);

        if(myF.size() == 0) return 0;

        List<User> withF = findWithKnowFriend(id);

        if(withF.size() > 5){
            for (int i = 0; i < 5; i++) {
                list[i] = withF.get(i).id;
            }
        }else{
            for(int i = 0; i < withF.size(); i++){
                list[i] = withF.get(i).id;
            }
        }

        return withF.size() > 5 ? 5 : withF.size();
    }

    private static List<User> findWithKnowFriend(int id){
        List<User> list = new ArrayList<>();
        Set<Integer> myF = users.get(id);

        for (int i = 1; i <= userLen; i++) {
            if(i == id || myF.contains(i)) continue;

            Set<Integer> yourF = users.get(i);

            if(yourF.size() == 0) continue;

            int cnt = 0;
            for(int fId : yourF){
                if(myF.contains(fId)) cnt++;
            }

            if(cnt == 0) continue;

            list.add(new User(i, cnt));
        }

        Collections.sort(list);

        return list;
    }
}
