set :css_dir, "stylesheets"
set :js_dir, "javascripts"
set :images_dir, "images"

activate :external_pipeline,
  name: :scss,
  command: "bin/scss source/stylesheets/all.scss source/stylesheets/all.css",
  source: "source/stylesheets"

redirect "office/index.html", to: "https://zoom.us/j/2362193845"
redirect "resume/index.html", to: "https://www.dropbox.com/s/7fbkbin8zwkqwdf/resume.md?dl=0"
redirect 'rat-pack', to: 'https://docs.google.com/presentation/d/1i-peXuymkhkzbNdhgA0LF4Son988kGWQjc8X8STpQ8w/'
redirect 'recent-react', to: 'https://docs.google.com/presentation/d/1pLWOnbZ8EntHfKU2tmg3Q-yzDKacE6uPdj1rpYSMz5I/'

activate :s3_sync do |s3_sync|
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
