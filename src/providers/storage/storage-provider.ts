export interface StorageProvider {
  saveFile(file: string, path_folder?: string): Promise<string>
  deleteFile(file: string, path_folder?: string): Promise<void>
}
