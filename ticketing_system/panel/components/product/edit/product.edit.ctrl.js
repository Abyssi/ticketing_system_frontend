'use strict';

angular.module('app.ctrl').register.controller('productEditController', function ($routeParams, userService, ticketService, productService, $timeout) {
    const self = this;

    self.productForm = {
        title: '',
        version: ''
    };
    self.productId = $routeParams.id;


    self.init = function () {
        if (!userService.isLogged()) window.location.href = "../";

        productService.get(self.productId, function (response) {
            self.productForm.version = response.data.version;
            self.productForm.name = response.data.name;
        }, function () {
            alert("Invalid get");
        });

    }();

    self.update = function () {
        if (!self.validateForm(this.productForm)) {
            alert("Invalid form");
            return;
        }

        const product = self.productForm;

        productService.update(self.productId, product, function () {
            alert("Product updated");
            window.location.reload();
        }, function () {
            alert("Invalid update");
        });
    };

    self.delete = function () {
        if (confirm("Are you sure you want to delete this product?")) {
            productService.delete(self.productId, function () {
                alert("Product deleted");
                window.location.href = "#/product/list";
            }, function () {
                alert("Invalid delete");
            });
        }
    };

    self.validateForm = function (form) {
        return form.name.length > 1 &&
            form.version.length > 1;
    };

});