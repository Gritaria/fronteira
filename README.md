# Fronteira RP

Site estático em português para o servidor Fronteira RP. HTML, CSS e JavaScript sem build e sem dependências de instalação. Arquivos de texto em UTF-8 **sem BOM**.

## Configuração

Edite `site-config.js` e preencha os endereços completos com `https://`:

| Chave | Destino |
| --- | --- |
| `discord` | Convite oficial e suporte |
| `instagram` | Perfil da comunidade |
| `donations` | Loja / doações |
| `wiki` | Documentação dos sistemas |
| `register` | Caixa registradora |
| `memory` | Jogo da memória |

Campo vazio ou endereço inválido mantém o botão desativado como “em breve”. Os links são aplicados em todas as páginas. O arquivo é público: não inclua segredos. `backgroundIntervalMs` controla a troca de fundos em milissegundos, com mínimo de 10 segundos. A rotação pausa com a aba oculta ou preferência por movimento reduzido.

## Estrutura

- `index.html`: apresentação, acesso, utilidades e contatos.
- `regras.html`: regras e exemplos em modais.
- `empresas.html`: regras de negócios.
- `dicas.html`: guia de imersão.
- `diretrizes-lei.html`: conteúdo ainda pendente.
- `styles.css`: estilos compartilhados e adaptações para celular.
- `script.js`: links, animações, fundos e controlador compartilhado de modais.
- `assets/backgrounds/`: cópias WebP otimizadas usadas pelo site.
- `assets/background/` e demais artes antigas: originais preservados; as logos Tombstone não são mais exibidas.

## Visualização local

Na pasta do site, execute `python -m http.server 8765 --bind 127.0.0.1` e acesse `http://127.0.0.1:8765`.

## Repositório e publicação

O site utiliza caminhos relativos para funcionar em um repositório com qualquer nome no GitHub Pages. Envie somente esta pasta ao novo repositório, nunca a pasta de resources do servidor. Ative Pages para publicar a raiz da branch escolhida. O repositório deste projeto é `Gritaria/fronteira`. A cópia anterior do Tombstone foi preservada separadamente. O envio do código não ativa a hospedagem do site automaticamente.

Antes de publicar: preencher os seis destinos, aprovar a identidade visual definitiva e completar as diretrizes da lei. As regras e datas de revisão herdadas precisam de validação editorial pela equipe. A troca de nome não representa uma revisão dessas políticas.

## Avaliação da base

A estrutura estática é adequada ao tamanho do projeto e fácil de hospedar. A navegação e a separação entre apresentação, regras e dicas são úteis. O visual escuro tem boa coerência, mas a página inicial concentra bastante texto; uma próxima revisão pode encurtar a apresentação e destacar os diferenciais do servidor.

Foram corrigidos os pontos mais concretos: imagens de fundo muito pesadas (70,5 MB para 2,7 MB em cópias de entrega), carregamentos de logos desnecessários, fonte e biblioteca de ícones sem necessidade, duplicação de lógica dos modais, foco de teclado, largura dos exemplos em celulares e links antigos espalhados nas páginas. Foi mantido HTML legível, inclusive sem JavaScript, sem introduzir framework ou processo de build.

A marca tipográfica Fronteira é provisória. As artes originais foram preservadas para referência. As fontes Google continuam externas; sem rede, o navegador usa a fonte de fallback.
