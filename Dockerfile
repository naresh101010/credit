FROM httpd:2.4-alpine3.14 
RUN rm -r /usr/local/apache2/htdocs/*
RUN rm -r /usr/local/apache2/conf/httpd.conf
RUN mkdir /usr/local/apache2/htdocs/booking_ui
COPY httpd.config /usr/local/apache2/conf/httpd.conf
COPY ./dist/ /usr/local/apache2/htdocs/booking_ui/ 
RUN chmod -R 755 /usr/local/apache2/htdocs/booking_ui/
EXPOSE 80