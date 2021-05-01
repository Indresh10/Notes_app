async function getFileHandle() {
  let opts = {
    types: [],
  };
  for (let i = 0; i < exts.length; i++) {
    let key = Object.keys(exts[i]);
    let opt = {
      description: getType(exts[i][key]) + " File",
      accept: exts[i],
    };
    opts.types.push(opt);
  }
  return window.showOpenFilePicker(opts);
}

function getNewFileHandle() {
  let opts = {
    types: [],
  };
  for (let i = 0; i < exts.length; i++) {
    let key = Object.keys(exts[i]);
    let opt = {
      description: getType(exts[i][key]) + " File",
      accept: exts[i],
    };
    opts.types.push(opt);
  }
  return window.showSaveFilePicker(opts);
}

function readFile(file) {
  if (file.text) return file.text();
  else return _readFileLegacy(file);
}

function _readFileLegacy(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      const text = e.target.result;
      resolve(text);
    });
    reader.readAsText(file);
  });
}

async function writeFile(filehandle, contents) {
  const writeable = await filehandle.createWritable();
  await writeable.write(contents);
  await writeable.close();
}

async function verifyPermission(filehandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.writable = true;
    opts.mode = "readwrite";
  }

  if ((await filehandle.queryPermission(opts)) === "granted") {
    return true;
  }

  if ((await filehandle.requestPermission(opts)) === "granted") {
    return true;
  }
  return false;
}
