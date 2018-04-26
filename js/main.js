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
    ,   DB_model        =   {
                numProducts     :   111
            ,   productTypes    :   []
            ,   rndElement      :   function    (a)             {
                    return a[Math.floor(Math.random()*a.length)];
                }
            ,   randomProduct   :   function    (k)             {
                    var sel     = this.rndElement(this.productTypes);
                    var tile    = eval(new sel());
                        tile.key= k;
                    return tile;
                }
            ,   getProductList  :   function    ()              {
                    var list    = []
                    ,   numProd = this.numProducts;
                    ;
                    for (var i = 0; i < numProd; i++) {
                        list.push(this.randomProduct(i+1));
                    }
                    return list;
                }
        }
    ,   _APP            =   {
                version         :   '0.0.1'
            ,   author          :   'Paolo Lioy'
            ,   model           :   DB_model
        }
    ;
//  ----------------------------------- --------------------------- ---------------------------------
//  Angular code
//  ----------------------------------- --------------------------- ---------------------------------
    app.controller                      ('GridCtrl'                 , function($scope) {
        _APP.GridCtrl           =   this;
        _APP.GridCtrl.scope     =   $scope;

        $scope.action           =   {
                    buy         :   function    (txt,oo)    {
                        _log("buy",txt,oo);                                                             // when you click on the label
                    }

        };

        this.allProducts        =   _APP.model.getProductList();
        this.shopTiles          =   [];

        if (_APP.FilterCtrl != ND){
            _APP.FilterCtrl.scope.filter.apply();
        }

    });
//  ----------------------------------- --------------------------- ---------------------------------

//  ----------------------------------- --------------------------- ---------------------------------
    app.controller                      ('FilterCtrl'               , function FilterCtrl($scope) {
        _APP.FilterCtrl         =   this;
        _APP.FilterCtrl.scope   =   $scope;


        $scope.filter           =   {
                    categories      :  [{label:'Meats'      ,chk:   true    }
                                    ,   {label:'Fruits'     ,chk:   true    }
                                    ,   {label:'Vegetables' ,chk:   true    }
                                    ,   {label:'Breads'     ,chk:   true    }
                                    //,   {label:'Toys'       ,chk:   true    }
                                    ]
                ,   len             :   categories.length                    
                ,   width           :   '666px'
                ,   numTilesShown   :   0                 
                ,   apply           :   function    ()  {
                    var allTiles    =   _APP.GridCtrl.allProducts
                    ,   filt        =   this
                    ;

                    var tiles       =   [];

                    for (t in allTiles){
                        var tile     =   allTiles[t]
                        if (typeof(tile) == FN) continue;                                               //  skip some function ;)
                        var showIt   =   false                                                          //  assume hidden
                        ,   tileType =   tile.parent.name+'s'                                           //  to match with label
                        ;


                        for (f in filt.categories) {
                            var flt=filt.categories[f];
                            if (typeof(flt) == FN) continue;                                            //  skip some function ;)
                            if (flt.chk && flt.label== tileType){                                       //  if has to be shown
                                showIt=true;                                                            //  signal it and break the loop
                                break;
                            }
                        }
                        if (showIt) {
                            tiles.push({                                                                //  queue the Object to be shown
                                key         :   tile.key  
                            ,   backColor   :   tile.backColor
                            ,   color       :   tile.color
                            ,   image       :   tile.image
                            ,   colspan     :   tile.colSpan
                            ,   rowspan     :   tile.rowSpan
                            ,   label       :   tile.className
                            ,   text        :   tile.text
                            });
                        }
                    }
                    
                    this.numTilesShown      = tiles.length;
                    _APP.GridCtrl.shopTiles = tiles;                                                    //  update view
                }

        };

        if (_APP.GridCtrl != ND){
            $scope.filter.apply();
        }
    });
//  ----------------------------------- --------------------------- ---------------------------------

//  ----------------------------------- --------------------------- ---------------------------------
//  Data Model
//  ----------------------------------- --------------------------- ---------------------------------
    function    Extends                 (oo, parent)                {

        oo.prototype              = Object.create(parent.prototype);                                    //  just protoype stuff !
        oo.prototype.constructor  = oo;                                                                 //  fix misplaced constructor
        oo.prototype.parent       = parent;                                                             //  hold parent here
        oo.prototype.super        = (th)    => {                                                        //  super emulated call
            oo.prototype.parent.call(th);
            th.className    =   oo.name;
            th.parent       =   parent;
        }
    }
//  ----------------------------------- --------------------------- ---------------------------------
    function    ShopTile                ()                          {
        this.backColor  =   '#FFF';
        this.colSpan    =   2;
        this.rowSpan    =   3;
        this.type       =  ND;
        this.text       =   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
//  ----------------------------------- --------------------------- ---------------------------------
    ShopTile    .prototype.label        ='NONE';                                                        // eslint-disable-line 
//  ----------------------------------- --------------------------- ---------------------------------
    var categories                      =   ['Vegetable'
                                            ,'Fruit'
                                            ,'Meat'
                                            ,'Bread'
                                            ,'Toy'
                                        ]
    ,   vegetables                      =   ['Aubergine'
                                            ,'Broccoli'
                                            ,'Zucchini'
                                            ,'Carrot'
                                            ,'Cauliflower'
                                            ,'Asparagus'
                                            ,'Spinach'
                                        ]
    ,   fruits                          =   ['Banana'
                                            ,'Apple'
                                            ,'Orange'
                                            ,'Cherry'
                                            ,'Mango'
                                            ,'Coconut'
                                            ,'Lemon'
                                            ,'Lychee'
                                        ]
    ,   meats                           =   ['Chicken'
                                            ,'Beef'
                                            ,'Pork'
                                            ,'Lamb'
                                            ,'Goat'
                                        ]
    ,   breads                          =   ['Baguette'
                                            ,'Pretzel'
                                            ,'Brioche'
                                            ,'Ciabatta'
                                        ]
    //,   toys                            =   ['GameBoy']
    ,   createObjects                   =   (bundle ,outList)       =>  {                               //  build a list of Function extending a specific Function (OO alike) 
                                                                                                        //  and store them in outList
        var k
        ,   i
        ,   o
        ,   nm
        ,   oo
        ,   lst
        ,   knd
        ,   bLen            = bundle.length
        
        //  a clarification here may be required ...
        //  this 'imageExists' thing is a really bad & dirth solution (I know)
        //  but the optimization of this part was byond the scope of this test 
        //  the point here was to make the Tile Image fall back to the category image or to a color if none actually found on the server
        //  this code actually wont be necessary at all by just making sure all the image are in place or using a list of actually existing ones 
        //  either way it may become inconsistent somehow if not handled automatically in the backend
        //  and that's the point here (the fallback thing depending on actual availability of the images having no backend at all)
        
        //  to achieve same thing asynchronously we need to setup a binding wich will update all the objects once we know which images actually exist
        //  and also make sure to use a proper synchronization, in order to don't mess things up in an inconsistent way  ...
        //  not so difficult but, has to be coded :D 
        
        ,   imageExists     = (url) =>  {
                var http = new XMLHttpRequest();
                    http.open('HEAD', url, false);
                    http.send();
                    return http.status !== 404;
        }
        ;
        
        for (k=0 ; k< bLen ; k++ ){
            o   = bundle[k];
            knd = o.kind;
            lst = o.list;
            for (i = 0 ; i< lst.length ; i++ ){
                nm = lst[i];
                eval ('window. '+nm+'= function '+nm+'(){ '+nm                                          // eslint-disable-line
                        +'.prototype.super(this);'
                        + (imageExists('img/'+nm+'.jpg')
                        ? 'this.image= "url(img/'+nm+'.jpg)";'
                        : '')
                        +'}');
                oo=eval(nm);                                                                            // eslint-disable-line
                Extends(oo,knd);            
                eval (nm+'.prototype.label="'+nm+'"');                                                  // eslint-disable-line
                eval (nm+'.prototype.image="'+nm+'"');                                                  // eslint-disable-line
                outList.push(oo);
            }
        }
    }
    ,   catList                         =   []
    ,   catColors                       =   ['#AFC','#FF8','#FA6','#B86','#F8E']
    ;
    
    createObjects (    [{ 'kind' : ShopTile     , 'list' : categories   }]
                    ,catList);
                    
    for (var i=0; i < catList.length; i++) {
        if (i<catColors.length && catColors[i]!==ND) catList[i].prototype.color=catColors[i];
    }
    
    createObjects (    [{ 'kind' : catList[0]   , 'list' : vegetables   }
                    ,   { 'kind' : catList[1]   , 'list' : fruits       }
                    ,   { 'kind' : catList[2]   , 'list' : meats        }
                    ,   { 'kind' : catList[3]   , 'list' : breads       }
                    //,   { 'kind' : catList[4]   , 'list' : toys         }
                    ]
                    ,_APP.model.productTypes);
    ;
//  ----------------------------------- --------------------------- ---------------------------------
