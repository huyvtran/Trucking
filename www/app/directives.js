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
  })

  .filter('partition', function() {
    var cache = {};
    var filter = function(arr, size) {
      if (!arr) { return; }
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      var arrString = JSON.stringify(arr);
      var fromCache = cache[arrString+size];
      if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
        return fromCache;
      }
      cache[arrString+size] = newArr;
      return newArr;
    };
    return filter;
  });