import { injectable } from 'tsyringe'
import { hash, compare } from 'bcryptjs'

import { HashProvider } from '@providers/hash'

@injectable()
export class BCryptProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return compare(paylaod, hashed)
  }
}
