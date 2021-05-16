import { readFileSync } from 'fs'
import handlebars from 'handlebars'
import { ParseMailTemplate } from './mail-provider'

export function parserHtmlWithVariables(
  templateData: ParseMailTemplate
): string {
  const templateFileContent = readFileSync(templateData.file, {
    encoding: 'utf-8'
  })
  const parseTemplate = handlebars.compile(templateFileContent)
  return parseTemplate(templateData.variables)
}
