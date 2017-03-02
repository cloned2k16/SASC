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
            ,   productTypes    :  [Banana
                                ,   Apple
                                ,   Orange
                                ,   Chicken
                                ,   Beef
                                ,   Aubergine
                                ,   Broccoli
                                ,   Zucchini
                                ,   Baguette
                                ,   Cherry
                                ,   Pork
                                ,   Carrot
                                ,   Pretzel
                                ]
            ,   rndElement      :   function    (a)             {
                    return a[Math.floor(Math.random()*a.length)];
                }
            ,   randomProduct   :   function    ()              {
                    var sel = this.rndElement(this.productTypes);
                    var tile= eval(new sel());
                    return tile;
                }
            ,   getProductList  :   function    ()              {
                    var list    = []
                    ,   numProd = this.numProducts;
                    ;
                    for (var i = 0; i < numProd; i++) {
                        list.push(this.randomProduct());
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
                                    ]
                ,   numTilesShown   : 0                 
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
                                backColor   :   tile.backColor
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
    Object.prototype.extends            =   function    (parent)    {
        var oo  = this.prototype.constructor

        oo.prototype              = Object.create(parent.prototype);                                    //  just protoype stuff !
        oo.prototype.constructor  = oo;                                                                 //  fix misplaced constructor
        oo.prototype.parent       = parent;                                                             //  hold parent here
        oo.prototype.super        = (th)    => {                                                        //  super emulated call
            this.prototype.parent.call(th);
            th.className    =   oo.name;
            th.parent       =   parent;
        }
    }
//  ----------------------------------- --------------------------- ---------------------------------
//  ----------------------------------- --------------------------- ---------------------------------
    function    ShopTile                ()                          {
        this.backColor  =   '#FFF';
        this.colSpan    =   2;
        this.rowSpan    =   3;
        this.type       =  ND;
        this.text       =   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
//  ----------------------------------- --------------------------- ---------------------------------
    function    Vegetable               ()  {   Vegetable   .prototype.super(this);
        this.color          = '#40F060'
        this.image          = "url('img/vegetables.jpg')"
    }

    function    Fruit                   ()  {   Fruit       .prototype.super(this);
        this.color          = '#E09040'
        this.image          = "url('img/fruits.jpg')"
    }

    function    Meat                    ()  {   Meat        .prototype.super(this);
        this.color          = '#E04040'
        this.image          = "url('img/meats.jpg')"
    }

    function    Bread                   ()  {   Bread       .prototype.super(this);
        this.color          = '#E04040'
        this.image          = "url('img/breads.jpg')"
    }

    Vegetable   .extends    (ShopTile);
    Fruit       .extends    (ShopTile);
    Meat        .extends    (ShopTile);
    Bread       .extends    (ShopTile);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Banana                  ()  {   Banana      .prototype.super(this); }
    function    Apple                   ()  {   Apple       .prototype.super(this); }
    function    Orange                  ()  {   Orange      .prototype.super(this); }
    function    Cherry                  ()  {   Cherry      .prototype.super(this); this.backColor='#FFE'; }

    Banana      .extends    (Fruit);
    Apple       .extends    (Fruit);
    Orange      .extends    (Fruit);
    Cherry      .extends    (Fruit);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Chicken                 ()  {   Chicken     .prototype.super(this); }
    function    Beef                    ()  {   Beef        .prototype.super(this); }
    function    Pork                    ()  {   Pork        .prototype.super(this); this.backColor='#FEE'; }    

    Chicken     .extends    (Meat);
    Beef        .extends    (Meat);
    Pork        .extends    (Meat);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Aubergine               ()  {   Aubergine   .prototype.super(this); }
    function    Broccoli                ()  {   Broccoli    .prototype.super(this); }
    function    Zucchini                ()  {   Zucchini    .prototype.super(this); }
    function    Carrot                  ()  {   Carrot      .prototype.super(this); this.backColor='#FDD'; }    

    Aubergine   .extends    (Vegetable);
    Broccoli    .extends    (Vegetable);
    Zucchini    .extends    (Vegetable);
    Carrot      .extends    (Vegetable);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Baguette                ()  {   Baguette    .prototype.super(this); }
    function    Pretzel                 ()  {   Pretzel     .prototype.super(this); this.backColor='#DFF'; }    

    Baguette    .extends    (Bread);
    Pretzel     .extends    (Bread);
//  ----------------------------------- --------------------------- ---------------------------------
