import { PersistedState } from 'runed';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

export const theme = new PersistedState<Theme>('theme', 'system');

export function resolveTheme(preference: Theme): 'light' | 'dark' {
	if (preference === 'system') {
		if (browser) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return 'light';
	}
	return preference;
}
