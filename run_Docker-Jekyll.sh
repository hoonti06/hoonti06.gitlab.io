docker rm blog
docker run -it --name blog --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve --watch --trace
