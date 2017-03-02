exports.config = {
        allScriptsTimeout   :   12345
    ,   specs               :   [
                                    '*.js'
                            ]
    ,   x_capabilities      :   {
                                    'browserName'       : 'chrome'
                                ,   'chromeOptions'     : {
                                                            'args': ['show-fps-counter=true']
                                                        }
                                }
    ,   multiCapabilities   :   [   { 'browserName': 'firefox'}
                                ,   { 'browserName': 'chrome'}
                                ]
    ,   baseUrl             :       'http://localhost:3000/'
    ,   framework           :       'jasmine'
    ,   jasmineNodeOpts     :   {
                                    defaultTimeoutInterval: 30000
                                }
    ,   seleniumAddress     :       'http://localhost:4444/wd/hub'
};
