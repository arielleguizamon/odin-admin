(function (window, angular) {
  angular.module('odin')
.run(run)

    function run($rootScope, EnvironmentConfig, authManager, Idle, AuthenticationService, $location, $window, PermRoleStore, ROLES, Alertify, $translate, $cookieStore, BaseHTML5, odin_version) {
        $rootScope.adminglob = $cookieStore.get('adminglob') || {};
        $rootScope.globals = $cookieStore.get('globals') || {};
        Idle.watch();
        $rootScope.url = EnvironmentConfig.api;
        $rootScope.odin_version = odin_version;
        $rootScope.baseHtml5 = BaseHTML5.url;
        authManager.redirectWhenUnauthenticated();
        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            $rootScope.actualUrl = current.$$route.originalPath;
        });

        var rolesObj = _.reduce(_.values(ROLES), function (roles, roleName) {
                roles[roleName] = function () {
                    if(!!$rootScope.adminglob.currentUser) {
                        return $rootScope.adminglob.currentUser.role === roleName;
                    } else {
                        return false;
                    }
                };

            return roles;
        }, {});

        PermRoleStore.defineManyRoles(rolesObj);

        $rootScope.roles = ROLES;
        $rootScope.$on('$routeChangePermissionDenied', function (event, toState, toParams) {
            $translate('DENIED_ACCESS').then(function (translation) {
                Alertify.error(translation);
            });
            $location.path('/');
        });

        $rootScope.$on('IdleTimeout', function () {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            if (restrictedPage) {
                $window.location.reload();
                AuthenticationService.ClearCredentials();

            }
            Idle.watch();
        });
    }
})(window, window.angular);
