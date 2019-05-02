<template>
  <div>
    <div>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <el-form-item label="商品名称:" prop="goodsName">
          <el-input v-model="postData.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品编号:" prop="goodsCode">
          <el-input v-model="postData.goodsCode"></el-input>
        </el-form-item>
        <el-form-item label="商品类别:" prop="category">
          <el-select placeholder="请选择" v-model="postData.category">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="商品品牌:">
          <el-input></el-input>
        </el-form-item>-->
        <el-form-item label="商品属性:" prop="goodsAttributel">
          <el-input v-model="postData.goodsAttributel"></el-input>
        </el-form-item>
        <el-form-item label="商品单价:" prop="goodsPrice">
          <el-input v-model="postData.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="供应商:" prop="goodsSupplier">
          <el-input v-model="postData.goodsSupplier"></el-input>
        </el-form-item>
        <el-form-item label="供应渠道:" prop="goodsChannel">
          <el-select v-model="postData.goodsChannel" placeholder="请选择">
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="商品备注:">
          <el-input></el-input>
        </el-form-item>-->
      </el-form>
      <el-row class="btnBox">
        <el-button @click="postBen('postData')">提交</el-button>
        <el-button @click="backBtn">返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { goodsInsert,goodsUpdate } from "../../api/address.js";
export default {
  data() {
    return {
      postData: {
        category: "",
        goodsAttributel: "", //商品属性
        goodsChannel: "", //渠道
        goodsCode: "",
        goodsPrice: '',
        goodsName: "",
        goodsSupplier: "",
        goodsType: "",
        priceType: ""
      },
      rules: {
        goodsCode: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsName: [{ required: true, message: "请输入", trigger: "blur" }],
        category: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsAttributel: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        goodsChannel: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsCode: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsPrice: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsSupplier: [{ required: true, message: "请输入", trigger: "blur" }],
        goodsType: [{ required: true, message: "请输入", trigger: "blur" }],
        priceType: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      channel: [
        {
          value: "直送"
        },
        {
          value: "配送"
        }
      ],
      categories: [
        {
          value: "A类",
          label: "A类"
        },
        {
          value: "B类",
          label: "B类"
        },
        {
          value: "C类",
          label: "C类"
        },
        {
          value: "D类",
          label: "D类"
        }
      ], //商品类别
      dataList: [
        {
          name: "奶粉"
        }
      ]
    };
  },
  created() {
    console.log("12", this.$route.query.row);
    if (this.$route.query.row) {
      this.postData = this.$route.query.row;
    }
  },
  methods: {
    postBen(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$route.query.row) {
            axios.put(goodsUpdate, this.postData).then(data => {
              this.$message.success("修改成功");
              this.$router.go(-1);
            });
          } else {
            axios.post(goodsInsert, this.postData).then(data => {
              this.$message.success("新增成功");
              this.$router.go(-1);
            });
          }
        }
      });
    },
    //返回
    backBtn() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  text-align: center;
}
</style>
