#斗地主

![输入图片说明](https://images.gitee.com/uploads/images/2020/0926/180427_65599512_2665180.png "QQ图片20200926174210.png")

#### 软件架构  
vue  

#### 算法草稿（未整理）  
![输入图片说明](https://images.gitee.com/uploads/images/2020/1012/152839_3d13d25d_2665180.jpeg "ddz.jpg")  

#### 计划事项\todo  
1.金币系统(已完成)  
2.叫分抢地主，1\2\3分(已完成)  
3.AI残局算法优化：蒙特卡洛猜牌 + 极大极小搜索 + alpha-beta剪枝  

#### 牌型（同欢乐斗地主的牌型）  
火箭：即双王（大王和小王），最大的牌。   
炸弹：四张同数值牌（如四个 7 ）。   
单牌：单个牌（如红桃 5 ）。   
对牌：数值相同的两张牌（如梅花 4+ 方块 4 ）。   
三张牌：数值相同的三张牌（如三个 J ）。   
三带一：数值相同的三张牌 + 一张单牌或一对牌。例如： 333+6 或 444+99   
单顺：五张或更多的连续单牌（如： 45678 或 78910JQK ）。不包括 2 点和双王。   
双顺：三对或更多的连续对牌（如： 334455 、7788991010JJ ）。不包括 2 点和双王。   
三顺：二个或更多的连续三张牌（如： 333444 、 555666777888 ）。不包括 2 点和双王。   
飞机带翅膀：三顺＋同数量的单牌（或同数量的对牌）。如： 444555+79 或 333444555+7799JJ   
四带二：四张牌＋两手牌。（注意：四带二不是炸弹）。如： 5555 ＋ 3 ＋ 8 或 4444 ＋ 55 ＋ 77 。  

#### 游戏规则（同欢乐斗地主的规则）  
1.准备（三个准备好，开始叫分）  
2.叫分（叫1\2\3分或不叫，叫分最高者当地主，叫分相同的人中随机选为地主）  
3.打牌（不用说了）  
4.结算金币（每局底分是1，一个炸弹 分X2，一个火箭 分X4。农民金币加减 最终分，地主金币加减 2X最终分）  
  
#### 使用说明  
npm install  
本地运行：npm run serve  
打包发布：npm run build


