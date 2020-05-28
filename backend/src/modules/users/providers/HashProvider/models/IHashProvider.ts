import ICompareHashDTO from '../dtos/ICompareHashDTO';

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash({ payload, hashed }: ICompareHashDTO): Promise<boolean>;
}
