#!/bin/bash

cd jekyll-pandoc-mermaid
gem build jekyll-pandoc-mermaid.gemspec
gem install jekyll-pandoc-mermaid-1.0.2.gem
cd ..
bundle exec jekyll serve --trace
