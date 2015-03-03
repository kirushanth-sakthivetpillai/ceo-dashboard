from fabric.api import lcd, local

def deploy_prod():
    with lcd('/www/ksakthivel-com/'):
        local('sudo cp -R /www/ksakthivel-com/setup/nginx/* /etc/nginx/')
       	local('sudo rm -rf /etc/nginx/sites-enabled/prod')
        local('sudo rm -rf /etc/nginx/sites-enabled/default')
        local('sudo ln -s /etc/nginx/sites-available/prod /etc/nginx/sites-enabled/prod')
        local('sudo fuser -k 80/tcp')
        local('sudo service nginx restart')
        local('sudo uwsgi --ini /www/ksakthivel-com/setup/uwsgi/prod.ksakthivel.ini')

def deploy_local():
    with lcd('/vagrant/src/ksakthivel-com/'):
        local('sudo cp -R /vagrant/src/ksakthivel-com/setup/nginx/* /etc/nginx/')
        local('sudo rm -rf /etc/nginx/sites-enabled/dev')
        local('sudo rm -rf /etc/nginx/sites-enabled/default')
        local('sudo ln -s /etc/nginx/sites-available/dev /etc/nginx/sites-enabled/dev')
        local('sudo fuser -k 80/tcp')
        local('sudo service nginx restart')
        local('sudo uwsgi --ini /vagrant/src/ksakthivel-com/setup/uwsgi/dev.ksakthivel.ini')