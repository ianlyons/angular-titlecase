(function() {
  'use strict';
  describe('Filter: titlecase', function() {
    var $filter;

    beforeEach(function() {
      angular.mock.module('angular-titlecase');

      inject(function(_$filter_) {
        $filter = _$filter_;
      });
    });

    var testCases = [
      ['this is a test', 'This Is a Test'],
      ['tHIs is a test', 'This Is a Test'],
      ['THIS IS A TEST', 'This Is a Test'],
      ['this: a test', 'This: A Test'],
      ['this is-Test', 'This Is-Test']
    ];

    it('works for all known test cases', function() {
      for (var i = 0; i < testCases.length; i++) {
        var testCase = testCases[i];
        var input = testCase[0];
        var expected = testCase[1];
        expect($filter('titlecase')(input)).toEqual(expected);
      }
    });
  });

})();
