<template>
  <div>
    <div class="formWrapper">
      <el-form
        :disabled="formDisabled"
        label-position="left"
        label-width="60px"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :md="6" :sm="12">
            <el-form-item label="姓名:">
              <el-input
                v-model="params.name"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12">
            <el-form-item label="on site:">
              <el-select v-model="params.onSite">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12">
            <el-form-item label="权限:">
              <el-select v-model="params.permission">
                <el-option label="admin" value="admin"></el-option>
                <el-option label="editor" value="editor"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              :loading="searchLoading"
              @click="searchHandler"
              >查询</el-button
            >
            <el-button
              type="default"
              icon="el-icon-close"
              size="small"
              @click="resetHandler"
              >重置</el-button
            >
          </el-col>
        </el-row>
        <div class="btnsWrapper">
          <permission-button
            size="mini"
            icon="el-icon-plus"
            type="primary"
            @click="addHandler"
            keys="account_add"
          >
            新增
          </permission-button>
          <el-divider direction="vertical"></el-divider>

          <permission-button
            size="mini"
            icon="el-icon-edit"
            type="warning"
            keys="account_update"
            >修改账号权限</permission-button
          >

          <permission-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            keys="account_batchDelete"
            >批量删除</permission-button
          >
        </div>
      </el-form>
    </div>
    <div class="tableWrapper">
      <el-table
        :data="tableData"
        size="small"
        :stripe="true"
        :border="true"
        v-loading="tableLoading"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          type="selection"
          width="50"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="username"
          :show-overflow-tooltip="true"
          align="center"
          fixed
          width="150"
        >
          <template #default="record">
            <el-button type="text" size="small">{{
              record.row.username
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="English Name"
          :show-overflow-tooltip="true"
          align="center"
          fixed
          width="150"
        >
          <template #default="record">
            <el-button type="text" size="small">{{
              record.row.englishName
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="On Site"
          :show-overflow-tooltip="true"
          align="center"
          width="120"
        >
          <template #default="record">
            {{ record.row.onSite | formatSite }}
          </template>
        </el-table-column>
        <el-table-column
          label="账号权限"
          prop="permission"
          :show-overflow-tooltip="true"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column label="是否冻结" align="center">
          <template #default="record">
            <el-switch
              :value="record.row.isCold"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange(record.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="入职时间"
          prop="jobTime"
          :show-overflow-tooltip="true"
          align="center"
          width="220"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          :show-overflow-tooltip="true"
          align="center"
          width="220"
        ></el-table-column>
        <el-table-column
          label="IP"
          prop="ip"
          :show-overflow-tooltip="true"
          align="center"
          width="220"
        ></el-table-column>
        <el-table-column
          label="家庭地址"
          prop="address"
          :show-overflow-tooltip="true"
          align="center"
          width="320"
        ></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template #default="record">
            <el-row>
              <el-col :span="8">
                <permission-button
                  @click="updateHandler(record.row)"
                  type="text"
                  icon="el-icon-edit"
                  size="small"
                  keys="account_edit"
                  >编辑</permission-button
                >
              </el-col>
              <el-col :span="8">
                <permission-button
                  type="text"
                  icon="el-icon-delete"
                  size="small"
                  keys="account_delete"
                  @click="deleteHandler(record.row.username)"
                  >删除</permission-button
                >
              </el-col>
              <el-col :span="8">
                <permission-button
                  type="text"
                  icon="el-icon-reading"
                  size="small"
                  @click="doDetail(record.row.id)"
                  keys="account_detail"
                  >详情</permission-button
                >
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <template #empty>
          <Empty></Empty>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="tableData.length >= 1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.page"
        :page-size="pageParams.limit"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.total"
      >
      </el-pagination>
    </div>

    <!-- 弹框 -->
    <account-dialog
      :detail="detail"
      :visible.sync="show"
      :title="title"
      @closeHandler="closeHandler"
    ></account-dialog>
  </div>
</template>

<script>
import { getAccount } from "@/api/account";
import AccountDialog from "./components/AccountDialog";
export default {
  data() {
    return {
      params: {},
      pageParams: {
        page: 1,
        limit: 10,
        total: null,
      },
      tableData: [],
      tableLoading: false,
      show: false,
      title: 1,
      detail: {},
      formDisabled: false,
      searchLoading: false,
    };
  },
  components: {
    [AccountDialog.name]: AccountDialog,
  },
  methods: {
    async findAll() {
      let params = {};
      this.tableLoading = true;
      params = Object.assign(params, this.params, this.pageParams);
      let { code, data } = await getAccount(params);
      if (code == this.success) {
        this.stopDisabled();
        this.tableData = this.cloneDeep(data).items;
        this.pageParams.total = data.total;
      }
      this.tableLoading = false;
    },
    startDisabled() {
      this.formDisabled = true;
      this.searchLoading = true;
    },
    stopDisabled() {
      this.formDisabled = false;
      this.searchLoading = false;
    },
    searchHandler() {
      this.startDisabled();
      this.pageParams.page = 1;
      this.findAll();
    },
    resetHandler() {
      this.startDisabled();
      this.$set(this, "params", {});
      this.pageParams.page = 1;
      this.findAll();
    },
    switchChange(val) {
      this.tableData.forEach((item) => {
        if (item.id == val.id) {
          item.isCold = !item.isCold;
        }
      });
      this.$message.success("操作成功！");
    },
    handleSizeChange(val) {
      this.pageParams.limit = val;
      this.findAll();
    },
    handleCurrentChange(val) {
      this.pageParams.page = val;
      this.findAll();
    },
    addHandler() {
      this.show = true;
      this.title = 1;
    },
    updateHandler(val) {
      this.detail = val;
      this.show = true;
      this.title = 2;
    },
    closeHandler() {
      this.detail = {};
    },
    doDetail(val) {
      this.$router.push({
        path: "/AccountDetail",
        query: { id: val },
      });
    },
    deleteHandler(val) {
      this.$confirm(`此操作将永久删除${val}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.findAll()
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.findAll();
  },
};
</script>

<style lang="scss" scoped>
.formWrapper {
  > .el-form {
    .el-form-item {
      margin-bottom: 0;
    }
    > .el-row {
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
    }
    > .btnsWrapper {
      padding: 10px 0;
    }
  }
}
::v-deep .el-select {
  width: 100%;
}

.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
