import browserEnv from 'browser-env';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import raf from 'raf';

browserEnv();

global.requestAnimationFrame = window.requestAnimationFrame = raf;

enzyme.configure({
  adapter: new Adapter(),
});
