/**
 * Opções de configuração para o logger.
 *
 * @typedef {Object} LoggerOptions
 *
 * @property {boolean} [saveToFile=false] - Determina se os logs devem ser salvos em um arquivo.
 * Por padrão, está definido como `false`, o que significa que os logs serão apenas exibidos no console.
 *
 * @property {string} [filePath] - Especifica o caminho onde o arquivo de log deve ser salvo.
 * Esta propriedade é opcional, mas deve ser definida se `saveToFile` estiver como `true`.
 */
export type LoggerOptions = {
  saveToFile?: boolean;
  filePath?: string;
};
