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

Base URL
~~~~~~~~~~~~~~~~~~~~~~~~~

All API URLs referenced in this documentation start with the following
base part::

    https://api.mailgun.net/v3

Your Mailgun account may contain several email domains. To avoid passing
the domain name as a query parameter, most API URLs must include the name of
the domain you're interested in::

    https://api.mailgun.net/v3/mydomain.com

.. index:: Authentication

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

.. index:: Errors

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

Webhooks
~~~~~~~~~~~~~~~~~~~~~~~~~

Mailgun can also POST data to your application when events (opens, clicks, bounces, etc.) occur or when you use Routes.  You can read more about :ref:`webhooks` and :ref:`um-routes` in the :ref:`user-manual`.
