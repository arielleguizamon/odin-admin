(function() {
var app = angular.module('factoryRest', []);  

    app.factory('rest', ['$resource', '$location', '$rootScope', 'ngProgressFactory', 'flashService', 'Flash', '$injector', 'jwtHelper', function($resource, $location, $rootScope, ngProgressFactory, flashService, Flash, $injector, jwtHelper) {
        $rootScope.progressbar = ngProgressFactory.createInstance();
        return function($url) {
            $rootScope.progressbar.start();
            var token = $rootScope.adminglob.currentUser.token;
            $url = ($url == null) ? $rootScope.url + '/:type' : $url;

            // if (jwtHelper.isTokenExpired(token)) {
            //     $location.path('login');
            // }

            return $resource($url, {
                type: ''
            }, {
                get: {
                    url: $url + "?:params",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                count: {
                    url: $url + "/count",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                contents: {
                    url: $url + "/:id/contents?:params",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                resources: {
                    url: $url + "/:id/resources?:params",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                getArray: {
                    url: $url + "/:id/:asociate",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        var json = JSON.parse(data);
                        return json.data;
                    },
                    isArray: true,
                    interceptor: {
                        responseError: handError
                    }
                },
                findOne: {
                    url: $url + "/:id?:params",
                    method: 'GET',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        if (data) {
                            $rootScope.progressbar.complete();
                            var json = JSON.parse(data)
                            return angular.fromJson(json.data);
                        } else {
                            $rootScope.progressbar.complete();
                        }
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                'save': {
                    url: $url,
                    method: 'POST',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    interceptor: {
                        responseError: handError
                    },
                    transformResponse: function(data) {
                        if (data) {
                            if (!!JSON.parse(data).message) {
                                flashService.showSuccess(JSON.parse(data).message);
                            }
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        } else {
                            $rootScope.progressbar.complete();
                        }
                    }
                },
                'saveWithData': {
                    url: $url,
                    method: 'POST',
                    headers: {
                        'x-admin-authorization': token,
                        'Content-Type': undefined
                    },
                    transformRequest: function(data, headersGetter) {
                        // Here we set the Content-Type header to null.
                        var headers = headersGetter();
                        headers['Content-Type'] = undefined;

                        // And here begins the logic which could be used somewhere else
                        // as noted above.
                        if (data == undefined) {
                            return data;
                        }

                        var fd = new FormData();

                        var createKey = function(_keys_, currentKey) {
                            var keys = angular.copy(_keys_);
                            keys.push(currentKey);
                            formKey = keys.shift()

                            if (keys.length) {
                                formKey += "[" + keys.join("][") + "]"
                            }

                            return formKey;
                        }

                        var addToFd = function(object, keys) {
                            angular.forEach(object, function(value, key) {
                                var formKey = createKey(keys, key);

                                if (value instanceof File) {
                                    fd.append(formKey, value);
                                } else if (value instanceof FileList) {
                                    if (value.length == 1) {
                                        fd.append(formKey, value[0]);
                                    } else {
                                        angular.forEach(value, function(file, index) {
                                            fd.append(formKey + '[' + index + ']', file);
                                        });
                                    }
                                } else if (value && (typeof value == 'object' || typeof value == 'array')) {
                                    var _keys = angular.copy(keys);
                                    _keys.push(key)
                                    addToFd(value, _keys);
                                } else {
                                    fd.append(formKey, value);
                                }
                            });
                        }

                        addToFd(data, []);

                        return fd;
                    },
                    interceptor: {
                        responseError: handError
                    },
                    transformResponse: function(data) {
                        console.log(data);
                    }
                },
                'delete': {
                    url: $url + "/:id",
                    method: 'DELETE',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    interceptor: {
                        responseError: handError
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();

                    }
                },
                'restore': {
                    url: $url + "/:id/restore",
                    method: 'POST',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    interceptor: {
                        responseError: handError
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();

                    }
                },
                'deactivate': {
                    url: $url + "/:id/deactivate",
                    method: 'POST',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    interceptor: {
                        responseError: handError
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();

                    }
                },
                publish: {
                    url: $url + "/:id/publish",
                    method: 'PATCH',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                unpublish: {
                    url: $url + "/:id/unpublish",
                    method: 'PATCH',
                    headers: {
                        'x-admin-authorization': token,
                    },
                    transformResponse: function(data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {
                        responseError: handError
                    }
                },
                    reject: {
                        url: $url + "/:id/reject",
                        method: 'PATCH',
                        headers: {
                            'x-admin-authorization': token,
                        },
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {
                            responseError: handError
                        }
                    },
                    sendReview: {
                        url: $url + "/:id/review",
                        method: 'PATCH',
                        headers: {
                            'x-admin-authorization': token,
                        },
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {
                            responseError: handError
                        }
                    },
                    cancel: {
                        url: $url + "/:id/cancel",
                        method: 'PATCH',
                        headers: {
                            'x-admin-authorization': token,
                        },
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {
                            responseError: handError
                        }
                    },
                    'update': {
                        url: $url + "/:id",
                        method: 'PUT',
                        headers: {
                            'x-admin-authorization': token,
                        },
                        interceptor: {
                            responseError: handError
                        },
                        transformResponse: function(data) {
                            if (data) {
                                if (!!JSON.parse(data).message) {
                                    flashService.showSuccess(JSON.parse(data).message);
                                }
                                $rootScope.progressbar.complete();
                                return angular.fromJson(data);
                            } else {
                                $rootScope.progressbar.complete();
                        }
                    }
                }
            });
        }


        function handError(e) {
            params = JSON.stringify(e.data) || " "
            if (!!e.data) {
                if (e.data.code == "E_VALIDATION") {
                    params = validationErrors(e.data);
                }
                if (e.data.code == "E_INTERNAL_SERVER_ERROR" && (e.data.message == "jwt expired" || e.data.message == "invalid signature")) {
                    $location.path('login');
                }
            }
        }

        function validationErrors(data) {
            var data = data.data;
            var returntext = "";
            for (d in data) {
                for (r in data[d]) {
                    returntext = "<b>SERVER VALIDATIONS: </b> <br><p>Rule: " + data[d][r].rule + " <br>Message: " + data[d][r].message + " </p>";
                }
            }

            return returntext
        }
    }]);

})();