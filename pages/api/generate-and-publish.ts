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

    // 1. Gerar conteúdo com Claude
    const fullPrompt = audioTranscript 
      ? `${audioTranscript}\n\nAgora crie um conteúdo para Instagram baseado nisso: ${prompt}`
      : prompt;

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Você é um especialista em criar conteúdo viral para Instagram do Mercado Pago e consultoria.

${contentType === 'carousel' 
  ? 'Crie um carrossel com 3 slides. Cada slide deve ter um título, corpo e call-to-action.' 
  : 'Crie um script de vídeo curto (30-60 segundos).'}

Tema: ${fullPrompt}

Sempre use:
- Tom direto e autoritário
- Abertura forte nos primeiros 3 segundos
- CTA claro
- Máximo 5 hashtags
- Foco em dor, solução e ação

Formato de resposta:
SLIDE 1:
Título: [título]
Corpo: [texto]
CTA: [call-to-action]

SLIDE 2:
...

HASHTAGS: #tag1 #tag2 #tag3 #tag4 #tag5`,
        },
      ],
    });

    const generatedContent = message.content[0].type === 'text' ? message.content[0].text : '';

    // 2. Publicar no Instagram via Meta API
    const igId = INSTAGRAM_IDS[account];
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

    let postId = null;

    if (contentType === 'carousel') {
      // Criar carrossel
      const caption = generatedContent.split('HASHTAGS:')[1]?.trim() || '';
      
      try {
        const response = await axios.post(
          `https://graph.instagram.com/v19.0/${igId}/media`,
          {
            media_type: 'CAROUSEL',
            children: [], // Aqui você adicionaria IDs de media criados antes
            caption: caption,
            access_token: accessToken,
          }
        );
        postId = response.data.id;
      } catch (error) {
        console.error('Erro ao publicar carrossel:', error);
      }
    } else if (contentType === 'video') {
      // Publicar vídeo
      try {
        const response = await axios.post(
          `https://graph.instagram.com/v19.0/${igId}/media`,
          {
            media_type: 'VIDEO',
            video_url: '', // URL do vídeo
            caption: generatedContent,
            access_token: accessToken,
          }
        );
        postId = response.data.id;
      } catch (error) {
        console.error('Erro ao publicar vídeo:', error);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Conteúdo criado e publicado em ${ACCOUNT_NAMES[account]}`,
      postId: postId || undefined,
      preview: generatedContent,
    });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar requisição',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}
