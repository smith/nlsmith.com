/** @fileOverview Page layout and data loading functions
 *  @author Nathan L Smith
 *  @date August 13, 2008
 */

// Override the automatic injection of the client framework
Jaxer.response.setClientFramework();

(function () {
    // Path to site files
    var documentRoot = "file://" + 
      (Jaxer.request.documentRoot || "/var/www/nlsmith.com/");
    var privateLibDir = documentRoot + "jaxer-include/js/";
    var path = Jaxer.request.current.path || ""; // Current path

    // Load external libraries or abort
    try {
      Jaxer.load(privateLibDir + "prototype.js");
      Jaxer.load(privateLibDir + "argo.js");
    } catch (e) { 
      Jaxer.Log.warn(e);
      return; 
    }

    // This is a flat JSON file which is a placeholder for the site object db
    var site = (Jaxer.File.read(documentRoot + 
        "jaxer-include/json/site.json") || "").evalJSON() || {};

    // Get the page object based on the path
    var page = ((site.pages || []).find(function (p) {
        return p.path === path;
    })) || {};

    /**
     * Put stylesheets in the document head
     */
    (function insertStylesheets() {
        // Sheets for all pages and this page
        (site.stylesheets || []).concat(page.stylesheets || []).each(
            function (sheet) {
                sheet.rel = sheet.rel || "stylesheet";
                $$("head")[0].insert(new Element("link", sheet));
            }
        ); 
    })();

    /**
     * Create the page layout
     */
    (function doLayout() {
        var body;
        var content;
        var layout = {
            root : documentRoot + "jaxer-include/html",
            name : page.layout || site.layout || "site"
        }

        try {
          layout.template = Jaxer.File.read(
              "#{root}/#{name}.layout.html".interpolate(layout)
          );
        } catch (e)  { 
          Jaxer.Log.warn("Could not apply layout '" + layout.name + "'");
        }
        
        // Put the content into the 'content' element of the layout
        if (layout.template) { 
            body = $$("body")[0] || {};
            content = body.innerHTML || "";
            body.innerHTML = layout.template;
            if ($('content')) { $('content').innerHTML = content; }
        }
    })();

    /**
     * Set the page title
     */
    // TODO: Use site.map to populate all title parts
    (function setTitle() {
        var parts = [site.title || null];
        var separator = " &raquo; ";
        var title = $$('title')[0] || new Element('title');
        var text = parts.join(separator);

        if ($$('title').length === 0) { 
            $$('head')[0].insert(title);
        }
        title.update(text); 
    })();

    // Stuff below here is page specific and probably should be handled 
    // somewhere else

    if (path === "/contact" && Jaxer.request.method === "POST") {
        /** 
         * Handle submission of the contact form 
         */
        (function contactAction() {
            var submitted = false;
            var errorMessage = "Please fill in the required fields.";
            var successMessage = "Thank you for your comments.";
            var mailOptions = {
                to : "nate@nlsmith.com",
                subject : "Contact Form Results"
            }
            var params = Jaxer.request.data || {};
            var requiredFields = ["name", "email", "msg"];
            var body = "";

            // Attempt send if all fields are present
            if (requiredFields.all(function (field) { 
                return params[field] && !params[field].empty(); })
               ) { 
                body = ("Name : #{name}\n\nEmail: #{email}\n\nWebsite: #{website}\n\n" +
                    "Message : #{msg}").interpolate(params);
                Object.extend(mailOptions, {
                    from : "#{email} (#{name})".interpolate(params),
                    body : body
                });
                new argo.MailMessage(mailOptions).send();
                submitted = true;
            } else {
                requiredFields.each(function (field) {
                    if (!params[field] || params[field].empty()) {
                        $(field).addClassName('contacterror');
                    }
                });
                Object.keys(params).each(function (key) { // Repopulate fields
                    if ($(key)) {
                        $(key).value = params[key] || "";
                     }
                });
            }
            
            if ($('contact') && $('errors')) {
                if (submitted) {
                    $('contact').update('<p>' + successMessage + '</p>');
                } else { 
                    $('errors').update('<p>' + errorMessage + '</p>'); 
                }
            }
        })();
    }

    // Links page
    if (path === "/links") {
      /**
       * Insert link to del.icio.us RSS feed
       */
      // TODO: RSS for all pages
      (function addRSS() {
        $$('head')[0].insert(new Element('link', {
          rel : "alternate",
          type : "application/rss+xml",
          href : "http://feeds.delicious.com/rss/nlsmith",
          title : "NL Smith del.icio.us RSS Feed"
        }));
      })();

      /**
       * Update the empty list on the page with the list of del.icio.us links
       */
      (function addLinks() {
        if ($('links')) {
          $('links').update((new argo.DeliciousFeed({ 
            user : "nlsmith" 
          }).toHTML()));
        }
      })();
    } 
})();
