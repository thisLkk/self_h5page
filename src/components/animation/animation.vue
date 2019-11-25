<template>
    <div class="animation" :style="pageStyle">
        <div class="ani" @touchmove="touchmove()" @touchstart="touchstart()" @touchend="touchend()">
            <div class="ani-box">
                <div
                    class="ani-inner"
                    :id="isShowAni ? 'ani' : ''"
                    :style=" isShowMv ? aniStyle : ''"
                >
                    <div v-for="(item, index) in 6" :key="index"></div>
                </div>
            </div>
        </div>
        <div class="ani-btn" v-show="!isShowMv">
            <div class="a-btn-tips">滑动试试</div>
            <div @click="closeHdl()">
                <span class="el-icon-circle-close"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "animation",
    data() {
        return {
            isShowAni: false, // 增加id做动画
            isShowMv: false, // 手指按下时才可以旋转
            startX: 0, // 手指初始位置
            startY: 0,
            mvstartX: 0, // 手指移动的位置
            mvstartY: 0,
            pageAniOption: {
                left: 10,
                scale: 0
            }
        };
    },
    computed: {
        pageStyle() {
            let styles = `transform: scale(${this.pageAniOption.scale}); left: ${this.pageAniOption.left}rem;`;
            return styles;
        },
        aniStyle() {
            let style = `transform: rotateX(${this.mvstartX}deg) rotateY(${this.mvstartY}deg);`;
            return style;
        }
    },
    created() {
        const self = this;
        setTimeout(function() {
            self.pageAniOption.left = 0;
            self.pageAniOption.scale = 1;
        }, 0);
        setTimeout(function() {
            self.isShowAni = true;
        }, 500);
    },
    methods: {
        closeHdl() {
            this.pageAniOption.left = 10;
            this.pageAniOption.scale = 0;
            let self = this;
            setTimeout(function() {
                self.$emit("aniCall");
            }, 600);
        },
        touchstart() {
            event.preventDefault();
            this.startX = event.changedTouches[0].pageX;
            this.startY = event.changedTouches[0].pageY;
            this.isShowMv = true;
        },
        touchend() {
            this.isShowMv = false;
        },
        touchmove() {
            event.preventDefault();
            var moveEndX = event.changedTouches[0].pageX;
            var moveEndY = event.changedTouches[0].pageY;
            var X = (this.mvstartX = moveEndX - this.startX);
            var Y = (this.mvstartY = moveEndY - this.startY);
            if (Math.abs(X) > Math.abs(Y) && X > 0) {
                console.log("left 2 right");
            } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                console.log("right 2 left");
            } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                console.log("top 2 bottom");
            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                console.log("bottom 2 top");
            } else {
                console.log("just touch");
            }
        }
    }
};
</script>

<style scoped lang="less">
@import "./animation.less";
</style>
