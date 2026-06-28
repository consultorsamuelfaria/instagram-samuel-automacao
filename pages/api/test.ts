import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const vars = {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '✅ OK' : '❌ FALTANDO',
      INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN ? '✅ OK' : '❌ FALTANDO',
      NEXT_PUBLIC_CLAUDE_API_KEY: process.env.NEXT_PUBLIC_CLAUDE_API_KEY ? '✅ OK' : '❌ FALTANDO',
      NEXT_PUBLIC_SAMUEL_IG_ID: process.env.NEXT_PUBLIC_SAMUEL_IG_ID ? '✅ OK' : '❌ FALTANDO',
      NEXT_PUBLIC_VISTA_IG_ID: process.env.NEXT_PUBLIC_VISTA_IG_ID ? '✅ OK' : '❌ FALTANDO',
      NEXT_PUBLIC_GESTAO_IG_ID: process.env.NEXT_PUBLIC_GESTAO_IG_ID ? '✅ OK' : '❌ FALTANDO',
    };

    return res.status(200).json({
      success: true,
      message: 'Variáveis carregadas',
      variables: vars
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
