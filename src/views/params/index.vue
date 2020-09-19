<template>
  <div>
    <div class="formWrapper">
      <el-form
        :disabled="formDisabled"
        size="small"
        label-width="90px"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col :md="6" :xs="12">
            <el-form-item label="参数名:">
              <el-input
                v-model="params.name"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-form-item label="参数Code:">
              <el-input
                v-model="params.code"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-form-item label="创建人:">
              <el-input
                v-model="params.createBy"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-form-item label="是否使用中:">
              <el-select v-model="params.start">
                <el-option label="使用中" value="1"></el-option>
                <el-option label="暂未使用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
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
      </el-form>
    </div>
    <div class="tableWrapper mt_20">
      <el-table
        :data="tableData"
        size="small"
        :stripe="true"
        :border="true"
        v-loading="tableLoading"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          align="center"
          label="参数名"
          prop="name"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="center"
          label="参数Code"
          prop="code"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="center"
          label="参数描述"
          prop="description"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="center"
          label="创建人"
          prop="createBy"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="center"
          label="是否使用中"
          :show-overflow-tooltip="true"
        >
          <template #default="record">
            {{ record.row.start | formatStart }}
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
  </div>
</template>

<script>
import { getParams } from "@/api/params.js";
export default {
  data() {
    return {
      pageParams: {
        limit: 10,
        page: 1,
        total: null,
      },
      params: {},
      tableData: [],
      searchLoading: false,
      tableLoading: false,
      formDisabled: false
    };
  },
  methods: {
    async findAll() {
      let params = {};
      this.tableLoading = true;
      params = Object.assign(params, this.params, this.pageParams);
      let { code, data } = await getParams(params);
      if (code == this.success) {
        this.tableData = this.cloneDeep(data).items;
        this.pageParams.total = data.total;
      }
      this.stopDisabled()
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
    handleSizeChange(val) {
      this.pageParams.limit = val;
      this.findAll();
    },
    handleCurrentChange(val) {
      this.pageParams.page = val;
      this.findAll();
    },
  },
  mounted() {
    this.findAll();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-select {
  width: 100%;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
