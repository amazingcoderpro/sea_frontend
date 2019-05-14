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
                              <el-submenu v-if="subItem.childs" :index="subItem.menu_url" :key="subItem.menu_url">
                                  <template slot="title">{{ subItem.menu_name }}</template>
                                  <!-- 三级菜单 -->
                                  <el-menu-item v-for="(threeItem,i) in subItem.childs" :key="i" :index="threeItem.menu_url">
                                      {{ threeItem.menu_name }}
                                  </el-menu-item>
                              </el-submenu>
                              <el-menu-item v-else :index="subItem.menu_url" :key="subItem.menu_url">
                                  {{ subItem.menu_name }}
                              </el-menu-item>
                          </template>
                      </el-submenu>
                  </template>
                  <!-- 没有二级菜单 -->
                  <template v-else>
                      <el-menu-item :index="item.menu_url" :key="item.menu_url">
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
  data() {
    return {
      items: this.$store.getters.menu_tree
      
      // items: [{
      //     icon: 'el-icon-lx-home',
      //     // index: '/dashboard',
      //     menu_url: '/dashboard',
      //     menu_name: '系统首页'
      // },{
      //     icon: 'el-icon-lx-calendar',
      //     // index: '3',
      //     menu_url: '3',
      //     menu_name: '表单相关',
      //     childs: [{
      //         // index: '1-1',
      //         menu_url: '1-1',
      //         menu_name: '三级菜单',
      //         childs: [{
      //             // index: 'editor',
      //             menu_url: 'editor',
      //             menu_name: '富文本编辑器'
      //         }]
      //     }]
      // },{
      //     icon: 'el-icon-lx-warn',
      //     // index: '2',
      //     menu_url: '2',
      //     menu_name: '错误处理',
      //     childs: [{
      //         // index: '404',
      //         menu_url : '404',
      //         menu_name: '404页面'
      //     }]
      // }]      
    };
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
