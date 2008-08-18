/**
 * @fileOverview Argo framework
 * @author Nathan L Smith
 * @date August 15, 2008
 */

/**
 * @namespace argo Server-side utility objects
 */
var argo = argo || {};

/**
 * Reads a del.icio.us JSON feed 
 */
argo.DeliciousFeed = Class.create(
/** @scope argo.DeliciousFeed.prototype */
{
  /** @constructs */
  initialize : function (options) {
    // Set defaults and extend them with the given object argument
    Object.extend(this, {
      count : 25,
      user : "",
      feed : "http://feeds.delicious.com/feeds/json/"
    });
    Object.extend(this, options || {});

    var url = this.feed + this.user + "?count=" + this.count;
    this.posts = [];

    // Make request for list
    eval(Jaxer.Web.get(url)); 

    try { 
      if (Delicious && Delicious.posts) { this.posts = Delicious.posts; }
      else { throw new Error(); }
    } catch (e) {
        Jaxer.Log.warn("Could not load Delicious posts");
    }
  },

  /**
   * Generate unordered HTML list items
   */
  toHTML : function () {
    var listItems = "";
    var template = '<li><a href="#{u}">#{d}</a>#{n}</li>\n';

    this.posts.each(function (post) {
      if(post.n) { post.n = '<p>' + post.n + '</p>'; }
      listItems += template.interpolate(post); 
    });

    this.HTML = listItems;
    return listItems;
  }
});

/**
* @class MailMessage For sending mail messages through SMTP. 
* Uses the Jaxer.SMTP.Message object.
*/
argo.MailMessage = Class.create(
/** @scope argo.MailMessage.prototype */
{
    /**
     * Default address that emails are sent from and to.
     * @type String
     */
    defaultAddress : "webmaster@nlsmith.com",

    /**
     * Initialize the mail message.
     * @param {Object} options An object describing the message.
     * @config {String} subject The message subject.
     * @config {String} from Address the message will be sent from.
     * @config {String} to Address the message will be sent to.
     * @config {String} body The message content.
     * @config {String} format The format of the message: "text" or "html".
     */
    initialize : function(options) {
        this.options = Object.extend({    
            subject : "",
            from : this.defaultAddress,
            to : this.defaultAddress,
            body : "",
            format : 'text' // Jaxer has text only?
        }, options || {});
    },

    /**
     * Send the message.
     */
    send : function() {
        var message = new Jaxer.SMTP.MailMessage();
        message.setSubject(this.options.subject);
        message.setFrom(this.options.from);
        message.addRecipient(this.options.to);
        message.setBody(this.options.body);

        Jaxer.SMTP.sendMessage("localhost", Jaxer.SMTP.DEFAULT_PORT, message);
    }
});

