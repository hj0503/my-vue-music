<template lang="html">
  <div class="footer">
    <div class="mini-music">
      <div class="left">
        <i @click="showMusicPlay" class="music-img" :style="{backgroundImage: 'url(' + audio.musicImgSrc + ')'}" :class="{rotate : isPlaying}"></i>
        <div class="sing">
          <div class="sing-name">{{audio.name.split('-')[1]}}</div>
          <div class="singer">{{audio.name.split('-')[0]}}</div>
        </div>
      </div>
      <div class="right">
        <i @click="changePlay" v-if="isPlaying" class="iconfont icon-zantingbofang">&#xe706;</i>
        <i @click="changePlay" v-else class="iconfont icon-bofang">&#xe602;</i>
        <i class="iconfont icon-xiayishou" @click="next()">&#xe606;</i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'footer',
  computed: {
    isPlaying () {
      return this.$store.state.isPlaying
    },
    DOM () {
      return this.$store.state.DOM
    },
    audio () {
      return this.$store.state.audio
    },
    musicData() {
      return this.$store.state.musicData
    }
  },
  methods: {
    changePlay () {
      this.$store.commit('play',!this.isPlaying)
      if(this.isPlaying === false) {
        this.DOM.audio.pause()
      }else {
        this.DOM.audio.play()
      }
    },
    showMusicPlay () {
      this.$store.commit('showMusicPlay', true);
      this.$store.commit('startTime',this.conversion(this.DOM.audio.currentTime))
      this.$store.commit('endTime',this.conversion(this.DOM.audio.duration))
      // this.$store.commit('getLrc')
      // this.axios.get('/api/lyric')
      //   .then(function(res) {
      //     console.log(res)
      //   })
      //   console.log('hj')
    },
    conversion (value) {
      let minute = Math.floor(value / 60)
      minute = minute.toString().length === 1 ? ('0' + minute) : minute
      let second = Math.round(value % 60)
      second = second.toString().length === 1 ? ('0' + second) : second
      return `${minute}:${second}`
    },
    next () {
      this.audio.index = this.audio.index === this.musicData.length - 1? 0 : (++this.audio.index)
      this.$store.commit('toggleMusic', this.audio.index)
      this.$store.commit('play', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.eot');
  src: url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont";
  font-size: 0.8rem;
  font-style: normal;
  color: #5cacee;
}
.footer{
  height: 1.6rem;
}
.mini-music{
  position: relative;
  width: 100%;
  height: 1.6rem;
  padding: 0.266667rem 0.426667rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &:after{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    background-color: #dbe5db;
    transform: scaleY(.5);
  }
  .left{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .music-img{
      display: inline-block;
      width: 1.066667rem;
      height: 1.066667rem;
      border-radius: 50%;
      background-color: red;
      vertical-align: middle;
      background-image: url(../SideMenu/touxiang.png);
      background-size: cover;
      animation: rotateDiv 8s linear infinite;
      animation-play-state: paused;
      &.rotate{
        animation-play-state: running;
      }
    }
    .sing{
      display: inline-block;
      vertical-align: middle;
      margin-left: 0.266667rem;
      font-size: 0.32rem;
      overflow: hidden;
      .sing-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 4.0rem;
      }
      .singer{
        color: #a9baa9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 4.0rem;
      }
    }
  }
  .right{
    flex: 1;
    text-align: right;
    .icon-bofang{
      margin-right: 0.266667rem;
    }
    .icon-zantingbofang{
      margin-right: 0.266667rem;
    }
  }
}
@keyframes rotateDiv{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
