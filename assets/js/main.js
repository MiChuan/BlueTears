/* =========================================================
   蓝眼泪 · 追泪指南  —  main.js
   纯原生 JS，无依赖
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     0. 数据
     --------------------------------------------------------- */
  var DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var DIR_CN = { N: '北风', NE: '东北风', E: '东风', SE: '东南风', S: '南风', SW: '西南风', W: '西风', NW: '西北风' };

  var SPOTS = [
    {
      id: 'dalian', no: 1, name: '大连 · 大黑石', short: '大黑石', region: '辽宁 · 渤海海峡',
      x: 830, y: 108, core: false, k: 0.65, peak: [5, 6, 7], wind: [4, 3, 5], type: '夜光藻',
      desc: '渤海海峡一侧的礁石海岸。夜光藻随黄海暖流北上，5–7 月是窗口期；水温偏低，爆发强度不如闽东，但夏季凉爽、人少、光污染低。',
      facts: { '盛期': '5–7 月', '最佳风': '南风 / 东南风', '地形': '礁石 + 碎石滩' },
      tip: '退潮后礁石间的浅水坑最亮。石头极滑，带头灯和防滑鞋，不要单独下滩。'
    },
    {
      id: 'qinhuangdao', no: 2, name: '秦皇岛 · 北戴河', short: '北戴河', region: '河北 · 渤海湾',
      x: 824, y: 208, core: false, k: 0.45, peak: [6, 7], wind: [3, 4, 2], type: '夜光藻（偶发）',
      desc: '渤海湾内的沙质海岸，蓝眼泪属于偶发级别：需要连续几天向岸风，把外海的藻华推进湾内并堆在潮线上。',
      facts: { '盛期': '6–7 月', '最佳风': '东南风 / 南风', '地形': '缓坡沙滩' },
      tip: '湾内水浅，涨潮后两小时最有戏。暑期人多，往鸽子窝以东的暗段走。'
    },
    {
      id: 'qingdao', no: 3, name: '青岛 · 石老人', short: '石老人', region: '山东 · 黄海',
      x: 834, y: 268, core: false, k: 0.42, peak: [5, 6], wind: [3, 4, 2], type: '夜光藻（少见）',
      desc: '黄海沿岸，公开记录零散，多见于 5–6 月的东南风天气。城市灯光密集，需要走到沙滩暗处才有机会分辨那层微光。',
      facts: { '盛期': '5–6 月', '最佳风': '东南风 / 东风', '地形': '沙滩 + 礁石' },
      tip: '不建议当保底选项。留意本地赤潮通报，出现了再去。'
    },
    {
      id: 'zhoushan', no: 4, name: '舟山 · 花鸟岛', short: '花鸟岛', region: '浙江 · 东海',
      x: 714, y: 410, core: true, k: 0.75, peak: [5, 6, 7], wind: [2, 1, 3], type: '夜光藻 + 海萤',
      desc: '东海岛屿，远离陆地灯光，是华东观测条件最好的地方之一。岛东侧的礁石湾在东南风后容易把藻华堆在岸边。',
      facts: { '盛期': '5–7 月', '最佳风': '东风 / 东北风', '地形': '岛屿礁湾' },
      tip: '需坐船上岛，班次受风浪影响。岛上光污染极低，长曝光最出片。'
    },
    {
      id: 'lianjiang', no: 5, name: '连江 · 黄岐', short: '黄岐', region: '福建 · 闽东',
      x: 618, y: 508, core: true, k: 0.78, peak: [4, 5, 6], wind: [2, 1, 3], type: '海萤 + 夜光藻',
      desc: '闽东半岛的外海侧，海萤与夜光藻混生，颗粒感更强——不是整片浪线发亮，而是一颗一颗的蓝色碎星，被踩到才亮。',
      facts: { '盛期': '4–6 月', '最佳风': '东风 / 东北风', '地形': '半岛礁岸' },
      tip: '黄岐半岛的定海湾、苔菉一带都能蹲。4 月海萤比例最高，脚下越扰动越亮。'
    },
    {
      id: 'pingtan', no: 6, name: '平潭 · 坛南湾', short: '平潭', region: '福建 · 闽中',
      x: 574, y: 558, core: true, k: 0.87, peak: [4, 5, 6], wind: [2, 3, 1], type: '夜光藻为主',
      desc: '国内最出名的追泪地。坛南湾、长江澳、北港村一线，4–6 月几乎每晚都有人蹲到，强度也最稳定——海湾正对开阔水域，风向一对，藻华就上岸。',
      facts: { '盛期': '4–6 月', '最佳风': '东风 / 东南风', '地形': '长滩 + 湾口' },
      tip: '长江澳风车田一带风极大，注意保暖。坛南湾人多，往湾口两端走人少且更暗。'
    },
    {
      id: 'xiamen', no: 7, name: '厦门 · 环岛路', short: '厦门', region: '福建 · 闽南',
      x: 496, y: 630, core: false, k: 0.58, peak: [4, 5, 6], wind: [3, 2, 4], type: '夜光藻',
      desc: '城市海岸，灯光干扰是最大敌人。需要走到黄厝、椰风寨以东的暗段，才可能看见脚边那层淡蓝。',
      facts: { '盛期': '4–6 月', '最佳风': '东南风 / 东风', '地形': '城市沙滩' },
      tip: '关掉手机闪光灯，让眼睛在黑暗里适应 5 分钟再看，命中率翻倍。'
    },
    {
      id: 'nanao', no: 8, name: '汕头 · 南澳岛', short: '南澳岛', region: '广东 · 粤东',
      x: 418, y: 676, core: false, k: 0.62, peak: [3, 4, 5], wind: [4, 3, 2], type: '夜光藻',
      desc: '粤东岛屿，青澳湾朝向东南，春季藻华随暖流北上时容易在弧形湾内聚集，是国内最早进入季节的点位之一。',
      facts: { '盛期': '3–5 月', '最佳风': '南风 / 东南风', '地形': '弧形海湾' },
      tip: '青澳湾沙滩平缓，退潮后的湿沙带最适合踩出一串发光脚印。'
    },
    {
      id: 'xichong', no: 9, name: '深圳 · 大鹏西涌', short: '西涌', region: '广东 · 大鹏湾',
      x: 366, y: 738, core: false, k: 0.58, peak: [3, 4, 5], wind: [4, 3, 5], type: '夜光藻（偶发）',
      desc: '深圳最长的沙滩，东南朝向。3–5 月偶有爆发，但城市光污染和游客灯光让观测窗口很窄。',
      facts: { '盛期': '3–5 月', '最佳风': '南风 / 东南风', '地形': '长沙滩' },
      tip: '西涌需预约通行，节假日提前安排。往沙滩两端无人区走，关灯再看。'
    },
    {
      id: 'weizhou', no: 10, name: '北海 · 涠洲岛', short: '涠洲岛', region: '广西 · 北部湾',
      x: 330, y: 756, core: false, k: 0.52, peak: [2, 3, 4], wind: [4, 5, 6], type: '夜光藻',
      desc: '北部湾的火山岛，2–4 月是窗口。五彩滩的火山岩平台在西南风后容易挂住藻，退潮时一圈水洼会亮得很碎。',
      facts: { '盛期': '2–4 月', '最佳风': '南风 / 西南风', '地形': '火山岩平台' },
      tip: '上岛船票需提前。五彩滩夜间无照明，台阶湿滑，务必结伴。'
    }
  ];

  var SPOT_MAP = {};
  SPOTS.forEach(function (s) { SPOT_MAP[s.id] = s; });

  /* ---------------------------------------------------------
     1. 小工具
     --------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function windCN(i) { return DIR_CN[DIRS[i]]; }

  /* ---------------------------------------------------------
     2. 概率模型
     --------------------------------------------------------- */
  var WEIGHTS = { season: 25, temp: 18, wind: 17, level: 10, tide: 10, moon: 11, sky: 6, sign: 3 };

  function fSeason(month, peak) {
    var best = 99;
    peak.forEach(function (p) {
      var d = Math.abs(month - p);
      d = Math.min(d, 12 - d);
      if (d < best) best = d;
    });
    if (best === 0) return 1;
    if (best === 1) return 0.72;
    if (best === 2) return 0.38;
    if (best === 3) return 0.12;
    return 0.03;
  }
  function fTemp(t) {
    if (t >= 20 && t <= 25) return 1;
    if ((t >= 18 && t < 20) || (t > 25 && t <= 27)) return 0.75;
    if ((t >= 15 && t < 18) || (t > 27 && t <= 30)) return 0.4;
    return 0.08;
  }
  function fWindDir(dirIdx, bestList) {
    var table = [1, 0.62, 0.3, 0.1, 0.03, 0.01, 0.01, 0.01];
    var best = 0;
    bestList.forEach(function (b) {
      var d = Math.abs(dirIdx - b);
      d = Math.min(d, 8 - d);
      if (table[d] > best) best = table[d];
    });
    return best;
  }
  var F_LEVEL = { 0: 0.25, 1: 0.35, 2: 0.7, 3: 1, 4: 1, 5: 0.6, 6: 0.15 };
  var F_TIDE = { bigFlow: 1, bigEbb: 0.78, smallFlow: 0.62, slack: 0.5, smallEbb: 0.32 };
  var F_MOON = { new: 1, quarter: 0.6, full: 0.18 };
  var F_SKY = { clear: 1, pclear: 0.85, cloud: 0.7, overcast: 0.55, drizzle: 0.4, rain: 0.15 };

  function compute(inp) {
    var spot = SPOT_MAP[inp.spot];
    var f = {
      season: fSeason(inp.month, spot.peak),
      temp: fTemp(inp.temp),
      wind: fWindDir(inp.dir, spot.wind),
      level: F_LEVEL[inp.level],
      tide: F_TIDE[inp.tide],
      moon: F_MOON[inp.moon],
      sky: F_SKY[inp.sky],
      sign: inp.sign ? 1 : 0
    };
    var score = 0;
    Object.keys(WEIGHTS).forEach(function (k) { score += WEIGHTS[k] * f[k]; });
    var prob = clamp(Math.round(score * spot.k), 2, 92);
    return { spot: spot, f: f, score: score, prob: prob };
  }

  function verdictOf(p) {
    if (p >= 78) return { t: '值得连夜出发', cls: 'top' };
    if (p >= 62) return { t: '值得一冲', cls: 'good' };
    if (p >= 45) return { t: '有点悬', cls: 'mid' };
    if (p >= 28) return { t: '概率偏低', cls: 'low' };
    return { t: '基本没戏', cls: 'bad' };
  }

  function nearestPeakMonth(month, peak) {
    var best = null, bd = 99;
    peak.forEach(function (p) {
      var d = Math.abs(month - p);
      d = Math.min(d, 12 - d);
      if (d < bd) { bd = d; best = p; }
    });
    return { month: best, dist: bd };
  }

  /* ---------------------------------------------------------
     3. 手绘地图：图钉 + 侧栏
     --------------------------------------------------------- */
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function buildPins() {
    var layer = $('#mapPins');
    if (!layer) return;
    SPOTS.forEach(function (s) {
      var g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'pin' + (s.core ? ' is-core' : ''));
      g.setAttribute('transform', 'translate(' + s.x + ' ' + s.y + ')');
      g.setAttribute('data-id', s.id);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', s.name + '，点击查看详情');

      var color = s.core ? '#c0442f' : '#1b3b52';
      var labelAbove = s.id === 'xichong';
      var nameY = labelAbove ? -14 : 5;

      g.innerHTML =
        '<circle class="halo" r="38" fill="url(#pinGlow)"></circle>' +
        '<circle class="ring" r="11" fill="none" stroke="' + color + '" stroke-width="1.6" opacity=".5"></circle>' +
        '<circle class="core" r="' + (s.core ? 7 : 6) + '" fill="' + color + '"></circle>' +
        '<circle r="2.4" fill="#f6efdd" opacity=".9"></circle>' +
        '<text class="num" x="0" y="-18" text-anchor="middle" fill="' + color + '">' + s.no + '</text>' +
        '<text class="name" x="19" y="' + nameY + '" text-anchor="start">' + s.short + '</text>';

      g.addEventListener('click', function () { selectSpot(s.id, true); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSpot(s.id, true); }
      });
      g.addEventListener('mouseenter', function () { renderSpotCard(s.id); });
      layer.appendChild(g);
    });
  }

  function renderSpotCard(id) {
    var s = SPOT_MAP[id];
    if (!s) return;
    var card = $('#spotCard');
    if (!card) return;
    card.style.opacity = '0.35';
    var base = compute({ spot: s.id, month: s.peak[0], temp: 22, dir: 4, level: 3, tide: 'bigFlow', moon: 'new', sky: 'clear', sign: false });
    card.innerHTML =
      '<div class="sc-head">' +
        '<div><div class="sc-idx">POINT ' + String(s.no).padStart(2, '0') + ' / 10</div>' +
        '<h3 class="sc-name">' + s.name + '</h3>' +
        '<div class="sc-region">' + s.region + '</div></div>' +
        '<span class="sc-tag' + (s.core ? '' : ' low') + '">' + (s.core ? '核心点位' : '一般点位') + '</span>' +
      '</div>' +
      '<p class="sc-desc">' + s.desc + '</p>' +
      '<div class="sc-facts">' +
        '<div class="sc-fact"><span>盛 期</span><b>' + s.facts['盛期'] + '</b></div>' +
        '<div class="sc-fact"><span>最佳风向</span><b>' + s.facts['最佳风'] + '</b></div>' +
        '<div class="sc-fact"><span>地形</span><b>' + s.facts['地形'] + '</b></div>' +
        '<div class="sc-fact"><span>发光主角</span><b>' + s.type + '</b></div>' +
      '</div>' +
      '<div class="sc-tip"><b>追泪提示 · </b>' + s.tip + '</div>' +
      '<div class="sc-tip" style="border:none;padding-top:8px;color:var(--dim-2)">盛期理想夜晚参考命中率 ' + base.prob + '%</div>';
    requestAnimationFrame(function () { card.style.opacity = '1'; });
  }

  function buildSpotList() {
    var list = $('#spotList');
    if (!list) return;
    list.innerHTML = '';
    SPOTS.forEach(function (s) {
      var li = el('li');
      li.dataset.id = s.id;
      li.innerHTML = '<span class="dot"></span><span class="nm">' + s.name + '</span>' +
                     '<span class="pk">' + s.facts['盛期'] + '</span>';
      li.addEventListener('click', function () { selectSpot(s.id, true); });
      li.addEventListener('mouseenter', function () { renderSpotCard(s.id); });
      list.appendChild(li);
    });
  }

  var currentSpot = 'pingtan';
  function selectSpot(id, syncCalc) {
    currentSpot = id;
    $$('.handmap .pin').forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-id') === id);
    });
    $$('#spotList li').forEach(function (li) {
      li.classList.toggle('active', li.dataset.id === id);
    });
    renderSpotCard(id);
    if (syncCalc) {
      var sel = $('#fSpot');
      if (sel) { sel.value = id; if (state) { state.spot = id; renderCalc(); } }
    }
  }

  /* ---------------------------------------------------------
     4. 计算器
     --------------------------------------------------------- */
  var state = null;

  function buildControls() {
    var sel = $('#fSpot');
    if (sel) {
      SPOTS.forEach(function (s) {
        var o = document.createElement('option');
        o.value = s.id;
        o.textContent = s.name;
        sel.appendChild(o);
      });
      sel.value = 'pingtan';
    }

    var rose = $('#windRose');
    if (rose) {
      rose.innerHTML = '';
      var order = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
      order.forEach(function (d) {
        var b = el('button', '', d === 'N' ? '北' : d === 'NE' ? '东北' : d === 'E' ? '东'
          : d === 'SE' ? '东南' : d === 'S' ? '南' : d === 'SW' ? '西南' : d === 'W' ? '西' : '西北');
        b.type = 'button';
        b.dataset.dir = d;
        b.title = DIR_CN[d];
        if (d === 'SE') b.classList.add('on');
        b.addEventListener('click', function () {
          $$('#windRose button').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on');
          if (state) { state.dir = DIRS.indexOf(d); renderCalc(); }
        });
        rose.appendChild(b);
      });
      rose.appendChild(el('span', 'rose-center', '风向<br>（风来向）'));
    }
  }

  function readInputs() {
    state = {
      spot: $('#fSpot').value,
      month: +$('#fMonth').value,
      temp: +$('#fTemp').value,
      dir: DIRS.indexOf(($('#windRose .on') || {}).dataset ? $('#windRose .on').dataset.dir : 'SE'),
      level: +$('#fLevel').value,
      tide: $('#fTide').value,
      moon: $('#fMoon').value,
      sky: $('#fSky').value,
      sign: $('#fSign').checked
    };
    if (isNaN(state.dir) || state.dir < 0) state.dir = 3;
  }

  var FACTOR_META = [
    { key: 'season', label: '季节' },
    { key: 'temp', label: '水温' },
    { key: 'wind', label: '风向' },
    { key: 'level', label: '风浪' },
    { key: 'tide', label: '潮汐' },
    { key: 'moon', label: '月光' },
    { key: 'sky', label: '天况' },
    { key: 'sign', label: '迹象' }
  ];

  function buildTips(r) {
    var s = r.spot, f = r.f, tips = [];
    var near = nearestPeakMonth(state.month, s.peak);
    var bestNames = s.wind.map(function (i) { return windCN(i); }).slice(0, 2).join(' / ');

    if (r.prob >= 78) {
      tips.push({ b: '条件对上', t: '六项主因基本齐了。带红光手电（白光会毁掉眼睛的暗适应）、三脚架，手机用 3–8 秒长曝光，ISO 1600 起步。' });
    }
    if (f.season < 0.5) {
      var delta = near.dist === 0 ? 0 : near.dist;
      tips.push({ b: '季节', t: delta > 0
        ? '现在距 ' + s.short + ' 的盛期还有约 ' + delta + ' 个月，除非出现异常藻华，不建议专程前往。盛期是 ' + s.facts['盛期'] + '。'
        : '不在盛期内，命中率会打折。' });
    }
    if (f.temp < 0.5) {
      tips.push({ b: '水温', t: '当前 ' + state.temp + ' ℃，偏离夜光藻最适的 20–25 ℃。低于 15 ℃ 或高于 30 ℃ 时，藻的活性会明显下降。' });
    }
    if (f.wind < 0.4) {
      tips.push({ b: '风向', t: '现在吹的是' + windCN(state.dir) + '，而 ' + s.short + ' 需要' + bestNames + '这类向岸风把藻推上岸。风不对时，浪再大也只是一片黑水。' });
    } else if (f.wind >= 0.6) {
      tips.push({ b: '风向', t: windCN(state.dir) + '正好是' + s.short + '的向岸风，藻华会被压向岸边、堆在潮线上——这是最容易被忽略的一条。' });
    }
    if (f.level < 0.6) {
      tips.push({
        b: '风力',
        t: state.level <= 1 ? '几乎静风，水面缺扰动，发光会非常淡。3–4 级最好。'
          : state.level >= 5 ? '风力偏大，藻带被打散，夜里在礁石上也不安全。等风小一点再去。'
          : '风力不在最佳区间（3–4 级），扰动或聚集会打折扣。'
      });
    }
    if (f.tide < 0.6) tips.push({ b: '潮汐', t: '平潮和小潮退潮时，岸边聚集带最不明显。挑农历初一、十五前后的大潮涨潮去。' });
    if (f.moon < 0.5) tips.push({ b: '月光', t: '满月的月光会把整片海照亮，微弱荧光被淹没。等月亮落下，或改到农历月初、月末。' });
    if (f.sky < 0.5) tips.push({ b: '天况', t: '降雨尤其是大雨会让表层盐度骤降，藻华常在 24–48 小时内「熄灯」。雨后第二天通常不是好时机。' });
    if (state.sign) tips.push({ b: '加分项', t: '白天已看到红褐水色或有腥味，说明藻就在附近，这是最强的临场信号。' });
    if (state.level >= 5) tips.push({ b: '安全', t: '风大浪急时不要站上礁石或走进浪线，涨潮速度常常比想象快。', warn: true });
    if (!tips.length) tips.push({ b: '提醒', t: '条件尚可，但蓝眼泪的分布极不均匀：同一片湾的两头常常一明一暗。多走几个湾口，别在原地等。' });
    return tips.slice(0, 4);
  }

  var GAUGE_LEN = null;
  function renderCalc() {
    var r = compute(state);
    var v = verdictOf(r.prob);

    var num = $('#probNum'), ver = $('#probVerdict'), fill = $('#gaugeFill');
    num.textContent = r.prob;
    ver.textContent = v.t;

    if (GAUGE_LEN === null && fill && fill.getTotalLength) {
      GAUGE_LEN = fill.getTotalLength();
    }
    if (fill) {
      fill.style.strokeDasharray = GAUGE_LEN + ' ' + GAUGE_LEN;
      fill.style.strokeDashoffset = GAUGE_LEN * (1 - r.prob / 100);
      fill.style.stroke = r.prob >= 78 ? '#57f0c8' : r.prob >= 62 ? '#38d9ff'
        : r.prob >= 45 ? '#8fd6ff' : r.prob >= 28 ? '#ffc07a' : '#ff8a6b';
    }

    $('#pillSpot').textContent = r.spot.name;
    $('#pillType').textContent = '主角：' + r.spot.type;

    var lines = {
      top: '这种组合下的蓝眼泪，属于「到了就能看见」的夜晚。',
      good: '值得为它安排一次夜滩，剩下的一点不确定性交给运气。',
      mid: '有一半靠条件、一半靠运气，顺路可以，专程要斟酌。',
      low: '主要条件没对上，除非你只是想吹吹海风。',
      bad: '今晚的条件基本把发光生物挡在了外海，换个日子吧。'
    };
    $('#resultLine').textContent = lines[v.cls];

    var fw = $('#factors');
    fw.innerHTML = '';
    FACTOR_META.forEach(function (m) {
      var val = r.f[m.key];
      var pct = Math.round(val * 100);
      var row = el('div', 'factor' + (pct < 45 ? ' low' : ''));
      row.innerHTML = '<span class="fl">' + m.label + '</span>' +
        '<span class="ft"><i class="ff" style="width:0%"></i></span>' +
        '<span class="fv">' + pct + '</span>';
      fw.appendChild(row);
      requestAnimationFrame(function () {
        row.querySelector('.ff').style.width = pct + '%';
      });
    });

    var tw = $('#tips');
    tw.innerHTML = '';
    buildTips(r).forEach(function (t) {
      var d = el('div', 'tip' + (t.warn ? ' warn-tip' : ''));
      d.innerHTML = '<b>' + t.b + '</b><span>' + t.t + '</span>';
      tw.appendChild(d);
    });

    // 同步地图选中态
    if (r.spot.id !== currentSpot) selectSpot(r.spot.id, false);
  }

  function buildRank() {
    var box = $('#rankList');
    if (!box) return;
    var rows = SPOTS.map(function (s) {
      var r = compute({ spot: s.id, month: s.peak[0], temp: 22, dir: 0, level: 3, tide: 'slack', moon: 'quarter', sky: 'pclear', sign: false });
      return { s: s, p: r.prob };
    }).sort(function (a, b) { return b.p - a.p; });

    box.innerHTML = '';
    rows.forEach(function (row, i) {
      var item = el('div', 'rank-item');
      item.innerHTML = '<span class="rn">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="rt">' + row.s.name + '</span>' +
        '<span class="rbar"><i style="width:' + row.p + '%"></i></span>' +
        '<span class="rp">' + row.p + '%</span>';
      item.addEventListener('click', function () {
        var sel = $('#fSpot');
        sel.value = row.s.id;
        state.spot = row.s.id;
        state.month = row.s.peak[0];
        $('#fMonth').value = state.month;
        $('#oMonth').textContent = state.month + ' 月';
        renderCalc();
        var calc = $('.calc');
        if (calc) calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      box.appendChild(item);
    });
  }

  function bindCalc() {
    var map = [
      ['#fSpot', 'change', function (e) { state.spot = e.target.value; }],
      ['#fMonth', 'input', function (e) {
        state.month = +e.target.value;
        $('#oMonth').textContent = state.month + ' 月';
      }],
      ['#fTemp', 'input', function (e) {
        state.temp = +e.target.value;
        $('#oTemp').textContent = state.temp + ' ℃';
      }],
      ['#fLevel', 'input', function (e) {
        state.level = +e.target.value;
        $('#oLevel').textContent = state.level + ' 级';
      }],
      ['#fTide', 'change', function (e) { state.tide = e.target.value; }],
      ['#fMoon', 'change', function (e) { state.moon = e.target.value; }],
      ['#fSky', 'change', function (e) { state.sky = e.target.value; }],
      ['#fSign', 'change', function (e) { state.sign = e.target.checked; }]
    ];
    map.forEach(function (m) {
      var node = $(m[0]);
      if (!node) return;
      node.addEventListener(m[1], function (e) { m[2](e); renderCalc(); });
    });
  }

  /* ---------------------------------------------------------
     5. Canvas：海面微光
     --------------------------------------------------------- */
  function makeSprite(size, color) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.22, color);
    g.addColorStop(1, 'rgba(20,120,180,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, size, size);
    return c;
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initSea(canvas, opt) {
    if (!canvas) return;
    var o = Object.assign({ count: 70, size: 2, drift: 0.22, sprite: 64, radius: 12, hero: false }, opt);
    var ctx = canvas.getContext('2d');
    var sprite = makeSprite(o.sprite, 'rgba(90,225,255,.55)');
    var w = 0, h = 0, dpr = 1, specks = [], sparks = [], raf = null, visible = true;

    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      specks = [];
      var n = reduced ? Math.round(o.count * 0.4) : o.count;
      for (var i = 0; i < n; i++) {
        specks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + Math.random() * o.size,
          vx: (Math.random() - 0.5) * 0.16,
          vy: -(0.03 + Math.random() * o.drift),
          ph: Math.random() * 6.283,
          sp: 0.005 + Math.random() * 0.012
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < specks.length; i++) {
        var s = specks[i];
        s.x += s.vx; s.y += s.vy; s.ph += s.sp;
        if (s.y < -20) { s.y = h + 10; s.x = Math.random() * w; }
        if (s.x < -20) s.x = w + 10;
        if (s.x > w + 20) s.x = -10;
        var tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.ph));
        var d = s.r * 9;
        ctx.globalAlpha = tw * (o.hero ? 0.55 : 0.75);
        ctx.drawImage(sprite, s.x - d / 2, s.y - d / 2, d, d);
      }

      for (var j = sparks.length - 1; j >= 0; j--) {
        var p = sparks[j];
        p.life -= 0.018;
        p.x += p.vx; p.y += p.vy;
        if (p.life <= 0) { sparks.splice(j, 1); continue; }
        var rr = (1.05 - p.life) * 46 + 6;
        ctx.globalAlpha = p.life * 0.85;
        ctx.drawImage(sprite, p.x - rr / 2, p.y - rr / 2, rr, rr);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function spawn(x, y, n, power) {
      for (var i = 0; i < n; i++) {
        var a = Math.random() * 6.283, sp = Math.random() * 1.4 * (power || 1);
        sparks.push({
          x: x + Math.cos(a) * Math.random() * 8,
          y: y + Math.sin(a) * Math.random() * 8,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.15,
          life: 0.7 + Math.random() * 0.3
        });
      }
      if (sparks.length > 260) sparks.splice(0, sparks.length - 260);
    }

    function localPoint(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    var target = o.hero ? window : canvas;
    var lastMove = 0;
    target.addEventListener('mousemove', function (e) {
      var t = performance.now();
      if (t - lastMove < 26) return;
      lastMove = t;
      var p = localPoint(e);
      if (p.x < 0 || p.y < 0 || p.x > w || p.y > h) return;
      spawn(p.x, p.y, 2, 0.8);
    }, { passive: true });

    (o.hero ? window : canvas).addEventListener('pointerdown', function (e) {
      var p = localPoint(e);
      if (o.hero) {
        if (p.x < 0 || p.y < 0 || p.x > w || p.y > h) return;
      }
      spawn(p.x, p.y, 16, 1.6);
    });

    new ResizeObserver(function () { resize(); }).observe(canvas);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
        if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
      }, { threshold: 0 }).observe(canvas);
    }

    resize();
    raf = requestAnimationFrame(draw);
  }

  /* ---------------------------------------------------------
     6. 图集灯箱
     --------------------------------------------------------- */
  function initLightbox() {
    var shots = $$('#gallery-grid .shot');
    var box = $('#lightbox'), img = $('#lbImg'), cap = $('#lbCap');
    if (!box || !shots.length) return;
    var idx = 0;

    function open(i) {
      idx = (i + shots.length) % shots.length;
      var fig = shots[idx];
      var src = fig.querySelector('img').getAttribute('src');
      img.src = src;
      img.alt = fig.querySelector('img').alt;
      cap.textContent = fig.dataset.cap || '';
      box.classList.add('on');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('on');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    shots.forEach(function (fig, i) {
      fig.addEventListener('click', function () { open(i); });
    });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function (e) { e.stopPropagation(); open(idx - 1); });
    $('#lbNext').addEventListener('click', function (e) { e.stopPropagation(); open(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(idx - 1);
      if (e.key === 'ArrowRight') open(idx + 1);
    });

    // 触摸滑动
    var sx = 0;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) open(idx + (dx > 0 ? -1 : 1));
    });
  }

  /* ---------------------------------------------------------
     7. 导航 / 进度 / 出现动画
     --------------------------------------------------------- */
  function initChrome() {
    var nav = $('#nav');
    var progress = $('#progress');
    var toggle = $('#navToggle');
    var links = $('#navLinks');

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (nav) nav.classList.toggle('solid', y > 40);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? clamp(y / max, 0, 1) * 100 : 0) + '%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('a', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // 当前区块高亮
    var sections = $$('main section[id]');
    var navA = $$('#navLinks a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          navA.forEach(function (a) {
            a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { io.observe(s); });
    }

    // 滚动出现
    var targets = $$('.reveal, .sec-head, .cond, .sp-card, .shot, .map-panel, .spot-card, .controls, .result, .golden, .warn, .note, .rank, .model, .split-media');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('in'); });
      return;
    }
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var delay = en.target.dataset.delay ? +en.target.dataset.delay : 0;
          setTimeout(function () { en.target.classList.add('in'); }, delay);
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (t, i) {
      if (t.closest('.cond-grid') || t.closest('.gallery') || t.closest('.species')) {
        var sibs = Array.prototype.slice.call(t.parentNode.children);
        t.dataset.delay = String(sibs.indexOf(t) * 70);
      }
      ro.observe(t);
    });
  }

  /* ---------------------------------------------------------
     8. 启动
     --------------------------------------------------------- */
  function boot() {
    buildPins();
    buildSpotList();
    buildControls();
    readInputs();
    renderCalc();
    buildRank();
    bindCalc();
    selectSpot('pingtan', false);

    initSea($('#heroCanvas'), { count: 90, size: 2.2, drift: 0.26, hero: true });
    initSea($('#touchCanvas'), { count: 58, size: 1.7, drift: 0.1, radius: 14 });

    initLightbox();
    initChrome();

    // 初始化时同步输出文本
    $('#oMonth').textContent = state.month + ' 月';
    $('#oTemp').textContent = state.temp + ' ℃';
    $('#oLevel').textContent = state.level + ' 级';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
