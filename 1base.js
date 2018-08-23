

var customTemplates;

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
    customTemplates.enable();



    VisibleClearBody("clear");
    loadRegions("plaphone", jsondata);

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


}

function loadRegions(tarif, jsondata) {
    choices1212= [];
    if ( tarif === "plaphone" ) {
        var regions = jsondata.elements;
        regions.forEach(function (item, i, arr) {
            if (regions[i].name === tarif) {

                var data = regions[i].data;

                data.forEach(function (item, i, arr) {
                    {
                        for (var key in jsondata.regions) {

                            if (jsondata.regions[key].id === data[i].id) {
                                var info = "";
                                if (data[i].info !== undefined) {
                                    info = data[i].info
                                }
                                choices1212.push({
                                    value: data[i].id.toString(),
                                    label: jsondata.regions[key].region + " (" + jsondata.regions[key].regioncity + ") " + info,
                                    disabled: false,
                                    customProperties: {description: jsondata.regions[key].altname}
                                });
                            }
                        }


                    }
                });

                customTemplates.clearStore();
                customTemplates.setChoices([
                    {
                        value: regions[i].data[0].type,
                        label: regions[i].data[0].type,
                        id: regions[i].data[0].type,
                        disabled: false,
                        choices: choices1212,

                    },], 'value', 'label', 0);
            }
        });
    }




}


{
    var source = ` <div class="d-table">

            <div class="d-tr">
                <div class="d-td no-p">
                    <div class="d-table">
                        <div class="d-tr">
                            <div class="d-td">
                                <textarea readonly class="b_summary_tarif_text_blablabla" id="b_tafir_summary_input" placeholder="Пока ничего не выбрано :( " onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>
                            </div>
                        </div>
                        <div class="d-tr">
                            <div class="d-td">
                                <textarea readonly class="b_summary_tarif_text_blablabla" id="b_tafir_summary_input1" placeholder="  " onmousedown="mDown(this)" onmouseup="mUp(this)" onmouseover="mOver(this)" onmouseout="mOut(this)"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-td no-p" >
                    <div  id="tapps" class="divTableCell"  >
                        <div class="divTable">
                            <div class="divTableBody">
                                <div class="divTableRow">
                                    <input id="app-all" class="input_app-all" type="checkbox" name="select_apps_all" value="0" onchange="checkApps(this)">  <label for="app-all" class="layout-buttons_gb">Все опции и БМП		</span></label>
                                    <div class="divTableCell">
                                        <input id="app-vk" class="input_app-vk" type="checkbox" name="select_apps" value="1" onchange="checkApps(this)">  <label for="app-vk" class="layout-buttons"><span> <div data-name="vk" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"><div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"><circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle><circle class="activated" fill="#5A7DA3" cx="20.5" cy="20.5" r="60"></circle> <path d="M28.8 20.4c.7-.9 1.4-1.9 2-2.8.3-.4.4-.9.7-1.4 0 0 0-.1.1-.1v-.3c-.2-.4-.5-.4-.8-.4h-3.9c-.6 0-.8.1-1 .7-.3.6-.5 1.2-.8 1.7-.4.9-.9 1.7-1.5 2.5-.3.4-.6.7-.9 1-.2.2-.5.2-.7-.1-.2-.2-.3-.5-.3-.8V19v-2.9c0-.2 0-.4-.1-.6-.1-.3-.4-.5-.8-.5H17c-.5 0-.8.2-1.1.6-.1.2-.1.3.1.3.4.1.8.3 1 .6.1.2.2.4.2.6.2 1.1.2 2.3 0 3.5 0 .2-.1.5-.2.7-.2.3-.4.4-.8.2-.2-.1-.4-.3-.5-.5-.4-.6-.9-1.2-1.3-1.9-.3-.5-.6-1.1-.9-1.7-.2-.4-.3-.7-.5-1.1-.2-.5-.6-.8-1.1-.8H8.5c-.2 0-.4.1-.5.3v.3c.3.7.6 1.4 1 2.1.6 1.1 1.2 2.3 1.8 3.4.5.9 1.1 1.7 1.7 2.6.7 1 1.5 1.8 2.4 2.5 1 .7 2.1 1.2 3.3 1.4.9.2 1.7.2 2.6.1.5 0 .7-.3.8-.8.1-.5.1-.9.2-1.4.1-.3.2-.6.4-.8.2-.2.5-.2.8 0 .3.2.6.5.9.8.4.5.9.9 1.3 1.4.5.5 1.2.8 2 .8h3.3c.6 0 .8-.2.9-.7v-.2c-.2-.8-.8-1.4-1.3-2L28 23.2c-.1-.1-.2-.2-.3-.4-.2-.4-.2-.8.1-1.1.4-.5.7-.9 1-1.3z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>

                                    <div class="divTableCell">
                                        <input id="app-ig" class="input_app-ig" type="checkbox" name="select_apps" value="4" onchange="checkApps(this)">  <label for="app-ig" class="layout-buttons"><span> <div data-name="instagram" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle><linearGradient class="enableflow1" x1="36.7393%" y1="74.3071%" x2="77.4217%" y2="-.2646%" id="a"> <stop stop-color="#F5BB58" offset="0%"></stop> <stop stop-color="#D22C78" offset="57.65%"></stop> <stop stop-color="#5959C5" offset="100%"></stop> </linearGradient> <circle class="activated" fill="url(#a)" cx="20.5" cy="20.5" r="60"></circle> <path d="M21.9 7h-3.2C12.2 7 7 12.3 7 18.7v3.1c0 6.5 5.3 11.7 11.7 11.7h3.2c6.5 0 11.7-5.3 11.7-11.7v-3.1C33.6 12.2 28.4 7 21.9 7zm9.6 14.7c0 5.3-4.3 9.6-9.6 9.6h-3.2c-5.3 0-9.6-4.3-9.6-9.6v-3.1c0-5.3 4.3-9.6 9.6-9.6h3.2c2.4 0 4.6.9 6.2 2.3-.2 0-.3-.1-.5-.1-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8v-.3c1.3 1.6 2.1 3.7 2.1 5.9v3.1zm-11.1-8.3c-3.8 0-6.9 3.1-6.9 6.9 0 3.8 3.1 6.9 6.9 6.9 3.8 0 6.9-3.1 6.9-6.9 0-3.8-3.1-6.9-6.9-6.9zm0 11.7c-2.7 0-4.8-2.2-4.8-4.8 0-2.7 2.2-4.8 4.8-4.8 2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-fb" class="input_app-fb" type="checkbox" name="select_apps" value="3" onchange="checkApps(this)">  <label for="app-fb" class="layout-buttons"><span> <div data-name="fb" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">   <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#6781CA" cx="20.5" cy="20.5" r="60"></circle> <path d="M24.4 13.8h2.3v-3.5H23c-4.6 0-4.4 5.3-4.4 5.3v2.6h-3.1v3.5h3.1V31.5h4v-9.8h3.2l.5-3.5h-3.7v-2.6c.1-1.9 1.8-1.8 1.8-1.8z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-ok" class="input_app-ok" type="checkbox" name="select_apps" value="2" onchange="checkApps(this)">  <label for="app-ok" class="layout-buttons"><span> <div data-name="ok" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">   <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#FC8924" cx="20.5" cy="20.5" r="60"></circle> <path d="M27.24444 23.7c-.5 1.3-1.7 1.6-3 1.7-.4.2-.9.3-1.4.5.1.2.3.4.4.5l2.7 2.7c.7.8.8 1.8.1 2.5-.7.7-1.7.6-2.5-.1-.8-.9-1.7-1.7-2.6-2.6-.2-.1-.3-.3-.6-.5-.5.6-1 1.1-1.5 1.6-.5.6-1.1 1.2-1.7 1.7-.7.7-1.8.7-2.4 0-.6-.6-.6-1.6.1-2.3.9-.9 1.9-1.8 2.8-2.7l.5-.5c-.8-.3-1.5-.5-2.2-.8-.4-.2-.7-.4-1.1-.6-.8-.5-1.1-1.5-.6-2.3.5-.7 1.5-1 2.4-.5 1.2.7 2.5 1.1 3.9 1.1 1.3 0 2.6-.2 3.7-.9s2.3-.7 3 .9v.6zm-6.7-2.2c-3.3 0-5.8-2.5-5.9-5.8 0-3.1 2.7-5.7 5.9-5.7 3.3 0 5.9 2.6 5.9 5.8 0 3.5-3 5.8-5.9 5.7zm0-8.2c-1.3 0-2.5 1.1-2.5 2.5 0 1.3 1.2 2.4 2.5 2.4 1.4 0 2.5-1.1 2.5-2.5 0-1.3-1.1-2.4-2.5-2.4z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-tw" class="input_app-tw" type="checkbox" name="select_apps" value="5" onchange="checkApps(this)">  <label for="app-tw" class="layout-buttons"><span>  <div data-name="twitter" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#55B2F0" cx="20.5" cy="20.5" r="60"></circle> <path d="M31.7 13.94628c-1.1.7-2.1.8-2.1.8 1.7-1.5 1.6-2.4 1.6-2.4-1.3 1-2.5 1.1-2.5 1.1-2.5-2.5-5-1-5-1-3.1 2-2.1 4.8-2.1 4.8-5.2-.3-8.5-4.6-8.5-4.6-1.8 3.8 1.2 5.7 1.2 5.7-.7.1-1.8-.5-1.8-.5.6 4.1 3.3 4.1 3.3 4.1-.5.4-1.8.2-1.8.2 1.3 3.1 3.8 2.8 3.8 2.8-2 2.2-5.8 1.8-5.8 1.8 3.6 2.9 8.7 1.7 8.7 1.7 9.6-2.2 9.1-12.4 9.1-12.4 1.7-.8 1.9-2.1 1.9-2.1z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-social"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div></div>
                                <div class="divTableRow">
                                    <div class="divTableCell">
                                        <input id="app-vi" class="input_app-vi" type="checkbox" name="select_apps" value="7" onchange="checkApps(this)">  <label for="app-vi" class="layout-buttons"><span>  <div data-name="viber" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle>  <circle class="activated" fill="#A589D7" cx="20.5" cy="20.5" r="60"></circle> <path d="M30.9861006 14.9555556s1.3 3.8.2 9.9c0 0-.3 6.7-12.5 5.6l-1.8 2c-1.4 1.6-2.5 1.2-2.4-.9l.1-1.7s-4-.7-5.20000001-4.9c-1.1-4.3.5-10 .5-10s.80000001-2.9 3.40000001-3.8c0 0 6.9-2.60000004 14 0 0 0 2.8.9 3.7 3.8zm-1.6 9.3c.9-5.1-.1-8.3-.1-8.4-.7-2.4-3.1-3.1-3.1-3.1-5.9-2.1-11.7 0-11.7 0-2.2.8-2.9 3.2-2.9 3.2s-1.4 4.8-.4 8.4c1 3.6 4.1 4.1 4.1 4.1v3.8c0 .5.2.5.5.2l3.1-3.6c10.2 1 10.5-4.6 10.5-4.6zm-13.8-4.5c-.6-1.2-.9-2.1-.9-2.7 0-.6.2-.8.3-1 .1-.2.9-.6 1-.7.1-.1.8-.2 1 .2.3.4.8 1.1 1.2 1.6.6.8 0 1.3-.2 1.5-.3.4-.4.5-.4.9s1.3 1.8 1.6 2.1c.3.3 1.6 1.5 2 1.5.4.1.9-.4 1.1-.5.6-.4 1-.4 1.3-.3.3.1 1.4 1.2 1.7 1.5.5.4.3.7.3.7s-.7 1.2-.8 1.3c-.1.2-.4.3-1 .3s-1.2-.1-2.8-.9c-1.2-.7-2.4-1.8-3.1-2.4-.5-.5-1.6-1.7-2.3-3.1zm7.3.2c-.2 0-.4-.2-.4-.4-.1-1.5-1.3-1.5-1.4-1.5-.2 0-.4-.2-.4-.4s.2-.4.4-.4c.7 0 2.1.5 2.2 2.3 0 .2-.1.4-.4.4.1 0 0 0 0 0zm1.4.5c-.2 0-.4-.2-.4-.4 0-1.1-.3-2-.9-2.5-.9-.9-2.3-.9-2.3-.9-.2 0-.4-.2-.4-.4s.2-.4.4-.4c.1 0 1.7 0 2.9 1.1.8.7 1.1 1.8 1.1 3.1 0 .3-.1.4-.4.4zm1.4.5c-.2 0-.4-.2-.4-.4 0-1.7-.5-3.1-1.4-4-1.5-1.4-3.7-1.3-3.8-1.3-.2 0-.4-.1-.4-.4 0-.2.1-.4.4-.4.1 0 2.6-.1 4.3 1.5 1.1 1.1 1.7 2.6 1.7 4.5 0 .4-.1.5-.4.5z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-wh" class="input_app-wh" type="checkbox" name="select_apps" value="8" onchange="checkApps(this)">  <label for="app-wh" class="layout-buttons"><span>   <div data-name="whatsapp" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle>  <circle class="activated" fill="#1BD86D" cx="20.5" cy="20.5" r="60"></circle> <path d="M20.2 9C14.1 9 9.1 14 9.1 20.1c0 2.1.6 4 1.5 5.6l-1 3.8-.3 1-.3 1 5.9-1.6c1.6.8 3.3 1.3 5.2 1.3 6.1 0 11.1-5 11.1-11.1C31.3 14 26.4 9 20.2 9zm0 20.4c-1.6 0-3.1-.4-4.4-1.1l-.6-.3-.7.2-2.8.8.7-2.7.2-.7-.4-.7c-.8-1.4-1.3-3-1.3-4.7 0-5.1 4.2-9.3 9.3-9.3 5.1 0 9.3 4.2 9.3 9.3 0 5.1-4.1 9.2-9.3 9.2zm5.2-6.8c-.9-.4-1.7-.9-1.7-.9-.6-.4-1 .2-1 .2-.3.4-.7.8-.7.8-.6.6-1.2.1-1.2.1-2.4-1.4-3.2-2.9-3.2-2.9s-.5-.6.2-1.1c.7-.5.4-1.3.4-1.3l-.7-1.8c-.6-1.4-1.9-.4-1.9-.4-1.4.9-1.1 2.5-1.1 2.5.1.7.7 2 .7 2s.6 1.2 1.8 2.5l.8.8.3.3c.6.5.6.5.9.7 1.6 1.1 3.4 1.3 3.4 1.3 2.5.5 3.5-1.7 3.5-1.7.3-.8-.5-1.1-.5-1.1z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger"   tooltip-position='left'> 20&#8381; </div>  </div> </div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-sk" class="input_app-sk" type="checkbox" name="select_apps" value="6" onchange="checkApps(this)">  <label for="app-sk" class="layout-buttons"><span>   <div data-name="skype" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#5DC0FF" cx="20.5" cy="20.5" r="60"></circle> <path d="M31.05408 21.88594c.2-1.2.3-2.5.1-3.6-.9-5.4-6-9.3-11.5-8.5-.3.1-.6 0-.9-.1-2.3-1.2-5.1-.8-7 1-1.8 1.8-2.3 4.6-1.1 6.9.1.2.1.4.1.7-.1.6-.1 1.1-.1 1.7 0 .3 0 .7.1 1 .6 5.9 6 10 11.9 9.1.1 0 .4 0 .5.1 1.1.6 2.3.7 3.5.5 3.9-.7 6.1-4.7 4.5-8.4-.1-.1-.1-.2-.1-.4zm-7.4 4.8c-1.8.5-3.6.5-5.3 0-1.6-.5-2.8-1.5-3.3-3.1-.4-1.2.4-2 1.6-1.9.5.1.9.4 1.1.8.1.3.3.5.4.8.4.9 1.2 1.4 2.1 1.5.8.1 1.6 0 2.3-.3.3-.1.6-.3.7-.6.6-.7.4-1.6-.2-2.1-.7-.5-1.5-.7-2.3-.8-1.1-.2-2.3-.5-3.3-.9-1.1-.5-2-1.2-2.3-2.4-.4-1.5.1-2.6 1.2-3.6 1-.8 2.2-1.1 3.5-1.2h.9c1.2 0 2.3.1 3.4.7.8.4 1.5.9 1.8 1.8.2.4.3.9.1 1.3-.1.5-.5.9-1 1-.6.1-1.1 0-1.5-.5-.1-.2-.4-.5-.5-.8-.5-.8-1.2-1.3-2.2-1.3-.4 0-.9 0-1.3.1s-.7.3-1.1.5c-.5.5-.5 1.2.1 1.7.4.3.8.4 1.3.6 1.1.3 2.2.5 3.3.8.6.1 1.2.4 1.7.7 2.5 1.2 2.3 4.2 1 5.8-.5.6-1.3 1.1-2.2 1.4z" fill="#FFF"></path> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-messenger"   tooltip-position='left'> 20&#8381; </div>  </div></div></span></label>
                                    </div>
                                    <div class="divTableCell">
                                        <input id="app-tg" class="input_app-tg" type="checkbox" name="select_apps_off" value="11" onchange="checkApps(this)">  <label for="app-tg" class="layout-buttons"><span>   <div data-name="telegram" class="b2c-voice-collect__app_tg js-b2c-voice-collect-app"> <div class="b2c-voice-collect__app-icon_tg"><svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">   <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#64ADEB" cx="20.5" cy="20.5" r="60"></circle> <path d="M27.31287 13.03854c-.2 0-.5.1-.7.2-4.8 1.7-9.6 3.4-14.3 5-.6.2-1.2.5-1.3 1.3-.1.7.4 1.2.9 1.6.3.2.5.3.8.4 1.4.7 2.7 1.4 4.1 2 .7.3 1.2.8 1.5 1.5.8 1.6 1.6 3.3 2.4 4.9.3.6.8 1.2 1.6 1.1.8-.1 1.1-.7 1.3-1.4 1.7-4.7 3.3-9.5 5-14.2.1-.4.3-.7.2-1.1.1-.9-.6-1.5-1.5-1.3z" fill="#FCFDFD"></path> </svg>  <div class="b2c-voice-collect__app-price_tg" data-name="tg"   tooltip-position='left'>
                                            <svg width="35" height="15" viewBox="17 3 25 25" xmlns="http://www.w3.org/2000/svg">  <g xmlns="http://www.w3.org/2000/svg" transform=" scale(0.0045)" fill="red" stroke="none">
                                                <path d="M5961 6330 c-18 -4 -409 -386 -627 -612 -34 -35 -99 -100 -145 -145 -46 -45 -109 -108 -140 -140 -31 -32 -67 -68 -80 -80 -13 -11 -86 -83 -161 -160 -75 -76 -317 -318 -538 -538 l-400 -399 0 -413 c0 -402 1 -413 20 -425 11 -7 20 -16 20 -20 0 -3 90 -95 201 -205 111 -109 206 -203 213 -210 139 -143 190 -191 201 -187 7 3 12 -1 12 -9 -2 -18 131 -160 143 -152 6 3 7 -1 4 -9 -3 -9 -3 -16 1 -16 4 0 88 81 186 179 138 138 178 183 173 198 -5 14 -4 15 4 4 8 -11 26 1 86 60 42 41 74 80 71 87 -3 7 0 10 5 7 11 -7 97 71 89 80 -48 52 -563 565 -568 565 -4 0 -15 13 -24 30 -20 33 -14 54 22 80 12 8 21 19 21 25 0 6 13 19 30 28 18 11 27 23 23 32 -4 11 -1 13 13 8 13 -5 16 -3 11 10 -4 11 -1 17 8 17 20 0 52 33 47 48 -2 8 3 10 14 5 14 -5 16 -3 11 11 -4 10 -3 15 3 11 6 -3 13 0 16 8 3 8 15 17 26 20 11 3 17 10 13 16 -3 6 -1 11 4 11 16 0 51 33 51 47 0 7 7 13 15 13 9 0 12 6 8 17 -4 10 -2 14 5 9 14 -8 106 80 97 94 -3 6 1 7 10 4 11 -5 18 0 22 15 3 11 10 21 16 21 16 0 111 103 108 117 -1 8 4 10 14 7 11 -5 18 0 22 15 3 11 9 21 14 21 12 0 109 97 109 110 0 5 5 9 12 8 7 -2 17 7 23 20 5 12 13 22 16 22 12 0 149 137 149 149 0 6 4 11 10 11 15 0 50 42 43 53 -4 6 -1 7 6 2 13 -7 51 26 51 45 0 5 5 10 11 10 11 0 39 24 39 34 0 9 59 66 69 66 5 0 13 9 16 20 4 11 11 18 16 15 5 -4 9 1 9 9 0 9 4 16 10 16 5 0 25 17 45 38 75 79 89 92 97 92 5 0 6 5 3 10 -3 6 0 10 8 10 22 0 41 27 25 33 -9 4 -9 6 2 6 22 1 73 48 65 60 -4 7 0 8 10 5 11 -5 18 0 22 15 3 11 12 21 20 21 8 0 11 5 8 10 -3 6 -1 10 5 10 14 0 79 67 72 75 -3 3 0 5 6 5 5 0 17 2 24 5 9 4 72 -53 168 -149 84 -85 157 -153 162 -150 4 3 8 -1 8 -9 0 -7 14 -27 30 -43 17 -16 59 -58 93 -93 34 -35 73 -73 86 -85 14 -11 38 -35 53 -52 l29 -30 50 47 c36 34 48 51 43 65 -5 15 -4 16 4 4 9 -11 35 10 138 114 100 101 124 130 113 138 -11 8 -10 9 4 4 14 -5 47 21 133 107 63 63 114 120 114 128 -1 8 -19 28 -40 44 -21 17 -39 35 -40 42 0 6 -4 13 -10 15 -10 3 -141 129 -176 169 -11 13 -53 55 -92 92 -40 38 -72 70 -72 72 0 7 -145 145 -152 145 -5 0 -8 6 -8 13 0 8 -10 19 -23 26 -12 6 -31 25 -42 42 -11 16 -26 27 -33 24 -7 -3 -11 -1 -8 4 3 4 -9 22 -27 39 -17 16 -45 44 -60 61 l-29 31 -256 0 c-142 0 -319 2 -394 3 -75 1 -146 0 -157 -3z"/>
                                                <path d="M7719 4775 c-167 -168 -306 -308 -309 -311 -2 -2 135 -144 305 -314 l310 -310 -828 -827 -827 -828 -310 310 -310 310 -305 -305 c-168 -168 -305 -309 -305 -315 0 -6 183 -193 408 -418 l407 -407 420 0 420 0 1028 1028 1027 1028 0 425 0 424 -408 408 c-224 224 -410 407 -413 407 -3 0 -143 -137 -310 -305z"/>
                                                <path d="M5910 4285 l-415 -415 423 -422 422 -423 418 418 417 417 -420 420 c-231 231 -422 420 -425 420 -3 0 -192 -187 -420 -415z"/>
                                            </g> </svg>
                                        </div> </div> </div></span></label>
                                    </div>
                                </div>
                                <div class="divTableRow">
                                    <div class="divTableCell">
                                        <input id="app-yt" class="input_app-yt" type="checkbox" name="select_apps" value="9" onchange="checkApps(this)">  <label for="app-yt" class="layout-buttons"><span>   <div data-name="youtube" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="0 -5 40 40" xmlns="http://www.w3.org/2000/svg">  <g fill="none" fill-rule="evenodd"> <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#FE2E2E" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#path" cx="20.5" cy="20.5" r="60"></circle>  <path fill="#FFF" d="M31.452 16.773s-.216-1.577-.876-2.272c-.838-.912-1.777-.916-2.207-.97-3.084-.231-7.708-.231-7.708-.231h-.01s-4.625 0-7.708.232c-.431.053-1.37.057-2.208.969-.66.695-.875 2.272-.875 2.272s-.22 1.853-.22 3.705v1.736c0 1.853.22 3.705.22 3.705s.214 1.577.875 2.272c.838.912 1.94.884 2.43.979 1.762.176 7.49.23 7.49.23s4.63-.007 7.714-.239c.43-.054 1.37-.058 2.207-.97.66-.695.876-2.272.876-2.272s.22-1.852.22-3.705v-1.736c0-1.852-.22-3.705-.22-3.705z"></path> <path class="activated" fill="#FD2E2E" d="M18.38 24.319v-6.432l5.953 3.227z"></path> </g> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-media"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                </div>
                                <div class="divTableRow">
                                    <div class="divTableCell">

                                        <input id="app-sm" class="input_app-sm" type="checkbox" name="select_sms" value="10" onchange="checkApps(this)">  <label for="app-sm" class="layout-buttons"><span>  <div data-name="sms" class="b2c-voice-collect__app js-b2c-voice-collect-app b2c-voice-collect__app_active"> <div class="b2c-voice-collect__app-icon"> <svg width="35" height="40" viewBox="-3 -6 30 30" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" stroke="none" >  <circle class="enableflow" fill="#888888" cx="20.5" cy="20.5" r="60"></circle> <circle class="activated" fill="#8cd073" cx="20.5" cy="20.5" r="60"></circle> <path  d="M18,7c0.542,0,1,0.458,1,1v7c0,0.542-0.458,1-1,1h-8H9.171L9,16.171V16H7H6c-0.542,0-1-0.458-1-1V8c0-0.542,0.458-1,1-1H18    M18,5H6C4.35,5,3,6.35,3,8v7c0,1.65,1.35,3,3,3h1v3l3-3h8c1.65,0,3-1.35,3-3V8C21,6.35,19.65,5,18,5z"/> </svg>
                                        <div class="b2c-voice-collect__app-price" data-name="app-sms"   tooltip-position='left'> 20&#8381; </div> </div> </div></span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        </div>
                    <div class="divTableCell" >
                       <!-- <tr> <td nowrap><input id="app-all" class="input_app-all" type="checkbox" name="select_apps_all" value="0" onchange="checkApps(this)">  <label for="app-all" class="layout-buttons">Все БМП		</span></label>   </td></tr>-->
                               </div>
                    <div  id="tminute0" class="divTableCell"  >
                    </div>
                    <div id="tgbite0" class="divTableCell" >
                    </div>

                </div>
            </div>




        <fieldset class="switch" id="switch-radio" >
            <input type="radio" name="switch-2" id="switch-radio-off-2" class="switch-radio switch-radio-off" onchange="summaryOutput()">
            <label for="switch-radio-off-2" class="switch-label switch-label-off">
                Выкл.
                <span class="switch-slider"></span>
            </label>
            <input type="radio" checked name="switch-2" id="switch-radio-on-2" class="switch-radio switch-radio-on" onchange="summaryOutput()">
            <label for="switch-radio-on-2" class="switch-label switch-label-on">
                Вкл.
                <span class="switch-slider"></span>
            </label>
        </fieldset><label for="switch-radio">ToV HARD</label>`;

}

document.getElementById('legoyota').innerHTML=source;

document.addEventListener('DOMContentLoaded', function() {




    VisibleClearBody("clear");
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


    loadJSOND();

    customTemplates.passedElement.addEventListener('change', function(e) {
        document.getElementById('regions_callname2').innerText =e.detail.value;


        startInclude_MN();
    });

});
function VisibleClearBody(type) {
    var gchecks = document.querySelectorAll('input[type="radio"][name="radio_trafic"]');
    var mchecks = document.querySelectorAll('input[type="radio"][name="radio_minute"]');
    var appitems = document.querySelectorAll('input[type="checkbox"][name="select_apps"]');
    switch (type) {
        case "clear":
          /*  document.getElementById("switch-radio-off-2").checked = false;
            document.getElementById("switch-radio-on-2").checked = false;*/

            document.getElementById("legoyota").style.display = "none";

            document.getElementById("b_tafir_summary_input1").innerHTML = "";
            document.getElementById("b_tafir_summary_input").innerHTML = "";
            document.getElementById("tminute0").innerHTML = "";
            document.getElementById("tgbite0").innerHTML = "";
            document.getElementById("id-Тарифы[Тест]-СтоимостьвызововиSMS").nextElementSibling.innerHTML = "Выбери тариф и регион";
            document.getElementById("id-Тарифы[Тест]-Дополнительныеуслуги").nextElementSibling.innerHTML = "Выбери тариф и регион";
            gchecks.forEach(function(item, i, arr) {  if (gchecks[i].checked) gchecks[i].checked = false; });
            mchecks.forEach(function(item, i, arr) {  if (mchecks[i].checked) mchecks[i].checked = false; });
            appitems.forEach(function(item, i, arr) {  if (appitems[i].checked) appitems[i].checked = false; });

            break;
        case "lego":case "plaphone":case "tabt":
            VisibleClearBody("clear");

            document.getElementById("legoyota").style.display = "block";
            document.getElementById("tminute0").style.visibility = "visible";
            document.getElementById("tgbite0").style.visibility = "visible";

            break;

        default:

    }


}

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
    }

    function mOut(obj) {
    }

    function mDown(obj) {
    }

    function mUp(obj) {
    }


}





let log = document.getElementById('spans');



var selected_items = []; //id чекнутых бмп
var cur_mCount, cur_mPrice, cur_gCount, cur_gPrice; //Выбранные минуты,цена,трафик,цена

var outputSummary = document.getElementById("b_tafir_summary_input");  // элемент, куда отдается итоговый текст о тарифе


//TODO Отображение условий в домашнем регионе и нет
function VoiceTariffs() {
    var textVoiceSMS = document.getElementById("id-Тарифы[Тест]-СтоимостьвызововиSMS").nextElementSibling;
    var textUslugi = document.getElementById("id-Тарифы[Тест]-Дополнительныеуслуги").nextElementSibling;
    textVoiceSMS.innerHTML = ""; textUslugi.innerHTML = "";
    var node = document.createElement('p');
    var node2 = document.createElement('p');
    gcheck = document.querySelectorAll('input[type="radio"][name="radio_trafic"]:checked');        //Выбрано среди трафика
    mcheck = document.querySelectorAll('input[type="radio"][name="radio_minute"]:checked');        //Выбрано среди минут


    var price1 = "0";

    var texthtml = "";
    var texthtml2 = "";
    if (mcheck[0] !== undefined && gcheck[0] !== undefined) {
        var regions = jsondata.regions;
        regions.forEach(function(item, i, arr) {
            if (regions[i].id === cur_region_teriff.id) {

                texthtml = `<div class="table-wrap" style=""><table class="relative-table confluenceTable" style="width: 60%;"><colgroup><col style="width: 79.902%;"><col style="width: 20.098%;"></colgroup><tbody>`;
                texthtml2 = texthtml;
                 if (cur_mCount === "0") {
                     texthtml +=  `
                    <tr><td class="confluenceTd">Исходящие в домашний регион на других операторов: </td><td class="confluenceTd">${regions[i].pag_voice_inbound} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Исходящие в другой регион на других операторов: </td><td class="confluenceTd">${regions[i].pag_voice} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd">${regions[i].pag_voice_inbound} руб./шт.</td></tr> 
                    <tr><td class="confluenceTd">Входящие вызовы (в домашнем регионе): </td><td class="confluenceTd"> Бесплатные </td></tr>
                    <tr><td class="confluenceTd">Входящие вызовы (вне домашнего региона): </td><td class="confluenceTd">${regions[i].pag_voice} руб./мин.</td></tr>
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${regions[i].pag_sms} руб./шт.</td></tr>
                    <tr><td class="confluenceTd" colspan="2">При подключении «дополнительных 100 минут» звонки Yota-Yota становятся бесплатными и не расходуют пакет минут, вся тарификация - как при активном пакете </td> `;
                 } else {
                     texthtml +=  `
                    <tr><td class="confluenceTd">Стоимость минуты сверх пакета на всех операторов РФ: </td><td class="confluenceTd">${regions[i].min_over_pack} руб./мин.</td></tr> 
                    <tr><td class="confluenceTd">Вызовы на Yota по РФ: </td><td class="confluenceTd"> Не тарифицируются </td></tr> 
                    <tr><td class="confluenceTd">Входящие вызовы: </td><td class="confluenceTd"> Бесплатные </td></tr>
                    <tr><td class="confluenceTd">Исходящие SMS сообщения по РФ (без опции): </td><td class="confluenceTd">${regions[i].sms_over_pack} руб./шт.</td></tr> `;
                 }

                texthtml2 +=  `
                    <tr><td class="confluenceTd">Дополнительный пакет 100 минут: </td><td class="confluenceTd">${regions[i].voice_add_100} руб.</td></tr> 
                    <tr><td class="confluenceTd">Дополнительный пакет 5 Гб: </td><td class="confluenceTd"> ${regions[i].gb_add_5} руб.</td></tr> 
                    <tr><td class="confluenceTd">Пакет SMS: </td><td class="confluenceTd"> ${regions[i].sms_base} руб. </td></tr>
                    <tr><td class="confluenceTd" colspan="2"><b>Безлимитные приложения: <br></b>
                    Вконтакте, Одноклассники, Facebook, Instagram, Twitter: по ${cur_region_teriff.social} руб.<br>
                    Skype, Viber, Whatsapp: по ${cur_region_teriff.messenger} руб.<br>
                    Youtube: ${cur_region_teriff.youtube} руб.<br></td></tr>
                    <br><tr><td class="confluenceTd" colspan="2"><b>Доставка: <br></b>
                    ${regions[i].dostavka}<br></td></tr> `;
//
                texthtml +=   `</tbody></table></div>`;
                texthtml2 +=   `</tbody></table></div>`;


            }
        });
    }
    node.innerHTML = texthtml;
    textVoiceSMS.appendChild(node);
    node2.innerHTML = texthtml2;
    textUslugi.appendChild(node2);


}


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
    var  appall = document.querySelector('input[type="checkbox"][name="select_apps_all"][value="0"]'); 		//галочка "все"
    if (appcheck.length===0)  selected_items = [];

    VoiceTariffs();

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
        else if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 0) { text += `${unlimpapps}, без дополнительного трафика.`; }
        else if (cur_mCount === "0" && cur_gCount === "0" && selected_items.length > 0 && smscheck.length === 1) { text += `${unlimpapps}, без дополнительного трафика, а также безлимитные SMS.`; }
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
        text += ", при этом будут безлимитные ";
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



//Функция заполнения при выборе региона
var cur_region_teriff = {};
function startInclude_MN() {

    if(input_MN.value.length > 0)	{

        VisibleClearBody("plaphone");
        var regions = jsondata.elements;

            regions.forEach(function (item, i, arr) {
                if (regions[i].name === "plaphone") {
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
                        }
                    });


                }
            });


    }


}

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
    {ids: 1,name: "ВК", 				group: "social", 		price: 20, 		altname: "-"},
    {ids: 2,name: "Одноклассники", 	group: "social", 		price: 20, 		altname: "Одноклассникам"},
    {ids: 3,name: "Facebook", 			group: "social", 		price: 20, 		altname: "-"},
    {ids: 4,name: "Instagram", 		group: "social", 		price: 20, 		altname: "-"},
    {ids: 5,name: "Twitter", 			group: "social", 		price: 10, 		altname: "-"},
    {ids: 6,name: "Skype", 			group: "messenger", 	price: 10, 		altname: "-"},
    {ids: 7,name: "Viber", 			group: "messenger", 	price: 10, 		altname: "-"},
    {ids: 8,name: "Whatsapp", 			group: "messenger", 	price: 10, 		altname: "-"},
    {ids: 9,name: "Youtube", 			group: "youtube", 		price: 60, 		altname: "-"},
    {ids: 10,name: "Безлимитные SMS", 	group: "sms", 		    price: 50, 		altname: "-"},
    {ids: 11,name: "Telegram", 			group: "deleted", 	    price: 0, 		altname: "-"}
];






document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        //fn();
    }
};



