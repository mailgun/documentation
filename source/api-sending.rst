.. _api-sending-messages:


Messages
################

Sending
================


There are two ways to send emails using Mailgun API:

- You can pass the components of the messages such as ``To``,
  ``From``, ``Subject``, HTML and text parts, attachments, etc. Mailgun
  will build a MIME representation of the message and send it. This is the
  preferred method.

- You can also build a MIME string yourself using a MIME library for your
  programming language and submit it to Mailgun.

.. note:: You can also use good old SMTP to send messages. But you will have
    to specify all advanced sending options via :ref:`MIME headers <passing_sending_options>`

.. code-block:: url

     POST /<domain>/messages

Sends a message by assembling it from the components. Note that you can
specify most parameters multiple times, HTTP supports this out of the box.
This makes sense for parameters like ``cc``, ``to`` or ``attachment``.

.. container:: ptable

 ================== ==========================================================
 Parameter          Description
 ================== ==========================================================
 from               Email address for ``From`` header
 to                 Email address of the recipient(s).
                    Example: ``"Bob <bob@host.com>"``. You can use commas to
                    separate multiple recipients.
 cc                 Same as ``To`` but for ``Cc``
 bcc                Same as ``To`` but for ``Bcc``
 subject            Message subject
 text               Body of the message. (text version)
 html               Body of the message. (HTML version)
 attachment         File attachment. You can post multiple ``attachment``
                    values. **Important:** You must use ``multipart/form-data``
                    encoding when sending attachments.
 inline             Attachment with ``inline`` disposition. Can be used to
                    send inline images (see :ref:`example <inline-image>`).
                    You can post multiple ``inline`` values.
 o\:tag             Tag string. See :ref:`tagging` for more information.
 o\:campaign        Id of the campaign the message belongs to. See
                    :ref:`um-campaign-analytics` for details.
 o\:dkim            Enables/disables DKIM signatures on per-message basis.
                    Pass ``yes`` or ``no``
 o\:deliverytime    Desired time of delivery. See :ref:`date-format`. Note:
                    Messages can be scheduled for a maximum of 3 days in the
                    future.
 o\:testmode        Enables sending in test mode. Pass ``yes`` if needed.
                    See :ref:`manual-testmode`
 o\:tracking        Toggles tracking on a per-message basis, see
                    :ref:`tracking-messages` for details. Pass ``yes`` or ``no``.
 o\:tracking-clicks Toggles clicks tracking on a per-message basis. Has higher
                    priority than domain-level setting. Pass ``yes``, ``no``
                    or ``htmlonly``.
 o\:tracking-opens  Toggles opens tracking on a per-message basis. Has higher
                    priority than domain-level setting. Pass ``yes`` or ``no``.
 h\:X-My-Header     ``h:`` prefix followed by an arbitrary value allows to append
                    a custom MIME header to the message (``X-My-Header``
                    in this case). For example, ``h:Reply-To`` to specify Reply-To
                    address.
 v\:my-var          ``v:`` prefix followed by an arbitrary name allows to
                    attach a custom JSON data to the message.
                    See :ref:`manual-customdata` for more information.
 ================== ==========================================================

.. code-block:: url

     POST /<domain>/messages.mime

Posts a message in MIME format. Note: you will need to build a MIME
string yourself. Use a MIME library for your programming language
to do this. Pass the resulting MIME string as ``message`` parameter.

.. note:: You must use ``multipart/form-data`` encoding.

.. container:: ptable

 ================== ==========================================================
 Parameter          Description
 ================== ==========================================================
 to                 Email address of the recipient(s).
                    Example: ``"Bob <bob@host.com>"``. You can use commas to
                    separate multiple recipients.
 message            MIME string of the message. Make sure to use
                    ``multipart/form-data`` to send this as a file upload.
 o\:tag             Tag string. See :ref:`tagging` for more information.
 o\:campaign        Id of the campaign the message belongs to. See
                    :ref:`um-campaign-analytics` for details.
 o\:deliverytime    Desired time of delivery. See :ref:`date-format`. Note:
                    Messages can be scheduled for a maximum of 3 days in the
                    future.
 o\:dkim            Enables/disabled DKIM signatures on per-message basis.
                    Pass ``yes`` or ``no``
 o\:testmode        Enables sending in test mode. Pass ``yes`` if needed.
                    See :ref:`manual-testmode`
 o\:tracking        Toggles tracking on a per-message basis, see
                    :ref:`tracking-messages` for details. Pass ``yes`` or ``no``.
 o\:tracking-clicks Toggles clicks tracking on a per-message basis. Has higher
                    priority than domain-level setting. Pass ``yes``, ``no``
                    or ``htmlonly``.
 o\:tracking-opens  Toggles opens tracking on a per-message basis. Has higher
                    priority than domain-level setting. Pass ``yes`` or ``no``.
 h\:X-My-Header     ``h:`` prefix followed by an arbitrary value allows to append
                    a custom MIME header to the message (``X-My-Header``
                    in this case). For example, ``h:Reply-To`` to specify Reply-To
                    address.
 v\:my-var          ``v:`` prefix followed by an arbitrary name allows to
                    attach a custom JSON data to the message.
                    See :ref:`manual-customdata` for more information.
 ================== ==========================================================


Retrieving Stored Messages
===========================

To retrieve an inbound message that has been stored via the ``store()`` action, use the URL found in the stored event (which you can find through the Events API, or in the notify webhook set when creating the store action (``store(notify="http:mydomain.com/callback")``).

- By default the message will be returned in JSON form with parsed parts. Links to the attachments will be included.

- You can also retrieve the full raw mime message (attachments and all) if you make the request to the URL with the ``Accept`` header set to ``message/rfc2822``.

.. code-block:: url

     GET domains/<domain>/messages

You don't have to construct this URL on your own. You can just use the URL provided in the Events API or the notification webhook. A sample URL returned from the Events API is ``https://api.mailgun.net/v2/domains/mydomain.com/messages/WyJhOTM4NDk1ODA3Iiw``.

These are the parameters of the JSON returned from a GET request to a stored message url.

           ==================    =========    ============================================================================================================
           Parameter             Type         Description
           ==================    =========    ============================================================================================================
           recipient             string       recipient of the message as reported by ``MAIL TO`` during SMTP chat.
           sender                string       sender of the message as reported by ``MAIL FROM`` during SMTP chat. Note: this value may differ
                                              from ``From`` MIME header.
           from                  string       sender of the message as reported by ``From`` message header, for example "Bob Lee <blee@mailgun.net>".
           subject               string       subject string.
           body-plain            string       text version of the email. This field is always present.
                                              If the incoming message only has HTML body, Mailgun will create a text representation for you.
           stripped-text         string       text version of the message without quoted parts and signature block (if found).
           stripped-signature    string       the signature block stripped from the plain text message (if found).
           body-html             string       HTML version of the message, if message was multipart. Note that all parts of the message will be posted,
                                              not just text/html. For instance if a message arrives with "foo" part it will be posted as "body-foo".
           stripped-html         string       HTML version of the message, without quoted parts.
           attachments           string       constains a json list of metadata objects, one for each attachment, see below.
           message-url           string       a URL that you can use to get and/or delete the message.
           content-id-map        string       contains mappings from content ids to attachment urls.
           message-headers       string       list of all MIME headers dumped to a json string (order of headers preserved).
           content-id-map        string       JSON-encoded dictionary which maps Content-ID (CID) of each attachment to the corresponding ``attachment-x`` parameter. This allows you to map posted attachments to tags like ``<img src='cid'>`` in the message body.
           ==================    =========    ============================================================================================================

The attachments JSON contains the following items.

           .. container:: ptable

           ==================    =========    ============================================================================================================
           Parameter             Type         Description
           ==================    =========    ============================================================================================================
           size                  integer      indicates the size of the attachment in bytes.
           url                   string       contains the url where the attachment can be found. This does not support DELETE.
           name                  string       the name of the attachment
           content-type          string       the content type of the attachment
           ==================    =========    ============================================================================================================

These are the parameters when the ``Accept`` header is set to ``message/rfc2822``


 ===========    ======    ============================================================================================================
 Parameter      Type      Description
 ===========    ======    ============================================================================================================
 recipient      string    recipient of the message.
 sender         string    sender of the message as reported by SMTP MAIL FROM.
 from           string    sender of the message as reported by ``From`` message header, for example "Bob <bob@example.com>".
 subject        string    subject string.
 body-mime      string    full MIME envelope. You will need a MIME parsing library to process this data.
 ===========    ======    ============================================================================================================


Deleting Stored Messages
==============

To delete an inbound message that has been stored via the ``store()`` action, use the URL found in the stored event, or in the notify webhook.

.. code-block:: url

     DELETE domains/<domain>/messages/<message>

You don't have to construct this URL on your own. You can just use the URL provided in the Events API or the notification webhook. A sample URL returned from the Events API is ``https://api.mailgun.net/v2/domains/mydomain.com/messages/WyJhOTM4NDk1ODA3Iiw``.


Examples
================

.. warning:: Some samples are using curl utility for API examples.
  UNIX shells require that some characters must be escaped,
  for example ``$`` becomes ``\$``.

  If your API key contains unescaped characters you
  may receive HTTP error 401 (Unauthorized).

Sending a plain text message:

.. include:: samples/send-simple-message.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Queued. Thank you.",
   "id": "<20111114174239.25659.5817@samples.mailgun.org>"
 }

Sending a message with HTML and text parts. This example also attaches two files to the message:

.. include:: samples/send-complex-message.rst

Sending a MIME message which you pre-build yourself using a MIME library of your choice:

.. include:: samples/send-mime-message.rst

An example of how to toggle tracking on a per-message basis. Note the ``o:tracking`` option. This will disable link rewriting for this message:

.. include:: samples/send-message-no-tracking.rst

An example of how to set message delivery time using the ``o:deliverytime`` option:

.. include:: samples/send-scheduled-message.rst

An example of how to tag a message with the ``o:tag`` option:

.. include:: samples/send-tagged-message.rst
