# Direção Criativa — ON MEN Barbearia

## Referência vinculativa

O conteúdo fornecido pelo utilizador constitui a especificação visual e funcional principal. A interface deve usar as fotografias reais da ON MEN como matéria visual dominante, preservar a identidade visível nas imagens e evitar qualquer substituição por fotografia genérica de barbearia. Enquanto as duas fotografias reais não estiverem disponíveis no projeto, a implementação utilizará superfícies editoriais explicitamente identificadas e facilmente substituíveis, sem inventar outro estabelecimento.

## Abordagem escolhida: Clube Editorial Cinematográfico

**Design Movement:** editorial de moda masculina contemporânea com influências de modernismo suíço, luxo discreto e fotografia documental cinematográfica.

**Core Principles:** a composição deve ser assimétrica e tipográfica; o preto deve funcionar como espaço e não apenas como cor; cada movimento deve reforçar hierarquia e profundidade; os elementos de marca devem ser precisos, contidos e sem ornamento gratuito.

**Color Philosophy:** o preto profundo domina para criar intimidade, confiança e exclusividade. Grafite e carvão separam planos sem criar caixas visuais. O branco quente garante legibilidade sem parecer clínico. Um champagne metálico, `#B8A178`, aparece apenas em linhas, microtipografia e estados de foco, funcionando como assinatura e nunca como decoração excessiva.

**Layout Paradigm:** narrativa vertical de grande escala organizada por alinhamentos editoriais laterais, títulos cortados pelo enquadramento, imagens que atravessam a grelha e secções com ritmos alternados. Evitar a sucessão de contentores centrados ou cartões uniformes. Os serviços são apresentados como índice editorial; os números como manchetes; a galeria como díptico assimétrico.

**Signature Elements:** linhas finas em champagne que medem e se deslocam; etiquetas verticais de coordenadas editoriais; enquadramentos de imagem com máscaras retangulares e cantos retos.

**Interaction Philosophy:** a interface responde como um objeto de precisão. Os botões têm magnetismo contido, os links revelam linhas e as imagens ampliam lentamente. Interações frequentes são rápidas; transições de secção podem ser mais cinematográficas, mas nunca atrasam o acesso ao conteúdo.

**Animation:** a abertura dura aproximadamente 1,8 segundos e combina contador, linha de progresso e máscara. Entradas de texto usam `translateY`, opacidade e `clip-path`, com intervalos de 45–70 ms. Parallax e zoom são discretos e suspensos quando `prefers-reduced-motion` está ativo. No mobile, a intensidade e a quantidade de movimentos são reduzidas. O easing principal é `cubic-bezier(0.77, 0, 0.175, 1)` para máscaras e `cubic-bezier(0.23, 1, 0.32, 1)` para respostas rápidas.

**Typography System:** `Bebas Neue` para títulos display condensados e monumentais; `Manrope` para texto, navegação e microcopy. Títulos em caixa alta, tracking ligeiramente negativo e entrelinha apertada; corpo com entrelinha generosa; etiquetas com caixa alta e tracking amplo.

**Brand Essence:** uma experiência de cuidado masculino para homens que transformam precisão e presença num ritual pessoal. Personalidade: **segura, meticulosa, exclusiva**.

**Brand Voice:** frases curtas, declarativas e confiantes. Os títulos soam como afirmações; os CTAs indicam uma ação concreta; a microcopy é discreta. Exemplos: “Seu estilo. Sua presença.” e “Entre. Sente. Transforme-se.”

**Wordmark & Logo:** o wordmark digital usa “ON” em peso largo e “MEN” condensado, separados por uma linha vertical fina, acompanhado por “BARBEARIA” em microtipografia espaçada. Até receber o ficheiro oficial da marca, o símbolo de interface será um monograma geométrico `OM` claramente identificado como provisório; não altera nem cobre qualquer logótipo presente nas fotografias reais.

**Signature Brand Color:** Champagne ON — `#B8A178`.

## Style Decisions

O Champagne ON `#B8A178` fica reservado a linhas, microtipografia, metadados, estados ativos e acentos pontuais; não preenche grandes títulos display. Todo intervalo escuro prolongado deve incluir um sinal editorial visível, como uma linha de medição, índice, coordenada, fragmento de imagem ou microcopy. Dados reais ainda não recebidos são apresentados como placas editoriais reservadas, com códigos de configuração e geometria de precisão, nunca como cartões vazios ou componentes genéricos.

## Regras de conteúdo e integridade

Não serão inventados nomes de barbeiros, endereços, horários, números de WhatsApp, perfis sociais, métricas, avaliações ou testemunhos. Campos por fornecer devem permanecer configuráveis e assinalados de forma honesta. A secção de números usa apenas métricas neutras ou marcadores de configuração; a secção de depoimentos não apresenta frases atribuídas a clientes.

## Arquitetura de página

A experiência inclui preloader, cabeçalho fixo, hero, manifesto da marca, serviços, experiência, galeria, espaço, equipa preparada para dados reais, localização/configuração, CTA final e footer. Em desktop, a página inclui cursor personalizado discreto, barra de progresso, revelações, parallax e movimento horizontal. Em mobile, o menu, o CTA inferior e o desempenho têm prioridade.

## Mapeamento das fotografias reais

| Ficheiro | Função principal | Tratamento permitido |
| --- | --- | --- |
| `interior.jpeg` | Hero, secção Experiência e CTA final | Enquadramento responsivo, overlay preto, vinheta, grain, zoom e parallax discretos; o espaço e o logótipo devem permanecer reconhecíveis. |
| `fachada1.jpeg` | Secção “A ON MEN” e galeria | Máscara de revelação, deslocamento vertical subtil e enquadramento editorial; a sinalização exterior não deve ser alterada. |
| `CORTE1.jpg` | Serviços, galeria e detalhe de precisão | Ampliação suave, máscara vertical e recorte responsivo sem retocar o corte, a pele, o rosto ou a identidade do cliente. |

## Dependências de conteúdo

`WHATSAPP_NUMBER`, morada, horário, Instagram, mapa, dados dos profissionais e números institucionais permanecem centralizados num ficheiro de configuração. Até estes dados serem fornecidos, a página deve usar rótulos honestos de configuração e nunca valores inventados.
