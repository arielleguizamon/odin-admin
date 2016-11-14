var app = angular.module('odin.organizationControllers', []);

app.factory('model', function ($resource) {
    return $resource();
});



app.directive('wysihtml5', function () {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function ($scope, element, $attrs) {

            CKEDITOR.replace('textarea');

            /*  $scope.$parent.$watch( $attrs.content, function( newValue, oldValue ) {
<<<<<<< HEAD
             
=======

>>>>>>> change-asi
             $scope.editor.innerHTML = newValue;
             $scope.editor.composer.setValue( newValue );
             });*/


        }
    };
});
function OrganizationListController($scope, $location, rest, $rootScope, Flash, Alertify, modelService, configs, usSpinnerService) {
    usSpinnerService.spin('spinner');
    modelService.initService("Organization", "organizations", $scope);
<<<<<<< HEAD
    
    $scope.parameters = {
        skip: 0,
        limit: 20,
        conditions: ''
    };
    
=======

    $scope.parameters = {
        skip: 0,
        limit: 20,
        conditions: '',
        orderBy: 'createdAt',
        sort: 'DESC'
    };

>>>>>>> change-asi
    $scope.filtersView = [{
            name: 'Autor',
            model: 'users',
            key: 'username',
            modelInput: 'createdBy',
            multiple: true
        }];
<<<<<<< HEAD
    
=======

>>>>>>> change-asi
    var filtersGet = ['files', 'users'];

    $scope.inactiveModel = function(item) {
        modelService.deactivateList(item, $scope, filtersGet);
    }

    $scope.activeModel = function(item) {
        modelService.restoreList($scope, item, filtersGet);
    };
<<<<<<< HEAD
    
=======

>>>>>>> change-asi
    $scope.confirmDelete = function(item) {
        modelService.confirmDelete(item, {}, filtersGet);
    };

    $scope.edit = function (model) {
        modelService.edit($scope, model);
    }

    $scope.view = function (model) {
        modelService.view($scope, model);
    }

    $scope.activeClass = function (activeClass) {
        modelService.activeClass(activeClass);
    };
<<<<<<< HEAD
    
=======

>>>>>>> change-asi
    $scope.config_key = 'adminPagination';
    ////factory configs
    configs.findKey($scope, function (resp) {
        if (!!resp.data[0] && !!resp.data[0].value) {
            $scope.parameters.limit = resp.data[0].value;
        }
<<<<<<< HEAD
        
        $scope.q = "&include=files,users&skip=" + $scope.parameters.skip + "&limit=" + $scope.parameters.limit;
=======
        $scope.q = "&skip=" + $scope.parameters.skip + "&limit=" + $scope.parameters.limit;
>>>>>>> change-asi

        modelService.loadAll($scope, function(resp) {
            usSpinnerService.stop('spinner');
            if(!resp) {
                modelService.reloadPage();
            }
        });
    });

    $scope.paging = function(event, page, pageSize, total) {
        usSpinnerService.spin('spinner');
        $scope.parameters.skip = (page - 1) * $scope.parameters.limit;
<<<<<<< HEAD
        $scope.q = "&include=files,users&skip=" + $scope.parameters.skip + "&limit=" + $scope.parameters.limit;
=======
        $scope.q = "&skip=" + $scope.parameters.skip + "&limit=" + $scope.parameters.limit;
>>>>>>> change-asi
        if(!!$scope.parameters.conditions) {
            $scope.q += $scope.parameters.conditions;
        }
        modelService.loadAll($scope, function(resp) {
            usSpinnerService.stop('spinner');
            if(!resp) {
                modelService.reloadPage();
            }
        });
    };
<<<<<<< HEAD
=======
    
    $scope.findSort = function(type, cond) {
        usSpinnerService.spin('spinner');
        $scope.sortType = type; 
        
        var sort = 'DESC';
        if(cond) {
            sort = 'ASC';
        }
        $scope.sortReverse = cond;
        
        $scope.parameters.orderBy = type;
        $scope.parameters.sort = sort;
        
        modelService.loadAll($scope, function(resp) {
            usSpinnerService.stop('spinner');
            if(!resp) {
                modelService.reloadPage();
            }
        });
    };
>>>>>>> change-asi
}

function OrganizationViewController($scope, Flash, rest, $routeParams, $location, modelService, $sce) {
    modelService.initService("Organization", "organizations", $scope);

    modelService.findOne($routeParams, $scope);
<<<<<<< HEAD
    
=======

>>>>>>> change-asi
    $scope.inactiveModel = function(item) {
        modelService.deactivateView(item, $scope);
    }

    $scope.activeModel = function(item) {
        modelService.restoreView($scope, item);
    };
<<<<<<< HEAD
    
=======

>>>>>>> change-asi
    $scope.edit = function (model) {
        modelService.edit($scope, model);
    }

    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
}

function OrganizationCreateController($scope, rest, model, Flash, $location, modelService, usSpinnerService, Alertify) {
    modelService.initService("Organization", "organizations", $scope);


    $scope.model = new model();
    $scope.add = function (isValid) {
        usSpinnerService.spin('spinner');
        if (isValid) {
            rest().save({
                type: $scope.type
            }, $scope.model, function (resp) {
                usSpinnerService.stop('spinner');
                var url = '/' + $scope.type;
                $location.path(url);
            }, function(error) {
                usSpinnerService.stop('spinner');
<<<<<<< HEAD
                if(error.data.data && error.data.data.name) {
=======
                if(error.data.data && (error.data.data.name || error.data.data.slug)) {
>>>>>>> change-asi
                    Alertify.alert('El nombre de la organización ya existe.');
                } else {
                    Alertify.alert('Ha ocurrido un error al crear la organización.');
                }
            });
        }
    };

    $scope.activeClass = function (activeClass, type) {
        if (activeClass && (type == 1)) {
            return "active";
        } else if (!activeClass && (type == 2)) {
            return "active";
        }
    };
}

function OrganizationEditController($scope, Flash, rest, $routeParams, model, $location, modelService, usSpinnerService, Alertify) {
    usSpinnerService.spin('spinner');
    $scope.editorOptions = {
        language: 'es',
    };

    modelService.initService("Organization", "organizations", $scope);


    $scope.model = new model();
    $scope.update = function (isValid) {
        usSpinnerService.spin('spinner');
        if (isValid) {
<<<<<<< HEAD
            
=======

>>>>>>> change-asi
            $scope.tempData = {
                address: $scope.model.address,
                description: $scope.model.description,
                name: $scope.model.name
            };
<<<<<<< HEAD
            
=======

>>>>>>> change-asi
            //console.log($scope.model);
            rest().update({
                type: $scope.type,
                id: $scope.model.id
            }, $scope.tempData, function (resp) {
                usSpinnerService.stop('spinner');
                var url = '/' + $scope.type;
                $location.path(url);
            }, function(error) {
                usSpinnerService.stop('spinner');
<<<<<<< HEAD
                if(error.data.data && error.data.data.name) {
=======
                if(error.data.data && (error.data.data.name || error.data.data.slug)) {
>>>>>>> change-asi
                    Alertify.alert('El nombre de la organización ya existe.');
                } else {
                    Alertify.alert('Ha ocurrido un error al editar la organización.');
                }
            });
        }
    };

    $scope.load = function () {
        $scope.model = rest().findOne({
            id: $routeParams.id,
            type: $scope.type
        }, function() {
            usSpinnerService.stop('spinner');
        }, function(error) {
            usSpinnerService.stop('spinner');
            modelService.reloadPage();
        });
    };

    $scope.activeClass = function (activeClass, type) {
        if (activeClass && (type == 1)) {
            return "active";
        } else if (!activeClass && (type == 2)) {
            return "active";
        }
    };

    $scope.load();
<<<<<<< HEAD
}
=======
}
>>>>>>> change-asi
