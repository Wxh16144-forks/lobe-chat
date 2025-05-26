import { memo } from 'react';

import Thinking from '@/components/Thinking';
import { ARTIFACT_THINKING_TAG } from '@/const/plugin';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/selectors';

import { MarkdownElementProps } from '../type';
import { isTagClosed } from '../utils';

const Render = memo<MarkdownElementProps>(({ children, id }) => {
  const [isGenerating] = useChatStore((s) => {
    const message = chatSelectors.getMessageById(id)(s);
    return [!isTagClosed(ARTIFACT_THINKING_TAG, message?.content)];
  });
  const bubbleTransition = useUserStore(userGeneralSettingsSelectors.bubbleTransition);

  return (
    <Thinking
      content={children as string}
      style={{ width: isGenerating ? '100%' : undefined }}
      thinking={isGenerating}
      thinkingAnimated={bubbleTransition === 'smooth' ? isGenerating : false}
    />
  );
});

export default Render;
