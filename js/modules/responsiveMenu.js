





$( "body" ).on( "ready", function( ) {

    // console.log ('page ehader raedy');

    responsiveMenu.init();

    // responsiveMenu.setupObservers();

    responsiveTrigger.init();

});



$( "body" ).on( "launch", function( ) {



    

    

    responsiveTrigger.activate();

});



        var

        responsiveMenu = {

            init: function (){        

                // state = "off"; // can be off or on

                this.$wrapper = $('#responsiveMenu');

                this.$menuItems = $(this.$wrapper).find('LI');

                this.$socialMenu = $(this.$wrapper).find('#menu-social');

                this.$socialMenuItems = $(this.$socialMenu).find('LI');

         

                this.$parentMenuItems = $(this.$wrapper).find('.menu-item-has-children');

                this.subMenuToggleTL = []; // timelines 

                



                $(this.$wrapper ).click(function() {

                    // console.log ('deactivate menu');

                    // mobileMenu.deactivate();  //// uncomment this when FINSIHED!!!

                 

                    });

                this.splitMenuItems();

                menuActivateTL = gsap.timeline ({reversed: true, paused: true});



                menuActivateTL

                    // .from($wrapper,timeFast,{x: "100%"})

                    .to(this.$wrapper,SDlib.timeFast,{css:{right:"0%"}})

                    .add('menuAppear')

                    // .from($menuItems,{x: gsap.utils.wrap([-200, 200]),  opacity: 0,  duration: .2, stagger: 0.01})

                    .from($(this.$menuItems.find('A').find('DIV')),{y: 100,  opacity: 0,  duration: .2, stagger: 0.05},"menuAppear")

                    // .from($(this.$socialMenuItems.find('DIV')),{scale: 2,  opacity: 0,  duration: .5, stagger: 0.375},"menuAppear")

                    .from($(this.$socialMenuItems),{scale: 2,  opacity: 0,  duration: .5, stagger: 0.375},"menuAppear")

                    ;

                    


                this.setupMenuTimelines();

              },

            splitMenuItems: function(){

                // console.log ('split menu fires');

                this.$menuItems.each( (index,element) => {

                    // console.log ('each works');

                    // console.log (index,element);

                    let split = new SplitText(element,{type:"lines,words"}) 

                })    

            },

            setupMenuTimelines: function(){

                this.$parentMenuItems.each( (index,element) =>{

                    let 

                        children = $(element).find('li'),

                        menu = $(element).find('UL');

                    subMenuToggleTL[index] = gsap.timeline ({reversed: true, paused:true})

                    .from (menu,{height:0})

                    .from (children,{stagger: .05, duration:.2, scale:0});

               

                })

            },

            toggleSubMenus: function(index){

                // console.log("toggle submenu" + index);

                this.retractAllSubmenus();

                subMenuToggleTL[index].reversed() ?   subMenuToggleTL[index].play() :   subMenuToggleTL[index].reverse() ;



            },

            

            retractAllSubmenus: function(){

                this.$parentMenuItems.each( (index,element) =>{

                    subMenuToggleTL[index].reverse()

                })

            },

            setupObservers: function(){

                // console.log ('set up observers fires')

                

                

                

                $parentMenuItems.each( (index,element)=> {

                    // $(element).find('A').click ((e)=>{

                    $(element).click ((e)=>{

                        this.toggleSubMenus(index)



                    })

                    // console.log (index,element)

                })

            },

            activate: function(){

                // console.log ('activate');

                $('body').addClass('fixedPosition');

                menuActivateTL.play();

                mobileTrigger.deactivate();



             },

            deactivate: function(){

                // console.log ('deactivate');

                menuActivateTL.reverse();

                

                $('body').removeClass('fixedPosition');

                mobileTrigger.activate();

              },

              toggle: function(){

                //   console.log ('menu toggle');

                //   that.activateSubmenuTL[index].reversed() ? that.activateSubmenuTL[index].timeScale(1).play() : that.activateSubmenuTL[index].timeScale(1.5).reverse();

                    menuActivateTL.reversed() ? menuActivateTL.play() : menuActivateTL.reverse() ;

                    // menuActivateTL.play();

              }

            },

        responsiveTrigger = {

            activateTL: new TimelineMax ({paused: true}),

           

            init: function (){

                    // console.log ("mobile works");

                    this.$location = $('#responsiveTrigger');

                    // mobileTrigger.state = "ready"; // can be invisible, loading, ready, hover, inactive, active 

                that = this;

                this.$location.click(function() {

                    responsiveMenu.toggle();

                    responsiveTrigger.toggle();

                    }); 

                },

            activate: function (){

                // console.log ('activate');

                // console.log ('wrapper location ' + this.$location);

                this.$location.removeClass('loading');

                // mobileTrigger.activateTL.play();

                // mobileTrigger.state = "ready";

 

            },

            toggle: function(){

                console.log ('toggle trigger');

                this.$location.toggleClass('active')



            

            }

        };

      



     





      







