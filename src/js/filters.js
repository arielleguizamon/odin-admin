(function() {
    var app = angular.module('store-filters', []);

    app.filter('urlEncode', [function() {
        return window.encodeURIComponent;
    }]);

    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    app.filter('generalize', function() {
        return function(input) {
            return (input.slice(-1) == "a" || input.slice(-1) == "n") ? "A" : "AN";
        }
    });

    app.filter('selectedOption', function() {
        return function(element, tag) {
            // return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    app.filter('selectFilterArray', function() {
        return function(input, model) {


            var result = $.map($("#" + model + " option:selected"), function(el, i) {
                return $(el).text();
            });

            return result.join(', ');
        }

    });

    app.filter('truncString', function() {
        return function(input) {
            var add = '...';
            var max = 26;
            var str = input;
            return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
        }
    });


    app.filter('md5', function() {
        return function(input) {
            var add = '...';
            var max = 26;
            var str = input;
            return md5(str);
        }
    });

    app.filter('inArray', function() {
        return function(array, value) {
            return array.indexOf(value) !== -1;
        };
    });


    app.filter('filterIfGuestUser', function ($rootScope, ROLES) {
        return function (models) {
            var userObj = $rootScope.adminglob.currentUser;

            if (!userObj || userObj.role !== ROLES.GUEST) {
                return models;
            } else {
                return _.filter(models, function(model) {
                    return model.createdBy.id === userObj.user;
                });
            }
        };
    });

    app.filter('pluralEntities', function () {
        return function (input) {
            if(!!input) {
                if(input.slice(-1) == 'y') {
                    var rest = input.slice(0, input.length - 1);
                    return rest + 'ies';
                } else {
                    return input + 's';
                }
            } else {
                return input;
            }
        };
    });

})();
