<template>
  <div class="flex_box f-c-c flex_column">
    <div class="imageBox">
      <img src="../assets/images/empty.jpg" />
    </div>
    <span class="font_size14 font_bold">暂无内容...</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.imageBox {
  width: 450px;
  height: 280px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
  }
}

</style>