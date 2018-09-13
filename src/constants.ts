import * as path from 'path';

const VENDOR_FOLDER = '.vscode';

export const EXTENSION_NAME = 'sftp';
export const SETTING_KEY_REMOTE = 'remotefs.remote';

export const REMOTE_SCHEME = 'remote';

export const CONGIF_FILENAME = 'sftp.json';
export const CONFIG_PATH = path.join(VENDOR_FOLDER, CONGIF_FILENAME);

// command not in package.json
export const COMMAND_TOGGLE_OUTPUT = 'sftp.toggleOutput';
export const COMMAND_SHOWRESOURCE = 'sftp.showResource';

// commands in package.json
export const COMMAND_CONFIG = 'sftp.config';
export const COMMAND_SET_PROFILE = 'sftp.setProfile';

export const COMMAND_FORCE_UPLOAD = 'sftp.forceUpload';
export const COMMAND_UPLOAD_FILE = 'sftp.upload.file';
export const COMMAND_UPLOAD_ACTIVEFILE = 'sftp.upload.activeFile';
export const COMMAND_UPLOAD_FOLDER = 'sftp.upload.folder';
export const COMMAND_UPLOAD_PROJECT = 'sftp.upload.project';
export const COMMAND_FORCE_DOWNLOAD = 'sftp.forceDownload';
export const COMMAND_DOWNLOAD_FILE = 'sftp.download.file';
export const COMMAND_DOWNLOAD_ACTIVEFILE = 'sftp.download.activeFile';
export const COMMAND_DOWNLOAD_FOLDER = 'sftp.download.folder';
export const COMMAND_DOWNLOAD_PROJECT = 'sftp.download.project';

export const COMMAND_SYNC_TO_REMOTE = 'sftp.sync.remote';
export const COMMAND_SYNC_TO_LOCAL = 'sftp.sync.local';

export const COMMAND_DIFF = 'sftp.diff';
export const COMMAND_LIST = 'sftp.list';
export const COMMAND_LIST_ALL = 'sftp.listAll';
export const COMMAND_DELETE_REMOTE = 'sftp.delete.remote';
export const COMMAND_REVEAL_IN_EXPLORER = 'sftp.revealInExplorer';
export const COMMAND_REVEAL_IN_REMOTE_EXPLORER = 'sftp.revealInRemoteExplorer';

export const COMMAND_REMOTEEXPLORER_REFRESH = 'sftp.remoteExplorer.refresh';
export const COMMAND_REMOTEEXPLORER_EDITINLOCAL = 'sftp.remoteExplorer.editInLocal';
