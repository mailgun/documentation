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

.. note:: Sending options (those prefixed by o:, h:, or v:) are limited to 16 kB in total.

.. code-block:: url

     POST /<domain>/messages

Sends a message by assembling it from the components. Note that you can
specify most parameters multiple times, HTTP supports this out of the box.
This makes sense for parameters like ``cc``, ``to`` or ``attachment``.

.. container:: ptable

 ================================= ==========================================================
 Parameter                         Description
 ================================= ==========================================================
 from                              Email address for ``From`` header
 to                                Email address of the recipient(s).
                                   Example: ``"Bob <bob@host.com>"``. You can use commas to
                                   separate multiple recipients.
 cc                                Same as ``To`` but for ``Cc``
 bcc                               Same as ``To`` but for ``Bcc``
 subject                           Message subject
 text                              Body of the message. (text version)
 html                              Body of the message. (HTML version)
 amp-html                          `AMP <https://developers.google.com/gmail/ampemail/>`_ part of the message. Please follow google `guidelines <https://developers.google.com/gmail/ampemail/>`_ to compose and send AMP emails.
 attachment                        File attachment. You can post multiple ``attachment``
                                   values. **Important:** You must use ``multipart/form-data``
                                   encoding when sending attachments.
 inline                            Attachment with ``inline`` disposition. Can be used to
                                   send inline images (see :ref:`example <inline-image>`).
                                   You can post multiple ``inline`` values.
 template                          Name of a template stored via :ref:`template API <api-templates>`.
                                   See :ref:`templating` for more information
 t:\version                        Use this parameter to send a message to specific version of a template
 t:\text                           Pass ``yes`` if you want to have rendered template in the text part of the message in case of template sending
 o\:tag                            Tag string. See :ref:`tagging` for more information.
 o\:dkim                           Enables/disables DKIM signatures on per-message basis.
                                   Pass ``yes``, ``no``, ``true`` or ``false``
 o\:deliverytime                   Desired time of delivery. See :ref:`date-format`. Note:
                                   Messages can be scheduled for a maximum of 3 days in the
                                   future.
 o\:deliverytime-optimize-period   String should be set to the number of hours in ``[0-9]+h`` format, with the minimum being ``24h`` and the maximum being ``72h``. This value defines the time window in which Mailgun will run the optimization algorithm based on prior engagement data of a given recipient. *Please note that STO is only available on certain plans. See www.mailgun.com/pricing for more info.*
 o\:time-zone-localize             String should be set to preferred delivery time in ``HH:mm`` or ``hh:mmaa`` format, where ``HH:mm`` is used for 24 hour format without AM/PM and ``hh:mm:aa`` is used for 12 hour format with AM/PM. *Please note that TZO is only available on certain plans. See www.mailgun.com/pricing for more info.*
 o\:testmode                       Enables sending in test mode. Pass ``yes`` if needed.
                                   See :ref:`manual-testmode`
 o\:tracking                       Toggles tracking on a per-message basis, see
                                   :ref:`tracking-messages` for details. Pass ``yes``, ``no``,
                                   ``true`` or ``false``
 o\:tracking-clicks                Toggles clicks tracking on a per-message basis. Has higher
                                   priority than domain-level setting. Pass ``yes``, ``no``,
                                   ``true``, ``false`` or ``htmlonly``.
 o\:tracking-opens                 Toggles opens tracking on a per-message basis. Has higher
                                   priority than domain-level setting. Pass ``yes`` or ``no``,
                                   ``true`` or ``false``
 o\:require-tls                    If set to ``True`` or ``yes`` this requires the message only be
                                   sent over a TLS connection. If a TLS connection can not be established,
                                   Mailgun will not deliver the message.

                                   If set to ``False`` or ``no``, Mailgun will still try and upgrade
                                   the connection, but if Mailgun can not, the message will be
                                   delivered over a plaintext SMTP connection.

                                   The default is False.
 o\:skip-verification              If set to ``True`` or ``yes``, the certificate and hostname will
                                   not be verified when trying to establish a TLS connection and Mailgun
                                   will accept any certificate during delivery.

                                   If set to ``False`` or ``no``, Mailgun will verify the certificate and
                                   hostname. If either one can not be verified, a TLS connection
                                   will not be established.

                                   The default is ``False``.
 h\:X-My-Header                    ``h:`` prefix followed by an arbitrary value allows to append
                                   a custom MIME header to the message (``X-My-Header``
                                   in this case). For example, ``h:Reply-To`` to specify Reply-To
                                   address.
 v\:my-var                         ``v:`` prefix followed by an arbitrary name allows to
                                   attach a custom JSON data to the message.
                                   See :ref:`manual-customdata` for more information.
 recipient-variables               A valid JSON-encoded dictionary, where key is a plain recipient
                                   address and value is a dictionary with variables that can be
                                   referenced in the message body.
                                   See :ref:`batch-sending` for more information.
 ================================= ==========================================================

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
                    Make sure to include all ``To``, ``Cc`` and ``Bcc``
                    recipients of the message.
 message            MIME string of the message. Make sure to use
                    ``multipart/form-data`` to send this as a file upload.
 o\:tag             Tag string. See :ref:`tagging` for more information.
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

To retrieve an inbound message that has been stored via the ``store()`` action, use the URL found in the stored event (which you can find through the Events API, or in the notify webhook set when creating the store action (``store(notify="http://mydomain.com/callback")``).

- By default the message will be returned in JSON form with parsed parts. Links to the attachments will be included.

- You can also retrieve the full raw mime message (attachments and all) if you make the request to the URL with the ``Accept`` header set to ``message/rfc2822``.

- Stored messages are encoded with `Quoted-printable <https://en.wikipedia.org/wiki/Quoted-printable>`_ encoding. Decoding samples are available in the examples section below.

These are the parameters of the JSON returned from a GET request to a stored message url.


           ==================    =========    ============================================================================================================
           Parameter             Type         Description
           ==================    =========    ============================================================================================================
           recipients            string       recipient of the message as reported by ``MAIL TO`` during SMTP chat.
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
           attachments           string       contains a json list of metadata objects, one for each attachment, see below.
           message-headers       string       list of all MIME headers dumped to a json string (order of headers preserved).
           content-id-map        string       JSON-encoded dictionary which maps Content-ID (CID) of each attachment to the corresponding ``attachment-x`` parameter. This allows you to map posted attachments to tags like ``<img src='cid'>`` in the message body.
           ==================    =========    ============================================================================================================

.. note:: Do not rely on the ``body-plain``, ``stripped-text``, and ``stripped-signature`` fields for HTML sanitization. These fields
          merely provide content from the text/plain portion of an incoming message. This content may contain unescaped HTML.


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
 recipients     string    recipient of the message.
 sender         string    sender of the message as reported by SMTP MAIL FROM.
 from           string    sender of the message as reported by ``From`` message header, for example "Bob <bob@example.com>".
 subject        string    subject string.
 body-mime      string    full MIME envelope. You will need a MIME parsing library to process this data.
 ===========    ======    ============================================================================================================


Deleting Stored Messages
========================

Stored messages are retained in the system for 3 days and automatically purged
after this retention period, therefore there is no need to delete messages
explicitly.

.. note:: Mailgun reserves the right to impose a limit on the size and number
          of stored messages. In the event this is necessary, you will be
          notified in advance.

Examples
========

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

An example of how to resend a message:

.. include:: samples/resend-simple-message.rst

An example of how to decode Quoted-printable encoded messages:

.. include:: samples/decode-quoted-printable.rst
