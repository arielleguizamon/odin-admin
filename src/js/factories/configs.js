(function() {
var app = angular.module('factoryConfigs', []);

    app.factory('configs', function(rest) {
        return {
            findKey: function(scope, callback) {
                var configs = rest().get({
                    type: 'configs',
                    params: 'key=' + scope.config_key
                }, function() {
                    if(!!callback)
                        callback(configs);
                });
                //return configs;
            },
            statuses: function(scope) {
                scope.statuses = {
                    default: 'nWRhpRV',
                    published: 'qWRhpRV',
                    unpublished: 'rWRhpRV',
                    underReview: 'oWRhpRV',
                    rejected: 'pWRhpRV',
                    draft: 'nWRhpRV'
                };
                var configs = rest().get({
                    type: 'configs',
                    params: 'key=defaultStatus'
                }, function(resp) {
                    if(!!resp.data && !!resp.data[0]) {
                        scope.statuses.default = resp.data[0].value;
                    }
                });
            },
        }
    });

})();