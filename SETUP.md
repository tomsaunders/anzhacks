Setting up your computer to run anzhacks
========================================


anzhacks on the FB side has been configured to expect login requests from anzhacks.com


to get this working, I had to:


* add an /etc/hosts entry for 127.0.0.1 anzhacks.com
* add an apache vhosts config in /etc/apache2/extra/httpd-vhosts.conf saying
    <VirtualHost *:80>
        DocumentRoot "/Users/tom/Sites/anzhacks"
        ServerName anzhacks.com
    </VirtualHost>
where /Users/tom/Sites is set up as my apache document root
or, if you don't have ~/Sites set as your root:
    <VirtualHost *:80>
        DocumentRoot "/Users/<YOURUSERNAME>/<ANZHACKS>/www"
        ServerName anzhacks.com
        <Directory /Users/<YOURUSERNAME>/<ANZHACKS>/www >
            Order allow,deny
            Allow from all
        </Directory>
    </VirtualHost>
where <ANZHACKS> is project directory with www.
* Modify /etc/apache2/httpd.conf to enable the vhosts config.  Uncomment line:
    Include /private/etc/apache2/extra/httpd-vhosts.conf
* sudo apachectl restart
* if you go to http://anzhacks.com your computer has been told that routes to 127.0.0.1 and apache knows to listen for it
* these are OSX instructions. sorry Lucas! Start by installing WAMPServer
