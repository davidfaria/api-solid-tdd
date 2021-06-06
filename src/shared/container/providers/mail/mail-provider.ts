type TemplateVariables = {
  [key: string]: string | number
}

export type ParseMailTemplate = {
  file: string
  variables: TemplateVariables
}

type MailContact = {
  name: string
  email: string
}

export type SendMail = {
  to: MailContact
  from?: MailContact
  subject: string
  templateData: ParseMailTemplate
}

export interface MailProvider {
  sendMail(data: SendMail): Promise<void>
}
