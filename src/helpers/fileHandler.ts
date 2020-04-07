import * as fs from "fs";

export const getFilesInDirectory = (folderPath: string): Promise<string[]> => {
  return new Promise((res, rej) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) rej(err);
      res(files);
    });
  });
};

export const getFileByPath = (filePath: string): Promise<string> => {
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
