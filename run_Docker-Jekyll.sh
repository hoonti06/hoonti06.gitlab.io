INSTANCE_NAME="blog"
WORKING_DIR=/srv/jekyll
DOCKER_IMAGE=hoonti06/hoonti06.gitlab.io-env

docker rm $INSTANCE_NAME

docker run -it --name $INSTANCE_NAME \
	--volume="$PWD:/srv/jekyll" \
	--network host \
	$DOCKER_IMAGE /bin/bash -c '\
	cd /srv/jekyll; \
	bundle install; \
	bundle exec jekyll serve --trace; \
	exec "${SHELL:-sh}" '

