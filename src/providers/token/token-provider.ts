export type Subject = string | Buffer

export interface TokenProvider {
  generateToken(subject: string): string
}
