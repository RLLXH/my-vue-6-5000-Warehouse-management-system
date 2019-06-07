<template>
  <div class="all">
    <div class="loadingBox">
      <el-form
        label-position="right"
        label-width="0px"
        :inline="true"
        :model="loadData"
        :rules="rules"
        ref="loadData"
      >
        <el-form-item label>
          <img src="../assets/warse.png">
        </el-form-item>
        <el-form-item label prop="username">
          <el-input placeholder="请输入用户名" v-model="loadData.username"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input placeholder="请输入密码" v-model="loadData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button @click="loading('loadData')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userInfoLogin } from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      loadData: {
        username: "",
        password: "",
        
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],

      }
    };
  },
  created() {
    console.log(this.$Mytools);
  },
  
  methods: {
    loading(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              userInfoLogin +
                "?password=" +
                this.loadData.password +
                "&username=" +
                this.loadData.username
            )
            .then(data => {
              console.log(data);
              if (data) {
                sessionStorage.setItem("user", JSON.stringify(data));
                this.$router.push({
                  path: "/Index/totalInventory",
                  query: {}
                });
              }else{
                this.$message.warning('用户名或密码错误，请重新输入')
              }
            });
        }else{
          this.$message.warning('请输入用户名和密码')
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.all {
  display: flex;
  justify-content: center;
  align-items: Center;
  width: 100%;
  height: 100%;
  background: DodgerBlue;
  .loadingBox {
    display: flex;
    justify-content: center;
    align-items: Center;
    img {
      width: 210px;
    }
    .el-button {
      width: 210px;
    }
    /deep/.el-form-item {
      display: block;
    }
  }
}
</style>
