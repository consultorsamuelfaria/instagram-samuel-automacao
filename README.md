# 📱 Instagram Automático - Samuel Faria

App profissional para gerar e publicar conteúdo automaticamente no Instagram usando Claude AI + Meta Graph API.

## ✨ Features

✅ **3 Contas Integradas**
- @consultorsamuelfariaoficial (Samuel Faria)
- @vistamaisoficial (Vista Mais)
- @intelicredgestao (Sistema Gestão)

✅ **Múltiplos Formatos**
- 🎨 Carrossel (3-10 imagens)
- 🎬 Vídeo (upload ou gravação)

✅ **Geração Inteligente**
- Conteúdo gerado por Claude AI
- Copy profissional
- Hashtags otimizadas
- CTAs automáticos

✅ **Entrada Flexível**
- ⌨️ Digitar prompt
- 🎤 Gravar áudio
- 📹 Upload de vídeo

## 🚀 Deploy no Netlify

### Passo 1: Preparar no GitHub

```bash
# Clonar este repositório
git clone https://github.com/seu-usuario/instagram-samuel-automacao.git
cd instagram-samuel-automacao

# Instalar dependências
npm install

# Testar localmente
npm run dev
# Acessa http://localhost:3000
```

### Passo 2: Push para GitHub

```bash
git add .
git commit -m "Deploy initial"
git push origin main
```

### Passo 3: Deploy no Netlify

1. **Acessa https://netlify.com**
2. **Clica em "New site from Git"**
3. **Seleciona seu repositório GitHub**
4. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

5. **Variáveis de Ambiente:**
   - Clica em "Environment" → "Edit variables"
   - Adiciona:
     ```
     NEXT_PUBLIC_INSTAGRAM_TOKEN = seu_token_aqui
     NEXT_PUBLIC_CLAUDE_API_KEY = sua_chave_claude_aqui
     NEXT_PUBLIC_SAMUEL_IG_ID = id_samuel
     NEXT_PUBLIC_VISTA_IG_ID = id_vista
     NEXT_PUBLIC_GESTAO_IG_ID = id_gestao
     ```

6. **Clica em "Deploy site"**

7. **Espera 2-3 minutos e pronto!** 🎉
   - Você ganha um link tipo: `https://seu-site.netlify.app`

## 🔒 Segurança

- ✅ Tokens nunca vão para o GitHub
- ✅ Variáveis de ambiente protegidas no Netlify
- ✅ Código-fonte privado recomendado
- ✅ HTTPS automático

## 📝 Como Usar

1. **Abra o app** (link do Netlify)
2. **Escolha a conta** (Samuel, Vista Mais ou Gestão)
3. **Escolha o tipo** (Carrossel ou Vídeo)
4. **Descreva o conteúdo**
5. **Clica em "GERAR E PUBLICAR"**
6. **Vê o preview e confirma**
7. **Post sai direto no Instagram!** ✨

## 🛠️ Customização

Quer mudar cores, adicionar contas ou features?

### Adicionar nova conta:

Em `pages/index.tsx` e `pages/api/generate-and-publish.ts`:

```typescript
const accounts = {
  samuel: { ... },
  vista: { ... },
  gestao: { ... },
  nova_conta: {  // Nova conta aqui
    name: '@username',
    label: 'Nome da Conta',
    emoji: '🎯',
  }
}
```

### Customizar cores:

Em `pages/index.tsx`, mude:
- `#FFB800` = Ouro (seu primário)
- `#3483FF` = Azul (seu secundário)
- `#0D1425` = Preto (fundo)

## 📞 Suporte

Para dúvidas ou erros:

1. Verifica o console do navegador (F12)
2. Verifica os logs do Netlify
3. Confirma que os tokens estão certos

## 📊 Próximas Features (Roadmap)

- [ ] Agendamento de posts
- [ ] Analytics integrado
- [ ] Biblioteca de templates
- [ ] Integração com TikTok
- [ ] Análise de performance

---

**Desenvolvido por Samuel Faria** ✨
**Consultor Certificado Mercado Pago**
