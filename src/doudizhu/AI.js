
class AI{
    constructor(param) {
        param = param || {};
    }

    classify(pokerList){

        pokerList.sort(this.sortFunction);
        let lastPoker = pokerList[0];
        let curList = [lastPoker];
        let lists = [];
        for(let i=1; i<pokerList.length; i++){
            if(pokerList[i].number !== lastPoker.number){
                lists.push(curList);
                curList = [pokerList[i]];
            }else{
                curList.push(pokerList[i]);
            }
            lastPoker = pokerList[i];
        }
        lists.push(curList);

        let Count1List = [];
        let Count2List = [];
        let Count3List = [];
        let Count4List = [];
        for(let i=0; i<lists.length; i++){
            if(lists[i].length === 3){
                Count3List.push(lists[i]);
            }else if(lists[i].length === 2){
                Count2List.push(lists[i]);
            }else if(lists[i].length === 1){
                Count1List.push(lists[i]);
            }else if(lists[i].length === 4){
                Count4List.push(lists[i]);
            }
        }

        return {
            1: Count1List,
            2: Count2List,
            3: Count3List,
            4: Count4List,
        };

    }

    getClassifyObj(pokerList0){

        let poker15 = [];
        let poker16 = [];
        let poker17 = [];

        let pokerList = pokerList0.slice(0);

        for(let i=0; i<pokerList.length; i++){
            if(pokerList[i].number === 15){
                poker15.push(pokerList[i]);
            }else if(pokerList[i].number === 16){
                poker16.push(pokerList[i]);
            }else if(pokerList[i].number === 17){
                poker17.push(pokerList[i]);
            }
        }


        let obj = this.classify(pokerList);
        let Count1List = obj[1];
        let Count2List = obj[2];
        let Count3List = obj[3];
        let Count4List = obj[4];

        let sx = [];
        let four = Count4List;
        let three = [];
        let threeList = [];
        let two = [];
        let twoList = [];
        let one = [];
        let oneList = [];
        if(Count1List.length>1){
            if(Count1List[Count1List.length-2][0].number===16){
                sx = Count1List.slice(Count1List.length-2, Count1List.length);
            }
        }
        
        let curList = [Count3List[0]];
        let lists = [];
        for(let i=1; i<Count3List.length; i++){
            if(Count3List[i][0].number !== Count3List[i-1][0].number+1){
                lists.push(curList);
                curList = [Count3List[i]];
            }else{
                curList.push(Count3List[i]);
            }
        }
        lists.push(curList);
        for(let i=1; i<lists.length; i++){
            if(lists[i].length>1){
                threeList.push(lists[i]);
            }else{
                three.push(lists[i][0]);
            }
        }

        let curList2 = [Count2List[0]];
        let lists2 = [];
        for(let i=1; i<Count2List.length; i++){
            if(Count2List[i][0].number !== Count2List[i-1][0].number+1){
                lists2.push(curList2);
                curList2 = [Count2List[i]];
            }else{
                curList2.push(Count2List[i]);
            }
        }
        lists2.push(curList2);
        for(let i=1; i<lists2.length; i++){
            if(lists2[i].length>2){
                twoList.push(lists2[i]);
            }else{
                two = two.concat(lists2[i]);
            }
        }

        let curList1 = [Count1List[0]];
        let lists1 = [];
        for(let i=1; i<Count1List.length; i++){
            if(Count1List[i][0].number !== Count1List[i-1][0].number+1){
                lists1.push(curList1);
                curList1 = [Count1List[i]];
            }else{
                curList1.push(Count1List[i]);
            }
        }
        lists1.push(curList1);
        for(let i=1; i<lists1.length; i++){
            if(lists1[i].length>4){
                oneList.push(lists1[i]);
            }else{
                one = one.concat(lists1[i]);
            }
        }

        //combine one two together
        let oneIndex = 0;
        let twoIndex = 0;

        let findlist = false;

        while(!findlist){
            let startN;
            let lastN;
            let ones = [];
            let twos = [];
            if(one[oneIndex][0].number<two[twoIndex][0].number){
                startN = one[oneIndex][0].number;
                ones.push(one[oneIndex]);
                oneIndex++;
            }else {
                startN = two[twoIndex][0].number;
                twos.push(two[twoIndex]);
                twoIndex++;
            }
            lastN = startN;

            do{
                if(oneIndex>one.length-1&&twoIndex>two.length-1){
                    break;
                }

                if(oneIndex<one.length&&one[oneIndex][0].number === lastN+1){
                    ones.push(one[oneIndex]);
                    oneIndex++;
                }else if(twoIndex<two.length&&two[twoIndex][0].number === lastN+1){
                    twos.push(two[twoIndex]);
                    twoIndex++;
                }else{
                    break;
                }

                lastN = lastN+1;
                if(lastN===startN+4){
                    if(twos.length<4){
                        //combine
                        let cmbList = [];
                        for(let i=0; i<ones.length; i++){
                            cmbList.push(ones[i]);

                            //delete from one
                            for(let j=0; j<one.length; j++){
                                if(one[j]===ones[i]){
                                    one.splice(j,1);
                                    break;
                                }
                            }
                        }

                        for(let i=0; i<twos.length; i++){
                            let pokers = twos[i];

                            //delete from two
                            for(let j=0; j<two.length; j++){
                                if(two[j]===pokers){
                                    one.splice(j,1);
                                    break;
                                }
                            }

                            let poker = pokers.splice(0);
                            cmbList.push(poker);
                            one.push(pokers);

                        }

                        oneList.push(cmbList);
                        one.sort(this.sortFunction);

                        findlist = true;
                        break;

                    }
                }

            }while(true);

        }



        return {
            sx,
            four,
            three,
            threeList,
            two,
            twoList,
            one,
            oneList,
            poker15,
            poker16,
            poker17,
        };
    }

    sortFunction(a, b){
        return a.number - b.number;
    }

}

export default AI;