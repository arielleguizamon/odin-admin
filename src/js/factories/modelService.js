(function() {
var app = angular.module('factoryModelService', []);    

    app.factory('modelService', function($location, rest, Flash, Alertify, $window) {
        orderBy = 'createdAt';
        sort = 'DESC';
        return {
            insertalScope: {},
            initService: function(modelName, type, scope) {
                Flash.clear();
                scope.modelName = modelName;
                scope.type = type;
                scope.searchModel = [];
                scope.q = "&";
                this.insertalScope = scope;
            },
            activeClass: function(activeClass) {
                if (activeClass) {
                    return "label-success";
                } else {
                    return "label-warning";
                }
            },
            edit: function(scope, model) {
                var url = '/' + scope.type + '/' + model.id + "/edit";
                $location.path(url);
            },
            delete: function(scope, model) {
                rest().delete({
                    type: scope.type,
                    id: model.id
                }, function(resp) {
                    var pm = '';
                    if (!!scope.filtersInclude) {
                        pm += 'include=';
                        angular.forEach(scope.filtersInclude, function(val, key, fil) {
                            pm += val;
                            if (key == (scope.filtersInclude.length - 1)) {
                                pm += '&';
                            } else {
                                pm += ',';
                            }
                        });
                    }
                    var conditions = '';
                    if (!!scope.q && scope.q != '') {
                        conditions = scope.q;
                    }

                    if(!!scope.parameters.orderBy) {
                        orderBy = scope.parameters.orderBy;
                    }

                    if(!!scope.parameters.sort) {
                        sort = scope.parameters.sort;
                    }

                    scope.data = rest().get({
                        type: scope.type,
                        params: pm + "orderBy="+orderBy+"&sort="+ sort + conditions
                    });
                });
            },
            restoreList: function(scope, item) {
                var model = item.target.dataset;
                rest().restore({
                    type: scope.type,
                    id: model.id
                }, {}, function(resp) {
                    var pm = '';
                    if (!!scope.filtersInclude) {
                        pm += 'include=';
                        angular.forEach(scope.filtersInclude, function(val, key, fil) {
                            pm += val;
                            if (key == (scope.filtersInclude.length - 1)) {
                                pm += '&';
                            } else {
                                pm += ',';
                            }
                        });
                    }

                    var conditions = '';
                    if (!!scope.q && scope.q != '') {
                        conditions = scope.q;
                    }

                    if(!!scope.parameters.orderBy) {
                        orderBy = scope.parameters.orderBy;
                    }

                    if(!!scope.parameters.sort) {
                        sort = scope.parameters.sort;
                    }

                    scope.data = rest().get({
                        type: scope.type,
                        params: pm + "orderBy="+orderBy+"&sort="+sort + conditions
                    });
                });
            },
            restoreView: function(scope, item, prev, type) {
                var model = item.target.dataset;
                rest().restore({
                    type: type || scope.type,
                    id: model.id
                }, {}, function(resp) {
                    var pm = '';
                    if (!!scope.filtersInclude) {
                        pm += 'include=';
                        angular.forEach(scope.filtersInclude, function(val, key, fil) {
                            pm += val;
                            if (key == (scope.filtersInclude.length - 1)) {
                                pm += '&';
                            } else {
                                pm += ',';
                            }
                        });
                    }
                    scope.model = rest().findOne({
                        id: prev || model.id,
                        type: scope.type,
                        params: pm
                    });
                });
            },
            deactivateList: function(item, scope) {
                var item = item.target.dataset;
                Alertify.set({
                    labels: {
                        ok: 'Ok',
                        cancel: 'Cancelar'
                    }
                });
                Alertify.confirm(item.textdelete).then(
                    function onOk() {
                        rest().deactivate({
                            type: scope.type,
                            id: item.id
                        }, {}, function(resp) {
                            var pm = '';
                            if (!!scope.filtersInclude) {
                                pm += 'include=';
                                angular.forEach(scope.filtersInclude, function(val, key, fil) {
                                    pm += val;
                                    if (key == (scope.filtersInclude.length - 1)) {
                                        pm += '&';
                                    } else {
                                        pm += ',';
                                    }
                                });
                            }
                            var conditions = '';
                            if (!!scope.q && scope.q != '') {
                                conditions = scope.q;
                            }

                            if(!!scope.parameters.orderBy) {
                                orderBy = scope.parameters.orderBy;
                            }

                            if(!!scope.parameters.sort) {
                                sort = scope.parameters.sort;
                            }

                            scope.data = rest().get({
                                type: scope.type,
                                params: pm + "orderBy="+orderBy+"&sort=" + sort + conditions
                            });
                        });
                    },
                    function onCancel() {
                        return false
                    }
                );
            },
            deactivateView: function(item, scope, prev, type) {
                var item = item.target.dataset;
                Alertify.set({
                    labels: {
                        ok: 'Ok',
                        cancel: 'Cancelar'
                    }
                });
                Alertify.confirm(item.textdelete).then(
                    function onOk() {
                        rest().deactivate({
                            type: type || scope.type,
                            id: item.id
                        }, {}, function(resp) {
                            var pm = '';
                            if (!!scope.filtersInclude) {
                                pm += 'include=';
                                angular.forEach(scope.filtersInclude, function(val, key, fil) {
                                    pm += val;
                                    if (key == (scope.filtersInclude.length - 1)) {
                                        pm += '&';
                                    } else {
                                        pm += ',';
                                    }
                                });
                            }
                            scope.model = rest().findOne({
                                id: prev || item.id,
                                type: scope.type,
                                params: pm
                            });
                        });
                    },
                    function onCancel() {
                        return false
                    }
                );
            },
            view: function(scope, model) {
                var url = '/' + scope.type + '/' + model.id + "/view";
                $location.path(url);
            },
            search: function(scope) {

                this.loadAll(scope);
            },
            loadAll: function(scope, callback) {
                var conditions = '';
                var pm = '';
                if (!!scope.filtersInclude) {
                    pm += 'include=';
                    angular.forEach(scope.filtersInclude, function(val, key, fil) {
                        pm += val;
                        if (key == (scope.filtersInclude.length - 1)) {
                            pm += '&';
                        } else {
                            pm += ',';
                        }
                    });
                }

                if(!!scope.parameters && !!scope.parameters.orderBy) {
                    orderBy = scope.parameters.orderBy;
                }

                if(!!scope.parameters && !!scope.parameters.sort) {
                    sort = scope.parameters.sort;
                }

                if(!!scope.parameters && !!scope.parameters.conditions) {
                    conditions = scope.parameters.conditions;
                }

                scope.data = rest().get({
                    type: scope.type,
                    params: pm + "orderBy="+orderBy+"&sort="+ sort + conditions + scope.q
                }, function(resp) {
                    if(!!callback)
                        callback(true);
                }, function(error) {
                    if(!!callback)
                        callback(false);
                });
            },
            findOne: function(routeParams, scope) {
                scope.model = rest().findOne({
                    id: routeParams.id,
                    type: scope.type
                });
            },
            confirmDelete: function(item, scope) {
                var _this = this;
                var item = item.target.dataset;
                Alertify.set({
                    labels: {
                        ok: 'Ok',
                        cancel: 'Cancelar'
                    }
                });
                Alertify.confirm(item.textdelete).then(
                    function onOk() {

                        _this.delete(_this.insertalScope, {
                            id: item.id
                        })
                    },
                    function onCancel() {
                        return false
                    }
                );
            },
            reloadPage: function() {
                Alertify.set({
                    labels: {
                        ok: 'Recargar página',
                        cancel: 'Continuar'
                    }
                });
                Alertify
                    .confirm('Hubo un error en la conexión. Vuelva a cargar la página.')

                .then(
                    function onOk() {
                        $window.location.reload();
                    }
                );
            }
        }
    });

})();