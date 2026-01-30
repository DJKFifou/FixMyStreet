module.exports = {
    apps: [
        {
            name: 'fixmystreet',
            cwd: '/var/www/fixmystreet',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3006',
            env: {
                NODE_ENV: 'production',
            }
        }
    ]
};