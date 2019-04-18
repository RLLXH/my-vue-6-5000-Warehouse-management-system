<template>
  <div class="all">
    <div class="header">库房管理系统</div>
    <span>
      <el-breadcrumb class="breadBox">
        <el-breadcrumb-item> 当前位置：{{bread}}</el-breadcrumb-item>
      </el-breadcrumb>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bread: ""
    };
  },
  watch: {
    $route: "breadCrumbChange"
  },
  created() {
    sessionStorage.setItem("name", this.$route.name);
    this.bread = sessionStorage.getItem("name");
  },
  methods: {
        //  面包屑
    breadCrumbChange() {
      sessionStorage.setItem("name", this.$route.name);
      this.bread = sessionStorage.getItem("name");
    }
  },
};
</script>
<style lang="less" scoped>
.all{
.header{
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px #F2F6FC solid;
}
.breadBox{
  line-height: 15px;
}
}

</style>
