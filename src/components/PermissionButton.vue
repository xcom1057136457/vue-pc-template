<template>
  <el-button 
    v-if="buttonShow" 
    :type="type" 
    :size="size" 
    :disabled="buttonDisabled" 
    :icon="icon"
    :loading="loading"
    @click="checkButton"
  >
    <slot />
  </el-button>
</template>

<script>
import navData from "../assets/json/nav.json";
export default {
  name: "PermissionButton",
  props: {
    type: {
      type: String,
      default: () => {
        return "default";
      },
    },
    size: {
      type: String,
      default: () => {
        return "medium";
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    icon: {
      type: String,
      default: () => {
        return "";
      },
    },
    keys: {
      type: String,
      default: () => {
        return "";
      },
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      navData: navData,
      buttonShow: true,
      buttonDisabled: this.disabled,
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.hideButton()
      },
      deep: true
    }
  },
  methods: {
    /**
     * 进行权限检测
     */
    hideButton() {
      let self = this;
      let navPermission = null;
      for (let item of navData) {
        navPermission = item.children.filter(
          (item) => item.path == this.$route.path
        );
      }
      if (navPermission.length > 0 && navPermission[0].children) {
        navPermission = navPermission[0].children.filter(
          (item) => item.keys == self.keys
        );
        if (navPermission.length > 0) {
          this.buttonDisabled = navPermission[0].disabled;
          this.buttonShow = true;
        } else {
          this.buttonShow = false;
        }
      } else {
        this.buttonShow = false;
      }
    },
    /**
     * 防止使用工具修改disabled属性进行操作
     */
    checkButton(){
      let self = this;
      let navPermission = null;
      for (let item of navData) {
        navPermission = item.children.filter(
          (item) => item.path == this.$route.path
        );
      }
      if (navPermission.length > 0 && navPermission[0].children) {
        navPermission = navPermission[0].children.filter(
          (item) => item.keys == self.keys
        );
        if (navPermission.length > 0) {
          this.buttonShow = true;
          if(this.buttonDisabled = navPermission[0].disabled) {
            this.$notify({
              type: 'error',
              title: '提示',
              message: '你暂无权限操作'
            })
            this.$router.go(0)
          }else {
            this.$emit('click')
          }
        } 
      } 
    }
  },
  mounted() {
    this.hideButton();
  },
  updated(){
    this.hideButton()
  }
};
</script>