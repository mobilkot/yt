var customTemplates;
var customTemplatess;
var choicesUnlim= [];
//loadRegions();
var tarifUnlim = [];

function doLoadUnlim(subject, callback) {
    //gorodogr1 = loadCitiesClosed();//loadUnlimClosed();
    setTimeout( function(){

        callback();
    }, 100 );

}



function tableToJSON(table) { //адаптировать под разное количество столбцов



    var search = ["\\<strong>?(.*?)\\</strong>", "\\<br>","\\</p>" ,"\\<p>" ,"\\[futurama]?(.*?)\\[/futurama]"];
    var replaceTo = ['$1', '\n', '\n', '', '<span style="font-family: \'Futurama\', sans-serif">$1</span>'];

    var tables = [];
    var cells = table.querySelectorAll("td");
    var count = 0;
    for (var i = 0; i < cells.length; i+=3) {
        var name = cells[i].firstChild.data +  "\n";//.split("-");

        var info1 = "";
        var info11 = cells[i + 1].innerHTML;
        for (t = 0; t < search.length; t++) {
            info11 = info11.replace(new RegExp(search[t], 'g'), replaceTo[t]);
        }
        info1 = info11;
        var info2 = "";
        var info21 = cells[i + 2].innerHTML;
        for (var t = 0; t < search.length; t++) {
            info21 = info21.replace(new RegExp(search[t], 'g'), replaceTo[t]);
        }
        info2 = info21;
        tables[count] = { id: count, type: "Unlim", region: name, packets: info1, base: info2 ,};


        ++count;
    }
    return tables;
}



var jsondata;
function loadJSOND() {

    var reqw = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    reqw.open( 'GET', 'https://raw.githubusercontent.com/mobilkot/yt/master/tariffs.json', true );
    reqw.responseType = 'json';
    reqw.onreadystatechange = function () {

        if ( reqw.readyState == 4 ) {
            if ( reqw.status == 200 ) {
                 importJsond(reqw.response);

            }
        }
    };
    reqw.send( null );
}

function importJsond(jsondatas) {
    jsondata= jsondatas;
    customTemplates.disable();
    customTemplatess.passedElement.addEventListener('change', function(e) {
        if (e.detail.value !== '') {
            customTemplates.enable();
        } else {
            customTemplates.disable();
        }
        loadRegions(e.detail.value, jsondata);
    });

    customTemplatess.clearStore();
    choices222= [];
    var elements = jsondata.elements;
    elements.forEach(function(item, i, arr) {
        {
                    choices222.push({
                        value: elements[i].name,
                        label: elements[i].screenname ,
                        disabled: elements[i].disabled,
                    });


        }});

    customTemplatess.setChoices( choices222, 'value', 'label', 0);
}


function loadRegions(tarif, jsondata) {
    document.getElementById('regions_callname').innerText =tarif;



    choices1212= [];

var regions = jsondata.elements;
    regions.forEach(function(item, i, arr) {
        if (regions[i].name === tarif) {

            var data = regions[i].data;

            data.forEach(function (item, i, arr) {
                {
                    for (var key in jsondata.regions) {

                        if (jsondata.regions[key].id === data[i].id) {
                            var info = ""; if(data[i].info  !== undefined) {info = data[i].info}
                            choices1212.push({ //regioncity
                                value: data[i].id.toString(),
                                label: jsondata.regions[key].region + " (" + jsondata.regions[key].regioncity + ") " + info,
                                disabled: false,
                                customProperties: {description: jsondata.regions[key].altname}
                            });
                        }
                    }


                }
            });

            console.log(regions);

            customTemplates.clearStore();
            customTemplates.setChoices([
                {
                    value: regions[i].data[0].type,
                    label: regions[i].data[0].type,
                    id: regions[i].data[0].type,
                    disabled: false,
                    choices: choices1212,

                },  ]  , 'value', 'label', 0);
        }
    });





}


function loadUnlimInbox(){

    for(id in tarifUnlim) {
        choicesUnlim.push({
            "value": tarifUnlim[id].region + " " + tarifUnlim[id].type,
            "label": tarifUnlim[id].region  ,
            "disabled": false,
        });
    }

    customTemplates.setChoices([  {  value: 'Безлимитные', label: 'Безлимитные',  id: 'Безлимитные', disabled: false, choices: choicesUnlim, },
    ], 'value', 'label', 0);
}



document.addEventListener('DOMContentLoaded', function() {

    //очистка перед выбором.
    document.getElementById("tapps").style.visibility = "hidden";
    document.getElementById("tminute0").innerHTML = "";
    document.getElementById("tgbite0").innerHTML = "";


    customTemplatess = new Choices(document.getElementById('regions_called'), {
        searchFields: ['customProperties.description'],
        placeholderValue: 'This is a placeholder set in the config',
        placeholder: true,
        searchEnabled: false,

    });
    loadJSOND();




    /////////////////////////////

    customTemplates = new Choices(document.getElementById('regions_call'), {
        searchFields: ['customProperties.description'],
        placeholderValue: 'This is a placeholder set in the config',
        searchPlaceholderValue: 'Наверное, это поле поиска..',
        placeholder: true,
        callbackOnCreateTemplates: function(strToEl) {
            var classNames = this.config.classNames;
            var itemSelectText = this.config.itemSelectText;
            return {
                item: function(data) {
                    return strToEl('\
                <div\
                  class="'+ String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="'+ String(data.id) + '"\
                  data-value="'+ String(data.value) + '"\
                  '+ String(data.active ? 'aria-selected="true"' : '') + '\
                  '+ String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:1px;"></span> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */+ String(data.label) + ' ' + '\
                </div>\
              ');
                },
                choice: function(data) {
                    return strToEl('\
                <div\
                  class="'+ String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="'+ String(itemSelectText) + '"\
                  data-choice \
                  '+ String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="'+ String(data.id) + '"\
                  data-value="'+ String(data.value) + '"\
                  '+ String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:1px;"></span> ' /*+ ' [<b>'  + String(data.groupId) + '</b>] ' */+ String(data.label) + ' ' + '\
                </div>\
              ');
                },
            };
        },
    });

    doLoadUnlim('math', loadUnlimInbox);


    customTemplates.passedElement.addEventListener('change', function(e) {
        document.getElementById('regions_callname2').innerText =e.detail.value;
//jsondata.elements[0].name
//jsondata.regions[key].id



        //if (e.detail.value === 'London') {
        //    tubeStations.innerText = "London";
        //} else {
        //    tubeStations.innerText = `  ${e.detail.value}   ${e.choices}`;
        //document.getElementById('choices-single-groups').placeholder = 'no London ${e.detail.value}' + 'You just added "' + e.detail.value + '"';
        var gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic"]');        //Все итемы в трафике
        var mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute"]');
        var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps"]');
        gchecks.forEach(function(item, i, arr) {  if (gchecks[i].checked) gchecks[i].checked = false; });
        mchecks.forEach(function(item, i, arr) {  if (mchecks[i].checked) mchecks[i].checked = false; });
        appitems.forEach(function(item, i, arr) {  if (appitems[i].checked) appitems[i].checked = false; });


        document.getElementById("b_tafir_summary_input1").innerHTML = "";
        document.getElementById("b_tafir_summary_input").innerHTML = "";

        startInclude_MN();
    });

});


{
    function addOnWheel(elem, handler) {
        if (elem.addEventListener) {
            if ('onwheel' in document) {
                // IE9+, FF17+
                elem.addEventListener("wheel", handler);
            }
        }
    }

    var scale = 1;
    var info = document.getElementById("b_tafir_summary_input");//
    addOnWheel(info, function(e) {
        var delta = e.deltaY || e.detail || e.wheelDelta;


        if (delta=== 100) {
            document.getElementById("switch-radio-on-2").checked = true;
        } else if (delta === -100) {
            document.getElementById("switch-radio-off-2").checked = true;
        }
        summaryOutput();
        /*info.innerHTML = +info.innerHTML + delta;*/

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    });

    function mOver(obj) {
        //obj.innerHTML = "Thank You"
    }

    function mOut(obj) {
        //obj.innerHTML = "Mouse Over Me"
    }

    function mDown(obj) {
        obj.style.backgroundColor = "#6da8e6";//"#1ec5e5";
        //obj.innerHTML = "Release Me";
    }

    function mUp(obj) {
        obj.style.backgroundColor = "#f0f7ff";//"#D94A38";
        //obj.innerHTML = "Thank You";
    }


}





let log = document.getElementById('spans');



var selected_items = []; //id чекнутых бмп
var cur_mCount, cur_mPrice, cur_gCount, cur_gPrice; //Выбранные минуты,цена,трафик,цена

var outputSummary = document.getElementById("b_tafir_summary_input");  // элемент, куда отдается итоговый текст о тарифе


//функция вывода данных в первое окно при выделении опций (plaphone)
function summaryOutput() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var text, text1 = "";
    var cur_sum_app = [];
    var cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice));
    var  gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic"]:checked');
    var  mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute"]:checked');
    var  appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps"]:checked');
    var  smscheck = document.querySelectorAll('input[type="checkbox"][name="select_sms"]:checked');
    var  appall = document.querySelector('input[type="checkbox"][name="select_apps_all"][value="0"]');        //галочка "все"
    if (appcheck.length===0)  selected_items = [];
    var hardToVmode = document.getElementById("switch-radio-on-2").checked;




    if (hardToVmode) {
        text = " Выбран пакет:\n  " + cur_mCount + " минут за " + cur_mPrice + " рублей\n + " + cur_gCount + " ГБ за " + cur_gPrice + " рублей";
        if (smscheck.length === 1) {
            text += "\n + " + unlimApps[10 - 1].name + ". ";
        }

        if (selected_items.length > 0) {
            selected_items.forEach(function (item, i, arr) {
                if (unlimApps[item - 1].ids !== 10) {
                    text1 += unlimApps[item - 1].name + ", ";

                }
                cur_sum_app[i] = Number(unlimApps[item - 1].price);
                cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice) + Number(cur_sum_app.reduce(reducer)));
            });
            text += "\nА также безлимитные " + text1 + ".";


        } else {
            text += ". ";
        }
        if (smscheck.length === 1) { cur_sum += Number(unlimApps[10 - 1].price); }
        text += "\nОбщая стоимость " + cur_sum + " рублей ";
    } else if (!hardToVmode)
    {

        text = "";


        var unlimpapps = "";
        var selitems = [];

        if (selected_items.length > 0) {
            selected_items.forEach(function (item, i, arr) {
                if (unlimApps[item - 1].ids !== 10) {  if (unlimApps[item - 1].name === "Одноклассники") {selitems.push(unlimApps[item - 1].altname);} else {selitems.push(unlimApps[item - 1].name);}  }
                cur_sum_app[i] = Number(unlimApps[item - 1].price);
                //TODO: Обработка списка приложений, безлимитный\ые (ок), "и" при 3 и более элементах, объединить все в один при выборе всего
            });

            cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice) + Number(cur_sum_app.reduce(reducer)));


            selitems.forEach(function(item, i, arr) {
                if (selitems.length === 1) {


                    switch (selitems[i]) {
                        case "ВК":   unlimpapps = "безлимитный доступ к " + selitems[i] + ", чтобы всегда была возможность покекать с мемосиков";
                        break; case "Одноклассникам":   unlimpapps = "безлимитный доступ к " + selitems[i] + " для общения с родителями";
                        break; case "Youtube":   unlimpapps = "безлимитный доступ к " + selitems[i] + " для просмотра любимых видосиков без забот о трафике";
                        break; case "Instagram":   unlimpapps = "безлимитный доступ к " + selitems[i] + ", чтобы всегда была возможность поделиться красивыми фотками с подписчиками";
                        break; case "Twitter":   unlimpapps = "безлимитный доступ к " + selitems[i] + ", чтобы продолжить выражать свои мысли в 280 символах";
                        break; case "Skype":   unlimpapps = "безлимитный доступ к " + selitems[i] + " для того, чтобы сделать из него файлообменник";
                        break; case "Viber": case "Whatsapp":   unlimpapps = "безлимитный доступ к " + selitems[i] + " для того, чтобы быть всегда на связи";
                        break; case "Facebook":   unlimpapps = "безлимитный доступ к " + selitems[i] + ", чтобы был, вдруг пригодится";
                        break; default:   unlimpapps = "безлимитный доступ к " + selitems[i];
                    }

                } else if (selitems.length > 1){
                    if (i === 0) unlimpapps = "безлимитный доступ к " + selitems[i];
                    else if (i !== 0 && i !== selitems.length - 1) unlimpapps += ", " + selitems[i];
                    else if (i !== 0 && i === selitems.length - 1) unlimpapps += " и " + selitems[i];
                }
            });
        }
        if (smscheck.length === 1) { cur_sum += Number(unlimApps[10 - 1].price); }
        var gbsclon = declOfNum(cur_gCount, ['гигабайт', 'гигабайта', 'гигабайт']);

        text = `За ${cur_sum} рублей у Вас будет ${text}`;


//TODO: Шаблонизатор Tov Hard
        if (smscheck.length === 1) { cur_sum += Number(unlimApps[10 - 1].price); }

        if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length === 0 && smscheck.length === 0) { text = `Подключи хоть что-нибудь, ну.. `; }
        else if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length === 0 && smscheck.length === 1) { text += `только безлимитные SMS на всех операторов РФ. `; }
        else if (cur_mCount !== "0" && cur_gCount === "0" && selected_items.length === 0 && smscheck.length === 0) { text += `${cur_mCount} минут для звонков на других операторов и безлимитные звонки на Yota без интернета.`; }
        else if (cur_mCount !== "0" && cur_gCount === "0" && selected_items.length === 0 && smscheck.length === 1) { text += `${cur_mCount} минут для звонков на других операторов, безлимитные звонки на Yota, а также безлимитные SMS без интернета.`; }
        else if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 0) { text += `только ${unlimpapps} без дополнительного трафика.`; }
        else if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 1) { text += `безлимитный доступ к ${unlimpapps} без дополнительного трафика, а также безлимитные SMS.`; }
        else if (cur_mCount !== "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 0) { text += `${cur_mCount} минут для звонков на других операторов и безлимитные звонки на Yota, а также ${unlimpapps} без трафика.`; }
        else if (cur_mCount !== "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 1) { text += `${cur_mCount} минут для звонков на других операторов и безлимитные звонки на Yota, безлимитные SMS, а также ${unlimpapps} без трафика.`; }
        else if (cur_mCount === "0" && cur_gCount !== "0" && selected_items.length === 0 && smscheck.length === 0) { text += `${cur_gCount} ${gbsclon} трафика для пользования интернетом.`; }
        else if (cur_mCount === "0" && cur_gCount !== "0" && selected_items.length === 0 && smscheck.length === 1) { text += `${cur_gCount} ${gbsclon} трафика для пользования интернетом, а также безлимитные SMS.`; }
        else if (cur_mCount === "0" && cur_gCount !== "0" && selected_items.length > 0 && smscheck.length === 0) { text += `${unlimpapps}, а также ${cur_gCount} ${gbsclon} трафика для остальных целей`; }
        else if (cur_mCount === "0" && cur_gCount !== "0" && selected_items.length > 0 && smscheck.length === 1) { text += `безлимитные SMS, ${unlimpapps}, а также ${cur_gCount} ${gbsclon} трафика для остальных целей.`; }
        else if (cur_mCount !== "0" && cur_gCount !== "0" && selected_items.length > 0 && smscheck.length === 0) { text += `${cur_mCount} минут для звонков на других операторов, безлимитные звонки на Yota, а также ${unlimpapps}, ну и ${cur_gCount} ${gbsclon} трафика для остальных целей.`; }
        else if (cur_mCount !== "0" && cur_gCount !== "0" && selected_items.length > 0 && smscheck.length === 1) { text += `${cur_mCount} минут для звонков на других операторов, безлимитные звонки на Yota, безлимитные SMS, ${unlimpapps}, ну и ${cur_gCount} ${gbsclon} трафика для остальных целей.`; }
        else if (cur_mCount !== "0" && cur_gCount !== "0" && selected_items.length === 0 && smscheck.length === 0) { text += `${cur_mCount} минут для звонков на других операторов, безлимитные звонки на Yota и ${cur_gCount} ${gbsclon} трафика для пользования интернетом`; }
        else if (cur_mCount !== "0" && cur_gCount !== "0" && selected_items.length === 0 && smscheck.length === 1) { text += `${cur_mCount} минут для звонков на других операторов, безлимитные звонки на Yota, безлимитные SMS и ${cur_gCount} ${gbsclon} трафика для пользования интернетом.`; }






    }
    if ( (gcheck.length + mcheck.length)  === 2 )  {
        document.getElementById("b_tafir_summary_input").innerHTML = text;
        summaryOutput2(selected_items, cur_mCount ,cur_gCount);
    } else {

    }

}


//склоенние в зависимости от числа
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

//функция вывода данных во второе окно при выделении опций (plaphone)
function summaryOutput2(apps, cminut, cgbites) {

    var text = "";


    if (cgbites === "0") { text += phrasesInet[4].phrase; }
    else if (cgbites <= 7) {  text += phrasesInet[0].phrase;  }
    else if (cgbites <= 15) { text += phrasesInet[1].phrase; }
    else if (cgbites <= 30) { text += phrasesInet[2].phrase; }
    else if (cgbites > 30) { text += phrasesInet[3].phrase; }

    if( apps.length > 0 && cgbites !== "0") {
        text += ", включая безлимитный доступ к ";
        apps.forEach(function(item, i, arr) {
            text += unlimApps[item-1].name + ", ";
        });
    } else if( apps.length > 0 && cgbites === "0")  {
        text += ", зато будут безлимитные ";
        apps.forEach(function(item, i, arr) {
            text += unlimApps[item-1].name + ", ";
        });
    }

    document.getElementById("b_tafir_summary_input1").innerHTML = text;
}


//Функция на обновление переменных по выбанным приложениям (plaphone)
var text, appitems, appcheck, appall;
function checkApps(node) {
    var text, appitems, appcheck, appall;



    // Название, группа, базовая стоимость, альт.название
    // [name: "ВК",          group: "social",      price: "20",      altname: "-"]
    appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps"]:checked');      //Выбрано среди приложений
    appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps"]');               //Все итемы приложжений
    appall = document.querySelector('input[type="checkbox"][name="select_apps_all"][value="0"]');     //галочка "все"

    ////////////// Обработчик чекбокса (все\по отдельности)
    if (node.value > appall.value) {
        selected_items = [];
        appall.checked = (appcheck.length === appitems.length) && (!appall.checked);
        appcheck.forEach(function(item, i, arr) {     if (arr[i].value!==0) selected_items[i] = arr[i].value;       });

    }  else  {
        appitems.forEach(function(item, i, arr) {
            appitems[i].checked = !!(appall.checked);
            if ( appall.checked ) {
                  selected_items[i] = arr[i].value;
                }
                    else { selected_items = [];
                }

        });
    }
      summaryOutput();
    //Передача выбранных пунктов в обработчик для вывода (чекнутые в selected_items)

}


//Функция на обновление переменных по выбранному тарифу (plaphone)
function checkType(node) {
    var  mcheck, gcheck, gchecks, mchecks;
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic"]:checked');        //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute"]:checked');        //Выбрано среди минут
    gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic"]');        //Все итемы в трафике
    mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute"]');        //Все итемы в минутах
    //cur_mCount = eval(eval("(function () { return \'current_mCount\' })()") + mcheck[0].value);
    //jsondata.elements[0].name


                        if (mcheck[0] !== undefined && gcheck[0] !== undefined) {

                            cur_mCount = cur_region_teriff.mins[mcheck[0].value][0];
                            cur_mPrice = cur_region_teriff.mins[mcheck[0].value][1];
                            cur_gCount = cur_region_teriff.gbites[gcheck[0].value][0];
                            cur_gPrice = cur_region_teriff.gbites[gcheck[0].value][1];

                        }


    summaryOutput();
}









//Функция ввода из поля "например"
var input_MN = document.getElementById('regions_call');
function example_region(stran){
    input_MN.value = stran;
    startInclude_MN();

}



//Функция заполнения при выборе региона
var cur_region_teriff = {};
function startInclude_MN() {



    function addRowUnlim(id, region, packets, base) {
        document.getElementById("b_tafir_summary_input").innerHTML = packets;
        document.getElementById("b_tafir_summary_input1").innerHTML = base;
    }


    function addRow(id, region, mins, gbites, sms, snPrice, mePrice, youtube){


        //TODO: Установка бирок для БМП
        var apchecks11 = document.querySelectorAll('div[class="b2c-voice-collect__app-price"]');
        apchecks11.forEach(function(item, ids, arr) {
            var dataname = apchecks11[ids];
            if (dataname.getAttribute('data-name') === "app-media") {
                apchecks11[ids].innerHTML = youtube + "&#8381;";
            } else if (dataname.getAttribute('data-name')  === "app-messenger") {
                apchecks11[ids].innerHTML = mePrice + "&#8381;";
            } else if (dataname.getAttribute('data-name') === "app-social") {
                apchecks11[ids].innerHTML = snPrice + "&#8381;";
            } else if (dataname.getAttribute('data-name') === "app-sms") {
                apchecks11[ids].innerHTML = sms + "&#8381;";
            }
        });

        /// Сохранение цен приложений выбранной области в массив \\ переписать получше бы
       unlimApps.forEach(function(item, app, arr) {
                    switch (unlimApps[app].group){
                        case "messenger": unlimApps[app].price = mePrice; break;
                        case "social": unlimApps[app].price = snPrice; break;
                        case "youtube": unlimApps[app].price = youtube; break;
                        case "sms": unlimApps[app].price = sms; break;
                        case "deleted": /*unlimApps[app].price = unlimApps[app].price;*/ break;
                        default: break;

                    }

                });



        var elem = document.getElementById("tminute0");
        while (elem.firstChild) { if (elem.firstChild) elem.removeChild(elem.firstChild);  };

        //TODO: Перестать использовать таблицы, черт
        var tr1 = document.createElement('tr');
        tr1.innerHTML = '<td nowrap id="labletd"><label class="layout-buttons_gb">Пакеты минут:  </label></td>';
        elem.appendChild(tr1);

        mins.forEach(function(item,i,arr){
            var tr = document.createElement('tr');
            tr.innerHTML = '<td id="tdminute_' + i + '" nowrap><input value="' + i + '" id="iminute_'+ i + '"class="input_radio_minute" name="radio_minute" type="radio" onchange="checkType(this)"><label for="iminute_' + i + '" class="layout-buttons_gb"> ' +  item[0] + ' минут за ' + item[1] + ' рублей  </label></td>';
            elem.appendChild(tr);
        });
        //TODO: Без понятия

        var elem1 = document.getElementById("tgbite0");
        while (elem1.firstChild) { if (elem1.firstChild) elem1.removeChild(elem1.firstChild);  };

        var tr2 = document.createElement('tr');
        tr2.innerHTML = '<td nowrap id="labletd"><label class="layout-buttons_gb">Пакеты трафика:  </label></td>';
        elem1.appendChild(tr2);

        gbites.forEach(function(item,i,arr){
            var tr2 = document.createElement('tr');
            tr2.innerHTML = '<td id="tdgbite_' + i + '" nowrap><input value="' + i + '" id="igbite_'+ i + '"class="input_radio_gbite" name="radio_trafic" type="radio" onchange="checkType(this)"><label for="igbite_' + i + '" class="layout-buttons_gb">' +  item[0] + ' ГБ за ' + item[1] + ' рублей' + '</label></td>';
            elem1.appendChild(tr2);
        });







    }

    //var url = "http://yandex.ru/yandsearch?text=wwww&lr=187"; // юрл в котором происходит поиск
    //var regV = /yandex\.ru/gi;     // шаблон
    //var result = url.match(regV);  // поиск шаблона в юрл тру или фолс

    if(input_MN.value.length > 0)  {
///////////////////////////////////////////////////////////////

        var regions = jsondata.elements;
        if (customTemplatess.getValue(true) === "plaphone" || customTemplatess.getValue(true) === "tabt") {
            document.getElementById("tapps").style.visibility = "visible";
            regions.forEach(function (item, i, arr) {
                if (regions[i].name === customTemplatess.getValue(true)) {

                    var data = regions[i].data;

                    data.forEach(function (item, i, arr) {
                        {
                            //TODO: Корректно подгрузить стоимость SMS
                            if (data[i].id.toString() === customTemplates.getValue(true)) {
                                console.log("Выбран " + customTemplates.getValue(true));
                                addRow('regionTable', data[i].id, data[i].mins, data[i].gbites, "50", data[i].social,
                                    data[i].messenger, data[i].youtube);
                                cur_region_teriff = data[i];

                            }

                            /* for (var key in jsondata.regions) {

                                 if (jsondata.regions[key].id === data[i].id) {
                                     var info = ""; if(data[i].info  !== undefined) {info = data[i].info}
                                     choices1212.push({ //regioncity
                                         value: data[i].id.toString(),
                                         label: jsondata.regions[key].region + " (" + jsondata.regions[key].regioncity + ") " + info,
                                         disabled: false,
                                         customProperties: {description: jsondata.regions[key].altname}
                                     });
                                 }
                             }*/


                        }
                    });


                }
            });
        }


    }


}



// Названия приложений
// Добоавить сюда множественные\единиченые, фразу для выбора одного


var phrasesInet =[
// Название, группа, базовая стоимость, альт.название
    {id: 0, phrase: " Этого хватит для минимального использования интернета, он практически не используется (нужен редко/иногда/только для поиска информации)"},
    {id: 1, phrase: " Этого достаточно для умеренного использования интернета (web-серфинг, чтение новостей, иногда видео/аудио, скачивание/обновление приложений)"},
    {id: 2, phrase: " Это  вариант для активного использования интернета (видео/аудио, скачивание/обновление приложений, web-серфинг)"},
    {id: 3, phrase: " Этого должно (но это не точно) хватить для очень активного использования интернета (просмотр фильмов/трансляций/стримов, скачивание тяжелых приложений, обновление системы)"},
    {id: 4, phrase: " Этого хватит, чтобы безвылазно сидеть на сайте Yota и в мобильном приложении "},
];


var unlimApps=[
// Название, группа, базовая стоимость, альт.название
    {ids: 1,name: "ВК",             group: "social",      price: 20,        altname: "-"},
    {ids: 2,name: "Одноклассники",     group: "social",      price: 20,        altname: "Одноклассникам"},
    {ids: 3,name: "Facebook",        group: "social",      price: 20,        altname: "-"},
    {ids: 4,name: "Instagram",        group: "social",      price: 20,        altname: "-"},
    {ids: 5,name: "Twitter",         group: "social",      price: 10,        altname: "-"},
    {ids: 6,name: "Skype",           group: "messenger",    price: 10,        altname: "-"},
    {ids: 7,name: "Viber",           group: "messenger",    price: 10,        altname: "-"},
    {ids: 8,name: "Whatsapp",        group: "messenger",    price: 10,        altname: "-"},
    {ids: 9,name: "Youtube",         group: "youtube",     price: 60,        altname: "-"},
    {ids: 10,name: "Безлимитные SMS",  group: "sms",         price: 50,        altname: "-"},
    {ids: 11,name: "Telegram",           group: "deleted",      price: 0,     altname: "-"}
];






document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        //fn();
    }
};






