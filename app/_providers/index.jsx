import { BalancerProvider } from './balancer';
import { LanguageProvider } from './i18n';
import { StyledComponentsRegistry } from './styled-components';

export { useTranslation } from './i18n';

/** @param {import('react').PropsWithChildren<unknown>} */
export function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <BalancerProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </BalancerProvider>
    </StyledComponentsRegistry>
  );
}
