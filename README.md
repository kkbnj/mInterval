# mInterval plug-in
指定の時間間隔で表示する要素を切り替えるためのjQueryプラグインです。

This is jQuery plug-in that it can switch the displayed element at regular intervals.

## 使用方法 / How to use
jQuery本体の読み込み後、jquery.mInterval.jsを読み込みます。
切り替えたい要素を`<li>`要素としてマークアップし、その親の`<ul>`要素を`mInterval`クラス属性にします。
`mInterval`クラス要素に対して、`mInterval()`メソッドを使用することで、
表示されるli要素が一定時間ごとに切り替わります。

You load jquery.mInterval.js file, after loading jQuery library.
You should markup `<li>` elements for switching the display and `<ul>` element of `mInterval` class attribute as their parent.
Apply `mInterval()` method for `mInterval` class element and the displayed element is switched.


## 使用例 / Example


```
	<ul class="mInterval">
		<li>Alpha.</li>
		<li>Beta.</li>
		<li>Gamma.</li>
		<li>Delta.</li>
	</ul>
```


## 引数 / Parameters
`mInterval()`メソッドはオプジェクトを引数とすることで、オプションを指定することができます。


`mInterval()`method has 1 object parameter it adds some options.


```
$('.mInterval').mInterval({
  type: 'fade', //インターバル表示時のアニメーションタイプ。現バージョンでは`fade`のみです。
  interval_time: 5000, //インターバルの時間間隔を設定できます。
  duration: 260, //インターバル表示時のアニメーションスピード。
  easing: 'swing',　//インターバル表示時のアニメーションイージング。CSSアニメーションの場合は反映されず、`ease-in-out`が適応されます。
  random_init: false, //最初に表示する要素をランダムにすることができます。

  velocity_js: true, //jQueryプラグイン版の`velocity.js`を導入している場合、`velocity.js`アニメーションの使用の可否を設定できます。
  css_animation: true, //CSS3の`transition`アニメーションが使用可能な場合、`transition`アニメーションの使用の可否を設定できます。

  before_swtich: function(now) {}, //インターバル表示が切り替わる直前に実行される関数です。パラメータ`now`には表示される要素のインデックス番号が渡されています。
  after_swtich: function(now) {}, //インターバル表示が切り替わった直後に実行される関数です。パラメータ`now`には表示されていた要素のインデックス番号が渡されています。
});
```


```
$('.mInterval').mInterval({
  type: 'fade', //This is the animation type when the displayed element is switched.
  interval_time: 5000, This is the interval time.
  duration: 260, //This is the animation speed when the displayed element is switched.
  easing: 'swing', //This is the animation easing when the displayed element is switched.
  random_init: false, //You can randomize the first element displayed.

  velocity_js: true, //If you introduce jQuery plug-in of `velocity.js`, whether to use `velocity.js` animation。
  css_animation: true, //If the browser is supported `transition` animation of CSS3, whether to use `transition` animation。

  before_swtich: function(now) {}, //This is the function that called before the displayed element is switched. `now` parameter has the index number of the displayed element.
  after_swtich: function(now) {}, //This is the function that called after the displayed element is switched. `now` parameter has the index number of the displayed element.
});
```
