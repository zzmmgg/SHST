"use strict";
var WxParse = require('../../../vector/wxParse/wxParse.js');
var html = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr class=\"\"><td class=\"weekCount \">周次</td><td ><div class=\"pastDate    \">一</div></td><td ><div class=\"pastDate    \">二</div></td><td ><div class=\"pastDate    \">三</div></td><td ><div class=\"pastDate    \">四</div></td><td ><div class=\"pastDate    \">五</div></td><td ><div class=\"pastDate   vocation \">六</div></td><td ><div class=\"pastDate   vocation \">日</div></td><td rowspan='2' class=\"month\">月</td></tr><tr class=\"\"><td class=\"weekCount \"></td><td class=\"m2  \"><div class=\"pastDate    \">4</div></td><td class=\"m2  \"><div class=\"pastDate    \">5</div></td><td class=\"m2  \"><div class=\"pastDate    \">6</div></td><td class=\"m2  \"><div class=\"pastDate    \">7</div></td><td class=\"m2  \"><div class=\"pastDate    \">8</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">9</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">10</div></td><td rowspan='2' class=\"month\">二月</td></tr><tr class=\"\"><td class=\"weekCount \"></td><td class=\"m2  \"><div class=\"pastDate    \">11</div></td><td class=\"m2  \"><div class=\"pastDate    \">12</div></td><td class=\"m2  \"><div class=\"pastDate    \">13</div></td><td class=\"m2  \"><div class=\"pastDate    \">14</div></td><td class=\"m2  \"><div class=\"pastDate    \">15</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">16</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">17</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \"></td><td class=\"m2  \"><div class=\"pastDate    \">18</div></td><td class=\"m2  \"><div class=\"pastDate    \">19</div></td><td class=\"m2  \"><div class=\"pastDate    \">20</div></td><td class=\"m2  \"><div class=\"pastDate    \">21</div></td><td class=\"m2  \"><div class=\"pastDate    \">22</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">23</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">24</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">1</td><td class=\"m2  \"><div class=\"pastDate    \">25</div></td><td class=\"m2  \"><div class=\"pastDate    \">26</div></td><td class=\"m2  \"><div class=\"pastDate    \">27</div></td><td class=\"m2  \"><div class=\"pastDate    \">28</div></td><td class=\"m1  \"><div class=\"pastDate firstDay   \">1/<strong>3</strong></div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">2</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">3</div></td><td rowspan='2' class=\"month\">三月</td></tr><tr class=\"\"><td class=\"weekCount \">2</td><td class=\"m1  \"><div class=\"pastDate    \">4</div></td><td class=\"m1  \"><div class=\"pastDate    \">5</div></td><td class=\"m1  \"><div class=\"pastDate    \">6</div></td><td class=\"m1  \"><div class=\"pastDate    \">7</div></td><td class=\"m1  \"><div class=\"pastDate    \">8</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">9</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">10</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">3</td><td class=\"m1  \"><div class=\"pastDate    \">11</div></td><td class=\"m1  \"><div class=\"pastDate    \">12</div></td><td class=\"m1  \"><div class=\"pastDate    \">13</div></td><td class=\"m1  \"><div class=\"pastDate    \">14</div></td><td class=\"m1  \"><div class=\"pastDate    \">15</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">16</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">17</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">4</td><td class=\"m1  \"><div class=\"pastDate    \">18</div></td><td class=\"m1  \"><div class=\"pastDate    \">19</div></td><td class=\"m1  \"><div class=\"pastDate    \">20</div></td><td class=\"m1  \"><div class=\"pastDate    \">21</div></td><td class=\"m1  \"><div class=\"pastDate    \">22</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">23</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">24</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">5</td><td class=\"m1  \"><div class=\"pastDate    \">25</div></td><td class=\"m1  \"><div class=\"pastDate    \">26</div></td><td class=\"m1  \"><div class=\"pastDate    \">27</div></td><td class=\"m1  \"><div class=\"pastDate    \">28</div></td><td class=\"m1  \"><div class=\"pastDate    \">29</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">30</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">31</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">6</td><td class=\"m2  \"><div class=\"pastDate firstDay   \">1/<strong>4</strong></div></td><td class=\"m2  \"><div class=\"pastDate    \">2</div></td><td class=\"m2  \"><div class=\"pastDate    \">3</div></td><td class=\"m2  \"><div class=\"pastDate    \">4</div></td><td class=\"m2  \"><div class=\"pastDate    \">5</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">6</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">7</div></td><td rowspan='2' class=\"month\">四月</td></tr><tr class=\"\"><td class=\"weekCount \">7</td><td class=\"m2  \"><div class=\"pastDate    \">8</div></td><td class=\"m2  \"><div class=\"pastDate    \">9</div></td><td class=\"m2  \"><div class=\"pastDate    \">10</div></td><td class=\"m2  \"><div class=\"pastDate    \">11</div></td><td class=\"m2  \"><div class=\"pastDate    \">12</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">13</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">14</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">8</td><td class=\"m2  \"><div class=\"pastDate    \">15</div></td><td class=\"m2  \"><div class=\"pastDate    \">16</div></td><td class=\"m2  \"><div class=\"pastDate    \">17</div></td><td class=\"m2  \"><div class=\"pastDate    \">18</div></td><td class=\"m2  \"><div class=\"pastDate    \">19</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">20</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">21</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">9</td><td class=\"m2  \"><div class=\"pastDate    \">22</div></td><td class=\"m2  \"><div class=\"pastDate    \">23</div></td><td class=\"m2  \"><div class=\"pastDate    \">24</div></td><td class=\"m2  \"><div class=\"pastDate    \">25</div></td><td class=\"m2  \"><div class=\"pastDate    \">26</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">27</div></td><td class=\"m2  \"><div class=\"pastDate   vocation \">28</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">10</td><td class=\"m2  \"><div class=\"pastDate    \">29</div></td><td class=\"m2  \"><div class=\"pastDate    \">30</div></td><td class=\"m1  \"><div class=\"pastDate firstDay   \">1/<strong>5</strong></div></td><td class=\"m1  \"><div class=\"pastDate    \">2</div></td><td class=\"m1  \"><div class=\"pastDate    \">3</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">4</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">5</div></td><td rowspan='2' class=\"month\">五月</td></tr><tr class=\"\"><td class=\"weekCount \">11</td><td class=\"m1  \"><div class=\"pastDate    \">6</div></td><td class=\"m1  \"><div class=\"pastDate    \">7</div></td><td class=\"m1  \"><div class=\"pastDate    \">8</div></td><td class=\"m1  \"><div class=\"pastDate    \">9</div></td><td class=\"m1  \"><div class=\"pastDate    \">10</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">11</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">12</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">12</td><td class=\"m1  \"><div class=\"pastDate    \">13</div></td><td class=\"m1  \"><div class=\"pastDate    \">14</div></td><td class=\"m1  \"><div class=\"pastDate    \">15</div></td><td class=\"m1  \"><div class=\"pastDate    \">16</div></td><td class=\"m1  \"><div class=\"pastDate    \">17</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">18</div></td><td class=\"m1  \"><div class=\"pastDate   vocation \">19</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount weekCurrent\">13</td><td class=\"m1 dayCurrentWeek \"><div class=\"pastDate    \">20</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"pastDate    \">21</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"pastDate    \">22</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"pastDate    \">23</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"pastDate    \">24</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"  today vocation \">25</div></td><td class=\"m1 dayCurrentWeek \"><div class=\"   vocation \">26</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">14</td><td class=\"m1  \"><div class=\"    \">27</div></td><td class=\"m1  \"><div class=\"    \">28</div></td><td class=\"m1  \"><div class=\"    \">29</div></td><td class=\"m1  \"><div class=\"    \">30</div></td><td class=\"m1  \"><div class=\"    \">31</div></td><td class=\"m2  \"><div class=\" firstDay  vocation \">1/<strong>6</strong></div></td><td class=\"m2  \"><div class=\"   vocation \">2</div></td><td rowspan='2' class=\"month\">六月</td></tr><tr class=\"\"><td class=\"weekCount \">15</td><td class=\"m2  \"><div class=\"    \">3</div></td><td class=\"m2  \"><div class=\"    \">4</div></td><td class=\"m2  \"><div class=\"    \">5</div></td><td class=\"m2  \"><div class=\"    \">6</div></td><td class=\"m2  \"><div class=\"    \">7</div></td><td class=\"m2  \"><div class=\"   vocation \">8</div></td><td class=\"m2  \"><div class=\"   vocation \">9</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">16</td><td class=\"m2  \"><div class=\"    \">10</div></td><td class=\"m2  \"><div class=\"    \">11</div></td><td class=\"m2  \"><div class=\"    \">12</div></td><td class=\"m2  \"><div class=\"    \">13</div></td><td class=\"m2  \"><div class=\"    \">14</div></td><td class=\"m2  \"><div class=\"   vocation \">15</div></td><td class=\"m2  \"><div class=\"   vocation \">16</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">17</td><td class=\"m2  \"><div class=\"    \">17</div></td><td class=\"m2  \"><div class=\"    \">18</div></td><td class=\"m2  \"><div class=\"    \">19</div></td><td class=\"m2  \"><div class=\"    \">20</div></td><td class=\"m2  \"><div class=\"    \">21</div></td><td class=\"m2  \"><div class=\"   vocation \">22</div></td><td class=\"m2  \"><div class=\"   vocation \">23</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">18</td><td class=\"m2  \"><div class=\"    \">24</div></td><td class=\"m2  \"><div class=\"    \">25</div></td><td class=\"m2  \"><div class=\"    \">26</div></td><td class=\"m2  \"><div class=\"    \">27</div></td><td class=\"m2  \"><div class=\"    \">28</div></td><td class=\"m2  \"><div class=\"   vocation \">29</div></td><td class=\"m2  \"><div class=\"   vocation \">30</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">19</td><td class=\"m1  \"><div class=\" firstDay   \">1/<strong>7</strong></div></td><td class=\"m1  \"><div class=\"    \">2</div></td><td class=\"m1  \"><div class=\"    \">3</div></td><td class=\"m1  \"><div class=\"    \">4</div></td><td class=\"m1  \"><div class=\"    \">5</div></td><td class=\"m1  \"><div class=\"   vocation \">6</div></td><td class=\"m1  \"><div class=\"   vocation \">7</div></td><td rowspan='2' class=\"month\">七月</td></tr><tr class=\"\"><td class=\"weekCount \">20</td><td class=\"m1  \"><div class=\"    \">8</div></td><td class=\"m1  \"><div class=\"    \">9</div></td><td class=\"m1  \"><div class=\"    \">10</div></td><td class=\"m1  \"><div class=\"    \">11</div></td><td class=\"m1  \"><div class=\"    \">12</div></td><td class=\"m1  \"><div class=\"   vocation \">13</div></td><td class=\"m1  \"><div class=\"   vocation \">14</div></td><td></td></tr><tr class=\"\"><td class=\"weekCount \">21</td><td class=\"m1  \"><div class=\"    \">15</div></td><td class=\"m1  \"><div class=\"    \">16</div></td><td class=\"m1  \"><div class=\"    \">17</div></td><td class=\"m1  \"><div class=\"    \">18</div></td><td class=\"m1  \"><div class=\"    \">19</div></td><td class=\"m1  \"><div class=\"   vocation \">20</div></td><td class=\"m1  \"><div class=\"   vocation \">21</div></td><td></td></tr><tr class=\"vocation\"><td class=\"weekCount \">暑1</td><td class=\"m1  \"><div class=\"   vocation \">22</div></td><td class=\"m1  \"><div class=\"   vocation \">23</div></td><td class=\"m1  \"><div class=\"   vocation \">24</div></td><td class=\"m1  \"><div class=\"   vocation \">25</div></td><td class=\"m1  \"><div class=\"   vocation \">26</div></td><td class=\"m1  \"><div class=\"   vocation \">27</div></td><td class=\"m1  \"><div class=\"   vocation \">28</div></td><td></td></tr><tr class=\"vocation\"><td class=\"weekCount \">暑2</td><td class=\"m1  \"><div class=\"   vocation \">29</div></td><td class=\"m1  \"><div class=\"   vocation \">30</div></td><td class=\"m1  \"><div class=\"   vocation \">31</div></td><td class=\"m2  \"><div class=\" firstDay  vocation \">1/<strong>8</strong></div></td><td class=\"m2  \"><div class=\"   vocation \">2</div></td><td class=\"m2  \"><div class=\"   vocation \">3</div></td><td class=\"m2  \"><div class=\"   vocation \">4</div></td><td rowspan='2' class=\"month\">八月</td></tr><tr class=\"vocation\"><td class=\"weekCount \">暑3</td><td class=\"m2  \"><div class=\"   vocation \">5</div></td><td class=\"m2  \"><div class=\"   vocation \">6</div></td><td class=\"m2  \"><div class=\"   vocation \">7</div></td><td class=\"m2  \"><div class=\"   vocation \">8</div></td><td class=\"m2  \"><div class=\"   vocation \">9</div></td><td class=\"m2  \"><div class=\"   vocation \">10</div></td><td class=\"m2  \"><div class=\"   vocation \">11</div></td><td></td></tr><tr class=\"vocation\"><td class=\"weekCount \">暑4</td><td class=\"m2  \"><div class=\"   vocation \">12</div></td><td class=\"m2  \"><div class=\"   vocation \">13</div></td><td class=\"m2  \"><div class=\"   vocation \">14</div></td><td class=\"m2  \"><div class=\"   vocation \">15</div></td><td class=\"m2  \"><div class=\"   vocation \">16</div></td><td class=\"m2  \"><div class=\"   vocation \">17</div></td><td class=\"m2  \"><div class=\"   vocation \">18</div></td><td></td></tr><tr class=\"vocation\"><td class=\"weekCount \">暑5</td><td class=\"m2  \"><div class=\"   vocation \">19</div></td><td class=\"m2  \"><div class=\"   vocation \">20</div></td><td class=\"m2  \"><div class=\"   vocation \">21</div></td><td class=\"m2  \"><div class=\"   vocation \">22</div></td><td class=\"m2  \"><div class=\"   vocation \">23</div></td><td class=\"m2  \"><div class=\"   vocation \">24</div></td><td class=\"m2  \"><div class=\"   vocation \">25</div></td><td></td></tr></table>";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    WxParse.wxParse('calendar', 'html', html, this);
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})