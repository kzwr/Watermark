import U from './utils';

class Watermark {
  constructor(el, options) {
    if (options === undefined) {
      if (U.isNode(el)) {
        this.set();
        this.mount(el);
      } else {
        this.set(el);
      }
    } else {
      this.set(options);
      this.mount(el);
    }

    /* this.el = document.querySelector(el); // 节点
    this.textArray = textArray; // 水印数组
    this.font = font; // 字体样式 eg. '26px serif'; 指定字体之后后面的fontsize fontfamily失效
    this.fontsize = fontsize; // 字号
    this.fontFamily = fontFamily; // 字体
    this.width = width; // 画布宽度， 不支持定制
    this.height = height; // 画布高度， 不支持定制
    this.padding = padding; // 水印边距
    this.lineHeight = lineHeight; // 水印行高
    this.rotate = rotate; // 旋转角度 0 - 90' ，弧度表示
    this.fontScale = fontScale; // 半角全角字符宽度比值
    this.color = color; */
  }

  /**
   * [calcute ctx -> draw canvs -> render]
   * @return {[type]} [description]
   */
  draw() {
    this.init();
    this.drawCanvas();
    this.render();
    this.observe();
  }

  mount(el) {
    if (typeof el === 'string') {
      this.$el = document.querySelector(el);
    } else {
      this.$el = el;
    }
    this.draw();
    return this;
  }

  set(options = {}) {
    // eslint-disable-next-line no-param-reassign
    options = Object.assign(options, {
      textArray: ['example'],
      fontSize: 26,
      fontFamily: 'serif',
      padding: 25,
      lineHeight: -1,
      rotate: Math.PI / 6,
      fontScale: 0.5,
      color: '#eeeeee',
    });
    this.options = options;
    return this;
  }


  init() {
    this.initFont(); // 必须先初始化字体
    this.initSize(); // 然后计算画布大小
  }

  /**
   * 初始化字体，计算行高
   */
  initFont() {
    const options = this.options;
    this.options.font = `${options.fontSize}px ${options.fontFamily}`;

    if (options.lineHeight === -1) {
      this.options.lineHeight = 1.25 * options.fontSize;
    }
  }

  /**
   * 计算画布大小
   */
  initSize() {
    const options = this.options;

    // max length of text array
    const maxLength = options.textArray.reduce((max, current) => {
      const currentLength = U.length(current, options.fontScale);
      return currentLength > max ? currentLength : max;
    }, 0);

    // 内容宽高
    const W = maxLength * options.fontSize + options.padding * 2;
    const H = options.textArray.length * options.lineHeight + options.padding * 2;

    const a = Math.abs(options.rotate); // 角度
    // 画布宽高context width => cW, context height => cH
    const ctxW = H * Math.sin(a) + W * Math.cos(a);
    const ctxH = H * Math.cos(a) + W * Math.sin(a);

    this.contentWidth = W;
    this.contentHeight = H;
    this.ctxWidth = Math.floor(ctxW);
    this.ctxHeight = Math.floor(ctxH);
  }

  drawCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.ctxWidth;
    canvas.height = this.ctxHeight;
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const options = this.options;

      ctx.translate(...this.origin(this.rotate));
      ctx.rotate(this.rotate);
      ctx.textAlign = 'start';
      ctx.textBaseline = 'top';
      ctx.font = options.font;
      ctx.fillStyle = options.color;
      const H = this.contentHeight; // 内容高度
      const a = Math.abs(options.rotate); // 旋转角度
      const offsetX = H * Math.cos(a) * Math.sin(a);

      /**
       * 第四象限
       * offsetY = H * Math.sin(a) * Math.sin(a)
       *
       * 第一象限
       * offsetX = H * Math.cos(a) * Math.cos(a)
       *
       * 因此，当 -PI/2 < rotate < PI/2 时
       * (PI/2 + rotate) % PI/2 的值计算正弦值，刚好符合上式
       * 例如，roate = 30, (90 + 30) % 90 = 30, sin(30) = 1/2
       * rotate = -30, (90 + (-30)) % 30 = 60, cos(60) = sin(30)
       */
      const halfPI = Math.PI / 2;
      const tmp = (halfPI + options.rotate) % halfPI;
      const offsetY = -H * Math.sin(tmp) * Math.sin(tmp);
      options.textArray.forEach((text, i) => {
        const x = offsetX + options.padding;
        const y = i * options.lineHeight + offsetY + options.padding;
        ctx.fillText(text, x, y);
      });
      this.canvas = canvas;
    }
  }

  /**
   * 获取坐标原点
   * @param {*} rotate 设置的水印旋转角度
   */
  origin(rotate) {
    let origin = [0, 0]; // 第四象限，定义左上角为坐标原点

    if (rotate < 0 && rotate > -Math.PI / 2) { // 第一象限，定义左下角为坐标原点
      origin = [0, this.height];
    }
    return origin;
  }

  /**
   * 绘制。添加背景到指定节点上
   */
  render() {
    // const dataUrl = this.dataUrlVal || this.dataUrl();
    const dataUrl = this.canvas.toDataURL();
    this.$el.style.background = `url(${dataUrl})`;
    this.background = this.$el.style.background;
  }


  /**
   * 检测节点背景是否发生变化。
   */
  observe() {
    if (this.observer) {
      // remove observer
    }

    const observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((mutation) => {
        const target = mutation.target;
        // 检测背景是否与设置的水印相同
        if (target.style.background !== this.background) {
          target.style.background = this.background;
        }
      });
    });

    observer.observe(this.$el, {
      attributes: true,
      childList: false,
      attributeFilter: ['style'],
    });
    this.observer = observer;
  }
}

export default Watermark;
