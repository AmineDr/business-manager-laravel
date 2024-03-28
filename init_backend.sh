cd ./spark-lumen;
echo 'APP_NAME=BusinessManager
APP_ENV=production
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8001

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=business_manager
DB_USERNAME=bmuser
DB_PASSWORD=GDSlogin69' > .env;
composer install --no-dev --optimize-autoloader;
php artisan migrate --force;
systemctl restart nginx.service;