FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Copy the entire contents of "though-cloud" recursively
COPY dist/though-cloud/* .
