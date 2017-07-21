<template lang="html">
  <transition name="showMenu">
    <div class="side-menu">
      <div class="menu-my">
        <div class="mask"></div>
        <a href="https://github.com/hj0503" class="my-img"></a>
        <div class="my-information">
          <div class="left">
            <span class="name">hj0503</span>
            <span class="lv">lv.5</span>
          </div>
          <div class="right">
            <span class="sign"><i class="iconfont icon-qiandao">&#xe671;</i>签到</span>
          </div>
        </div>
      </div>
      <div class="setting">
        <ul>
          <li><i class="iconfont icon-cloud-message">&#xe609;</i>我的消息</li>
          <li><i class="iconfont icon-204">&#xe613;</i>我的会员</li>
          <li><i class="iconfont icon-gouwuche">&#xe64b;</i>商城</li>
        </ul>
        <ul>
          <li><i class="iconfont icon-personal">&#xe60c;</i>我的好友</li>
          <li><i class="iconfont icon-dizhi">&#xe60f;</i>附近的人</li>
        </ul>
        <ul>
          <li @click.self="showChooseColor">
            <i class="iconfont icon-yifu">&#xe601;</i>个性换肤
            <transition name="showColor">
              <ul v-show="chooseColor">
                <li @click="changeColor('#ff4040','#ee2c2c')"><i class="icon red"></i>网易红</li>
                <li @click="changeColor('#98fb98','#ee2c2c')"><i class="icon green"></i>qq绿</li>
                <li @click="changeColor('#5cacee','#6495ed')"><i class="icon blue"></i>默认蓝</li>
              </ul>
            </transition>
          </li>
          <li><i class="iconfont icon-huatong">&#xe711;</i>听歌识曲</li>
          <li><i class="iconfont icon-dingshi">&#xe611;</i>定时停止播放</li>
          <li><i class="iconfont icon-github">&#xe6a4;</i>Github</li>
        </ul>
      </div> 
    </div>
  </transition> 
</template>

<script>

export default {
  name: 'sidemenu',
  data () {
    return {
      chooseColor: false
    }
  },
  methods: {
    showChooseColor() {
      this.chooseColor = !this.chooseColor
    },
    changeColor(color,color1) {
      this.$store.commit('chooseSkinColor',color,color1)
      console.log(this.$store.state.skinColor1)
    }
  }
}
</script>

<style lang="scss" scoped>
.showMenu-enter-active {
  transition: all .4s ease;
}
.showMenu-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.showMenu-enter, .showMenu-leave-active {
  transform: translateX(-250px);
  opacity: 0;
}
.showColor-enter-active,.showColor-leave-active{
  transition: all .6s;
}
.showColor-enter,.showColor-leave-active{
  opacity: 0;
  transform: scale(0);
}
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_95l9pfaqm8bvgqfr.eot');
  src: url('//at.alicdn.com/t/font_95l9pfaqm8bvgqfr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_95l9pfaqm8bvgqfr.woff') format('woff'),
  url('//at.alicdn.com/t/font_95l9pfaqm8bvgqfr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_95l9pfaqm8bvgqfr.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont";
  font-size: 18px;
  font-style: normal;
}
.side-menu{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 5.866667rem;
  background: white;
  z-index: 999;
  .menu-my{
    position: relative;
    width: 100%;
    height: 3.2rem;
    background-image: url(bg.jpg);
    background-size: cover;
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.3);
    }
    .my-img{
      display: block;
      width: 1.333333rem;
      height: 1.333333rem;
      border: 1px solid white;
      border-radius: 1.333333rem;
      position: absolute;
      left: 0.266667rem;
      bottom: 0.8rem;
      background-image: url(touxiang.png);
      background-size: cover;
    }
    .my-information{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      height: 0.8rem;
      line-height: 0.8rem;
      z-index: 1;
      color: white;
      background: rgba(255,255,255,.2);
      .left{
        float: left;
        margin-left: 0.266667rem;
        font-size: 0.32rem;
        .lv{
          padding: 0 0.08rem;
          border: 1px solid white;
          border-radius: 6px;
          font-size: 8px;
        }
      }
      .right{
        float: right;
        margin-right: 0.266667rem;
        font-size: 0.32rem;
        .sign{
          padding: 0.026667rem 0.16rem;
          border: 1px solid white;
          border-radius: 10px;
          .iconfont{
            vertical-align: top;
            padding-right: 0.106667rem;
          }
        }
      }
    }
  }
  .setting{
    background-color: #f7f7f7;
    ul{
      background-color: #fff;
      margin-bottom: 0.133333rem;
      font-size: 14px;
      li{
        padding: 0.266667rem 0.133333rem;
        ul{
          li{
            padding: 0.133333rem;
            font-size: 12px;
            .icon{
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 10px;
              vertical-align: middle;
              &.red{
                background-color: #ff4040;
              }
              &.green{
                background-color: #98fb98;
              }
              &.blue{
                background-color: #5cacee;
              }
            }
            &:nth-of-type(1){
              color: #ff4040;
            }
            &:nth-of-type(2){
              color: #98fb98;
            }
            &:nth-of-type(3){
              color: #5cacee;
            }
          }
        }
        i{
          vertical-align: bottom;
          padding-right: 0.266667rem;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
