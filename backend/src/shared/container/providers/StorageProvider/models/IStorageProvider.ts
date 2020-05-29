export default interface IStorageProvider {
  saveFile(saveFile: string): Promise<string>;
  deleteFile(saveFile: string): Promise<void>;
}
