import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'
import Login from './views/login.vue'
import Index from './views/index'
// import Dashboard from './views/dashboard'
// import SubAccountDailyReport from './views/sub_account_daily_report'
// import BoardsDailyReport from './views/boards_daily_report'
// import PinsDailyReport from './views/sub_account_daily_report'
// import SubAccountReport from './views/sub_account_report'
// import BoardReport from './views/board_report'
// import PinsReport from './views/pins_peport'
// import AccountManager from './views/account_manager'
// import BoardManager from './views/board_manager'
// import PinManager from './views/pin_manager'
// import ListManager from './views/list_manager'
// import RecordManager from './views/record_manager'
// import UserManager from './views/user_manager'
// import RoleManager from './views/role_manager'


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
      component: Index
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
    isLogin ? next() : next('/login');
  }
});

export default router;