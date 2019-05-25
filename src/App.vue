<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const decode = localStorage.eleToken;
      const user = JSON.parse( localStorage.user);
      const menu_tree = JSON.parse(localStorage.menu_tree);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", user);
      this.$store.dispatch("setMenuTree", menu_tree);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
html,
body,
#app {width: 100%;height: 100%;}
.paging{text-align:right;padding-right:20px;padding-top:20px;}
.btnRight{float:right;margin-bottom: 10px;}
.tableTitle{margin-bottom: 10px;}
.tableTitle span{background:#006699;width:175px;color:#fff;display:inline-block;padding:10px 40px 10px 10px;font-size:20px;font-weight:600;-webkit-box-shadow:0 0 5px #006699;box-shadow:0 0 5px #006699;}
.el-table thead  tr th{background: #199ED8;color:#fff;border-color: #ccc;}
.el-table tbody  tr td{border-color: #ccc;}
.el-table--border{border-color: #ccc!important;border-bottom: 1px solid #ccc!important;}
</style>
