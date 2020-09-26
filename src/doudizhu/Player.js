import Poker from "./Poker";
import AI from "./AI";

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
        this.ai = new AI({
            player: this,
            game: param.game,
        });
        this.classifyObj = null;

        this.lastSendObj = null;
    }

    //组牌
    getClassifyObj(){
        this.classifyObj = this.ai.getClassifyObj(this.pokerList);
        console.log(this.classifyObj);
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

        that.getClassifyObj();

        setTimeout(function () {
            let lastObj = that.getLastObj();
            if(lastObj){
                that.ai.playByObj(lastObj);
            }else{
                that.ai.playByAllType();
            }
        },1000);

    }

    sendPoker(obj){
        obj.player = this;
        this.game.clearDesk();
        this.lastSendObj = obj;
        this.game.deskPokerObj = obj;
        this.game.next();
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
                            alert('必须大于 '+Poker.pokerListToString(lastObj.poker));
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
                        alert('牌型不是 '+lastObj.type+'!');
                        return false;
                    }
                }else{
                    this.sendPoker(obj);
                    return true;
                }

            }else{
                this.listBackToPokerList(list);
                alert('牌型错误!');
                return false;
            }

        }else{
            alert('你没有此牌!');
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