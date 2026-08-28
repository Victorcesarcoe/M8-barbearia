# Guia de conteúdo — ON MEN Barbearia

O site foi preparado para usar exclusivamente dados reais. Os valores por fornecer estão centralizados em `client/src/brand.ts`; assim, a equipa pode completar o projeto sem procurar informação dispersa pelos componentes.

| Campo | Propriedade | Formato esperado |
| --- | --- | --- |
| WhatsApp | `CONTACT.whatsappNumber` | Código do país + DDD + número, apenas algarismos; exemplo estrutural: `55XXXXXXXXXXX`. |
| Instagram | `CONTACT.instagramUrl` e `CONTACT.instagramHandle` | URL completa e nome público do perfil oficial. |
| Morada | `CONTACT.address` | Morada pública completa da ON MEN. |
| Horário | `CONTACT.hours` | Dias e intervalos de atendimento confirmados. |
| Mapa | `CONTACT.mapUrl` | URL oficial de localização, quando definida. |
| Profissionais | `TEAM_SLOTS` e respetivo componente | Fotografias, nomes, especialidades e perfis reais. |

As fotografias principais já utilizam os endereços permanentes do projeto. `interior.jpeg` está na Hero, Experiência e CTA final; `fachada1.jpeg` apresenta o estabelecimento; e `CORTE1.jpg` comunica o nível de acabamento nos serviços e na galeria. Os enquadramentos são feitos por CSS e não alteram os ficheiros originais.

O título, a descrição, o idioma, a cor do navegador, os metadados sociais, o favicon, os textos alternativos e o ficheiro `robots.txt` estão configurados. Antes da publicação, recomenda-se completar os contactos e confirmar a redação dos serviços com a equipa da ON MEN.
