// @ts-check
import { RuleConfigSeverity } from '@commitlint/types'

export default {
  ignores: [(commit: string) => commit.startsWith('init: ')],
  // extends: ['@commitlint/config-conventional'],
  rules: {
    // 'body-empty': [RuleConfigSeverity.Error, 'never'],
    'body-leading-blank': [RuleConfigSeverity.Error, 'never'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'type-enum': [RuleConfigSeverity.Error, 'always', ['docs', 'fix', 'opt', 'feat', 'build']],
    // 'scope-empty': [RuleConfigSeverity.Error, 'never'],
  },
}
