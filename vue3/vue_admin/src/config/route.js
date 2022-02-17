/*
 * @Author: Brightness
 * @Date: 2021-07-15 08:55:52
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-27 16:10:59
 * @Description:  路由配置
 */
import { VXETable } from "vxe-table";
import { isLogin } from "@/utils/tools";
const routeConfig = {
    mode: "hash", //hash 或 history
    routes: [
        {
            path: "/",
            name: "Login",
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/home",
            name: "/home",
            component: () => import("@/views/Main.vue"),
            children: [
                {
                    path: "/home",
                    name: "/home",
                    component: () => import("@/views/sys/Home.vue"),
                },
                {
                    path: "/about",
                    name: "/about",
                    component: () => import("@/views/sys/About.vue"),
                },
                //个人中心
                {
                    path: "/person/Password",
                    name: "/person/Password",
                    component: () => import("@/views/person/Password.vue"),
                },
                {
                    path: "/person/Info",
                    name: "/person/Info",
                    component: () => import("@/views/person/Info.vue"),
                },
                //文档中心
                {
                    path: "/document/List",
                    name: "/document/List",
                    component: () => import("@/views/document/List.vue"),
                },
                {
                    path: "/document/Manage",
                    name: "/document/Manage",
                    component: () => import("@/views/document/Manage.vue"),
                },
                {
                    path: "/document/Category",
                    name: "/document/Category",
                    component: () => import("@/views/document/Category.vue"),
                },
                //公告管理
                {
                    path: "/notice/Table",
                    name: "/notice/Table",
                    component: () => import("@/views/notice/Table.vue"),
                },
                {
                    path: "/notice/Category",
                    name: "/notice/Category",
                    component: () => import("@/views/notice/Category.vue"),
                },
                {
                    path: "/notice/Detail/:id",
                    name: "/notice/Detail",
                    component: () => import("@/views/notice/Detail.vue"),
                },
                //系统配置
                {
                    path: "/sys/Company",
                    name: "/sys/Company",
                    component: () => import("@/views/sys/Company.vue"),
                },
                {
                    path: "/sys/Post",
                    name: "/sys/Post",
                    component: () => import("@/views/sys/Post.vue"),
                },
                {
                    path: "/sys/Level",
                    name: "/sys/Level",
                    component: () => import("@/views/sys/Level.vue"),
                },
                {
                    path: "/sys/Role",
                    name: "/sys/Role",
                    component: () => import("@/views/sys/Role.vue"),
                },
                //账号管理
                {
                    path: "/user/List",
                    name: "/user/List",
                    component: () => import("@/views/user/List.vue"),
                },
            ],
        },
    ],
    //全局路由前置守卫,可进行校验操作
    beforeEach: (to, from, next) => {
        if (isLogin()) {
        } else {
            if (to.path != "/") {
                VXETable.modal.message({
                    content: "请重新登录",
                    status: "warning",
                });
                next("/?redirect=" + to.path); //记录下次跳转路径
                return;
            }
        }
        next();
        // window.$message.success("fdfd");
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
    },
};

export default routeConfig;
