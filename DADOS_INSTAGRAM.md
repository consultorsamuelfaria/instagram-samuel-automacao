# 📱 IDs do Instagram (Como Encontrar)

Samuel, você precisa pegar os **IDs corretos** das suas 3 contas do Instagram.

---

## 📝 Dados que você precisa

Você tem 3 contas:
1. **@consultorsamuelfariaoficial** → ID: `?????`
2. **@vistamaisoficial** → ID: `?????`
3. **@intelicredgestao** → ID: `?????`

Agora vou te mostrar como achar esses IDs.

---

## 🔍 Método 1: Graph API Explorer (Recomendado)

1. **Acessa:** https://developers.facebook.com/tools/explorer

2. **Seleciona:**
   - Meta App: `Samuel Consultoria API` (a que criamos)
   - User or Page: `Consultorsamuelfariaoficial` (sua página)

3. **Na URL, muda para:**
   ```
   GET /me/instagram_business_account?fields=id
   ```

4. **Clica em "Submit"**

5. **Aparece algo assim:**
   ```json
   {
     "id": "17841402899155"
   }
   ```

6. **Copia esse ID (aquele número gigante) e salva**

---

## 🔄 Repetir Para as Outras Contas

Repete o mesmo processo trocando a Página:

1. **Para Vista Mais:**
   - User or Page: `Vistamaisoficial`
   - ID: `?????`

2. **Para Gestão:**
   - User or Page: `Intelicredgestao`
   - ID: `?????`

---

## 📋 Tabela para Preencher

Quando você tiver todos os IDs, preenche isso:

| Conta | @ Público | ID do Instagram | Token |
|-------|-----------|-----------------|-------|
| Samuel | @consultorsamuelfariaoficial | `?????` | ✅ Já temos |
| Vista Mais | @vistamaisoficial | `?????` | ✅ Mesmo token |
| Gestão | @intelicredgestao | `?????` | ✅ Mesmo token |

---

## ✏️ Colocando os IDs no App

Quando tiver os IDs, adiciona no **Netlify**:

1. **Site Settings → Environment**
2. **Adiciona:**

```
NEXT_PUBLIC_SAMUEL_IG_ID = (seu ID aqui)
NEXT_PUBLIC_VISTA_IG_ID = (seu ID aqui)
NEXT_PUBLIC_GESTAO_IG_ID = (seu ID aqui)
```

3. **Clica Deploy de novo**

---

## ⚠️ Importante

- Cada conta tem **seu próprio ID** (não é o número de seguidores)
- Os IDs são **números longos** (16+ dígitos)
- Todos usam o **mesmo token do Instagram**
- Os IDs **NÃO mudam** (fica seguro no `.env`)

---

## 🧪 Testando se os IDs Estão Certos

1. **No Graph API Explorer**
2. **Muda para:** `GET /{SEU_ID}?fields=username`
3. **Clica Submit**
4. **Se aparecer seu @, significa que o ID está certo!**

---

## 📞 Precisa de ajuda?

Se não achar os IDs:

1. **Verifica se suas contas estão em "Business"**
   - Settings → Account type → Business Account

2. **Verifica se a Página Facebook tá vinculada**
   - Instagram Settings → Linked accounts

3. **Testa novamente no Graph API Explorer**

**Se ainda não funcionar, me chama!**
WhatsApp: (13) 98100-5617

---

**Depois de ter os IDs, seu app está 100% funcional!** ✅
