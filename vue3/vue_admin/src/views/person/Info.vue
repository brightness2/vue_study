<!--
 * @Author: Brightness
 * @Date: 2021-08-10 10:02:34
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-30 11:21:16
 * @Description:  
-->
<template>
    <div class="info">
        <page-title title="个人信息" />
        <div class="image-box">
            <div class="image">
                <img
                    v-if="info.avatar"
                    :src="'/api/runtime/storage/' + info.avatar"
                    alt=""
                />
                <span v-else>{{ info.name }}</span>
            </div>
            <upload
                action="account/changeAvatar"
                accept=".png,.jpg"
                @finish="uploadFinish"
            >
                <span class="title">更改头像</span>
            </upload>
        </div>
        <div class="msg-box">
            <div class="title">在职信息</div>
            <div class="form-box">
                <div class="item">
                    <label>姓名：</label>
                    <span>{{ info.name }}</span>
                </div>
                <div class="item">
                    <label>部门：</label>
                    <span>{{ info.dept }}</span>
                </div>
                <div class="item">
                    <label>职位：</label>
                    <span>{{ info.position && info.position.post_name }}</span>
                </div>
                <div class="item">
                    <label>在职类型：</label>
                    <span></span>
                </div>
                <div class="item">
                    <label>入职日期：</label>
                    <span></span>
                </div>
                <div class="item">
                    <label>手机号：</label>
                    <span>{{ info.phone }}</span>
                </div>
            </div>
        </div>
        <div class="msg-box">
            <div class="title">个人信息</div>
            <div class="form-box">
                <div class="item">
                    <label>生日：</label>
                    <span></span>
                </div>
                <div class="item">
                    <label>民族：</label>
                    <span></span>
                </div>
                <div class="item">
                    <label>政治面貌：</label>
                    <span></span>
                </div>
                <div class="item">
                    <label>家庭住址：</label>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import Upload from "@/components/Upload.vue";
import { apiRequest } from "../../utils/api";
export default defineComponent({
    components: {
        PageTitle,
        Upload,
    },
    setup() {
        /************************ */
        // let refs = reactive({});
        /**********非响应式数据************** */
        /***********响应式数据************* */
        let data = reactive({
            info: {
                position: null,
            },
        });
        /********************* */
        let methods = {
            //加载数据
            loadInfo() {
                data.job = {
                    name: "Brightness",
                    dept: "开发部",
                    post: "搬砖工",
                    type: "正式员工",
                    entryDate: "2019-04-08",
                    email: "Brightness@qq.com",
                };
                data.info = {
                    birthday: "1994-06-04",
                    nation: "汉族",
                    political: "群众",
                    address: "浦东新区600弄",
                    qq: "13231231231",
                };
                apiRequest("Account/getAccount").then((res) => {
                    if (res) {
                        data.info = res.data;
                    }
                });
            },
            uploadFinish() {
                methods.loadInfo();
            },
        };
        /***************生命周期**************** */
        methods.loadInfo();
        /**************************** */
        let refData = toRefs(data);
        return {
            // ...refs,
            ...refData,
            ...methods,
        };
    },
});
</script>

<style lang="less" scoped>
.info {
    .image-box {
        .image {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 160px;
            height: 160px;
            margin: 10px auto;
            border-radius: 100%;
            background-color: var(--blue-color);
            span {
                font-size: 16px;
                color: #fff;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            font-size: 16px;
            color: var(--blue-color);
            &:hover {
                cursor: pointer;
            }
        }
    }

    .msg-box {
        width: 60%;
        padding: 20px;
        margin: 0 auto;
        border-bottom: 1px solid var(--border-color);
        .title {
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: var(--blue-color);
        }
        .form-box {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 20px;
            font-size: 16px;
            .item {
                width: 260px;
                margin: 10px 20px;
                label {
                    font-weight: bold;
                    color: var(--desc-color);
                }
            }
        }
    }
}
</style>
