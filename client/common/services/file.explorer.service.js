import BaseHttpService from './base.http.service';
import _ from 'lodash';

class FileExplorerService extends BaseHttpService {
  static getAllowedExtensions() {
    return ['.mkv', '.mp4', '.avi'];
  }

  static fetchFilesInPath(path) {
    return FileExplorerService.makeGETCall('/explorer/files', {path})
      .then((files) => {
        return _.filter(files, (file) => {
          return file.isDirectory || _.includes(FileExplorerService.getAllowedExtensions(), file.ext);
        });
      });
  }
}

export default FileExplorerService;
