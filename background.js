/********************* Help **********************/
//check this later: http://www.dyn-web.com/tutorials/forms/checkbox/group.php
//http://samcroft.co.uk/2013/using-localstorage-to-store-json/
//http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
//https://developer.chrome.com/extensions/runtime#method-getBackgroundPage
//https://developer.chrome.com/extensions/content_scripts
//https://developer.chrome.com/extensions/messaging
//https://developer.chrome.com/extensions/optionsV2

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/

/*
From my previous testing the extensiton in chrome, when you want to check if the extension work correct after
you have fixed or updated your code, you must delete the extension and 
load unpacked extension in "chrome://extension", because the chomre localStorage variables updated
just after doing this steps, else you will not see any changes in localStorage variables
*/

var AthkarObj ;

function getDefaultAthkar() {

    return {
     athkar : [
       
      {id:"0",  show:true, isPicture: true,  text:"صورة: ألا بذكر الله تطمئن القلوب" ,picName: "img_1.png"},
      {id:"1",  show:true, isPicture: false, text:"اذكر الله يذكرك"},
      {id:"2",  show:true, isPicture: false, text:"سبحان الله"},
      {id:"3",  show:true, isPicture: false, text:"الحمد لله"},
      {id:"4",  show:true, isPicture: false, text:"لا اله الا الله"},
      {id:"5",  show:true, isPicture: false, text:"الله أكبر"},
      {id:"6",  show:true, isPicture: false, text:"اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد."},
      {id:"7",  show:true, isPicture: false, text:"رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً."},
      {id:"8",  show:true, isPicture: false, text:"حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم."},
      {id:"9", show:true, isPicture: false, text:"بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم."}, 
      
      {id:"10",  show:true, isPicture: true,  text:"صورة: يا حي يا قيوم برحمتك أستغيث" ,picName: "img_2.jpg"},   //Notice that the image extension name is jpg and not png   
      {id:"11", show:true, isPicture: false, text:"اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور."},
      {id:"12", show:true, isPicture: false, text:"سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه."},
      {id:"13", show:true, isPicture: false, text:"اللّهُـمَّ عافِـني في بَدَنـي ،اللّهُـمَّ عافِـني في سَمْـعي ،اللّهُـمَّ عافِـني في بَصَـري، لا إلهَ إلاّ أَنْـتَ."},
      {id:"14", show:true, isPicture: false, text:"اللّهُـمَّ إِنّـي أَعـوذُبِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ."},
      {id:"15", show:true, isPicture: false, text:"يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلُنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ."},
      {id:"16", show:true, isPicture: false, text:"أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق."},
      {id:"17", show:true, isPicture: false, text:"اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ. "},
      {id:"18", show:true, isPicture: false, text:"أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ."},
      {id:"19", show:true, isPicture: false, text:"يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ."},
       
      {id:"20", show:true, isPicture: true,  text:"صورة: صلى الله عليه وسلم" ,picName: "img_3.jpg"},       // Notice that the image extension name is jpg and not png   
      {id:"21", show:true, isPicture: false, text:"لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلُّ شَيْءِ قَدِيرِ."},
      {id:"22", show:true, isPicture: false, text:" أستغفر الله العظيم وأتوب إليه"},
      {id:"23", show:true, isPicture: false, text:"يا حي يا قيوم برحمتك أستغيث ، أصلح لي شأني كله ، ولا تكلني إلى نفسي طرفة عين"},
      {id:"24", show:true, isPicture: false, text:"اللهمّ اغْفِرْ خَطِيْئَتِي وجَهْلِي، وإسرَافِي في أَمْرِي، وما أنت أَعْلَمُ بِهِ مِنّي."},
      {id:"25", show:true, isPicture: false, text:"اللهمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أنتَ خَيرُ من زَكَّاهَا، أنتَ وَلِيُّهَا ومولاها."},
      {id:"26", show:true, isPicture: false, text:"اللهم إني أعوذ بك من علم لا ينفعُ،ومن قلب لا يَخْشَعُ،ومن نَفْسٍ لا تَشْبَعُ،ومن دعوةِ لا يُسْتَجَابُ لها."},
      {id:"27", show:true, isPicture: false, text:"أستغفر الله  العظيم ... أستغفر الله العظيم ... أستغفر الله العظيم"},
      {id:"28", show:true, isPicture: false, text:"حسبنا الله سيؤتينا الله من فضله إنا إلى الله راغبون"},
      {id:"29", show:true, isPicture: false, text:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ"},
     
      {id:"30", show:true, isPicture: false, text:"أَفْضَلُ الذِّكْرِ لاَ إِلَهَ إِلاَّ اللَّهُ ، وَأَفْضَلُ الدُّعَاءِ الحَمْدُ لِلَّهِ"},
      {id:"31", show:true, isPicture: false, text:"الحمد لله رب العالمين"},
     
    ],
    
     getTextToBeShow: function () {
        var flagExit = 0;

        //var idx = 0 + (+localStorage.nextBody);//convert string number to integer and then store it in idx variable
        var idx = 0 +  parseInt(localStorage.nextBody, 10);
        var count = 0;
        
        
        do{
            idx +=1;
           
            //The ">" operator has been added because after deleting existing object from locaStorage, it takes
            // some times until the this.athkar.length updated after the deleted Object from it.
            if( idx  >= this.athkar.length) {
                idx = 0;
            }
            
            if(this.athkar[idx].show === false) {
                count++ ;
            }
            else { // notification have been found to be show to user
                flagExit = 1;
            }
            localStorage.nextBody = idx;//Add 1 to nextBody so the next time getTextToBeShow() called it will start searching new notification
        }
        while (count < this.athkar.length && flagExit === 0); //do while
        
        if(flagExit === 0 ){ //There is no notification to be shown, because user turn off all the athkar notifiactions
            localStorage.nextBody = 0; 
            return null;//maybe I need to return other value than null to indicate that there is nothing to be shown to a user as notification
        }
        else { 
            return this.athkar[idx];//return the Object
        }
    },
    getNextIdProperty: function(){
      var len = this.athkar.length -1 ;
      return (parseInt(this.athkar[len].id, 10) + 1).toString();
    },
    deleteIdProperty: function(p_id) {
      for(var i=this.athkar.length -1; i >= 0; i-- ) {

        if(this.athkar[i].id == p_id){
          
          //Delete the object
          var allDeletedElements = this.athkar.splice(i,1) ;
          return ( allDeletedElements.length === 1 ) ? true : false;
          /*
          An array containing the deleted elements. If only one element is removed, an array of one element is returned. 
          If no elements are removed, an empty array is returned.
          */
        }
      }
    },
    saveAthkarToLocalStorage: function () {
      localStorage.setItem('athkar', JSON.stringify(this.athkar));
    },
    setAthkarArrayToBeAsAthkarLocalStorage: function(){
      // this.athkar = [];
      this.athkar = JSON.parse(localStorage.athkar);
    },
    replaceDefaultAthkarArrayWithLastUserPreference: function(p_lastUserPreferencesOfAthkar){
      this.athkar = p_lastUserPreferencesOfAthkar;
    },
    setShowValue: function ( id, value ) {

      for(var i=0, tot=this.athkar.length; i < tot; i++ ) {
        
        if (this.athkar[i].id === id) {
            this.athkar[i].show = value; //value must be true or false ( boolean)
            break;
        }
        
      }
      
       
    }//end-function
    
    };
}


function show(p_notificationObject) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time. //http://www.w3schools.com/jsref/jsref_regexp_exec.asp
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var allTime = hour + time[2] + ' ' + period;
  var opt,prio;
  
  if(p_notificationObject !== null) {
    var nextIndex = parseInt(localStorage.nextBody, 10);
      
    if( parseInt(localStorage.priority, 10) == 8)
      prio = 0;
    else // parseInt(localStorage.priority, 10) == 25
      prio = 1;
      
    if(p_notificationObject.isPicture === true ){
  //		var opt = {type: "image",title: allTime , message: "" ,iconUrl: "48.png", imageUrl: p_body, eventTime: ( Date.now() + 30000)}
  //        var opt = {type: "image",title: allTime , message: "" ,iconUrl: "48.png", imageUrl: p_body, eventTime: ( new Date() ).getTime()  + 30000 }
      opt = {type: "image",title: allTime , message: " " ,iconUrl: "48.png", imageUrl: p_notificationObject.picName, priority: prio };//priority 1 and 2 - show notification for 25 seconds, priority 0 : for 8 seconds
  		chrome.notifications.create("athkar",opt,function(){});
  	}
  	else {
  		//Second method to create notification
  //		var opt = {type: "basic",title: allTime , message: p_body ,iconUrl: "48.png", eventTime: ( Date.now() + 30000 ) }
  //        var opt = {type: "basic",title: allTime , message: p_body ,iconUrl: "48.png", eventTime:  ( new Date() ).getTime() + 30000  }
      opt = {type: "basic",title:allTime , message: p_notificationObject.text  ,iconUrl: "48.png", priority: prio };
  		chrome.notifications.create("athkar",opt,function(){});
  	}
  }//if null
  
}

(function initData(){

    /* If localStorage.isInitialized is false then get inside the loop,but if it's true (meaning it's initialized) then check the version
    ,check if the user localStorage have localStorage.version,so if version have not been found then we at version number(1.3) because in this version(1.3) I didn't declare any varibale called version,
    So if it's defined then check it's the last version In this case 4(1.4)
    ***** For the next version ( 1.6) I need to change 4 to 5, so the code will be localStorage.version != 6
    */
  if (!localStorage.isInitialized || localStorage.version === undefined || localStorage.version != 6 ) { 
    
    localStorage.clear();//To clean all the old data from old version 1.3,1.4, if I need to save the athkar array for the next version 1.5, then I need to remove this line until I save ahtkar to the new one.
    
    localStorage.isActivated = true;   // The display activation.
    localStorage.isTimerActivated = true; //The timer activation
    localStorage.frequency = 20;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
    localStorage.nextBody = 0;
    localStorage.priority = 25;
    localStorage.version = 6;
    
    localStorage.setItem('changedCheckboxes',JSON.stringify([]) );
    
    AthkarObj = getDefaultAthkar();
    AthkarObj.saveAthkarToLocalStorage();//Store all the athkar notifications to the localstorgae at the first time
    
    localStorage.readlocal = false;
    localStorage.readdefault = true;
  }
  else if( ( JSON.parse(localStorage.isInitialized) === true) && localStorage.version == 6 ) {
    // 1. Here athkar object needs to retrieve the athkar that is stored into localStorage' athkar variable,
    // 2. and after updating the AthkarObj.athkar array in memory
    localStorage.readlocal = true;
    localStorage.readdefault = false;
    
    if(!localStorage.isActivated) localStorage.isActivated = true;
    if(!localStorage.isTimerActivated) localStorage.isTimerActivated = true;
    if(!localStorage.isInitialized) localStorage.isInitialized = true;
    if(!localStorage.frequency) localStorage.frequency = 20;
    if(!localStorage.priority) localStorage.priority = 25;
    //if(!localStorage.nextBody) localStorage.nextBody = 0;
    localStorage.nextBody = 0;
    
    
    localStorage.setItem('changedCheckboxes',JSON.stringify([]) );//If i don't put this it will cause me problem when the user selects
    // some notification tp be changed and he don't click save.
    
    AthkarObj = getDefaultAthkar();
    AthkarObj.setAthkarArrayToBeAsAthkarLocalStorage();//there is no need to save anything into localstorage
    // because we got the data from the localStorage
    
  }
  /*else if( ( localStorage.isInitialized === true) && (localStorage.athkar === undefined)) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.isTimerActivated = true; //The timer activation
    localStorage.frequency = 10;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
    localStorage.nextBody = 0;
    localStorage.priority = 25;
    localStorage.version = 5;
    
    localStorage.setItem('updatedCheckboxes',JSON.stringify([]) );
    AthkarObj.saveAthkarToLocalStorage();//Store all the athkar notifications to the localstorgae at the first time
  }*/
  
  
  
})();



  // Real Test for notification support.
  if (window.Notification) {
    
    if (JSON.parse(localStorage.isActivated)) {  // While the button activated, show notifications at the display frequency.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
        
        //show( getBodyTextGenerator( parseInt(localStorage.nextBody, 10) ) ); 
        show( AthkarObj.getTextToBeShow()); 
    }
  
    var interval = 0;/* Display interval (in minutes) */
    var textBody;
      
    setInterval(function() {
      interval++;
  
      if ( JSON.parse(localStorage.isActivated) && localStorage.frequency <= interval ) {
        
        chrome.notifications.clear("athkar",function(){});//This row is must,otherwise the notification will not shown next time
        
        textBody = AthkarObj.getTextToBeShow();
        //console.log('show next notification = ' + textBody );
        show( textBody);
        
        interval = 0;
      }
    }, 60000);// Check frequency every one minutes
      
  }
  

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if (request.opcode === "updateAthkar") {
      
      localStorage.isOK = false;//test-case
      
      localStorage.update2 = false; //test-case
      
      if(AthkarObj === undefined){
        localStorage.setItem('athkarDefined',false);//test-case
         AthkarObj = getDefaultAthkar();
      }
      AthkarObj.setAthkarArrayToBeAsAthkarLocalStorage();
      localStorage.setItem('changedCheckboxes',JSON.stringify([]));
       
      localStorage.isOK = true;
      localStorage.update2 = true; //test-case
       
    }//if
    else if(request.opcode === "newAthkar") {
      localStorage.new1 = false; //test-case
      var athkar = JSON.parse(localStorage.athkar);
      
      //create new Object
      var newObject = {};
      newObject.id = AthkarObj.getNextIdProperty();
      newObject.show = true;
      newObject.isPicture = false;
      newObject.text = request.text;
      
      if(AthkarObj === undefined){
        localStorage.setItem('athkarDefined',false);//test-case
         AthkarObj = getDefaultAthkar();
      }
      //add the new Object to AthkarObj.athkar array of objects
      AthkarObj.athkar.push(newObject);
      
      //save the new Object theker to locaStorage.athkar
      AthkarObj.saveAthkarToLocalStorage();
      localStorage.new1 = true; //test-case
      
      //send new id to the option.js file
      sendResponse({id: newObject.id});
    }
    else if(request.opcode === 'deleteTheker') {
      
      //delete the object from AthkarObj, so first delete the theker from localStorage.athkar and then delete it from AthkarObj.athkar where athkar[i].id == request.id
      var result =AthkarObj.deleteIdProperty(request.id);//This also will update the athkar in memory, so we don't have to update it again
      
      if(result === true) { //succesfully deleted just 1 element
        if(AthkarObj === undefined){
          localStorage.setItem('athkarDefined',false);//test-case
           AthkarObj = getDefaultAthkar();
        }
        //update the localStorage.athkar to be as the athkar in memory
        AthkarObj.saveAthkarToLocalStorage();
        sendResponse({deleted: true});
      }//later maybe notify the other connected event listener of failur on deleting the object
     
    }//else if
  }
);


function updateAthkarToBeShown(){
    //Read athkar from localStorage
    //update the athkar array that can be shown to user by the show property of each athkar array
    var changedCheckboxes = JSON.parse(localStorage.getItem('changedCheckboxes'));
    var updatedCheckboxes = JSON.parse(localStorage.getItem('updatedCheckboxes'));
    var tempIdx,isChecked;
    var currentAthkar = AthkarObj.athkar;
    
    if(updatedCheckboxes.length > 0 ) {//***** There is no need to save user's preferences because he did'nt click on any of the athkar checkobex
  
      for(var i =0,tot = currentAthkar.length; i < tot; i++){
        tempIdx = currentAthkar[i].id;
        isChecked = updatedCheckboxes[tempIdx];
          if(isChecked === true || isChecked === false) {
            currentAthkar[i].show = isChecked;//updating the current show value of an object notification
          }
      }
    }
    localStorage.setItem('changedCheckboxes',JSON.stringify([]));
    //don't forget to delete the updatedCheckboxes from localStorgae, because we saved all the user preferences ::::::::: the code is on the next line
    localStorage.setItem('updatedCheckboxes',JSON.stringify([]));//cleaning all the data of localstorage.updatedCheckboxes variable
}


/********************* Starting Test Case **********************/
/*
AthkarObj.setShowValue("1",false);
AthkarObj.setShowValue("2",false);
AthkarObj.setShowValue("3",false);
//AthkarObj.setShowValue("32",false);

//alert(AthkarObj.athkar[4].show);

var t1  = AthkarObj.getTextToBeShow(1);//same as index 2
var t2  = AthkarObj.getTextToBeShow(2);
var t3  = AthkarObj.getTextToBeShow(3);

alert("t1 = " + t1);
alert("t2 = " + t2);
alert("t3 = " + t3);
*/