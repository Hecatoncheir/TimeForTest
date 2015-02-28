"use strict";

(function(){
  var appBody,
      timeTable,
      timeInterval,
      nowDate,
      popUpOutline,
      popUpElement,
      navTabs;

      appBody = document.querySelector('#app'),
      timeTable = document.querySelector('#timeTable'),
      timeInterval = 15;
      nowDate = new Date(),
      popUpOutline = document.querySelector('#pop-up-outline');
      popUpElement = document.querySelector('#pop-up');

  //All what is needed for the table
  function initTable(){
    var table,
        timeOfDay;

        table = '<tr><td>Время</td><td></td></tr>';
        timeOfDay = fillTimeOfDay(table, 'table');

        timeTable.setAttribute('id','time-table');
        timeTable.innerHTML = timeOfDay;
        addFormHandler(timeTable);
  }

  //Fill table
  function fillTimeOfDay(element, makeType, typeData){
    var selfDate;

        selfDate = new Date(nowDate);

    switch (makeType){
      case 'table':
        makeTable()
        break
      case 'selectStart':
        makeSelectStart()
        break
      case 'selectEnd':
        makeSelectEnd()
        break
      case 'selectEndChange':
        makeChangeSelectEnd()
        break
    }

    //table
    function makeTable(){
      selfDate.setHours(0);
      selfDate.setMinutes(0);

      while(selfDate.getDay() == nowDate.getDay()){

        element += '<tr data-hour="'+ selfDate.getHours() +'" data-minutes="'+ ('0' + selfDate.getMinutes()).slice(-2) +'">'
        +'<td>'+ selfDate.getHours() +':'+ ('0' + selfDate.getMinutes()).slice(-2) +'</td>'
        +'<td></td>'
        +'<tr>';

        selfDate.setMinutes(selfDate.getMinutes()+timeInterval);
      }

    }

    //selectStart
    function makeSelectStart(){
      var options = '';

      selfDate.setHours(typeData.dataset.hour);
      selfDate.setMinutes(typeData.dataset.minutes);

      while(selfDate.getDay() == nowDate.getDay()){

        options += '<option value="'+selfDate+ '">'
                + selfDate.getHours()
                +':'
                + ('0' + selfDate.getMinutes()).slice(-2)
                + '</option>';

        selfDate.setMinutes(selfDate.getMinutes()+timeInterval);
      }

      element.innerHTML = options;

    }

    //selectEnd
    function makeSelectEnd(){
      var options = '';

      selfDate.setHours(typeData.dataset.hour);
      selfDate.setMinutes(typeData.dataset.minutes);
      selfDate.setMinutes(selfDate.getMinutes()+timeInterval)

      while(selfDate.getDay() == nowDate.getDay()){

        options += '<option value="'+selfDate+ '">'
        + selfDate.getHours()
        +':'
        + ('0' + selfDate.getMinutes()).slice(-2)
        + '</option>';

        selfDate.setMinutes(selfDate.getMinutes()+timeInterval);
      }

      element.innerHTML = options;

    }

    //selectEndChange
    function makeChangeSelectEnd(){
      var options = '',
          dateForEnd = new Date(typeData);

      selfDate.setHours(dateForEnd.getHours());
      selfDate.setMinutes(dateForEnd.getMinutes());
      selfDate.setMinutes(selfDate.getMinutes()+timeInterval)

      while(selfDate.getDay() == nowDate.getDay()){

        options += '<option value="'+selfDate+ '">'
        + selfDate.getHours()
        +':'
        + ('0' + selfDate.getMinutes()).slice(-2)
        + '</option>';

        selfDate.setMinutes(selfDate.getMinutes()+timeInterval);
      }

      element.innerHTML = options;
    }

    return element;
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

    //console.log(eventData.dataset.hour);
    //console.log(eventData.dataset.minutes);

    addNavigationTabsEvents();
    makeTimeSelectors(eventData);
    makeNamesOfClients();


    popUpOutline.onclick = function(event){
      this.style.display = 'none';
      popUpElement.style.display = 'none';
    }
  }

  //Make clients name options for select
  function makeNamesOfClients(){
    var selectClients,
        baseAvaSource,
        clientAva,
        clientsNames,
        nameSelectOptions,
        searchClientsCheck;

    selectClients = document.querySelector('select[name="forClient"]');
    baseAvaSource = 'assets/images/';
    clientAva = document.querySelector('.for-client-icon img');
    clientsNames = [
        'Тамара Смольнова',
        'Мария Непетрова'
    ];
    nameSelectOptions = '';
    searchClientsCheck = document.querySelector('#client-seach');

    clientAva.setAttribute('src', baseAvaSource + 'noava.png');

    for(var i = 0; i<clientsNames.length; i++ ){
      nameSelectOptions += '<option value="'+ i +'">' + clientsNames[i] + '</option>';
    }
    selectClients.innerHTML = nameSelectOptions;

    selectClients.onchange = function(){
      clientAva.setAttribute('src', baseAvaSource + 'ava_client_id_'+ this.value +'.png');
    }

    searchClientsCheck.onkeyup = function(){
      for(var i = 0; i<clientsNames.length; i++ ){
        if(clientsNames[i].match(new RegExp(this.value, 'i'))){
          navTabs[1].style.borderBottom = 'none';

          var search = 'option[value='+ '"'+i+'"' +']';
          document.querySelector(search).setAttribute('selected','');
          clientAva.setAttribute('src', baseAvaSource + 'ava_client_id_'+ i +'.png');

        } else {
          navTabs[1].style.borderBottom = '3px solid red';
        }
      }
    }

  }


  //Make time selectors for form
  function makeTimeSelectors(data){
    var timeStart = document.querySelector('select[name="time-start"]'),
        timeEnd = document.querySelector('select[name="time-end"]');

    fillTimeOfDay(timeStart, 'selectStart', data);
    fillTimeOfDay(timeEnd, 'selectEnd', data);

    timeStart.onchange = function(){
      var dateChanged = Date.parse(this.value);
      fillTimeOfDay(timeEnd, 'selectEndChange', dateChanged);
    }
  }

  //Navigation tabs
  function addNavigationTabsEvents() {
    var navTabsArray,
        tabs,
        tabsArray,
        siblingsClassToggle,
        tabChanger;

    navTabs = document.querySelectorAll('.pop-up-nav a');
    navTabsArray = Array.prototype.slice.call(navTabs);
    tabs = document.querySelectorAll('.pop-up-tabs > div');
    tabsArray = Array.prototype.slice.call(tabs);

    siblingsClassToggle = function(element){
      for(var i = 0; i<navTabs.length; i++){
        if(navTabs[i]!==element){
          navTabs[i].classList.remove('activate');
        }
      }
    }

    tabChanger = function(element){
      var index = navTabsArray.indexOf(element);
      siblingsClassToggle(element);

      for(var i = 0; i<tabs.length; i++){
        if(tabsArray.indexOf(tabs[i]) == index){
          tabs[i].classList.add('tab-display');
        } else {
          tabs[i].classList.remove('tab-display');
        }
      }

    }

    for(var i = 0; i<navTabs.length; i++){
      navTabs[i].onclick = function(e){
        e.preventDefault();
        this.classList.add('activate');
        tabChanger(this);
      }
      navTabs[0].click();
    }

  }


  //Table view
  function timeTableUi(){
    initTable();
    appBody.appendChild(timeTable);
  }

  //View may be rendering
  function appRenderView(viewObj){
    viewObj();
  }

  appRenderView(timeTableUi);

})();