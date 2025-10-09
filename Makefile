# Makefile for the Jekyll snippets site
# Usage: make <target>

JEKYLL := bundle exec jekyll
JEKYLL_SERVE := $(JEKYLL) serve --livereload --incremental
DEST := _site

.PHONY: help install serve build clean preview deploy

help:
	@echo "Available targets:"
	@echo "  make install   # install Ruby gems via Bundler"
	@echo "  make serve     # install (if needed) and serve the site locally with live reload"
	@echo "  make build     # install (if needed) and build the site into $(DEST)"
	@echo "  make clean     # remove build artifacts"
	@echo "  make preview   # build the site and show where the files are"
	@echo "  make deploy    # placeholder for deployment (no-op unless configured)"

install:
	@echo "Installing Ruby gems via Bundler..."
	@bundle install

serve: install
	@echo "Serving site locally (http://127.0.0.1:4000)"
	@$(JEKYLL_SERVE)

build: install
	@echo "Building site into $(DEST)..."
	@$(JEKYLL) build --destination $(DEST)

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf $(DEST) .jekyll-cache .sass-cache

preview: build
	@echo "Site built. Open $(DEST)/index.html in your browser to preview."

deploy: build
	@echo "Deploy target not configured. If you want automated deployment, add commands here (e.g., rsync, gh-pages push, or GitHub Actions)."
