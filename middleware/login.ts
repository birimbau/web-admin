import { Context } from '@nuxt/types';

export default (context: Context) => {
  if (!context.route.path.startsWith('/start')) {
    const items = window.sessionStorage.getItem('PHOTION_SESSION_CREDENTIALS');

    if (!items) {
      context.app.router?.push('/start');
    }
  }
};
