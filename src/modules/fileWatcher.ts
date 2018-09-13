import * as vscode from 'vscode';
import * as debounce from 'lodash.debounce';
import { executeCommand } from '../host';
import { isValidFile, fileDepth } from '../helper';
import { upload, removeRemote } from '../fileHandlers';
import { WatcherService } from '../core';

const watchers: {
  [x: string]: vscode.FileSystemWatcher;
} = {};

const uploadQueue = new Set<vscode.Uri>();
const deleteQueue = new Set<vscode.Uri>();

// less than 550 will not work
const ACTION_INTEVAL = 550;

function doUpload() {
  const files = Array.from(uploadQueue).sort((a, b) => fileDepth(b.fsPath) - fileDepth(a.fsPath));
  uploadQueue.clear();
  files.forEach(uri => upload(uri));
}

function doDelete() {
  const files = Array.from(deleteQueue).sort((a, b) => fileDepth(b.fsPath) - fileDepth(a.fsPath));
  deleteQueue.clear();
  files.forEach(uri => removeRemote(uri));
}

const debouncedUpload = debounce(doUpload, ACTION_INTEVAL, { leading: true, trailing: true });
const debouncedDelete = debounce(doDelete, ACTION_INTEVAL, { leading: true, trailing: true });

function uploadHandler(uri: vscode.Uri) {
  if (!isValidFile(uri)) {
    return;
  }

  uploadQueue.add(uri);
  debouncedUpload();
}

function addWatcher(id, watcher) {
  watchers[id] = watcher;
}

function getWatcher(id) {
  return watchers[id];
}

function createWatcher(
  watcherBase: string,
  watcherConfig: { files: false | string; autoUpload: boolean; autoDelete: boolean }
) {
  if (!watcherConfig) {
    return;
  }

  let watcher = getWatcher(watcherBase);
  if (watcher) {
    // clear old watcher
    watcher.dispose();
  }

  const shouldAddListenser = watcherConfig.autoUpload || watcherConfig.autoDelete;
  // tslint:disable-next-line triple-equals
  if (watcherConfig.files == false || !shouldAddListenser) {
    return;
  }

  watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(watcherBase, watcherConfig.files),
    false,
    false,
    false
  );
  addWatcher(watcherBase, watcher);

  if (watcherConfig.autoUpload) {
    watcher.onDidCreate(uploadHandler);
    watcher.onDidChange(uploadHandler);
  }

  if (watcherConfig.autoDelete) {
    watcher.onDidDelete(uri => {
      if (!isValidFile(uri)) {
        return;
      }

      deleteQueue.add(uri);
      debouncedDelete();
    });
  }
}

function removeWatcher(watcherBase: string) {
  const watcher = getWatcher(watcherBase);
  if (watcher) {
    watcher.dispose();
    delete watchers[watcherBase];
  }
}

const watcherService: WatcherService = {
  create: createWatcher,
  dispose: removeWatcher,
};

export default watcherService;
