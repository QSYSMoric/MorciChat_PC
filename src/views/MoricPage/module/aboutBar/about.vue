<template>
    <div class="aboutContainer">
        <div class="aboutDescribe">
          <h1>
            1、简介
          </h1>
          <div class="aboutIntroduce">
            <p> 
              本项目采用的框架与库：Vue3、Socket.io、Node.js、Redis、Express、axios、animate.css、dayjs、pinia、pubsub、B端布局
            </p>
            <p>本人也不是ui设计师虽然很想做好看点，但是做着做着就丑了，本项目从0到1都是一个人开发</p>
            <p>
              本项目所设计的涉及模式：策略模式、单例模式、观察者模式、发布订阅模式、中介者模式，
              本着学习与熟悉和提高对代码的熟练度，虽说并不是说我精通软件设计模式但是也是希望降低
              模块与模块之间的耦合提高效率与代码规范，但是与实际工作相比仍然有不小的差距
            </p>
            <p>
              杂谈：1、自定义函数式组件，你也发现了哪个提示组件便是，还有很多噢<br>
              2、大量使用Class特性，规范各种接口让前端与后端交互的更加简单与便捷<br>
              3、关于组件，那是能复用就复用，考虑到了通用性，我也开始建立自己的组件库<br>
              4、这个项目让我的代码操作变得好熟练
              5、使用grid+flex布局，本来打算做适应移动端的但是后面发现无法适配了，后面再做吧
            </p>
          </div>
        </div>
        <div class="aboutDescribe">
          <h1>
            2、关于作者
          </h1>
          <div class="aboutIntroduce">
            <p>
              那么各位，欢迎来到鄙人的寒舍，本人只是一名平平无奇的在校大四且悲催的学生党
            </p>
            <p>
              个人简介：本人自高三在校和对未来的憧憬选择了程序员这一门行业，出于对代码的热爱
              在高三暑假便完成了对c语言的自学并且在c语言这一门课中取得了98（也不知道厉不厉害）反正毕业设计
              导师倒是给了我很高的评价，推荐我去参加他所领导的算法比赛，然后，就。。。一轮游什么都没有
              大一下便去接触了web，在很早的时候就知道有这个方向，嗯！！很不错嘛，于是一股脑扎进去这个行业了
              在大二的时候，便能够熟练的掌握静态页面的搭建，并且开始自学JavaScript    
            </p>
            <p>
              前端之旅：那么开始，我的web作业被老师单独搜走，并且留下一句，页面很不错嘛，哼哼！那可是太好了
              后来就完了半学期，大二暑假我便开始系统性学习JavaScript以及css高级特性，我是自认为自己的JavaScript还不错
              很容易理解其中的意思，可能是之前的编程思维所致，大三便确定从一众的java之中跳出来走一条不被看好的web前端之路
              始于热爱》》
            </p>
            <p>
              关于我所阅读过的书籍有：《JavaScript高级程序设计》、《CSS权威指南》（1140页的书真的厚）、《你不知道的JavaScript系列》、《JavaScript设计模式》、
              《深入解析CSS》
            </p>
            <p>
              本人乐于阅读书籍，其他所读过的有：《大问题：简明哲学导论》、《上帝笑了99次》、《忏悔录》、《亲密关系》。
              我倒是挺喜欢阅读这些满足自己好奇心的书籍来着
            </p>
            <p>
              之后的事：一开始倒是想去补充typescript但是我看到一篇技术文档，说去ts化，至于为何因为前端作为数据的显示载体
              动态语言就应该包容类型数据不匹配的问题，为什么反而要去严格限制数据类型呢，作为客户端就应该去掩盖后端的数据错误
              让客户端更稳定。跑题了，后面我特别看好webgl技术因为随着科技与技术的迭代，浏览器可以做更多的事情
              比如基于webgl的游戏，既然前端可以做3d建模那么未来模型的设计便会更加精细，web游戏就着比普通游戏相比
              更小的安装体积，有着无比的优势，当然这是预期。我将着重关注数据可视化与webgl的结合，着力于前端赛道梦想成为一名
              高级前端工程师，手撸框架嘎嘎猛
            </p>
            <p>
              有兴趣联系我的邮箱：16623352718@163.com
            </p>
          </div>
        </div>
        <div class="aboutDescribe">
          <h1>
            3、关于项目
          </h1>
          <div class="aboutIntroduce">
            <p>
              个人观点：一开始规划没想到会这么难，我开发了3个月。本以为会很简单，没想到搞了这么久
              错过了秋招的第一轮，这个项目很简单，功能只是将基础的功能搞定，包含文章的发布与评论
              好友的添加与显示，可拓展性很高，后面再补算了
            </p>
            <p>
              找工作：哥哥们别太离谱了，招个实习生要两年开发经验，你这是招黑奴呢？还有，别问我八股文了
              这样怎么能才能招到真正有开发能力的呢？昂昂昂，是是是，块级作用域，闭包，匿名函数，浏览器是
              一个程序进程，它是多线程的app，主线程有个循环，每次从js消息队列拿一个任务，异步就是等待，交给
              别的线程去等，等到了然后进入任务队列根据预先传入的函数处理数据，还有，月薪3000大哥我不求你给我多高
              的工资让我能活下去行不行，房租一个月1600，吃饭1500还有电费、话费、网费。你这不是招牛马么
            </p>
          </div>
        </div>
    </div>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import PubSub from 'pubsub-js';

  PubSub.publish(`aboutBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`aboutBaroff`)
  });
</script>
<style>
  .aboutContainer{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f8f8f8;
    border-radius: 12px;
  }
  .aboutDescribe{
    padding: 20px;
  }
  .aboutDescribe h1{
      font-size: 32px;
      line-height: 1.1em;
      font-size: 600;
  }
  .aboutIntroduce{
    margin-top: 30px;
  }
  .aboutIntroduce p{
    line-height: 1.5em;
    text-indent: 2em;
    font-size: 21px;
    word-spacing: 3px;
  }
  .aboutIntroduce p + p{
    margin-top: 10px;
  }
  .code{
    font-size: 21px;
  }
</style>