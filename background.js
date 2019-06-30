/*
 * 
//From my testing the extensiton in chrome, when you want to check if the extension work correct after
//you have fixed or updated your code, you must delete the extension and 
//load unpacked extension in "chrome://extension", because the chomre localStorage variables updated
//just after doing this steps, else you will not see any changes in localStorage variables
*
*/

function show(p_body) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time. //http://www.w3schools.com/jsref/jsref_regexp_exec.asp
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var allTime = hour + time[2] + ' ' + period;
  var opt;

    var nextB = parseInt(localStorage.nextBody, 10);
    var prio;
    if( parseInt(localStorage.priority, 10) == 8)
        prio = 0;
    else // parseInt(localStorage.priority, 10) == 25
        prio = 1;
    
	if(nextB == 1 || nextB == 11 || nextB == 21){
//		var opt = {type: "image",title: allTime , message: "" ,iconUrl: "48.png", imageUrl: p_body, eventTime: ( Date.now() + 30000)}
//        var opt = {type: "image",title: allTime , message: "" ,iconUrl: "48.png", imageUrl: p_body, eventTime: ( new Date() ).getTime()  + 30000 }
        opt = {type: "image",title: allTime , message: " " ,iconUrl: "48.png", imageUrl: p_body, priority: prio };//priority 1 and 2 - show notification for 25 seconds, priority 0 : for 8 seconds
		chrome.notifications.create("athkar",opt,function(){});
	}
	else {
		//Second method to create notification
//		var opt = {type: "basic",title: allTime , message: p_body ,iconUrl: "48.png", eventTime: ( Date.now() + 30000 ) }
//        var opt = {type: "basic",title: allTime , message: p_body ,iconUrl: "48.png", eventTime:  ( new Date() ).getTime() + 30000  }
        opt = {type: "basic",title:allTime , message:p_body  ,iconUrl: "48.png", priority: prio };
		chrome.notifications.create("athkar",opt,function(){});
	}

}

var AthkarObj = {
     length: 32,
    
     athkar : [
     {id:"1",  show:true, isPicture: "true",  text:"img_1.png"},
     {id:"2",  show:true, isPicture: "false", text:"اذكر الله يذكرك"},
     {id:"3",  show:true, isPicture: "false", text:"سبحان الله"},
     {id:"4",  show:true, isPicture: "false", text:"الحمد لله"},
     {id:"5",  show:true, isPicture: "false", text:"لا اله الا الله"},
     {id:"6",  show:true, isPicture: "false", text:"الله أكبر"},
     {id:"7",  show:true, isPicture: "false", text:"اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد."},
     {id:"8",  show:true, isPicture: "false", text:"رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً."},
     {id:"9",  show:true, isPicture: "false", text:"حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم."},
     {id:"10", show:true, isPicture: "false", text:"بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم."}, 
     {id:"11", show:true, isPicture: "true",  text:"img_2.jpg"},
     {id:"12", show:true, isPicture: "false", text:"اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور."},
     {id:"13", show:true, isPicture: "false", text:"سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه."},
     {id:"14", show:true, isPicture: "false", text:"اللّهُـمَّ عافِـني في بَدَنـي ،اللّهُـمَّ عافِـني في سَمْـعي ،اللّهُـمَّ عافِـني في بَصَـري، لا إلهَ إلاّ أَنْـتَ."},
     {id:"15", show:true, isPicture: "false", text:"اللّهُـمَّ إِنّـي أَعـوذُبِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ."},
     {id:"16", show:true, isPicture: "false", text:"يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلُنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ."},
     {id:"17", show:true, isPicture: "false", text:"أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق."},
     {id:"18", show:true, isPicture: "false", text:"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ. "},
     {id:"19", show:true, isPicture: "false", text:"أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ."},
     {id:"20", show:true, isPicture: "false", text:"يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ."},
     {id:"21", show:true, isPicture: "true",  text:"img_3.jpg"},
     {id:"22", show:true, isPicture: "false", text:"لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلُّ شَيْءِ قَدِيرِ."},
     {id:"23", show:true, isPicture: "false", text:" أستغفر الله العظيم وأتوب إليه"},
     {id:"23", show:true, isPicture: "false", text:"الحمد لله رب العالمين"},
     {id:"24", show:true, isPicture: "false", text:"يا حي يا قيوم برحمتك أستغيث ، أصلح لي شأني كله ، ولا تكلني إلى نفسي طرفة عين"},
     {id:"25", show:true, isPicture: "false", text:"اللهمّ اغْفِرْ خَطِيْئَتِي وجَهْلِي، وإسرَافِي في أَمْرِي، وما أنت أَعْلَمُ بِهِ مِنّي."},
     {id:"26", show:true, isPicture: "false", text:"اللهمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أنتَ خَيرُ من زَكَّاهَا، أنتَ وَلِيُّهَا ومولاها."},
     {id:"27", show:true, isPicture: "false", text:"اللهم إني أعوذ بك من علم لا ينفعُ،ومن قلب لا يَخْشَعُ،ومن نَفْسٍ لا تَشْبَعُ،ومن دعوةِ لا يُسْتَجَابُ لها."},
     {id:"28", show:true, isPicture: "false", text:"أستغفر الله  العظيم ... أستغفر الله العظيم ... أستغفر الله العظيم"},
     {id:"29", show:true, isPicture: "false", text:"لاَ إِلَهَ إِلَّا اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ "},
     {id:"30", show:true, isPicture: "false", text:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ"},
     {id:"31", show:true, isPicture: "false", text:"أَفْضَلُ الذِّكْرِ لاَ إِلَهَ إِلاَّ اللَّهُ ، وَأَفْضَلُ الدُّعَاءِ الحَمْدُ لِلَّهِ"},
     {id:"32", show:true, isPicture: "false", text:"الحمد لله رب العالمين"}
    ],
     getTextToBeShow: function (index) {
        var flagExit = 1; //exit
        var idx = index;
        var count = 0;
        
        do{
            if(this.athkar[idx].show === false) {
                flagExit = 0;
                if(idx === this.length) idx = 0;
                idx++ ;
                count++ ;
                
            }
            else flagExit = 1;
            //alert("flag = " + flagExit);
        }
        while (count < this.length && flagExit === 0);
        
        if(count === this.length) { //There is nothing to show, because user turn off all the athkar
            
            //maybe I need to return other value than null to indicate that there is nothing to be shown to user as notification
            return null;
        }
        else return this.athkar[idx].text;
    },
    
    showTextTurnOnOrOff: function ( id, value ) {
       for (var i in this.athkar) {
         if (this.athkar[i].id === id) {
            this.athkar[i].show = value; //value must be true or false ( boolean)
            break; //Stop this loop, we found it!
         }
       }
    }
}


function getBodyTextGenerator( p_idx ){

    
    if(p_idx == (athkar.length - 1) )
        localStorage.nextBody = 0;
    if(athkar[p_idx].show === true){
        //localStorage.nextBody =  parseInt(localStorage.nextBody, 10) + 1;
        localStorage.nextBody =   1 + +localStorage.nextBody; // when writing + + then the right side will be converted to int
        return athkar[p_idx].text;
    }
    else {
        localStorage.nextBody =   1 + +localStorage.nextBody; // when writing + + then the right side will be converted to int
        getAvailableTheker();
    } 
    
}



// Conditionally initialize the options.
if (!localStorage.isInitialized) { //if it false
  localStorage.isActivated = true;   // The display activation.
  localStorage.isTimerActivated = true; //The timer activation
  localStorage.frequency = 20;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
  localStorage.nextBody = 0;
  localStorage.priority = 25;
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { 
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
      var idx = parseInt(localStorage.nextBody, 10);//(radix)base 10 //
      localStorage.nextBody = idx + 1;
      show( getBodyTextGenerator(idx) ); 
  }

  var interval = 0; // The display interval, in minutes.
  var nextBodyIndex = parseInt(localStorage.nextBody);
  var textBody;
    
  setInterval(function() {
    interval++;

    if ( JSON.parse(localStorage.isActivated) && localStorage.frequency <= interval ) {
      //var temp = parseInt(localStorage.nextBody, 10);
      
      chrome.notifications.clear("athkar",function(){});//this row is must,otherwise the notification will not shown next time
      textBody = getBodyTextGenerator( );
      show(textBody);
      interval = 0;
    }
  }, 60000);// Check frequency every one minutes
    
}

// Copyright (c) 2015 "Programmers Arab" Author. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
