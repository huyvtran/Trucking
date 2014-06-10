angular.module('app.directives', [])

  .directive('autoComplete', function ($timeout) {
    return function (scope, iElement, iAttrs) {
      iElement.autocomplete({
        source: scope[iAttrs.uiItems],
        select: function () {
          $timeout(function () {
            iElement.trigger('input');
          }, 0);
        }
      });
    };
  })


  .directive('autoFocus', function ($timeout) {
    return {
      restrict: 'AC',
      link: function (_scope, _element) {
        $timeout(function () {
          _element[0].focus();
        }, 0);
      }
    };
  });