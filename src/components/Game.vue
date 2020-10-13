<template>
  <div style="user-select: none;position: fixed;left: 0;right: 0;top: 0;bottom: 0;background-repeat: no-repeat;background-size: cover;" :style="{backgroundImage:'url('+require('../img/scene.jpg')+')'}">
      <audio muted autoplay loop controls style="position: fixed; left: 0;bottom: 0">
          <source src="../audio/bgm.mp3">
          您的浏览器不支持 audio 元素。
      </audio>

      <div v-if="game.stage==='play'" :style="{ marginLeft: dizhuPokerMarginLeft + 'px' }" style="position: fixed;top:10px;width: 100%;height: 100px">
          <div style="color: red">
              地主牌
          </div>
          <div v-for="item in game.dizhuPokerList" class="pokerDizhu" :class="{ s:item.number===16, x:item.number===17 }">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>

      <div v-show="game.stage==='ready'" :style="{ marginLeft: playerMarginLeft-40 + 'px' }" style="font-size: 20px;color:white;position: fixed;bottom:200px;z-index: 999;">
          <button v-show="!game.playerList[0].ready" @mousedown="setReady" style="font-size: 40px;height: 60px;line-height: 30px;border-radius: 4px;background-color: lawngreen;">{{game.playerList[0].ready?'已准备':'准备'}}</button>
          <div v-show="game.playerList[0].ready" style="color: red;width:80px;border: solid;border-radius: 4px;position: absolute;">
              {{game.playerList[0].ready?'已准备':'未准备'}}
          </div>
      </div>

      <div v-show="game.stage==='jiaoFen'&&game.currentJiaoFenPlayer===game.playerList[0]" :style="{ marginLeft: playerMarginLeft-40 + 'px' }" style="font-size: 20px;color:white;position: fixed;bottom:200px;z-index: 999;">
          <button v-show="true" @mousedown="game.playerList[0].setJiaoFen(0)" style="font-size: 40px;height: 60px;line-height: 30px;border-radius: 4px;background-color: lawngreen;">不叫</button>
          <button v-show="true" @mousedown="game.playerList[0].setJiaoFen(1)" style="font-size: 40px;height: 60px;line-height: 30px;border-radius: 4px;background-color: lawngreen;">1分</button>
          <button v-show="true" @mousedown="game.playerList[0].setJiaoFen(2)" style="font-size: 40px;height: 60px;line-height: 30px;border-radius: 4px;background-color: lawngreen;">2分</button>
          <button v-show="true" @mousedown="game.playerList[0].setJiaoFen(3)" style="font-size: 40px;height: 60px;line-height: 30px;border-radius: 4px;background-color: lawngreen;">3分</button>
      </div>

      <div v-show="game.stage==='play'" :style="{ marginLeft: playerMarginLeft-150 + 'px' }" style="color:white;position: fixed;bottom:0;width: 100%;height: 200px;">
          你是 <span style="color:red;font-size: 20px">{{game.playerList[0].type==='nongmin'?'农民':'地主'}}</span>
      </div>
      <div :style="{ marginLeft: playerMarginLeft-150 + 'px' }" style="color:white;position: fixed;bottom:0;width: 100%;height: 100px;">
          金币: <span style="color:greenyellow;font-size: 20px">{{game.playerList[0].money}}</span>
      </div>
      <div :style="{ marginLeft: playerMarginLeft + 'px' }" style="position: fixed;bottom:0;width: 100%;height: 200px;">
          <div @mouseenter="enter($event,item)" @mousedown="pickPoker(item)" v-for="item in game.playerList[0].pokerList" :class="{ selected: item.selected, s:item.number===16, x:item.number===17 }" class="poker pokerDesk" style="">
              <span v-show="item.number<16">
                  {{item.text}}
              </span>
          </div>
      </div>

      <div v-show="game.currentPlayer===game.playerList[0]" style="position: fixed;bottom:200px;width: 100%;height: 100px;text-align:left;">
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
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              pass
          </div>
      </div>
      <div v-if="game.stage==='jiaoFen'&&game.playerList[0].jiaoFen!=-1" :style="{ marginLeft: playerJiaoFenMargin + 'px' }" style="position: fixed;bottom:350px;width: 100%;height: 200px">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              <span v-if="game.playerList[0].jiaoFen!=0">
                  {{game.playerList[0].jiaoFen}}分
              </span>
              <span v-if="game.playerList[0].jiaoFen==0">
                  不叫
              </span>
          </div>
      </div>

      <div style="position: fixed;top:40px;left: 20px;height:200px;width:100px;border: solid 1px;border-radius: 8px;background-color: azure;text-align: center">
          <p v-show="game.stage==='play'" style="color:red;font-size: 20px">
              {{game.playerList[2].type==='nongmin'?'农民':'地主'}}
          </p>
          <p>
              {{game.playerList[2].name}}
          </p>
          <p>
              金币: <span style="color:green;">{{game.playerList[2].money}}</span>
          </p>
          <p>
              剩余 {{game.playerList[2].pokerList.length}} 张
          </p>

          <div v-show="game.currentPlayer===game.playerList[2]" style="color: red;width:150px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;left: 0">
              请在{{game.second}}秒内出牌
          </div>
          <div v-show="game.stage==='ready'" style="color: red;width:80px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;left: 0;z-index: 999;">
              {{game.playerList[2].ready?'已准备':'未准备'}}
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
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              pass
          </div>
      </div>
      <div v-if="game.stage==='jiaoFen'&&game.playerList[2].jiaoFen!=-1" style="position: fixed;top:100px;left:200px;height: 200px;">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              <span v-if="game.playerList[2].jiaoFen!=0">
                  {{game.playerList[2].jiaoFen}}分
              </span>
              <span v-if="game.playerList[2].jiaoFen==0">
                  不叫
              </span>
          </div>
      </div>

      <div style="position: fixed;top:40px;right: 20px;height:200px;width:100px;border: solid 1px;border-radius: 8px;background-color: azure;text-align: center">
          <p v-show="game.stage==='play'" style="color:red;font-size: 20px">
              {{game.playerList[1].type==='nongmin'?'农民':'地主'}}
          </p>
          <p>
              {{game.playerList[1].name}}
          </p>
          <p>
              金币: <span style="color:green;">{{game.playerList[1].money}}</span>
          </p>
          <p>
              剩余 {{game.playerList[1].pokerList.length}} 张
          </p>
          <div v-show="game.currentPlayer===game.playerList[1]" style="color: red;width:150px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;right: 0">
              请在{{game.second}}秒内出牌
          </div>
          <div v-show="game.stage==='ready'" style="color: red;width:80px;border: solid;border-radius: 4px;position: absolute;bottom:-50px;right: 0;z-index: 999;">
              {{game.playerList[1].ready?'已准备':'未准备'}}
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
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              pass
          </div>
      </div>
      <div v-if="game.stage==='jiaoFen'&&game.playerList[1].jiaoFen!=-1" style="position: fixed;top:100px;right:200px;height: 200px;">
          <div style="height:100%;width:100px;float: left;margin-left:-50px;font-size: 50px;color:#ff0000">
              <span v-if="game.playerList[1].jiaoFen!=0">
                  {{game.playerList[1].jiaoFen}}分
              </span>
              <span v-if="game.playerList[1].jiaoFen==0">
                  不叫
              </span>
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
      playerJiaoFenMargin: function(){
          return window.innerWidth/2 - 30;
      },
      dizhuPokerMarginLeft: function(){
          return (window.innerWidth - (this.game.dizhuPokerList.length*50))/2;
      },
  },
  mounted() {
    this.data = this.game.playerList[1].name;
    window.game = this.game;
  },
  methods:{

      setReady: function() {
          let that = this;
          that.game.playerList[0].setReady();
      },

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

    pass() {
      this.game.playerList[0].playByString('pass');
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

    .pokerDizhu{
        height:100%;width:50px;border: solid 1px;border-radius: 8px;float: left;margin-left:-25px;background-color: azure;
        font-size: 20px;
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
