import { TokenProvider } from '@providers/token'

export class FakeTokenProvider implements TokenProvider {
  generateToken(subject: string): string {
    return subject
  }
}
