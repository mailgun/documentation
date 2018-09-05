.. _api-templates:

Templates
=========

The template API allows to store predefined templates and use them to send messages using :ref:`sending API <api-sending-messages>`.
The API has next limitations:

* 100 templates per domains
* 10 versions per template
* 100Kb max template size
    
.. code-block:: url

    POST /domains/<domain>/templates

Stores a new template. This API allows to store template's name, description plus template body if it's provided in the request.

.. container:: ptable

 =============== ==================================================================
 Parameter             Description
 =============== ==================================================================
 name            Name of the template
 description     Description of the template
 template        (Optional) Version of the template
 engine          (Optional) Template engine. Used if template parameter is provided. Right now only ``mustache`` engine is supported
 =============== ==================================================================

.. code-block:: url
    
    GET /domains/<domain>/templates

Returns a list of stored templates

.. code-block:: url

    GET /domains/<domain>/templates/<templateId>

Returns details about a template specified in url or a specific version of a template

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 version         (Optional) Id of the version
 =============== ==============================

.. code-block:: url

    POST /domains/<domain>/templates/<templateId>

Create new versions in the given template

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 template        Template 
 engine          (Optional) Template engine. Only one engine are supported right now - ``mustache``.
 =============== ================================================================================

.. code-block:: url

    PUT /domains/<domain>/templates/<templateId>

Update a template specified in url

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 name            Updated name of the template
 description     Updated description of the template
 =============== ==============================

.. code-block:: url

    DELETE /domains/<domain>/templates/<templateId>

Delete a template specified in url or specific version of a template.
If version id is not provide in the url all versions will be deleted.

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 version         (Optional) Id of the version to delete
 =============== ==============================

.. code-block:: url

   DELETE /domains/<domain>/templates

Delete all stored templates for specified domain

Examples
~~~~~~~~

Store a template. Template version is not provided

.. include:: samples/templates/template-create.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-08-29T23:31:13.553Z",
        "description": "Template description",
        "id": "nj01pavjEeikvBJbspqxaQ",
        "name": "Template namea",
        "version": {}
    },
    "message": "template has been stored"
  }

Store a template with version

.. include:: samples/templates/template-version-create.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-08-29T23:31:13.94Z",
        "description": "Mustache testing",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "Mustache template",
        "version": {
            "createdAt": "2018-08-29T23:31:13.941Z",
            "engine": "mustache",
            "id": "nnhwoavjEeikvhJbspqxaQ"
        }
    },
    "message": "template has been stored"
  }

Store a new version of template

.. include:: samples/templates/version-create.rst

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-08-29T23:31:13.94Z",
        "description": "Mustache testing",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "Mustache template",
        "version": {
            "createdAt": "2018-08-29T23:31:15.102Z",
            "engine": "mustache",
            "id": "nymB0KvjEeiMDg472Hdb5w"
        }
    },
    "message": "new version of the template has been stored"
  }

Listing templates

.. include:: samples/templates/templates-get.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
        {
            "createdAt": "2018-08-29T23:31:14.326Z",
            "description": "Template description 2",
            "id": "nrMT8avjEeikvxJbspqxaQ",
            "name": "Template name 2"
        },
        {
            "createdAt": "2018-08-29T23:31:13.94Z",
            "description": "Template description 1",
            "id": "nnglwqvjEeikvRJbspqxaQ",
            "name": "Template name 1"
        },
        {
            "createdAt": "2018-08-29T23:31:13.553Z",
            "description": "Template description",
            "id": "nj01pavjEeikvBJbspqxaQ",
            "name": "Template name"
        }
    ],
    "paging": {
        "first": "https://api.mailgin.net/v3/YOUR_DOMAIN_NAME/templates?limit=10",
        "last": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=last&limit=10",
        "next": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=next&p=nj01pavjEeikvBJbspqxaQ&limit=10",
        "prev": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=prev&p=nrMT8avjEeikvxJbspqxaQ&limit=10"
    }
  }

Listing versions of the template

.. include:: samples/templates/versions-get.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-09-05T00:29:54.802Z",
        "description": "Template description",
        "id": "z4ujt7CiEeik0RJbspqxaQ",
        "name": "Template name",
        "versions": [
            {
                "createdAt": "2018-09-05T00:29:56.06Z",
                "engine": "mustache",
                "id": "0EuT-7CiEeik1hJbspqxaQ",
                "template": "{{name}}"
            },
            {
                "createdAt": "2018-09-05T00:29:55.745Z",
                "engine": "mustache",
                "id": "0BtzFbCiEeik1RJbspqxaQ",
                "template": "{{body}}"
            },
            {
                "createdAt": "2018-09-05T00:29:54.804Z",
                "engine": "mustache",
                "id": "z4vrrbCiEeik0hJbspqxaQ",
                "template": "{{date}}"
            }
        ]
    },
    "paging": {
        "first": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?limit=10",
        "last": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=last&limit=10",
        "next": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=next&p=z4vrrbCiEeik0hJbspqxaQ&limit=10",
        "prev": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=prev&p=0EuT-7CiEeik1hJbspqxaQ&limit=10"
    }
  }

Access the template by id. When version is not provided in the request the response contains latest version.

.. include:: samples/templates/template-get.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-08-29T23:31:13.94Z",
        "description": "Template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "Template name",
        "version": {
            "createdAt": "2018-08-29T23:31:15.494Z",
            "engine": "mustache",
            "id": "n2VT1KvjEeikwRJbspqxaQ",
            "template": "<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>"
        }
    }
  }

Retrieve specific version of the template

.. include:: samples/templates/version-get.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "2018-08-30T01:00:40.561Z",
        "description": "Template description",
        "id": "HTmi86vwEeikzhJbspqxaQ",
        "name": "Template name",
        "version": {
            "createdAt": "2018-08-30T01:00:40.563Z",
            "engine": "mustache",
            "id": "HTneFqvwEeikzxJbspqxaQ",
            "template": "{{body}}"
        }
    }
  }

Update template

.. include:: samples/templates/template-update.rst

Sample response:

.. code-block:: javascript

  {
    "message": "template has been updated",
    "item": {
        "createdAt": "2018-08-30T00:39:44.486Z",
        "description": "Updated description",
        "id": "MIvDPKvtEeiMEA472Hdb5w",
        "name": "Updated name"
    }
  }

Delete template version

.. include:: samples/templates/version-delete.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "id": "RjASlKvuEeikxhJbspqxaQ",
        "version": {
            "id": "RjBVX6vuEeikxxJbspqxaQ"
        }
    },
    "message": "version has been deleted"
  }

Delete template

.. include:: samples/templates/template-delete.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "id": "6EdkRqvvEeiMGQ472Hdb5w"
    },
    "message": "template has been deleted"
  }

Delete all templates for domain

.. include:: samples/templates/templates-delete.rst

Sample response:

.. code-block:: javascript

  {
    "message": "templates have been deleted"
  }

