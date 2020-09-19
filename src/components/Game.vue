<template>
  <div style="user-select: none">
    <div style="width: 300px;height:300px;float: left; position: fixed ; left: 0px; top: 0px; background-color: aliceblue; text-align: center">
        <span>
            {{player2Str[0]}}
            </br>
            {{player2Str[1]}}
            </br></br>
            {{player2Str[2]}}
        </span>
    </div>

    <div style="width: 300px;height:300px;float: left; position: fixed ; left: 600px; top: 0px; background-color: aliceblue; text-align: center">
        <span>
            {{player1Str[0]}}
            </br>
            {{player1Str[1]}}
            </br></br>
            {{player1Str[2]}}
        </span>
    </div>

    <div style="width: 300px;height:300px;float: left; position: fixed ; left: 300px; top: 300px; background-color: aliceblue; text-align: center">
        <span>
            {{player0Str[0]}}
            </br>
            {{player0Str[1]}}
            </br></br>
            {{player0Str[2]}}
        </span>
      <div>
        <input v-model="playerStr" type="text"/>
        <button @click="sendPoker">send</button>
        <button @click="pass">pass</button>
      </div>
    </div>

    <div style="width: 300px;height:300px;float: left; position: fixed ; left: 300px; top: 0px; background-color: aliceblue; text-align: center">
      <div style="width: 300px;word-wrap: break-word;">
          {{deskStr[0]}}
          </br>
          {{deskStr[1]}}
      </div>
    </div>

    <div style="position: fixed;left: 300px;top: 600px;">
      <button @click="reStart">reStart</button>
    </div>

      <div :style="{ marginLeft: playerMarginLeft + 'px' }" style="position: fixed;bottom:0;width: 100%;height: 200px;">
          <div @mouseenter="enter($event,item)" @mousedown="pickPoker(item)" v-for="item in game.playerList[0].pokerList" :class="{ selected: item.selected }" class="poker" style="">
              {{item.text}}
          </div>
      </div>

      <div style="position: fixed;bottom:200px;width: 100%;height: 100px;text-align:left;">
          <div :style="{ marginLeft: buttonMarginLeft + 'px' }" style="width: 200px;height: 30px;">
              <button @click="sendPoker2" style="height: 30px;border-radius: 4px;float:left">出牌</button>
              <button @click="pass" style="height: 30px;border-radius: 4px;margin-left: 20px;float:right">不出</button>
          </div>
      </div>

      <div :style="{ marginLeft: deskPokerMarginLeft + 'px' }" style="position: fixed;bottom:400px;width: 100%;height: 200px">
          <div v-for="item in deskPoker" style="height:100%;width:100px;border: solid 1px;border-radius: 8px;float: left;margin-left:-50px;background-color: azure">
              {{item.text}}
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
          return (window.innerWidth - (this.deskPoker.length*50))/2;
      },
      buttonMarginLeft: function(){
          return (window.innerWidth - 200)/2;
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
              'last : '+game.playerList[i].lastSendObjToString()
          ];
        },
      player1Str: function () {
          let game = this.game;
          let i = 1;
          return [
              game.playerList[i].name+' : '+game.playerList[i].type+' : '+game.playerList[i].pokerList.length,
              game.playerList[i].pokerListToString(),
              'last : '+game.playerList[i].lastSendObjToString()
          ];
      },
      player0Str: function () {
          let game = this.game;
          let i = 0;
          return [
              game.playerList[i].name+' : '+game.playerList[i].type+' : '+game.playerList[i].pokerList.length,
              game.playerList[i].pokerListToString(),
              'last : '+game.playerList[i].lastSendObjToString()
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
    .poker{
        height:100%;width:100px;border: solid 1px;border-radius: 8px;float: left;margin-left:-50px;background-color: azure;
    }
    .poker:hover{
        background-color: antiquewhite;
    }

    .selected{
        margin-top: -20px;
    }
</style>
