<!--
 * @Author: Brightness
 * @Date: 2021-08-19 15:19:17
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-20 11:38:48
 * @Description:  
-->
<template>
    <div class="ztree">
        <n-tree
            block-line
            :data="treeData"
            :default-expand-all="true"
            selectable
            :on-update:selected-keys="treeSelecte"
        />
    </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
import { parseTreeData } from "@/utils/tools";
export default defineComponent({
    props: {
        //tree的数据
        data: {
            type: Array,
        },
        //数据的key字段
        keyField: {
            type: String,
            default: "key",
        },
        //数据的label字段,用于显示
        labelField: {
            type: String,
            default: "label",
        },
        topLabel: {
            type: String,
            default: "顶级",
        },
        topKey: {
            type: String,
            default: "0",
        },
    },
    setup(props, ctx) {
        /******** */
        /******响应式数据****** */
        let data = reactive({
            treeData: [],
        });
        /**************** */
        let methods = {
            //节点选择
            treeSelecte(keys) {
                ctx.emit("selecte", keys);
            },
            //组成数据
        };

        /******生命周期************ */
        //通过计算属性监听父组件数据变化
        data.treeData = computed(() => {
            let arr = parseTreeData(
                props.data,
                props.keyField,
                props.labelField
            );
            return [
                {
                    label: props.topLabel,
                    key: props.topKey,
                    children: arr,
                },
            ];
        });

        /********************** */

        return {
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>
