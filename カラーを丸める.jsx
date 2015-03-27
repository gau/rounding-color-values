/*
カラーを丸める.jsx
Copyright (c) 2015 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
ver. 0.5.0
*/
(function() {

	var SCRIPT_TITLE = 'カラーを丸める';
	var SCRIPT_VERSION = '0.5.0';

	// Settings
	var settings = {
		'strokeColor' : true,
		'fillColor' : true,
		'roundingMethod' : 0,
		'roundingType' : 1
	};

	// UI Dialog
	function mainDialog() {
		this.init();
		return this;
	};
	mainDialog.prototype.init = function() {

		var unit = 20;
		var thisObj = this;

		var getSelectedIndex = function(array) {
			for (var i = 0; i < array.length; i++) {
				if(array[i].value) return i;
			}
			return -1;
		};

		thisObj.dlg = new Window('dialog', SCRIPT_TITLE + ' - ver.' + SCRIPT_VERSION);
		thisObj.dlg.margins = [unit * 1.5, unit * 1.5, unit * 1.5, unit * 1.5];

		thisObj.targetPanel = thisObj.dlg.add('panel', undefined, '対象：');
		thisObj.targetPanel.alignment = 'left';
		thisObj.targetPanel.margins = [unit, unit, unit, unit];
		thisObj.targetPanel.orientation = 'row';

		thisObj.methodPanel = thisObj.dlg.add('panel', undefined, '計算方法：');
		thisObj.methodPanel.alignment = 'left';
		thisObj.methodPanel.margins = [unit, unit, unit, unit];
		thisObj.methodPanel.orientation = 'row';

		thisObj.typePanel = thisObj.dlg.add('panel', undefined, '一の位の処理：');
		thisObj.typePanel.alignment = 'left';
		thisObj.typePanel.margins = [unit, unit, unit, unit];
		thisObj.typePanel.orientation = 'row';

		thisObj.buttonGroup = thisObj.dlg.add('group', undefined);
		thisObj.buttonGroup.margins = [unit, unit * 0, unit, unit * 0];
		thisObj.buttonGroup.alignment = 'center';
		thisObj.buttonGroup.orientation = 'row';

		thisObj.rdTarget = {
			'fillColor' : thisObj.targetPanel.add('checkbox', undefined, '塗り'),
			'strokeColor' : thisObj.targetPanel.add('checkbox', undefined, '線')
		};
		for (var key in thisObj.rdTarget) {
			thisObj.rdTarget[key].minimumSize = [80, undefined];
			thisObj.rdTarget[key].value = settings[key];
			thisObj.rdTarget[key].alignment = 'left';
		}

		thisObj.rdMethod = [
			thisObj.methodPanel.add('radiobutton', undefined, '四捨五入'),
			thisObj.methodPanel.add('radiobutton', undefined, '切り捨て'),
			thisObj.methodPanel.add('radiobutton', undefined, '繰り上げ')
		];
		if(settings.roundingMethod > thisObj.rdMethod.length - 1 || settings.roundingMethod < 0 || isNaN(settings.roundingMethod)) {
			settings.roundingMethod = 0;
		} else {
			settings.roundingMethod = Math.floor(settings.roundingMethod);
		}
		for (var key in thisObj.rdMethod) {
			thisObj.rdMethod[key].minimumSize = [80, undefined];
			thisObj.rdMethod[key].value = false;
			thisObj.rdMethod[key].alignment = 'left';
		}
		thisObj.rdMethod[settings.roundingMethod].value = true;

		thisObj.rdType = [
			thisObj.typePanel.add('radiobutton', undefined, '1％刻み'),
			thisObj.typePanel.add('radiobutton', undefined, '5％刻み'),
			thisObj.typePanel.add('radiobutton', undefined, '10％刻み')
		];
		if(settings.roundingType > thisObj.rdType.length - 1 || settings.roundingType < 0 || isNaN(settings.roundingType)) {
			settings.roundingType = 0;
		} else {
			settings.roundingType = Math.floor(settings.roundingType);
		}
		for (var key in thisObj.rdType) {
			thisObj.rdType[key].minimumSize = [80, undefined];
			thisObj.rdType[key].value = false;
			thisObj.rdType[key].alignment = 'left';
		}
		thisObj.rdType[settings.roundingType].value = true;

		thisObj.cancel = thisObj.buttonGroup.add('button', undefined, 'キャンセル', {name: 'cancel'});
		thisObj.ok = thisObj.buttonGroup.add('button', undefined, '実行', { name:'ok'});

		thisObj.ok.onClick = function() {
			for (var key in thisObj.rdTarget) {
				settings[key] = thisObj.rdTarget[key].value;
			}
			settings.roundingMethod = getSelectedIndex(thisObj.rdMethod);
			settings.roundingType = getSelectedIndex(thisObj.rdType);
			try {
				roundColor();
			} catch(e) {
				alert('エラーが発生しましたので処理を中止します\nエラー内容：' + e);
			} finally {
				thisObj.closeDialog();
			}
		}
		thisObj.cancel.onClick = function() {
			thisObj.closeDialog();
		}
	};
	mainDialog.prototype.showDialog = function() {
		this.dlg.show();
	};
	mainDialog.prototype.closeDialog = function() {
		this.dlg.close();
	};
	var dialog = new mainDialog();
	var items = app.activeDocument.selection;
	if (!app.activeDocument || app.activeDocument.selection < 1) {
		alert('オブジェクトが選択されていません');
	} else {
		dialog.showDialog();
	}

	// Round Number
	function roundNumber(num) {
		var rounding = function(num) {
			switch(settings.roundingMethod) {
				case 0 :
					num = Math.round(num);
					break;
				case 1 :
					num = Math.floor(num);
					break;
				case 2 :
					num = Math.ceil(num);
					break;
				default :
					break;
			}
			return num;
		};
		var newNum;
		if(settings.roundingType == 1) {
			newNum = rounding(num / 5) * 5;
		} else if(settings.roundingType == 2) {
			newNum = rounding(num / 10) * 10;
		} else {
			newNum = rounding(num);
		}
		return newNum;
	}

	// Get Rounded Color
	function getRoundedColor(color) {
		var nc;
		switch(color.typename) {
			case 'CMYKColor' :
				nc = new CMYKColor();
				nc.black = roundNumber(color.black);
				nc.cyan = roundNumber(color.cyan);
				nc.magenta = roundNumber(color.magenta);
				nc.yellow = roundNumber(color.yellow);
				break;
			case 'GrayColor' :
				nc = new GrayColor();
				nc.gray = roundNumber(color.gray);
				break;
			default :
				break;
		}
		return nc;
	}

	// Main Process
	function roundColor() {
		var items = app.activeDocument.selection;
		if (!items || items.length < 1) throw('オブジェクトが選択されていません');
		for (var i = 0; i < items.length; i++) {
			if (items[i].typename == 'GroupItem' || items[i].typename == 'SymbolItem') {
				continue;
			} else if(items[i].typename == 'TextFrame') {
				// のちにテキストカラーに対応するための準備
				continue;
			}
			// Round Stroke Color
			if (settings.strokeColor) {
				if (items[i].strokeColor.typename == 'CMYKColor' || items[i].strokeColor.typename == 'GrayColor') {
					items[i].strokeColor = getRoundedColor(items[i].strokeColor);
				}
			}
			// Round Fill Color
			if (settings.fillColor) {
				if (items[i].fillColor.typename == 'CMYKColor' || items[i].fillColor.typename == 'GrayColor') {
					items[i].fillColor = getRoundedColor(items[i].fillColor);
				}
			}
		}
	}

}());
