<template>
    <view>

        <layout title="添加事项" v-if="dataDo > '2019-12-31'">
            <view>
                <input class='a-input' placeholder='描述' @input="addInput" :value='addContent'></input>
                <view style="display: flex;justify-content: space-between; border-bottom: 1px solid #eee;padding:5px 0;">
                    <picker style="display: flex;align-items: center;" mode="date" :value="dataDo" :end="dataEnd" @change="dateChange">
                        <view class="y-CenterCon">
                            <view>执行时间：</view>
                            <view class="a-link">{{dataDo}}</view>
                        </view>
                    </picker>
                    <view class='a-btn a-btn-mini a-btn-blue btn' @tap='add'>确定</view>
                </view>
            </view>
        </layout>

        <view>
            <headslot title="待办事项">
                <view class="y-CenterCon" style="font-size: 13px;">
                    <view class="y-CenterCon" style="margin: 0 3px;">
                        <view class="a-dot" style="background: #6495ED;"></view>
                        <view>待办:{{count}}</view>
                    </view>
                    <view class="y-CenterCon" style="margin: 0 3px;">
                        <view class="a-dot" style="background: #ACA4D5;"></view>
                        <view class="a-link" @tap="jump">已完成</view>
                    </view>
                </view>
            </headslot>
            <view style="margin-top: 10px;"></view>
            <layout v-for="(item,index) in todoList" :key="index">
                <view class='y-CenterCon unitTodo' style="justify-content: space-between;">
                    <view>
                        <view class="y-CenterCon" style="margin: 5px 0;">
                            <view class="a-dot" :style="{'background':item.color,'margin':'0 6px 0 3px'}"></view>
                            <view>{{item.event_content}}</view>
                        </view>
                        <view class="y-CenterCon">
                            <view style="margin: 3px;">{{item.todo_time}}</view>
                            <view style="margin-left: 10px;">{{item.diff}}天</view>
                        </view>
                    </view>
                    <view class="y-CenterCon">
                        <i class='iconfont icon-banner setStatus' @tap='setStatus' :data-id="item.id" :data-index="index"></i>
                        <i class='iconfont icon-x setStatus' @tap='deleteUnit' :data-id="item.id" :data-index="index"></i>
                    </view>
                </view>
            </layout>
            <layout v-if="tips">
                <view class="y-CenterCon">
                    <view class="a-dot" style="background: #EEEEEE;margin-right: 6px;"></view>
                    <view>{{tips}}</view>
                </view>
            </layout>
        </view>

    </view>
</template>

<script>
    const app = getApp()
    const md5 = require('@/utils/md5.js');
    const util = require('@/utils/util.js');
    const pubFct = require('@/vector/pubFct.js');
    import headslot from "@/components/headslot.vue"
    export default {
        components: {
            headslot
        },
        data() {
            return {
                addContent: "",
                dataDo: util.formatDate(), //默认起始时间  
                dataEnd: util.formatDate(), //默认结束时间 
                todoList: [],
                clickFlag: 1,
                tips: "",
                count: 0
            }
        },
        onLoad: async function(options) {
            var endTime = new Date();
            endTime.addDate(1);
            this.dataEnd = util.formatDate("yyyy-MM-dd", endTime);
            uni.setStorageSync('event', '');
            if (app.globalData.openid === "") {
                this.tips = "未正常获取用户信息"
            } else {
                var res = await app.request({
                    load: 2,
                    url: app.globalData.url + "todo/getEvent",
                })
                if (res.data.data) {
                    if (res.data.data.length === 0) {
                        this.tips = "暂没有待办事项"
                        return;
                    }
                    var curData = util.formatDate();
                    res.data.data.map(function(value) {
                        var diff_color = pubFct.todoDateDiff(curData, value.todo_time, value.event_content);
                        value.diff = diff_color[0];
                        value.color = diff_color[1];
                        return value;
                    })
                    console.log(res.data.data);
                    this.todoList = res.data.data
                    this.count = res.data.data.length
                }
            }
        },
        methods: {
            addInput: function(e) {
                this.addContent = e.detail.value;
            },
            dateChange: function(e) {
                this.dataDo = e.detail.value

            },
            add: async function() {
                if (this.addContent === "") {
                    app.toast("事件内容不能为空");
                    return;
                }
                if (this.clickFlag === 0) return false;
                this.clickFlag = 0;
                try{
                    var res = await app.request({
                        url: app.globalData.url + "todo/addEvent",
                        method: "POST",
                        data: {
                            content: this.addContent,
                            date: this.dataDo
                        }
                    })
                    if (res.data.Message === "Yes") {
                        app.toast("添加成功");
                        var todoArr = this.todoList;
                        var curData = util.formatDate();
                        var diff_color = pubFct.todoDateDiff(curData, this.dataDo, this.addContent);
                        todoArr.push({
                            event_content: this.addContent,
                            todo_time: this.dataDo,
                            diff: diff_color[0],
                            color: diff_color[1],
                            id : res.data.id
                        });
                        this.addContent = ""
                        this.todoList = todoArr
                        this.tips = ""
                        this.count = this.count + 1
                    } else {
                        app.toast("Error");
                    }
                }catch(e){
                    app.toast("Internal Error");
                }
                this.clickFlag = 1;
            },
            setStatus: async function(e) {
                var [err,choice] = await uni.showModal({
                    title: '提示',
                    content: '确定标记为已完成吗',
                })
                if (choice.confirm) {
                    var index = e.currentTarget.dataset.index;
                    var id = e.currentTarget.dataset.id;
                    var res = await app.request({
                        url: app.globalData.url + "todo/setStatus",
                        method: "POST",
                        data: {
                            id: id
                        },
                    })
                    app.toast("标记成功");
                    this.todoList.splice(index, 1);
                    this.todoList = this.todoList
                    this.tips = this.todoList.length === 0 ? "暂没有待办事项" : ""
                    this.count = this.count - 1
                }
            },
            deleteUnit: async function(e) {
                var [err,choice] = await uni.showModal({
                    title: '提示',
                    content: '确定删除吗',
                })
                if (choice.confirm) {
                    var index = e.currentTarget.dataset.index;
                    var id = e.currentTarget.dataset.id;
                    var res = await app.request({
                        url: app.globalData.url + "todo/deleteUnit",
                        method: "POST",
                        data: {
                            id: id
                        },
                    })
                    app.toast("删除成功");
                    this.todoList.splice(index, 1);
                    this.todoList = this.todoList
                    this.tips = this.todoList.length === 0 ? "暂没有待办事项" : ""
                    this.count = this.count - 1
                }
            },
            jump: function() {
                uni.navigateTo({
                    url: "finEvent"
                })
            }
        }
    }
</script>

<style>
    .a-input {
        margin: 0;
        margin-top: 10px;
        padding: 0 5px;
        border-bottom: 1px solid #eee;
    }

    .a-dot {
        margin: 0 3px;
    }

    .unitTable,
    .unitTodo {
        color: #555555;
    }

    .setStatus {
        color: #555555;
        border: 1px solid #EEEEEE;
        padding: 7px;
        border-radius: 20px;
        margin: 0 3px;
    }

    .btn {
        padding: 0 6px;
        border-radius: 1px;
    }
</style>
