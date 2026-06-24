#!/bin/bash
# Автопродление сертификата Let's Encrypt + перезагрузка nginx
cd "$HOME/TBGroup-WebSite" || exit 1
docker run --rm \
  -v "$HOME/TBGroup-WebSite/certbot/conf":/etc/letsencrypt \
  -v "$HOME/TBGroup-WebSite/certbot/www":/var/www/certbot \
  certbot/certbot renew --quiet
docker compose exec -T nginx nginx -s reload
