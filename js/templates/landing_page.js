var
    $fixedHeadline = $('.page-template-SDlandingpage SECTION.fixedHeadline H2'),
    $fixedHeadlineEnd = $('DIV.site-footer'),
    $testCategory = $('.page-template-SDlandingpage-php SECTION#other'),
    $categories = $('.page-template-SDlandingpage SECTION.category'),
    $enviroBrandEnclosure = $('.page-template-SDlandingpage-php SECTION.hero .brandEnclosure'),
    $enviroHorizon = $('.page-template-SDlandingpage .elementor-element-7611689.hero.horizon > .elementor-shape-bottom .elementor-shape-fill'),
    $enviroEarthSections =  $('.page-template-SDlandingpage SECTION.earth'),
    enviroLPEnclosureBuildTL = new TimelineMax ({paused: true, reversed: true}),
    bodyStyles = window.getComputedStyle(document.body),

    $heroSection = ('.page-template-SDlandingpage SECTION.hero.horizon')

    $enviroEarthOverlay = $('.page-template-SDlandingpage .hero.horizon DIV.elementor-background-overlay'),
    colorA = bodyStyles.getPropertyValue('--colorA'); 
    colorA = $.trim(colorA);

    // $.trim("    hello, how are you?    ");

    console.log ('colro is ' + colorA);


setTimeout(function(){         
    // alert ('hi3');
    if ($($fixedHeadline).length) {
        headlineInit();
    }

    if ($($enviroBrandEnclosure).length) {
        initEnviroLPHero();
    }

    $( window ).resize(function() {
        var 
        topOffset = $fixedHeadline.offset(),
        BottomOffset = $fixedHeadlineEnd.offset();
    
    
        console.log ('top = ' + topOffset.top);
        console.log ('bottom = ' + BottomOffset.top);

        console.log ('offset = ' + (BottomOffset.top - topOffset.top));
      });
    
},svgLoadDelay );




function initEnviroLPHero(){
    // alert ('hi honey im home');
    // var 
        // enviroLPTargetBuildTL = new TimelineMax({paused:true}),
        enviroLPTarget =  $($enviroBrandEnclosure).find('SVG')
        $headline = $('.page-template-SDhome #page SECTION.hero H1'),
        $subhead = $('.page-template-SDhome #page SECTION.hero p');
        $("<div class = 'sunWrapper'><div class = 'sun'></div></div>").insertBefore ($heroSection);


       

    initEnviroLPEnclosureBuildTL();
    
    
        function initEnviroLPEnclosureBuildTL(){
            var 
                $sun = $('.page-template-SDlandingpage DIV.sunWrapper .sun'),
                $bars = $('.page-template-SDlandingpage-php SECTION.hero .brandEnclosure').find('#sequenceA,#sequenceB,#sequenceC,#sequenceD,#sequenceE,#sequenceF');
        
 
            enviroLPEnclosureBuildTL
                .add("targetbuild","+=1")
                .set($enviroBrandEnclosure, {opacity:1},"targetbuild")

                .set ($bars,{opacity:1},"targetbuild")
        
                // .set ([$homeTarget,$headline, $subhead]  , {opacity: 1})
                // .to ($headline  ,0, {opacity: 1})
                .staggerFrom($bars, timeMdm, {
                    cycle:{
                    y:[100, -100],
                    x:[-100, 100],
                    opacity: [0,0],
                    ease: [ gentleEase ,  gentleEase    ]
                    }
                }, 0.25,"targetbuild")
                // .to($enviroLand, 1, {fill:'#ACD5D6'} )
                .add("earthAppear","+=2")
                .to($enviroEarthOverlay, timeMdm, {opacity: 0},"earthAppear" )
                .to($enviroEarthSections, timeMdm, {backgroundColor: colorA},"earthAppear")
                .add("sunAppear","earthAppear+=1")
                .to($bars,timeSlow,{opacity:0},"earthAppear+=1")

                .to($enviroBrandEnclosure, timeMdm, {className:"+=complete"},"earthAppear")
                // .to($enviroEarthSections, 1, {opacity:1})
                // .to($enviroEarthSections,1,  {backgroundColor: colorA} )
        
                .from($sun,1, {opacity: 0 , y:200} );


    
                ;
            enviroLPEnclosureBuildTL.play();
    
        }   
    
    
    
    }
    





function headlineInit(){  // this makes the headline pinned to the page
    var
        headlineDuration = getHeadlineDuration (),
        headlineSMPinScene = new ScrollMagic.Scene();
        
        headlineSMSwapHeadline = new ScrollMagic.Scene();
        headlineSMPinScene
            .duration (headlineDuration + "px")
            .triggerHook (.5)
            .reverse(true)
            .triggerElement($fixedHeadline)
            .addIndicators({name: "headline"}) // add indicators (requires plugin)
            .addTo(controller)
            // .duration(100%)
            .setPin ($fixedHeadline)
        //     .on('start', function () {
        //         headlineTest();
        // })

        if ($(window).width() < mobileBreak){ 
            headlineSMPinScene
                .triggerHook (.1)
        }

        headlineSMSwapHeadlineTemp = new ScrollMagic.Scene(); // this swaps the headlines based on the ids of the regions
        headlineSMSwapHeadlineTemp 
        .duration (300 + "px")
        .triggerHook (.5)
        .reverse(true)
        .triggerElement($testCategory)
        .addIndicators({name: "headlineswap"}) // add indicators (requires plugin)
        .addTo(controller)
        // .duration(100%)
        .on('start', function () {
            headlineTest();
    })


   $($categories).each(function (index,element) {
    // console.log (element);
    // console.log (this);
    console.log ($(this).attr('id'));

    var 
        headlineSWMSwapHeadline = new ScrollMagic.Scene,
        label = ($(this).attr('id'));
        console.log ('1label = ' + label)
        headlineSWMSwapHeadline
        // .duration (300 + "px")
        .triggerHook (.5)
        .reverse(true)
        .triggerElement(this)
        .addIndicators({name: "headlineswap"}) // add indicators (requires plugin)
        .addTo(controller)
        // .duration(100%)
        .on('start', function () {
            headlineTest(label);
        
        })
    })



        function headlineTest (label){
            // alert ('headline test works');
            console.log ('2label = ' + label);
            $($fixedHeadline).html(label);
            console.log ('headline test fires');
        }



     

    function getHeadlineDuration (){
        var 
            topOffset = $fixedHeadline.offset(),
            BottomOffset = $fixedHeadlineEnd.offset();
            offset = 300;
        
        
            console.log ('top = ' + topOffset.top);
            console.log ('bottom = ' + BottomOffset.top);

            console.log ('offset = ' + (BottomOffset.top - topOffset.top));
        return ((BottomOffset.top - topOffset.top - offset) );
    
    }}

