// Attempt to load the private site script
try {
    Jaxer.load("file://" + Jaxer.request.documentRoot + 
        "jaxer-include/js/application.js");
} catch (e) { 
    Jaxer.Log.warn(e);
}
