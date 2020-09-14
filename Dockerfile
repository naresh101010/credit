FROM httpd:alpine
RUN rm -r /usr/local/apache2/htdocs/*
RUN rm -r /usr/local/apache2/conf/httpd.conf
ADD .htaccess /usr/local/apache2/htdocs/
ADD httpd.config /usr/local/apache2/conf/httpd.conf
ADD assets /usr/local/apache2/htdocs/assets
ADD data.json /usr/local/apache2/htdocs/
ADD favicon.png /usr/local/apache2/htdocs/
# ADD run.js /usr/local/apache2/htdocs/
ADD app_path.json /usr/local/apache2/htdocs/
ADD router.js /usr/local/apache2/htdocs/
ADD single_spa.js /usr/local/apache2/htdocs/
ADD index.html /usr/local/apache2/htdocs
RUN chmod -R 777 /usr/local/apache2/htdocs/
EXPOSE 80    