import * as fs from "fs";

const filePath = "/Users/kla/Documents/HabberNote/test.md";
const folderPath = "/Users/kla/Documents/HabberNote/";

export const getFilesInDirectory = (setFiles) => {
  fs.readdir(folderPath, (err, files) => {
    if (err)
      return console.log(`Unable to scan directory '${folderPath}': `, err);
    setFiles(files);
  });
};

export const getFileByPath = (setOpenNote) => {
  fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
    if (err) return console.log(`Unable to read file '${filePath}': `, err);
    setOpenNote({ name: "test.md", data });
  });
};

export const saveNote = (newData: string) => {
  console.log("Save File");
  fs.writeFile(filePath, newData, "utf8", function (err) {
    if (err) return console.log(err);
  });
};
