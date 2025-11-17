FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

# Supprime la page par défaut de Nginx
RUN rm -rf ./*

# Copie l'intégralité de l'application statique
COPY . .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

