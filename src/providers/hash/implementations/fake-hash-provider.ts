import { HashProvider } from '@providers/hash'

export class FakeHashProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return paylaod === hashed
  }
}
