import { ActionIconGroup, Block } from '@lobehub/ui';
import { ChatItem } from '@lobehub/ui/chat';
import { useTheme } from 'antd-style';
import { RotateCwIcon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_INBOX_AVATAR } from '@/const/meta';

const data = `
### Features

**Key Highlights**
- 🌐 Multi-model: GPT-4/Gemini/Ollama
- 🖼️ Vision: \`gpt-4-vision\` integration
- 🛠️ Plugins: Function Calling & real-time data
`;

const streamingSpeed = 25; // ms

interface MarkdownPreviewProps {
  animated?: boolean;
}

const MarkdownPreview = memo<MarkdownPreviewProps>(({ animated }) => {
  const [streamedContent, setStreamedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const { t } = useTranslation('common');
  const token = useTheme();

  useEffect(() => {
    if (!isStreaming) return;

    let currentPosition = 0;
    if (streamedContent.length > 0) {
      currentPosition = streamedContent.length;
    }

    const intervalId = setInterval(() => {
      if (currentPosition < data.length) {
        // Stream character by character
        const nextChunkSize = Math.min(3, data.length - currentPosition);
        const nextContent = data.slice(0, Math.max(0, currentPosition + nextChunkSize));
        setStreamedContent(nextContent);
        currentPosition += nextChunkSize;
      } else {
        clearInterval(intervalId);
        setIsStreaming(false);
      }
    }, streamingSpeed);

    return () => clearInterval(intervalId);
  }, [isStreaming, streamedContent.length]);

  const handleReset = () => {
    setStreamedContent('');
    setIsStreaming(true);
  };

  return (
    <Block
      style={{
        background: token.colorBgContainerSecondary,
        marginBlock: 16,
        minHeight: 280,
        paddingBottom: 16,
      }}
    >
      <ChatItem
        actions={
          <ActionIconGroup
            items={[
              {
                icon: RotateCwIcon,
                key: 'reset',
                onClick: handleReset,
                title: t('reset'),
              },
            ]}
            size="small"
          />
        }
        avatar={{
          avatar: DEFAULT_INBOX_AVATAR,
        }}
        markdownProps={{
          animated: animated,
        }}
        message={streamedContent}
        variant='bubble'
        width={'100%'}
      />
    </Block>
  );
});

export default MarkdownPreview;
