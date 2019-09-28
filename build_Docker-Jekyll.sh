docker run -it --name build-jekyll --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll build -d public
