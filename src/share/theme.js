import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// 创建一个主题的实例。
export default createMuiTheme({
  palette: {
    primary: {
      main: '#07a2b9',
    },
    secondary: {
      main: '#099da6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});