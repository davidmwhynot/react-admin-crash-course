import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { defaultTheme } from './themes';

export const Providers: React.FC = ({ children }) => (
	<MuiThemeProvider theme={defaultTheme}>
		<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
	</MuiThemeProvider>
);
