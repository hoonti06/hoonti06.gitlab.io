RUN_JEKYLL="bundle exec jekyll serve -H 0.0.0.0 --trace"
if [  "$PWD" = "/srv/jekyll" ]; then
	$RUN_JEKYLL
else
	INSTANCE_NAME="blog"
	WORKING_DIR=/srv/jekyll
	DOCKER_IMAGE=hoonti06/hoonti06.gitlab.io-env
	SCRIPT_TO_EXECUTE_IN_CONTAINER_SHELL="cd ${WORKING_DIR}; \
										  bundle install; \
										  ${RUN_JEKYLL}; \
										  exec \"\${SHELL:-sh}\""

	docker stop $INSTANCE_NAME
	docker rm $INSTANCE_NAME

	docker run -it --name $INSTANCE_NAME \
		--volume="${PWD}:${WORKING_DIR}" \
		-p 4000:4000 \
		$DOCKER_IMAGE /bin/bash -c "$SCRIPT_TO_EXECUTE_IN_CONTAINER_SHELL"
fi

