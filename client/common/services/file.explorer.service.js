import BaseHttpService from './base.http.service';

class FileExplorerService extends BaseHttpService {
  static fetchFilesInPath(path) {
    return FileExplorerService.makeGETCall('/explorer/files', null, {path})
      .then((files) => {
        return files;
      });
  }
}

export default FileExplorerService;
