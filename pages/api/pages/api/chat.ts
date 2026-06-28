import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;

    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'CLAUDE_API_KEY não encontrada',
      });
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Samuel Faria, falando com você.\n\nCrie um conteúdo para Instagram:\n${prompt}\n\nTom: Direto, autoridade, máximo 5 hashtags sobre Mercado Pago e empreendedorismo.`,
      }],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';

    return res.status(200).json({
      success: true,
      preview: content,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Erro ao processar',
    });
  }
}
