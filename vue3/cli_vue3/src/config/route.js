/*
 * @Author: Brightness
 * @Date: 2021-07-15 08:55:52
 * @LastEditors: Brightness
 * @LastEditTime: 2021-07-15 09:05:21
 * @Description:  路由配置
 */
import Home from '@/views/Home.vue'

const routeConfig = {
    mode:'hash',//hash 或 history
    routes:[
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ],
    //全局路由前置守卫,可进行校验操作
    beforeEach:(to, from, next) => {

        console.log('全局路由前置守卫');
        next();
        // let t = sessionStorage.getItem('tokenStr');
        //  if(t){
        //    /*已登录*/
        //    //初始化菜单
        //    initMenu(router,store);
        //    //判断是否有user信息
        //    if(!sessionStorage.getItem('user')){
        //      getRequest('User.getUser',{token:t}).then(res => {
        //            if(res){
        //              sessionStorage.setItem('user',JSON.stringify(res));
        //              store.dispatch(INIT_ADMIN,res);
        //            }else{
        //              ElementUI.Message.warning({message:'用户信息获取失败！'});
        //              next('/');
        //            }
        //      });
        //    }
        //    next();//执行下一步
        //  }else{
            // to.path//获取跳转的路径
        //    /* 没有登录，跳转登录页 */
        //    if(to.path == '/'){
        //      next();
        //    }else{
        //      ElementUI.Message.warning({message:'请先登录!'});
        //      next('/?redirect='+to.path);//记录下次跳转路径
        //    }
           
        //  }
         
    }
}

export default routeConfig;