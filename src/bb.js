export let bb = null;

const getBb = () => {
  if (!bb) {
    bb = require('billboard.js').bb;
  }

  return bb;
};

export default getBb;
