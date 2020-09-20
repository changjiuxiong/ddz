import Poker from "./Poker";

class Player{
    constructor(param) {
        param = param || {};
        this.pokerList = [];
        this.name = param.name || 'noName'+Math.random();
        this.type = param.type || 'nongmin';
        this.last = null;
        this.next = null;
        this.isRobot = param.isRobot;
        this.game = param.game;
        
        this.lastSendObj = null;
    }

    addPoker(poker){
        this.pokerList.push(poker);
    }

    sortPoker(){
        this.pokerList.sort(this.sortFunction);
    }

    sortFunction(a, b){
        return a.number - b.number;
    }

    getLastObj(){
        let lastObj = this.last.lastSendObj;
        if(!lastObj || lastObj.type === 'pass'){
            lastObj = this.next.lastSendObj;
            if(!lastObj || lastObj.type === 'pass'){
                return false;
            }
        }
        return lastObj;
    }

    playByAI(){

        let that = this;
        setTimeout(function () {
            let lastObj = that.getLastObj();
            if(lastObj){
                that.playByObj(lastObj);
            }else{
                that.playByAllType();
            }
        },1000);

    }

    sendPoker(obj){
        this.game.clearDesk();
        this.lastSendObj = obj;
        this.game.deskPokerObj = obj;
        this.game.next();
    }

    playByAllType(){
        let types2 = ['one','two','three','threeWithOne','threeWithTwo','fourWithOne','fourWithTwo','threeWithOneList','threeWithTwoList','oneList','twoList','threeList','four','sx','pass'];
        let types = ['threeWithTwoList','threeWithOneList','threeList','twoList','fourWithTwo','fourWithOne','threeWithTwo','oneList','threeWithOne','three','two','one','four','sx','pass'];
        for(let i=0; i<types.length; i++){
            let obj = this.getSmallestObjByType(types[i]);
            if(obj){
                let success = this.deleteFromPokerListAndSendByObj(obj);
                if(!success){
                    alert('error!');
                }
                return;
            }
        }

    }

    deleteFromPokerListAndSendByObj(obj){
        let tempList = [];
        if(obj.type === 'pass'){
            this.sendPoker(obj);
            return true;
        }
        let pokerList = obj.poker;
        for(let i=0; i<pokerList.length; i++){

            let poker = this.getAndDeleteOnePokerByNumber(pokerList[i].number);
            if(poker){
                tempList.push(poker);
            }else{
                this.listBackToPokerList(tempList);
                return false;
            }
        }
        this.sendPoker(obj);
        return true;
    }

    getSmallestObjByType(type){
        let pokerList = this.pokerList;

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

        let obj = null;
        if(type === 'one'){
            if(Count1List.length>0){
                obj = {
                    type: type,
                    poker: Count1List[0],
                    one: Count1List[0],
                };
            }else if(Count2List.length>0){
                let poker = Count2List[0].slice(0,1);
                obj = {
                    type: type,
                    poker: poker,
                    one: poker,
                };
            }else if(Count3List.length>0){
                let poker = Count3List[0].slice(0,1);
                obj = {
                    type: type,
                    poker: poker,
                    one: poker,
                };
            }
        }else if(type === 'two'){
            if(Count2List.length>0){
                obj = {
                    type: type,
                    poker: Count2List[0],
                    two: Count2List[0],
                };
            }else if(Count3List.length>0){
                let poker = Count3List[0].slice(0,2);
                obj = {
                    type: type,
                    poker: poker,
                    one: poker,
                };
            }
        }else if(type === 'three'){
            if(Count3List.length>0){
                obj = {
                    type: type,
                    poker: Count3List[0],
                    three: Count3List[0],
                };
            }
        }else if(type === 'threeWithOne'){
            if(Count3List.length>0){
                let one;
                if(Count1List.length>0){
                    one = Count1List[0];
                }else if(Count2List.length>0){
                    one = Count2List[0].slice(0,1);
                }else if(Count3List.length>0){
                    for(let j=0; j<Count3List.length; j++){
                        if(j===0){
                            continue;
                        }
                        one = Count3List[j].slice(0,1);
                    }
                }

                if(one){
                    obj = {
                        type: type,
                        poker: Count3List[0].concat(one),
                        three: Count3List[0],
                        one: one,
                    };
                }
            }
        }else if(type === 'four'){
            if(Count4List.length>0){
                obj = {
                    type: type,
                    poker: Count4List[0],
                    four: Count4List[0],
                };
            }
        }else if(type === 'threeWithTwo'){
            if(Count3List.length>0){
                let two;
                if(Count2List.length>0){
                    two = Count2List[0];
                }else if(Count3List.length>0){
                    for(let j=0; j<Count3List.length; j++){
                        if(j===0){
                            continue;
                        }
                        two = Count3List[j].slice(0,2);
                    }
                }

                if(two){
                    obj = {
                        type: type,
                        poker: Count3List[0].concat(two),
                        three: Count3List[0],
                        two: two,
                    };
                }
            }
        }else if(type === 'fourWithOne'){
            if(Count4List.length>0){
                let one;
                if(Count1List.length>0){
                    one = Count1List[0];
                }else if(Count2List.length>0){
                    one = Count2List[0].slice(0,1);
                }else if(Count3List.length>0){
                    one = Count3List[0].slice(0,1);
                }

                if(one){
                    obj = {
                        type: type,
                        poker: Count4List[0].concat(one),
                        four: Count4List[0],
                        one: one,
                    };
                }
            }
        }else if(type === 'fourWithTwo'){
            if(Count4List.length>0){
                let two;
                if(Count2List.length>0){
                    two = Count2List[0];
                }else if(Count3List.length>0){
                    two = Count3List[0].slice(0,2);
                }

                if(two){
                    obj = {
                        type: type,
                        poker: Count4List[0].concat(two),
                        four: Count4List[0],
                        two: two,
                    };
                }
            }
        }else if(type === 'threeWithOneList'){
            if(Count3List.length>=2){
                for(let i=0; i<Count3List.length-2+1; i++){
                    if(Count3List[i][0].number+2-1===Count3List[i+2-1][0].number && Count3List[i+2-1][0].number<=14){

                        let oneList = [];

                        for(let j=0; j<Count1List.length&&oneList.length<2; j++){
                            oneList.push(Count1List[j]);
                        }

                        for(let j=0; j<Count2List.length&&oneList.length<2; j++){
                            oneList.push(Count2List[j].slice(0,1));
                            if(oneList.length<2){
                                oneList.push(Count2List[j].slice(1,2));
                            }
                        }

                        for(let j=0; j<Count3List.length&&oneList.length<2; j++){
                            oneList.push(Count3List[j].slice(0,1));
                            if(oneList.length<2){
                                oneList.push(Count3List[j].slice(1,2));
                            }
                            if(oneList.length<2){
                                oneList.push(Count3List[j].slice(2,3));
                            }
                        }

                        if(oneList.length === 2){

                            let poker = [];
                            let list = [];
                            for(let j=0; j<2; j++){
                                poker.concat(Count3List[i+j]);
                                poker.concat(oneList[i]);
                                let threeOne = {
                                    three: Count3List[i+j],
                                    one: oneList[i],
                                };
                                list.push(threeOne);
                            }

                            obj = {
                                type: type,
                                poker: poker,
                                list: list,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'threeWithTwoList'){
            if(Count3List.length>=2){
                for(let i=0; i<Count3List.length-2+1; i++){
                    if(Count3List[i][0].number+2-1===Count3List[i+2-1][0].number && Count3List[i+2-1][0].number<=14){

                        let twoList = [];

                        for(let j=0; j<Count2List.length&&twoList.length<2; j++){
                            twoList.push(Count2List);
                        }

                        for(let j=0; j<Count3List.length&&twoList.length<2; j++){
                            twoList.push(Count3List[j].slice(0,2));
                        }

                        if(twoList.length === 2){

                            let poker = [];
                            let list = [];
                            for(let j=0; j<2; j++){
                                poker.concat(Count3List[i+j]);
                                poker.concat(twoList[i]);
                                let threeOne = {
                                    three: Count3List[i+j],
                                    two: twoList[i],
                                };
                                list.push(threeOne);
                            }

                            obj = {
                                type: type,
                                poker: poker,
                                list: list,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'oneList'){
            if(Count1List.length>=5){
                for(let i=0; i<Count1List.length-5+1; i++){
                    if(Count1List[i][0].number+5-1===Count1List[i+5-1][0].number && Count1List[i+5-1][0].number<=14){
                        let list = Count1List.slice(i,i+5);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    one: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'twoList'){
            if(Count2List.length>=3 ){
                for(let i=0; i<Count2List.length-3+1; i++){
                    if(Count2List[i][0].number+3-1===Count2List[i+3-1][0].number && Count2List[i+3-1][0].number<=14){
                        let list = Count2List.slice(i,i+3);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    two: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'threeList'){
            if(Count3List.length>=2 ){
                for(let i=0; i<Count3List.length-2+1; i++){
                    if(Count3List[i][0].number+2-1===Count3List[i+2-1][0].number && Count3List[i+2-1][0].number<=14){
                        let list = Count3List.slice(i,i+2);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    three: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'sx'){
            if(Count1List.length>=2){
                for(let i=0; i<Count1List.length-1; i++){
                    if(Count1List[i][0].number===16){
                        let list = Count2List.slice(i,i+2);
                        let poker = list.flat(1);
                        obj = {
                            type: type,
                            poker: poker,
                            sx: poker,
                        };
                        break;
                    }
                }
            }
        }else if(type === 'pass'){
            obj = {
                type: type,
                poker: ['pass'],
            };
        }

        return obj;
    }

    getObjByObj(lastObj){
        let pokerList = this.pokerList;

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

        let type = lastObj.type;
        let obj = null;
        if(type === 'one'){
            if(Count1List.length>0){
                for(let i=0; i<Count1List.length; i++){
                    if(Count1List[i][0].number>lastObj.one[0].number){
                        obj = {
                            type: type,
                            poker: Count1List[i],
                            one: Count1List[i],
                        };
                        break;
                    }
                }
            }else if(Count2List.length>0){
                for(let i=0; i<Count2List.length; i++){
                    if(Count2List[i][0].number>lastObj.one[0].number){
                        let poker = Count2List[i].slice(0,1);
                        obj = {
                            type: type,
                            poker: poker,
                            one: poker,
                        };
                        break;
                    }
                }
            }else if(Count3List.length>0){
                for(let i=0; i<Count3List.length; i++){
                    if(Count3List[i][0].number>lastObj.one[0].number){
                        let poker = Count3List[i].slice(0,1);
                        obj = {
                            type: type,
                            poker: poker,
                            one: poker,
                        };
                        break;
                    }
                }
            }
        }else if(type === 'two'){
            if(Count2List.length>0){
                for(let i=0; i<Count2List.length; i++){
                    if(Count2List[i][0].number>lastObj.two[0].number){
                        obj = {
                            type: type,
                            poker: Count2List[i],
                            two: Count2List[i],
                        };
                        break;
                    }
                }
            }else if(Count3List.length>0){
                for(let i=0; i<Count3List.length; i++){
                    if(Count3List[i][0].number>lastObj.two[0].number){
                        let poker = Count3List[i].slice(0,2);
                        obj = {
                            type: type,
                            poker: poker,
                            one: poker,
                        };
                        break;
                    }
                }
            }
        }else if(type === 'three'){
            if(Count3List.length>0){
                for(let i=0; i<Count3List.length; i++){
                    if(Count3List[i][0].number>lastObj.three[0].number){
                        obj = {
                            type: type,
                            poker: Count3List[i],
                            three: Count3List[i],
                        };
                        break;
                    }
                }
            }
        }else if(type === 'threeWithOne'){
            if(Count3List.length>0){
                for(let i=0; i<Count3List.length; i++){
                    if(Count3List[i][0].number>lastObj.three[0].number){

                        let one;
                        if(Count1List.length>0){
                            one = Count1List[0];
                        }else if(Count2List.length>0){
                            one = Count2List[0].slice(0,1);
                        }else if(Count3List.length>0){
                            for(let j=0; j<Count3List.length; j++){
                                if(j===i){
                                    continue;
                                }
                                one = Count3List[j].slice(0,1);
                            }
                        }

                        if(one){
                            obj = {
                                type: type,
                                poker: Count3List[i].concat(one),
                                three: Count3List[i],
                                one: one,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'threeWithTwo'){
            if(Count3List.length>0){
                for(let i=0; i<Count3List.length; i++){
                    if(Count3List[i][0].number>lastObj.three[0].number){

                        let two;
                        if(Count2List.length>0){
                            two = Count2List[0];
                        }else if(Count3List.length>0){
                            for(let j=0; j<Count3List.length; j++){
                                if(j===i){
                                    continue;
                                }
                                two = Count3List[j].slice(0,2);
                            }
                        }

                        if(two){
                            obj = {
                                type: type,
                                poker: Count3List[i].concat(two),
                                three: Count3List[i],
                                two: two,
                            };
                        }
                        break;
                    }
                }
            }
        }else if(type === 'fourWithOne'){
            if(Count4List.length>0){
                for(let i=0; i<Count4List.length; i++){
                    if(Count4List[i][0].number>lastObj.four[0].number){

                        let one;
                        if(Count1List.length>0){
                            one = Count1List[0];
                        }else if(Count2List.length>0){
                            one = Count2List[0].slice(0,1);
                        }else if(Count3List.length>0){
                            one = Count3List[0].slice(0,1);
                        }

                        if(one){
                            obj = {
                                type: type,
                                poker: Count4List[i].concat(one),
                                four: Count4List[i],
                                one: one,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'fourWithTwo'){
            if(Count4List.length>0){
                for(let i=0; i<Count4List.length; i++){
                    if(Count4List[i][0].number>lastObj.four[0].number){

                        let two;
                        if(Count2List.length>0){
                            two = Count2List[0];
                        }else if(Count3List.length>0){
                            two = Count3List[0].slice(0,2);
                        }

                        if(two){
                            obj = {
                                type: type,
                                poker: Count4List[i].concat(two),
                                four: Count4List[i],
                                two: two,
                            };
                        }
                        break;
                    }
                }
            }
        }else if(type === 'threeWithOneList'){
            if(Count3List.length>=lastObj.list.length){
                for(let i=0; i<Count3List.length-lastObj.list.length+1; i++){
                    if(Count3List[i][0].number>lastObj.list[0].three[0].number && Count3List[i][0].number+lastObj.list.length-1===Count3List[i+lastObj.list.length-1][0].number && Count3List[i+lastObj.list.length-1][0].number<=14){

                        let oneList = [];

                        for(let j=0; j<Count1List.length&&oneList.length<lastObj.list.length; j++){
                            oneList.push(Count1List[j]);
                        }

                        for(let j=0; j<Count2List.length&&oneList.length<lastObj.list.length; j++){
                            oneList.push(Count2List[j].slice(0,1));
                            if(oneList.length<lastObj.list.length){
                                oneList.push(Count2List[j].slice(1,2));
                            }
                        }

                        for(let j=0; j<Count3List.length&&oneList.length<lastObj.list.length; j++){
                            oneList.push(Count3List[j].slice(0,1));
                            if(oneList.length<lastObj.list.length){
                                oneList.push(Count3List[j].slice(1,2));
                            }
                            if(oneList.length<lastObj.list.length){
                                oneList.push(Count3List[j].slice(2,3));
                            }
                        }

                        if(oneList.length === lastObj.list.length){

                            let poker = [];
                            let list = [];
                            for(let j=0; j<lastObj.list.length; j++){
                                poker.concat(Count3List[i+j]);
                                poker.concat(oneList[i]);
                                let threeOne = {
                                    three: Count3List[i+j],
                                    one: oneList[i],
                                };
                                list.push(threeOne);
                            }

                            obj = {
                                type: type,
                                poker: poker,
                                list: list,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'threeWithTwoList'){
            if(Count3List.length>=lastObj.list.length){
                for(let i=0; i<Count3List.length-lastObj.list.length+1; i++){
                    if(Count3List[i][0].number>lastObj.list[0].three[0].number && Count3List[i][0].number+lastObj.list.length-1===Count3List[i+lastObj.list.length-1][0].number && Count3List[i+lastObj.list.length-1][0].number<=14){

                        let twoList = [];

                        for(let j=0; j<Count2List.length&&twoList.length<lastObj.list.length; j++){
                            twoList.push(Count2List);
                        }

                        for(let j=0; j<Count3List.length&&twoList.length<lastObj.list.length; j++){
                            twoList.push(Count3List[j].slice(0,2));
                        }

                        if(twoList.length === lastObj.list.length){

                            let poker = [];
                            let list = [];
                            for(let j=0; j<lastObj.list.length; j++){
                                poker.concat(Count3List[i+j]);
                                poker.concat(twoList[i]);
                                let threeOne = {
                                    three: Count3List[i+j],
                                    two: twoList[i],
                                };
                                list.push(threeOne);
                            }

                            obj = {
                                type: type,
                                poker: poker,
                                list: list,
                            };
                        }
                        break;

                    }
                }
            }
        }else if(type === 'oneList'){
            if(Count1List.length>=lastObj.list.length ){
                for(let i=0; i<Count1List.length-lastObj.list.length+1; i++){
                    if(Count1List[i][0].number>lastObj.list[0].one[0].number && Count1List[i][0].number+lastObj.list.length-1===Count1List[i+lastObj.list.length-1][0].number && Count1List[i+lastObj.list.length-1][0].number<=14){
                        let list = Count1List.slice(i,i+lastObj.list.length);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    one: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'twoList'){
            if(Count2List.length>=lastObj.list.length ){
                for(let i=0; i<Count2List.length-lastObj.list.length+1; i++){
                    if(Count2List[i][0].number>lastObj.list[0].two[0].number && Count2List[i][0].number+lastObj.list.length-1===Count2List[i+lastObj.list.length-1][0].number && Count2List[i+lastObj.list.length-1][0].number<=14){
                        let list = Count2List.slice(i,i+lastObj.list.length);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    two: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'threeList'){
            if(Count3List.length>=lastObj.list.length ){
                for(let i=0; i<Count3List.length-lastObj.list.length+1; i++){
                    if(Count3List[i][0].number>lastObj.list[0].two[0].number && Count3List[i][0].number+lastObj.list.length-1===Count3List[i+lastObj.list.length-1][0].number && Count3List[i+lastObj.list.length-1][0].number<=14){
                        let list = Count3List.slice(i,i+lastObj.list.length);
                        obj = {
                            type: type,
                            poker: list.flat(1),
                            list: list.map(function (item) {
                                return {
                                    three: item,
                                }
                            }),
                        };
                        break;
                    }
                }
            }
        }else if(type === 'four'){
            if(Count4List.length>0){
                for(let i=0; i<Count4List.length; i++){
                    if(Count4List[i][0].number>lastObj.four[0].number){
                        obj = {
                            type: type,
                            poker: Count4List[i],
                            four: Count4List[i],
                        };
                        break;
                    }
                }
            }
        }

        if(!obj && type!=='four'){

            if(Count4List.length>0){
                obj = {
                    type: 'four',
                    poker: Count4List[0],
                    four: Count4List[0],
                };
            }

        }

        if(!obj && type!=='sx'){

            if(Count1List.length>1){
                if(Count1List[Count1List.length-2] === 16){
                    let poker = Count1List[Count1List.length-2].concat(Count1List[Count1List.length-1]);
                    obj = {
                        type: 'sx',
                        poker: poker,
                        sx: poker,
                    };
                }
            }

        }

        if(!obj){
            obj = {
                type: 'pass',
                poker: ['pass'],
            };
        }

        return obj;
    }

    playByObj(lastObj){

        let obj = this.getObjByObj(lastObj);
        let success = this.deleteFromPokerListAndSendByObj(obj);
        if(!success){
            alert('error!');
        }

    }

    getListByList(list){
        let tempList = [];
        if(list[0] === 'pass'){
            return ['pass'];
        }
        for(let i=0; i<list.length; i++){
            let po = list[i];
            let poker = this.getAndDeleteOnePokerByNumber(po.number);
            if(poker){
                tempList.push(poker);
            }else{
                this.listBackToPokerList(tempList);
                return false;
            }
        }
        return tempList;
    }

    getListByString(str){
        let tempList = [];
        if(str === 'pass'){
            return ['pass'];
        }
        for(let i=0; i<str.length; i++){
            let text = str[i];
            let number = Poker.textToNumber(text);
            let poker = this.getAndDeleteOnePokerByNumber(number);
            if(poker){
                tempList.push(poker);
            }else{
                this.listBackToPokerList(tempList);
                return false;
            }
        }
        return tempList;
    }

    listBackToPokerList(list){
        while (list.length>0){
            let poker = list.splice(0,1)[0];
            this.pokerList.push(poker);
        }
        this.sortPoker();
    }

    handleList(list){
        if(list){
            let obj = Poker.getObjByPokerList(list);
            if(obj){
                if(obj.type === 'pass'){
                    this.sendPoker(obj);
                    return true;
                }
                let lastObj = this.getLastObj();
                if(lastObj){
                    if(lastObj.type === obj.type){
                        let comp = this.compareTwoObj(obj, lastObj);
                        if(comp){
                            this.sendPoker(obj);
                            return true;
                        }else{
                            this.listBackToPokerList(list);
                            alert('have to bigger than '+Poker.pokerListToString(lastObj.poker));
                            return false;
                        }

                    }else{

                        if(obj.type === 'sx'){
                            this.sendPoker(obj);
                            return true;
                        }else if(obj.type === 'four' && lastObj.type!=='sx'){
                            this.sendPoker(obj);
                            return true;
                        }

                        this.listBackToPokerList(list);
                        alert('type is not '+lastObj.type+'!');
                        return false;
                    }
                }else{
                    this.sendPoker(obj);
                    return true;
                }

            }else{
                this.listBackToPokerList(list);
                alert('type error!');
                return false;
            }

        }else{
            alert('poker error!');
            return false;
        }
    }

    playByPokerList(pokerList){
        if(this.game.currentPlayer!==this){
            alert('请等待 '+this.game.currentPlayer.name+' 出牌');
            return false;
        }

        let list = this.getListByList(pokerList);
        return this.handleList(list);
    }

    playByString(str){
        if(this.game.currentPlayer!==this){
            alert('请等待 '+this.game.currentPlayer.name+' 出牌');
            return false;
        }

        let list = this.getListByString(str);
        return this.handleList(list);
    }

    compareTwoObj(obj1, obj2) {
        if(obj1.list && obj2.list){
            if(obj1.list.length!==obj2.list.length){
                return false;
            }
        }

        if (obj1.type === 'one') {
            return obj1.one[0].number > obj2.one[0].number;
        } else if (obj1.type === 'two') {
            return obj1.two[0].number > obj2.two[0].number;
        } else if (obj1.type === 'three') {
            return obj1.three[0].number > obj2.three[0].number;
        } else if (obj1.type === 'threeWithOne') {
            return obj1.three[0].number > obj2.three[0].number;
        } else if (obj1.type === 'threeWithTwo') {
            return obj1.three[0].number > obj2.three[0].number;
        } else if (obj1.type === 'fourWithOne') {
            return obj1.four[0].number > obj2.four[0].number;
        } else if (obj1.type === 'fourWithTwo') {
            return obj1.four[0].number > obj2.four[0].number;
        } else if (obj1.type === 'threeWithOneList') {
            return obj1.list[0].three[0].number > obj2.list[0].three[0].number;
        } else if (obj1.type === 'threeWithTwoList') {
            return obj1.list[0].three[0].number > obj2.list[0].three[0].number;
        } else if (obj1.type === 'oneList') {
            return obj1.list[0].one[0].number > obj2.list[0].one[0].number;
        } else if (obj1.type === 'twoList') {
            return obj1.list[0].two[0].number > obj2.list[0].two[0].number;
        } else if (obj1.type === 'threeList') {
            return obj1.list[0].three[0].number > obj2.list[0].three[0].number;
        } else if (obj1.type === 'four') {
            return obj1.four[0].number > obj2.four[0].number;
        }
    }


    getAndDeleteOnePokerByNumber(number){
        for(let i=0; i<this.pokerList.length; i++){
            if(this.pokerList[i].number === number){
                return this.pokerList.splice(i,1)[0];
            }
        }
        return false;
    }

    pokerListToString(){
        let result = Poker.pokerListToString(this.pokerList);
        return result;
    }

    lastSendObjToString(){
        if(!this.lastSendObj){
            return '';
        }
        let result = Poker.pokerListToString(this.lastSendObj.poker);
        return result;
    }

}

export default Player;