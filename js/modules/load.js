var
    $ = jQuery;
    // alert ('hi');

$(window).on('load  ', function () {
    console.log ('loading');

    let 

        launchInterval = 1000;
    




   

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    // Promise.all([svgStatus.confirmConversionP(), pageAttributes.confirmLoadingP()])
    svgStatus.confirmConversionP()
        .then(function() {
            console.log ('hi');
            // docuument is ready when the page attributes load and the svg covnerts
            $( "BODY" ).addClass( "ready" );
            $( "body").trigger( "ready" );
            $( "BODY").removeClass ("loading");
            })
        // .then ( () => pageAttributes.readyP())
        .then (() => {
            // when the svgs convert, the page attributes load, and the interval passes the launch phase starts
            // alert ('hello1111');
            $( "BODY" ).addClass( "launch" );
            $( "body").trigger( "launch" );  

            console.log ('hi2');
            });

        


   

    

});

var


    svgStatus = {
        init: function(){
            this.svgSupportClass = 'style-svg';// the class that is used to tell which SVGs to  convert
            this.svgReplacedClass = 'replaced-svg'; // the class that is added when SVGs are replaced
            this.svgDetectInterval = 300; // numbe of miliseconds betweeen SVG checks
            this.maxNumberSVGDetects = 6; // number of SVG detects before
            this.numberSVGsToConvert = $('.' + 'style-svg').length;
            console.log ('dbug');
        },
        confirmConversionP: function(){
            let 
                that = this;
            this.init();
                return new Promise(
                    function (resolve, reject) {
                    console.log ('promise made')
                    let numberDetects = 0,
                        i = 0,
                        sleep = (milliseconds) => {
                             return new Promise(resolve => setTimeout(resolve, milliseconds))
                          }
                        function svgTestLoop() {           //  create a loop function
                            // console.log ('test preloop');
                            sleep(that.svgDetectInterval ).then(() => {//  your code here
                                // console.log ('loop iteration)');
                                numberDetects++; 
                                console.log ('detecting')               ;
                                if ($('.' + that.svgReplacedClass).length   == that.numberSVGsToConvert)  {
                                    resolve('all converted');
                                    return;
                                    }                 //  increment the counter
                                if (numberDetects <   that.maxNumberSVGDetects ) {            //  if the counter < 10, call the loop function
                                    console.log ('iteration')
                                    svgTestLoop() ;             //  ..  again which will trigger another 
                                    }       
                                if (numberDetects = that.maxNumberSVGDetects ) {
                                    console.log ('ERROR: not all SVGs converted')
                                    resolve('max number of detects')
                                    // reject('max number of detects')
                                    }                 //  ..  setTimeout()
                            })
                            }
                        svgTestLoop();  
                });  
                




          
        }
    },




    

    pageAttributes = {
        init: function(){
            // console.log ('init fires');
            this.pageID;
            // pageAttributes.load();
            this.defaultPrimaryColor = "#12345";

        },
        load: function(){
            let
                that = this;
                // console.log('load fires');
                this.pageID = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
                this.$websiteRoot = location.protocol + '//' + location.host;
                let restData;
                const url =  '/wp-json/sd/v1/page_attributes/?&id=' + this.pageID;
                fetch (url)
                .then(data => {return data.json()})
                .then(data=>{
                    // console.log (data);
                    // let restData = data;
                    this.parse(data);
                    // console.log (restData)
                });    
          },
          parse: function(data){
            // console.log(data);
            // console.log (('parse fires'));
            // this.ID = data['page_attributes']['ID'];
            // this.primaryColor = data['page_attributes']['color']['primary'] ||  this.defaultPrimaryColor;
            // this.interfaceColor = data['page_attributes']['color']['interface'];
            // console.log (this.ID);    
            // console.log (this.primaryColor);    
            // documentReady();
        },
        confirmLoadingP: function(){
            let that = this;
            this.init();
            // console.log ('confirm loading works');
        


            return new Promise (function(resolve,rejected){
                this.pageID = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
                this.$websiteRoot = location.protocol + '//' + location.host;
                let restData;
                const url =  '/wp-json/sd/v1/page_attributes/?&id=' + this.pageID;
                fetch (url)
                .then(data => {return data.json()})
                .then(data=>{
                    
                    console.log (data);
                    // let restData = data;
                    that.parse(data);
                    resolve('all loaded');
                    // console.log (restData)
                });    
              
            })
           
        
     },
     launchP: function(){
         return new Promise (function(resolve,rejected){
           
             resolve('works');
         })
     },
     readyP: function(){
        return new Promise (function(resolve,rejected){
            console.log ('hello');
            resolve('works');
        })
    },
    }
