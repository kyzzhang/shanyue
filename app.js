//app.js
App({
    getOneBook:function(id){
        var abook;
        var books = this.getBoookList()
                for(let i=0;i<books.length;i++){
                    if(books[i].id == id){
                        abook = books[i];  
                    }
                }
                 return abook;
  },
    getBoookList:function(){
        var indexList = [
          {
            id: "1",
            bookUrl: "../../images/welcome.png",
            bookName: "点我开始你的闪月之旅",
            bookInfor: "",
            isChinese: "1",
          },
          {
            id: "2",
            bookUrl: "../../images/benfranklin.jpg",
            bookName: "富兰克林自传",
            bookInfor: "《富兰克林自传》是本杰明·富兰克林的一部代表作，讲述富兰克林从一位贫困家庭的孩子在经历种种磨难后成为一个令人难以置信的通才的成长经历。《富兰克林自传》是美国传记文学的开山之作，而且还使自传成为一种全新的文学体裁。它是一部影响了几代美国人、历经两百余年经久不衰的励志奇书，它包含了人生奋斗与成功的真知灼见，以及诸种善与美的道德真谛，被公认为是改变了无数人命运的美国精神读本。",
            isChinese: "1",
          },
          {
            id: "3",
            bookUrl: "../../images/perfectworld.jpg",
            bookName: "完美世界",
            bookInfor: "《完美世界》（前72章）是辰东所著的第五部小说，又称《遮天前传》东方玄幻类，首发于起点中文网。 一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地；问苍茫大地，谁主沉浮？一个少年从大荒中走出，一切从这里开始。 2016年11月，《完美世界》荣登2016中国泛娱乐指数盛典中国IP价值榜-网络文学榜top10。2017年7月12日，《2017猫片 胡润原创文学IP价值榜》发布，《完美世界》位列45位。",
            isChinese: "1",
          },
          {
            id: "4",
            bookUrl: "../../images/Sherlock.jpg",
            bookName: "The Adventures of Sherlock Holmes",
            bookInfor: "The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, featuring his fictional detective Sherlock Holmes. It was first published on 14 October 1892; the individual stories had been serialised in The Strand Magazine between July 1891 and June 1892. The stories are not in chronological order, and the only characters common to all twelve are Holmes and Dr. Watson. The stories are related in first-person narrative from Watson's point of view.",
          isChinese: "0",
          },
          {
            id: "5",
            bookUrl: "../../images/dzz.jpg",
            bookName: "大主宰",
            bookInfor: "（前66章）《大主宰》是天蚕土豆在2013年创作的第四部长篇小说，于起点中文网首发，与《斗破苍穹》和《武动乾坤》有联系，讲述少年牧尘不断成长的的故事。 2016年11月大主宰荣登2016中国泛娱乐指数盛典中国IP价值榜-网络文学榜top10。2017年7月12日，《2017猫片 胡润原创文学IP价值榜》发布，《大主宰》位列41位。",
            isChinese: "1",
          },
          {
            id: "6",
            bookUrl: "../../images/afarm.jpg",
            bookName: "Animal Farm",
            bookInfor: `Animal Farm is an allegorical novella by George Orwell, first published in England on 17 August 1945. According to Orwell, the book reflects events leading up to the Russian Revolution of 1917 and then on into the Stalinist era of the Soviet Union. Orwell, a democratic socialist, was a critic of Joseph Stalin and hostile to Moscow-directed Stalinism, an attitude that was critically shaped by his experiences during the Spanish Civil War. The Soviet Union, he believed, had become a brutal dictatorship, built upon a cult of personality and enforced by a reign of terror. In a letter to Yvonne Davet, Orwell described Animal Farm as a satirical tale against Stalin ("un conte satirique contre Staline"), and in his essay "Why I Write" (1946), wrote that Animal Farm was the first book in which he tried, with full consciousness of what he was doing, "to fuse political purpose and artistic purpose into one whole".`,
            isChinese: "0",
          },
          {
            id: "7",
            bookUrl: "../../images/alice.jpg",
            bookName: "Alice's Adventures in Wonderland",
            bookInfor: "Alice's Adventures in Wonderland (commonly shortened to Alice in Wonderland) is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll. It tells of a girl named Alice falling through a rabbit hole into a fantasy world populated by peculiar, anthropomorphic creatures. The tale plays with logic, giving the story lasting popularity with adults as well as with children. It is considered to be one of the best examples of the literary nonsense genre. Its narrative course and structure, characters and imagery have been enormously influential in both popular culture and literature, especially in the fantasy genre.",
            isChinese: "0",
          },
          {
            id:"8",
            bookUrl: "../../images/zhihu.png",
            bookName: "知乎精选回答",
            bookInfor: "知乎top回答",
            isChinese: "1",
          }
                    ];

                     return indexList;
                },

})