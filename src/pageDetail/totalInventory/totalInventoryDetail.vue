<template>
  <div>
    <div>
      <el-form label-position="right" label-width="110px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="库房编号：">
              <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomCode:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房名称: ">
              <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomName:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库房地址：">
                <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.address:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购库房：">
              <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomName:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称：">
              <span>{{detailData.goodsDTO?detailData.goodsDTO.goodsName:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货方：">
              <span>{{detailData.goodsDTO?detailData.goodsDTO.goodsSupplier:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品价格：">
              <span>{{detailData.goodsDTO?detailData.goodsDTO.goodsPrice:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品编码：">
            <span>{{detailData.goodsDTO?detailData.goodsDTO.goodsCode:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品属性：">
              <span>{{detailData.goodsDTO?detailData.goodsDTO.goodsAttributel:''}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品库存：">
            <span>{{detailData.goodsDTO?detailData.goodsNumber:''}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button @click="$router.go(-1)">返回</el-button>
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
        console.log(this.$route.query.row)
      if (this.$route.query.row) {
        this.detailData = this.$route.query.row;
      }
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
