import Player from "./Player";
import Poker from "./Poker";

class Game{
    constructor() {
        this.playerList = [];
        this.pokerList = [];
        this.deskPokerObj = null;
        this.oldPokerList = [];
        this.currentPlayer = [];
        this.dizhu = null;
        this.MaxSecond = 999999;
        this.second = this.MaxSecond;
        this.isOver = true;

        this.init();
    }

    init(){
        this.initPokerList();
        this.initPlayerList();
        this.sendPoker();

        this.start();
    }

    resetTime(){
        this.second = this.MaxSecond;
    }

    timeLoop(){
        if(this.isOver){
            return;
        }
        this.second--;

        if(this.second === 0){
            this.timeout();
        }

        let that = this;
        setTimeout(function () {
            that.timeLoop();
        },1000);
    }

    timeout(){
        this.currentPlayer.playByString('pass');
    }

    start(){

        // this.playerList[0].getClassifyObj();

        this.isOver = false;
        this.timeLoop();
        this.currentPlayer = this.dizhu;
        if(this.currentPlayer.isRobot){
            this.currentPlayer.playByAI();
        }
    }

    next(){
        let over = this.checkGameOver();
        if(over){
            this.gameOver();
            return;
        }
        this.resetTime();
        this.currentPlayer = this.currentPlayer.next;
        if(this.currentPlayer.isRobot){
            this.currentPlayer.playByAI();
        }
    }

    gameOver(){
        alert('gameOver! '+this.currentPlayer.name+' ['+this.currentPlayer.type+'] win!');
        this.isOver = true;
    }

    checkGameOver(){
        if(this.currentPlayer.pokerList.length === 0) {
            return true;
        }
    }

    clearDesk(){
        if(this.deskPokerObj){
            this.oldPokerList.push(this.deskPokerObj);
            this.deskPokerObj = null;
        }
    }

    sendPoker(){
        let player = this.playerList[0];
        do{
            let index = this.getRandomIntInclusive(0,this.pokerList.length-1);
            let poker = this.pokerList.splice(index,1)[0];
            player.addPoker(poker);
            player = player.next;
        }while(this.pokerList.length>3);

        do{
            let poker = this.pokerList.splice(0,1)[0];
            this.dizhu.addPoker(poker);
        }while(this.pokerList.length>0);

        for(let i=0; i<this.playerList.length; i++){
            this.playerList[i].sortPoker();
        }
    }

    initPlayerList(){
        this.playerList = [];
        let player0 = new Player({
            name: 'player',
            isRobot: false,
            game: this,
        });
        let player1 = new Player({
            name: 'robot1',
            isRobot: true,
            game: this,
        });
        let player2 = new Player({
            name: 'robot2',
            isRobot: true,
            game: this,
        });
        this.playerList = [player0,player1,player2];

        this.playerList[0].next = this.playerList[1];
        this.playerList[1].next = this.playerList[2];
        this.playerList[2].next = this.playerList[0];
        this.playerList[0].last = this.playerList[2];
        this.playerList[1].last = this.playerList[0];
        this.playerList[2].last = this.playerList[1];

        let dizhuIndex = this.getRandomIntInclusive(0,2);
        this.playerList[dizhuIndex].type = 'dizhu';
        this.dizhu = this.playerList[dizhuIndex];
    }

    initPokerList(){
        this.pokerList = [];
        for(let number=3; number<=15; number++){
            for(let type=0; type<4; type++){
                let poker = new Poker({
                    number: number,
                    type: type,
                });
                this.pokerList.push(poker);
            }
        }
        for(let number=16; number<=17; number++){
            let poker = new Poker({
                number: number,
            });
            this.pokerList.push(poker);
        }

    }

    pokerListToString(){
        let result = '';
        result += Poker.pokerListToString(this.pokerList);
        result += '\n';
        for(let i=0; i<this.oldPokerList.length; i++){
            result += Poker.pokerListToString(this.oldPokerList[i].poker);
            if(i<this.oldPokerList.length-1){
                result += ',';
            }
        }
        result += '\n';
        result += this.deskPokerObj?Poker.pokerListToString(this.deskPokerObj.poker):'';
        return result;
    }

    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Game;