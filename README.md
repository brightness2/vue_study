<!--
 * @Author: Brightness
 * @Date: 2021-04-25 18:58:50
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-27 16:08:34
 * @Description:vue相关
-->

## 基础知识列表

1、 Vue.createApp() 创建 vue 对象

2、常用组件属性
data,template,methods,components,computed,watch,mixins,props,provide,inject

3、常用生命周期
created,beforeMount,mounted,beforeUpdate,updated

4、常用指令
v-bind(:),v-on(@),v-if,v-for,v-show,v-html,v-model

5、事件修饰符
stop,prevent,capture,self,once,passive;

6、按键，鼠标事件修饰符

enter 、tab、delete、esc、up 、down、left、right;如：@keydown.enter
left、right、middle;如：@click.right

## 组件 知识点列表

1、Vue.component()全局组件,components 属性注册局部组件

2、父子组件的传值与数值校验

3、父子组件通信,子组件,props 属性接收父组件数据,子组件定义通过$emit 事件调用 触发父组件方法传递数据

4、Non-props 使用

5、了解组件存在单项数据流限制，需要通过事件调用,修改父级数据

6、slot 插槽的使用，组件中可以存在多个插槽，并可以通过 slot 的 prop 属性向父组件传递多个参数

7、动态组件,通过 <component :is='xxx'> 实现, <keep-alive>进行状态保持,
常用组合  
 <keep-alive><component :is='temp' /> </keep-alive>

8、异步组件
app.component('async-component',Vue.defineAsyncComponent(()=>{})) 注册全局异步组件;
组件中,components 注册局部异步组件,如
components: {
'my-component': () => import('./my-async-component'),//局部注册异步组件
}

9、数据在多级组件中传递
父组件 provide 定义数据,子组件 inject 接收数据,当然可以定义多个数据和接收多个数据

## 动画与过渡

# 动画和过渡的区别

动画：一个 DOM 元素，从一个地方移到另一个地方，这种效果叫做动画。比如一个层从浏览器的左侧移动到右侧，这就是动画。
过渡：是 DOM 元素中的一个属性，缓慢的变成另一个属性，这种效果叫做过渡效果。比如一个层从红色慢慢变成黄色，这种就是过渡。

# 知识列表

1、过渡 class

在进入/离开的过渡中，会有 6 个 class 切换。

    v-enter-from(enter-from-class 属性)：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

    v-enter-active(enter-active-class 属性)：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

    v-enter-to(enter-to-class 属性)：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

    v-leave-from(leave-from-class 属性)：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

    v-leave-active(leave-active-class 属性)：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

    v-leave-to(leave-to-class 属性)：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡/动画完成之后移除。

2、可以使用 css 动画库 如 animate.css
如:
<transition 
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight">

        <div v-if="show">transition 标签使用</div>

</transition>

注意设置 transition 的 :duration 属性统一 动画和过渡的时间

3、可以使用 js 控制动画
<transition
@before-enter="beforeEnter"
@enter="enter"
@after-enter="afterEnter"
@enter-cancelled="enterCancelled"
@before-leave="beforeLeave"
@leave="leave"
@after-leave="afterLeave"
@leave-cancelled="leaveCancelled"
:css="false"

> </transition>
> methods定义对应的方法

4、model 属性,解决多个 dom 动画同时进行的问题
<transition mode="out-in"></transition>
