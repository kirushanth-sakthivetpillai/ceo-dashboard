# http://uwsgi.readthedocs.org/en/latest/tutorials/Django_and_nginx.html
# http://www.jeffknupp.com/blog/2013/12/18/starting-a-django-16-project-the-right-way/
# 

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install nginx mysql-server libmysqlclient-dev libxml2-dev libxslt-dev git build-essential python python-django python-pip python-dev python-virtualenv python-mysqldb 

### NOTE: issues with virtualenvwrapper and sudo
# sudo pip install virtualenvwrapper


# # put in shell's start-up file (.zshrc, .bashrc, .profile, etc).
# # source run file after
# vim ~/.bashrc
# export WORKON_HOME=$HOME/.virtualenvs
# export PROJECT_HOME=$HOME/ksakthivel
# source /usr/local/bin/virtualenvwrapper.sh
# # exit vim
# source ~/.bashrc

cd /
mkdir www
cd www
# mkvirtualenv ksakthivel

sudo pip install -U pip
sudo pip install -U Django
sudo pip install -U uwsgi
sudo pip install -U fabric
sudo pip install -r requirements.txt

# pip freeze
# which django-admin.py
# confirm packages in right bin

cd /
# setting right permissions
sudo chmod -R u+rwX,go+rX,go-w /www
sudo chown -R www-data:www-data /www

# NGINX / UWSGI
# copy nginx config to /etc/nginx
sudo cp -R /www/ksakthivel-com/setup/nginx/* /etc/nginx/
sudo ln -s /etc/nginx/sites-available/dev /etc/nginx/sites-enabled/dev
sudo fuser -k 80/tcp
sudo service nginx restart

sudo uwsgi --ini /www/ksakthivel-com/setup/uwsgi/dev.ksakthivel.ini 
# ksakthivel.com should RESOVLE !!

cd $APP_NAME
# ready to go
# add git remote
# start commiting

