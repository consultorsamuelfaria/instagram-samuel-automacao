# ✅ CHECKLIST PRÉ-DEPLOY

Samuel, antes de fazer o deploy, verifica esta lista:

---

## 📋 Verificações Obrigatórias

### Tokens & Credenciais

- [ ] Instagram Token copiado e validado
  - Começa com `EAAU...` ou `EAAXdx...`?
  - Tem mais de 100 caracteres?

- [ ] Claude API Key obtida
  - Começa com `sk-ant-api03-`?
  - Tem em https://console.anthropic.com/account/keys?

- [ ] IDs do Instagram encontrados
  - Samuel: `17841402899155` (ou seu ID real)
  - Vista Mais: `17841402899155` (ou seu ID real)
  - Gestão: `17841402899155` (ou seu ID real)

### GitHub & Git

- [ ] Conta GitHub criada
  - https://github.com/seu-usuario

- [ ] Repositório criado
  - Nome: `instagram-samuel-automacao` (ou similar)
  - URL: `https://github.com/seu-usuario/instagram-samuel-automacao`

- [ ] Arquivos do projeto uploadados
  - package.json ✅
  - pages/index.tsx ✅
  - pages/api/generate-and-publish.ts ✅
  - .env.local ✅ (⚠️ não commita isso!)
  - .gitignore ✅
  - README.md ✅
  - next.config.js ✅
  - tsconfig.json ✅

- [ ] .gitignore está correto
  - Tem `.env.local` na lista?
  - Tem `node_modules/` na lista?

### Netlify

- [ ] Conta Netlify criada
  - https://netlify.com

- [ ] Conectado ao GitHub
  - Settings → Connected Services → GitHub ✅

- [ ] Repositório selecionado
  - Build command: `npm run build` ✅
  - Publish directory: `.next` ✅

- [ ] Variáveis de ambiente adicionadas
  - [ ] `NEXT_PUBLIC_INSTAGRAM_TOKEN`
  - [ ] `NEXT_PUBLIC_CLAUDE_API_KEY`
  - [ ] `NEXT_PUBLIC_SAMUEL_IG_ID`
  - [ ] `NEXT_PUBLIC_VISTA_IG_ID`
  - [ ] `NEXT_PUBLIC_GESTAO_IG_ID`

---

## 🧪 Testes Antes de Deploy

- [ ] **Teste local (opcional)**
  ```bash
  npm install
  npm run dev
  # Abre http://localhost:3000
  ```

- [ ] **Instagram token válido?**
  - Testa em: https://developers.facebook.com/tools/explorer
  - Query: `GET /me/accounts`
  - Deve retornar suas páginas

- [ ] **Claude API key válida?**
  - Testa em: https://console.anthropic.com/
  - Deve listar sua chave como "Ativa"

- [ ] **Contas do Instagram em "Business"?**
  - Settings → Account type → Business/Creator ✅

---

## ⚠️ Erros Comuns (Evitar)

- ❌ Commitar `.env.local` no GitHub
  - Solução: Adicione em `.gitignore`

- ❌ Esquecer variáveis de ambiente no Netlify
  - Solução: Site Settings → Environment → Add variable

- ❌ IDs do Instagram errados
  - Solução: Use Graph API Explorer para verificar

- ❌ Token do Instagram expirado
  - Solução: Gere um novo no Graph API Explorer

- ❌ Build command errado
  - Solução: Deve ser `npm run build` (exatamente assim)

- ❌ Publish directory errado
  - Solução: Deve ser `.next` (não é `.next/` nem `dist`)

---

## 📝 Dados para Ter à Mão

Antes de começar, anota esses dados em um lugar seguro:

```
Instagram Token: ____________________________________
Claude API Key: ____________________________________
Samuel IG ID: ____________________________________
Vista Mais IG ID: ____________________________________
Gestão IG ID: ____________________________________
GitHub Username: ____________________________________
GitHub Repo URL: ____________________________________
Netlify Site Name: ____________________________________
Netlify Site URL: ____________________________________
```

---

## 🚀 Ordem Recomendada (Passo a Passo)

1. ✅ Verificar tokens (Instagram + Claude)
2. ✅ Encontrar IDs do Instagram
3. ✅ Criar conta GitHub
4. ✅ Criar repositório GitHub
5. ✅ Upload de arquivos
6. ✅ Criar conta Netlify
7. ✅ Conectar Netlify com GitHub
8. ✅ Adicionar variáveis de ambiente
9. ✅ Iniciar deploy
10. ✅ Esperar 2-3 minutos
11. ✅ Testar o app!

---

## 💚 Status Final

Quando tudo estiver pronto:

```
✅ Tokens validados
✅ IDs encontrados
✅ GitHub setup completo
✅ Netlify conectado
✅ Variáveis de ambiente setadas
✅ Build iniciado

🎉 PRONTO PARA USAR!
```

---

## 📞 Se algo der errado

1. **Primeiro:** Lê `DEPLOY_GUIA.md` de novo
2. **Depois:** Verifica os logs do Netlify (Deploy → Logs)
3. **Se não funcionar:** Me chama!

WhatsApp: (13) 98100-5617

---

**Boa sorte, Samuel!** 🚀

Quando terminar, seu app estará **100% operacional** e você consegue publicar posts profissionais em **menos de 1 minuto**!
