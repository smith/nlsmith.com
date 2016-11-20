set :css_dir, "stylesheets"
set :js_dir, "javascripts"
set :images_dir, "images"

activate :s3_sync do |s3_sync|
  s3_sync.after_build = true
  s3_sync.region = ENV["AWS_DEFAULT_REGION"]
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Build-specific configuration
configure :build do
  # Use relative URLs
  activate :relative_assets
end
