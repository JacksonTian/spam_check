// 载入模块
var Segment = require('segment').Segment;
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

// 取一个样本 广告帖子
// 比如：杭州人流医院
// 比如：代开发票

// 将其分词。如果一个帖子是小广告，将其分词的每个词权重加1
// 进行训练
// 检测：将标题进行分词。得到每个词的权重，算出标题的权重值。
// 返回广告权重值

var result = {};

var train = function (title, isAd) {
  var words = segment.doSegment(title);
  var offset = (isAd ? 1 : -1);
  for (var i = 0; i < words.length; i++) {
    var key = words[i].w;
    if (result.hasOwnProperty(key)) {
      result[key] += offset;
    } else {
      result[key] = offset;
    }
  }
};

train('代开发票', true);
train('无痛人流', true);
train('最低80元起藍光電影', true);
train('采购谈判的“19招”', true);
train('最有效的男用春藥', true);
train('车间干部要掌握的控制制造成本的方法', true);
train('李宗瑞迷奸人妻', true);
train('香水也是生活中的催情藥', true);
train('百度推广优惠活动', true);
train('富少李宗瑞迷姦對象', true);
train('河南代开汽车维修费发票', true);
train('郑州代开汽车维修费发票', true);

train('co-busboy 解析流如何处理呢？--在线等--', false);
train('回调函数嵌套返回值问题', false);

console.log(result);

var check = function (title) {
  var words = segment.doSegment(title);
  var weight = 0;
  for (var i = 0; i < words.length; i++) {
    var key = words[i].w;
    var val = (result[key] || 0);
    if (val > 0) {
      weight += val;
    }
  }
  return weight;
};

console.log(check('杭州无痛人流'));
console.log(check('杭州代开发票'));

exports.train = train;
exports.check = check;

// TODO
// - 训练结果要放进db
// - 繁体词
// - 桃花文、火星文 (样本够大应该也没问题)
// - 例外？
// - 分词效果还不够好
