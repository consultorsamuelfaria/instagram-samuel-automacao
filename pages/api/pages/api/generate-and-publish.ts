 import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Faltam dados',
      });
    }

    const client = new Anthropic({
      apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
    });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Crie um conteúdo para Instagram: ${prompt}`,
        },
      ],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';

    return res.status(200).json({
      success: true,
      message: 'Conteúdo gerado!',
      preview: content,
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
