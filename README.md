# Reconhecimento de Imagem e Código Python

Este repositório reúne dois focos principais:

- um protótipo front-end de reconhecimento de imagem usando Teachable Machine e TensorFlow.js (`index.html`)
- exemplos e explicações de código Python no diretório `teste-assistent-code`

## Estrutura do projeto

- `index.html`
  - página web que carrega um modelo de reconhecimento de imagem do Teachable Machine
  - exibe a câmera, classes previstas e barras de progresso
- `teste-assistent-code/`
  - `debug.py` - programa de cálculo e exibição de fatura para três itens
  - `num_primos.py` - verificação de números primos com algoritmo otimizado
  - `refatoracao.py` - cálculo de soma, média, máximo e mínimo de uma lista
  - `explicacao_debug.md` - explicação do código presente em `debug.py`
  - `explicacao_num_primo.md` - explicação do código presente em `num_primos.py`
  - `explicacao_refatoracao.md` - explicação do código presente em `refatoracao.py`

## Como usar

### Executar o app de reconhecimento de imagem

1. Abra `index.html` em um navegador compatível
2. Permita o acesso à câmera
3. Clique em `Iniciar câmera`
4. O sistema exibirá as classes previstas e a confiança para cada previsão

> Observação: o modelo usado por padrão vem de um URL do Teachable Machine e depende de internet.

### Executar os scripts Python

Navegue até a pasta `teste-assistent-code` e execute um dos arquivos com Python:

```bash
cd teste-assistent-code
python3 debug.py
python3 num_primos.py
python3 refatoracao.py
```

### O que cada script faz

- `debug.py`
  - lê nome do cliente, quantidades e preços de três itens e um desconto
  - calcula subtotal, imposto de 10% e total com desconto
  - imprime a fatura formatada no console
- `num_primos.py`
  - implementa `is_prime()` usando checagem rápida por 2 e 3
  - verifica divisores apenas nos candidatos `6k - 1` e `6k + 1`
  - testa uma lista de números e imprime se cada um é primo
- `refatoracao.py`
  - calcula soma, média, maior e menor valor de uma lista de inteiros
  - demonstra uma versão refatorada de um script original menos legível

## Dependências

- `index.html`
  - navegador moderno com suporte a webcam e JS
  - internet para carregar TensorFlow.js e o modelo do Teachable Machine
- Python
  - Python 3.9+ recomendado para executar os scripts com tipagem `list[int]`

## Observações

- Este repositório parece ser um conjunto de estudos e demonstrações, incluindo explicações de refatoração e raciocínio sobre código
- A aplicação de reconhecimento de imagem é um exemplo front-end simples, sem backend
- Os arquivos de explicação (`*.md`) documentam cada programa Python em detalhes
