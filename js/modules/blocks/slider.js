
$( "body" ).on( "ready", function() {
   
    Object.setPrototypeOf(sliders, blocks);
    Object.setPrototypeOf(slider,block);
    sliders.init();
    sliders.load(sliders.blockType)
 
        .then (data => sliders.match(data))
        .then (data => sliders.parse(data))
        .then (()=> sliders.activate())
        ;
    console.log (data);
    // alert ('hi');s
    // lazyLoadImages.load();
});
let 
    sliders= {
        init: function() {
            this.$blocks = $('.block.slider');
            this.blockType='slider';            
            // Object.setPrototypeOf(sliders, blocks);
        },
        parse: function(data){        
            this.$blocks.each( (index,element) => {  //adds rest data to field
            element.transitionTime = this.$blocks[index].restData.transitionTime;
             }) 
            },
        activate: function(){        
            
            // Object.setPrototypeOf(slider,block);
            
            this.$blocks.each( (index,element) => {  //adds rest data to field
                // let slidertest = createNewSlider(element);
                let sliderInstance = {};
                Object.setPrototypeOf(sliderInstance, slider);
               
         
                // sliderInstance.init(element);
                sliderInstance.init(element);
                sliderInstance.test();
                sliderInstance.setupObserver(element);
                })   
        }
    },
    slider = {
        init: function(slider){
            let
                transitionTime = slider.transitionTime / 1000,
                staggerTime = transitionTime * .75;
            // console.log ('init fires');
            this.$images = $(slider).find('.image');
            this.$currentImage = $(slider).find(' .imageWrapper .image.current');
            this.$CTAs = $(slider).find('.text .CTAs A.button');   
            this.$message =  $(slider).find('.text .message'); 
            this.$mainHeadline =  $(slider).find('.text .message STRONG');   
            this.$border =  $(slider).find('.border');   
            let headlineAnimationDuration = this.$images.length * transitionTime; 
        
            // Object.setPrototypeOf(slider, block1234);
            // slider.test();
          
            // console.log ('init fires');
            this.activateTL = gsap.timeline ({paused:true, onComplete: complete})
            .add ('opening')
            .from (this.$message, { duration: transitionTime, opacity:0},"opening")
            .from (this.$mainHeadline, { duration: transitionTime*2, opacity:0},"opening")
            .from (this.$border, { duration: transitionTime*.25, opacity:0},"opening")
            .from (this.$mainHeadline, { autoRound:false, duration: headlineAnimationDuration, letterSpacing: 0},"opening")
            .from (this.$CTAs,{duration: transitionTime/4, stagger: staggerTime/6,   ease:  SDlib.backInOutEase, y: "100%", opacity:0},"opening")
            .from (this.$images, {stagger: staggerTime, opacity:0, duration: transitionTime},"opening")
            .to (this.$images, {stagger: staggerTime, duration: transitionTime, scale: 1.4},"opening")
            // .from (this.$images, {stagger: .5, duration: 1},"opening")
            // .to (this.$images, {stagger: .5, duration: 1, scale: 1.4},"opening")
            ;
            function complete(){
                console.log ('complete');
                // that.advance();
            }
        },
        activate: function (slider) {
            // console.log (slider,'activates12');
            $(slider).removeClass('notReady');
     
            this.activateTL.play();
        },
        advance: function(){
            console.log ('advance');
        },
            
    }
