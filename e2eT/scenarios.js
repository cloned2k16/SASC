'use strict';

describe('SASC', function() {

    it          ('should stay on the home page'                             , function() {
      browser.get('/');
      expect(browser.getLocationAbsUrl()).toMatch("");
    });


    describe    ('basic Tests'                                              , function() {
        beforeEach(function() {
        });
        
    });
  
  
    describe    ('Filter Tests'                                             , function() {
        beforeEach(function() {
        });
  
        browser.get('/');
        // .... and more ...
       
    });

    //TODO .... put more test here ...
});
    