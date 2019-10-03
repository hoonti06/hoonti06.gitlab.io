INSTANCE_NAME="blog"
WORKING_DIR=/srv/jekyll

docker rm $INSTANCE_NAME

docker run -it --name $INSTANCE_NAME \
	--volume="$PWD:/srv/jekyll" \
	--network host \
	hoonti06/ruby-pandoc-node /bin/bash -c '\
	cd /srv/jekyll; \
	bundle install; \
	bundle exec jekyll serve --watch --trace; \
	exec "${SHELL:-sh}" '

