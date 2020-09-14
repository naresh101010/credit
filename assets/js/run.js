document.write("<link rel='preload' as='script' crossorigin='anonymous' href="+  location.origin + '/assets/js/single-spa.min.js' + "><\/link>");
document.write("<script type='systemjs-importmap' src="+  location.origin + '/app_path.json' + "><\/script>"); 

//store api endpoints         
sessionStorage.setItem('config', JSON.stringify(data))



// create favi_icon
var link = document.createElement('link');
link.rel = 'icon';
link.href = location.origin + '/favicon.png';
document.head.appendChild(link);





// global css
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = location.origin + '/assets/css/global.css';
document.head.appendChild(link);



//single spa all library imported in one file to reduce http calls
/* 
    <script src="https://unpkg.com/core-js-bundle@3.1.4/minified.js"></script>
    <script src="https://unpkg.com/zone.js"></script>
    <script src="https://unpkg.com/import-map-overrides@1.6.0/dist/import-map-overrides.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/system.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/amd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/named-exports.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/named-register.min.js"></script> 
*/



var script   = document.createElement("script");
script.type  = "text/javascript";                
document.body.appendChild(script);

  document.write("<script type='text/javascript' src="+ location.origin  + '/minified.js.js' + "><\/script>");
   document.write("<script type='text/javascript' src="+ location.origin  + '/zone.umd.js' + "><\/script>");
  document.write("<script type='text/javascript' src="+ location.origin  + '/import-map-overrides.js' + "><\/script>");
   document.write("<script type='text/javascript' src="+ location.origin  + '/system.min.js' + "><\/script>");
  document.write("<script type='text/javascript' src="+ location.origin  + '/amd.min.js.js' + "><\/script>");
document.write("<script type='text/javascript' src="+ location.origin  + '/named-exports.js' + "><\/script>");
document.write("<script type='text/javascript' src="+ location.origin  + '/named-register.min.js' + "><\/script>");
 document.write("<script type='text/javascript' src="+ location.origin  + '/router.js' + "><\/script>");


//  document.write("<script type='text/javascript' src='https://unpkg.com/core-js-bundle@3.1.4/minified.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://unpkg.com/zone.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://unpkg.com/import-map-overrides@1.6.0/dist/import-map-overrides.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/system.min.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/amd.min.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/named-exports.js'><\/script>");
//  document.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.0.0/extras/named-register.min.js'><\/script>");
//  document.write("<script type='text/javascript' src="+ location.origin  + '/router.js' + "><\/script>");





// const cipher = salt => {
//     const textToChars = text => text.split('').map(c => c.charCodeAt(0));
//     const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
//     const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

//     return text => text.split('')
//         .map(textToChars)
//         .map(applySaltToChar)
//         .map(byteHex)
//         .join('');
// }
// const myCipher = cipher('dadwqeqadadqeqwe123ewq12132ew')
// let str = JSON.stringify(data)
// sessionStorage.setItem('config',  myCipher(str))