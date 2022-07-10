const openfile = document.getElementById("fileopen");
const download = document.getElementById("downloader");

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

function saveFileLegacy(filename, contents, ext) {
  filename = (filename || "Untitled") + "." + ext;
  const opts = { type: type[ext] };
  const file = new File([contents], "", opts);
  download.href = window.URL.createObjectURL(file);
  download.setAttribute("download", filename);
  download.click();
}
