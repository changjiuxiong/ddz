<template>
  <div>
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
    }
  },
  computed: {

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
    reDraw() {

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

</style>
