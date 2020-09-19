<template>
  <div class="tabNav">
    <div
      @click="goFirstPage"
      :class="$route.path == '/dashboards' ? 'firstTag isActive' : 'firstTag'"
    >
      控制台
    </div>
    <div
      :class="$route.path == item.path ? 'tag isActive' : 'tag'"
      v-for="(item, index) in tagList"
      :key="index"
      @click="changePage(item)"
    >
      {{ item.title }}
      <i class="el-icon-close closeIcon" @click.stop="closeTag(item)"></i>
    </div>
    <div class="closeNav">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOther"
            >关闭其他标签</el-dropdown-item
          >
          <el-dropdown-item @click.native="closeAll"
            >关闭所有标签</el-dropdown-item
          >
          <el-dropdown-item @click.native="closeNow"
            >关闭所在标签</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tagList: (state) => state.tagList.tagList,
    }),
  },
  watch: {
    $route: {
      handler(val) {
        if (val.path != "/dashboards") {
          let title = val.meta.title;
          let path = val.path;
          let obj = {
            title,
            path,
          };
          let pathList = this.tagList.map((item) => item.path);
          let boolean = pathList.includes(obj.path);
          if (!boolean) {
            this.GET_TAGLIST(obj);
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      "GET_TAGLIST",
      "REMOVE_TAGLIST",
      "CLOSE_OTHER",
      "CLOSE_ALL",
      "CLOSE_NOW",
    ]),
    closeTag(val) {
      this.REMOVE_TAGLIST(val);
      let index = this.tagList.length;
      if (index > 0) {
        if (this.$route.path == val.path) {
          let path = this.tagList[index - 1].path;
          this.$router.push({
            path,
          });
        }
      } else {
        this.$router.push({
          path: "/index",
        });
      }
    },
    changePage(val) {
      this.$router.push({
        path: val.path,
      });
    },
    goFirstPage() {
      this.$router.push({
        path: "/index",
      });
    },
    closeOther() {
      this.CLOSE_OTHER(this.$route.path);
    },
    closeAll() {
      this.CLOSE_ALL();
      this.$router.push({
        path: "/index",
      });
    },
    closeNow() {
      this.CLOSE_NOW(this.$route.path);
      let length = this.tagList.length;
      let path = this.tagList[length - 1].path;
      this.$router.push({
        path,
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "../../../styles.scss";
.tabNav {
  padding: 10px 0;
  position: relative;
  > .firstTag {
    padding: 7px 12px;
    font-size: 13px;
    display: inline-block;
    border: 1px solid #333;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    margin-right: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    &:hover {
      background-color: #3d454d;
      color: #fff;
      border: 1px solid #3d454d;
    }
  }
  > .tag {
    padding: 7px 12px;
    font-size: 13px;
    display: inline-block;
    border: 1px solid #333;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    margin-right: 10px;
    transition-property: all;
    transition-duration: 0.3s;
    > i {
      visibility: hidden;
      width: 0px;
      transition-property: width;
      transition-duration: 0.3s;
    }
    &:hover {
      background-color:#3d454d;
      color: #fff;
      border: 1px solid #3d454d;
      > i {
        visibility: unset;
        width: 13px;
      }
    }
  }
  & .isActive {
    background-color: #3d454d;
    color: #fff;
    border: 1px solid #3d454d;
  }
  > .closeNav {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -10px;
  }
  .el-icon-arrow-down {
    color: $--color-primary;
  }
}
</style>
