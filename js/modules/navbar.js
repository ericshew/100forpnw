


$( "body" ).on( "ready", function() {


  
  
    
    navbar.init();
   
   
    // alert ('navbar works')   

});


$( "body" ).on( "launch", function() {

    navbar.display();
 
   
    // alert ('navbar works')   

});


let 
    navbar= {
        init: function() {

    

            this.$logo = $('#navbar .logo');
            this.$logoPNW = $(this.$logo).find('#text-pnw');
            this.$100Percent = $(this.$logo).find('#text-100percent');
            // this.$100Percent = $(this.$for).find('#text-for');


            

            
            this.appearTL =  gsap.timeline ({paused:true})
               
                .from ($(this.$logo), {duration:2, y:"-300%", opacity: 0})
                .add ('logoContents',"-=1")
                .from ($(this.$logoPNW).find('path'), {scale: 3,transformOrigin:"50% 50%" , stagger: .125, duration:.375, opacity: 0},"logoContents")
                .from ($(this.$100Percent), {transformOrigin:"50% 50%" , duration:2, opacity: 0},"logoContents")
                // .from ($(this.$for), {transformOrigin:"50% 50%" , duration:2, opacity: 0},"logoContents+=.5")
                // .from (this.$logo, {scale: 3, duration: 2, opacity: 0});
                ;

            this.$logo.removeClass('notReady');
            
         
            },
        display: function(){        
            
            this.appearTL.play();
           
        }
        
    }