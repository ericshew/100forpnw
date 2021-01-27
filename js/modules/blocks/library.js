


$( "body" ).on( "ready", function( ) {
   




    // alert ('hi');s
    // lazyLoadImages.load();
});


let 
    blocks= {
        load: function(blockType, parameters =''){
            return new Promise( (resolve,rejected) =>{
                this.pageID = get_current_page_id();
                this.websiteRoot = location.protocol + '//' + location.host;
                let 
                    url =  this.websiteRoot + '/wp-json/sd/v1/block?id=' + this.pageID + '&blocktype=' + blockType + parameters;
               
                // resolve(url);
                data = fetch (url)
                    .then (data => {return data.json()});
                // console.log (data);
                resolve(data);
             })



        },

        match: function(data){    //  identifies each block with the corresponding rest element using matching keys and adds rest data to the appropriate block
            return new Promise( (resolve,rejected) =>{
                $(this.$blocks).each((index,divElement) => {
                // $.each((this.$blocks),(index,divElement)  => {
                    // this.pageID + '&blocktype=' + blockType ;
                    // console.log ('halj');
                    $blockKey = $(divElement).data('blockid');  
                     /// gets the id for the block on the div
                    // this.restData = data;
                    data.forEach(blockElement => {
                        // console.log ($blockKey, blockElement['blockID']);
                        if (blockElement['blockID']== $blockKey) {
                            // console.log ('we have a winner');
                            // divElement.restData = blockElement;
                            // sliders.fnord = blockElement;
                            this.$blocks[index].restData = blockElement;
                   

                        }
                    })
                });
                
                
              
                resolve(data);
            })
        },
        
        loadRest: function(blockType) {
            this.$websiteRoot = location.protocol + '//' + location.host;
            this.pageID = get_current_page_id();
            this.fetchRestP(blockType)
            // .then ((data) => this.parseP(data));
            .then ((data) => {         
                    this.restData= data;
                })
            .then (() => this.match());
        },
        setupObserver(block){
            // console.log ('slider observer  fires');
            let 
                that = this,
                observerOptions = {     
                    rootMargin: '0% 0% 0% 0%'
                };
            this.blockObserver = new IntersectionObserver((entries,index) => {
                entries.forEach((entry,index) => {
                   if (entry.isIntersecting) {   
                       this.activate(entry.target);
                        this.blockObserver.unobserve(block);
                       } 
                   })
                },sliderObserverOptions);  
            this.blockObserver.observe(block);
        },
        fetchRestP: function(blockType){
            let 
                that = this,
                data;
            return new Promise (   (resolve,rejected) => {
                let url =  that.$websiteRoot + '/wp-json/sd/v1/block?id=' + this.pageID + '&blocktype=' + blockType ;
                data = fetch (url)
                    .then (data => { return data.json()});
                  
                resolve (data);
                })
        }
    },
    block ={
        setupObserver: function(block) {
            // console.log ('slider observer  fires');
            let 
                that = this,
                blockObserverOptions = {     
                    rootMargin: '0% 0% 0% 0%'
                };
            this.blockObserver = new IntersectionObserver((entries,index) => {
                entries.forEach((entry,index) => {
                   if (entry.isIntersecting) {   
                       this.activate(entry.target);
                    //    console.log ('found!!!!!!!!!!!!!!' + entry.target.innerHTML);
                        this.blockObserver.unobserve(block);
                       } 
                   })
                },blockObserverOptions);  
            this.blockObserver.observe(block);
        },
        test: function() {
            // console.log ('test 123456');
        }
     
    }
       

    
function get_current_page_id() {
    var page_body = $('body.page');

    var id = 0;

    if(page_body) {
        var classList = page_body.attr('class').split(/\s+/);

        $.each(classList, function(index, item) {
            if (item.indexOf('page-id') >= 0) {
                var item_arr = item.split('-');
                id =  item_arr[item_arr.length -1];
                return false;
            }
        });
    }
    return id;
}
