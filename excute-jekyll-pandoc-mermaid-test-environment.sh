#!/bin/bash

cd jekyll-pandoc-mermaid
gem build jekyll-pandoc-mermaid.gemspec
gem install jekyll-pandoc-mermaid-0.0.1.gem
cd ..
bundle exec jekyll serve --trace
