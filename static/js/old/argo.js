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

