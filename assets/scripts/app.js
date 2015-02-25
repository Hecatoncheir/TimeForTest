(function(){
  var appBody,
      timeTable,
      nowDate,
      popUpOutline,
      popUpElement;

      appBody = document.querySelector('#app'),
      timeTable = document.createElement('table'),
      nowDate = new Date(),
      popUpOutline = document.querySelector('#pop-up-outline');
      popUpElement = document.querySelector('#pop-up');

  //All what is needed for the table
  function initTable(){
    var table,
        timeOfDay;

        table = '<tr><td>Время</td><td></td></tr>';
        timeOfDay = fillTimeOfDay(table);

        timeTable.setAttribute('id','time-table');
        timeTable.innerHTML = timeOfDay;
        addFormHandler(timeTable);
  }

  //Fill table
  function fillTimeOfDay(table){
    var selfDate;

        selfDate = new Date(nowDate);
        selfDate.setHours(0);
        selfDate.setMinutes(0);

    while(selfDate.getDay() == nowDate.getDay()){

      table += '<tr data-hour="'+ selfDate.getHours() + ':' + ('0' + selfDate.getMinutes()).slice(-2) +'">'
                +'<td>'+ selfDate.getHours() +':'+ ('0' + selfDate.getMinutes()).slice(-2) +'</td>'
                +'<td></td>'
                +'<tr>';

      selfDate.setMinutes(selfDate.getMinutes()+30);
    }

    return table;
  }

  //Event listener for time
  function addFormHandler(timeTable){
    var timeList;
        timeList = timeTable.querySelectorAll('#time-table tr');

    for(var i=0; i<timeList.length; i++){
      timeList[i].addEventListener("click", function(){
        var self = this;
        showPopUp(self);
      });
    }

  }

  //Work with PopUp
  function showPopUp(eventData){
    popUpOutline.style.display = 'block';
    popUpElement.style.display = 'block';

    popUpOutline.onclick = function(event){
      this.style.display = 'none';
      popUpElement.style.display = 'none';
    }
  }

  //View may be rendering
  function appRenderView(){
    initTable();
    appBody.appendChild(timeTable);
  }


  appRenderView();

})();