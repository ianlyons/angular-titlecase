(function() {
  'use strict';
  console.log('running test!!11');

  describe('Filter: titlecase', function() {
    var $filter;

    beforeEach(function() {
      angular.mock.module('angular-titlecase');
    });

    inject(function(_$filter_) {
      $filter = _$filter_;
    });

    var testCases = [
      ['this is a test', 'This is a Test'],
      ['tHIs is a test', 'This is a Test'],
      ['THIS IS A TEST', 'This is a Test'],
      ['this: is a test', 'This: Is a Test']
    ];

    it('works for all known test cases', function() {
      _.each(testCases, function(testCase) {
        var input = testCase[0];
        var expected = testCase[1];

        expect($filter('titlecase')(input)).toEqual(expected);
      });
    });
  });

})();
