<template>
    <div class="container">

    <h1>系统说明</h1>
    <div class="space"></div>
    <div class="about">
      <p>oTree是一个基于Python的开源平台，专为进行在线心理学行为研究、经济学实验、多人游戏、拍卖市场、策略游戏、动态问卷或调查、评估和测试等交互式任务而设计。它提供了一套强大的工具和框架，使研究人员能够轻松创建和管理各种实验。</p>
      <p>行为科学试验管理平台与oTree连接，您可以方便地在oTree创建和管理实验。本平台提供了直观的界面和功能，使您能够轻松设置实验的参数、设计实验的流程，并进行实验的监控和管理。除此之外，您可以使用我们的平台上传和运行您的Python源代码，从而灵活地进行实验设置和控制。</p>
      <p>平台将帮助您更好地进行在线实验，简化实验的创建和管理流程，并提供一系列工具和功能，以支持您的研究工作，并促进实验的顺利进行和有效管理。</p>
    </div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="space1"></div>
    <h1>帮助文档</h1>
    <div class="space3"></div>
    <a href="https://ie.pubpub.org/pub/otree/release/1" target="_blank" class="otree-link">oTreehub教程：     https://ie.pubpub.org/pub/otree/release/1</a>
    <a href="https://otree.readthedocs.io/zh_CN/latest/studio.html" target="_blank" class="otree-link">oTree教程：            https://otree.readthedocs.io/zh_CN/latest/studio.html</a>
    <a href="https://gyqzqxruol.feishu.cn/docx/AmrJdScDpoDKAuxunNOcq7WFnWf?from=from_copylink" target="_blank" class="otree-link">管理平台教程：     https://gyqzqxruol.feishu.cn/docx/AmrJdScDpoDKAuxunNOcq7WFnWf?from=from_copylink</a>
    <div class="space3"></div>
    <p class="otreequestion">· 如有其他问题，请联系：otreeplat_service@163.com</p>
  </div>
</template>
<style>

.container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .container h1 {
    text-align: center;
    color: #378ee6;
  }

 h2 {
    font-size: 140px;
    text-align: center;
    color: #378ee6;
  }
  .about{
    margin-left: 120px;
    margin-right: 120px;
    color: #378ee6;
    font-size: 17px;
    font-weight: 500;
    
  }

  .about p {
    text-align: justify;
      text-indent: 2em;
      margin-bottom: 1em;
   
  }

  .line {
  width: calc(100% - 5px);
  height: 2px;
  background-color: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.space{
  height: 10px;
}

.space1{
  height: 20px;
}

.otree-link {
  display: block;
  text-align: left;
  color: #378ee6;
  text-decoration: none;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  margin-left: 140px;
}

.otree-link:hover {
  text-decoration: underline;
}

.otreequestion{
  display: block;
  text-align: left;
  color: #1766b6;
  text-decoration: none;
  margin-top: 10px;
  font-size: 20px;
  margin-left: 140px;
  font-style: italic;
  font-weight: 500;
}
.space3{
  height: 5px;
}

</style>