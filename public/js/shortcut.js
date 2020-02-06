function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

document.onkeyup = function(e) {
  // char key code: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  var os = getOS()
  console.log("OS:", os);

  // mac shortcut using Ctrl, other operating system using Alt
  if (os == 'Mac'){
    if (e.ctrlKey && e.which == 78) {
        window.location.href = "/note/create";
      } else if (e.altKey && e.which == 78) {
        window.open("/note/create");
      } else if (e.ctrlKey && e.which == 72) {
        window.location.href = "/notes";
      } else if (e.ctrlKey && e.which == 65) {
        window.location.href = "/notes/all";
      } else if (e.ctrlKey && e.which == 67) {
        window.location.href = "/notes/archive";
      }
  }else{
    if (e.altKey && e.which == 78) {
        window.location.href = "/note/create";
      } else if (e.altKey && e.which == 72) {
        window.location.href = "/notes";
      } else if (e.altKey && e.which == 65) {
        window.location.href = "/notes/all";
      } else if (e.altKey && e.which == 67) {
        window.location.href = "/notes/archive";
      }
  }

};
