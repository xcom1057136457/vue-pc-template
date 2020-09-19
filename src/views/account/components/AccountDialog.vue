<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title == 1 ? '账号新增' : '账号修改'"
    v-dialogDrag
    center
    width="40%"
    @close="closeHandler"
  >
    <el-form label-width="110px" label-position="right" size="small" :disabled="formDisabled">
      <el-form-item label="姓名">
        <el-input
          placeholder="请输入内容..."
          v-model="params.username"
        ></el-input>
      </el-form-item>

      <el-form-item label="English Name">
        <el-input
          placeholder="请输入内容..."
          v-model="params.englishName"
        ></el-input>
      </el-form-item>

      <el-form-item label="On Site">
        <el-select v-model="params.onSite">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="权限:">
        <el-select v-model="params.permission">
          <el-option label="admin" value="admin"></el-option>
          <el-option label="editor" value="editor"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否冻结">
        <el-radio-group v-model="params.isCold">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="params.email" placeholder="请输入内容...">
          <template #append>
            .com
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="IP">
        <el-input placeholder="请输入内容..." v-model="params.ip"></el-input>
      </el-form-item>

      <el-form-item label="家庭地址">
        <el-input
          placeholder="请输入内容..."
          v-model="params.address"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button
        @click="dialogVisible = false"
        size="small"
        icon="el-icon-close"
        >取 消</el-button
      >
      <el-button
        type="primary"
        size="small"
        icon="el-icon-check"
        :loading="buttonLoading"
        @click="confirmHandler"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { createAccount } from "@/api/account.js";
export default {
  name: "accountDialog",
  data() {
    return {
      dialogVisible: this.visible,
      params: {},
      buttonLoading: false,
      formDisabled: false
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      },
    },
    title: {
      type: [String, Number],
      required: false,
      default: () => {
        return 1;
      },
    },
    detail: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) return;
      this.dialogVisible = val;
    },
    dialogVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:visible", val);
    },
    detail(val, oldVal) {
      if (val === oldVal) return;
      if (this.dialogVisible) {
        let data = this.cloneDeep(val);
        if (data.isCold) {
          data.isCold = "1";
        } else {
          data.isCold = "2";
        }
        data.onSite = data.onSite.toString();
        this.$set(this, "params", data);
      }
    },
  },
  methods: {
    async confirmHandler() {
      this.buttonLoading = true;
      this.formDisabled = true
      let { code } = await createAccount(this.params);
      if (code == 200) {
        this.buttonLoading = false;
        this.formDisabled = false
        this.dialogVisible = false;
        if (this.title == 1) {
          this.$notify.success({
            title: "提示",
            message: "新增成功",
          });
        } else {
          this.$notify.success({
            title: "提示",
            message: "修改成功",
          });
        }
      }
    },
    closeHandler() {
      this.$set(this, "params", {});
      this.$emit("closeHandler");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-date-editor {
  width: 100%;
}
</style>
