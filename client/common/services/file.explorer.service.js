import _ from 'lodash';
import BaseHttpService from './base.http.service';

class FileExplorerService extends BaseHttpService {
  static fetchFoldersInPath(path) {
    return FileExplorerService.makeGETCall('/explorer/files', null, {path})
      .then((files) => {
        return _.filter(files, (file) => {
          return file.isDirectory;
        });
      });
  }
}

export default FileExplorerService;
