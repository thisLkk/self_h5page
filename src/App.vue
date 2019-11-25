<template>
    <div id="app">
        <div id="nav" v-show="!aniOption.isShow">
            <div class="nav-icon" @click="animationHdl()">
                <div class="n-icon-out"></div>
                <div class="n-icon-in"></div>
            </div>
            <!-- <div
                class="nav-item"
                v-for="(item, index) in navList"
                :key="index"
                @click="navGoHdl(item)"
            >
                <span>{{item.name}}</span>
            </div>-->
        </div>
        <animation v-if="aniOption.isShow" @aniCall="aniCallHdl()"></animation>
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
import animation from "@components/animation/animation.vue";
import { Toast } from 'mint-ui';
export default {
    name: "App",
    data() {
        return {
            ishow: false,
            // 动画配置
            aniOption: {
                isShow: false
            },
            navList: [
                {
                    name: "主页",
                    path: "/"
                }
            ]
        };
    },
    computed: {
        navs: function() {
            return this.menu;
        }
    },
    components: {
        animation
    },
    created() {
        Toast('提示信息');
    },
    mounted() {},
    methods: {
        // 首页路由跳转
        navGoHdl(data) {
            // this.$router.push({
            //     path: data.path
            // });
            let self = this;
        },
        // 展示个人动画
        animationHdl() {
            let self = this;
                self.aniOption.isShow = true;
        },
        // 关闭个人动画
        aniCallHdl() {
            this.aniOption.isShow = false;
        }
    }
};
</script>
<style lang="less">
@import "~@/assets/less/app.less";
#app {
    font-size: @fontSize28;
    height: 100%;
    #nav {
        position: fixed;
        top: 50%;
        right: 0.2rem;
        transform: translateY(-50%);
        z-index: 1; 
        .nav-icon {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.6rem;
            height: 0.6rem;
            .n-icon-in {
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                background: @fontPlaceholder;
                z-index: 2;
            }
            .n-icon-out {
                position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                background: @fontSecondary;
                animation: nIconOutAni 3s ease-out;
                animation-iteration-count: infinite;
            }
        }
    }
}

@keyframes nIconOutAni {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    25% {
        transform: scale(1.1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.3);
        opacity: 1;
    }
    75% {
        transform: scale(1.5);
        opacity: 0.9;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
