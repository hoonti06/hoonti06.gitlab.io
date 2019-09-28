docker run -it --name blog --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll build -d public
