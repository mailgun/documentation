.. _api-templates:

Templates
=========

The template API allows to store predefined templates and use them to send messages using :ref:`sending API <api-sending-messages>`.
The API has following limitations:

* 100 templates per domains
* 10 versions per template
* 100Kb max template size


Template API
------------

Store new template
++++++++++++++++++

.. code-block:: url

    POST /<domain>/templates

This API allows to store template's name, description plus a template content if it's provided in the request.
If the content is provided it automaticaly create new version of the template and this version becoms active.

.. container:: ptable

 =============== ==================================================================
 Parameter             Description
 =============== ==================================================================
 name            Name of the template being created
 description     Description of the template being created
 template        (Optional) Content of the template
 engine          (Optional) The template engine to use to render the template. Valid only if template parameter is provided. Currently the API supports only one engine: **handlebars**
 comment         (Optional) Version comment. Valid only if new version is being created (template parameter is provided) 
 =============== ==================================================================

Example of storing template metadata only:

.. include:: samples/templates/template-create.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "id": "nj01pavjEeikvBJbspqxaQ",
        "name": "template name",
    },
    "message": "template has been stored"
  }

Example of storing template with a version:

.. include:: samples/templates/template-create-version.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "template name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:14 UTC",
            "engine": "handlebars",
            "id": "nnhwoavjEeikvhJbspqxaQ"
            "comment": "version comment"
        }
    },
    "message": "template has been stored"
  }


Get template 
+++++++++++++

.. code-block:: url

    GET /<domain>/templates/<templateId>

Returns metadata information about a stored template specified in url. Flag active allows to return content of active version of the template. 

.. container:: ptable

 =============== ===================================================================
 Parameter       Description
 =============== ===================================================================
 active          (Optional) If this flag is set to **yes** the active version of the template is included into a response. 
 =============== ===================================================================

Example:

.. include:: samples/templates/template-get.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "template name"
    }
  }

Example of retrieving active version of a template:

.. include:: samples/templates/template-get-active.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "template name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
            "engine": "handlebars",
            "id": "n2VT1KvjEeikwRJbspqxaQ",
            "template": "{{fname}} {{lname}}",
            "comment": "version comment"
        }
    }
  }

Update template
+++++++++++++++

.. code-block:: url

    PUT /<domain>/templates/<templateId>

Update metadata information of a template specified in url

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 name            Updated name of the template
 description     Updated description of the template
 =============== ==============================

Example:

.. include:: samples/templates/template-update.rst

Sample response:

.. code-block:: javascript

  {
    "message": "template has been updated",
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
        "description": "new template description",
        "id": "MIvDPKvtEeiMEA472Hdb5w",
        "name": "new template name"
    }
  }


Delete template
+++++++++++++++

.. code-block:: url

    DELETE /<domain>/templates/<template>

Delete a template specified in url. This method deletes all version of provided template

Example:

.. include:: samples/templates/template-delete.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "id": "6EdkRqvvEeiMGQ472Hdb5w"
    },
    "message": "template has been deleted"
  }

View all templates in domain
++++++++++++++++++++++++++++

.. code-block:: url
    
    GET /<domain>/templates

Returns a list of stored templates in domain

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 page            Name of a page to retrive. ``first``, ``last``, ``next``, ``prev`` 
 limit           Number of records to retrive. Default value is 10 
 p               Pivot is used to retrieve records in chronological order
 =============== ================================================================================


Example:

.. include:: samples/templates/templates-get-all.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
            "description": "Template description 2",
            "id": "nrMT8avjEeikvxJbspqxaQ",
            "name": "Template name 2"
        },
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:18 UTC",
            "description": "Template description 1",
            "id": "nnglwqvjEeikvRJbspqxaQ",
            "name": "Template name 1"
        },
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
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

Delete all template in domain
+++++++++++++++++++++++++++++

.. code-block:: url

   DELETE /<domain>/templates

Delete all stored templates for specified domain

Example:

.. include:: samples/templates/template-delete-all.rst

Sample response:

.. code-block:: javascript

  {
    "message": "templates have been deleted"
  }

Create new version
++++++++++++++++++

.. code-block:: url

    POST /<domain>/templates/<template>/versions

Create new version of the template. If the template doesn't contain any version yet the first version becomes active

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 template        Content of the template
 engine          (Optional) Template engine. Only one engine are supported right now - ``handlebars``.
 comment         (Optional) The comment of the stored version
 active          (Optional) If this flag is set to ``yes`` this version becomes active
 =============== ================================================================================

Example:

.. include:: samples/templates/version-create.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "template name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
            "engine": "handlebars",
            "id": "nymB0KvjEeiMDg472Hdb5w",
            "comment": "version comment"
        }
    },
    "message": "new version of the template has been stored"
  }

Get version
+++++++++++

.. code-block:: url

    GET /<domain>/templates/<template>/versions/<version>

Retrieve information and content of specifed version of the template

Example:

.. include:: samples/templates/version-get.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "template description",
        "id": "nnglwqvjEeikvRJbspqxaQ",
        "name": "template name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
            "engine": "handlebars",
            "id": "nymB0KvjEeiMDg472Hdb5w",
            "comment": "version comment",
            "template": "{{fname}} {{lname}}"
        }
    }
  }

Update version
++++++++++++++

.. code-block:: url

    PUT /<domain>/templates/<template>/versions/<version>

Update information or content of the specific version of the template

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 template        (Optional) The new content of the version
 comment         (Optional) New comment for the provided version
 active          (Optional) If this flag is set to ``yes`` this version becomes active
 =============== ================================================================================

Example:

.. include:: samples/templates/version-update.rst

Sample response:

.. code-block:: javascript

 {
   "item": {
       "id": "nnglwqvjEeikvRJbspqxaQ",
       "version": {
         "id": "nymB0KvjEeiMDg472Hdb5w"
       }
    "message": "version has been udpated"
 }

Delete version
++++++++++++++
.. code-block:: url

    DELETE /<domain>/templates/<template>/versions/<version>

Delete a specific version of the template

Example:

.. include:: samples/templates/version-delete.rst

Sample response:

.. code-block:: javascript

 {
   "item": {
       "id": "nnglwqvjEeikvRJbspqxaQ",
       "version": {
         "id": "nymB0KvjEeiMDg472Hdb5w"
       }
    "message": "version has been deleted"
 }


View all versions in template
+++++++++++++++++++++++++++++

.. code-block:: url
    
    GET /<domain>/templates/<template>/versions

Returns a list of stored versions of the template

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 page            Name of a page to retrive. ``first``, ``last``, ``next``, ``prev`` 
 limit           Number of records to retrive. Default value is 10 
 p               Pivot is used to retrieve records in chronological order
 =============== ================================================================================

Example:

.. include:: samples/templates/version-get-all.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "Template description",
        "id": "z4ujt7CiEeik0RJbspqxaQ",
        "name": "Template name",
        "versions": [
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
                "engine": "handlebars",
                "id": "0EuT-7CiEeik1hJbspqxaQ",
                "comment": "Version comment"
            },
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:31 UTC",
                "engine": "handlebars",
                "id": "0BtzFbCiEeik1RJbspqxaQ",
                "comment": "Version comment"
            },
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:41 UTC",
                "engine": "handlebars",
                "id": "z4vrrbCiEeik0hJbspqxaQ",
                "comment": "Version comment"
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

