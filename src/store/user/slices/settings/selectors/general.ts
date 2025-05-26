import { UserStore } from '../../../store';
import { currentSettings } from './settings';

const generalConfig = (s: UserStore) => currentSettings(s).general || {};

const neutralColor = (s: UserStore) => generalConfig(s).neutralColor;
const primaryColor = (s: UserStore) => generalConfig(s).primaryColor;
const fontSize = (s: UserStore) => generalConfig(s).fontSize;
const highlighterTheme = (s: UserStore) => generalConfig(s).highlighterTheme;
const mermaidTheme = (s: UserStore) => generalConfig(s).mermaidTheme;
const bubbleTransition = (s: UserStore) => generalConfig(s).bubbleTransition || 'smooth';

export const userGeneralSettingsSelectors = {
  bubbleTransition,
  config: generalConfig,
  fontSize,
  highlighterTheme,
  mermaidTheme,
  neutralColor,
  primaryColor,
};
