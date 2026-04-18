import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const name = event.context.params?.name;
  if(!name)return
  const filePath =  getFileLocally(name);
  const file = await readFile(filePath);
  setHeader(event, "Content-Type", "image/jpeg");
  return file;
});
