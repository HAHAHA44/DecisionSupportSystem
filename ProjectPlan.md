#### 分析题干
首先我们通过分析题目要求得知，我们需要开发一个基于金融数据的混合决策系统，它可以自动分析，同时有人机交互的功能。

数据获取，分析，可视化，人机交互。

我想使用加密货币数据来完成这个系统。由于我们可以从加密货币交易所中获取到加密货币的价格等公共数据，因此这个系统在道德审查中应该属于第一类，不需要进行道德审查的项目。我们没有使用任何个人的信息和数据。

由于我想做一个可以实时获取最新数据的决策系统，我还在进行技术选型。目前两个是Tableau和Web+Chart库。
我看了一下Web上的 Chart 库，最流行的是 Chartjs，但是这个库缺少一些人机交互的功能，可能需要我们额外写 JavaScript 的脚本来实现。
Tableau 可能是更好的一个工具，我们也在这个学期学习过这个工具的使用方法，但是我不知道他能否实时更新数据。我会在之后再调查一下。

此外我可能需要一些AWS的资源，所以我要申请|AWS经费。

我想通过阅读文献，来澄清题目中的一些名词术语(terminology
)，例如决策支持系统是什么，一般包含什么功能，以及什么是人机交互，等等。此外有一些文献关于人机交互的决策支持系统的，但是可能不是金融领域，我看这些文献都是专业性比较强的，换言之，不够泛化，我可能会有一些细微的设计借用。

https://sci-hub.se/10.1109/aero.2015.7119285 (Air craft)

https://journals.sagepub.com/doi/pdf/10.1177/0008125619862256?casa_token=Cn_re5Nw2BwAAAAA:SNShd_lGVlN5KM65oMNUR6jYr-BYApRdwaCS2-XX-XOrWMqfxSDyBitdghFPiXpTT9Rtqqb6g-CA

https://sci-hub.se/10.1109/aero.2015.7119285

Human in the loop:
https://www.usenix.org/legacy/event/upsec/tech/full_papers/cranor/cranor.pdf

https://www.jair.org/index.php/jair/article/view/11345

DSS for Fin:

https://sci-hub.se/10.1016/0167-9236(94)00029-r

https://www.sciencedirect.com/science/article/abs/pii/0378720679900399 (The functions of a decision support system

https://www.sciencedirect.com/science/article/pii/S0957417422007515?casa_token=a7Z0nAot7foAAAAA:IhQANZPuVCoXWSFTEtj7EZCkSVzlrCsnwRpXCJWFUmDZQJ2BtNGelStP4d5aAsFLF_-qoblZ4Q （DSS for crypto trading）
) **Important**

who get beniefit

table activity 

evaluation

implememtation

specific application 

The steps for solving a decision problem are as follows 1. Intelligence-defining the issue or chance of happening, 2. Design-Construction of models or DSS or potential alternatives, 3. Selection-Examination of alternative options, 4. Implementation-placing the option into action, 5. Review-Re-Assessment of the Framework (Turban 1988).