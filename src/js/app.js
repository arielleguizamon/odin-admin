(function (window, angular) {
    var app = angular.module('odin', ["odin.config",
        "odin.version",
        "ngRoute",
        "permission",
        "permission.ng",
        "roles-constant",
        "Alertify",
        "ngFlash",
        "ui.bootstrap",
        "localize",
        "ckeditor",
        "ngMessages",
        "ngCookies",
        "ngResource",
        "ngProgress",
        "odin.controllers",
        "store-directives",
        "store-factories",
        "bw.paging",
        "color.picker",
        "leaflet-directive",
        "datePicker",
        "angularSpinner",
        "chart.js",
        "ngRoute.middleware",
        "consumer-service",
        "validation.match",
        "angular-jwt",
        "vcRecaptcha",
        "pdf",
        "selectize",
        "ngIdle",
        "store-filters"
    ]);

    app.constant("session_timeout", {
        "base": "3600", //60 minutes
        "extended": "7200" //2 hours
    });
})(window, window.angular);
