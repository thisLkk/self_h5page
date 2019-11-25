<template>
    <div class="mains">
        <div class="m-card" @touchend="touchEndHdl()" @touchstart="touchStartHdl()">
            <div
                class="m-card-item-box"
                v-for="(item, index) in cardOption"
                :class="item.animationClass"
                :key="index"
                :style="'z-index:' + item.boxIndex + ';'"
            >
                <div class="m-card-item" :class="item.bindTypeClass">
                  <div class="m-c-item-img">
                    <img :src="imgSrcHdl(item.listItem.imgsrc)">
                  </div>
                  <div class="m-c-item-details">
                      2019-11-22
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mains",
    data() {
        return {
            // 接口数据的集合
            dataOption: [
                {
                    id: '1',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/1.jpg'
                },
                {
                    id: '2',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/2.jpg'
                },
                {
                    id: '3',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/3.jpg'
                },
                {
                    id: '4',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/4.jpg'
                },
                {
                    id: '5',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/5.jpg'
                },
                {
                    id: '6',
                    title: '你知道么？',
                    details: '这是美好的一天',
                    time: '2019-11-22',
                    imgsrc: 'li/6.jpg'
                }
            ],
            // 处理后接口数据集合
            cardOption: [],
            // 动画的属性集合
            animationOption: {
                startX: 0, // 手指的初始坐标
                startY: 0,
                boxIndex: 10000, // 卡片的层级
                activeIndex: 0 // 当前呈现视口卡片索引
            }
        };
    },
    created() {
        // 处理接口数据，填充动画所需属性数据
        this.dataOption.forEach((item, index) => {
            let boxIndex = this.animationOption.boxIndex - 1;
            let bindTypeClass = "threeScale";
            if (index == 0) {
                bindTypeClass = "oneScale";
            } else if (index == 1) {
                bindTypeClass = "twoScale";
            }
            this.cardOption.push({
                animationClass: "", // （向上向下）方向
                listItem: item, // 接口数据
                bindTypeClass: bindTypeClass, // 三个不同状态的缩放
                boxIndex: boxIndex // 每个元素绑定层级
            });
            this.animationOption.boxIndex = boxIndex;
        });
    },
    methods: {
        imgSrcHdl(data) {
            return require('@assets/'+data);
        },
        // 手指开始时记录坐标
        touchStartHdl() {
            event.preventDefault();
            this.animationOption.startX = event.changedTouches[0].pageX;
            this.animationOption.startY = event.changedTouches[0].pageY;
        },
        // 手指离开时处理坐标
        touchEndHdl() {
            event.preventDefault();
            let moveEndX = event.changedTouches[0].pageX;
            let moveEndY = event.changedTouches[0].pageY;
            let X = moveEndX - this.animationOption.startX;
            let Y = moveEndY - this.animationOption.startY;
            if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                console.log("top 2 bottom");
                this.toDownHdl();
            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                console.log("bottom 2 top");
                console.log(this.cardOption)
                this.toUpHdl();

            } else {
                console.log("just touch");
            }
        },
        // 下滑方法
        toDownHdl() {
            let idx = this.animationOption.activeIndex;
            let len = this.cardOption.length;
            // 当前为第一张卡片
            if (idx === 0) {
                return;
            }
            // 显示第三层卡片
            if (len - idx >= 3) {
                this.$set(this.cardOption[idx + 2], "bindTypeClass", "threeScale");
            }
            if (len - idx == 1) {
                this.$set(this.cardOption[idx - 1], "animationClass", "downAnimation");
                this.$set(this.cardOption[idx], "bindTypeClass", "twoScale");
            } 
            else {
                this.$set(this.cardOption[idx - 1], "animationClass", "downAnimation");
                this.$set(this.cardOption[idx], "bindTypeClass", "twoScale");
                this.$set(this.cardOption[idx + 1], "bindTypeClass", "threeScale");
            }
            this.animationOption.activeIndex = idx - 1;
        },
        toUpHdl() {
            let idx = this.animationOption.activeIndex;
            let len = this.cardOption.length;
            if (idx + 1 == len) {
                return;
            }
            if (len - idx >= 4) {
                this.$set(this.cardOption[idx + 3], 'bindTypeClass', "threeScale");
            }
            if (len - idx == 2) {
                this.$set(this.cardOption[idx], "animationClass", "upAnimation");
                this.$set(this.cardOption[idx + 1], "bindTypeClass", "oneScale");
            } else {
                this.$set(this.cardOption[idx], "animationClass", "upAnimation");
                this.$set(this.cardOption[idx + 1], "bindTypeClass", "oneScale");
                this.$set(this.cardOption[idx + 2], "bindTypeClass", "twoScale");
            }
            this.animationOption.activeIndex = idx + 1;
        }
    }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>