# DecisionSupportSystem

### Intro
P12 - Decision Support System: 	
Decision making in any field can be a complex and difficult activity and this is especially so with many forms of financial data. The aim of this project is to develop a “hybrid” decision support system – that performs automated analysis, whilst also keeping a “human in the loop”. In order to achieve this, data acquisition, filtering, statistical analysis, graphical visualisation and user interaction need to be combined effectively together into a coherent system.	

This is a Software Engineering project that requires students to bring their own data analysis domain (an area of financial decision making that interests them in particular). Successful students will be competent programmers wishing to gain experience of data APIs and graphical visualisation frameworks.

### Structure

The submission deadline for the Project Plan is 13:00 on Monday 3rd July 2023.

The Project Plan (PP) document should be submitted as PDF, and should contain the following:

**Title**: It should show the draft title for your MSc thesis, your name, and the name(s) of your supervisor(s). 

**Abstract**: a paragraph or two that briefly outlines the motivation of your work, what you will do, and a "fairy tale" outcome of what you hope to find. 

**Ethics statement**: a short statement - one sentence - confirming you have discussed ethics with your supervisor and either there is no ethics approval required, the project is covered by the blanket ethics, or the project will need to apply for ethics approval (for details on ethics, see "Project Ethics" in side menu). [Title + Abstract + Ethics statement: 1 page total]

**Project plan**: two pages of coherent text (i.e., of the form you intend to write for your thesis, not rough notes) that could be used as the opening pages of your Introduction/Overview chapter (Chapter 1 of your thesis). [2 pages]

这篇文章介绍了一个投资虚拟货币的决策支持系统。

**Literature review**: It should include four pages of coherent text forming an initial survey/summary of relevant literature, that could be used as the basis of your Contextual Background or Literature Review chapter (typically Chapter 2 and/or 3 of your thesis). [4 pages]

首先我将通过文献来获取一个标准的决策支持系统的组成部分。

[The functions of a decision support system]这篇文章介绍了决策支持系统的基本概念 （DSS 促进决策者和计算机之间的交互，A DSS assists managers in making unstructured or partial structured decisions in which judgmental issues are paramount.），以及一个决策支持系统应该包含的6个基本功能- xxx。我的个人项目将会遵循这篇文章中提到的几项功能。我将以这篇文章作为我实现决策支持系统的基本依据。当然由于这篇文章发布于1979年， 到如今，决策支持系统已经有了很多改变，我将与时俱进，将更先进的技术添加到我的决策支持系统中。

[A brief history of decision support systems] 篇文章陈述了决策支持系统的历史进程，文章以基于 Web 的决策支持系统结束。

如[Advances in Web-Based Decision Support Systems] 这篇文章中总结到，基于Web的决策支持系统有很多优势，所以我可以基于Web技术来设计决策支持系统。

在确定我的决策支持系统的结构

[The Structure of Cryptocurrency Returns] 这篇文章介绍了加密货币回报的结构。

[Cryptocurrency trading: a comprehensive survey] 这篇文章综合调查了当今市场上的加密货币投资。

[Common Risk Factors in Cryptocurrency] 基于这篇论文，我们知道加密货币市场中的三因子模型可以为我们的投资做出重要的决策支持，所以我们使用三因子模型作为决策支持系统的模型之一。

[https://www.coingecko.com/en/api] 这篇文档是 CoinGecko 的 API 介绍文档，我们可以通过 CoinGecko 的接口来获取到实时的加密货币价格。CoinGecko 提供了免费的 API 供我们使用，虽然免费的API有一些限制，但是对于我的项目来说已经够用了。此外还有一些其他的网站也提供了加密货币价格相关的API，例如 CMC，CoinAPI 等。
[An interpretable decision-support systems for daily cryptocurrency trading] 这篇文章介绍了一个可以预测短期比特币走势的决策支持系统。我会在我的决策支持系统中尝试集成这篇文章中的系统，来为我的决策支持系统提供短期内的加密货币走势预测功能。此外这篇文章中的工具只支持BTC，我将尝试将这个工具扩展到其他加密货币的预测中。

[https://www.techtarget.com/searchdatamanagement/definition/data-preprocessing#:~:text=Data%20preprocessing%20transforms%20the%20data,pipeline%20to%20ensure%20accurate%20results.] 我们可以从网络上找到一些数据预处理的方法，这些针对于数据可视化的预处理可以帮助我们清洗数据。

[Fundamentals of data visualization: a primer on making informative and compelling figures] XX 的这本书详细介绍了数据可视化的方法以及优缺点。我们的决策支持系统将会遵循书中的一些观点，例如xx来构建可视化图表。

[React] 这是 React 的官方网站，[COMPARISON OF FRONT-END FRAMEWORKS FOR WEB APPLICATIONS DEVELOPMENT] 这篇文章比较了当今流行的前端框架，React，Vue 和 React，根据文章的结论，我选择React作为我们的框架。因为xxx。

最后我们致力于为我们的决策支持系统提供有力的人机交互方案，以便于能更方便的为使用者提供决策支持。[Human-in-the-loop data integration]这篇文章讲了数据集成中的人机交互。其中提到的一些重点值得我们重视。

**Bibliography/References**: that lists all the literature sources cited in your literature survey, consistently formatted in a commonly-used style (such as APA or IEEE), and with each item in the References being complete, i.e. as you would format it in your final submitted thesis.

**Appendix**: 
Include a one-page time-plan for your project, which you may choose to format as a week-by-week bullet-list, or possibly as a Gantt Chart. [1 page]

Include a one-page risk assessment for your project, talking about the major risks you can foresee that might plausibly occur and interfere with your plans. For each risk, state clearly what it is, what its likelihood is, what its effects/impact would be on the project, and what your intended mitigation or risk-reduction involves. [1 page]





Below, we have more information on structuring your thesis. As described, all reports are differrent and there is no single best way to organise. However, as a rule of thumb, we suggest:
approx 2 pages for your introduction
approx 5 pages for your background 
approx 10 pages for your execution - i.e., what you did
approx 10 pages for your analysis - i.e., your results / findings / evaluation
approx 3 pages for your conclusions - including a summary of your main contributions, what stage you reached compared with your project aims, open questions, future plans
other mandatory content: title page, declaration, ethics statement, table of contents, references 
optional content: acknowledgements, list of tables and figures, supporting technologies list, appendices
In total, that is your full 30 pages. You can split this into as many chapters as you wish and you can name chapters in any way that you wish. The suggested pages are to emphasise where you should be putting effort into your writing. For example, a report with a full literature review of 25 pages will receive a low mark (no matter how good the lit. review is) because you only have 5 pages remaining to tell us about what you did!

下面，我们提供了有关构建论文的更多信息。如上所述，所有报告都是不同的，并且没有单一的最佳组织方式。但是，根据经验，我们建议：
大约 2 页的介绍
大约 5 页的背景
大约 10 页用于你的执行 - 即你做了什么
大约 10 页用于您的分析 - 即您的结果/发现/评估
大约 3 页的结论 - 包括您的主要贡献的摘要、与您的项目目标相比您达到的阶段、开放性问题、未来计划
其他强制性内容：扉页、声明、道德声明、目录、参考文献
可选内容：致谢、图表列表、支持技术列表、附录
总共，这就是您的完整 30 页。您可以将其分成任意数量的章节，并且可以按照您希望的任何方式命名章节。建议的页面是为了强调您应该在写作中投入精力的地方。示例，一份包含 25 页完整文献综述的报告将获得低分（无论文献综述有多好），因为您只剩下 5 页来告诉我们您做了什么！
