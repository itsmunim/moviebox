class File {
  constructor(path, parentDir, isDir) {
    this.path = path;
    this.name = path !== '/' ? path.replace(/^.*[\\/]/, '') : path;
    this.extension = !isDir ? this.name.substr(this.name.lastIndexOf('.') + 1) : '';
    this.parent = parentDir;
    this.isDirectory = Boolean(isDir);
  }
}


class Directory extends File {
  constructor(path, parentDir) {
    super(path, parentDir, true);
    this._files = [];
  }

  set files(files) {
    this._files = files;
  }

  get files() {
    return this._files;
  }
}

class FileTree {
  set root(root) {
    this._root = root;
  }

  get root() {
    return this._root;
  }

  set currentNode(current) {
    this._current = current;
  }

  get currentNode() {
    return this._current;
  }

  set previousNode(previous) {
    this._previous = previous;
  }

  get previousNode() {
    return this._previous;
  }
}

export {File, Directory, FileTree};
