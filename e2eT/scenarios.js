'use strict';

describe('SASC', function() {

    it          ('should stay on the home page'                             , function() {
      browser.get('/');
      expect(browser.getCurrentUrl()).toMatch("");
    });


    describe    ('basic Tests'                                              , function() {
        beforeEach(function() {
        });

        it('should have title', function() {
            expect(browser.getTitle()).toEqual('Simple Angular Shopping Cart');
        });
           
        var el = element(by.id('brndLbl'));    

        //TODO .... put more test here ...

        
    });
  
  
    describe    ('Filter Tests'                                             , function() {
        beforeEach(function() {
        });
  
        browser.get('/');
       
        //TODO .... put more test here ...
    });

});
    