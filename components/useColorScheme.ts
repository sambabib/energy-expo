import { useAppContext } from '@/context/AppContext';

export function useColorScheme() {
  const { colorScheme } = useAppContext();
  return colorScheme;
}
