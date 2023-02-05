#FROM surnet/alpine-wkhtmltopdf:3.16.2-0.12.6-full as wkhtmltopdf
FROM node:alpine

MAINTAINER Joel <github.com/joelinfo19>


# Install required packages
#RUN apk update
#
#RUN apk add dmidecode
#RUN apk add ca-certificates
# RUN apk add dos2unix
#RUN apk add openssl
#RUN apk --no-cache add tzdata
#
#RUN mkdir /home/storage
#RUN mkdir /home/docs
ENV DB_CNN "DB"
ENV PORT "3000"

COPY ./ ./


RUN npm install

CMD ["npm","start"]
# ENTRYPOINT ["/home/run.sh"]
