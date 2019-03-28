# Introduction

Watermark is a simple and quick library to draw watermark in where you want to.

```javascript
new Watermark().set({
  // some options
}).mount('body').draw().destory();
```

```javascript
new Watermark('body', {
  textArray: ['Hello, world!'],
  rotate: Math.PI / 6,
  color: #aaa
}).draw();
```

# Get Started

## Installatin

```console
yarn add tyx1703@watermark
```

## API

### constructor([el, [options]])
- *Arguments:*
    - `el {String | HTMLElement}[''] selector or html element`
    - `options {Object}[{...}] options for watermark`
      - `textArray {Array}[['example']] text list to display`
      - `fontSize {Number}[26] font size`
      - `fontFamily {String}['serif'] font family`
      - `padding {Number}[25] watermark wrapper padding with text`
      - `lineHeight {Number}[-1] text line height`
      - `rotate {Number}[0] the angle of rotate, must in range of (-PI/2, PI/2)`
      - `fontScale {Number}[0.5] Half-width and full-width fonts width ratio`
      - `color {String}['#eeeeee'] text color`
- *Example:*
    - ```javascript
      new Watermark()
      ```
    - ``` javascript
      new Watermark('body', {
        textArray: [
          'example',
          '你好，欢迎使用',
          'Hello, 世界'
        ],
        fontSize: 16,
      });
      ```
### mount(el)

- *Arguments:*
    - `el {String | HTMLElement} selector or html element`
- *Usage:*
    
    If a watermark instance not mount any element when is was created, you can use `mount` function to mount a element for it.

- *Example:*
    - ```javascript
      const watermark = new Watermark({
        color: '#cccccc'
      }); // create a instance of Watermark
      watermark.mount('body');  // mount to document.body
      // watermark.draw();  // dont fotget to use draw to display on mounted element
      ```
### set(options)

- *Arguments:*
    - `options {Object}[{...}] options for watermark`

- *Usage:*

    It's default value is same as `constructor`
    You can use `set` function to re-configurate watermark style

- *Example:*
    - ```javascript
        const watermark = new Watermark('body', {
          // your options
        });
        // if you want to re-configurate
        watermark.set({
          // your new options
        });
        // watermark.draw();  must use draw to display
      ```

### draw()

- *Usage:*

    use this function to render watermark on the mounted element.

- *Example:*
    - ```javascript
      new Watermark('body').draw();
      ```
    - ```javascript
      new Watermark().set().mount().draw();
      ```
    - ```javascript
      new Watermark('body').set().draw();
      ```
      
### destory()

- *Usage:*

    - unmount element
    - disconnect mutation observer
    - change options to default value

- *Example:*
    - ```javascript
      new Watermark().set().mount().destory();
      ```

## Contributors

If you are interested in this project, welcome to fork and pull request.

## License

MIT License

Copyright (c) 2018-present, iamkun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
