// 鼠标特效类
class Cursor {
    constructor() {
        this.pos = { curr: null, prev: null };
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
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        const pointerElements = Array.from(document.querySelectorAll('*'))
            .filter(el => getComputedStyle(el).cursor === "pointer")
            .map(el => el.outerHTML);
        
        this.pt = pointerElements;

        document.body.appendChild(this.scr = document.createElement("style"));
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='rgb(0, 191, 255)'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr?.remove();
        this.cursor.classList.remove("hover", "active");
        this.pos = { curr: null, prev: null };
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    init() {
        const handleEvent = (type, action) => {
            document[`on${type}`] = e => {
                if (this.pt.includes(e.target.outerHTML)) {
                    action(e);
                }
            };
        };

        handleEvent('mouseover', () => this.cursor.classList.add("hover"));
        handleEvent('mouseout', () => this.cursor.classList.remove("hover"));
        
        document.onmousemove = e => {
            if (!this.pos.curr) this.move(e.clientX - 8, e.clientY - 8);
            this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
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

// 数学工具函数（鼠标效果依赖）
Math.lerp = (a, b, n) => (1 - n) * a + n * b;

// 初始化鼠标特效
window.CURSOR = new Cursor();

// Pjax兼容处理
document.addEventListener('pjax:complete', () => {
    if (window.CURSOR) window.CURSOR.refresh();
});