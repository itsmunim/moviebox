import FileExplorerState from './file.explorer';
import HeaderState from './header';

export default {
  fileExplorer: FileExplorerState.reduce,
  header: HeaderState.reduce
};
