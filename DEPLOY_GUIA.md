# 🚀 GUIA PRÁTICO: Deploy no Netlify

**Samuel, leia com calma que é super simples!**

---

## PASSO 1️⃣: Criar conta no GitHub (5 minutos)

1. **Vai em:** https://github.com/signup
2. **Preenche:**
   - Email: seu_email@gmail.com
   - Senha: cria uma boa
   - Username: seu_nome_ou_apelido
3. **Clica em "Create account"**
4. **Confirma no email**

---

## PASSO 2️⃣: Upload do código (3 minutos)

1. **Cria um repositório novo:**
   - Vai em: https://github.com/new
   - Nome: `instagram-samuel-automacao`
   - Descrição: `App de automação para publicar no Instagram`
   - Clica em "Create repository"

2. **Agora você tem duas opções:**

### Opção A: Copiar com comandos (se tiver Git instalado):
```bash
git clone <URL do seu repositório>
cd instagram-samuel-automacao
# Copia os arquivos da pasta que criei pra aqui
# (package.json, .env.local, pages/, etc)
git add .
git commit -m "Deploy initial"
git push origin main
```

### Opção B: Upload pela web (mais fácil):
1. **No seu repositório, clica em "Add file" → "Upload files"**
2. **Arrasta todos os arquivos que criei pra lá**
3. **Commit changes**

---

## PASSO 3️⃣: Deploy no Netlify (2 minutos)

1. **Vai em:** https://netlify.com
2. **Clica em "Sign up"** → escolhe "Sign up with GitHub"
3. **Autoriza o Netlify** a acessar seus repos
4. **Clica em "New site from Git"**
5. **Seleciona seu repositório** `instagram-samuel-automacao`
6. **Build Settings (deixa assim):**
   - Build command: `npm run build`
   - Publish directory: `.next`
7. **Clica em "Deploy site"**

---

## PASSO 4️⃣: Adicionar as variáveis de ambiente (2 minutos)

1. **No painel do Netlify, clica em "Site settings"**
2. **Vai em "Environment"**
3. **Clica em "Edit variables"**
4. **Adiciona estas variáveis:**

| Chave | Valor |
|-------|-------|
| `NEXT_PUBLIC_INSTAGRAM_TOKEN` | `EAAXdxAAu1w...` (seu token do Instagram) |
| `NEXT_PUBLIC_CLAUDE_API_KEY` | `sk-ant-api03-aE...` (sua chave Claude) |
| `NEXT_PUBLIC_SAMUEL_IG_ID` | `17841402899155` |
| `NEXT_PUBLIC_VISTA_IG_ID` | `17841402899155` |
| `NEXT_PUBLIC_GESTAO_IG_ID` | `17841402899155` |

5. **Clica em "Deploy site"** (de novo)
6. **Espera 2-3 minutos**

---

## ✅ PRONTO!

Seu app está ONLINE! 🎉

**Link vai ser algo como:**
```
https://seu-site.netlify.app
```

Você pode:
- ✅ Acessar de qualquer lugar
- ✅ Publicar pelo celular, computador, tablet
- ✅ Compartilhar o link com consultores
- ✅ É GRATUITO no Netlify

---

## 🎯 Testando

1. **Abre o link** do seu site
2. **Escolhe a conta** (Samuel, Vista Mais ou Gestão)
3. **Digita um prompt** (ex: "3 dicas de Mercado Pago")
4. **Clica em "GERAR E PUBLICAR"**
5. **Vê o preview**
6. **Clica em "PUBLICAR AGORA"**
7. **Vê seu post no Instagram!** ✨

---

## 🔧 Troubleshooting (Se der erro)

### "Build failed"
- Verifica se todos os arquivos estão no repositório
- Confirma package.json está lá

### "Variáveis não estão setadas"
- Vai em Site Settings → Environment
- Confirma que digitou certo
- Clica em "Deploy site" de novo

### "Erro ao publicar no Instagram"
- Confirma que o token é válido
- Testa o token no Graph API Explorer: https://developers.facebook.com/tools/explorer

### "App não aparece"
- Espera 5 minutos (primeiro build demora)
- Atualiza a página (Ctrl+F5)
- Verifica em Netlify: Deploy → Logs

---

## 📞 Precisa de ajuda?

**Manda mensagem que eu oriento!**

WhatsApp: (13) 98100-5617

---

**Boa sorte, Samuel!** 🚀

Depois que estiver rodando, você vai conseguir criar posts profissionais em **menos de 1 minuto**. É para valer mesmo!
