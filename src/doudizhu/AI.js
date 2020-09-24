
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
                let poker = pokerList.splice(i,1);
                i--;
                poker15.push(poker[0]);
            }else if(pokerList[i].number === 16){
                let poker = pokerList.splice(i,1);
                i--;
                poker16.push(poker[0]);
            }else if(pokerList[i].number === 17){
                let poker = pokerList.splice(i,1);
                i--;
                poker17.push(poker[0]);
            }
        }

        let obj = this.classify(pokerList);
        let Count1List = obj[1];
        let Count2List = obj[2];
        let Count3List = obj[3];
        let Count4List = obj[4];

        let four = Count4List;
        let three = [];
        let threeList = [];
        let two = [];
        let twoList = [];
        let one = [];
        let oneList = [];

        if(Count3List.length>0){
            let curList = [Count3List[0]];
            let lists = [];

            for(let i2=1; i2<Count3List.length; i2++){
                if(Count3List[i2][0].number !== Count3List[i2-1][0].number+1){
                    lists.push(curList);
                    curList = [Count3List[i2]];
                }else{
                    curList.push(Count3List[i2]);
                }
            }
            lists.push(curList);
            for(let i3=0; i3<lists.length; i3++){
                if(lists[i3].length>1){
                    threeList.push(lists[i3]);
                }else{
                    three.push(lists[i3][0]);
                }
            }
        }

        if(Count2List.length>0){
            let curList2 = [Count2List[0]];
            let lists2 = [];
            for(let i4=1; i4<Count2List.length; i4++){
                if(Count2List[i4][0].number !== Count2List[i4-1][0].number+1){
                    lists2.push(curList2);
                    curList2 = [Count2List[i4]];
                }else{
                    curList2.push(Count2List[i4]);
                }
            }
            lists2.push(curList2);
            for(let i5=0; i5<lists2.length; i5++){
                if(lists2[i5].length>2){
                    twoList.push(lists2[i5]);
                }else{
                    two = two.concat(lists2[i5]);
                }
            }
        }

        if(Count1List.length>0){
            let curList1 = [Count1List[0]];
            let lists1 = [];
            for(let i6=1; i6<Count1List.length; i6++){
                if(Count1List[i6][0].number !== Count1List[i6-1][0].number+1){
                    lists1.push(curList1);
                    curList1 = [Count1List[i6]];
                }else{
                    curList1.push(Count1List[i6]);
                }
            }
            lists1.push(curList1);
            for(let i7=0; i7<lists1.length; i7++){
                if(lists1[i7].length>4){
                    oneList.push(lists1[i7]);
                }else{
                    one = one.concat(lists1[i7]);
                }
            }
        }

        //combine one two together
        if(one.length>0&&two.length>0){

            let oneIndex = 0;
            let twoIndex = 0;

            while(true){

                if(oneIndex>one.length-1&&twoIndex>two.length-1){
                    break;
                }

                let startN;
                let lastN;
                let ones = [];
                let twos = [];

                if(one.length===0 || oneIndex>one.length-1){
                    break;
                }

                if(two.length===0 || twoIndex>two.length-1){
                    startN = one[oneIndex][0].number;
                    ones.push(one[oneIndex]);
                    oneIndex++;
                }else{
                    if(one[oneIndex][0].number<two[twoIndex][0].number){
                        startN = one[oneIndex][0].number;
                        ones.push(one[oneIndex]);
                        oneIndex++;
                    }else {
                        startN = two[twoIndex][0].number;
                        twos.push(two[twoIndex]);
                        twoIndex++;
                    }
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
                            for(let i8=0; i8<ones.length; i8++){
                                cmbList.push(ones[i8]);

                                //delete from one
                                for(let j=0; j<one.length; j++){
                                    if(one[j]===ones[i8]){
                                        one.splice(j,1);
                                        break;
                                    }
                                }
                            }

                            for(let i9=0; i9<twos.length; i9++){
                                let pokers = twos[i9];

                                //delete from two
                                for(let j1=0; j1<two.length; j1++){
                                    if(two[j1]===pokers){
                                        two.splice(j1,1);
                                        break;
                                    }
                                }

                                let poker = pokers.splice(0,1);
                                cmbList.push(poker);
                                one.push(pokers);

                            }

                            cmbList.sort(this.sortArray);
                            oneList.push(cmbList);
                            one.sort(this.sortArray);

                            oneIndex = 0;
                            twoIndex = 0;
                            break;

                        }
                    }

                }while(true);

            }

        }

        //combine one oneList together
        for(let i10=0; i10<one.length; i10++){
            let find1 = false;
            for(let i11=0; i11<oneList.length; i11++){
                if(one[i10][0].number===oneList[i11][0][0].number-1){
                    oneList[i11].unshift(one[i10]);
                    find1 = true;
                    break;
                }else if(one[i10][0].number===oneList[i11][oneList[i11].length-1][0].number+1){
                    oneList[i11].push(one[i10]);
                    find1 = true;
                    break;
                }
            }
            if(find1){
                one.splice(i10,1);
                i10--;
            }
        }

        return {
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

    sortArray(a, b){
        return a[0].number - b[0].number;
    }

}

export default AI;