<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .m-header
    position:relative
    height:44px
    text-align:center
    font-size:0
    .icon
      display:inline-block
      vertical-align:top
      margin-top:6px
      width:30px
      height:32px
      margin-right:9px
      b-image('logo')
      background-size:30px 32px
    .text
      display:inline-block
      vertical-top:top
      line-height: 44px
      font-size:$font-size-large
</style>
