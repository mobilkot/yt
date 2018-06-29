var customTemplates;
document.addEventListener('DOMContentLoaded', function() {

    customTemplates = new Choices(document.getElementById('regions_call'), {
        searchFields: ['label', 'value', 'customProperties.description'],
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
                  <span style="margin-right:10px;"> >> </span> ' + '  [ <b>'  + String(data.groupId) + '</b> ]  ' + String(data.label) + ' ' + '\
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
                  <span style="margin-right:10px;"> >> </span> ' + '  [ <b>'  + String(data.groupId) + '</b> ]  ' + String(data.label) + ' ' + '\
                </div>\
              ');
                },
            };
        },
    });

    choices1212= [];

    regiones.forEach(function(item, i, arr) {
        {
            choices1212.push({
                value: regiones[i].region,
                label: regiones[i].region,
                disabled: false,
                customProperties: {description: regiones[i].altname}
            });
        }});
    customTemplates.setChoices([
        {
            value: 'Plaphone',
            label: 'Plaphone',
            id: 'Plaphone',
            disabled: false,
            choices: choices1212,

        },

    ], 'value', 'label', 0);

    customTemplates.passedElement.addEventListener('change', function(e) {
        //if (e.detail.value === 'London') {
        //    tubeStations.innerText = "London";
        //} else {
        //    tubeStations.innerText = `  ${e.detail.value}   ${e.choices}`;
        //document.getElementById('choices-single-groups').placeholder = 'no London ${e.detail.value}' + 'You just added "' + e.detail.value + '"';
        //}




        //if(!!appitems) { appitems.forEach(function(item, i, arr) {  if (appitems[i].checked) appitems[i].checked = false; }); }
        //else { appitems= document.querySelectorAll('input[type="checkbox"][name="select_apps"]'); }      //Выбрано среди приложений }

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




function mOver(obj) {
    obj.innerHTML = "Thank You"
}

function mOut(obj) {
    obj.innerHTML = "Mouse Over Me"
}
function mDown(obj) {
    obj.style.backgroundColor = "#1ec5e5";
    obj.innerHTML = "Release Me";
}

function mUp(obj) {
    obj.style.backgroundColor="#D94A38";
    obj.innerHTML="Thank You";
}








let log = document.getElementById('spans');

//let radios = document.querySelectorAll('input[type="radio"][name=' + questionsName[0] + ']');
let radios = document.querySelectorAll('input[type="checkbox"]');

//
//var value = radios.length>0? radios[0].value: null;

//document.getElementsByClassName('b-region-search__suggest-lin1k').addEventListener('click', function(){
    //document.getElementById('spans').innerHTML = "dd";
//    document.getElementById("test1234").innerText +="Пока ничего не выбраноsss :( ";
//});
//document.getElementsByClassName('b-region-search__suggest-link').addEventListener('click', function(){
    //document.getElementById('spans').innerHTML = "dd";
//    document.getElementById("b_tafir_summary_input").innerText ="Пока ничего не выбраноsss :( ";
//});



var selected_items = []; //id чекнутых бмп
var cur_mCount, cur_mPrice, cur_gCount, cur_gPrice; //Выбранные минуты,цена,трафик,цена

var outputSummary = document.getElementById("b_tafir_summary_input");  // элемент, куда отдается итоговый текст о тарифе

function summaryOutput() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var text, text1 = "";
    var cur_sum_app = [];
    var cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice));
    var  gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic"]:checked');
    var  mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute"]:checked');
    var  appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps"]:checked');
    var  appall = document.querySelector('input[type="checkbox"][name="select_apps_all"][value="0"]'); 		//галочка "все"
    if (appcheck.length===0)  selected_items = [];





    text = " Выбран пакет " +  cur_mCount + " минут за " + cur_mPrice + " рублей и " +  cur_gCount + " ГБ за " + cur_gPrice + " рублей";
    if( selected_items.length > 0) {

        selected_items.forEach(function(item, i, arr) {
            text1 += unlimApps[item-1].name + ", ";
            cur_sum_app[i] = Number( unlimApps[item-1].price );

            //////////////////////////////////////////////// Обработка списка приложений, безлимитный\ые (ок), "и" при 3 и более элементах, объединить все в один при выборе всего

        });
        cur_sum = Number(Number(cur_mPrice) + Number(cur_gPrice) + Number(cur_sum_app.reduce(reducer)));
        text += " , включая безлимитные "+text1;
    }	else	{
        text += ". ";
    }

    text += "Общая стоимость " + cur_sum + " рублей ";

    if ( (gcheck.length + mcheck.length)  === 2 )  {
        document.getElementById("b_tafir_summary_input").innerHTML = text;
        summaryOutput2(selected_items, cur_mCount ,cur_gCount);
    } else {

    }

}


function summaryOutput2(apps, cminut, cgbites) {

    var text = "";


    if (cgbites === 0) { text += phrasesInet[0].phrase; }
    else if (cgbites <= 7) {  text += phrasesInet[0].phrase;  }
    else if (cgbites <= 15) { text += phrasesInet[1].phrase; }
    else if (cgbites <= 30) { text += phrasesInet[2].phrase; }
    else if (cgbites > 30) { text += phrasesInet[3].phrase; }

    if( apps.length > 0) {
        text += ", включая безлимитный доступ к ";
        apps.forEach(function(item, i, arr) {
            text += unlimApps[item-1].name + ", ";
        });



    }

    document.getElementById("b_tafir_summary_input1").innerHTML = text;
}




var text, appitems, appcheck, appall;
function checkApps(node) {
    var text, appitems, appcheck, appall;



    // Название, группа, базовая стоимость, альт.название
    // [name: "ВК", 			group: "social", 		price: "20", 		altname: "-"]
    appcheck = document.querySelectorAll('input[type="checkbox"][name="select_apps"]:checked');      //Выбрано среди приложений
    appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps"]');        		//Все итемы приложжений
    appall = document.querySelector('input[type="checkbox"][name="select_apps_all"][value="0"]'); 		//галочка "все"

    ////////////// Обработчик чекбокса (все\по отдельности)
    if (node.value > appall.value) {
        selected_items = [];
        appall.checked = (appcheck.length === appitems.length) && (!appall.checked);
        appcheck.forEach(function(item, i, arr) {		if (arr[i].value!==0) selected_items[i] = arr[i].value; 		});

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


function checkType(node) {
    var  mcheck, gcheck, gchecks, mchecks;
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic"]:checked');        //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute"]:checked');        //Выбрано среди минут
    gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic"]');        //Все итемы в трафике
    mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute"]');        //Все итемы в минутах
    //cur_mCount = eval(eval("(function () { return \'current_mCount\' })()") + mcheck[0].value);
    regiones.forEach(function(item, region, arr) {
        if (regiones[region].region === customTemplates.getValue(true) ) {
            cur_mCount = regiones[region].mins[mcheck[0].value][0];
            cur_mPrice = regiones[region].mins[mcheck[0].value][1];
            cur_gCount = regiones[region].gbites[gcheck[0].value][0];
            cur_gPrice = regiones[region].gbites[gcheck[0].value][1];

            //regiones[region].
        }
    });


    summaryOutput()
}










var input_MN = document.getElementById('regions_call');
function example_region(stran){
    input_MN.value = stran;
    startInclude_MN();

}

function startInclude_MN() {




    function addRow(id, region, mins, gbites, itog, snPrice, mePrice, youtube){

        var elem = document.getElementById("tminute0");
        while (elem.firstChild) { if (elem.firstChild) elem.removeChild(elem.firstChild);  };

        /// Перестать использовать таблицы, черт
        var tr1 = document.createElement('tr');
        tr1.innerHTML = '<td nowrap id="labletd"><label class="layout-buttons">Пакеты минут:  </label></td>';
        elem.appendChild(tr1);

        mins.forEach(function(item,i,arr){
            var tr = document.createElement('tr');
            tr.innerHTML = '<td id="tdminute_' + i + '" nowrap><input value="' + i + '" id="iminute_'+ i + '"class="input_radio_minute" name="radio_minute" type="radio" onchange="checkType(this)"><label for="iminute_' + i + '" class="layout-buttons"> ' +  item[0] + ' минут за ' + item[1] + ' рублей  </label></td>';
            elem.appendChild(tr);
        });
        ////////////////////////////////////////

        var elem1 = document.getElementById("tgbite0");
        while (elem1.firstChild) { if (elem1.firstChild) elem1.removeChild(elem1.firstChild);  };

        var tr2 = document.createElement('tr');
        tr2.innerHTML = '<td nowrap id="labletd"><label class="layout-buttons">Пакеты трафика:  </label></td>';
        elem1.appendChild(tr2);

        gbites.forEach(function(item,i,arr){
            var tr2 = document.createElement('tr');
            tr2.innerHTML = '<td id="tdgbite_' + i + '" nowrap><input value="' + i + '" id="igbite_'+ i + '"class="input_radio_gbite" name="radio_trafic" type="radio" onchange="checkType(this)"><label for="igbite_' + i + '" class="layout-buttons">' +  item[0] + ' ГБ за ' + item[1] + ' рублей' + '</label></td>';
            elem1.appendChild(tr2);
        });
          //div.className = "alert alert-success";



        /// Сохранение цен приложений выбранной области в массив \\ переписать получше бы
        regiones.forEach(function(item, region, arr) {
            if (regiones[region].region === customTemplates.getValue(true) ) {
                unlimApps.forEach(function(item, app, arr) {
                    switch (unlimApps[app].group){
                        case "messenger": unlimApps[app].price = regiones[region].messenger; break;
                        case "social": unlimApps[app].price = regiones[region].social; break;
                        case "youtube": unlimApps[app].price = regiones[region].youtube; break;
                        default: break;

                    }

                });
            }
        });



    }


    if(input_MN.value.length > 0)	{

            regiones.forEach(function(item, region, arr) {
                if (regiones[region].region === customTemplates.getValue(true) ) {
                    addRow('regionTable', regiones[region].region, regiones[region].mins, regiones[region].gbites, regiones[region].itog, regiones[region].social, regiones[region].messenger, regiones[region].youtube);
                }
        });
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
];


var unlimApps=[
// Название, группа, базовая стоимость, альт.название
    {name: "ВК", 				group: "social", 		price: 20, 		altname: "-"},
    {name: "Одноклассники", 	group: "social", 		price: 20, 		altname: "-"},
    {name: "Facebook", 			group: "social", 		price: 20, 		altname: "-"},
    {name: "Instagram", 		group: "social", 		price: 20, 		altname: "-"},
    {name: "Twitter", 			group: "social", 		price: 10, 		altname: "-"},
    {name: "Skype", 			group: "messenger", 	price: 10, 		altname: "-"},
    {name: "Viber", 			group: "messenger", 	price: 10, 		altname: "-"},
    {name: "Whatsapp", 			group: "messenger", 	price: 10, 		altname: "-"},
    {name: "Youtube", 			group: "youtube", 		price: 60, 		altname: "-"}
];



// Список регионов


var regiones=[
    { id: 0,   region: "Алтайский край", altname: "Барнаул", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "100"],["400", "130"],["500", "160"],["700", "230"],["1000", "330"],["2000", "450"],], gbites: [["2", "150"],["7", "180"],["15", "200"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 1,   region: "Амурская область", altname: "Благовещенск", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "110"],["500", "130"],["700", "170"],["1000", "220"],["2000", "320"],], gbites: [["2", "250"],["7", "275"],["15", "325"],["30", "400"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 2,   region: "Архангельская область", altname: "Архангельская область", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "110"],["400", "150"],["500", "180"],["700", "250"],["1000", "350"],["2000", "450"],], gbites: [["2", "180"],["7", "200"],["15", "230"],["30", "330"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 3,   region: "Астраханская область", altname: "Астраханская область", mins: [["0", "0"],["100", "70"],["200", "100"],["300", "120"],["400", "140"],["500", "160"],["700", "180"],["1000", "200"],["2000", "400"],], gbites: [["2", "140"],["7", "180"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 4,   region: "Белгородская область", altname: "Белгородская область", mins: [["0", "0"],["100", "40"],["200", "60"],["300", "80"],["400", "100"],["600", "130"],["800", "160"],["1000", "190"],["2000", "350"],], gbites: [["2", "150"],["7", "170"],["15", "220"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 5,   region: "Брянская область", altname: "Брянская область", mins: [["0", "0"],["100", "40"],["200", "50"],["300", "60"],["400", "80"],["500", "100"],["700", "140"],["1000", "200"],["2000", "300"],], gbites: [["3", "230"],["9", "250"],["18", "300"],["30", "400"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 6,   region: "Владимирская область", altname: "Владимирская область", mins: [["0", "0"],["100", "70"],["200", "100"],["300", "150"],["400", "180"],["500", "200"],["800", "300"],["1500", "400"],["2000", "450"],], gbites: [["2", "150"],["7", "170"],["15", "300"],["30", "450"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 7,   region: "Волгоградская область", altname: "Волгоградская область", mins: [["0", "0"],["100", "60"],["200", "80"],["300", "100"],["400", "130"],["500", "150"],["800", "170"],["1000", "190"],["2000", "350"],], gbites: [["1", "150"],["5", "200"],["15", "270"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 8,   region: "Вологодская область", altname: "Вологодская область", mins: [["0", "0"],["200", "50"],["300", "75"],["400", "100"],["600", "150"],["800", "200"],["1000", "250"],["2000", "400"],], gbites: [["1", "180"],["5", "220"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 9,   region: "Воронежская область", altname: "Воронежская область", mins: [["0", "0"],["100", "30"],["200", "40"],["300", "60"],["400", "80"],["600", "110"],["800", "140"],["1000", "170"],["2000", "350"],], gbites: [["2", "180"],["7", "200"],["20", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 10,   region: "Московская область", altname: "Москва столица 77", mins: [["0", "0"],["100", "50"],["200", "100"],["300", "150"],["400", "200"],["500", "250"],["700", "400"],["1000", "600"],["2000", "700"],], gbites: [["0", "0"],["2", "250"],["6", "280"],["12", "330"],["30", "380"],] , social: "25", messenger: "15", youtube: "60"},
    { id: 11,   region: "Ленинградская область", altname: "Спб 78 Санкт-Петербург йота", mins: [["0", "0"],["100", "25"],["200", "50"],["300", "100"],["400", "150"],["500", "300"],["700", "400"],["1000", "700"],["2000", "1000"],], gbites: [["7", "300"],["15", "350"],["30", "450"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 12,   region: "Еврейская автономная область", altname: "Биробиджан ЕАО", mins: [["0", "0"],["100", "50"],["200", "75"],["300", "100"],["400", "130"],["500", "160"],["700", "230"],["1000", "330"],["2000", "450"],], gbites: [["1", "200"],["5", "225"],["15", "275"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 13,   region: "Забайкальский край", altname: "Чита", mins: [["0", "0"],["100", "30"],["200", "40"],["300", "60"],["400", "80"],["500", "100"],["700", "140"],["1000", "200"],["2000", "300"],], gbites: [["2", "200"],["7", "220"],["15", "300"],["30", "400"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 14,   region: "Ивановская область", altname: "Ивановская область", mins: [["0", "0"],["200", "50"],["300", "75"],["400", "100"],["500", "125"],["800", "200"],["1000", "250"],["2000", "400"],], gbites: [["2", "180"],["7", "200"],["15", "250"],["30", "300"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 15,   region: "Иркутская область", altname: "Иркутская область", mins: [["0", "0"],["300", "60"],["400", "70"],["500", "90"],["600", "100"],["700", "120"],["1000", "170"],["2000", "330"],], gbites: [["2", "130"],["10", "150"],["20", "200"],["40", "350"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 16,   region: "Кабардино-Балкарская Республика", altname: "КБР  Нальчик", mins: [["0", "0"],["100", "60"],["200", "80"],["300", "100"],["400", "120"],["500", "140"],["700", "170"],["1000", "200"],["2000", "350"],], gbites: [["2", "180"],["7", "200"],["18", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 17,   region: "Калининградская область", altname: "Калининградская область", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "90"],["700", "100"],["1000", "120"],["2000", "220"],], gbites: [["3", "200"],["9", "220"],["18", "300"],["30", "320"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 18,   region: "Калужская область", altname: "Калужская область", mins: [["0", "0"],["100", "60"],["200", "80"],["300", "100"],["400", "120"],["500", "150"],["700", "170"],["1000", "200"],["2000", "350"],], gbites: [["2", "150"],["7", "180"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 19,   region: "Камчатский край", altname: "Камчатский край", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "120"],["400", "140"],["500", "160"],["800", "250"],["1000", "300"],["2000", "400"],], gbites: [["1", "290"],["4", "330"],["10", "450"],["20", "600"],] , social: "20", messenger: "10", youtube: "100"},
    { id: 20,   region: "Карачаево-Черкесская Республика", altname: " КЧР Черкесск", mins: [["0", "0"],["200", "90"],["300", "110"],["500", "120"],["600", "130"],["800", "150"],["1000", "160"],["1500", "230"],["2000", "300"],], gbites: [["2", "180"],["7", "230"],["20", "270"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 21,   region: "Кемеровская область", altname: "Кемеровская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "100"],["500", "120"],["700", "170"],["1000", "200"],["2000", "300"],], gbites: [["2", "160"],["10", "180"],["20", "220"],["30", "340"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 22,   region: "Кировская область", altname: "Кировская область", mins: [["0", "0"],["200", "30"],["300", "40"],["400", "50"],["500", "60"],["700", "80"],["1000", "100"],["2000", "200"],], gbites: [["2", "200"],["7", "220"],["15", "280"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 23,   region: "Костромская область", altname: "Костромская область", mins: [["0", "0"],["100", "40"],["200", "60"],["300", "80"],["400", "100"],["500", "120"],["800", "160"],["1000", "200"],["2000", "300"],], gbites: [["2", "180"],["8", "200"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 24,   region: "Краснодарский край", altname: "Краснодарский край", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "100"],["400", "120"],["600", "150"],["800", "180"],["1000", "210"],["2000", "400"],], gbites: [["1", "130"],["5", "150"],["15", "200"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 25,   region: "Красноярский край", altname: "Красноярский край", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "100"],["400", "130"],["500", "160"],["700", "210"],["1000", "300"],["2000", "400"],], gbites: [["2", "180"],["7", "210"],["15", "270"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 26,   region: "Курганская область", altname: "Курганская область", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "100"],["700", "140"],["1000", "200"],["2000", "300"],], gbites: [["2", "180"],["7", "200"],["20", "250"],["30", "300"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 27,   region: "Курская область", altname: "Курская область", mins: [["0", "0"],["100", "40"],["200", "50"],["300", "80"],["400", "110"],["500", "140"],["800", "200"],["1000", "240"],["2000", "400"],], gbites: [["3", "180"],["9", "200"],["18", "250"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 28,   region: "Липецкая область", altname: "Липецкая область", mins: [["0", "0"],["100", "90"],["200", "100"],["300", "110"],["400", "120"],["600", "160"],["800", "180"],["1000", "200"],["2000", "400"],], gbites: [["2", "150"],["7", "170"],["20", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 29,   region: "Магаданская область", altname: "Магаданская область", mins: [["0", "0"],["100", "80"],["200", "110"],["300", "130"],["400", "155"],["500", "180"],["700", "250"],["1000", "350"],["2000", "450"],], gbites: [["1", "270"],["4", "300"],["10", "400"],["20", "550"],] , social: "20", messenger: "10", youtube: "100"},
    { id: 30,   region: "Мурманская область", altname: "Мурманская область", mins: [["0", "0"],["200", "50"],["300", "75"],["400", "100"],["600", "150"],["800", "200"],["1000", "300"],["2000", "450"],], gbites: [["5", "250"],["15", "320"],["30", "400"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 31,   region: "Нижегородская область", altname: "Нижний Новгород", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "100"],["400", "130"],["500", "160"],["700", "200"],["1000", "270"],["2000", "500"],], gbites: [["1", "130"],["5", "150"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 32,   region: "Новгородская область", altname: "Новгородская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "100"],["400", "125"],["500", "150"],["800", "250"],["1000", "300"],["2000", "450"],], gbites: [["1", "180"],["5", "220"],["15", "280"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 33,   region: "Новосибирская область", altname: "Новосибирская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "110"],["500", "130"],["700", "160"],["1000", "200"],["2000", "300"],], gbites: [["2", "180"],["10", "200"],["20", "240"],["30", "340"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 34,   region: "Омская область", altname: "Омская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "100"],["400", "130"],["500", "150"],["700", "210"],["1000", "300"],["2000", "400"],], gbites: [["2", "160"],["7", "180"],["15", "220"],["30", "300"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 35,   region: "Оренбургская область", altname: "Оренбургская область", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "140"],["700", "210"],["1000", "360"],["2000", "400"],], gbites: [["2", "220"],["7", "260"],["15", "310"],["30", "440"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 36,   region: "Орловская область", altname: "Орловская область", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "110"],["400", "140"],["500", "170"],["700", "230"],["1000", "300"],["2000", "550"],], gbites: [["3", "150"],["7", "170"],["18", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 37,   region: "Пензенская область", altname: "Пензенская область", mins: [["0", "0"],["100", "40"],["200", "80"],["300", "100"],["400", "120"],["500", "150"],["700", "190"],["1000", "230"],["2000", "350"],], gbites: [["1", "160"],["5", "180"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 38,   region: "Пермский край", altname: "Пермский край", mins: [["0", "0"],["200", "60"],["300", "80"],["400", "100"],["500", "120"],["700", "160"],["1000", "230"],["2000", "350"],], gbites: [["2", "180"],["7", "200"],["15", "240"],["30", "300"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 39,   region: "Приморский край", altname: "Владивосток", mins: [["0", "0"],["100", "50"],["200", "75"],["300", "100"],["400", "150"],["500", "180"],["700", "250"],["1000", "350"],["2000", "450"],], gbites: [["2", "180"],["7", "200"],["15", "270"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 40,   region: "Псковская область", altname: "Псковская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "110"],["500", "130"],["700", "160"],["1000", "200"],["2000", "350"],], gbites: [["2", "230"],["7", "250"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 41,   region: "Региональный", altname: "Дорого", mins: [["0", "0"],["100", "50"],["200", "100"],["300", "150"],["400", "200"],["500", "250"],["700", "400"],["1000", "600"],["2000", "700"],], gbites: [["2", "250"],["6", "280"],["12", "330"],["30", "380"],] , social: "25", messenger: "15", youtube: "100"},
    { id: 42,   region: "Республика Адыгея", altname: "Майкоп", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "100"],["400", "120"],["600", "150"],["800", "180"],["1000", "210"],["2000", "400"],], gbites: [["1", "130"],["5", "150"],["15", "200"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 43,   region: "Республика Алтай", altname: "Горно-Алтайск", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "100"],["400", "130"],["500", "160"],["700", "230"],["1000", "330"],["2000", "450"],], gbites: [["2", "160"],["7", "180"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 44,   region: "Республика Башкортостан", altname: "Уфа", mins: [["0", "0"],["100", "40"],["200", "80"],["300", "100"],["400", "120"],["500", "140"],["700", "170"],["1000", "190"],["2000", "350"],], gbites: [["1", "150"],["5", "170"],["15", "230"],["30", "400"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 45,   region: "Республика Бурятия", altname: "Улан-Удэ", mins: [["0", "0"],["200", "40"],["300", "50"],["400", "70"],["500", "90"],["800", "140"],["1000", "180"],["2000", "300"],], gbites: [["3", "150"],["9", "170"],["15", "240"],["30", "300"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 46,   region: "Республика Дагестан", altname: "Махачкала", mins: [["0", "0"],["200", "60"],["300", "70"],["400", "80"],["500", "100"],["700", "130"],["800", "150"],["1000", "250"],["2000", "500"],], gbites: [["2", "200"],["7", "250"],["20", "300"],["30", "320"],["50", "450"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 47,   region: "Республика Ингушетия", altname: "Магас", mins: [["0", "0"],["200", "90"],["300", "100"],["500", "120"],["600", "130"],["800", "140"],["1000", "150"],["1500", "180"],["2000", "300"],], gbites: [["2", "160"],["7", "190"],["20", "270"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 48,   region: "Республика Калмыкия", altname: "Элиста", mins: [["0", "0"],["100", "70"],["200", "100"],["300", "120"],["400", "140"],["500", "160"],["700", "200"],["1000", "250"],["2000", "400"],], gbites: [["1", "150"],["5", "180"],["15", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 49,   region: "Республика Карелия", altname: " Петрозаводск", mins: [["0", "0"],["100", "50"],["200", "75"],["300", "100"],["400", "125"],["500", "150"],["800", "250"],["1000", "300"],["2000", "450"],], gbites: [["2", "180"],["7", "220"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 50,   region: "Республика Коми", altname: "Сыктывкар", mins: [["0", "0"],["200", "50"],["300", "70"],["400", "90"],["500", "110"],["700", "150"],["1000", "200"],["2000", "300"],], gbites: [["1", "230"],["5", "250"],["10", "300"],["20", "350"],] , social: "20", messenger: "10", youtube: "100"},
    { id: 51,   region: "Республика Марий Эл", altname: "Йошкар-Ола", mins: [["0", "0"],["100", "40"],["200", "60"],["300", "80"],["400", "100"],["500", "120"],["700", "150"],["1000", "180"],["2000", "300"],], gbites: [["1", "130"],["5", "150"],["18", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 52,   region: "Республика Мордовия", altname: "Саранск", mins: [["0", "0"],["100", "40"],["200", "70"],["300", "90"],["400", "120"],["500", "150"],["700", "200"],["1000", "250"],["2000", "350"],], gbites: [["2", "130"],["7", "150"],["15", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 53,   region: "Республика Саха (Якутия)", altname: "Якутск", mins: [["0", "0"],["200", "20"],["300", "45"],["400", "70"],["500", "90"],["700", "170"],["1000", "320"],["2000", "450"],], gbites: [["7", "310"],["15", "410"],["30", "450"],] , social: "20", messenger: "10", youtube: "100"},
    { id: 54,   region: "Республика Северная Осетия - Алания", altname: "Владикавказ", mins: [["0", "0"],["200", "60"],["300", "80"],["400", "100"],["500", "120"],["700", "160"],["800", "180"],["1000", "210"],["2000", "300"],], gbites: [["2", "180"],["7", "200"],["20", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 55,   region: "Республика Татарстан", altname: "Казань", mins: [["0", "0"],["100", "40"],["200", "80"],["300", "100"],["400", "120"],["500", "140"],["700", "170"],["1000", "190"],["2000", "350"],], gbites: [["2", "130"],["7", "150"],["15", "180"],["30", "200"],["50", "280"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 56,   region: "Республика Тыва", altname: "Кызыл", mins: [["0", "0"],["100", "50"],["200", "75"],["300", "100"],["400", "125"],["500", "150"],["700", "200"],["1000", "280"],["2000", "400"],], gbites: [["2", "200"],["7", "230"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 57,   region: "Республика Хакасия", altname: "Абакан", mins: [["0", "0"],["100", "70"],["200", "90"],["300", "110"],["400", "140"],["500", "180"],["700", "250"],["1000", "300"],["2000", "400"],], gbites: [["2", "180"],["7", "200"],["15", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 58,   region: "Ростовская область", altname: "Ростовская область", mins: [["0", "0"],["100", "50"],["200", "80"],["300", "110"],["400", "130"],["600", "200"],["800", "260"],["1000", "360"],["2000", "500"],], gbites: [["2", "220"],["7", "240"],["20", "280"],["30", "440"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 59,   region: "Рязанская область", altname: "Рязанская область", mins: [["0", "0"],["100", "40"],["200", "50"],["300", "75"],["400", "100"],["500", "125"],["700", "170"],["1000", "220"],["2000", "350"],], gbites: [["2", "150"],["7", "170"],["15", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 60,   region: "Самарская область", altname: "63 Тольятти Самара", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "150"],["700", "200"],["1000", "260"],["2000", "450"],], gbites: [["5", "240"],["15", "270"],["30", "370"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 61,   region: "Саратовская область", altname: "Саратовская область", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "140"],["700", "230"],["1000", "300"],["2000", "400"],], gbites: [["7", "260"],["15", "360"],["30", "440"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 62,   region: "Сахалинская область", altname: "Сахалинская область", mins: [["0", "0"],["100", "30"],["200", "40"],["300", "50"],["400", "60"],["500", "70"],["700", "90"],["1000", "130"],["2000", "230"],], gbites: [["1", "250"],["5", "280"],["15", "350"],["30", "500"],] , social: "20", messenger: "10", youtube: "100"},
    { id: 63,   region: "Свердловская область", altname: "Екатеринбург", mins: [["0", "0"],["100", "30"],["200", "50"],["300", "70"],["400", "90"],["500", "110"],["700", "150"],["1000", "200"],["2000", "350"],], gbites: [["1", "180"],["5", "200"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 64,   region: "Смоленская область", altname: "Смоленская область", mins: [["0", "0"],["100", "40"],["200", "50"],["300", "70"],["400", "90"],["500", "110"],["700", "150"],["1000", "200"],["2000", "300"],], gbites: [["3", "200"],["9", "220"],["18", "250"],["30", "350"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 65,   region: "Ставропольский край", altname: "Ставропольский край", mins: [["0", "0"],["100", "80"],["200", "90"],["300", "100"],["400", "120"],["600", "140"],["800", "160"],["1000", "180"],["2000", "350"],], gbites: [["2", "180"],["7", "200"],["20", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 66,   region: "Тамбовская область", altname: "Тамбовская область", mins: [["0", "0"],["100", "70"],["200", "80"],["300", "90"],["400", "100"],["600", "140"],["800", "150"],["1000", "180"],["2000", "300"],], gbites: [["2", "150"],["7", "170"],["20", "220"],["30", "300"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 67,   region: "Тверская область", altname: "Тверская область", mins: [["0", "0"],["100", "30"],["200", "40"],["300", "60"],["400", "80"],["500", "100"],["700", "140"],["1000", "180"],["2000", "280"],], gbites: [["4", "200"],["7", "220"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 68,   region: "Томская область", altname: "Томская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "110"],["500", "130"],["700", "180"],["1000", "230"],["2000", "350"],], gbites: [["3", "160"],["9", "180"],["18", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "75"},
    { id: 69,   region: "Тульская область", altname: "Тульская область", mins: [["0", "0"],["200", "40"],["300", "50"],["400", "60"],["500", "70"],["700", "100"],["1000", "150"],["2000", "300"],], gbites: [["9", "150"],["25", "200"],["40", "300"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 70,   region: "Тюменская область", altname: "Тюменская область", mins: [["0", "0"],["200", "50"],["300", "70"],["400", "90"],["500", "110"],["700", "150"],["1000", "200"],["2000", "350"],], gbites: [["2", "160"],["10", "180"],["20", "230"],["30", "270"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 71,   region: "Удмуртская Республика", altname: "Ижевск", mins: [["0", "0"],["200", "40"],["300", "60"],["400", "80"],["500", "100"],["700", "140"],["1000", "200"],["2000", "300"],], gbites: [["2", "230"],["7", "250"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 72,   region: "Ульяновская область", altname: "Ульяновская область", mins: [["0", "0"],["100", "70"],["200", "110"],["300", "130"],["400", "160"],["500", "200"],["700", "250"],["1000", "300"],["2000", "400"],], gbites: [["1", "160"],["5", "180"],["15", "250"],["30", "400"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 73,   region: "Хабаровский край", altname: "Хабаровский край", mins: [["0", "0"],["100", "60"],["200", "80"],["300", "120"],["400", "160"],["500", "200"],["700", "280"],["1000", "400"],["2000", "550"],], gbites: [["1", "240"],["5", "260"],["15", "300"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 74,   region: "Ханты-Мансийский автономный округ - Югра", altname: "ХМАО", mins: [["0", "0"],["200", "70"],["300", "90"],["400", "120"],["500", "150"],["700", "170"],["1000", "220"],["2000", "400"],], gbites: [["2", "220"],["7", "250"],["20", "270"],["30", "350"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 75,   region: "Челябинская область", altname: "Челябинская область", mins: [["0", "0"],["100", "50"],["200", "70"],["300", "90"],["400", "110"],["500", "130"],["700", "170"],["1000", "220"],["2000", "400"],], gbites: [["2", "180"],["7", "200"],["15", "240"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 76,   region: "Чеченская Республика", altname: "Махачкала", mins: [["0", "0"],["200", "90"],["300", "100"],["500", "120"],["600", "130"],["800", "140"],["1000", "150"],["1500", "180"],["2000", "300"],], gbites: [["2", "180"],["7", "200"],["20", "230"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 77,   region: "Чувашская Республика", altname: "Чебоксары", mins: [["0", "0"],["100", "40"],["200", "80"],["300", "100"],["400", "120"],["600", "140"],["800", "170"],["1000", "190"],["2000", "350"],], gbites: [["2", "130"],["7", "150"],["15", "230"],["30", "350"],] , social: "20", messenger: "10", youtube: "60"},
    { id: 78,   region: "Ямало-Ненецкий автономный округ", altname: "ЯНАО", mins: [["0", "0"],["200", "50"],["300", "70"],["400", "90"],["500", "115"],["700", "150"],["1000", "200"],["2000", "350"],], gbites: [["2", "200"],["7", "220"],["20", "300"],["30", "400"],] , social: "20", messenger: "10", youtube: "30"},
    { id: 79,   region: "Ярославская область", altname: "Ярославская область", mins: [["0", "0"],["200", "50"],["300", "75"],["400", "100"],["500", "125"],["800", "200"],["1000", "250"],["2000", "350"],], gbites: [["1", "180"],["5", "200"],["15", "250"],["30", "300"],] , social: "20", messenger: "10", youtube: "60"},

];

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        //fn();
    }
};

