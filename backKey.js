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

//=======================================================================================


//==========================================Tycoon function===================================

/*==========================================
 
 Start function from AP Tycoon
 
 ===========================================*/

function generalTycoon(){
     Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This function used to Opens the Do you want to exit the game confirmation screen" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    ni.Back();;
    Sleep(sleepTime);
    screenShotPHD();
    try{
        Log('trying to find plh_two_buttons');
        gui.WaitForScreen(['plh_two_buttons'],[],5000);
        Sleep(1000);
        gui.update();
    }
    catch(err){
        Log('screen plh_two_buttons doesn\'t found');
    }
    try{
        Log('trying to find plh_one_buttons');
        gui.update();
        gui.WaitForScreen(['plh_one_buttons'],[],5000);
        Sleep(1000);
        gui.update();
    }catch(err){
        Log('screen plh_one_buttons doesn\'t found');
    }
    if(jo2.specific('plh_two_buttons') != undefined){
        Log('Home Key Success');
        xlsDocument.Write('A' + row, '-');
        xlsDocument.Write('B' + row, 'Test for Open exit game confirmation using Back Key');
        xlsDocument.Write('C' + row, 'PASSED', colourGreen);
        xlsDocument.Write('D' + row, 'See the screenshot for details');
        row++;
    }else{
        Log('Home Key Failed');
        xlsDocument.Write('A' + row, '-');
        xlsDocument.Write('B' + row, 'Test for Open exit game confirmation using Back Key');
        xlsDocument.Write('C' + row, 'FAILED', colourRed);
        xlsDocument.Write('D' + row, 'Error');
        row++;
    }
    //jo2.regularTap('btn_no'); due to changing behavior and makes GP bug
    try{
        Sleep(sleepTime);
        jo2.regularTap('btn_no');
        Sleep(sleepTime);
    }catch(err){
        Sleep(sleepTime);
        Log('btn_no doesnt detected, tryting to using Native Interaction mode');
        Sleep(sleepTime);
        Sleep(sleepTime);
        ni.Back();
    }
    Sleep(1000);
    Log('function done');
}

function settingsSub(){
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This function used to Back to the Settings previous level menu" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    Log('go to settings from AP Tycoon');
    Sleep(sleepTime);
    jo2.regularTap('btn_settings');
    Log('go to language screen');
    jo2.regularTap('btn_language');
    Log('Using Back key and result will be export as screenshot');
    ni.Back();
    Sleep(sleepTime);
    screenShotPHD();
    Sleep(sleepTime);
    jo2.regularTap('btn_settings');
    Log('go to reset screen');
    Sleep(sleepTime)
    jo2.regularTap('btn_reset');
    Log('Using Back key and result will be export as screenshot');
    ni.Back();
    Sleep(sleepTime);
    screenShotPHD();
    Log('go to Help screen');
    jo2.regularTap('btn_help');
    Log('Using Back key and result will be export as screenshot');
    ni.Back();
    Sleep(sleepTime);
    screenShotPHD();
    Sleep(sleepTime);
    jo2.regularTap('btn_settings');
    Log('go to About screen');
    jo2.regularTap('btn_about');
    Log('Using Back key and result will be export as screenshot');
    ni.Back();
    Sleep(sleepTime);
    screenShotPHD();
    // jo2.regularTap('btn_close');
    Sleep(1000);
    Log('function done');
}

function gameLoop(){
     Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This function used to Closes the screen Star button and goes back to AP Tycoon" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    Log('go to Star section by pressing star button in tycoon');
    Sleep(sleepTime);
    jo2.regularTap('btn_stars');
    Log('Using Back key and result will be export as screenshot');
    ni.Back();;
    Sleep(sleepTime);
    screenShotPHD();
    Log('function done');
}

//==========================================Puzzle function Match 3===================================

/*==========================================
 
 Start function from AP Tycoon
 
 ===========================================*/

function tutorL2(){
    Log('Tutorial Level 2 Puzzle ')
    ////screenShotPHD(lang)
    
    phd.tapScreen(0.72, 0.474)
    phd.tapScreen(0.72, 0.411)
    
//     phd.tapScreen(0.603, 0.474)
//     phd.tapScreen(0.603, 0.4)
    ////screenShotPHD(lang)
    Sleep(sleepTime)
//     phd.multiTap(0.603, 0.4, 2)
    phd.multiTap(0.72, 0.411, 2)
    Sleep(sleepTime)
    ////screenShotPHD(lang)
    phd.tapScreen(0.28, 0.6)
    phd.tapScreen(0.28, 0.54)
    Sleep(sleepTime)
    ////screenShotPHD(lang)
    phd.tapScreen(0.28, 0.54)
    phd.tapScreen(0.4, 0.54)
    Sleep(sleepTime)
    phd.tapScreen(0.4, 0.54)
    Sleep(sleepTime)
}

function soundMusicPuzzle(){
    Log('using soundMusicPuzzle function, please wait . . . ');
    Sleep(3000);
    var soundButton2 = ["btn_music","btn_sfx","btn_music","btn_sfx"];
    Log('This function used to Allows the user to adjust music & sound volumes in the game or mute them if clicked in the left icon. ');
    Sleep(3000);
    jo2.regularTap('btn_match3_settings');
    Log('checking sound button ');
    gui.update();
    Sleep(3000);
    for(i=0;i<soundButton2.length;i++){
            Sleep(2000);
            //if(gui.findChildren(soundButton2[i], true, gui.findChildren("match3_settings.bgin")[0])[0] == null){
            if(gui.findChildren(soundButton2[i], true, gui.findChildren("mid_seq")[0])[0] == null){
                Sleep(2000)
                Log("Button is Missing");
                Sleep(2000);
                Log("Result is Failed");
                xlsDocument.Write('A' + row, '-');
                xlsDocument.Write('B' + row, 'Checking Button music Puzzle');
                xlsDocument.Write('C' + row, 'FAILED', colourRed);
                xlsDocument.Write('D' + row, + soundButton2[i]);
                row++;
            }else{
                Log("Triggering Button");
                Sleep(2000);
                gui.tapItem(gui.findChildren(soundButton2[i], true, gui.findChildren("mid_seq")[0])[0]);
                Sleep(2000)
                Log("Button found");
                Sleep(2000)
                Log("Button Passed");
                xlsDocument.Write('A' + row, '-');
                xlsDocument.Write('B' + row, 'Checking Button music Puzzle');
                xlsDocument.Write('C' + row, 'PASSED', colourGreen);
                xlsDocument.Write('D' + row, '-');
                row++;
            }
        }
    //jo2.regularTap('btn_close_matchsetting');
    try{
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
        if(gui.findChildren('btn_close_matchsetting', true)[0] != undefined){
            Log('btn_close_matchsetting  appear normally ');
            gui.update();
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'Test for Open exit game confirmation using Back Key');
            xlsDocument.Write('C' + row, 'PASSED', colourGreen);
            xlsDocument.Write('D' + row, 'See the screenshot for details');
            row++;
        }else{
            Log('btn_close_matchsetting doesnt appear or undetected in the screen');
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'Test for Open exit game confirmation using Back Key');
            xlsDocument.Write('C' + row, 'WARNING');
            xlsDocument.Write('D' + row, 'btn_close_matchsetting doesnt appear or undetected in the screen, using new behavior by tapping resume button');
            row++;
        }
        jo2.regularTap('btn_close_matchsetting'); //perform tab in action
    }catch(err){
       Sleep(sleepTime);
       Log('btn_close_matchsetting doesnt detected, tryting to using new behavior of AUT');
       Sleep(sleepTime);
       Log('choosing button resume');
       jo2.regularTap('btn_resume');
       Sleep(sleepTime)
    }
    Log('Sound music puzzle done');
}

function matchPuzzle(){
     Log('This function used to reach AP Puzzle lv 2 and clear the tutorial e SIMBAH GOKZ');
    Sleep(2000);
    jo2.regularTap('btn_play','play puzzle mission');
    jo2.regularTap('btn_ok_start','play start to play');
//     gui.WaitForScreen(['match3_bg.bgin', 'match3_vertical_hud.bgin', 'overlay_effects.bgin'])
    gui.WaitForScreen(['mv_match3bg', 'btn_match3_settings', 'aux_overlay']);
    gui.update();
    Sleep(sleepTime);
    tutorL2();
    Log('Using Back key and result will be export as screenshot');
    ni.Back();;
    Sleep(sleepTime);
    screenShotPHD();
    ni.Back();
    Sleep(sleepTime);
    screenShotPHD();
    Sleep(sleepTime);
    Log('Reach to Reward screen');
    soundMusicPuzzle();
    EndMission(1);
    Sleep(5000);
    ni.Back();
    screenShotPHD();
    jo2.regularTap('txt_tapToContinue');
//     try{gui.WaitForScreen(['results'])}catch(err){}
    Sleep(sleepTime);
//     try{
//         gui.WaitForScreen(['match3_bg.bgin']);
//         Log('task and journal appear');
//         Sleep(sleepTime);
//         gui.update();
//         Sleep(sleepTime);
//         jo2.regularTap('btn_close_task');
//     }
//     catch(err){
//         Log('screen doesn\'t found');
//     }
    try{
        Log('detecting daily bonus screen,please wait...');
        gui.WaitForScreen(['daily_bonus']);
        Log('Daily Bonus appears');
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
        jo2.regularTap('btn_claim');
    }
    catch(err){
        Log('screen doesn\'t found');
    }
    
    Log('Match Puzzle done');
}

//==========================================Tycoon Menu=================================

function aboutSection(){
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This function used to checking ABOUT Section function in INFO Screen of tycoon" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    Log('go to about section');
    Sleep(sleepTime);
    jo2.regularTap('btn_about');
   try{
        if (jo2.getText('lbl_settings') == '$STR_ABOUT'){
            Sleep(5000);
            gui.update();
            Log('about screen found!!');
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'About section screen');
            xlsDocument.Write('C' + row, 'PASSED', colourGreen);
            xlsDocument.Write('D' + row, 'See the screenshot for details');
            row++;
        }else{
            Log('Screen about doesn\'t appear');
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'About section screen');
            xlsDocument.Write('C' + row, 'FAILED', colourRed);
            xlsDocument.Write('D' + row, 'Error');
            row++;
    }
    screenShotPHD();
    }
    catch(err){
        gui.update();
        Log('screen doesn\'t found');
    }
//     if(jo2.specific('about.bgin') != undefined){
//                 Log('Screen about appear');
//                 xlsDocument.Write('A' + row, '-');
//                 xlsDocument.Write('B' + row, 'About section screen');
//                 xlsDocument.Write('C' + row, 'PASSED', colourGreen);
//                 xlsDocument.Write('D' + row, 'See the screenshot for details');
//                 row++;
//             }else{
//                 Log('Screen about doesn\'t appear');
//                 xlsDocument.Write('A' + row, '-');
//                 xlsDocument.Write('B' + row, 'About section screen');
//                 xlsDocument.Write('C' + row, 'FAILED', colourRed);
//                 xlsDocument.Write('D' + row, 'Error');
//                 row++;
//             }
    Log('Back to settings screen â™ ');
    Sleep(sleepTime);
    //jo2.regularTap('btn_close_about');
    try{
        Log('trying to tap close button, please wait . . . ');
        Sleep(sleepTime);
        if(gui.findChildren('btn_close_about', true)[0] != undefined){
            Log('btn_close_about appear and available to access');
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'Tap successed due to button close about appear.');
            xlsDocument.Write('C' + row, 'PASSED', colourGreen);
            xlsDocument.Write('D' + row, 'no need Native interaction for bypass it');
            row++;
        }else{
            Log('btn_close_about doesnt appear on undetected');
            xlsDocument.Write('A' + row, '-');
            xlsDocument.Write('B' + row, 'Could not tap or find btn close on about section');
            xlsDocument.Write('C' + row, 'WARNING');
            xlsDocument.Write('D' + row, 'using native interaction for bypass it');
            row++;
        }
        jo2.regularTap('btn_close_about');
        Sleep(sleepTime);
    }catch(err){
        Log('button close as btn_close_about doesnt found');
        Sleep(sleepTime);
        Log('Using NI for bypass button close on about section');
        ni.Back();
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
    }
    Log('Function done !!');
}

function audioOption(){
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This JS function used to checking Audio Volume Options function" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    var soundButton = ["btn_music","btn_sfx","btn_music","btn_sfx"];
    var notifButton = ["btn_notifications","btn_notifications"];
//     Log("Swipe the BGM from max to mid");
//     Sleep(2000);
//     phd.tapScreen(0.60, 0.20);
// //     Tap(display.displayWidth * 0.60, display.displayHeight * 0.15,1, 'true');
//     Sleep(2000);
//     Log("Swipe the BGM from mid to max");
//     Sleep(2000);
//     phd.tapScreen(0.80, 0.15);
// //     Tap(display.displayWidth * 0.80, display.displayHeight * 0.15,1, 'true');
//     Sleep(2000);
//     Log("Swipe the Volume SFX from max to mid");
//     Sleep(2000);
//     phd.tapScreen(0.60, 0.25);
// //     Tap(display.displayWidth * 0.60, display.displayHeight * 0.25,1, 'true');
//     Sleep(2000);
//     Log("Swipe the Volume SFX from mid to max");
//     Sleep(2000);
//     phd.tapScreen(0.80, 0.25);
// //     Tap(display.displayWidth * 0.80, display.displayHeight * 0.25,1, 'true');
//     Sleep(2000);
//     Log("Swipe function done");
//     Sleep(2000);
    Log("Trying to on/off button Music");
    gui.update();
    Sleep(2000);
    for(i=0;i<soundButton.length;i++){
            Sleep(2000);
            if(gui.findChildren(soundButton[i], true, gui.findChildren("page_settings")[0])[0] == null){
                Sleep(2000)
                Log("Button is Missing");
                Sleep(2000);
                Log("Result is Failed");
                xlsDocument.Write('A' + row, '-');
                xlsDocument.Write('B' + row, 'Checking Button music');
                xlsDocument.Write('C' + row, 'FAILED', colourRed);
                xlsDocument.Write('D' + row, '-');
                row++;
            }else{
                Log("Triggering Button");
                Sleep(2000);
                gui.tapItem(gui.findChildren(soundButton[i], true, gui.findChildren("page_settings")[0])[0]);
                Sleep(2000)
                Log("Button found");
                Sleep(2000)
                Log("Button Passed");
                 xlsDocument.Write('A' + row, '-');
                xlsDocument.Write('B' + row, 'Checking Button music');
                xlsDocument.Write('C' + row, 'PASSED', colourGreen);
                xlsDocument.Write('D' + row, soundButton[i]);
                row++;
            }
        }
    Sleep(2000);
    gui.update();
    Log("Triggering sound button script done");
    Sleep(2000);
}

function languageChecking(){
   var language = ['en', 'fr', 'es', 'it', 'de', 'pt_br', 'es_419', 'ru', 'tr', 'vi', 'pl', 'ar', 'id', 'th'];
    for(i=0;i<14;i++){
        if(i == 0){
//             jo2.regularTap('btn_language');
            jo2.regularTap('btn_' + language[1]);
        }
//         jo2.regularTap('btn_language');
        jo2.regularTap('btn_' + language[i]);
        //screenShotPHD(language[i]);
    }
//     jo2.regularTap('btn_language');
    jo2.regularTap('btn_' + language[0]);
    Log('language checking done');
}

// function languageChecking(){
//     var lang = ['English', 'France', 'Spain', 'Italy', 'Deutch', 'Brazil', 'ES Latam', 'Russia', 'Turkey', 'Thailand', 'Vietnam', 'Poland', 'Saudi Arabia', 'Indon'];
//     for(i=0;i<14;i++){
//         if(i == 0){
//             jo2.regularTap('btn_language');
//             jo2.regularTap('btn_language1');
//         }
//         jo2.regularTap('btn_language');
//         //screenShotPHD(lang[i]);
//         jo2.regularTap('btn_language' + i, lang[i]);
//         //screenShotPHD(lang[i]);
//     }
//     jo2.regularTap('btn_language');
//     jo2.regularTap('btn_language0');
//     Log('language checking done');
// }

function resetByPop3(){
    while(gui.findChildren('plh_two_buttons', true)[0] != undefined){
        Log('continue to reset progress by hard reset â™ ');
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
        jo2.regularTap('btn_yes');
        gui.update();
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
        gui.update();
    }
    Sleep(sleepTime);
    gui.update();
    //gui.WaitForScreen(['coppa.bgin']);
    try{
        Sleep(sleepTime);
        gui.update();
        Sleep(sleepTime);
        gui.WaitForScreen(['chapter_photo.bgin']);
    }catch(err){
        Sleep(sleepTime);
        Log('chapter_photo.bgin doesnt detected');
        Sleep(sleepTime);
    }
    Sleep(sleepTime);
    if(jo2.specific('sequence_quit') != undefined){
        Log('Hard reset succeed');
        xlsDocument.Write('A' + row, '-');
        xlsDocument.Write('B' + row, 'Test Case 45');
        xlsDocument.Write('C' + row, 'PASSED', colourGreen);
        xlsDocument.Write('D' + row, 'See the screenshot for details');
    }else{
        Log('screen doesn\'t found');
        Log('Hard reset Failed');
        xlsDocument.Write('A' + row, '-');
        xlsDocument.Write('B' + row, 'Test Case 45');
        xlsDocument.Write('C' + row, 'FAILED', colourRed);
        xlsDocument.Write('D' + row, 'Hard reset Failed');
    }
    row++;
    Log('checking reset progress â™ ');
    Sleep(sleepTime);
    gui.update();
    Sleep(sleepTime);
    gui.update();
    Log('reset done â™ ');
    Sleep(sleepTime);
}

function resetProgress(){
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This function used to checking 3 times Pop-up of Hard reset button from settings of AP Tyconn" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "Make sure user already on level 3 AP puzzle" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(sleepTime);
    jo2.regularTap('btn_settings');
    jo2.regularTap('btn_reset');
    Log('triggering reset game pop-up');
    Sleep(sleepTime);
    resetByPop3();
}



function tycoonMenu(){
    Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "This JS function used to checking Tycoon Menus from AP Tycoon" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
    Sleep(3000);
     if (jo2.specific('btn_pay0') != undefined){
            jo2.regularTap('btn_close_task')
            gui.update()
        }else{
            Log('tycoon task screen doesnt appears');
            Sleep(1500);
        }
    Log('go to about section');
    Sleep(sleepTime);
    jo2.regularTap('btn_settings');
    aboutSection();
    jo2.regularTap('btn_settings');
    audioOption();
    jo2.regularTap('btn_language')
    languageChecking();
    Log('Back to AP Tycoon');
    try{
        jo2.regularTap('btn_close_setting');
    }
    catch(err){
        Log('tapping btn_close due to changing behavior')
        jo2.regularTap('btn_close');
    }
    
    Log('Scripts for In Game Menus done');
}
//=======================================Run=========================================


function backKeyrun(){
    Log('Back Key run start!!');
    firstTutorials();
    generalTycoon();
    settingsSub();
    gameLoop();
    matchPuzzle();
    tycoonMenu();
    resetProgress();
    Log('backKeyrun stop, VAGRANT was here!!!!');
}


//===============================end of global function===========================================


ChangeLanguage("EN"); 
backKeyrun();


mkdir("LoveBoatReports");
mkdir('LoveBoatReports/' + folderS);
Sleep(1000);
Log ("\n\n" + 
         "_____________________________________________________________________________________________" + 
         "\n\n" +
         "Script stop and xls file created on folder LoveBoatReports,Vagrant was here tod!!" +
         "\n" +
         "_____________________________________________________________________________________________" +
         "\n");
xlsDocument.SaveAs("LoveBoatReports/" + folderS + "/4.BackKeyMenuControl.xls");

//========================================end of code==============================================



