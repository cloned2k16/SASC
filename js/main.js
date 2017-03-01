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
    function    Vegetable               ()                          {   Vegetable   .prototype.super(this);
        this.color          = '#40F060'
        this.image          = "url('img/vegetables.jpg')"
    }

    function    Fruit                   ()                          {   Fruit       .prototype.super(this);
        this.color          = '#E09040'
        this.image          = "url('img/fruits.jpg')"
    }

    function    Meat                    ()                          {   Meat        .prototype.super(this);
        this.color          = '#E04040'
        this.image          = "url('img/Meats.jpg')"
    }

    Vegetable   .extends    (ShopTile);
    Fruit       .extends    (ShopTile);
    Meat        .extends    (ShopTile);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Banana                  ()  {   Banana      .prototype.super(this); }
    function    Apple                   ()  {   Apple       .prototype.super(this); }
    function    Orange                  ()  {   Orange      .prototype.super(this); }

    Banana      .extends    (Fruit);
    Apple       .extends    (Fruit);
    Orange      .extends    (Fruit);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Chicken                 ()  {   Chicken     .prototype.super(this); }
    function    Beef                    ()  {   Beef        .prototype.super(this); }
    Chicken     .extends    (Meat);
    Beef        .extends    (Meat);
//  ----------------------------------- --------------------------- ---------------------------------
    function    Aubergine               ()  {   Aubergine   .prototype.super(this); }
    function    Broccoli                ()  {   Broccoli    .prototype.super(this); }
    function    Zucchini                ()  {   Zucchini    .prototype.super(this); }
    Aubergine   .extends    (Vegetable);
    Broccoli    .extends    (Vegetable);
    Zucchini    .extends    (Vegetable);
//  ----------------------------------- --------------------------- ---------------------------------

_log(DB_model.getProductList())
