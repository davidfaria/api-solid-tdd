interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: process.env.MAIL_FROM || 'suporte@larawork.com.br',
      name: process.env.MAIL_NAME || 'Suporte Larawork'
    }
  }
} as IMailConfig
