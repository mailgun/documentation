Discontinuing POP3/IMAP Mailboxes
#################################

As we've previously communicated over the last 12 months, Mailgun is discontinuing our POP3/IMAP 
Mailbox service at 11:59 PM PT on February 23, 2014. If you still need POP3/IMAP access to your email, 
we suggest migrating to `Rackspace Email`_ which a a great product, relied on by over 3 million users.

Below you will find answers to some frequently asked questions about removal of POP/IMAP mailboxes.  
If something is not covered in this FAQ, please let us know by submitting a ticket through your Mailgun control panel.

.. _Rackspace Email: http://www.rackspace.com/email-hosting/

Will I still be able to send and receive email with Mailgun once POP3/IMAP mailboxes are removed?
*************************************************************************************************
Yes.  Sending email through Mailgun is not affected at all by this change.  For receiving emails, you 
can still set up a Route to forward inbound emails to a different email address or POST the data to a URL.  
The only change is that you will no longer be able to store your emails on Mailgun and access them via POP3/IMAP.  
To learn more about Routes, check out the `Routes`_ section of our `User Manual`_.

What will happen to my data stored in POP3/IMAP mailboxes after Feb 23, 2014?
******************************************************************************
If you don’t move your data from your POP3/IMAP mailboxes by Feb 23, 2014 at 11:59pm PT, your data will be deleted. 
You will also no longer be able to access your mailboxes.

Is there anyway to store inbound emails at Mailgun for processing without POP3/IMAP?
************************************************************************************
Yes!  We released `temporary storage`_ for all your incoming emails as part of Mailgun Routes. 
Unlike POP3/IMAP storage, Routes storage provides access to emails as fully-parsed, structured data, 
making integration into your application much easier. To learn more about Routes, check out the 
`Routes`_ section of our `User Manual`_.

.. _temporary storage: http://blog.mailgun.com/post/store-a-temporary-mailbox-for-all-your-incoming-email/

Will I still be able to connect to user-level email addresses via SMTP to send email?
***************************************************************************************
Yes, you will still be able to do this. Right now, one of the advantages of POP3/IMAP mailboxes is the 
ability to get user-level SMTP credentials for a domain which you can use to connect Mailgun to a standard 
email client. Although mailboxes themselves will go away, any existing user-level SMTP credentials will continue 
to function and users will still be able to create new SMTP users via API and the Control Panel.  
If you want to process replies at that email address, however, you will need to set up a Route to forward 
the emails you receive to another mailbox or your application.

I want to be able to give my users their own email address to receive emails...How can I do this without Mailboxes?
********************************************************************************************************************
We get this question a lot. In 99% of cases, the answer is Mailgun Routes, not Mailgun Mailboxes. Routes let you create 
unlimited custom email addresses and use these address for email forwarding and routing. To learn more about Routes, 
check out the `Routes`_ section of our `User Manual`_.

I need to store a copy of each email I send. How can I do that without Mailboxes?
**********************************************************************************
Routes is the answer again. You can set up an email address through Routes that you can cc or bcc on your outbound 
emails. Routes can either (i) store the incoming email for up to three days, (ii) forward the email to a different 
email address or (iii) POST the entire MIME message or the parsed message to a URL. To learn more about Routes, check out 
the `Routes`_ section of our `User Manual`_.

.. _Routes: http://documentation.mailgun.com/user_manual.html#routes
.. _User Manual: http://documentation.mailgun.com/user_manual.html
