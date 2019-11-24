var includes = [
   'ni.js',
   '../../globalIncludes/allAboutButton.js',
   '../includesPCR/pcr_game.js',
   '../../globalIncludes/simpleTapAndSwipe.js',
   '../includesPCR/global_function.js'
]
   
for (i in includes)
{
   Include(includes[i])
}


/*
   ______ ____   ____   ______        _    __ ___    ______ ____   ___     _   __ ______
  / ____// __ \ / __ \ / ____/  _    | |  / //   |  / ____// __ \ /   |   / | / //_  __/
 / /    / / / // / / // __/    (_)   | | / // /| | / / __ / /_/ // /| |  /  |/ /  / /   
/ /___ / /_/ // /_/ // /___   _      | |/ // ___ |/ /_/ // _, _// ___ | / /|  /  / /    
\____/ \____//_____//_____/  (_)     |___//_/  |_|\____//_/ |_|/_/  |_|/_/ |_/  /_/     
                                                                                        
*/

//===============================Global Variabel Starts here======================================

var jo2 = new Tapping();
var phd = new Touching();
var deviceIP = GetValue2('IPAddress').value;
var ni = new NI(deviceIP);
var sleepTime = 5000;
var xlsDocument = new XlsDocument();
var age = '20';
//var phdReportXLS = 'LoveBoatReports/3_MenuOperationDevicei9500.xls' ;
var getDevice = GetValue2('GeneralInfo').value; 
var folderS = getDevice.deviceModel;

//-----------------creating xls document for report------------------------------------------

var row = 2;
var colourRed = {
                color:{r:0, g: 0, b:0, a: 0}, 
                font:{family:"Calibri", pointSize: 11, weight: 1, italic:false},
                backgroundColor:{r:252, g: 2, b:2, a: 0}
            };

var colourGreen = {
                color:{r:0, g: 0, b:0, a: 0}, 
                font:{family:"Calibri", pointSize: 11, weight: 1, italic:false},
                backgroundColor:{r:81, g: 252, b:2, a: 0}
            };
var xlsDocument = new XlsDocument();
xlsDocument.Write('A1','COVERING AREA');
xlsDocument.Write('A' + row, 'Rule Number');
xlsDocument.Write('B' + row, 'Test Case');
xlsDocument.Write('C' + row, 'Result');
xlsDocument.Write('D' + row, 'Note');
row++;

//===============================Global function Starts here======================================

function screenShotPHD(bahasa){
    mkdir("ScreenshotPHD");
    mkdir("ScreenshotPHD/"+folderS)
    Log('Capturing Picture in progress . . . ');
    Sleep(sleepTime);
    var tanggal = new Date();
    var getItem = GetValue2('GeneralInfo').value; 
    var nama = tanggal.getFullYear() + '-'
        nama += ("0" + (tanggal.getMonth() + 1)).slice(-2) + '-'
        nama += ("0" + tanggal.getDate()).slice(-2) + '-'
        nama += ("0" + tanggal.getHours()).slice(-2) + '-'
        nama += ("0" + tanggal.getMinutes()).slice(-2) + '-'
        nama += ("0" + tanggal.getSeconds()).slice(-2) + '-'
        //==================JO2 PHD TEAM========================
        nama += getItem["deviceModel"]
        //==================JO2 PHD TEAM========================
        nama += ' '
        if(bahasa != undefined){
            nama += bahasa
        }
        nama += '.png';
        ni.Screenshot('ScreenshotPHD/'+folderS+"/"+ nama);
        Log('Screen Captured !!!!');
}

//====

//=========================Main Global Function===========================================

function firstTutorials()
{
     if(gui.findChildren('nvs_popup', true)[0] != undefined){
        Sleep(sleepTime)
        jo2.regularTap('btn_no', 'Decline NVS')
    }
    Sleep(2000);
    closeDataConflict();
    Sleep(sleepTime)
    gui.update()
    try
    {
        //while(jo2.specific('popups.bgin') != undefined)
        while(jo2.specific('auxMale') != undefined)
        {
          Sleep(sleepTime)
          var checks = jo2.checkVisible('AcceptBtn_cont');
          Log(checks)
          if (checks === true)
          {
             jo2.regularTap('ageBtn')
             ni.Write('EditText', age)
             Sleep(sleepTime)
             gui.update()
             jo2.regularTap('maleBtn')
             jo2.childTap('AcceptBtn_cont', 'aux_overlay', 'Accept');   
             break;
          }
        }
        
    }
    catch(err)
    {
        Log('There is no Age Screen Appear, script continue');
    }
    
    // try
    // {
    //     gui.WaitForScreen(['popups.bgin'])
    //     while(jo2.specific('popups.bgin') != undefined)
    //     {
    //       Sleep(sleepTime)
    //       jo2.childTap('btn_ok_popup', 'plh_one_button', 'OK')
    //     }
        
    // }
    // catch(err)
    // {
    //     Log('There is no Pop_up appear, script continue');
    // }
    
    closeDataConflict();
  
   if(gui.findChildren('popups_template.bgin', true)[0] != undefined)
    {
        Sleep(sleepTime)
        jo2.regularTap('btn_no', 'Decline NVS')
    }

    jo2.regularTap('closeBtn', 'Continue')
    gui.update();
    Sleep(sleepTime)
    jo2.regularTap('btn_skip', 'Skip')
    Sleep(sleepTime)
    tutorL1()
    finishAP()
    jo2.waitTap('btn_quests')
    jo2.regularTap('btn_pay0')
    try {gui.waitAndTap("btn_skip")}catch(err) {
        Log("There is no Skip button, script continue");
//         skipDialog()
//         gui.WaitForScreen(['dialog.bgin'])
//         skipDialog()
    }
    Sleep(sleepTime)
    typeName()
    Sleep(sleepTime)
    Log('Script for key sensitive done');
}

function tutorL1()
{
    Sleep(sleepTime)
    Log('Tutorial Level 1 Puzzle ')
    phd.tapScreen(0.815, 0.4345)
    phd.tapScreen( 0.738, 0.4345)
    Sleep(sleepTime)
    phd.tapScreen( 0.50, 0.685)
    phd.tapScreen( 0.50, 0.6)
    Sleep(sleepTime)
    phd.tapScreen( 0.50, 0.50)
//     Log('Using Cheat Win')
//     Event('EndMission', 1)
    Sleep(20000)
}

function typeName()
{
    var nickName = 'PCR';
    Log('Entering name for Visitors Book')
    Sleep(sleepTime)
    jo2.regularTap('nameBtn')
    Log('Please wait, name will input automatically')
    ni.Write('EditText', nickName)
//     Log('Please fill your name manually')
//     Sleep(sleepTime)
//     Log('Enter when your done filling it, DON\'T TAP ACCEPT BUTTON')
    Sleep(10000)
    jo2.waitTap('AcceptBtn')
    try {gui.waitAndTap("btn_skip")}catch(err) {
        Log("There is no Skip button, script continue");
        skipDialog()
    }
    gui.update()
}

function finishAP()
{
    Log('Using Cheat Win')
    EndMission(1)
    Sleep(30000)
    gui.update()
    try{gui.WaitForScreen(['results'])}catch(err){}
    Sleep(sleepTime)
    while (jo2.specific('results') != undefined)
    {
        try
        {
            jo2.regularTap('txt_tapToContinue', 'Tap to claim')
        }
        catch(err)
        {
            phd.tapScreen(0.5, 0.5)
        }
    }
    gui.update()
    Sleep(5000)
    gui.update()
    while (jo2.specific('tycoon_tasks.bgin') != undefined)
    {
        gui.update()
        jo2.regularTap('btn_close_task')
        gui.update()
    }
}

//==========================================================================