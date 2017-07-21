<template lang="html">
  <div>
    <div class="music-list" v-for="(music,index) in musicData" @click="choosePlay(index)">
      <div class="index">
        <i :class="{play:isPlaying}" v-if="audio.index === index" class="iconfont icon-shengyin">&#xe604;</i>
        <span v-else >{{index + 1}}</span>
      </div>
      <div class="music-data">
      	<div class="music">
      	  <p class="name">{{music.name.split('-')[1]}}</p>
      	  <p class="singer">{{music.name.split('-')[0]}}</p>
      	</div>
      </div>
      <transition name="iconIn">
        <i @click.stop="toTop(index)" v-show="music.change" class="iconfont icon-zhiding1">&#xe608;</i>
      </transition>
      <transition name="iconIn1">
        <i @click.stop="deleteMusic(index)" v-show="music.change" class="iconfont icon-delete">&#xe631;</i>
      </transition>
      <i @click.stop="showIcon(music)" class="iconfont icon-sandian">&#xe62b;</i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyMusic',
  computed: {
  	musicData () {
  	  return this.$store.state.musicData;
  	},
  	audio () {
  	  return this.$store.state.audio;
  	},
  	isPlaying () {
  	  return this.$store.state.isPlaying;
  	},
    DOM() {
      return this.$store.state.DOM;
    }
  },
  methods: {
  	choosePlay (index) {
  	  this.$store.commit('toggleMusic', index);
  	  this.$store.commit('play', true);
      this.DOM.audio.play()
  	},
    showIcon(item) {
      this.$set(item,'change',!item.change)
    },
    deleteMusic(index) {
      this.musicData.splice(index,1)
    },
    toTop(index) {
      this.musicData.unshift(this.musicData.splice(index,1)[0]);
      var d = 0
      for(var i=0; i<this.musicData.length;i++){
        if(this.musicData[i].name === this.audio.name) {
          d = i;
        }
      }
      this.audio.index = d
      this.musicData[0].change = false
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_9lwocbhyrwly2e29.eot');
  src: url('//at.alicdn.com/t/font_9lwocbhyrwly2e29.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_9lwocbhyrwly2e29.woff') format('woff'),
  url('//at.alicdn.com/t/font_9lwocbhyrwly2e29.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_9lwocbhyrwly2e29.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont";
  font-size: 0.8rem;
  font-style: normal;
}
.music-list{
  position: relative;
  width: 100%;
  height: 1.333333rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:after{
  	content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    left: 1.333333rem;
    height: 1px;
    background-color: #dbe5db;
    transform: scaleY(.5);
  }
  .index{
  	width: 1.333333rem;
  	height: 100%;
  	text-align: center;
  	line-height: 1.333333rem;
  	font-size: 0;
  	.iconfont{
  	  color: red;
  	  display: inline-block;
  	  animation: play 5s linear infinite;
  	  animation-play-state: paused;
  	  &.play{
  	  	animation-play-state: running;
  	  }
  	}
  	span{
  	  display: inline-block;
  	  font-size: 0.373333rem;
  	  color: #a9baa9;
  	}
  }
  .music-data{
  	flex: 1;
  	.music{
  		font-size: 0.373333rem;
  	  .singer{
  	  	font-size: 0.32rem;
  	  	color: #a9baa9;
  	  }
  	}
  }
  .icon-sandian{
  	width: 1.333333rem;
  	text-align: center;
  	color: #a9baa9;
    vertical-align: middle;
  }
  .icon-zhiding1{
    font-size: 0.48rem;
    vertical-align: middle;
    margin-right: 0.266667rem;
    color: #a9baa9;
  }
  .icon-delete{
    font-size: 0.48rem;
    vertical-align: middle;
    color: #a9baa9;
  }
}
@keyframes play{
  0%{
    transform: scale(1);
  }
  25%{
    transform: scale(1.3);
  }
  50%{
  	transform: scale(1);
  }
  75%{
  	transform: scale(1.3);
  }
  100%{
  	transform: scale(1);
  }
}
.iconIn-enter-active{
  animation: bounce-in .8s ease-in-out;
}
.iconIn-leave-active{
   animation: bounce-in1 .8s ease-in-out;
}
.iconIn1-enter-active{
  animation: bounce-in2 .5s  ease-in-out;
}
.iconIn1-leave-active{
   animation: bounce-in3 .5s  ease-in-out;
}
@keyframes bounce-in {
  0% {
    transform: translateX(100%)
  }
  50% {
    transform: translateX(-150%)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes bounce-in1 {
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(-150%)
  }
  100% {
    transform: translateX(100%)
  }
}
@keyframes bounce-in2 {
  0% {
    transform: translateX(100%)
  }
  50% {
    transform: translateX(-120%)
  }
  100% {
    transform: translateX(0)
  }
}
@keyframes bounce-in3 {
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(-120%)
  }
  100% {
    transform: translateX(100%)
  }
}
</style>
