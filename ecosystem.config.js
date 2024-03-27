module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'root',
      host : '155.133.22.183',
      ref  : 'origin/master',
      repo : 'git@github.com:AmineDr/business-manager-laravel.git',
      path : '/home/laravel-spark',
      'pre-deploy-local': './git_push.bat',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production && chmod +x ./init_backend.sh && chmod +x ./init_frontend.sh && ./init_backend.sh && ./init_frontend.sh',
      'pre-setup': '',
      "ssh_options": "ForwardAgent=yes"
    }
  }
};
