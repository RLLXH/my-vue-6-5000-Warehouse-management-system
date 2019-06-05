<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="库房名称:">
          <el-input v-model="theQuery.storageRoomName"></el-input>
        </el-form-item>
        <el-form-item label="库房编号:">
          <el-input v-model="theQuery.storageRoomCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否禁用:" prop="prohibit">
          <el-select v-model="theQuery.prohibit">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteBtn(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库房编号" prop="storageRoomCode"></el-table-column>
      <el-table-column label="库房名称" prop="storageRoomName"></el-table-column>
      <!-- <el-table-column label="是否禁用" prop="prohibit">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.prohibit?'否':'是'}}</span>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="联系人" prop="contactsPerson"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
    <el-dialog title="新增库房" :visible.sync="dialogVisibleAdd" width="40%" center>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <el-form-item label="库房名称:" prop="storageRoomName">
          <el-input v-model="postData.storageRoomName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="库房编码:" prop="storageRoomCode">
          <el-input v-model="postData.storageRoomCode"></el-input>
        </el-form-item>-->
        <el-form-item label="库房地址:" prop="address">
          <el-input v-model="postData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="contactsPerson">
          <el-input v-model="postData.contactsPerson"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="postData.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否禁用:" prop="prohibit">
          <el-select v-model="postData.prohibit">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="postBtn('postData')">提交</el-button>
        <el-button @click="postB">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改库房" :visible.sync="dialogVisibleDetail" width="40%">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="updateData"
        ref="updateData"
        :rules="rules"
      >
        <el-form-item label="库房编码:" prop="storageRoomCode">
          <span class="spanBox">{{updateData.storageRoomCode}}</span>
        </el-form-item>
        <el-form-item label="库房名称:" prop="storageRoomName">
          <el-input v-model="updateData.storageRoomName"></el-input>
        </el-form-item>
        <el-form-item label="库房地址:" prop="address">
          <el-input v-model="updateData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="contactsPerson">
          <el-input v-model="updateData.contactsPerson"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="updateData.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否禁用:" prop="prohibit">
          <el-select v-model="updateData.prohibit">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updateBtn('updateData')">提交</el-button>
        <el-button @click="updateB">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import {
  storageRoomInsert,
  storageRoomSelect,
  storageRoomDelete,
  storageRoomUpdate
} from "../api/address.js";
export default {
  data() {
    return {
      pageNum: "",
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      theQuery: {
        address: "",
        contactsPerson: "",
        createPerson: "",
        pageNum: 1,
        pageSize: 20,
        phone: "",
        prohibit: null,
        storageRoomCode: "",
        storageRoomName: ""
      },
      updateData: {},
      postData: {
        address: "", //地址
        contactsPerson: "", //联系人
        createPerson: "", //创建人
        phone: "", //电话
        prohibit: false, //是否禁用
        // storageRoomCode: "", //库房编码
        storageRoomName: "" //库房名称
      },
      dataList: [],
      rules: {
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        addrcontactsPersoness: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        contactsPerson: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        createPerson: [{ required: true, message: "请输入", trigger: "blur" }],
        addrephoness: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: this.$Mytools.regInputPhone,
            trigger: "blur"
          }
        ],
        prohibit: [{ required: true, message: "请输入", trigger: "blur" }],
        storageRoomCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        storageRoomName: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //分页
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
    updateB() {
      this.dialogVisibleDetail = false;
    },
    updateBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put(
              storageRoomUpdate + "?id=" + this.updateData.id,
              this.updateData
            )
            .then(data => {
              this.$message.success("修改成功");
              this.dialogVisibleDetail = false;
              this.getList();
            });
        }
      });
    },
    deleteBtn(row) {
      axios.delete(storageRoomDelete + "?id=" + row.id).then(data => {
        this.$message.success("删除成功");
        this.getList();
      });
    },
    getList() {
      axios.post(storageRoomSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
        this.pageNum = data.totalElements;
      });
    },
    postB() {
      this.dialogVisibleAdd = false;
    },
    //提交
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(storageRoomInsert, this.postData).then(data => {
            this.$message.success("新增成功");
            this.getList();
            (this.postData = {
              address: "", //地址
              contactsPerson: "", //联系人
              createPerson: "", //创建人
              phone: "", //电话
              prohibit: false, //是否禁用
              // storageRoomCode: "", //库房编码
              storageRoomName: "" //库房名称
            }),
              (this.dialogVisibleAdd = false);
          });
        }
      });
    },
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //详情
    detailBtn(row) {
      this.updateData = row;
      this.dialogVisibleDetail = true;
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.dialoBtnBox {
  text-align: center;
}
.spanBox {
  width: 210px;
  display: block;
}
</style>
