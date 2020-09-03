FROM httpd:alpine 
RUN rm -r /usr/local/apache2/htdocs/*
RUN rm -r /usr/local/apache2/conf/httpd.conf
RUN mkdir /usr/local/apache2/htdocs/credit_contract_ui
COPY httpd.config /usr/local/apache2/conf/httpd.conf
COPY ./dist/ /usr/local/apache2/htdocs/credit_contract_ui/ 
RUN chmod -R 755 /usr/local/apache2/htdocs/credit_contract_ui/
EXPOSE 80