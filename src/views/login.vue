<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="18"></el-col>
      <el-col :span="6">
        <div class="flex_box flex_column h_100">
          <div class="top mt_50 font_size30 flex_1 justify_center">
            Dioa后台管理系统
          </div>
          <div class="mx_20 mb_20">
            <el-form :model="params" :rules="rules" ref="ruleForm">
              <el-form-item label="登陆账号" prop="username">
                <el-input
                  v-model="params.username"
                  placeholder="请输入你的登陆账号"
                  clearable
                  @keyup.enter.native="loginHandler"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="params.password"
                  placeholder="请输入你的密码"
                  clearable
                  type="password"
                  @keyup.enter.native="loginHandler"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="mt_20">
              <el-button
                type="primary"
                class="w_100 block"
                icon="el-icon-check"
                @click="loginHandler"
                >登录</el-button
              >
            </div>
          </div>
          <div class="mx_20 mb_20 detail">
            <el-row class="font_size14">
              <el-col :span="10">
                作者
              </el-col>
              <el-col :span="14">
                Dioa
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                邮箱
              </el-col>
              <el-col :span="14">
                xiaomiaomail@163.com
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                联系方式(QQ)
              </el-col>
              <el-col :span="14">
                1057136457
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                联系地址
              </el-col>
              <el-col :span="14">
                上海闵行区沪闵路3458弄66号
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                个人博客
              </el-col>
              <el-col :span="14">
                <el-link href="https://dioa.gitee.io/blog/" target="_blank"
                  >博客链接</el-link
                >
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                个人主页
              </el-col>
              <el-col :span="14">
                <el-link
                  href="https://dioa.gitee.io/personal-page"
                  target="_blank"
                  >个人主页链接</el-link
                >
              </el-col>
            </el-row>
            <el-row class="font_size14">
              <el-col :span="10">
                框架参考
              </el-col>
              <el-col :span="14">
                Vue-Element-Admin
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '../api/user'
import { fetchList } from '../api/article'
import { setToken } from '../utils/auth'
export default {
  data() {
    return {
      params: {
        username: 'admin',
        password: 123321
      },
      rules: {
        username: [
          { required: true, message: "请输入登陆账号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginHandler() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let { code, data } = await login(this.params)
          if(code == this.success) {
            setToken(data);
            this.$notify({
              type: 'success',
              title: '提示',
              message: '登陆成功'
            })
            this.$router.push({
              name: 'dashboards'
            })
          }else {
            this.$refs['ruleForm'].resetFields()
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  > .el-row {
    height: 100%;
    > .el-col {
      height: 100%;
      &:first-child {
        background-image: url("../assets//images//bc2.jpg");
        background-size: cover;
        background-repeat: no-repeat;
      }
      &:last-child {
        .el-form-item {
          margin-bottom: 0;
        }
        ::v-deep .el-form-item__error {
          top: 50%;
          margin-top: 11px;
          right: 10px;
          left: unset;
        }
        ::v-deep .el-form-item__label::before {
          margin-right: 0;
          color: unset;
          content: '';
        }
        .detail {
          line-height: 25px;
          > .el-row {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
