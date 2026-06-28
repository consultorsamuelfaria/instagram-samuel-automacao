 // pages/api/generate-and-publish.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

const client = new Anthropic();

interface RequestBody {
  account: 'samuel' | 'vista' | 'gestao';
  contentType: 'carousel' | 'video';
  prompt: string;
  audioTranscript?: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  postId?: string;
  imageUrl?: string;
  preview?: string;
  error?: string;
}

const INSTAGRAM_IDS = {
  samuel: process.env.NEXT_PUBLIC_SAMUEL_IG_ID,
  vista: process.env.NEXT_PUBLIC_VISTA_IG_ID,
  gestao: process.env.NEXT_PUBLIC_GESTAO_IG_ID,
};

const ACCOUNT_NAMES = {
  samuel: '@consultorsamuelfariaoficial',
  vista: '@vistamaisoficial',
  gestao: '@intelicredgestao',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { account, contentType, prompt, audioTranscript }: RequestBody = req.body;

    if (!account || !contentType || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Faltam dados obrigatórios',
      });
    }

    const fullPrompt = audioTranscript 
      ? `${audioTranscript}\n\nAgora crie um conteúdo para Instagram baseado nisso: ${prompt}`
      : prompt;

    // 1. Gerar conteúdo com Claude
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Você é um especialista em criar conteúdo viral para Instagram do Mercado Pago.

Crie um carrossel com 3 slides e uma descrição visual detalhada.

Tema: ${fullPrompt}

Sempre use:
- Tom direto e autoritário
- "Samuel Faria, falando com você."
- Máximo 5 hashtags sobre Mercado Pago, PIX, empreendedorismo
- Foco em dor, solução e ação

[CONTEUDO]
SLIDE 1: Título | Corpo | CTA
SLIDE 2: Título | Corpo | CTA
SLIDE 3: Título | Corpo | CTA
HASHTAGS: #tag1 #tag2 #tag3 #tag4 #tag5

[BRIEFING_VISUAL]
Descrição detalhada para gerar imagem: cores Azul #3483FF, Ouro #FFB800, Branco. Estilo profissional moderno.`,
        },
      ],
    });

    const generatedContent = message.content[0].type === 'text' ? message.content[0].text : '';

    const conteudoMatch = generatedContent.match(/\[CONTEUDO\]([\s\S]*?)\[BRIEFING_VISUAL\]/);
    const briefingMatch = generatedContent.match(/\[BRIEFING_VISUAL\]([\s\S]*?)$/);
    
    const conteudo = conteudoMatch ? conteudoMatch[1].trim() : generatedContent;
    const briefingVisual = briefingMatch ? briefingMatch[1].trim() : 'Professional carousel';

    // 2. Gerar imagem com DALL-E
    let imageUrl = 'https://via.placeholder.com/1080x1350/FFB800/FFFFFF?text=Samuel+Faria';
    const openaiKey = process.env.OPENAI_API_KEY;

    if (openaiKey) {
      try {
        const dallePrompt = `Professional Instagram carousel slide for Mercado Pago. ${briefingVisual}. Colors: Blue #3483FF, Gold #FFB800, White. 1080x1350px.`;
        
        const dalleResponse = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            prompt: dallePrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            model: 'dall-e-3'
          },
          {
            headers: {
              'Authorization': `Bearer ${openaiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (dalleResponse.data?.data?.[0]?.url) {
          imageUrl = dalleResponse.data.data[0].url;
        }
      } catch (dalleError) {
        console.error('DALL-E Error:', dalleError);
      }
    }

    // 3. Publicar no Instagram
    const igId = INSTAGRAM_IDS[account];
    const accessToken = process.env.INSTAGRAM_TOKEN;

    let postId = null;

    if (contentType === 'carousel' && imageUrl && accessToken && igId) {
      const caption = conteudo.split('HASHTAGS:')[1]?.trim() || conteudo;
      
      try {
        const response = await axios.post(
          `https://graph.instagram.com/v19.0/${igId}/media`,
          {
            image_url: imageUrl,
            caption: caption,
            access_token: accessToken,
          }
        );
        postId = response.data.id;
      } catch (error) {
        console.error('Instagram publish error:', error);
      }
    }

    return res.status(200).json({
      success: true,
      message: `✅ Conteúdo gerado com imagem!${postId ? ' Publicado no Instagram!' : ''}`,
      postId: postId || undefined,
      imageUrl: imageUrl,
      preview: conteudo,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}
