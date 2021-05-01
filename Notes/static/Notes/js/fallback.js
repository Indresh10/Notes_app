const openfile = document.getElementById("fileopen");
const download = document.getElementById("downloader");
let str = "";
exts.forEach((element) => {
  str += Object.values(element)[0] + ",";
});
openfile.accept = str;
function openFileLegacy() {
  return new Promise((resolve, reject) => {
    openfile.onchange = (e) => {
      const file = openfile.files[0];
      if (file) {
        resolve(file);
        return;
      }
      reject(new Error("Abort Error"));
    };
    openfile.click();
  });
}

function getExt(type) {
  switch (type) {
    case "Text":
      return 0;
    case "C":
      return 1;
    case "C++":
      return 2;
    case "Python":
      return 3;
    case "Java":
      return 4;
    case "Html":
      return 5;
    case "Css":
      return 6;
    case "JavaScript":
      return 7;
    case "Markdown":
      return 8;
    case "PHP":
      return 9;
    case "Ruby":
      return 10;
  }
}

function saveFileLegacy(filename, contents, type) {
  let key = Object.keys(exts[getExt(type)]);
  const opts = { type: key };
  const file = new File([contents], "", opts);
  download.href = window.URL.createObjectURL(file);
  download.setAttribute("download", filename);
  download.click();
}

function shareFile(i) {
  if (f[i - 1].isModified) {
    alert("please save your file first");
    return;
  }
  let key = Object.keys(exts[getExt(f[i - 1].ext)]);
  const opts = { type: key };
  const file = new File([getText(i - 1)], f[i - 1].filename, opts);
  const filearr = [file];
  let shareobj,
    window = ["Win32", "Win64", "Windows", "WinCE"];
  if (window.indexOf(navigator.platform) !== -1) {
    shareobj = {
      files: filearr,
    };
  } else {
    shareobj = {
      title: f[i - 1].filename,
      text: "Shared from notes web app",
      files: filearr,
      url: "https://notes-10.herokuapp.com",
    };
  }
  navigator
    .share(shareobj)
    .then(() => {
      console.info("file shared successfully");
    })
    .catch((error) => {
      console.error("Sharing failed", error);
    });
}
