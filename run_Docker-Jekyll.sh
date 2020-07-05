RUN_JEKYLL="bundle exec jekyll serve -H 0.0.0.0 --trace"
if [  "$PWD" = "/srv/jekyll" ]; then
	$RUN_JEKYLL
else
	INSTANCE_NAME="blog"
	WORKING_DIR=/srv/jekyll
	DOCKER_IMAGE=hoonti06/hoonti06.gitlab.io-env

	docker stop $INSTANCE_NAME
	docker rm $INSTANCE_NAME

	docker run -it --name $INSTANCE_NAME \
		--volume="$PWD:/srv/jekyll" \
		-p 4000:4000 \
		$DOCKER_IMAGE /bin/bash -c '\
		cd /srv/jekyll; \
		bundle install; \
		${RUN_JEKYLL}; \
		exec "${SHELL:-sh}" '
fi

