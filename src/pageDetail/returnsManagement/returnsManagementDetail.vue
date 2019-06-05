<template>
  <div>
    <div>
      <el-form label-position="right" label-width="110px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="退货单号：">
              <span>{{detailData.purchaseCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货方式: ">
              <span>{{detailData.purchaseMethod}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货状态：">
              <span>{{detailData.storage?'已入库':'未入库'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货时间：">
              <span>{{detailData.createTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货库房：">
              <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomName:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计到货时间：">
              <span>{{detailData.arrivalTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退货方：">
              <span>{{detailData.supplier}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货人：">
              <span>{{detailData.consignor}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货人电话：">
              <span>{{detailData.phone}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货人地址：">
              <span>{{detailData.address}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址：">
              <span>{{detailData.addressDetail}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <span>退货商品列表</span>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="goodsCode">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsCode}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商类类别" prop="category">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.category}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品属性" prop="goodsAttributel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsAttributel}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="goodsPrice">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsPrice}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="goodsSupplier">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsSupplier}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应渠道" prop="goodsChannel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsChannel}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" prop="num">
        <template slot-scope="scope">
          <div>
           <span>{{scope.row.goodsNumber}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品总价" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsNumber*scope.row.goodsDTO.goodsPrice}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
     <div class="btnBox">
    
      <el-button @click='$router.go(-1)'>返回</el-button>
    
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { purchaseOrderSelectById } from "../../api/address.js";
export default {
  data() {
    return {
      detailData: {},
      dataList: []
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios
        .post(purchaseOrderSelectById + "?id=" + this.$route.query.id)
        .then(data => {
          this.detailData = data;
          this.dataList = data.purchaseOrderDetailDTOS;
        });
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
