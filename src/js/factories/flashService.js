(function() {
var app = angular.module('factoryFlashService', []);

    app.factory('flashService', function($compile, Flash) {
        var msgs = {};
        var myEl = $(".navbar");
        msgs.showError = function(text) {
            Flash.create('error', text, 0, {}, true)
        }
        msgs.showWarning = function(text) {
            Flash.create('warning', text, 0, {}, true)
        }
        msgs.showSuccess = function(text) {
            Flash.create('success', text, 0, {}, true)
        }
        msgs.showInfo = function(text) {
            Flash.create('info', text, 0, {}, true)
        }
        return msgs
    });

})();