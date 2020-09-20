class Poker{
    constructor(param) {
        if(param.text){
            this.text = param.text;
            this.number = Poker.textToNumber(param.text);
        }else{
            this.number = param.number;
            this.text = Poker.numberToText(param.number);
        }
        this.type = param.type;
        this.selected = param.selected;
    }

    static textToNumber(text){
        switch (text) {
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case '9': return 9;
            case '10':
            case '0':
            case 'T':
            case 't': return 10;
            case '11':
            case 'j':
            case 'J': return 11;
            case '12':
            case 'q':
            case 'Q': return 12;
            case '13':
            case 'k':
            case 'K': return 13;
            case '1':
            case 'a':
            case 'A': return 14;
            case '2': return 15;
            case 's':
            case 'S': return 16;
            case 'x':
            case 'X': return 17;
        }
    }

    static numberToText(number){
        switch (number) {
            case 3: return '3';
            case 4: return '4';
            case 5: return '5';
            case 6: return '6';
            case 7: return '7';
            case 8: return '8';
            case 9: return '9';
            case 10: return '10';
            case 11: return 'J';
            case 12: return 'Q';
            case 13: return 'K';
            case 14: return 'A';
            case 15: return '2';
            case 16: return 'S';
            case 17: return 'X';
        }
    }

    static sortFunction(a, b){
        return a.number - b.number;
    }

    static getObjByPokerList(pokerList){
        if(pokerList[0] === 'pass'){
            return {
                type:'pass',
                poker: pokerList,
            };
        }
        pokerList.sort(Poker.sortFunction);

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

        if(pokerList.length === 1){

            return {
                type:'one',
                poker: pokerList,
                one: pokerList,
            };

        }else if(pokerList.length === 2){

            if(Count2List.length === 1){
                return {
                    type:'two',
                    poker: pokerList,
                    two: pokerList,
                };
            }else if(pokerList[0].number === 16 && pokerList[1].number === 17){
                return {
                    type:'sx',
                    poker: pokerList,
                    sx: pokerList,
                };
            }

        }else if(pokerList.length === 3){

            if(Count3List.length === 1){
                return {
                    type:'three',
                    poker: pokerList,
                    three: pokerList,
                };
            }

        }else if(pokerList.length === 4){

            if(Count3List.length === 1){
                return {
                    type:'threeWithOne',
                    poker: pokerList,
                    three: Count3List[0],
                    one: Count1List[0],
                };
            }else if(Count4List.length === 1){
                return {
                    type:'four',
                    poker: pokerList,
                    four: pokerList,
                };
            }

        }else if(pokerList.length === 5){

            if(Count3List.length === 1 && Count2List.length === 1){
                return {
                    type:'threeWithTwo',
                    poker: pokerList,
                    three: Count3List[0],
                    two: Count2List[0],
                };
            }else if(Count4List.length === 1 && Count1List.length === 1){
                return {
                    type:'fourWithOne',
                    poker: pokerList,
                    four: Count4List[0],
                    one: Count1List[0],
                };
            }

        }else if(pokerList.length === 6){

            if(Count4List.length === 1 && Count2List.length === 1){
                return {
                    type:'fourWithTwo',
                    poker: pokerList,
                    four: Count4List[0],
                    two: Count2List[0],
                };
            }

        }

        if(Count3List.length>=2 && Count3List[Count3List.length-1][0].number<=14 && Count3List[0][0].number+Count3List.length-1===Count3List[Count3List.length-1][0].number){
            //threeWithOneList
            if(pokerList.length-3*Count3List.length===Count3List.length){
                return {
                    type:'threeWithOneList',
                    poker: pokerList,
                    list: Count3List.map(function (item) {
                        return {
                            three: item,
                        };
                    }),
                };
            }else{
                //threeWithTwoList
                if(Count2List.length===Count3List.length){
                    return {
                        type:'threeWithTwoList',
                        poker: pokerList,
                        list: Count3List.map(function (item) {
                            return {
                                three: item,
                            };
                        }),
                    };
                }
            }
        }

        //判断oneList
        if(pokerList.length >= 5 && pokerList[pokerList.length-1].number<=14 && Count1List.length === pokerList.length && pokerList[0].number+pokerList.length-1===pokerList[pokerList.length-1].number){
            return {
                type:'oneList',
                poker: pokerList,
                list: Count1List.map(function (item) {
                    return {
                        one: item,
                    }
                }),
            }
        }

        //判断twoList
        if(pokerList.length >= 6 && pokerList[pokerList.length-1].number<=14 && pokerList.length%2 === 0 && Count2List.length === pokerList.length/2 && pokerList[0].number+pokerList.length/2-1===pokerList[pokerList.length-1].number){
            return {
                type:'twoList',
                poker: pokerList,
                list: Count2List.map(function (item) {
                    return {
                        two: item,
                    }
                }),
            }
        }

        //判断threeList
        if(pokerList.length >= 6 && pokerList[pokerList.length-1].number<=14 && pokerList.length%3 === 0 && Count3List.length === pokerList.length/3 && pokerList[0].number+pokerList.length/3-1===pokerList[pokerList.length-1].number){
            return {
                type:'threeList',
                poker: pokerList,
                list: Count3List.map(function (item) {
                    return {
                        three: item,
                    }
                }),
            }
        }

        return false;
    }

    static pokerListToString(pokerList){
        let result = '';
        for(let i=0; i<pokerList.length; i++){
            let str = pokerList[i].toString();
            result += str;
        }
        return result;
    }

    toString(){
        return this.text;
    }

}

export default Poker;