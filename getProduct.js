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