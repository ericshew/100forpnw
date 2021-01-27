
 
    // console.log ('testing ' + powerEase);
       
    
    $( "body" ).on( "ready", function( ) {
       header.init();

    


    });

    $( "body" ).on( "launch", function( ) {
        header.openingAnimation();
 
     
 
 
     });
 
 

  

  



var
    header = {
        init: function(){
           var
            that = this;
            this.$heroLoc = $('#SD DIV.hero'); 
            this.$titleLoc = $(this.$heroLoc).find ('.pageTitle');  
            this.$parallaxWrapper = $(this.$heroLoc).find ('.parallax');  
            this.$burnsWrapper =  $(this.$heroLoc).find ('.burns');  
            // console.log ('number of title' + $(this.$titleLoc).length);
           
            // translateY(100px)
        
            var $el = $('.parallax-background');
            $(window).on('scroll', function () {
                var 
                    scroll = $(document).scrollTop();
                that.$parallaxWrapper.css({
                    // 'background-position':'50% '+(-.4*scroll)+'px'
                    // 'background-position':'50% '+(-.4*scroll)+'px'
                    'transform' : 'translateY(' + scroll *.4 +'px)'
                });
                let opacity = 1- (scroll * .01);
                // console.log (opacity);
                that.$titleLoc.css({
                    // 'opacity':'100% '- scroll +'px'
              

                    'opacity':opacity
                });
            });
        },
        openingAnimation: function(){
            tl = gsap.timeline({paused:true})
                .add('transition',.125)
                // .from (this.$elements, {opacity:0, duration: 1} ,'transition' )
                .to (this.$burnsWrapper, {scale:1.2, duration: 15} ,'transition' )
                .from (this.$titleLoc,{opacity:0, duration:1.5 },'transition')
                // .from (this.$button,{opacity:0, duration:.5 },'transition')
                // .from (this.$interface,{y:"100%", duration:1.5 },'transition')
                ;
            this.$heroLoc.removeClass('notReady');
            tl.play();
            }


        }
    

        
    
    



