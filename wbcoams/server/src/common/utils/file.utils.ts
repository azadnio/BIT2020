import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

export const ensureDirectoryExists = (destination: string) => {
  if (!existsSync(destination)) {
    mkdirSync(destination, { recursive: true });
  }
};

export const moveFile = (source: string, destination: string) => {
  ensureDirectoryExists(path.dirname(destination));

  fs.renameSync(source, destination);
};
