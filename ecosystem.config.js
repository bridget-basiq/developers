module.exports = {
  apps: [
    {
      name: 'dev-portal',
      env: {
        NODE_ENV: 'production',
      },
      script: '',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-130-129-10.eu-west-2.compute.amazonaws.com',
      key: '~/.ssh/dev-portal.pem',
      ref: 'origin/main',
      repo: 'git@github.com:chargetrip/chargetrip-developers.git',
      path: '/home/ubuntu/dev-portal',
      'post-deploy':
        'git checkout main && git pull origin main && git branch -D fix/dev-portal/content-edit && git checkout -b fix/dev-portal/content-edit && npm install && pm2 restart all',
    },
  },
}
