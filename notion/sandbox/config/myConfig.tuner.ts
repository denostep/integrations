import Tuner from 'http://localhost:8000/mod.ts';
import { urlToId } from '../../src/helpers.ts';

export default Tuner.tune({
  config: {
    'pageId': urlToId.page(
      'https://artpani.notion.site/d1ecc246b8304e08a780b9a312548064?pvs=4',
    ),
  },
});
