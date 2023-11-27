function solution(skill, skill_trees) {
    var answer = 0;
    const skillSeq = skill.split("");
    
    skill_trees.forEach(v => {
       const skills = v.split("");
        const skillSeqArr = skills.map(skill => skillSeq.findIndex(seq => seq === skill)).filter(idx => idx > -1);
        
        let result = true;
        for(let i = 0; i < skillSeqArr.length; i++){
            if(skillSeqArr[i] !== i){
                result = false;
                break;
            }
        }
        
        if(result){
            answer++;
        }
        
    });
    
    return answer;
}