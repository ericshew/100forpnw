

$( "body" ).on( "ready", function() {
   
    // alert ('testing');
    // console.log ('expanding messages');
    Object.setPrototypeOf(expandingMessageBlocks,blocks);
    Object.setPrototypeOf(expandingMessages,block);
    
    // storiesBlocks.init();
    expandingMessageBlocks.init();
    expandingMessageBlocks.load(expandingMessageBlocks.blockType)
        .then (data => expandingMessageBlocks.match(data))
        .then (data => expandingMessageBlocks.parse(data))
        .then ( ()=> expandingMessageBlocks.activate());

    // storiesBlocks.load(storiesBlocks.blockType,parameters)
    //     .then (data => storiesBlocks.match(data))
    //     .then (data => storiesBlocks.parse(data))
    //     .then (()=> storiesBlocks.activate())
    //     ;
});

let 
    expandingMessageBlocks= {
        init: function() {
            this.$blocks = $('.block.expandingMessages');
            this.blockType='expandingMessages';
            // alert ('hi');

            
          
        },
        parse: function(data){        
            // console.log ('debugging test');
            this.$blocks.each( (index,element) => {  //adds rest data to field
                // console.log ('debugging test');
            element.transitionTime = this.$blocks[index].restData.transitionTime;
            // this.transitionTime = this.$blocks[index].restData.transitionTime;
            // element.order = this.$blocks[index].restData.order;
             }) 
            },
        activate: function(){        
            
            
      
            this.$blocks.each( (index,element) => {  //adds rest data to field
                let expandingMessagesInstance ={};
                Object.setPrototypeOf(expandingMessagesInstance,expandingMessages );
                // console.log ('block');
                expandingMessages.init(element,this);
                expandingMessages.setupObserver(element);
                expandingMessages.setupInterfaceObserver(element);
                expandingMessages.queueAnimation(element);
                // expandingMessages.updateContent(element);
             
            


                })   
        }  
    },
    expandingMessages = {
        init: function(block,parent){
            // console.log ('block works');
            this.messages = block.restData.messages;
            this.transitionTime = block.restData.transitionTime;
            this.numMessages = this.messages.length;
            this.currentMessage =0;
            // this.$buttons = $(block).find ('.wrapper .images .element');
            this.$buttons = $(block).find ('.wrapper .images .image');
            this.$buttonPrevious = $(block).find ('.imageWrapper .button.previous');
            this.$buttonNext = $(block).find ('.imageWrapper .button.next');

        
            this.$body = $(block).find ('.wrapper.messages .body.element P');
            this.$subheadLine1 = $(block).find ('.text .headlines .subhead1');
            this.$subheadLine2 = $(block).find ('.text .headlines .subhead2');
            this.$overflowButton = $(block).find ('.text .overflowButton');
            console.log ('block works2');
            },
       
        activate: function(block) {
            // console.log ('expanding messages activate fires');
            $(block).removeClass('notReady')
            this.updateContent(0);
            this.displayContent();
            this.startTimer();

        },
        queueAnimation: function() {
            this.displayContentTL = gsap.timeline ({reversed: true, paused:true})
            .add ('opening')
            .from (this.$body, {y:100, opacity: 0},'opening')
            .from (this.$subheadLine1, {x:-100, opacity: 0},'opening')
            .from (this.$subheadLine2, {x:-100, opacity: 0},'opening+=.25')
            .from (this.$overflowButton, {opacity: 0},'opening')
            // .add( function(){ console.log('Woohoo!') } )
            // .from ('div', {scale:2, opacity: 0});
            ;
            function completeAnimation(){
                // console.log ('animation complete');
                return new Promise ((resolve, rejected) =>{ 
                    resolve();
                })
            }
        },
        displayContent: function(){
            let that = this;
            // console.log ('display content fires');
            this.displayContentTL.eventCallback("onComplete", finish);
            this.displayContentTL.play();
            function finish(){
                // console.log ("finish inner function");
  
                that.resetTimer();
                that.startTimer();
            
            }
        
        },
        removeContent: function(){
            // console.log ("remove content fired");
            
            return new Promise ((resolve, rejected) => {
                // that.displayContentTL.eventCallback("onComplete", finish);
                this.displayContentTL.eventCallback("onReverseComplete", finish);
                this.displayContentTL.reverse(0);
                // console.log ("remove content fired2b");
                // this.displayContentTL.play();
                function finish(){
                    // console.log ("finish inner function")
                    resolve();
                }
            })
        },

        updateContent: function(message){
            let buttonText;
            // console.log ('update content fires', story);
            
            return new Promise ((resolve, rejected) =>{
                this.$body.text(this.messages[message].body);
                this.$subheadLine1.find('span').text(this.messages[message].subheadLine1);
                // $('#tf1').textfill(widthOnly = true, debug =true);
                this.$subheadLine1.textfill({widthOnly: true, maxFontPixels : 500});
                this.$subheadLine2.find('span').text(this.messages[message].subheadLine2);   
                this.$subheadLine2.textfill({widthOnly: true, maxFontPixels : 500});
                if  (this.messages[message].overflowButtonText !== "") {
                    buttonText = '<a class = "button" target="_blank" href =" ' + this.messages[message].overflowPageUrl + '">' + this.messages[message].overflowButtonText + '</a>';
                } else {
                    buttonText = '';
                }
                
                this.$overflowButton.html(buttonText);
                this.updateInterface(message);
                // this.startTimer();
       
               

                resolve();
            })

        },


       
        startTimer: function(){
            this.timer = setInterval( ()=>  {this.displayNext()}, this.transitionTime);
        },
        resetTimer: function(){
            clearTimeout(this.timer);
        },
        displayNext: function(){
            // console.log ('hello');
            let newMessage =  (this.currentMessage+ 1) % this.numMessages;
            this.transition (newMessage);
        },
        displayPrevious: function(){
            // console.log ('hello');
            let newMessage =  (this.currentMessage - 1 + this.numMessages) % this.numMessages;
            this.transition (newMessage);
        },
       
        setupInterfaceObserver: function(data) {
            // console.log ('setup interface observerfires');
            // .block.expandingMessages .wrapper .images .element
            $(this.$buttons).each  ((index,element )=> {
                $(element).click ( () => {
                    this.resetTimer();
                    this.transition(index);
                    // console.log ('click', index)
                })
            })

            this.$buttonPrevious.click ( () => {
                this.displayPrevious();
            })
            
            this.$buttonNext.click ( () => {
                // alert ('Nclick')
                this.displayNext();
            })



     
 
        },
        updateInterface:function(message){
            // console.log ('interface starting');
            this.$buttons.removeClass('current');
            this.$buttons.eq(message).addClass('current');
            // console.log ('interface starting2');
        },

        transition: function(message) {
            // console.log ('story transition fires for story number' + story);
            // console.log ('transition');
            this.currentMessage = message;
            this.removeContent()
                .then ( ()=> this.updateContent(message))
                .then ( ()=> this.displayContent());
                
    
        }
    }


