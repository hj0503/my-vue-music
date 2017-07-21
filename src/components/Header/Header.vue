<template lang="html">
  <div>
    <div class="header" :style="{background: skinColor}">
      <div class="header-title">
        <div class="header-icon" @click="showSideMenu">
          <i class="iconfont icon-liebiao">&#xe61b;</i>
        </div>
        <div class="header-content">
          <router-link to='/my-music' class="nav-item">
            我的
          </router-link>
          <router-link to='/ranking-list' class="nav-item">
            排行榜
          </router-link>
          <router-link to='/no' class="nav-item">
            不知道
          </router-link>
        </div>
        <div class="header-icon">
          <i class="iconfont icon-yinle">&#xe600;</i>
        </div>
      </div>
      <router-link to='/search'>
        <div class="header-search" :style="{background: skinColor1}" @click="toSearch">
          <i class="iconfont icon-sousuo">&#xe603;</i>
          <span>搜索</span>
        </div>
      </router-link>
    </div>
    <transition name="showMask">
      <div class="mask" v-show="showMask" @click="hideMenu"></div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'header',
  computed: {
    showMask () {
      return this.$store.state.showSideMenu
    },
    skinColor() {
      return this.$store.state.skinColor
    },
    skinColor1() {
      return this.$store.state.skinColor1
    },
    showHeader() {
      return this.$store.state.showHeader;
    }
  },
  methods: {
    showSideMenu () {
      this.$store.commit('showSideMenu', true);
    },
    hideMenu() {
      this.$store.state.showSideMenu = false
    },
    toSearch() {
      this.$store.commit('showHeader', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_mu0ng77ahevobt9.eot');
  src: url('//at.alicdn.com/t/font_mu0ng77ahevobt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_mu0ng77ahevobt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_mu0ng77ahevobt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_mu0ng77ahevobt9.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont";
  font-size: 0.8rem;
  font-style: normal;
  &.icon-yinle{
    font-size: 0.64rem;
  }
}
.header{
  background: #5cacee;
  color: white;
  font-size: 0.426667rem;
  padding-bottom: 0.213333rem;
  height: 2.266667rem;
  .header-title{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1.333333rem;
    .header-icon{
      width: 1.333333rem;
      height: 1.333333rem;
      text-align: center;
      line-height: 1.333333rem;
    }
    .header-content{
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 0 0.533333rem;
      .nav-item{
        flex: 1;
        text-align: center;
        color: #f0fff0;
        &.active{
          font-size: 0.48rem;
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
  }
  .header-search{
    width: 95%;
    background: #6495ed;
    margin: 0 auto;
    font-size: 0.373333rem;
    border-radius: 4px;
    text-align: center;
    color: white;
    span{
      vertical-align: middle;
    }
    .iconfont{
      display: inline-block;
      font-size: 0.64rem;
      vertical-align: middle;
    }
  }
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.3);
  z-index: 999;
}
.showMask-enter-active,.showMask-leave-active{
  transition: all .5s;
  opacity: 1;
}
.showMask-enter,.showMask-leave-active{
  opacity: 0;
}
</style>
