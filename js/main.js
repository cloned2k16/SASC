    var ND
    ,   NDs             =   ''+ND
    ,   FN              =   'function'
    ,   UA              =   navigator.userAgent
    ,   _CON            =   console
    ,   _log            =   (... a)         =>  { Function.apply.call(_CON.log     ,_CON,a); }
    ,   _err            =   (... a)         =>  { Function.apply.call(_CON.error   ,_CON,a); }
    ,   isMobile        =   {
            Android                     : function() {
                return UA.match(/Android/i);
            }
        ,   iOS                         : function() {
                return UA.match(/iPhone|iPad|iPod/i);
            }
        ,   Windows                     : function() {
                return UA.match(/IEMobile/i);
            }
        ,   Opera                       : function() {
                return UA.match(/Opera Mini/i);
            }
        ,   BlackBerry                  : function() {
                return UA.match(/BlackBerry/i);
            }
        ,   any                         : function() {
                return (isMobile.Android() 
                    ||  isMobile.iOS() 
                    ||  isMobile.Windows()
                    ||  isMobile.BlackBerry() 
                    ||  isMobile.Opera() 
                    );
            }
        }
    ,   app             =   angular.module('app',[
                                                  'ngMaterial'
                                              ,   'ngMessages'
                            ])
