<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="用户名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户编号:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="是否禁用:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="80">
        <template>
          <div>
            <el-button type="text" @click="detailBtn">查看</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户编号" prop="name"></el-table-column>
      <el-table-column label="用户名称" prop="name"></el-table-column>
      <el-table-column label="用户密码" prop="name"></el-table-column>
      <el-table-column label="权限" prop="name"></el-table-column>
    </el-table>
    <el-dialog title="新增库房" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="用户名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户密码:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户权限:">
          <el-select>
              <el-option value="管理员" label="管理员"></el-option>
                <el-option value="游客" label="游客"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button >提交</el-button>
        <el-button >取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="库房详情" :visible.sync="dialogVisibleDetail" width="30%">
      <span></span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      dataList: [
        {
          name: "奶粉"
        }
      ]
    };
  },
  methods: {
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //详情
    detailBtn() {
      this.dialogVisibleDetail = true;
    },
    Btn() {
      this.$router.push({
        path: "/Index/Markey",
        query: {}
      });
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.dialoBtnBox{
    text-align: center
}
</style>
