.. _best-practices:

Email Best Practices
####################

.. contents::
    :local:
    :backlinks: none


This guide is a brief summary of email best practices that we have learned from managing mail servers for thousands of customers and sending (and receiving) a lot of email.   The objective is to help outline what you need to do to have your emails delivered whether or not you use Mailgun.  Of course, if after reading the guide you decide that you have better things to do than maintaining email servers and managing email deliverability, we’d love to help!

In this guide, we will not focus much on the content of email messages. Content can be paraphrased with a few words: ‘send something people want’ (to paraphrase `Y Combinator's`_ motto). Creating good content is probably the hardest part, so apologies for the huge caveat.  We focus on the infrastructure and monitoring of email so that if you are sending something people want, they will get it; and if you are not sending something people want, you will know about it and hopefully change that.


.. _Word to the Wise: http://blog.wordtothewise.com/
.. _Y Combinator's: http://www.ycombinator.com/


Reputation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most important assets you have in the email world (much like the real world) is your reputation. If you do not have a good reputation tied to your domain and your IP address (“IP” used herein for abbreviation), your email will not reach your recipients’ inboxes. Due to its popularity and its unique ability to push information to users, email has been overrun with spammers (as if you didn’t notice). Depending on your definition, approximately 90% of all email is spam (source: MAAWG_). Due to this, email service providers (“ESPs”) like Gmail, AOL, Yahoo and MSN/Hotmail have declared an all-out war on spammers. This has made our inboxes a more pleasant place. This also makes it very important to manage your email reputation. If it is not impeccable, you will get caught in the ESPs’ spam filters.

A good analogy for your email reputation is your personal credit score. Obviously, a bad reputation will hurt you. However, not having a reputation will also hurt you. If ESPs don’t know you (or more specifically your IP and domain) they will assume the worst and filter you, at least initially. It’s tough to blame them given all the spam out there. Due to the importance of reputation, a significant portion of our discussion on best practices revolves around building and maintaining your email reputation.

Our goal with respect to your email reputation is to make sure that the infrastructure is optimized for emails reaching the inbox and doesn’t get in your way. We test all of our IPs’ reputation before we allocate them and we use the authentication methods that major ESPs require.

Beyond making sure that the infrastructure is properly set up, we also provide the tools to answer some important questions:

* Are emails being delivered and if not, why?
* Is a recipient ESP throttling your traffic and why?
* Are messages bouncing due to incorrect domains or stale addresses?
* Are recipients unsubscribing or complaining of spam?
* Are recipients engaging with your emails by opening them and/or clicking on links?

You should use all of this data to make sure that you are complying with ESPs guidelines and adjust your email sending to stay in their good graces.

We give you all the tools for establishing a good sending reputation, but it’s ultimately up to you to send emails appropriately. Some email service providers use `F.U.D.`_ about email deliverability to sell you a deliverability fairy that magically gets your emails to the inbox. This is most definitely not the case and your actions, as the email sender, play the biggest part in good deliverability.

However, if you follow a couple rules (along with properly authenticating your email), you will most likely build up a great email sending reputation:

* Only send emails to people that have signed-up to receive them from your website/application/service and always first send a confirmation link to confirm their address is correct (aka, “double opt-in”); and
* Track your email and adjust your sending based on feedback from ESPs and recipients (eg., don’t send additional emails to recipients that have unsubscribed or complained of spam).

.. _MAAWG: http://www.maawg.org/sites/maawg/files/news/MAAWG_2010_Q3Q4_Metrics_Report_14.pdf
.. _F.U.D.: http://en.wikipedia.org/wiki/Fear,_uncertainty_and_doubt

Hosting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A brief note on hosting since hosting technology is changing so quickly, it will likely be out of date in a few months. Large, virtual cloud environments are generally not the best environments for email for a few reasons:

* The IP address should be static so that your domain(s) & IP address(es) build a reputation together. Also, some more strict recipients ESPs may require whitelisting your IP address. Unfortunately, these should be IPv4.
* The IP address and surrounding IP addresses should have a good reputation. This is rarely the case at large cloud environments due to their ease of use and lax monitoring (which is inviting to spammers).
* Mail Transfer Agents should ideally be on real (non-virtual) machines, optimized for I/O.

We host Mailgun mostly on dedicated servers. We do use cloud servers for some of the infrastructure (where it makes sense), but for most of Mailgun we like large, robust, dedicated machines.

We use dedicated IP addresses in large subnets and we do background checks and extensive testing on our IP addresses. Because they are in large continuous blocks, they are less likely to be affected by other, external IP addresses. ESPs and blacklists occasionally block entire subnets if any of the IPs have questionable reputations. So even if your IP is clean, it might be blocked because of surrounding IPs. Larger subnets mitigate this risk.

We dream of a day when IP reputation does not matter and we can rely on domain reputation, but unfortunately we are not there yet.


IP Addresses and Sending Volume
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are sending a lot of email (greater than 50k per week), it is a good idea to have a dedicated IP in order to isolate your reputation.  If you are sharing your IP, you are sharing your reputation with those other senders.  In addition, ESPs rate limit your emails based on the IP.  So if you are a high volume sender you should consider getting a pool of IPs.  However, your reputation can also be hurt if you are not sending enough volume consistently from an IP so it's a tricky balance.

If your email sending is volatile with large spikes of volume, ESPs may assume those large spikes are spam.  Also, if you overall volume is too low, they won't acknowledge your reputation.  Generally, if you are sending less than 5,000 emails per day, a shared IP may be the right solution.

The other thing to consider is using separate IPs for your bulk and transactional mail if you are sending high volumes of email.  There are a couple reasons for this:

* Delivery of time-sensitive transactional emails may get queued behind a large batch of bulk/marketing emails.
* Your transactional mail will be affected by the reputation created by your bulk/marketing mail.

Even if you have a clean IP address, you need to warm up the IP gradually.  This means sending emails at a low rate initially and then gradually increasing that rate, taking into account ESP feedback.  If you send a ton of emails right away, they will get filtered or dropped by the ESPs.  In some cases, they won't even tell you they are dropping them.

Mailgun offers both shared and dedicated IPs.  We are constantly monitoring the traffic on these IPs. So even for shared IPs, you can be comfortable that your reputation is not being unduly influenced by others.  We also offer pools of IPs for high volume senders.  In addition, we have queuing algorithms that gradually warm up your IPs.  Our sending rates automatically increase over time as your IP warms up. Finally, we separate our sending queues for each domain you set up at Mailgun, which mitigates the need for multiple IPs for different types of traffic.

DNS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Your email reputation is not only tied to your IP, but your domain name as well.  You should keep this in mind as you set up your email infrastructure.  For the same reasons as above, It is a good idea to have separate domains or subdomains for your marketing, transactional and corporate mail.  We suggest that you use your top level domain for your corporate mail and using different domains or subdomains for your marketing and transactional mail.

While it is not required to use the same domain in the From field of the message as the actual domain sending the message, it is highly recommended.  Hotmail is especially finicky about this requirement and has a higher propensity to filter your messages to junk if the two domains do not match.

You should also make sure that you are using a well regarded DNS provider and that you publish all of your contact information in the WHOIS record.  If you are hiding your contact information through a proxy, ESPs may take that as a signal that you are spamming.

Also, make sure you include the appropriate records at your DNS provider for authentication (see below).  While it's not required to point mx records to the same domain as you are sending from, it is recommended.  There are email providers (albeit, a minority) that will check if mx records for the domain are valid before accepting email.

Mailgun gives you the ability to create multiple domains or subdomains very easily.  You are free to create multiple domains and subdomains for each of your transactional, marketing and corporate email.  Each domain has an isolated queue, so your transactional emails won't get held up by your bulk mailings.

Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is very important that you are using the appropriate authentication methods with your email.  If you are not authenticating your email properly, ESPs will assume you are spamming and will filter or just drop your email.

The common types of authentication are:

* SPF_
* DKIM_
* DomainKeys_
* SenderID_

.. _SPF: http://www.openspf.org
.. _DKIM: http://www.dkim.org
.. _DomainKeys: http://domainkeys.sourceforge.net
.. _SenderID: http://www.microsoft.com/mscorp/safety/technologies/senderid/default.mspx

Mailgun uses all of these types of authentication.  When you sign up for Mailgun, we provide the appropriate records for you to include at your DNS registrar.  We also provide a verification button you can use to make sure that your records are set up correctly.

Mailing Lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The number one reason we see people get blocked is because they have a bad mailing list.  **Don't purchase your list or scrape websites for emails.**  It's the easy way out and you will pay the consequences.  Most of these lists have bad email addresses and include spam traps.  ESPs are very good at recognizing bad mailing lists.

You should only send emails to people that have opted in to receiving your emails on YOUR website.  In addition, you should be sending a verification email with a link that confirms their subscription (double opt-in) to make sure their email address is correct and that they are the person that signed up.  If everyone did this, the world would be a better place.

You should have your Privacy Policy easily accessible on your website.  In addition, you should have a place on your website where users can unsubscribe from your mailings, in addition to a link in every email you send (see `Unsubscribe Handling`_).

While we have to rely on you to be responsible about how you procure your mailing list, we do track and give you data to easily see how your emails are being received.  We give you information for bounces, unsubscribes, complaints, opens and clicks so that you can modify your mailing lists appropriately.  In addition, we automate a lot of the work by keeping track of recipients that have unsubscribed, bounced or complained and stopping future deliveries to those recipients. We give you various levels of unsubscribe granularity so your recipients can unsubscribe to all emails from the domain, just that mailing list or just emails with that "tag" (which you define).

Bounce and ESP Feedback Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A big part of maintaining your email reputation is processing bounces properly.  While most major ESPs give bounce replies "on the wire" during the SMTP session, there are some that send bounce messages via email.  In order receive these emailed bounce messages, you must have the appropriate return path header included with your email so that recipients know where to reply with bounce information.

You must also process this bounce data and act accordingly.  In addition, many ESPs will soft bounce your initial attempts at delivery.  This is also called grey-listing or throttling.  If you continue to send emails to bad addresses or you do not listen to ESPs feedback, you will get filtered and eventually your emails will just get dropped.

Mailgun automatically processes bounce information and reacts accordingly.  A good portion of Mailgun's technology is devoted to the parsing of this feedback and adjusting your sending in accordance with this feedback so that you maintain a good reputation.

If we receive a hard bounce, we will stop sending to that address immediately and will not attempt future deliveries to that address.  We will stop sending to an address after multiple soft bounces, according to the ESPs' guidelines.  It is possible to remove addresses from the flagged list in your Control Panel or through the API, in case it was a temporary issue.

Please see our :ref:`user-manual` for more information.

Feedback Loops and Spam Complaints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Most of the major ESPs (other than Gmail) provide feedback loops through which they give you information about spam complaints.  Here is a thorough `list from Word to the Wise`_.  It is important that you sign up for these feedback loops and pay attention to the feedback you are getting.  If you ignore this feedback, ESPs will throttle you and eventually block you completely.

We register all of our IPs for these feedback loops.  You can access this information through the Control Panel, the API or Webhooks.  In addition, we process spam complaints automatically and will stop sending to email addresses after a recipient complains.  It is possible to remove addresses from the flagged list in your Control Panel or through the API.

Please see our :ref:`user-manual` for more information.

.. _list from Word to the Wise: http://wiki.wordtothewise.com/ISP_Summary_Information

Unsubscribe Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is important to give you recipients the ability to unsubscribe from emails.  First, it is required by the `CAN-Spam Act`_.  Second, if you don't give them this option, they are more likely to click on the spam complaint button, which will cause more harm than allowing them to unsubscribe.  Finally, many ESPs look for unsubscribe links and are more likely to filter your email if they don't have them.

Mailgun gives you the ability to include an unsubscribe link or email automatically in your email.  We give you the ability to link the unsubscribe to a certain campaign, mailing list or make the request global to your domain.  You can access this data through the Control Panel, API or via Webhooks.  In addition, we will automatically stop sending to email addresses that have unsubscribed. It is possible to remove addresses from the flagged list in your Control Panel or through the API.

Please see our :ref:`user-manual` for more information.

.. _CAN-SPAM Act: http://business.ftc.gov/documents/bus61-can-spam-act-compliance-guide-business

Recipient Engagement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to processing bounces, complaints and unsubscribes, ESPs measure your reputation through the engagement of your recipients.  If recipients are opening, forwarding and replying to your emails, it will improve your reputation.  This is what makes 'do-not-reply' emails so offensive. At many ESPs, it is also helpful if recipients add your email address to their address books.

Mailgun allows you to track opens and link clicks with our Tracking and Tagging functionality (see our :ref:`user-manual` for more information).  You are free to create up to 4,000 tags and use them simultaneously for A/B testing.  In addition, Mailgun is built to receive and parse emails efficiently.  So there is no excuse to not allow your recipients to reply to your emails.  Email is not a billboard - it is a conversant technology.

Whitelists and other deliverability tools
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While not required, it is a good idea to sign up for whitelists where available.  Not all ESPs have them and they usually require some history of sending before they will allow you to sign up.  Also, most of them require that you be on a dedicated IP address.  Word to the Wise provides a `list of whitelists`_ along with feedback loops.

In addition to the whitelists provided by the ESPs, `Return Path`_ has a certification program which whitelists you at many of the major ESPs.  In addition, the certification enables images to be displayed by default at many ESPs (which is not usually the case).  Return Path also provides seed lists (so you can test if your email is being spam filtered) and campaign preview (to see how your emails are being rendered across ESPs and test for spammy content).  You can read more about the benefits on `Return Path's website`_.

For customers with dedicated IP addresses, we can register you for whitelists. Also, you can set up a test inbox and use our spam filtering technology to provide a "spamicity" score for your outgoing emails so you can see their propensity for being filtered.  Finally, all accounts with dedicated IP addresses are qualified for Return Path certification.  Our technology has already been pre-vetted so the only remaining step is for them to monitor your sending in order to certify you.

.. _list of whitelists: http://wiki.wordtothewise.com/ISP_Summary_Information


Email Content
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are a few tricks to remember about content besides the mantra of 'sending something people want'.  As mentioned above, you can set up a test mailbox at Mailgun and enable our spam filters to receive a "spamicity" score to test how your content is being judged by spam filters.

* Personalize your emails to each recipient. Ideally, the content should reflect recipient's specific interests or usage patterns in your application.  At least address them by their name...don't be rude!. Mailgun has recipient variables that you can define and use with your email templates to achieve detailed levels of personalization.
* It is best to send multi-part emails using both text and HTML or text only.  Sending HTML only email is not well received by ESPs.  Also, remember that ESPs generally block images by default so HTML only will not look very good unless users are proactive about enabling images.  There are a few tools available to test how your email will render across ESPs and browsers.  Litmus_ offers one, as does `Return Path`_.
* The higher the text to link and text to image ratios, the better.  Too many links and images trigger spam flags at ESPs.
* Misspellings, spammy words (buy now!, Free!) are big spam flags, as are ALL CAPS AND EXCLAMATION MARKS!!!!!!!!!!!!!
* The domains in the from field, return-path and message-id should match the domain you are sending from.
* Make sure you are using unsubscribe links and headers in your emails.  Many ESPs (particularly Hotmail) pay attention to this and if they are not there, you are likely to get filtered.  You can always use Mailgun's auto unsubscribe handling if you don't want to deal with this on your end.
* Gmail pays particularly close attention to Message ID and Received headers.  Message IDs that are formed incorrectly (without brackets <> and with wrong domain after @) can make Gmail think you are a spammer.  The simplest way to create the right Message ID with Mailgun is to not include one. Then Mailgun will create a perfect Message ID for you.
* Links should include the domain that is sending the email.  Also, popular url shorteners can be a bad idea because they are frequently used by spammers.
* A/B test your emails to optimize recipient engagement. Subject lines are particularly important.  You can use Mailgun's tagging and tracking statistics in order to measure A/B testing and improve your content.

.. _Litmus: http://litmus.com/email-testing
.. _Return Path: http://returnpath.net
.. _Return Path's website: http://www.returnpath.com

**Best of luck with your emailing...we hope we made it easier!**
