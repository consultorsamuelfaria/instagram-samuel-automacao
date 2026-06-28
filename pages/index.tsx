// pages/index.tsx
import React, { useState } from 'react';

export default function Home() {
  const [selectedAccount, setSelectedAccount] = useState<'samuel' | 'vista' | 'gestao'>('samuel');
  const [selectedType, setSelectedType] = useState<'carousel' | 'video'>('carousel');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('');

  const accounts = {
    samuel: {
      name: '@consultorsamuelfariaoficial',
      label: 'Samuel Faria',
      emoji: '👨‍💼',
    },
    vista: {
      name: '@vistamaisoficial',
      label: 'Vista Mais',
      emoji: '🎨',
    },
    gestao: {
      name: '@intelicredgestao',
      label: 'Sistema Gestão',
      emoji: '⚙️',
    },
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      setError('Por favor, descreva o conteúdo que deseja criar');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-and-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: selectedAccount,
          contentType: selectedType,
          prompt: prompt,
          audioTranscript: audioTranscript,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPreview(data.preview);
        setError('');
      } else {
        setError(data.error || 'Erro ao gerar conteúdo');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Aqui você poderia enviar para um serviço de transcrição
        // Por enquanto, apenas marcaremos como gravado
        setAudioTranscript('[Áudio gravado - será transcrito na publicação]');
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Parar após 30 segundos
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 30000);
    } catch (err) {
      setError('Erro ao acessar microfone');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📱 Instagram Automático Samuel</h1>
        <p style={styles.subtitle}>Crie e publique conteúdo em segundos</p>
      </div>

      <div style={styles.card}>
        {/* Seletor de Conta */}
        <div style={styles.section}>
          <label style={styles.label}>📌 Escolha a Conta</label>
          <div style={styles.accountsGrid}>
            {Object.entries(accounts).map(([key, acc]) => (
              <div
                key={key}
                onClick={() => setSelectedAccount(key as 'samuel' | 'vista' | 'gestao')}
                style={{
                  ...styles.accountButton,
                  borderColor: selectedAccount === key ? '#3483FF' : 'rgba(255, 184, 0, 0.2)',
                  backgroundColor: selectedAccount === key ? 'rgba(52, 131, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={styles.accountEmoji}>{acc.emoji}</div>
                <div style={styles.accountName}>{acc.name}</div>
                <div style={styles.accountLabel}>{acc.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipo de Conteúdo */}
        <div style={styles.section}>
          <label style={styles.label}>📸 Tipo de Conteúdo</label>
          <div style={styles.typeGrid}>
            <div
              onClick={() => setSelectedType('carousel')}
              style={{
                ...styles.typeButton,
                borderColor: selectedType === 'carousel' ? '#FFB800' : 'rgba(255, 184, 0, 0.2)',
                backgroundColor: selectedType === 'carousel' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={styles.typeEmoji}>🎨</div>
              <div style={styles.typeName}>Carrossel</div>
              <div style={styles.typeDesc}>3 a 10 imagens</div>
            </div>
            <div
              onClick={() => setSelectedType('video')}
              style={{
                ...styles.typeButton,
                borderColor: selectedType === 'video' ? '#FFB800' : 'rgba(255, 184, 0, 0.2)',
                backgroundColor: selectedType === 'video' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={styles.typeEmoji}>🎬</div>
              <div style={styles.typeName}>Vídeo</div>
              <div style={styles.typeDesc}>Upload ou gravar</div>
            </div>
          </div>
        </div>

        {/* Entrada de Prompt */}
        <div style={styles.section}>
          <label style={styles.label}>✍️ O que você quer criar?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: 3 dicas para aumentar vendas no Mercado Pago com Sistema de Gestão..."
            style={styles.textarea}
          />
          <div style={styles.hint}>
            💡 Seja descritivo: tema, tom, público-alvo
          </div>
        </div>

        {/* Áudio */}
        <div style={styles.section}>
          <label style={styles.label}>🎤 Ou grava um áudio</label>
          <button
            onClick={startRecording}
            disabled={isRecording}
            style={{
              ...styles.audioButton,
              opacity: isRecording ? 0.5 : 1,
            }}
          >
            {isRecording ? '⏹️ Gravando... (30s)' : '🎤 Começar a gravar'}
          </button>
          {audioTranscript && (
            <div style={styles.audioTranscript}>{audioTranscript}</div>
          )}
        </div>

        {/* Erro */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Botão Gerar */}
        <button
          onClick={handleGenerateContent}
          disabled={isLoading}
          style={{
            ...styles.generateButton,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? '⏳ Gerando...' : '🚀 GERAR E PUBLICAR'}
        </button>
      </div>

      {/* Preview */}
      {preview && (
        <div style={styles.preview}>
          <h2 style={styles.previewTitle}>📋 Preview do Conteúdo</h2>
          <div style={styles.previewContent}>
            {preview.split('\n').map((line, i) => (
              <p key={i} style={styles.previewLine}>
                {line}
              </p>
            ))}
          </div>
          <button
            onClick={handleGenerateContent}
            style={styles.publishButton}
          >
            ✅ PUBLICAR AGORA
          </button>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <p>✨ Conteúdo gerado inteligentemente | Token seguro | Pronto para escala</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: 'linear-gradient(135deg, #0D1425 0%, #1a1f35 100%)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    color: '#FFB800',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    textShadow: '0 2px 10px rgba(255, 184, 0, 0.3)',
  },
  subtitle: {
    color: '#B0B8CC',
    fontSize: '14px',
    margin: '0',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)',
    maxWidth: '900px',
    margin: '0 auto 2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  label: {
    color: '#FFB800',
    fontSize: '14px',
    fontWeight: 600,
    display: 'block',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  accountsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  accountButton: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  accountEmoji: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  accountName: {
    color: '#FFB800',
    fontWeight: 600,
    fontSize: '14px',
  },
  accountLabel: {
    color: '#B0B8CC',
    fontSize: '12px',
    marginTop: '4px',
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  typeButton: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  typeEmoji: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  typeName: {
    color: '#FFB800',
    fontWeight: 600,
    fontSize: '14px',
  },
  typeDesc: {
    color: '#B0B8CC',
    fontSize: '12px',
    marginTop: '4px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 184, 0, 0.2)',
    borderRadius: '12px',
    padding: '12px',
    color: '#FFFFFF',
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'none',
  } as React.CSSProperties,
  hint: {
    color: '#B0B8CC',
    fontSize: '12px',
    marginTop: '8px',
  },
  audioButton: {
    width: '100%',
    background: 'rgba(52, 131, 255, 0.2)',
    border: '1px solid #3483FF',
    borderRadius: '12px',
    padding: '12px',
    color: '#3483FF',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
  audioTranscript: {
    color: '#B0B8CC',
    fontSize: '12px',
    marginTop: '8px',
    padding: '8px 12px',
    background: 'rgba(52, 131, 255, 0.1)',
    borderRadius: '8px',
    borderLeft: '3px solid #3483FF',
  },
  error: {
    color: '#FF6B6B',
    fontSize: '13px',
    marginBottom: '16px',
    padding: '12px',
    background: 'rgba(255, 107, 107, 0.1)',
    borderRadius: '8px',
    borderLeft: '3px solid #FF6B6B',
  },
  generateButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #FFB800 0%, #FFC933 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    color: '#0D1425',
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(255, 184, 0, 0.3)',
  } as React.CSSProperties,
  preview: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(52, 131, 255, 0.3)',
    borderRadius: '16px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    maxWidth: '900px',
    margin: '0 auto 2rem',
  },
  previewTitle: {
    color: '#3483FF',
    fontSize: '18px',
    margin: '0 0 1rem 0',
  },
  previewContent: {
    color: '#B0B8CC',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  previewLine: {
    margin: '4px 0',
  },
  publishButton: {
    width: '100%',
    background: '#3483FF',
    border: 'none',
    borderRadius: '12px',
    padding: '12px',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    color: '#B0B8CC',
    fontSize: '12px',
  },
};
