<template>
  <div>
    <el-row :gutter="40">
      <el-col :md="6" :sm="12">
        <div class="px_10 py_5 bc_fff flex_box border_xy_d2 hover_boxshadow">
          <div class="px_10 py_10 pr_20">
            <i class="el-icon-user font_size50 color_40"></i>
          </div>
          <div class="flex_1 flex_column justify_center px_10">
            <div class="mb_10 label font_bolder font_size18 text_right">
              New Visits
            </div>
            <div class="font_size20 font_bolder text_right">102,400</div>
          </div>
        </div>
      </el-col>

      <el-col :md="6" :sm="12">
        <div class="px_10 py_5 bc_fff flex_box border_xy_d2 hover_boxshadow">
          <div class="px_10 py_10 pr_20">
            <i class="el-icon-chat-dot-square font_size50 color_36"></i>
          </div>
          <div class="flex_1 flex_column justify_center px_10">
            <div class="mb_10 label font_bolder font_size18 text_right">
              Messages
            </div>
            <div class="font_size20 font_bolder text_right">81,212</div>
          </div>
        </div>
      </el-col>

      <el-col :md="6" :sm="12">
        <div class="px_10 py_5 bc_fff flex_box border_xy_d2 hover_boxshadow">
          <div class="px_10 py_10 pr_20">
            <i class="el-icon-coin font_size50 color_f4"></i>
          </div>
          <div class="flex_1 flex_column justify_center px_10">
            <div class="mb_10 label font_bolder font_size18 text_right">
              Purchases
            </div>
            <div class="font_size20 font_bolder text_right">9,280</div>
          </div>
        </div>
      </el-col>

      <el-col :md="6" :sm="12">
        <div class="px_10 py_5 bc_fff flex_box border_xy_d2 hover_boxshadow">
          <div class="px_10 py_10 pr_20">
            <i class="el-icon-shopping-cart-1 font_size50 color_40"></i>
          </div>
          <div class="flex_1 flex_column justify_center px_10">
            <div class="mb_10 label font_bolder font_size18 text_right">
              Shoppings
            </div>
            <div class="font_size20 font_bolder text_right">13,600</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.label {
  color: rgba(0, 0, 0, 0.45);
}
</style>
