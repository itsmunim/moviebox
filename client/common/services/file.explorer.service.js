import BaseHttpService from './base.http.service';

class FileExplorerService extends BaseHttpService{
  static fetchFoldersInPath(path) {
    return FileExplorerService.makeGETCall('/explorer/files', null, {path});
  }
}
