(function(){
  var appBody,
      timeTable,
      nowDate;

      appBody = document.querySelector('#app'),
      timeTable = document.createElement('table');
      nowDate = new Date();


  function initTable(){
    var table = '<tr><td>Время</td><td></td></tr>',
        timeOfDay = fillTimeOfDay(table);
    timeTable.innerHTML = timeOfDay;
  }


  function fillTimeOfDay(table){
    var selfDate = new Date(nowDate);
        selfDate.setHours(0);
        selfDate.setMinutes(0);

    while(selfDate.getDay() == nowDate.getDay()){

      table += '<tr data-hour="'+ selfDate.getHours() + ':' + ('0' + selfDate.getMinutes()).slice(-2) +'">'
                +'<td>'+ selfDate.getHours() +':'+ ('0' + selfDate.getMinutes()).slice(-2) +'<td>'
                +'<td><td>'
                +'<tr>';

      selfDate.setMinutes(selfDate.getMinutes()+30);
    }

    return table;
  }


  function appRenderView(){
    initTable();
    appBody.appendChild(timeTable);
  }

  appRenderView();

})();