// Copyright (c) 2015 "Programmers Arab" Author. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
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

//localStorage.webs ='{"webs":[{"url":"http://www.embed.plnkr.co/dd8Nk9PDFotCQu4yrnDg/preview","s_url":"http://www.plnkr.co/edit/?p=preview","s_url_id":"42","url_id":"48"}]}';

//{"webs":[{"s_url_id":"42","s_url":"http://www.plnkr.co/edit/?p=preview","url_id":"48","url":"http://www.embed.plnkr.co/dd8Nk9PDFotCQu4yrnDg/preview"}]}
function createTableElments(){
    var i,arr,len,num_rows ;
    var theader = '<table id="mainTable">';
    var tbody = "";
    
    var arr_w = JSON.parse(localStorage.webs);
    //console.log(arr_w);
    var w = arr_w.webs;
    num_rows = w.length;
    //console.log(w);
    var websArr ;
    
    theader += "<thead><tr><th>Url</th><th>Similar url</th><th>Your Rank</th><th>Submit</th></tr></thead><tbody>";
    
    for(i = 0; i < num_rows; i++)
    {
        websArr = Object.keys(w[i]).map( function(k) { return w[i][k]; });
        tbody += "<tr>";
        for(var j = 0; j < 2; j++)
        {
            tbody += "<td>";
            tbody +='<a href="' + websArr[j] + '">' + websArr[j]+ '</a>';
            tbody += "</td>";
        }
        tbody = tbody + "<td>" + '<input type="text" name="t_' + i + '" id="txt_' + i + '">' + "</td>";//text field to put rank value by user
        //tbody = tbody + "<td>" + '<input type="button" onclick="post(' + i + ')" value="rank"' + ' id="btn_' + i + '">' + "</td>";//submit button to send value to server
        tbody = tbody + "<td>" + '<input type="button" value="rank"' + ' id="btn_' + i + '">' + "</td>";//onclick="post(' + i + ')"
        tbody += "</tr>";
    }
    document.getElementById('wrapper').innerHTML = theader + tbody + "</tbody></table>";
    addEventsForElements(num_rows);  
}

createTableElments();

function addEventsForElements(num){
    for(var i = 0 ; i < num; i++ ){
        document.getElementById('btn_' + i ).addEventListener("click", post);
    }
    
}
function post( e){
    var u1, u2,userId,rank,arr_w,w,oo,id;
    var status;
    //var btnId = e.target.getAttribute('id').value;
    id = (e.target.id.split("_"))[1];
    
    rank = document.getElementById('txt_'+id).value;//txt_# contains the rank value 
    //alert(rank);
    console.log(rank);
    arr_w = JSON.parse(localStorage.webs);
    w = arr_w.webs;
    oo = { webs : [] };
    //console.log(id);
    
    u1 = w[id].url_id;
    u2 = w[id].s_url_id;
    //console.log(u1);
    //console.log(u2);
    userId = JSON.parse(localStorage.permanentId);
    //console.log(userId);
    rankRecommendation(rank,u1,u2,userId,function(result){
      if(result === 'true'){
        //delete the ranked website
        console.log("deleting the ranked website");
        w.splice(id,1);
        Array.prototype.push.apply(oo['webs'], w);
        localStorage.webs = JSON.stringify(oo);
        location.reload();
      }  
    });
}