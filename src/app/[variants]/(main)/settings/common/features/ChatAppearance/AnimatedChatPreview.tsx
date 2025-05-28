import { ActionIconGroup, Block } from '@lobehub/ui';
import { ChatItem } from '@lobehub/ui/chat';
import { useTheme } from 'antd-style';
import { RotateCwIcon } from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_INBOX_AVATAR } from '@/const/meta';

const data = `
### Features

**Key Highlights**
- 🌐 Multi-model: GPT-4/Gemini/Ollama
- 🖼️ Vision: \`gpt-4-vision\` integration
- 🛠️ Plugins: Function Calling & real-time data
`;

const streamingSpeed = 25; // ms per character

interface AnimatedChatPreviewProps {
  transitionMode: 'routine' | 'smooth' | 'stream';
}

const randomInlRange = (min = 0, max = min + 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedChatPreview = memo<AnimatedChatPreviewProps>(({ transitionMode }) => {
  const [streamedContent, setStreamedContent] = useState(() => {
    if (transitionMode === 'routine') {
      return data.slice(0, Math.max(0, randomInlRange(10, 100)));
    }
    return '';
  });

  const chunkStep = useMemo(() => {
    if (transitionMode === 'routine') {
      return Math.ceil(data.length / randomInlRange(3, 5));
    }
    return 3;
  }, [transitionMode]);

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
        const nextChunkSize = Math.min(chunkStep, data.length - currentPosition);
        const nextContent = data.slice(0, Math.max(0, currentPosition + nextChunkSize));
        setStreamedContent(nextContent);
        currentPosition += nextChunkSize;
      } else {
        clearInterval(intervalId);
        setIsStreaming(false);
      }
    }, streamingSpeed);

    return () => clearInterval(intervalId);
  }, [isStreaming, streamedContent.length, chunkStep]);

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
          animated: transitionMode === 'smooth',
        }}
        message={streamedContent}
        variant="bubble"
        width={'100%'}
      />
    </Block>
  );
});

export default AnimatedChatPreview;
