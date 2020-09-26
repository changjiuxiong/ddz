<template>
  <div style="user-select: none;position: fixed;left: 0;right: 0;top: 0;bottom: 0;background-repeat: no-repeat;background-size: cover;" :style="{backgroundImage:'url('+require('../img/scene.jpg')+')'}">
    <div v-show="false" style="width: 300px;height:300px;float: left; position: fixed ; left: 0; top: 0px; background-color: aliceblue; text-align: center">
        <span>
            手牌：{{player2Str[1]}}
        </span>
    </div>

    <div v-show="false" style="width: 300px;height:300px;float: left; position: fixed ; right: 0; top: 0px; background-color: aliceblue; text-align: center">
        <span>
            手牌：{{player1Str[1]}}
        </span>
    </div>

    <div v-show="false" style="width: 300px;height:300px;float: left; position: fixed ; left: 600px; top: 0px; background-color: aliceblue; text-align: center">
      <div style="width: 300px;word-wrap: break-word;">
          已出的牌：
          <br/>
          {{deskStr[1]}}
      </div>
    </div>

    <div style="position: fixed;left: 10px;bottom: 10px;">
      <button @click="reStart" style="height: 50px;font-size:30px;">开始新一局</button>
    </div>

      <div :style="{ marginLeft: playerMarginLeft-150 + 'px' }" style="color:white;position: fixed;bottom:0;width: 100%;height: 200px;line-height: 200px;">
          你是 <span style="color:red;font-size: 20px">{{game.playerList[0].type==='nongmin'?'农民':'地主'}}</span>
      </div>
      <div :style="{ marginLeft: playerMarginLeft + 'px' }" style="position: fixed;bottom:0;width: 100%;height: 200px;">
          <div @mouseenter="enter($event,item)" @mousedown="pickPoker(item)" v-for="item in game.playerList[0].pokerList" :class="{ selected: item.selected, s:item.number===16, x:item.number===17 }" class="poker pokerDesk" style="">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>

      <div style="position: fixed;bottom:200px;width: 100%;height: 100px;text-align:left;">
          <div :style="{ marginLeft: buttonMarginLeft + 'px' }" style="width: 400px;height: 60px;">
              <button @click="pass" style="height: 60px;border-radius: 4px;float:left;font-size:40px;background-color: red">不出</button>
              <button @click="sendPoker2" style="height: 60px;border-radius: 4px;float:right;font-size:40px;background-color: lawngreen">出牌</button>
              <div v-show="game.currentPlayer===game.playerList[0]" style="color: red;width:150px;border: solid;border-radius: 4px;float: left;margin-left: 20px;">
                  请在{{game.second}}秒内出牌
              </div>
          </div>
      </div>

      <div v-if="game.playerList[0].lastSendObj&&game.playerList[0].lastSendObj.poker[0].text" :style="{ marginLeft: deskPokerMarginLeft + 'px' }" style="position: fixed;bottom:350px;width: 100%;height: 200px">
          <div v-for="item in game.playerList[0].lastSendObj.poker" class="pokerDesk" :class="{ s:item.number===16, x:item.number===17 }">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>
      <div v-if="game.playerList[0].lastSendObj&&!game.playerList[0].lastSendObj.poker[0].text" :style="{ marginLeft: deskPokerMarginLeft + 'px' }" style="position: fixed;bottom:350px;width: 100%;height: 200px">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;">
              pass
          </div>
      </div>

      <div style="position: fixed;top:40px;left: 20px;height:200px;width:100px;border: solid 1px;border-radius: 8px;background-color: azure;text-align: center">
          <p style="color:red;font-size: 20px">
              {{game.playerList[2].type==='nongmin'?'农民':'地主'}}
          </p>
          <p>
              {{game.playerList[2].name}}
          </p>
          <p>
              剩余 {{game.playerList[2].pokerList.length}} 张
          </p>

          <div v-show="game.currentPlayer===game.playerList[2]" style="color: red;width:150px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;left: 0">
              请在{{game.second}}秒内出牌
          </div>
      </div>
      <div v-if="game.playerList[2].lastSendObj&&game.playerList[2].lastSendObj.poker[0].text" style="position: fixed;top:100px;left:200px;height: 200px;">
          <div v-for="item in game.playerList[2].lastSendObj.poker" class="pokerDesk" :class="{ s:item.number===16, x:item.number===17 }">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>
      <div v-if="game.playerList[2].lastSendObj&&!game.playerList[2].lastSendObj.poker[0].text" style="position: fixed;top:100px;left:200px;height: 200px;">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;">
              pass
          </div>
      </div>

      <div style="position: fixed;top:40px;right: 20px;height:200px;width:100px;border: solid 1px;border-radius: 8px;background-color: azure;text-align: center">
          <p style="color:red;font-size: 20px">
              {{game.playerList[1].type==='nongmin'?'农民':'地主'}}
          </p>
          <p>
              {{game.playerList[1].name}}
          </p>
          <p>
              剩余 {{game.playerList[1].pokerList.length}} 张
          </p>
          <div v-show="game.currentPlayer===game.playerList[1]" style="color: red;width:150px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;right: 0">
              请在{{game.second}}秒内出牌
          </div>
      </div>
      <div v-if="game.playerList[1].lastSendObj&&game.playerList[1].lastSendObj.poker[0].text" style="position: fixed;top:100px;right:200px;height: 200px;">
          <div v-for="item in game.playerList[1].lastSendObj.poker" class="pokerDesk" :class="{ s:item.number===16, x:item.number===17 }">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>
      <div v-if="game.playerList[1].lastSendObj&&!game.playerList[1].lastSendObj.poker[0].text" style="position: fixed;top:100px;right:200px;height: 200px;">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;">
              pass
          </div>
      </div>

  </div>
</template>


<script>
  import Game from "../doudizhu/Game";
export default {
  name: 'HelloWorld',
  data(){
    return {
        data:'fuck1',
        game: new Game(),
        playerStr: '',
        pokerList: [],
    }
  },
  computed: {

      playerMarginLeft: function(){
          return (window.innerWidth - (this.game.playerList[0].pokerList.length*50))/2;
      },
      deskPokerMarginLeft: function(){
          return (window.innerWidth - (this.game.playerList[0].lastSendObj.poker.length*50))/2;
      },
      buttonMarginLeft: function(){
          return (window.innerWidth - 400)/2;
      },

      deskPoker: function(){
          if(this.game.deskPokerObj && this.game.deskPokerObj.poker){
              if(this.game.deskPokerObj.poker[0] && this.game.deskPokerObj.poker[0].text){
                return this.game.deskPokerObj.poker;
              }
          }
          return [];
      },
        player2Str: function () {
          let game = this.game;
          let i = 2;
          return [
              game.playerList[i].name+' : '+game.playerList[i].type+' : '+game.playerList[i].pokerList.length,
              game.playerList[i].pokerListToString(),
              game.playerList[i].lastSendObjToString()
          ];
        },
      player1Str: function () {
          let game = this.game;
          let i = 1;
          return [
              game.playerList[i].name+' : '+game.playerList[i].type+' : '+game.playerList[i].pokerList.length,
              game.playerList[i].pokerListToString(),
              game.playerList[i].lastSendObjToString()
          ];
      },
      player0Str: function () {
          let game = this.game;
          let i = 0;
          return [
              game.playerList[i].name+' : '+game.playerList[i].type+' : '+game.playerList[i].pokerList.length,
              game.playerList[i].pokerListToString(),
              game.playerList[i].lastSendObjToString()
          ];
      },
      deskStr: function () {
          let game = this.game;
          return [
              'desk',
              game.pokerListToString()
          ];
      },
  },
  mounted() {
    this.data = this.game.playerList[1].name;
    window.game = this.game;
  },
  methods:{
      enter: function(e, poker){
          if(e.buttons === 1){
              this.pickPoker(poker);
          }
      },

      pickPoker(poker){
          if(!poker.selected){
              poker.selected = true;
              this.pokerList.push(poker);
          }else{
              poker.selected = false;
              for(let i=0; i<this.pokerList.length; i++){
                  if(this.pokerList[i] === poker){
                      this.pokerList.splice(i,1);
                  }
              }
          }
      },

      sendPoker2() {
          let game = this.game;
          let success = game.playerList[0].playByPokerList(this.pokerList);
          if(success){
              this.pokerList=[];
          }
      },

      sendPoker() {
        let game = this.game;
        let success = game.playerList[0].playByString(this.playerStr);
        if(success){
            this.playerStr='';
        }
      },

    pass() {
      this.game.playerList[0].playByString('pass');
    },

    reStart() {
        this.game = new Game();
        this.playerStr='';
    },

  },
}
</script>

<style scoped>
    .pokerDesk{
        height:100%;width:100px;border: solid 1px;border-radius: 16px;float: left;margin-left:-50px;background-color: azure;
        font-size: 30px;
        background-repeat: no-repeat;background-size: cover;
    }

    .poker:hover{
        background-color: antiquewhite;
    }

    .selected{
        margin-top: -20px;
    }

    .s{
        background-image: url("../img/s.jpg");
    }

    .x{
        background-image: url("../img/x.png");
    }
</style>
