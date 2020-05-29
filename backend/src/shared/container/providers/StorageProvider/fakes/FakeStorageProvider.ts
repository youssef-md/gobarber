import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filesWithoutThePassedFile = this.storage.filter(
      function checkIfIsNotThePassedFile(storedFile) {
        return storedFile !== file;
      },
    );

    this.storage = filesWithoutThePassedFile;
  }
}

export default FakeStorageProvider;
