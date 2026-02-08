// 数学工具函数
Math.lerp = (a, b, n) => (1 - n) * a + n * b;

// 鼠标特效类
class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style.left = `${left}px`;
        this.cursor.style.top = `${top}px`;
    }

    create() {
        // 先移除可能存在的旧鼠标元素
        const oldCursor = document.getElementById('cursor');
        if (oldCursor) oldCursor.remove();
        
        const oldStyle = document.querySelector('style[data-cursor-style]');
        if (oldStyle) oldStyle.remove();

        this.cursor = document.createElement("div");
        this.cursor.id = "cursor";
        this.cursor.classList.add("hidden");
        document.body.append(this.cursor);

        const pointerElements = Array.from(document.querySelectorAll('*'))
            .filter(el => getComputedStyle(el).cursor === "pointer")
            .map(el => el.outerHTML);
        
        this.pt = pointerElements;

        this.scr = document.createElement("style");
        this.scr.setAttribute('data-cursor-style', 'true');
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='rgb(0, 191, 255)'/></svg>") 4 4, auto}`;
        document.body.appendChild(this.scr);
    }

    destroy() {
        // 清理所有事件监听器
        document.onmouseover = null;
        document.onmouseout = null;
        document.onmousemove = null;
        document.onmouseenter = null;
        document.onmouseleave = null;
        document.onmousedown = null;
        document.onmouseup = null;
        
        // 移除元素
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        
        if (this.scr && this.scr.parentNode) {
            this.scr.parentNode.removeChild(this.scr);
        }
        
        // 重置属性
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.cursor = null;
        this.scr = null;
    }

    refresh() {
        this.destroy();
        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove = e => {
            if (!this.pos.curr) this.move(e.clientX - 8, e.clientY - 8);
            this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8};
            this.cursor.classList.remove("hidden");
        };
        document.onmouseenter = () => this.cursor.classList.remove("hidden");
        document.onmouseleave = () => this.cursor.classList.add("hidden");
        document.onmousedown = () => this.cursor.classList.add("active");
        document.onmouseup = () => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

// 星空背景特效
function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var n, e, i, h, t = .05, s = document.getElementById("universe"), o = !0, a = "180,184,240", r = "226,225,142", d = "226,225,224", c = [];
    function f() {
        n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
    }
    function u() {
        h.clearRect(0, 0, n, e);
        for (var t = c.length, i = 0; i < t; i++) {
            var s = c[i];
            s.move(), s.fadeIn(), s.fadeOut(), s.draw()
        }
    }
    function y() {
        this.reset = function() {
            this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
        }, this.fadeIn = function() {
            this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
        }, this.fadeOut = function() {
            this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
        }, this.draw = function() {
            if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
            else if (this.comet) {
                h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
                for (var t = 0; t < 30; t++) h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
            } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
            h.closePath(), h.fill()
        }, this.move = function() {
            this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
        }, setTimeout(function() {
            o = !1
        }, 50)
    }
    function m(t) {
        return Math.floor(1e3 * Math.random()) + 1 < 10 * t
    }
    function l(t, i) {
        return Math.random() * (i - t) + t
    }
    f(), window.addEventListener("resize", f, !1), function() {
        h = s.getContext("2d");
        for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
        u()
    }(), function t() {
        document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
    }()
}

// 表情放大功能
function owoBig() {
    let flag = 1, owo_time = '', m = 3;
    
    // 移除可能存在的旧元素
    const oldOwo = document.getElementById('owo-big');
    if (oldOwo) oldOwo.remove();
    
    let div = document.createElement('div'), body = document.querySelector('body');
    div.id = 'owo-big';
    body.appendChild(div);

    let observer = new MutationObserver(mutations => {
        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes, owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            else continue;
            
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            owo_body.onmouseover = (e) => {
                if (flag && e.target.tagName == 'IMG') {
                    flag = 0;
                    owo_time = setTimeout(() => {
                        let height = e.target.clientHeight * m, width = e.target.clientWidth * m, left = (e.x - e.offsetX) - (width - e.target.clientWidth) / 2, top = e.y - e.offsetY;
                        if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10);
                        if (left < 0) left = 10;
                        div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                        div.innerHTML = `<img src="${e.target.src}">`
                    }, 300);
                }
            };
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }
    });
    
    const postComment = document.getElementById('post-comment');
    if (postComment) {
        observer.observe(postComment, { subtree: true, childList: true });
    }
}

// 防抖函数
let TT = null;
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
                this.$notify({
                    title: "哎嘿！复制成功🍬",
                    message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }, 300);
});

// 分享功能
function share_() {
    let url = window.location.origin + window.location.pathname;
    try {
        var title = document.title;
        var subTitle = title.endsWith("| mccsjs🍋") ? title.substring(0, title.length - 14) : title;
        navigator.clipboard.writeText('mccsjs🍋的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎欢迎！🍧🍧');
        new Vue({
            data: function () {
                this.$notify({
                    title: "成功复制分享信息🎉",
                    message: "您现在可以通过粘贴直接跟小伙伴分享了！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success", 
                    duration: 5000
                });
            }
        })
    } catch (err) {
        console.error('复制失败！', err);
    }
}
function share() {
    debounce(share_, 300);
}

// 欢迎信息功能
class WelcomeMessage {
    constructor() {
        this.ipLocation = null;
        this.init();
    }

    async init() {
        await this.fetchIPLocation();
        this.showWelcome();
        this.setupEventListeners();
    }

    async fetchIPLocation() {
        try {
            const response = await $.ajax({
                type: 'get',
                url: 'https://apis.map.qq.com/ws/location/v1/ip',
                data: {
                    key: 'MDKBZ-U7H6J-FBJFY-KD2ON-BDRI5-LIB5L',
                    output: 'jsonp',
                },
                dataType: 'jsonp'
            });
            this.ipLocation = response;
        } catch (error) {
            console.error('获取IP位置失败:', error);
        }
    }

    getDistance(e1, n1, e2, n2) {
        const R = 6371;
        const { sin, cos, asin, PI, hypot } = Math;
        const getPoint = (e, n) => {
            e *= PI / 180;
            n *= PI / 180;
            return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
        };
        const a = getPoint(e1, n1);
        const b = getPoint(e2, n2);
        const c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        return Math.round(asin(c / 2) * 2 * R);
    }

    getLocationDescription() {
        if (!this.ipLocation?.result) return { pos: '未知', desc: '欢迎来访！' };
        const { nation, province, city, district } = this.ipLocation.result.ad_info;
        let pos = nation;
        let desc = '带我去你的国家逛逛吧。';
        const locationDescriptions = {
            '日本': 'よろしく，一起去看樱花吗',
            '美国': 'Let us live in peace!',
            '英国': '想同你一起夜乘伦敦眼',
            '俄罗斯': '干了这瓶伏特加！',
            '法国': 'C\'est La Vie',
            '德国': 'Die Zeit verging im Fluge.',
            '澳大利亚': '一起去大堡礁吧！',
            '加拿大': '拾起一片枫叶赠予你',
            '中国': this.getChinaDescription(province, city)
        };
        if (nation === '中国') {
            pos = `${province} ${city} ${district}`;
            desc = locationDescriptions.中国;
        } else if (locationDescriptions[nation]) {
            desc = locationDescriptions[nation];
        }
        return { pos, desc };
    }

    getChinaDescription(province, city) {
        const descriptions = {
            '北京市': '北——京——欢迎你~~~',
            '天津市': '讲段相声吧。',
            '河北省': '山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。',
            '山西省': '展开坐具长三尺，已占山河五百余。',
            '内蒙古自治区': '天苍苍，野茫茫，风吹草低见牛羊。',
            '辽宁省': '我想吃烤鸡架！',
            '吉林省': '状元阁就是东北烧烤之王。',
            '黑龙江省': '很喜欢哈尔滨大剧院。',
            '上海市': '众所周知，中国只有两个城市。',
            '江苏省': this.getJiangsuDescription(city),
            '浙江省': '东风渐绿西湖柳，雁已还人未南归。',
            '安徽省': '蚌埠住了，芜湖起飞。',
            '福建省': '井邑白云间，岩城远带山。',
            '江西省': '落霞与孤鹜齐飞，秋水共长天一色。',
            '山东省': '遥望齐州九点烟，一泓海水杯中泻。',
            '湖北省': '来碗热干面！',
            '湖南省': '74751，长沙斯塔克。',
            '广东省': '老板来两斤福建人。',
            '广西壮族自治区': '桂林山水甲天下。',
            '海南省': '朝观日出逐白浪，夕看云起收霞光。',
            '四川省': '康康川妹子。',
            '贵州省': '茅台，学生，再塞200。',
            '云南省': '玉龙飞舞云缠绕，万仞冰川直耸天。',
            '西藏自治区': '躺在茫茫草原上，仰望蓝天。',
            '陕西省': '来份臊子面加馍。',
            '甘肃省': '羌笛何须怨杨柳，春风不度玉门关。',
            '青海省': '牛肉干和老酸奶都好好吃。',
            '宁夏回族自治区': '大漠孤烟直，长河落日圆。',
            '新疆维吾尔自治区': '驼铃古道丝绸路，胡马犹闻唐汉风。',
            '台湾省': '我在这头，大陆在那头。',
            '香港特别行政区': '永定贼有残留地鬼嚎，迎击光非岁玉。',
            '澳门特别行政区': '性感荷官，在线发牌。'
        };
        return descriptions[province] || '带我去你的城市逛逛吧！';
    }

    getJiangsuDescription(city) {
        const cityDescriptions = {
            '南京市': '这是我挺想去的城市啦。',
            '苏州市': '上有天堂，下有苏杭。'
        };
        return cityDescriptions[city] || '散装是必须要散装的。';
    }

    getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "<span>上午好</span>，一日之计在于晨！";
        if (hour >= 11 && hour < 13) return "<span>中午好</span>，该摸鱼吃午饭了。";
        if (hour >= 13 && hour < 15) return "<span>下午好</span>，懒懒地睡个午觉吧！";
        if (hour >= 15 && hour < 16) return "<span>三点几啦</span>，一起饮茶呀！";
        if (hour >= 16 && hour < 19) return "<span>夕阳无限好！</span>";
        if (hour >= 19 && hour < 24) return "<span>晚上好</span>，夜生活嗨起来！";
        return "夜深了，早点休息，少熬夜。";
    }

    showWelcome() {
        if (!this.ipLocation?.result) return;
        const { pos, desc } = this.getLocationDescription();
        const dist = this.getDistance(118.59232127, 32.78868157, 
            this.ipLocation.result.location.lng, this.ipLocation.result.location.lat);
        const timeChange = this.getTimeGreeting();
        const ip = this.ipLocation.result.ip;
        try {
            document.getElementById("welcome-info").innerHTML = 
                `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${desc}</b>`;
        } catch (err) {}
    }

    setupEventListeners() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.showWelcome());
        } else {
            this.showWelcome();
        }
        document.addEventListener('pjax:complete', () => this.showWelcome());
    }
}

// 友链状态检测
class LinkStatusChecker {
    constructor() {
        this.retryCount = 0;
        this.MAX_RETRIES = 3;
        this.STATUS_URL = 'https://link.seln.cn/status.json';
        this.init();
    }

    init() {
        if (this.hasVolantisLinkCards()) {
            this.injectStatusIndicators();
            this.fetchAndUpdateStatus();
        } else {
            setTimeout(() => this.init(), 100);
        }
    }

    hasVolantisLinkCards() {
        return document.querySelector('.volantis-flink-list');
    }

    injectStatusIndicators() {
        const linkCards = document.querySelectorAll('.volantis-flink-list .site-card');
        linkCards.forEach(card => {
            if (card.querySelector('.site-card-status')) return;
            const nameEl = card.querySelector('.info .title, .title');
            const linkName = nameEl?.textContent.trim() || card.getAttribute('title') || '未知网站';
            const linkUrl = card.href;
            const statusEl = document.createElement('div');
            statusEl.className = 'site-card-status status-loading';
            statusEl.setAttribute('data-name', linkName);
            statusEl.setAttribute('data-url', linkUrl);
            statusEl.textContent = '...';
            card.appendChild(statusEl);
            if (getComputedStyle(card).position === 'static') {
                card.style.position = 'relative';
            }
        });
    }

    async fetchLinkStatus() {
        const response = await fetch(this.STATUS_URL);
        if (!response.ok) throw new Error('网络请求失败');
        return await response.json();
    }

    updateLinkStatus(data) {
        if (!data?.link_status) throw new Error('无效的状态数据');
        const statusMap = {};
        data.link_status.forEach(link => {
            statusMap[link.name] = link;
        });
        document.querySelectorAll('.site-card-status').forEach(el => {
            const linkName = el.getAttribute('data-name');
            const status = statusMap[linkName] || { success: false, latency: -1 };
            this.updateStatusElement(el, status);
        });
    }

    updateStatusElement(element, status) {
        let statusClass, statusText;
        if (!status.success || status.latency === -1) {
            statusClass = 'status-error';
            const errorCount = status.error_count || 0;
            statusText = errorCount > 0 ? errorCount + '!' : '!';
        } else {
            statusClass = status.latency <= 3 ? 'status-normal' : 'status-slow';
            statusText = status.latency + 's';
        }
        element.className = 'site-card-status ' + statusClass;
        element.textContent = statusText;
    }

    handleError() {
        this.retryCount++;
        if (this.retryCount <= this.MAX_RETRIES) {
            setTimeout(() => this.fetchAndUpdateStatus(), 2000 * this.retryCount);
        } else {
            document.querySelectorAll('.site-card-status.status-loading').forEach(el => {
                el.className = 'site-card-status status-error';
                el.textContent = '!';
            });
        }
    }

    async fetchAndUpdateStatus() {
        try {
            const data = await this.fetchLinkStatus();
            this.updateLinkStatus(data);
        } catch (error) {
            this.handleError();
        }
    }
}

// 友链状态检测样式
function addLinkStatusStyles() {
    if (document.querySelector('#link-status-styles')) return;
    const css = `
.volantis-flink-list .site-card { position: relative; }
.volantis-flink-list .site-card-status {
    position: absolute; top: 4px; left: 4px; z-index: 10;
    padding: 2px 6px; border-radius: 12px; font-size: 10px;
    font-weight: 600; color: #fff; background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px); transition: all 0.3s ease;
    min-width: 24px; text-align: center; box-sizing: border-box;
    line-height: 1.2;
}
.volantis-flink-list .site-card-status.status-loading {
    background-color: rgba(100, 100, 100, 0.8); animation: pulse 1.5s infinite;
}
.volantis-flink-list .site-card-status.status-normal {
    background-color: rgba(82, 196, 26, 0.9);
}
.volantis-flink-list .site-card-status.status-slow {
    background-color: rgba(250, 173, 20, 0.9);
}
.volantis-flink-list .site-card-status.status-error {
    background-color: rgba(255, 77, 79, 0.9);
}
@keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
}
[data-theme="dark"] .volantis-flink-list .site-card-status {
    background-color: rgba(255, 255, 255, 0.1); color: #fff;
}
[data-theme="dark"] .volantis-flink-list .site-card-status.status-loading {
    background-color: rgba(100, 100, 100, 0.8);
}
[data-theme="dark"] .volantis-flink-list .site-card-status.status-normal {
    background-color: rgba(82, 196, 26, 0.8);
}
[data-theme="dark"] .volantis-flink-list .site-card-status.status-slow {
    background-color: rgba(250, 173, 20, 0.8);
}
[data-theme="dark"] .volantis-flink-list .site-card-status.status-error {
    background-color: rgba(255, 77, 79, 0.8);
}`;
    const style = document.createElement('style');
    style.id = 'link-status-styles';
    style.textContent = css;
    document.head.appendChild(style);
}

// 瀑布流布局
function waterfall(a) {
    function b(a, b) {
        var c = window.getComputedStyle(b);
        return parseFloat(c["margin" + a]) || 0;
    }
    function c(a) {
        return a + "px";
    }
    function d(a) {
        return parseFloat(a.style.top);
    }
    function e(a) {
        return parseFloat(a.style.left);
    }
    function f(a) {
        return a.clientWidth;
    }
    function g(a) {
        return a.clientHeight;
    }
    function h(a) {
        return d(a) + g(a) + b("Bottom", a);
    }
    function i(a) {
        return e(a) + f(a) + b("Right", a);
    }
    function j(a) {
        a = a.sort(function (a, b) {
            return h(a) === h(b) ? e(b) - e(a) : h(b) - h(a);
        });
    }
    function k(b) {
        f(a) != t && (b.target.removeEventListener(b.type, arguments.callee), waterfall(a));
    }
    "string" == typeof a && (a = document.querySelector(a));
    var l = [].map.call(a.children, function (a) {
        return (a.style.position = "absolute"), a;
    });
    a.style.position = "relative";
    var m = [];
    l.length && ((l[0].style.top = "0px"), (l[0].style.left = c(b("Left", l[0]))), m.push(l[0]));
    for (var n = 1; n < l.length; n++) {
        var o = l[n - 1], p = l[n], q = i(o) + f(p) <= f(a);
        if (!q) break;
        (p.style.top = o.style.top), (p.style.left = c(i(o) + b("Left", p))), m.push(p);
    }
    for (; n < l.length; n++) {
        j(m);
        var p = l[n], r = m.pop();
        (p.style.top = c(h(r) + b("Top", p))), (p.style.left = c(e(r))), m.push(p);
    }
    j(m);
    var s = m[0];
    a.style.height = c(h(s) + b("Bottom", s));
    var t = f(a);
    window.addEventListener ? window.addEventListener("resize", k) : (document.body.onresize = k);
}

// 时间计算器
function createTimeCounter() {
    const startTime = new Date("2023-01-22 08:00:00");
    function updateTime() {
        const now = new Date();
        const timeDiff = now - startTime;
        const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const formatNumber = (num) => num.toString().padStart(2, '0');
        let timeText;
        if (years > 0) {
            timeText = `本站居然运行了${years}年${days}天${formatNumber(hours)}小时${formatNumber(minutes)}分${formatNumber(seconds)}秒`
        } else {
            timeText = `本站居然运行了${totalDays}天${formatNumber(hours)}小时${formatNumber(minutes)}分${formatNumber(seconds)}秒`
        }
        const currentTimeHtml = `<div style="font-size:13px;font-weight:bold">${timeText}<i id="heartbeat"class="fas fa-heartbeat"></i></div>`;
        const workboard = document.getElementById("workboard");
        if (workboard) {
            workboard.innerHTML = currentTimeHtml
        }
    }
    updateTime();
    setInterval(updateTime, 1000)
}

// Pace进度条
!function() {
    function o(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    var u, c, i, s, n, y, t, l, v, r, a, p, e, h, w, b, f, g, d, m, k, S, q, L, x, P, T, R, j, O, E, M, A, C, N, _, F, U, W, X, D, H, I, z, G, B, J = [].slice,
        K = {}.hasOwnProperty,
        Q = function(t, e) {
            for (var n in e) K.call(e, n) && (t[n] = e[n]);
            function r() {
                this.constructor = t
            }
            return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
        },
        V = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    function Y() {}
    for (g = {
            className: "",
            catchupTime: 100,
            initialRate: .03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: {
                checkInterval: 100,
                selectors: ["body"]
            },
            eventLag: {
                minSamples: 10,
                sampleCount: 3,
                lagThreshold: 3
            },
            ajax: {
                trackMethods: ["GET"],
                trackWebSockets: !0,
                ignoreURLs: []
            }
        }, P = function() {
            var t;
            return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
        }, R = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, f = window.cancelAnimationFrame || window.mozCancelAnimationFrame, p = function(t, e, n) {
            if ("function" == typeof t.addEventListener) return t.addEventListener(e, n, !1);
            var r;
            "function" != typeof t["on" + e] || "object" != typeof t["on" + e].eventListeners ? (r = new s, "function" == typeof t["on" + e] && r.on(e, t["on" + e]), t["on" + e] = function(t) {
                return r.trigger(e, t)
            }, t["on" + e].eventListeners = r) : r = t["on" + e].eventListeners, r.on(e, n)
        }, null == R && (R = function(t) {
            return setTimeout(t, 50)
        }, f = function(t) {
            return clearTimeout(t)
        }), O = function(e) {
            var n = P(),
                r = function() {
                    var t = P() - n;
                    return 33 <= t ? (n = P(), e(t, function() {
                        return R(r)
                    })) : setTimeout(r, 33 - t)
                };
            return r()
        }, j = function() {
            var t = arguments[0], e = arguments[1], n = 3 <= arguments.length ? J.call(arguments, 2) : [];
            return "function" == typeof t[e] ? t[e].apply(t, n) : t[e]
        }, d = function() {
            for (var t, e, n, r = arguments[0], s = 2 <= arguments.length ? J.call(arguments, 1) : [], o = 0, i = s.length; o < i; o++)
                if (e = s[o])
                    for (t in e) K.call(e, t) && (n = e[t], null != r[t] && "object" == typeof r[t] && null != n && "object" == typeof n ? d(r[t], n) : r[t] = n);
            return r
        }, h = function(t) {
            for (var e, n, r = e = 0, s = 0, o = t.length; s < o; s++) n = t[s], r += Math.abs(n), e++;
            return r / e
        }, k = function(t, e) {
            var n, r;
            if (null == t && (t = "options"), null == e && (e = !0), r = document.querySelector("[data-pace-" + t + "]")) {
                if (n = r.getAttribute("data-pace-" + t), !e) return n;
                try {
                    return JSON.parse(n)
                } catch (t) {
                    return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", t) : void 0
                }
            }
        }, Y.prototype.on = function(t, e, n, r) {
            var s;
            return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
                handler: e,
                ctx: n,
                once: r
            })
        }, Y.prototype.once = function(t, e, n) {
            return this.on(t, e, n, !0)
        }, Y.prototype.off = function(t, e) {
            var n, r, s;
            if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
                if (null == e) return delete this.bindings[t];
                for (n = 0, s = []; n < this.bindings[t].length;) this.bindings[t][n].handler === e ? s.push(this.bindings[t].splice(n, 1)) : s.push(n++);
                return s
            }
        }, Y.prototype.trigger = function() {
            var t, e, n, r, s, o, i = arguments[0], a = 2 <= arguments.length ? J.call(arguments, 1) : [];
            if (null != (r = this.bindings) && r[i]) {
                for (n = 0, o = []; n < this.bindings[i].length;) e = (s = this.bindings[i][n]).handler, t = s.ctx, s = s.once, e.apply(null != t ? t : this, a), s ? o.push(this.bindings[i].splice(n, 1)) : o.push(n++);
                return o
            }
        }, B = Y, y = window.Pace || {}, window.Pace = y, d(y, B.prototype), T = y.options = d({}, g, window.paceOptions, k()), X = 0, H = (z = ["ajax", "document", "eventLag", "elements"]).length; X < H; X++) !0 === T[C = z[X]] && (T[C] = g[C]);
    function Z() {
        return Z.__super__.constructor.apply(this, arguments)
    }
    function $() {
        this.progress = 0
    }
    function tt() {
        this.bindings = {}
    }
    function et() {
        var e, o = this;
        et.__super__.constructor.apply(this, arguments), e = function(r) {
            var s = r.open;
            return r.open = function(t, e, n) {
                return A(t) && o.trigger("request", {
                    type: t,
                    url: e,
                    request: r
                }), s.apply(r, arguments)
            }
        }, window.XMLHttpRequest = function(t) {
            t = new W(t);
            return e(t), t
        };
        try {
            m(window.XMLHttpRequest, W)
        } catch (t) {}
        if (null != U) {
            window.XDomainRequest = function() {
                var t = new U;
                return e(t), t
            };
            try {
                m(window.XDomainRequest, U)
            } catch (t) {}
        }
        if (null != F && T.ajax.trackWebSockets) {
            window.WebSocket = function(t, e) {
                var n = null != e ? new F(t, e) : new F(t);
                return A("socket") && o.trigger("request", {
                    type: "socket",
                    url: t,
                    protocols: e,
                    request: n
                }), n
            };
            try {
                m(window.WebSocket, F)
            } catch (t) {}
        }
    }
    function nt() {
        this.complete = o(this.complete, this);
        var t = this;
        this.elements = [], S().on("request", function() {
            return t.watch.apply(t, arguments)
        })
    }
    function rt(t) {
        var e, n, r, s;
        for (null == t && (t = {}), this.complete = o(this.complete, this), this.elements = [], null == t.selectors && (t.selectors = []), n = 0, r = (s = t.selectors).length; n < r; n++) e = s[n], this.elements.push(new i(e, this.complete))
    }
    function st(t, e) {
        this.selector = t, this.completeCallback = e, this.progress = 0, this.check()
    }
    function ot() {
        var t, e, n = this;
        this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
            return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
        }
    }
    function it(t) {
        this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = j(this.source, "progress"))
    }
    B = Error, Q(Z, B), n = Z, $.prototype.getElement = function() {
        var t;
        if (null == this.el) {
            if (!(t = document.querySelector(T.target))) throw new n;
            this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/(pace-done )|/, "pace-running ");
            var e = "" !== T.className ? " " + T.className : "";
            this.el.innerHTML = '<div class="pace-progress' + e + '">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
        }
        return this.el
    }, $.prototype.finish = function() {
        var t = this.getElement();
        return t.className = t.className.replace("pace-active", "pace-inactive"), document.body.className = document.body.className.replace("pace-running ", "pace-done ")
    }, $.prototype.update = function(t) {
        return this.progress = t, y.trigger("progress", t), this.render()
    }, $.prototype.destroy = function() {
        try {
            this.getElement().parentNode.removeChild(this.getElement())
        } catch (t) {
            n = t
        }
        return this.el = void 0
    }, $.prototype.render = function() {
        var t, e, n, r, s, o, i;
        if (null == document.querySelector(T.target)) return !1;
        for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", s = 0, o = (i = ["webkitTransform", "msTransform", "transform"]).length; s < o; s++) e = i[s], t.children[0].style[e] = r;
        return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), y.trigger("change", this.progress), this.lastRenderedProgress = this.progress
    }, $.prototype.done = function() {
        return 100 <= this.progress
    }, c = $, tt.prototype.trigger = function(t, e) {
        var n, r, s, o, i;
        if (null != this.bindings[t]) {
            for (i = [], r = 0, s = (o = this.bindings[t]).length; r < s; r++) n = o[r], i.push(n.call(this, e));
            return i
        }
    }, tt.prototype.on = function(t, e) {
        var n;
        return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
    }, s = tt, W = window.XMLHttpRequest, U = window.XDomainRequest, F = window.WebSocket, m = function(t, e) {
        var n, r = [];
        for (n in e.prototype) try {
            null == t[n] && "function" != typeof e[n] ? "function" == typeof Object.defineProperty ? r.push(Object.defineProperty(t, n, {
                get: function(t) {
                    return function() {
                        return e.prototype[t]
                    }
                }(n),
                configurable: !0,
                enumerable: !0
            })) : r.push(t[n] = e.prototype[n]) : r.push(void 0)
        } catch (t) {
            0
        }
        return r
    }, L = [], y.ignore = function() {
        var t = arguments[0], e = 2 <= arguments.length ? J.call(arguments, 1) : [];
        return L.unshift("ignore"), e = t.apply(null, e), L.shift(), e
    }, y.track = function() {
        var t = arguments[0], e = 2 <= arguments.length ? J.call(arguments, 1) : [];
        return L.unshift("track"), e = t.apply(null, e), L.shift(), e
    }, A = function(t) {
        if (null == t && (t = "GET"), "track" === L[0]) return "force";
        if (!L.length && T.ajax) {
            if ("socket" === t && T.ajax.trackWebSockets) return !0;
            if (t = t.toUpperCase(), 0 <= V.call(T.ajax.trackMethods, t)) return !0
        }
        return !1
    }, Q(et, s), t = et, D = null, M = function(t) {
        for (var e, n = T.ajax.ignoreURLs, r = 0, s = n.length; r < s; r++)
            if ("string" == typeof(e = n[r])) {
                if (-1 !== t.indexOf(e)) return !0
            } else if (e.test(t)) return !0;
        return !1
    }, (S = function() {
        return D = null == D ? new t : D
    })().on("request", function(t) {
        var o, i = t.type, a = t.request, e = t.url;
        if (!M(e)) return y.running || !1 === T.restartOnRequestAfter && "force" !== A(i) ? void 0 : (o = arguments, "boolean" == typeof(e = T.restartOnRequestAfter || 0) && (e = 0), setTimeout(function() {
            var t, e, n, r, s = "socket" === i ? a.readyState < 1 : 0 < (s = a.readyState) && s < 4;
            if (s) {
                for (y.restart(), r = [], t = 0, e = (n = y.sources).length; t < e; t++) {
                    if ((C = n[t]) instanceof u) {
                        C.watch.apply(C, o);
                        break
                    }
                    r.push(void 0)
                }
                return r
            }
        }, e))
    }), nt.prototype.watch = function(t) {
        var e = t.type, n = t.request, t = t.url;
        if (!M(t)) return n = new("socket" === e ? r : a)(n, this.complete), this.elements.push(n)
    }, nt.prototype.complete = function(e) {
        return this.elements = this.elements.filter(function(t) {
            return t !== e
        })
    }, u = nt, a = function(e, n) {
        var t, r, s, o, i = this;
        if (this.progress = 0, null != window.ProgressEvent)
            for (p(e, "progress", function(t) {
                    return t.lengthComputable ? i.progress = 100 * t.loaded / t.total : i.progress = i.progress + (100 - i.progress) / 2
                }), t = 0, r = (o = ["load", "abort", "timeout", "error"]).length; t < r; t++) p(e, o[t], function() {
                return n(i), i.progress = 100
            });
        else s = e.onreadystatechange, e.onreadystatechange = function() {
            var t;
            return 0 === (t = e.readyState) || 4 === t ? (n(i), i.progress = 100) : 3 === e.readyState && (i.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0
        }
    }, r = function(t, e) {
        for (var n, r = this, s = this.progress = 0, o = (n = ["error", "open"]).length; s < o; s++) p(t, n[s], function() {
            return e(r), r.progress = 100
        })
    }, rt.prototype.complete = function(e) {
        return this.elements = this.elements.filter(function(t) {
            return t !== e
        })
    }, k = rt, st.prototype.check = function() {
        var t = this;
        return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
            return t.check()
        }, T.elements.checkInterval)
    }, st.prototype.done = function() {
        return this.completeCallback(this), this.completeCallback = null, this.progress = 100
    }, i = st, ot.prototype.states = {
        loading: 0,
        interactive: 50,
        complete: 100
    }, B = ot, Q = function() {
        var e, n, r, s, o, i = this;
        this.progress = 0, o = [], s = 0, r = P(), n = setInterval(function() {
            var t = P() - r - 50;
            return r = P(), o.push(t), o.length > T.eventLag.sampleCount && o.shift(), e = h(o), ++s >= T.eventLag.minSamples && e < T.eventLag.lagThreshold ? (i.progress = 100, clearInterval(n)) : i.progress = 3 / (e + 3) * 100
        }, 50)
    }, it.prototype.tick = function(t, e) {
        return 100 <= (e = null == e ? j(this.source, "progress") : e) && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), e = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += e * this.rate * t, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
    }, v = it, b = e = _ = w = E = N = null, y.running = !1, q = function() {
        if (T.restartOnPushState) return y.restart()
    }, null != window.history.pushState && (I = window.history.pushState, window.history.pushState = function() {
        return q(), I.apply(window.history, arguments)
    }), null != window.history.replaceState && (G = window.history.replaceState, window.history.replaceState = function() {
        return q(), G.apply(window.history, arguments)
    }), l = {
        ajax: u,
        elements: k,
        document: B,
        eventLag: Q
    }, (x = function() {
        var t, e, n, r, s, o, i, a;
        for (y.sources = N = [], e = 0, r = (o = ["ajax", "elements", "document", "eventLag"]).length; e < r; e++) !1 !== T[t = o[e]] && N.push(new l[t](T[t]));
        for (n = 0, s = (a = null != (i = T.extraSources) ? i : []).length; n < s; n++) C = a[n], N.push(new C(T));
        return y.bar = w = new c, E = [], _ = new v
    })(), y.stop = function() {
        return y.trigger("stop"), y.running = !1, w.destroy(), b = !0, null != e && ("function" == typeof f && f(e), e = null), x()
    }, y.restart = function() {
        return y.trigger("restart"), y.stop(), y.start()
    }, y.go = function() {
        var m;
        return y.running = !0, w.render(), m = P(), b = !1, e = O(function(t, e) {
            w.progress;
            for (var n, r, s, o, i, a, u, c, l, p, h = a = 0, f = !0, g = u = 0, d = N.length; u < d; g = ++u)
                for (C = N[g], i = null != E[g] ? E[g] : E[g] = [], s = c = 0, l = (r = null != (p = C.elements) ? p : [C]).length; c < l; s = ++c) o = r[s], f &= (o = null != i[s] ? i[s] : i[s] = new v(o)).done, o.done || (h++, a += o.tick(t));
            return n = a / h, w.update(_.tick(t, n)), w.done() || f || b ? (w.update(100), y.trigger("done"), setTimeout(function() {
                return w.finish(), y.running = !1, y.trigger("hide")
            }, Math.max(T.ghostTime, Math.max(T.minTime - (P() - m), 0)))) : e()
        })
    }, y.start = function(t) {
        d(T, t), y.running = !0;
        try {
            w.render()
        } catch (t) {
            n = t
        }
        return document.querySelector(".pace") ? (y.trigger("start"), y.go()) : setTimeout(y.start, 50)
    }
}();

// 初始化函数
function initializeFeatures() {
    // 星空背景
    dark();
    
    // 鼠标特效
    if (window.CURSOR) {
        window.CURSOR.destroy();
    }
    window.CURSOR = new Cursor();
    
    // 表情放大
    if (document.getElementById('post-comment')) {
        owoBig();
    }
    
    // 欢迎信息
    new WelcomeMessage();
    
    // 友链状态检测
    addLinkStatusStyles();
    new LinkStatusChecker();
    
    // 时间计数器
    createTimeCounter();
}

// 事件监听
document.addEventListener('DOMContentLoaded', initializeFeatures);
document.addEventListener('pjax:complete', () => {
    initializeFeatures();
});
document.addEventListener('themechange', addLinkStatusStyles);

// 初始执行
initializeFeatures();

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
    var nameContainer = document.querySelector("#nav #name-container");
	var menusItems = document.querySelector("#nav .menus_items");
    var position = $(window).scrollTop();

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > position + 5) {
            nameContainer.classList.add("visible");
            menusItems.classList.remove("visible");
        } else if  (scroll < position - 5){
            nameContainer.classList.remove("visible");
            menusItems.classList.add("visible");
        }

        position = scroll;
    });

    // 初始化 page-name
    document.getElementById("page-name").innerText = document.title.split(" | LiuShen's Blog")[0];
}
