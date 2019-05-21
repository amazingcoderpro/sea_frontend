import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'
import Login from './views/login.vue'
import Index from './views/index'
import Dashboard from './views/dashboard'
import SubAccountDailyReport from './views/sub_account_daily_report'
import BoardsDailyReport from './views/boards_daily_report'
import PinsDailyReport from './views/sub_account_daily_report'
import SubAccountReport from './views/sub_account_report'
import BoardReport from './views/board_report'
import PinsReport from './views/pins_peport'
import AccountManager from './views/account_manager'
import BoardManager from './views/board_manager'
import PinManager from './views/pin_manager'
import ListManager from './views/list_manager'
import RecordManager from './views/record_manager'
import UserManager from './views/user_manager'
import RoleManager from './views/role_manager'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/dashboard', name: 'dashboard', component: Dashboard },
        { path: '/sub_account_daily_report', name: 'sub_account_daily_report', component: SubAccountDailyReport },
        { path: '/boards_daily_report', name: 'boards_daily_report', component: BoardsDailyReport },
        { path: '/pins_daily_report', name: 'pins_daily_report', component: PinsDailyReport },
        { path: '/sub_account_report', name: 'sub_account_report', component: SubAccountReport},
        { path: '/board_report', name: 'board_report', component: BoardReport },
        { path: '/pins_peport', name: 'pins_peport', component: PinsReport },
        { path: '/account_manager', name: 'account_manager', component: AccountManager },
        { path: '/board_manager', name: 'board_manager', component: BoardManager },
        { path: '/pin_manager', name: 'pin_manager', component: PinManager },
        { path: '/list_manager', name: 'list_manager', component: ListManager },
        { path: '/record_manager', name: 'record_manager', component: RecordManager },
        { path: '/user_manager', name: 'user_manager', component: UserManager },
        { path: '/role_manager', name: 'role_manager', component: RoleManager },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: Notfount
    },

  ]
})


router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == "/login" || to.path == "/register"){
    next()
  }else{
    // isLogin ? next() : next('/login');
    if(isLogin) {
      let refreshPath = window.localStorage.getItem('router_tree') ? JSON.parse(window.localStorage.getItem('router_tree')) : this.$store.getters.router_tree
      if(refreshPath.indexOf(to.path)>=0){
        next()
      }else{
        next('/login')
      }
      }else{
        next('/login')
      }
  }
});


export default router;