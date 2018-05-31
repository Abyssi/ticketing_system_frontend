'use strict';

angular.module('app.ctrl').controller('productCreateController', function (userService, ticketService, productService, $timeout) {
    const self = this;

    self.productForm = {
        name: '',
        version: ''
    };

    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        ticketService.metadata(function (response) {
            $timeout(function () {
                M.AutoInit();
            });
        }, function () {
            alert("Invalid metadata");
        });
    }();

    self.create = function () {
        if (!self.validateForm(this.productForm)) {
            alert("Invalid form");
            return;
        }

        const product = self.productForm;

        productService.create(product, function () {
            alert("Product created");
            window.location.href = "#/product/list";
        }, function () {
            alert("Invalid create");
        });
    };

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.version.length > 1;
    };
});