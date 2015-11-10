Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    // Need  meteor add check
    check(doc, Schema.contact);

    // Build the e-mail text
    var text = "Name: " + doc.name + "\n\n"
            + "Email: " + doc.email + "\n\n\n\n"
            + doc.message;

    this.unblock();

    console.log("Email will be sent " + doc.name + " " + doc.email);

    // Simulate an error:
    //throw new Meteor.Error( 500, 'There was an error processing your request' );

    // Send the e-mail
    // Email.send({
    //     to: "test@example.com",
    //     from: doc.email,
    //     subject: "Website Contact Form - Message From " + doc.name,
    //     text: text
    // });
  }
});