


$( "body" ).on( "ready", function() {
   


    Object.setPrototypeOf(storiesBlocks,blocks);
    Object.setPrototypeOf(stories,block);
    
    storiesBlocks.init();
    // alert ('hi');
    // let parameters = '?orderby=date';


    let parameters = '';
    
    storiesBlocks.load(storiesBlocks.blockType,parameters)
        .then (data => storiesBlocks.match(data))
        .then (data => storiesBlocks.parse(data))
        .then (()=> storiesBlocks.activate())
        ;
    // console.log (data);
    // alert ('hi');
    // lazyLoadImages.load();
});


let 
    storiesBlocks= {
        init: function() {

            this.$blocks = $('.block.stories');
            this.blockType='stories';
            // alert ('hi');



            
            // Object.setPrototypeOf(storiesBlocks, blocks);
        },
        parse: function(data){        
            this.$blocks.each( (index,element) => {  //adds rest data to field
            element.transitionTime = this.$blocks[index].restData.transitionTime;
            // this.transitionTime = this.$blocks[index].restData.transitionTime;
            element.order = this.$blocks[index].restData.order;
             }) 
            },
        activate: function(){        
            
            
      
            this.$blocks.each( (index,element) => {  //adds rest data to field

                // console.log ('block');

                    stories.init(element,this);
                    // stories.setupObserver(element);
                    stories.load(element,this)
                        .then (data =>stories.parse(data))
                        .then ( () => stories.buildInterface())
                        .then ( () => stories.setupInterfaceObserver())
                        .then ( () => stories.setupObserver(element))




                })   
        }  
    },
    stories = {
        init: function(block,parent){
            this.$block = block;
            // console.log ("stories init fires");
            this.transitionTime = block.transitionTime;
            this.$interface = $(block).find('.image .interface');
            this.$text = $(block).find('.content .text');
            this.$details = $(block).find('.text .details');
            // console.log ('debugging');  
            this.$imageWrapper = $(block).find('.content .image'); 
            this.$newImage = $(block).find('.content .image .current'); 
            this.$images = $(block).find('.content .image .outerWrapper'); 
            // this.$newImage;
            this.$detailFields =  $(block).find('.content .text .details .element'); 
            this.$quoteLarge =  $(block).find('.content .text .quote.large'); 
            this.currentStory = 0;
            this.$quoteSmall =  $(block).find('.content .text .quote.small'); 
            this.$name = $(this.$details).find('.name');
            this.$title = $(this.$details).find('.title');
            this.$state = $(this.$details).find('.state');
            this.$city = $(this.$details).find('.city');
            this.$organization = $(this.$details).find('.organization');
            this.numberStories; 




            },
        load: function(block,parent){
            // console.log ("stories load fires");
            // console.log (block.transitionTime);
            // console.log (block.order);
            let parameters = '';
            switch (block.order){
                case "name":
                     parameters = "?orderby=name&order=ASC";
                    break;
                case "date":
                     parameters = "?orderby=date&order=DESC";
                    break;
                }
            url =  parent.websiteRoot + '/wp-json/sd/v1/' + 'stories/a' + parameters;

            return new Promise (   (resolve,rejected) => {
                data = fetch (url)
                    .then (data => { return data.json()});
                  
                resolve (data);
                })
            },
        parse: function(data) {
            // console.log ('story parse fires');
            this.restData = data;
            this.numberStories = this.restData.length;

            // console.log (data);
        },
        activate: function() {
            // console.log ('story activate fires');



            this.displayGraphic();
            gsap.from (  $(this.$interface.find('.button')), {scale: 3, duration: 1, opacity: 0, stagger:.25});
            this.displayText();
            this.updateInterface(0);
            this.startTimer();


        },
        displayText: function(){

            let quoteLargeSplit = new SplitText(this.$quoteLarge,{type:"lines,words"}) ;
            this.$detailFields =  $(this.$block).find('.content .text .details .element'); 
            // console.log ('display text debugging 1');
            // alert ('hi');
            
            this.$text.removeClass('notReady');
            this.$text.children().removeAttr('style');

            this.displayTextTL = gsap.timeline ({paused:true, onComplete: displayTextTLComplete})
            .add ('opening')
            .from (this.$detailFields, {duration: .25, stagger: .08, y:"100%", opacity: 0},"opening")
            .from (this.$quoteLarge.find('DIV'), {duration: .25, stagger: .03, y:"100%", opacity: 0},"opening")
            .from (this.$quoteSmall, {duration: .5,  y:"100%", opacity: .5},"opening")
            ;

      
            // this.$quoteSmall.removeAttr('style');

            this.displayTextTL.play();
            // console.log ('display text remove debugging');
            function displayTextTLComplete(){
                quoteLargeSplit.revert();
            }
            

        },

        startTimer: function(){
            this.timer = setInterval( ()=>  {this.displayNext()}, this.transitionTime);
        },

        resetTimer: function(){
            clearTimeout(this.timer);
        },

        displayNext: function(){
            console.log ('hello');
            let newStory =  (this.currentStory+ 1) % this.numberStories;
            this.transition (newStory);
        },

        displayGraphic: function(newGraphic=0){
            
            let that = this;

            this.$newImage = this.$images.eq(newGraphic).addClass('new');

            
            this.activatePhotosTL = gsap.timeline ({paused:true,  onComplete: activatePhotosTLComplete})   /// this is used only once when the block first appears
            .add ('opening')
            .from (this.$newImage, {duration: 2, scale: 1.5, opacity:0},'opening');
   
         

            function activatePhotosTLComplete (newGraphic){
                that.$images.removeClass('current');
                that.$newImage.addClass('current').removeClass('new');
        
            }
            this.$imageWrapper.removeClass('notReady');
            this.activatePhotosTL.play();


        },

        buildInterface: function(data) {
            // console.log ('story build interface fires');
            this.restData.forEach ((element,index) =>{
                // console.log (index, element);
                this.$interface.prepend('<div class = "button"></div>');


            });

        },
        setupInterfaceObserver: function(data) {
            // console.log ('setup interface observerfires');
            $(this.$interface).find('.button').each( (index,element) => {
                $(element).click (() => {
                    this.resetTimer();
                    this.startTimer();
                    this.transition(index)
                })
                
                // console.log (index,element);
            })
        },
        updateContent: function(story){
            // console.log ('update content fires', story);
            
            return new Promise ((resolve, rejected) =>{
                $(this.$quoteLarge).text(this.restData[story].large_quote);
                $(this.$quoteSmall).html(this.restData[story].small_quote);
                $(this.$name).html('<span class = "element">' + this.restData[story].name + '</span>');
                $(this.$title).html('<span class = "element">' + this.restData[story].title + '</span>');
                $(this.$organization).html('<span class = "element">' + this.restData[story].organization + '</span>');
                $(this.$city).html('<span class = "element">' + this.restData[story].city + '</span>');
                $(this.$state).html('<span class = "element">' + this.restData[story].state + '</span>');

                resolve();
            })

            
        


        },
        updateInterface:function(story){
            // console.log ('interface starting');
            this.$interface.find('.button').removeClass('current');
            this.$interface.find('.button').eq(story).addClass('current');
            // console.log ('interface starting2');
        },


        removeText: function (){
            
            return new Promise (   (resolve,rejected) => {                  
              
                let quoteLargeSplit = new SplitText(this.$quoteLarge,{type:"lines,words"}) ;

                
                this.removeTextTL = gsap.timeline ({paused:true, onComplete: displayTextTLComplete})
                .add ('opening')
                .to (this.$text.children(), {duration: .4, stagger: .25, opacity: 0},"opening")
                // .to (this.$quoteLarge.find('DIV'), {duration: .25, stagger: .05, y:"100%", opacity: 0},"opening")
                ;
    
                // $(block).addClass('notReady');
                this.$text.removeClass('notReady');
                this.removeTextTL.play();
    
                function displayTextTLComplete(){
                    quoteLargeSplit.revert();
                    resolve ();
                   
                        
                    }


                })
            
       
            },
        transition: function(story) {
            // console.log ('story transition fires for story number' + story);
            this.currentStory = story;
            this.removeText()
                .then ( () => {this.updateContent(story)})
                .then ( () =>{
                    this.displayGraphic(story);
                    this.displayText();
                    this.updateInterface(story);
                    })
                    ;
                // .then ( () => {});

        }
    }

    








