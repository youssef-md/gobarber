import IHashProvider from '../models/IHashProvider';
import ICompareHashDTO from '../dtos/ICompareHashDTO';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash({
    payload,
    hashed,
  }: ICompareHashDTO): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
