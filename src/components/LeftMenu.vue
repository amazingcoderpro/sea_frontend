<template>
    <el-row class="menu_page">
         <el-col>
           <el-menu 
            mode="vertical"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#409eff"
            class="el-menu-vertical-demo"
            router>

              <template v-for="item in items">
                  <template v-if="item.childs.length != 0">
                          <el-submenu :index="item.menu_url" :key="item.menu_url">
                          <template slot="title">
                              <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                          </template>
                          <template v-for="subItem in item.childs">
                              <!-- 二级菜单 -->
                               <!-- v-if="subItem.menu_name !='BoardManager' && subItem.menu_name !='PinManager' " -->
                              <template>
                                <el-submenu v-if="subItem.childs.length != 0" :index="subItem.menu_url" :key="subItem.menu_url">
                                    <template slot="title">{{ subItem.menu_name }}</template>
                                    <!-- 三级菜单 -->
                                    <el-menu-item v-for="(threeItem,i) in subItem.childs" :key="i" :index="threeItem.menu_url">
                                        {{ threeItem.menu_name }}
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item  :index="subItem.menu_url" :key="subItem.menu_url"  v-else>
                                  {{ subItem.menu_name }}
                                </el-menu-item>
                              </template>
                          </template>
                      </el-submenu>
                  </template>
                  <!-- 没有二级菜单 -->
                  <template v-else>
                      <el-menu-item  :index="item.menu_url" :key="item.menu_url">
                          <i :class="item.icon"></i><span slot="title">{{ item.menu_name }}</span>
                      </el-menu-item>
                  </template>
              </template>
          </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  computed: {
    // items () {
    //   return window.localStorage.getItem('menu_tree') ? JSON.parse(window.localStorage.getItem('menu_tree')) : this.$store.getters.menu_tree
    // }
  },
  data() {
    return {
      // items: this.$store.getters.menu_tree
      // items: JSON.parse(window.localStorage.getItem('menu_tree'))

      items:[
              {"id":1,"menu_name":"Dashboard","menu_url":"/dashboard","parent_id":null,"icon":"el-icon-lx-home","childs":[]},
              {"id":2,"menu_name":"Report","menu_url":"1","parent_id":null,"icon":"el-icon-lx-calendar",
                "childs":[
                  {"id":3,"menu_name":"DailyReport","menu_url":"2","parent_id":2,"icon":null,"childs":[
                    {"id":4,"menu_name":"SubAccountDailyReport","menu_url":"/sub_account_daily_report","parent_id":3,"icon":null,"childs":[]},
                    {"id":5,"menu_name":"BoardsDailyReport","menu_url":"/boards_daily_report","parent_id":3,"icon":null,"childs":[]},
                    {"id":6,"menu_name":"PinsDailyReport","menu_url":"/pins_daily_report","parent_id":3,"icon":null,"childs":[]}]},
                  {"id":7,"menu_name":"SubAccountReport","menu_url":"2-1","parent_id":2,"icon":null,"childs":[
                    {"id":8,"menu_name":"SubAccountReport","menu_url":"/sub_account_report","parent_id":7,"icon":null,"childs":[]},
                    {"id":9,"menu_name":"BoardReport","menu_url":"/board_report","parent_id":7,"icon":null,"childs":[]},
                    {"id":10,"menu_name":"PinsReport","menu_url":"/pins_peport","parent_id":7,"icon":null,"childs":[]}]}
              ]},
              {"id":11,"menu_name":"AccountManager","menu_url":"3","parent_id":null,"icon":"el-icon-lx-warn",
              "childs":[
                {"id":12,"menu_name":"AccountManager","menu_url":"/account_manager","parent_id":11,"icon":null,"childs":[]},
                // {"id":13,"menu_name":"BoardManager","menu_url":"/board_manager","parent_id":11,"icon":null,"childs":[]},
                // {"id":14,"menu_name":"PinManager","menu_url":"/pin_manager","parent_id":11,"icon":null,"childs":[]}
              ]},
              {"id":15,"menu_name":"RuleManager","menu_url":"3-1","parent_id":null,"icon":"el-icon-lx-warn",
                "childs":[{"id":16,"menu_name":"ListManager","menu_url":"/list_manager","parent_id":15,"icon":null,
                  "childs":[]},{"id":17,"menu_name":"RecordManager","menu_url":"/record_manager","parent_id":15,"icon":null,"childs":[]}]
              },
              {"id":18,"menu_name":"PersonalCenter","menu_url":"4","parent_id":null,"icon":"el-icon-lx-home",
                "childs":[
                  {"id":19,"menu_name":"PermissionManager","menu_url":"4-1","parent_id":18,"icon":null,"childs":[
                    {"id":20,"menu_name":"UserManager","menu_url":"/user_manager","parent_id":19,"icon":null,"childs":[]},
                    {"id":21,"menu_name":"RoleManager","menu_url":"/role_manager","parent_id":19,"icon":null,"childs":[]}]},
                  {"id":22,"menu_name":"StoreManager","menu_url":"/store_manager","parent_id":18,"icon":null,"childs":[]}
              ]}
            ]  
    };
  },
  methods: {
    
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
