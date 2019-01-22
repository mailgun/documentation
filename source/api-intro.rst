Introduction
########################

The Mailgun API is built on HTTP. Our API is RESTful_ and it:

* Uses predictable, resource-oriented URLs.
* Uses built-in HTTP capabilities for passing parameters and authentication.
* Responds with standard HTTP response codes to indicate errors.
* Returns JSON_.

Mailgun has published :ref:`libraries` for various languages. You may use our
libraries, or your favorite HTTP/REST library available for your programming
language, to make HTTP calls to Mailgun. Visit our :ref:`libraries` page to see
HTTP REST libraries we recommend.

To give you an idea of how to use the API, we have annotated our documentation
with code samples written in several popular programming languages. Use the language
selector at the top to switch between them.

Our samples from :ref:`quickstart`, :ref:`user-manual`, and :ref:`api-reference` provide
examples that will function. You're welcome to copy/paste and run the script to see the API in action.

.. _RESTful: http://en.wikipedia.org/wiki/Representational_State_Transfer
.. _JSON: http://en.wikipedia.org/wiki/Json objects

.. _base-url:

Base URL
~~~~~~~~~~~~~~~~~~~~~~~~~

All API URLs referenced in this documentation start with the following
base part::

    https://api.mailgun.net/v3

Your Mailgun account may contain several email domains. To avoid passing
the domain name as a query parameter, most API URLs must include the name of
the domain you're interested in::

    https://api.mailgun.net/v3/mydomain.com

.. _authentication:

Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~

When you sign up for an account, you are given an API key.  You authenticate to the Mailgun API by providing your API key in the request. You can manage your API key in the "Security" tab under the **Account** section of the Control Panel.

Authentication to the API occurs via `HTTP Basic Auth`_. Use ``api`` as the user
name and your API key is the password. Here is how you use basic HTTP auth with curl::

    curl --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0'

Or you can try the following API call right from your browser::

    https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0@api.mailgun.net/v3/samples.mailgun.org/log

.. warning:: Keep your API key secret!

.. _HTTP Basic Auth: http://en.wikipedia.org/wiki/Basic_access_authentication

.. _date-format:

Date Format
~~~~~~~~~~~~~~~~~~~~~~~~~

Mailgun returns JSON for all API calls. JSON does not have a built-in date type, dates are
passed as strings encoded according to :rfc:`2822#page-14`. This format is native to
JavaScript and is also supported by most programming languages out of the
box::

    'Thu, 13 Oct 2011 18:02:00 GMT'

.. _errors:

Errors
~~~~~~~~~~~~~~~~~~~~~~~~~

Mailgun returns standard HTTP response codes.

.. container:: ptable

 ================== ==========================================================
 Code               Description
 ================== ==========================================================
 200                Everything worked as expected
 400                Bad Request - Often missing a required parameter
 401                Unauthorized - No valid API key provided
 402                Request Failed - Parameters were valid but request failed
 404                Not Found - The requested item doesn't exist
 413                Request Entity Too Large - Attachment size is too big
 500, 502, 503, 504 Server Errors - something is wrong on Mailgun's end
 ================== ==========================================================

.. _webhooks:

Webhooks
~~~~~~~~~~~~~~~~~~~~~~~~~

Mailgun can also POST data to your application when events (opens, clicks, bounces, etc.) occur or when you use Routes.  You can read more about :ref:`webhooks` and :ref:`um-routes` in the :ref:`user-manual`.

.. _mailgun-regions:

Mailgun Regions
~~~~~~~~~~~~~~~~~~~~~~~~~

Using a single account and billing plan, you can choose to provision new sending domains in the EU environment. Message data never leaves the region in which it is processed. Only a limited amount of account data is replicated globally, giving you a single account from which to manage domains in both the US and the EU. Here are the specifics on the type of data that is replicated globally versus what is region-bound.

.. container:: ptable

 ======================================================================================================= ==================================================================================================================================
 Global                                                                                                  Region-Bound (US / EU)
 ======================================================================================================= ==================================================================================================================================
 Account Information, User Accounts, Billing Details (invoices/plan information), API Keys, Domain Names Domain Metadata (e.g. SMTP credentials), Messages, Event Logs, Suppressions, Mailing Lists, Tags, Statistics, Routes, IP Addresses
 ======================================================================================================= ==================================================================================================================================

Below are the endpoints you will use for sending/receiving/tracking messages in the EU:

.. container:: ptable

 ============================= ==================== ====================
 Service                       US Endpoint          EU Endpoint
 ============================= ==================== ====================
 REST API                      api.mailgun.net      api.eu.mailgun.net
 Outgoing SMTP Server          smtp.mailgun.org     smtp.eu.mailgun.org
 Inbound SMTP Server (Routes)  mxa.mailgun.org      mxa.eu.mailgun.org
 Inbound SMTP Server (Routes)  mxb.mailgun.org      mxb.eu.mailgun.org
 Open/Click Tracking Endpoint  mailgun.org          eu.mailgun.org
 ============================= ==================== ====================

.. _postman-integration:

Postman Integration
~~~~~~~~~~~~~~~~~~~~~~~~~

Mailgun has a Postman Collection available for quick and easy exercise of our REST-based APIs. Included in the collection is a Mailgun Environment for easy changing of domains, regions and API keys. Use the button below for easy import into Postman. Don't have Postman? `Click here`_.

Read more about Mailgun and Postman on our blog_.

.. raw:: html

    <div class="postman-run-button"
         data-postman-action="collection/import"
         data-postman-var-1="4a1b196c53ca11f2e540"
         data-postman-param="env%5BMailgun%20Postman%20Environment%5D=W3siZGVzY3JpcHRpb24iOnsiY29udGVudCI6IiIsInR5cGUiOiJ0ZXh0L3BsYWluIn0sInZhbHVlIjoiNzM0MzE3MDM1M2RkMDU5OGIzOWFlOGRkYjcwYWMxMjItMDQ3MGExZjctYWI4OWEyYzkiLCJrZXkiOiJBUElfS0VZIiwiZW5hYmxlZCI6dHJ1ZX0seyJkZXNjcmlwdGlvbiI6eyJjb250ZW50IjoiIiwidHlwZSI6InRleHQvcGxhaW4ifSwidmFsdWUiOiJodHRwczovL2FwaS5tYWlsZ3VuLm5ldC92MyIsImtleSI6IkJBU0VfVVJMIiwiZW5hYmxlZCI6dHJ1ZX0seyJkZXNjcmlwdGlvbiI6eyJjb250ZW50IjoiIiwidHlwZSI6InRleHQvcGxhaW4ifSwidmFsdWUiOiJzYW5kYm94OTc0YWFkNjM5MDk1NGUzOWI4OGY0YmZhOGNmMTg0YzMubWFpbGd1bi5vcmciLCJrZXkiOiJteWRvbWFpbiIsImVuYWJsZWQiOnRydWV9LHsidmFsdWUiOiJZWEJwT2pjek5ETXhOekF6TlROa1pEQTFPVGhpTXpsaFpUaGtaR0kzTUdGak1USXlMVEEwTnpCaE1XWTNMV0ZpT0RsaE1tTTUiLCJrZXkiOiJ0b2tlbiIsImVuYWJsZWQiOnRydWV9XQ=="
    >
    </div>
    <script type="text/javascript">
      (function (p,o,s,t,m,a,n) {
        !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
        !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
        (n = o.createElement("script")),
        (n.id = s+t), (n.async = 1), (n.src = m), n
        ));
      }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
    </script>

.. _Click here: https://www.getpostman.com/
.. _blog: https://www.mailgun.com/blog/together-at-last-postman-meets-mailgun
