
// ************************* Notice that every refresh on option.js file at the browser by the user will cause to read this file here again ******.
/* For now there is no need for using this function : checkboxChangeHandler
update checkbox's show value in localStorage
update checkbox's show to user, so it will not be shown again until the user change it again. //here we update the memory in background.js file
*/
function checkboxChangeHandler(evt){ 

  // var updatedCheckboxes = JSON.parse(localStorage.getItem('updatedCheckboxes'));
  var changedCheckboxes = JSON.parse(localStorage.getItem('changedCheckboxes'));
  var addNewObject = true;// By default we expect the changed checkbox not exist in our changedCheckboxes localStorage variable
  var tempObj = {};
  tempObj.id = evt.target.id;
  tempObj.checked = evt.target.checked;// evt.target.checked will results in true or false  boolean
  
  //Notice that before pushing the new Object to the array we need to check it it's already in the array with the same id,
  // so if it's in the array we will just replace it with the new property of checked, there is no need to change the id ofcourse
  for(var i=0, tot = changedCheckboxes.length; (i < tot) && (addNewObject === true); i++ ){
    if(changedCheckboxes[i].id == tempObj.id ){ //the Object already in the changedCheckboxes array, so update the checked property
      changedCheckboxes[i].checked = tempObj.checked;
      addNewObject = false;
    }
  }
  if(addNewObject === true){ // We have to add the new object because it's not exist
    changedCheckboxes.push(tempObj);
  }
  
  localStorage.setItem('changedCheckboxes',JSON.stringify(changedCheckboxes));
  //localStorage.setItem('updatedCheckboxes',JSON.stringify(updatedCheckboxes));

}

function deleteThekerHandler(evt) {
  var elementId = evt.target.id;
  var checkedValue = evt.target.checked;
  var elem;
  //before deleting the object let us delete it from the changedCheckboxes localStorage varibale if it is existed 
  var changedCheckboxes = JSON.parse(localStorage.getItem('changedCheckboxes'));
  var idExistedObject,existedObject = false;
  
  for(var i=0, tot = changedCheckboxes.length; i < tot ; i++ ){
    if(changedCheckboxes[i].id == elementId ){ //the Object already in the changedCheckboxes array, so update the checked property
      existedObject = true;
      changedCheckboxes.splice(i,1);//deleting the object from changedCheckboxes array of objects
      break;
    }
  }

  
  chrome.runtime.sendMessage({opcode: "deleteTheker", id: elementId}, function(response) {
  //I can check if the specific theker has been deleted wihtout problem by getting a response.success === true from the background.js file //maybe later
  
  //Delete the element div id from user interface just if it succesfully deleted from athkar "memory"
    if(response.deleted === true){
      elem = document.getElementById(elementId);
      elem.parentNode.removeChild(elem);
      if(existedObject === true){
        localStorage.setItem('changedCheckboxes',JSON.stringify(changedCheckboxes));
      }
    }
    else{
      
      elem = document.getElementById(elementId);
      //return the checkbox as the state before deleting it
      elem.checked = checkedValue;
      
    }
  });
  
}

function saveUserPreferences(){
    
    //var athkarCheckboxes = document.getElementsByName('athkarCheckbox');
    //var checkboxesChecked = [];
    var updatedCheckboxes = JSON.parse(localStorage.getItem('updatedCheckboxes'));
    var currentAthkar = JSON.parse(localStorage.getItem('athkar'));
    var tempIdx,isChecked;
    
    
    if(updatedCheckboxes.length > 0 ) {//***** There is no need to save user's preferences because he did'nt click on any of the athkar checkobex
  
      for(var i =0,tot = currentAthkar.length; i < tot; i++){
        tempIdx = currentAthkar[i].id;
        isChecked = updatedCheckboxes[tempIdx];
          if(isChecked === true || isChecked === false) {
            currentAthkar[i].show = isChecked;
          }
            
      }
    }
    localStorage.setItem('athkar', JSON.stringify(currentAthkar));
    
    //Now it's the time to change the athkar object notifications that is in the background.js file
    chrome.runtime.sendMessage({opcode: "updateAthkar"}, null);//maybe I can waiting for response so I can do the code below just when the background.js file updated everything.
    
    //don't forget to delete the updatedCheckboxes from localStorgae, because we saved all the user preferences ::::::::: the code is on the next line
    //localStorage.setItem('updatedCheckboxes',JSON.stringify([]));//

    /* message to be displayed to user */
    document.getElementById('message').style.display = 'block';
    setTimeout(function() {
      document.getElementById('message').style.display = 'none';
      }, 2500);
}

function saveUserPreferences_version2(){

    var changedCheckboxes = JSON.parse(localStorage.getItem('changedCheckboxes'));
    var currentAthkar = JSON.parse(localStorage.getItem('athkar'));
    var tempIdx,isChecked,totChangedCheckboxes;
    var idsArray = [];
    
    totChangedCheckboxes = changedCheckboxes.length;
    for(var i = 0 ; i < totChangedCheckboxes; i++){
      idsArray.push(changedCheckboxes[i].id);
    }

    /* Updating the athkar array to last changes done by the user*/
    if(totChangedCheckboxes > 0 ) {
  
      for(var i =0, foundIndex, tot = currentAthkar.length; i < tot; i++){
        foundIndex = idsArray.indexOf(currentAthkar[i].id);
        if( foundIndex > -1){// 0 for example meaning the currentAthkar[i].id have been found at index 0 in array idsArray
          currentAthkar[i].show = changedCheckboxes[foundIndex].checked;//changedCheckboxes contain objects with properties : id, checked
        }
      }
      
    }//if
    
    localStorage.setItem('athkar', JSON.stringify(currentAthkar)); //save the updated athkar back into the localStorage
    
    //Now it's the time to change the athkar object notifications that is in the background.js file
    chrome.runtime.sendMessage({opcode: "updateAthkar"}, null);//maybe I can waiting for response so I can do the code below just when the background.js file updated everything.

    /* message to be displayed to user */
    document.getElementById('message').style.display = 'block';
    setTimeout(function() {
      document.getElementById('message').style.display = 'none';
      }, 2500);
}


(function addEvents(){
  var addButton = document.getElementById('id_addButton');
  var saveButton = document.getElementById('id_saveButton');//saveButton variable will be null if we put the <script src="option.js"> at the begining of options.html file.
  
  saveButton.addEventListener('click',saveUserPreferences_version2);
  
  
  addButton.addEventListener('click',function(){
    
    var athkarWrapper = document.getElementById('athkarDiv');
    var newTheker = document.getElementById('id_newAthkar').value;
    var newObjectId,checkbox,label,deleteButton, elemDiv;
    

    
    if(newTheker !== null && newTheker !== '' && newTheker !== ' '){ //add the new theker just if it's not empty
    
    
      chrome.runtime.sendMessage({opcode: "newAthkar", text: newTheker}, function(response) {
        newObjectId = response.id; 
        
    
        //Show the new theker to user interface ////////// ******************* I also have to add delete button to the new theker
        checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id',newObjectId );
        checkBox.addEventListener('change',checkboxChangeHandler);
        checkBox.setAttribute('checked','checked');
        
        label = document.createElement('label');
        label.setAttribute('id','label_' + newObjectId );
        label.setAttribute('name', 'athkarCheckbox');
        label.setAttribute('for',newObjectId);
        label.setAttribute('class', 'labelNotif');
        label.innerText = newTheker;
        
        deleteButton = document.createElement('button');
        deleteButton.setAttribute('id',newObjectId);
        deleteButton.setAttribute('type','button');
        deleteButton.setAttribute('class', 'deleteButton');
        deleteButton.innerHTML = 'X';
        deleteButton.addEventListener('click',deleteThekerHandler);
        
        elemDiv = document.createElement('div');
        elemDiv.setAttribute('id', newObjectId);//In case we needs to delete the container div of the checkbox and the label
        elemDiv.setAttribute('class', 'singleAthkarDiv');
        
        elemDiv.appendChild(checkBox);
        elemDiv.appendChild(label);
        elemDiv.appendChild(deleteButton);
        
        athkarWrapper.appendChild(elemDiv);
        
        //clean the new athkar input text
        document.getElementById('id_newAthkar').value = '';
      });
      
      
    }//if
  });
  
  
})();


// called onclick of toppings checkboxes
function updateTotal(e) {
    // 'this' is reference to checkbox clicked on
    var form = this.form;
    
    // get current value in total text box, using parseFloat since it is a string
    var val = parseFloat( form.elements['total'].value );
    
    // if check box is checked, add its value to val, otherwise subtract it
    if ( this.checked ) {
        val += parseFloat(this.value);
    } else {
        val -= parseFloat(this.value);
    }
    
    // format val with correct number of decimal places
    // and use it to update value of total text box
    form.elements['total'].value = formatDecimal(val);
}


function showSavedPreferencesAthkarToUser(){
  //Read all of the athkar from local storage using : localstorage.athkar
  //Add event listener to every checkbox of the athkar
  //for any change from the athkar by the user will invoke an event
  //when catching any event we need to save the user preferences to local storage, and after that let's update the object of athkar found in the background,
  //In the background page, the Object of athkar must be filled by all the athkars founded in the local storage and, not using the array in the background page
  
  var athkarWrapper = document.getElementById('athkarDiv');
  var athkarArray = JSON.parse( localStorage.getItem('athkar') );
  var label,checkBox,currentId,elemDiv,isChecked,deleteButton;
  
  athkarWrapper.innerHTML="";//clear previous html elements
  for(var i=0, tot=athkarArray.length; i < tot; i++ ) {
    
    currentId = athkarArray[i].id;
    
    checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id',currentId );
    checkBox.addEventListener('change',checkboxChangeHandler); //This is working perfect, but instead of listening for each checkbox and make changes automatically , I can handle all of this
    // by using a "save" button so I can save all the changes in localstorage just when the user click save, so this is more fast
    
    if(athkarArray[i].show === true) {
      checkBox.setAttribute('checked','checked');
    }
    
    label = document.createElement('label');
    label.setAttribute('id','label_' + currentId );
    label.setAttribute('name', 'athkarCheckbox');
    label.setAttribute('for',currentId);
    label.setAttribute('class', 'labelNotif');
    label.innerText = athkarArray[i].text;
    
    elemDiv = document.createElement('div');
    elemDiv.setAttribute('class', 'singleAthkarDiv');
    
    if(i > 31) { //31 because I don't want a user to be able to delete all the first 31 athkar, so he will be able to delete just the athkar that he added by himeslf
      deleteButton = document.createElement('button');
      deleteButton.setAttribute('id',currentId);
      deleteButton.setAttribute('type','button');
      deleteButton.setAttribute('class', 'deleteButton');
      deleteButton.innerHTML = 'X';
      deleteButton.addEventListener('click',deleteThekerHandler);

      elemDiv.setAttribute('id', currentId);//In case we needs to delete the container div of the checkbox and the label
      
      elemDiv.appendChild(checkBox);
      elemDiv.appendChild(label);
      elemDiv.appendChild(deleteButton);
    }
    else{  
    
      elemDiv.appendChild(checkBox);
      elemDiv.appendChild(label);
    }
    
    athkarWrapper.appendChild(elemDiv);
    

  }
  
}



function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
  options.priority.disabled = isDeactivated; // The control manipulability.
}

if (window.attachEvent) {window.attachEvent('onload', timerListener);}
else if (window.addEventListener) {window.addEventListener('load', timerListener, false);}
else {document.addEventListener('load', timerListener, false);}

function timerListener(){
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.
  //options.isTimerActivated.checked = JSON.parse(localStorage.isTimerActivated); //this cause error : "Uncaught SyntaxError: Unexpected token u" //so the correct code is down :
  //options.isTimerActivated.checked = JSON.parse(localStorage.isTimerActivated);
  options.priority.value = localStorage.priority;
    
  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    
    ghost(!options.isActivated.checked);
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
    
  // Set the timer activation
//  options.isTimerActivated.onchange = function() {
//    localStorage.isTimerActivated = options.isTimerActivated.checked;
//  };
    
  options.priority.onchange = function() {
    localStorage.priority = options.priority.value;
  };
 
}

showSavedPreferencesAthkarToUser();



// Copyright (c) 2015 "Programmers Arab" Author. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
