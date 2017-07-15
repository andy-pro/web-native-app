var replace = require('replace-in-file');

var target = process.argv[2];
console.log('Switch to ' + '\033[1;33m' + target + '\033[0m');

const opts = {
  // export * from '../browser/components' <--> export * from '../native/components'
  // export * from '../browser/styles' <--> export * from '../native/styles'
  // import { G, Path } from '../browser/components' <--> import { G, Path } from '../native/components'
  files: ['src/common/components.js', 'src/common/styles.js', 'src/common/svgs.js'],
  from: /from '..\/(browser|native)\//,
  to: `from '../${target}/`,
};

try {
  let changedFiles = replace.sync(opts);
  console.log('Modified files:', changedFiles.join(', '));
  console.log('OK');
} catch (error) {
  console.error('Error occurred:', error);
}
