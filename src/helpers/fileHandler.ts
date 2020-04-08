import * as fs from "fs";
import { IAvailableNote } from "../react";

export const getFilesInDirectory = (
  folderPath: string
): Promise<IAvailableNote[]> => {
  return new Promise((res, rej) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) rej(err);
      const noteResults: IAvailableNote[] = files.map((f: string) => ({
        name: f,
        path: folderPath,
      }));
      res(noteResults);
    });
  });
};

export const getFileByPath = (
  filePath: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((res, rej) => {
    fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
};

export const saveNote = (filePath: string, newData: string) => {
  fs.writeFile(filePath, newData, "utf8", function (err) {
    if (err) return console.log(err);
  });
};

export const renameNote = (
  oldPath: string,
  newPath: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((res, rej) => {
    fs.rename(oldPath, newPath, function (err) {
      if (err) rej(err);
      res();
    });
  });
};
