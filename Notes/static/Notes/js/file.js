class files {
  constructor(filehandle, filename, ext, isModified) {
    this.filehandle = filehandle;
    this.filename = filename;
    this.ext = ext;
    this.isModified = isModified;
  }
  confirmDiscard() {
    if (!this.isModified) {
      return true;
    }
    const confirmMsg = "Discard changes? All changes will be lost.";
    return confirm(confirmMsg);
  }
  setModified(val, fileno) {
    if (!fsAccess) {
      return;
    }
    this.isModified = val;
    fileno += 1;
    if (val) {
      document.getElementById(`file${fileno}-title`).textContent =
        this.filename + "*";
      document.getElementById(`file${fileno}_title`).textContent =
        this.filename + "*";
    } else {
      document.getElementById(
        `file${fileno}-title`
      ).textContent = this.filename;
      document.getElementById(
        `file${fileno}_title`
      ).textContent = this.filename;
    }
  }
}
const exts = [
  { "text/plain": ".txt" },
  { "text/c": ".c" },
  { "text/cpp": ".cpp" },
  { "text/python": ".py" },
  { "text/java": ".java" },
  { "text/html": ".html" },
  { "text/css": ".css" },
  { "text/javascript": ".js" },
  { "text/markdown": ".md" },
  { "text/PHP": ".php" },
  { "text/ruby": ".rb" },
];
