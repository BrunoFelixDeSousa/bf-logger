# BFLogger

Um logger leve e configurável para uso em projetos TypeScript.

## Instalação

```bash
npm install bf-logger
```

## Uso

```typescript
import { BFLogger } from "bf-logger";

const logger = new BFLogger({ saveToFile: true });

logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug({ user: "example", status: "active" });
```

## Funcionalidades

- Suporte para diferentes níveis de log: `info`, `warn`, `error`, `debug`.
- Salva logs em arquivos (opcional).
- Formatação avançada para objetos no modo `debug`.

## Configuração

| Opção        | Tipo    | Padrão   | Descrição                    |
| ------------ | ------- | -------- | ---------------------------- |
| `saveToFile` | boolean | `false`  | Salva logs em arquivos.      |
| `filePath`   | string  | `./logs` | Caminho para salvar os logs. |
