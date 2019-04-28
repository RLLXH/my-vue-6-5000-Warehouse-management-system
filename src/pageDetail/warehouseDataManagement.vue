<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="库房名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="库房编号:">
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
      <el-table-column label="编号" prop="name"></el-table-column>
      <el-table-column label="库房名称" prop="name"></el-table-column>
      <el-table-column label="是否禁用" prop="name"></el-table-column>
      <el-table-column label="创建人" prop="name"></el-table-column>
      <el-table-column label="所在地区" prop="name"></el-table-column>
    </el-table>
    <el-dialog title="新增库房" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="库房名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="库房地址:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="详细地址:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input></el-input>
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
import axios from "../api/axios.js";
import {
 storageRoomInsert
} from "../api/address.js";
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
