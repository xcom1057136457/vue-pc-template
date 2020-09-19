<template>
  <div>
    <div class="formWrapper">
      <el-form
        :disabled="formDisabled"
        label-position="left"
        label-width="80px"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :md="6" :xs="12">
            <el-form-item label="任务名">
              <el-input
                placeholder="请输入内容..."
                v-model="params.name"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-form-item label="任务Code">
              <el-input
                placeholder="请输入内容..."
                v-model="params.code"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-form-item label="运行状态">
              <el-select v-model="params.status">
                <el-option value="1" label="正在运行中"></el-option>
                <el-option value="2" label="已结束运行"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :xs="12">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              :loading="buttonLoading"
              @click="searchHandler"
              >查询</el-button
            >

            <el-button
              type="default"
              size="small"
              icon="el-icon-close"
              @click="resetHandler"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btnsWrapper">
      <permission-button
        keys="task_add"
        icon="el-icon-plus"
        size="mini"
        type="primary"
        >新增任务</permission-button
      >

      <el-divider direction="vertical"></el-divider>

      <permission-button
        keys="task_batchDelete"
        icon="el-icon-delete"
        size="mini"
        type="danger"
        >批量删除</permission-button
      >

      <permission-button
        keys="task_start"
        icon="el-icon-video-play"
        size="mini"
        type="warning"
        @click="startHandler"
        >开始任务</permission-button
      >

      <permission-button
        keys="task_stop"
        icon="el-icon-video-pause"
        size="mini"
        type="warning"
        @click="stopTaskHandler"
        >结束任务</permission-button
      >
    </div>
    <div class="tableWrapper mt_10">
      <el-table
        :data="tableData"
        size="small"
        v-loading="tableLoading"
        :stripe="true"
        :border="true"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        @selection-change="selectHandler"
      >
        <el-table-column
          type="selection"
          align="center"
          width="80px"
        ></el-table-column>

        <el-table-column
          label="任务名称"
          prop="name"
          align="center"
          :show-overflow-tooltip="true"
          fixed
          width="150"
        ></el-table-column>
        <el-table-column
          label="任务Code"
          prop="code"
          align="center"
          :show-overflow-tooltip="true"
          fixed
          width="150"
        ></el-table-column>
        <el-table-column
          label="任务描述"
          prop="description"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        ></el-table-column>
        <el-table-column
          label="任务状态"
          prop="status"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        >
          <template #default="record">
            {{ record.row.status | formatTaskStatus }}
          </template>
        </el-table-column>
        <el-table-column
          label="任务创建时间"
          prop="createTime"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        ></el-table-column>
        <el-table-column
          label="创建人"
          prop="createBy"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        ></el-table-column>
        <el-table-column
          label="任务持续时间(天)"
          prop="durationTime"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        ></el-table-column>
        <el-table-column
          label="任务路径"
          prop="path"
          align="center"
          :show-overflow-tooltip="true"
          width="220"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template #default="record">
            <el-row>
              <el-col :span="8">
                <permission-button
                  @click="updateHandler(record.row)"
                  type="text"
                  icon="el-icon-edit"
                  size="small"
                  keys="task_edit"
                  >编辑</permission-button
                >
              </el-col>

              <el-col :span="8">
                <permission-button
                  @click="deleteHandler(record.row)"
                  type="text"
                  icon="el-icon-delete"
                  size="small"
                  keys="task_delete"
                  >删除</permission-button
                >
              </el-col>

              <el-col :span="8">
                <permission-button
                  @click="detailHandler(record.row)"
                  type="text"
                  icon="el-icon-reading"
                  size="small"
                  keys="task_detail"
                  >任务详情</permission-button
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

    <div class="pagination mt_10 text_right" v-if="tableData.length >= 1">
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
import { getTask, startTask, stopTask } from "@/api/task.js";
export default {
  data() {
    return {
      params: {},
      pageParams: {
        page: 1,
        limit: 10,
        total: null,
      },
      buttonLoading: false,
      tableData: [],
      tableLoading: false,
      formDisabled: false,
      selectData: [],
    };
  },
  methods: {
    async getList() {
      let params = {};
      this.tableLoading = true;
      params = Object.assign(params, this.params, this.pageParams);
      let { code, data } = await getTask(params);
      if (code == this.success) {
        this.tableData = data.items;
        this.pageParams.total = data.total;
      }
      this.stopDisabled();
      this.tableLoading = false;
    },
    updateHandler() {},
    deleteHandler() {},
    detailHandler() {},
    handleSizeChange(val) {
      this.pageParams.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageParams.page = val;
      this.getList();
    },
    startDisabled() {
      this.buttonLoading = true;
      this.formDisabled = true;
    },
    stopDisabled() {
      this.buttonLoading = false;
      this.formDisabled = false;
    },
    searchHandler() {
      this.startDisabled();
      this.pageParams.page = 1;
      this.getList();
    },
    resetHandler() {
      this.$set(this, "params", {});
      this.pageParams.page = 1;
      this.getList();
    },
    selectHandler(val) {
      this.selectData = val.map((item) => item.id);
    },
    async startHandler() {
      if (this.selectData.length >= 1) {
        let { code } = await startTask();
        if (code == this.success) {
          this.$message.success("已开始任务！");
        }
        this.$set(this, 'selectData', [])
        this.getList();
      } else {
        this.$message.warning("请至少选择一条数据!");
      }
    },
    stopTaskHandler() {
      if (this.selectData.length >= 1) {
        this.$confirm("此操作将停止任务, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let { code } = await stopTask();
            if (code == this.success) {
              this.$message.success("已停止任务！");
            }
            this.selectData = []
            this.getList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      } else {
        this.$message.warning("请至少选择一条数据!");
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.formWrapper {
  border-bottom: 1px solid #f0f0f0;
}

.btnsWrapper {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
