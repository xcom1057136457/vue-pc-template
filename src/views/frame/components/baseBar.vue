<template>
  <div class="baseBar">
    <el-row>
      <el-col :span="12">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          class="inline_block mr_10 cursor_pointer foldNav"
          @click="changeHandler"
        ></i>
        <bread-crump></bread-crump>
      </el-col>
      <el-col :span="12">
        <div class="logout" @click="clickFullscreen">
          <i class="el-icon-full-screen"></i>
        </div>
        <div class="logout">
          <i class="el-icon-switch-button" @click="logoutHandler"></i>
        </div>
        <div class="avatar">
          <el-avatar
            size="small"
            :src="userInfo.avatar"
          ></el-avatar>
        </div>
        <div class="userName">{{ userInfo.name }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import breadCrump from "./breadcrump";
import { logout } from "../../../api/user";
import { removeToken } from "../../../utils/auth";
export default {
  data() {
    return {};
  },
  components: {
    breadCrump,
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.frame.isCollapse,
      userInfo: state => state.user.userInfo
    }),
  },
  methods: {
    ...mapActions(["setIsCollapse"]),
    changeHandler() {
      this.setIsCollapse(!this.isCollapse);
    },
    clickFullscreen() {
      if (!this.screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      this.screenfull.toggle();
    },
    logoutHandler() {
      this.$confirm("此操作将退出账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { code, data } = await logout();
          if (code == this.success) {
            removeToken();
            this.$router.push("/login");
            this.$notify.success({
              title: "提示",
              message: "退出成功！",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles.scss";
.baseBar {
  padding: 5px 0;
  border-bottom: 1px solid #f0f0f0;
  > .el-row {
    display: flex;
    align-items: center;
    > .el-col {
      &:first-child {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .foldNav {
          cursor: pointer;
          transition-property: all;
          transition-duration: 0.3s;
          font-size: 20px;
          &:hover {
            color: $--color-primary;
            opacity: 0.6;
          }
        }
      }
      &:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .userName {
    font-size: 12px;
    margin-left: 10px;
    color: $--color-primary;
    cursor: pointer;
  }
  .logout {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
    color: $--color-primary;
  }
  .image {
    height: 42.2px;
    overflow: hidden;
  }
}
</style>
