


$( "body" ).on( "ready", function( ) {
    lazyLoadImages.init();
    lazyLoadImages.identify();
    lazyLoadImages.observe();
    // lazyLoadImages.load();
});


let 
    lazyLoadImages = {
        init: function(){
            // console.log ('init fires for lazy load');
            this.$images;  // images to watch
            this.imageObserver // observer
        },
        identify: function(){
            this.$images = $('*[data-loadstatus="notLoaded"]');
            // console.log ('debugging');
        },
        observe: function(){
            // console.log ('observe');


            let 
                that = this,
                imageObserverOptions = {     
                    rootMargin: '0% 0% 0% 0%'
                };
  
            
            this.imageObserver = new IntersectionObserver((entries,index) => {

                entries.forEach((entry,index) => {
                   if (entry.isIntersecting) {
                        // console.log (entry.target, ' i work');
                        this.load(entry.target)
                       } else {
                       }
                   })
                },imageObserverOptions);
            
        
            // this.$blocks.attr("data-visibility-status","notVisible").each ((index,block) => {
            
            this.$images.each ((index,image) => {

                this.imageObserver.observe(image);
            })


        },
        load: function(image){
            // console.log ('load image')
            $(image).attr("data-loadstatus","loaded"); 
            // if ($(image)[data-loadstatus="notLoaded"]) {
            let bkgImageSource = $(image).data('bkgimage'); 
            // $(image).attr('src',source);
            $(image).css("background-image", "url(" + bkgImageSource + ")");

            // let backgroundSource= 

            // console.log (source);
            
        
          
        }
    }