class files {
  constructor(filehandle, filename, type, isModified) {
    this.filehandle = filehandle;
    this.filename = filename;
    this.type = type;
    this.isModified = isModified;
  }
  Attributes = { fonttype: "Serif", fontsize: 12, active: false };
  setActive(val) {
    this.Attributes.active = val;
  }
}
const exts = {
  txt: "text/plain",
  py: "text/python",
  java: "text/java",
  html: "text/html",
  css: "text/css",
  js: "text/js",
  md: "text/md",
};
