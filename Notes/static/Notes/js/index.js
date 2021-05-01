var fsAccess = true,
  share = true;
var f, free;
var myModal;
var original;
window.addEventListener("DOMContentLoaded", () => {
  if (!("showOpenFilePicker" in window)) {
    document.getElementById("lfoot").classList.toggle("d-none", false);
    fsAccess = false;
    for (let i = 1; i <= 5; i++) {
      let savebtn = document.getElementById(`file${i}-save`);
      savebtn.classList.toggle("d-none", true);
    }
  }
  if (!("share" in navigator)) {
    share = false;
    for (let i = 1; i <= 5; i++) {
      let shrbtn = document.getElementById(`file${i}-share`);
      shrbtn.classList.toggle("d-none", true);
    }
  }
  f = [];
  free = [];
  for (let i = 0; i < 5; i++) {
    free.push(false);
  }
  var myModal = document.getElementById("newModal");
  myModal.addEventListener("hidden.bs.modal", (event) => {
    document.getElementById("newname").value = "";
    document.getElementById("newtype").value = 0;
  });
  function setTheme(i) {
    let check = document.getElementsByName("theme");
    check[i].checked = true;
    let ele = document.getElementById("theme-css");
    let href = ele.href;
    switch (i) {
      case 0:
        href = href.replace(
          href.substring(href.lastIndexOf("/") + 1, href.length),
          "prism-default.css"
        );
        ele.href = href;
        break;
      case 1:
        href = href.replace(
          href.substring(href.lastIndexOf("/") + 1, href.length),
          "prism-coy.css"
        );
        ele.href = href;
        break;
      case 2:
        href = href.replace(
          href.substring(href.lastIndexOf("/") + 1, href.length),
          "prism-night.css"
        );
        ele.href = href;
        break;
      case 3:
        href = href.replace(
          href.substring(href.lastIndexOf("/") + 1, href.length),
          "prism-funky.css"
        );
        ele.href = href;
        break;
    }
  }
  for (let i = 1; i < 6; i++) {
    let element = document.getElementById(`selectFont${i}`);
    let option1 = new Option("Serif", "0");
    element.add(option1, undefined);
    let option2 = new Option("Sans-Serif", "1");
    element.add(option2, undefined);
    let option3 = new Option("Handwriting", "2");
    element.add(option3, undefined);
    let option4 = new Option("MonoSpace", "3");
    element.add(option4, undefined);
    element.onchange = () => {
      changefont(i);
    };
    let size = document.getElementById(`selectSize${i}`);
    size.oninput = () => {
      changesize(i);
    };
    fetch("/theme")
      .then((response) => response.json())
      .then((msg) => {
        if ("error" in msg) {
          alert(msg["error"]);
        } else {
          setTheme(msg["theme"]);
        }
      });
  }
  original = window.innerHeight;
});

function getFreeFile() {
  for (let i = 0; i <= 4; i++) {
    if (free[i] === false) {
      return i + 1;
    }
  }
  return false;
}

function getUsedFile() {
  for (let i = 0; i <= 4; i++) {
    if (free[i] === true) {
      return i + 1;
    }
  }
  return false;
}
function checkfileName(filename) {
  for (let i = 0; i < f.length; i++) {
    if (f[i] !== null) {
      let file = f[i].filename;
      if (file === filename) {
        return true;
      }
    }
  }
  return false;
}
function getType(ext) {
  switch (ext) {
    case ".txt":
      return "Text";
    case ".py":
      return "Python";
    case ".java":
      return "Java";
    case ".html":
      return "Html";
    case ".css":
      return "Css";
    case ".js":
      return "JavaScript";
    case ".md":
      return "Markdown";
    case ".c":
      return "C";
    case ".cpp":
      return "C++";
    case ".php":
      return "PHP";
    case ".rb":
      return "Ruby";
  }
}

function newFile() {
  let filename = document.getElementById("newname").value;
  let filetype = document.getElementById("newtype").value;
  let findex = getFreeFile();
  if (filename === "" || filetype === "0") {
    alert("Please enter proper details");
    return;
  }
  if (checkfileName(filename)) {
    alert("You have already created the file");
    return;
  }
  if (findex === false) {
    alert("Please close anyone opened file");
    return;
  } else {
    let file = new files(null, filename + filetype, getType(filetype), false);
    f[findex - 1] = file;
    setFile(findex);
    setText(findex - 1, "", getType(filetype));
    free[findex - 1] = true;
    if (getFreeFile() === false) {
      let newfile = document.getElementById("new");
      newfile.classList.toggle("d-none", true);
      let openfile = document.getElementById("open");
      openfile.classList.toggle("d-none", true);
      let btngrp = document.getElementById("btngrp");
      btngrp.classList.toggle("btn-group-vertical", false);
    }
  }
}
async function openFile() {
  let filehandle;
  if (!fsAccess) {
    const file = await openFileLegacy();
    if (file) {
      read(file);
    }
    return;
  } else {
    try {
      [filehandle] = await getFileHandle();
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      const msg = "An error occured while opening file";
      console.error(msg, error);
      alert(msg);
    }
  }
  if (!filehandle) {
    return;
  }
  if ((await verifyPermission(filehandle, false)) === false) {
    console.error("User didn't grant permission");
    return;
  }
  const file = await filehandle.getFile();
  read(file, filehandle);
}

async function read(file, filehandle) {
  if (
    getType(file.name.substring(file.name.indexOf("."), file.name.length)) ===
    undefined
  ) {
    alert("Can't read this type of file");
    return;
  }
  try {
    let findex = getFreeFile();
    if (checkfileName(file.name)) {
      alert("You have already opened the file");
      return;
    }
    if (findex === false) {
      alert("Please close anyone opened file");
      return;
    } else {
      let filename = file.name.toString();
      let fl = new files(
        filehandle,
        filename,
        getType(filename.substring(filename.indexOf("."), filename.length)),
        false
      );
      f[findex - 1] = fl;
      setFile(findex);
      setText(findex - 1, await readFile(file), fl.ext);
      free[findex - 1] = true;
      if (getFreeFile() === false) {
        let newfile = document.getElementById("new");
        newfile.classList.toggle("d-none", true);
        let openfile = document.getElementById("open");
        openfile.classList.toggle("d-none", true);
        let btngrp = document.getElementById("btngrp");
        btngrp.classList.toggle("btn-group-vertical", false);
      }
    }
  } catch (error) {
    const msg = `An error occured reading ${file.name}`;
    console.error(msg, error);
    alert(msg);
  }
}

async function SaveFile(i) {
  if (!f[i - 1].filehandle) {
    return await SaveAs(i);
  }
  if ((await verifyPermission(f[i - 1].filehandle, true)) === false) {
    console.error("User didn't grant permission");
    return;
  }
  await writeFile(f[i - 1].filehandle, getText(i - 1));
  f[i - 1].setModified(false, i - 1);
}

async function SaveAs(i) {
  if (!fsAccess) {
    let filename = f[i - 1]["filename"];
    let type = f[i - 1]["ext"];
    saveFileLegacy(filename, getText(i - 1), type);
    return;
  }
  let filehandle;
  try {
    filehandle = await getNewFileHandle();
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }
    const msg = "An error occured trying to save this file.";
    console.error(msg, error);
    alert(msg);
    return;
  }
  f[i - 1].filehandle = filehandle;
  try {
    await writeFile(filehandle, getText(i - 1));
  } catch (error) {
    const msg = "Unable to save file.";
    console.error(msg, error);
    alert(msg);
    return;
  }
}

function closeFile(i) {
  if (!f[i - 1].confirmDiscard()) {
    return;
  }
  free[i - 1] = false;
  let j = getUsedFile();
  unsetFile(i, j);
  setText(i - 1, "");
  f[i - 1] = null;
  let newfile = document.getElementById("new");
  newfile.classList.toggle("d-none", false);
  let openfile = document.getElementById("open");
  openfile.classList.toggle("d-none", false);
  let btngrp = document.getElementById("btngrp");
  btngrp.classList.toggle("btn-group-vertical", true);
  document.getElementById(`selectFont${i}`).value = "0";
  document.getElementById(`selectSize${i}`).value = "16";
  changefont(i);
  changesize(i);
}
