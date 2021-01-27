


$( "body" ).on( "ready", function() {
   
    // alert ('hi');

    Object.setPrototypeOf(whoWeAreBlocks,blocks);
    Object.setPrototypeOf(whoWeAre,block);
    console.log ('who we are');
    
    whoWeAreBlocks.init();
    // alert ('hi');
    // let parameters = '?orderby=date';


    // let parameters = '';
    
    whoWeAreBlocks.load(whoWeAreBlocks.blockType)
        .then (data => whoWeAreBlocks.match(data))
        // .then (data => whoWeAreBlocks.parse(data))
        .then (()=> whoWeAreBlocks.activate())
        ;
    // console.log (data);
    // alert ('hi');
    // lazyLoadImages.load();
});


let 
    whoWeAreBlocks= {
        init: function() {

            this.$blocks = $('.block.whoWeAre');
            this.blockType='whoWeAre';
            // alert ('hi');



            
            // Object.setPrototypeOf(storiesBlocks, blocks);
        },
        activate: function(){        
            
            
      
            this.$blocks.each( (index,element) => {  //adds rest data to field

                // console.log ('block');


                    let whoWeAreInstance = {};
                    Object.setPrototypeOf(whoWeAreInstance, whoWeAre);


                    whoWeAreInstance.init(element,this);

                    whoWeAreInstance.setupObserver(element);





                })   
        }  
    },
    whoWeAre = {
        init: function(block,parent){


            this.$block = block;
            this.$title = $(block).find('.title H2');
            this.$body = $(block).find('.body');
            this.$partners = $(block).find('.partner');


            // let bodySplit = new SplitText($(this.$body).find('p'),{type:"lines,words"});
            let bodySplit = new SplitText($(this.$body).find('p'),{type:"lines"});


            this.displayTL = gsap.timeline ({ onComplete: finish, paused:true})
            .add ('opening')
            .from (this.$title, {duration: 1, y:"100%", opacity: 0},"opening")
            // .from (this.$quoteLarge.find('DIV'), {duration: .25, stagger: .03, y:"100%", opacity: 0},"opening")
            // .from (this.$quoteSmall, {duration: .5,  y:"100%", opacity: .5},"opening")
                .from (this.$body.find('div'), {stagger: .125, duration: .25,  y:"100%", opacity:0})
                .from (this.$partners, {stagger: .25, duration: .5,  scale: 2, opacity:0})
            ;
            function finish(){
                console.log ('done!');
                bodySplit.revert();
            }
          


            },
       
        activate: function() {
            console.log ('story activate fires');
            $(this.$block).removeClass('notReady');
            this.displayTL.play();
     






        },
  

        displayGraphic: function(newGraphic=0){
            


        }
    }

    








