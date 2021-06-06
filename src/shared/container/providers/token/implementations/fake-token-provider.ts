import { TokenProvider } from '@shared/container/providers/token/token-provider'

export class FakeTokenProvider implements TokenProvider {
  generateToken(subject: string): string {
    return subject
  }
}
