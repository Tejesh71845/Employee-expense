/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comapp/project4/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});