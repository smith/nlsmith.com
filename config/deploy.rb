set :application, "nlsmith"
set :user, "smith"
set :domain_name, "#{application}.com"
set :repository,  "git@github.com:#{user}/#{domain_name}.git"
set :deploy_to, "/home/#{user}/#{application}"
set :output_dir, "#{current_path}/__output"
set :scm, :git
set :deploy_via, :remote_cache
role :web, "localhost"

namespace :deploy do
  task :default do
    update
    generate
    clean
    symlink_static
  end

  task :generate do
    nh = ENV["NARWHAL_HOME"] || "/opt/narwhal"
    recipe = "#{nh}/packages/jesyll/bin/recipe"
    run("cd #{release_path} && #{recipe}")
  end

  task :clean do
    [".git*", "Capfile", "config", "TODO"].each do |f|
      run "rm -rf #{output_dir}/#{f}"
    end
  end

  task :symlink_static do
    ["video"].each do |d|
      run("ln -sf #{shared_path}/static/#{d} #{release_path}/static/#{d}")
    end
  end
end

namespace :deprec do
  namespace application do
    namespace :apache do
      task :config, :roles => [:web] do
        set_local_template_dir(__FILE__)
        conf(["/etc/apache2/sites-available/#{application}.com"])
        sudo "a2ensite #{domain_name}"
      end
      after "deprec:#{application}:apache:config", "deprec:apache:restart"
    end
  end
end if defined?(CramerDev::Deprec)
