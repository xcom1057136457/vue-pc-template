<template>
  <div v-loading="listLoading" class="px_10 py_15">
    <div class="font_size16 font_bold pb_15 border_b_F0">详情</div>
    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">姓名</div>
      <div class="flex_1">{{ listData.username }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">English Name</div>
      <div class="flex_1">{{ listData.englishName }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">年龄</div>
      <div class="flex_1">{{ listData.age }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">邮箱</div>
      <div class="flex_1">{{ listData.email }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">IP</div>
      <div class="flex_1">{{ listData.ip }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">账号是否已冻结</div>
      <div class="flex_1">{{ listData.isCold | formatCold }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">居住地址</div>
      <div class="flex_1">{{ listData.address }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">权限</div>
      <div class="flex_1">{{ listData.permission }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">On Site</div>
      <div class="flex_1">{{ listData.onSite | formatSite }}</div>
    </div>

    <div class="flex_box py_15 border_b_F0 font_size14">
      <div class="label">入职时间</div>
      <div class="flex_1">{{ listData.jobTime }}</div>
    </div>
  </div>
</template>

<script>
import { fetchAccount } from "@/api/account.js";
export default {
  data() {
    return {
      id: this.$route.query.id,
      listLoading: false,
      listData: {},
    };
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let { code, data } = await fetchAccount(this.id);
      if (code == this.success) {
        this.listData = this.cloneDeep(data);
      }
      this.listLoading = false;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.label {
  width: 170px;
}
</style>
