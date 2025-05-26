import { memo } from 'react';

import Thinking from '@/components/Thinking';
import { useChatStore } from '@/store/chat';
import { aiChatSelectors } from '@/store/chat/selectors';
import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/selectors';

interface ReasoningProps {
  content?: string;
  duration?: number;
  id: string;
}

const Reasoning = memo<ReasoningProps>(({ content = '', duration, id }) => {
  const isReasoning = useChatStore(aiChatSelectors.isMessageInReasoning(id));
  const bubbleTransition = useUserStore(userGeneralSettingsSelectors.bubbleTransition);

  return (
    <Thinking
      content={content}
      duration={duration}
      thinking={isReasoning}
      thinkingAnimated={bubbleTransition === 'smooth' ? isReasoning : false}
    />
  );
});

export default Reasoning;
