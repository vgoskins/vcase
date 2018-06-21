const args = ['start'];
const opts = { stdio: 'inherit', cwd: 'vgomock', shell: true };
require('child_process').spawn('npm', args, opts);
