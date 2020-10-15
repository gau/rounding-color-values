# カラーを丸める ReadMe

端数になったカラー（CMYKとグレースケールのみ）を整数の近似値に丸めるIllustrator用スクリプト。

<div class="fig center" style="margin-bottom: 20px;"><img src="https://www.graphicartsunit.com/saucer/images/rounding_color/eye.png" alt="イメージ" class="noshadow"></div>

-----

### 更新履歴

* **0.6.1：グループ内のテキストカラーが処理されないバグを解消**
* 0.6.0：グラデーションカラー、インラインテキストの選択に対応
* 0.5.5：グループ、複合パス、文字単位のカラーに対応
* 0.5.0：新規作成（公開）

-----

### 対応バージョン

* Illustrator CS5〜2020（24.3）

-----

### インストール方法

1. ダウンロードしたファイルを解凍します。
2. 所定の場所（後述）に「カラーを丸める.jsx」をコピーします。Windows版ではお使いのIllustratorのモードによって保存する場所が異なりますのでご注意ください。
3. Illustratorを再起動します。
3. `ファイル > スクリプト > カラーを丸める`と表示されていればインストール成功です。

#### ファイルをコピーする場所

| OS | バージョン | フォルダの場所 |
|:-----|:-----|:-----|
| Mac | 全 | /Applications/Adobe Illustrator *(ver)*/Presets/ja_JP/スクリプト/ |
| 32bit Win | CS5まで | C:\Program Files\Adobe\Adobe Illustrator *(ver)*\Presets\ja_JP\スクリプト\ |
| 64bit Win | CS5, CS6（32bit版） | C:\Program Files (x86)\Adobe\Adobe Illustrator *(ver)*\Presets\ja_JP\スクリプト\ |
| 64bit Win | CS6（64bit版）以降 | C:\Program Files\Adobe\Adobe Illustrator *(ver)* (64 Bit)\Presets\ja_JP\スクリプト\ |

-----

### 使い方

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/rounding_color/fig01.jpg" alt="使い方" class="noshadow"></div>

1. 対象となるオブジェクトを選択します。（複数可）
2. `ファイル > スクリプト > カラーを丸める`を選択します。
3. ［対象］でカラーの値を丸めたい要素（塗り／線）をチェックします。
4. 必要に応じて［計算方法］と［一の位の処理］を変更します。
5. `実行`をクリックします。
6. 指定のオプションに従って、カラーの値が整数の近似値に丸められます。

-----

### 丸めの規則

<div class="fig center"><img src="https://www.graphicartsunit.com/saucer/images/rounding_color/fig02.jpg" alt="使い方" class="noshadow"></div>

以下の規則に従って丸め処理が実行されます。

| 計算方法 | 1％刻み | 5％刻み | 10％刻み |
|:-----------|:------------|:------------|:------------|
| 四捨五入 | 小数第一位を四捨五入 | 一の位を近い方の0か5へスナップ | 一の位を四捨五入 |
| 切り捨て | 小数第一位以下を切り捨て | 一の位を小さい方の0か5へスナップ | 一の位を切り捨てて0にする |
| 繰り上げ | 小数第一位以下を繰り上げ | 一の位を大きい方の0か5へスナップ | 一の位を繰り上げて0にする |

-----

### カスタマイズ

ダイアログボックスの初期状態を変更したいときは「settings」の値を変更してください。

| キー | 項目 | 内容 | 型 | 初期値 |
|:-----------|:------------|:------------|:------------|:------------|
| strokeColor | 対象（線） | true:オン／false:オフ | Boolean | true |
| fillColor | 対象（塗り） | true:オン／false:オフ | Boolean | true |
| roundingMethod | 計算方法 | 0:四捨五入／1:切り捨て／2:繰り上げ | Number | 0 |
| roundingType | 一の位の処理 | 0:1％刻み／1:5％刻み／2:10％刻み | Number | 1 |


-----

### 注意

* 対象となるカラーモデルは「CMYK」「グレースケール」のみです。
* ［カラーパネル］でのカラーモデルが「CMYK」になっていても、ドキュメントのカラーモードが「RGBカラー」の場合は動作しません。
* シンボルは対象となりません。
* 複数の塗りや線のアピアランスが存在するときは、現在アクティブのものだけを対象に実行されます。
* テキストオブジェクトに対してアピアランスで適用したカラーは対象となりません。
* 塗りや線に効果などが追加されたものなど、構造が複雑なオブジェクトの場合、うまく動作しないことがあります。
* シンボル内のオブジェクトや複合シェイプ、ライブカラーグループ、拡張前の画像トレース、メッシュオブジェクトなどは対象になりません。

-----

### 免責事項

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* 一応CS5〜2020（24.3）で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

-----

### ライセンス ###

* カラーを丸める.jsx
* Copyright (c) 2015 Toshiyuki Takahashi
* Released under the MIT license
* [http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)