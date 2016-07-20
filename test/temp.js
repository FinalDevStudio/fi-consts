const CONSTS = require('../lib')({
  basedir: __dirname + '/consts',
  debug: true
});

console.dir(CONSTS, {
  colors: true,
  depth: 8
});

console.dir(require('../lib'), {
  colors: true,
  depth: 8
});
