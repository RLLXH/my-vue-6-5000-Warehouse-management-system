<template>
  <div>
    <div class="stepbox">
      <el-steps finish-status="success" :active="active" :space="200" class="setpboslit">
        <el-step title="选择采购商品"></el-step>
        <el-step title="生成采购单"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 选中出库商品 -->
    <div class="choseBbox" v-show="active==0">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postDate"
        ref="postDate"
      >
        <el-form-item label="采购仓库:">
          <el-select v-model="postDate.storageRoomId">
            <el-option
              v-for="(item,index) in storageRoomList"
              :key="index"
              :label="item.storageRoomName"
              :value="item.storageRoomName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" style="width: 100%" border @selection-change="selection">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
        <el-table-column label="商类类别" prop="category"></el-table-column>
        <el-table-column label="商品属性" prop="goodsAttributel"></el-table-column>
        <el-table-column label="商品单价" prop="goodsPrice"></el-table-column>
        <el-table-column label="供应商" prop="goodsSupplier"></el-table-column>
        <el-table-column label="供应渠道" prop="goodsChannel"></el-table-column>
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="采购仓库:">
          <el-select v-model="postDate.storageRoomId" disabled>
            <el-option
              v-for="(item,index) in storageRoomList"
              :key="index"
              :label="item.storageRoomName"
              :value="item.storageRoomName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货人:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发货人电话:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发货人地址：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="到货时间：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="theSelection" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
        <el-table-column label="商类类别" prop="category"></el-table-column>
        <el-table-column label="商品属性" prop="goodsAttributel"></el-table-column>
        <el-table-column label="商品单价" prop="goodsPrice"></el-table-column>
        <el-table-column label="供应商" prop="goodsSupplier"></el-table-column>
        <el-table-column label="供应渠道" prop="goodsChannel"></el-table-column>
        <el-table-column label="商品总价" prop="name"></el-table-column>
      </el-table>
    </div>
    <div class="btnBox">
      <el-button @click="nextBtn" v-if="active==0">下一步</el-button>
      <el-button @click="backBtn" v-if="active==0">返回</el-button>
      <el-button @click="prveBtn" v-if="active==1">上一步</el-button>
      <el-button @click="postBtn" v-if="active==1">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { goodsSelect, storageRoomSelect } from "../../api/address.js";
export default {
  data() {
    return {
      postDate: {
        address: "string",
        addressDetail: "string",
        arrivalTime: "2019-05-08T09:46:38.472Z",//到货时间
        consignor: "string",//发货人
        pageNum: 0,
        pageSize: 0,
        phone: "string",//电话
        purchaseCode: "string",//采购单号
        purchaseMethod: "string",//采购方式
        purchaseOrderDetailFormList: [],
        purchaseTime: "2019-05-08T09:46:38.473Z",//采购时间
        purchaseType: "string",//采购类型
        purchaserName: "string",
        storage: true,
        storageRoomId: "",
        supplier: "string"
      },
      theQuery: {
        category: null,
        goodsAttributel: null,
        goodsChannel: null,
        goodsCode: null,
        goodsName: null,
        goodsPrice: "",
        goodsSupplier: null,
        goodsType: null,
        pageNum: 1,
        pageSize: 20000,
        priceType: null
      },
      active: 0,
      dataList: [],
      theSelection: [],
      storageRoomList: []
    };
  },
  created() {
    this.getList();
    this.getstorageRoomList();
  },
  methods: {
    getstorageRoomList() {
      let data = {
        address: "",
        contactsPerson: "",
        createPerson: "",
        pageNum: 1,
        pageSize: 2000,
        phone: "",
        prohibit: null,
        storageRoomCode: "",
        storageRoomName: ""
      };
      axios.post(storageRoomSelect, data).then(data => {
        console.log(data);
        this.storageRoomList = data.content;
      });
    },
    getList() {
      axios.post(goodsSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
      });
    },
    postBtn() {
      this.$router.go(-1);
    },
    deleteBtn() {},
    backBtn() {
      this.$router.go(-1);
    },
    prveBtn() {
      this.active--;
    },
    nextBtn() {
      this.active++;
    },
    //选中商品时
    selection(list) {
      this.theSelection = list;
    }
  }
};
</script>
<style lang="less" scoped>
.setpboslit {
  width: 500px;
  margin: 0 auto;
}
.btnBox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.spanBox {
  width: 210px;
  display: block;
}
</style>

