<template>
    <el-row class="menu_page" ref="leftMenu" 
           :style="'height:'+ leftHeight"
           >
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
  mounted() {
      setTimeout(() => {
        this.leftHeight = window.innerHeight - this.$refs.leftMenu.$el.offsetTop +"px";
      }, 50);
  },
  data() {
    return {
      leftHeight:'800px',
      // items: this.$store.getters.menu_tree
      // items: JSON.parse(window.localStorage.getItem('menu_tree'))

      items:[
              {"id":1,"menu_name":"DashBoard","menu_url":"/dashboard","parent_id":null,"icon":"iconfont icon-zhuye1","childs":[]},
              {"id":2,"menu_name":"Report","menu_url":"1","parent_id":null,"icon":"iconfont icon-report1",
                "childs":[
                  {"id":3,"menu_name":"Daily Report","menu_url":"/sub_account_daily_report","parent_id":2,"icon":null,"childs":[
                    //{"id":4,"menu_name":"Sub-Account Daily Report","menu_url":"/sub_account_daily_report","parent_id":3,"icon":null,"childs":[]},
                    // {"id":5,"menu_name":"Boards Daily Report","menu_url":"/boards_daily_report","parent_id":3,"icon":null,"childs":[]},
                    // {"id":6,"menu_name":"Pins Daily Report","menu_url":"/pins_daily_report","parent_id":3,"icon":null,"childs":[]}
                    ]
                    },
                  {"id":7,"menu_name":"Sub-Account Report","menu_url":"/sub_account_report","parent_id":2,"icon":null,"childs":[
                    // {"id":8,"menu_name":"Sub-Account Report","menu_url":"/sub_account_report","parent_id":7,"icon":null,"childs":[]},
                    // {"id":9,"menu_name":"Board Report","menu_url":"/board_report","parent_id":7,"icon":null,"childs":[]},
                    // {"id":10,"menu_name":"Pins Report","menu_url":"/pins_peport","parent_id":7,"icon":null,"childs":[]}
                    ]
                    }
              ]},
              {"id":11,"menu_name":"Account Manager","menu_url":"/account_manager","parent_id":null,"icon":"iconfont icon-report",
              "childs":[
                // {"id":12,"menu_name":"Account Manager","menu_url":"/account_manager","parent_id":11,"icon":null,"childs":[]},
                // {"id":13,"menu_name":"BoardManager","menu_url":"/board_manager","parent_id":11,"icon":null,"childs":[]},
                // {"id":14,"menu_name":"PinManager","menu_url":"/pin_manager","parent_id":11,"icon":null,"childs":[]}
              ]},
              {"id":15,"menu_name":"Rule Manager","menu_url":"3-1","parent_id":null,"icon":"iconfont icon-touruguize",
                "childs":[{"id":16,"menu_name":"Rule List","menu_url":"/rule_list","parent_id":15,"icon":null,"childs":[]},
                {"id":17,"menu_name":"Record Manager","menu_url":"/record_manager","parent_id":15,"icon":null,"childs":[]},
                {"id":17,"menu_name":"Record History","menu_url":"/record_history","parent_id":15,"icon":null,"childs":[]}]

              },
              {"id":18,"menu_name":"Personal Center","menu_url":"storeSettings","parent_id":null,"icon":"iconfont icon-icon_pc",
                "childs":[
                  // {"id":19,"menu_name":"Permission Manager","menu_url":"4-1","parent_id":18,"icon":null,"childs":[
                  //   {"id":20,"menu_name":"User Manager","menu_url":"/user_manager","parent_id":19,"icon":null,"childs":[]},
                  //   {"id":21,"menu_name":"Role Manager","menu_url":"/role_manager","parent_id":19,"icon":null,"childs":[]}]},
                  // {"id":22,"menu_name":"Store Manager","menu_url":"/store_manager","parent_id":18,"icon":null,"childs":[]},
                  // {"id":23,"menu_name":"Store Settings","menu_url":"/storeSettings","parent_id":18,"icon":null,"childs":[]},
                  // {"id":24,"menu_name":"Personal","menu_url":"/personal","parent_id":18,"icon":null,"childs":[]}
              ]}
            ]  
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  background-color: #324057;
  z-index: 99;
  overflow-y: auto;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
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
.iconfont{
  padding-right: 10px;
  font-size: 25px;
}
</style>
