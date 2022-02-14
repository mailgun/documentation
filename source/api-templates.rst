.. _api-templates:

Templates
=========

This API allows you to store predefined templates and use them to send messages using the :ref:`Sending API <api-sending-messages>`.

The Templates API endpoint is available at:

.. code-block:: url

      v3/<domain>/templates

The API has the following limitations:

* 100 templates per domain
* 10 versions per template
* 100Kb max template size


Templates API
------------

Store new template
++++++++++++++++++

.. code-block:: url

    POST /<domain>/templates

This API stores a new template, including its name, description and (optionally) the template content.
If the template content is provided, a new version is automatically created and becomes the active version.

.. container:: ptable

 =============== ==================================================================
 Parameter             Description
 =============== ==================================================================
 name            Name of the template being stored. The name can contain alpha characters, digits and next symbols: .-_~
 description     Description of the template being stored
 template        (Optional) Content of the template
 tag             (Optional) Initial tag of the created version. If the `template` parameter is provided and the `tag` is missing, the default value `initial` is used. The tag can contain alpha-numeric characters and next symbols, such as .-_~
 engine          (Optional) The template engine used to render the template. This is valid only if the `template` parameter is provided. Currently, the Templates API supports only the **handlebars** engine.
 comment         (Optional) Version comment. This is valid only if a new version is being created. (`template` parameter is provided.) 
 =============== ==================================================================

Example of storing only the template metadata:

.. include:: samples/templates/template-create.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "name": "template.name",
    },
    "message": "template has been stored"
  }

Example of storing a template with a version:

.. include:: samples/templates/template-create-version.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "name": "template.name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:14 UTC",
            "engine": "handlebars",
            "tag": "initial",
            "comment": "version comment"
        }
    },
    "message": "template has been stored"
  }


Get template 
+++++++++++++

.. code-block:: url

    GET /<domain>/templates/<name>

Returns metadata information about the stored template specified in the url. If the `active` flag is provided, the content of the active version of the template is returned. 

.. container:: ptable

 =============== ===================================================================
 Parameter       Description
 =============== ===================================================================
 active          (Optional) If this flag is set to **yes** the active version of the template is included in the response. 
 =============== ===================================================================

Example:

.. include:: samples/templates/template-get.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "name": "template.name"
    }
  }

Example of retrieving the active version of a template:

.. include:: samples/templates/template-get-active.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
        "description": "template description",
        "name": "template.name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
            "engine": "handlebars",
            "tag": "v0",
            "template": "{{fname}} {{lname}}",
            "comment": "version comment"
        }
    }
  }

Update template
+++++++++++++++

.. code-block:: url

    PUT /<domain>/templates/<name>

Update the metadata information of the template specified in url.

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 description     Updated description of the template
 =============== ==============================

Example:

.. include:: samples/templates/template-update.rst

Sample response:

.. code-block:: javascript

  {
    "message": "template has been updated",
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
        "description": "new template description",
        "name": "template.name"
    }
  }


Delete template
+++++++++++++++

.. code-block:: url

    DELETE /<domain>/templates/<name>

Delete the template specified in the url. **NOTE:** This method deletes all versions of the specified template.

Example:

.. include:: samples/templates/template-delete.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "name": "template.name"
    },
    "message": "template has been deleted"
  }

View all templates in a domain
++++++++++++++++++++++++++++

.. code-block:: url
    
    GET /<domain>/templates

Returns a list of stored templates for the domain

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 page            Name of a page to retrieve. ``first``, ``last``, ``next``, ``prev`` 
 limit           Number of records to retrieve. Default value is 10 
 p               Pivot is used to retrieve records in chronological order
 =============== ================================================================================


Example:

.. include:: samples/templates/template-get-all.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:15 UTC",
            "description": "Template description",
            "name": "template.0",
        },
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:18 UTC",
            "description": "Template description",
            "name": "template.1"
        },
        {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
            "description": "Template description",
            "name": "template.2"
        }
    ],
    "paging": {
        "first": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?limit=10",
        "last": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=last&limit=10",
        "next": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=next&p=template.2&limit=10",
        "prev": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates?page=prev&p=template.0&limit=10"
    }
  }

Delete all templates in a domain
+++++++++++++++++++++++++++++

.. code-block:: url

   DELETE /<domain>/templates

Delete all stored templates for the domain.

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

Create a new version of a template. If the template doesn't contain any other versions, the first version becomes active.

.. container:: ptable

 =============== ================================================================================
 Parameter       Description
 =============== ================================================================================
 template        Content of the template
 tag             Tag of the version is being created
 engine          (Optional) Template engine. The only engine currently supported is ``handlebars``.
 comment         (Optional) Comments relating to the stored version
 active          (Optional) If this flag is set to ``yes``, this version becomes active
 =============== ================================================================================

Example:

.. include:: samples/templates/version-create.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "template description",
        "name": "template.name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
            "engine": "handlebars",
            "tag": "v1.0.0",
            "comment": "version comment"
        }
    },
    "message": "new version of the template has been stored"
  }

Get version
+++++++++++

.. code-block:: url

    GET /<domain>/templates/<name>/versions/<tag>

Retrieve the information and content of the specified version of a template.

Example:

.. include:: samples/templates/version-get.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "template description",
        "name": "template.name",
        "version": {
            "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
            "engine": "handlebars",
            "tag": "v1.1.0",
            "comment": "version comment",
            "template": "{{fname}} {{lname}}"
        }
    }
  }

Update version
++++++++++++++

.. code-block:: url

    PUT /<domain>/templates/<name>/versions/<tag>

Update information or content of the specific version of the template.

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
   "template": {
       "name": "template.name",
       "version": {
         "tag": "v1.2.0"
       }
    "message": "version has been updated"
 }

Delete version
++++++++++++++
.. code-block:: url

    DELETE /<domain>/templates/<template>/versions/<version>

Delete a specific version of the template.

Example:

.. include:: samples/templates/version-delete.rst

Sample response:

.. code-block:: javascript

 {
   "template": {
       "name": "template.name",
       "version": {
         "tag": "v1.3.0"
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
 page            Name of a page to retrieve. ``first``, ``last``, ``next``, ``prev`` 
 limit           Number of records to retrieve. Default value is 10 
 p               Pivot is used to retrieve records in chronological order
 =============== ================================================================================

Example:

.. include:: samples/templates/version-get-all.rst

Sample response:

.. code-block:: javascript

  {
    "template": {
        "createdAt": "Wed, 29 Aug 2018 23:31:11 UTC",
        "description": "Template description",
        "name": "template.name",
        "versions": [
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:21 UTC",
                "engine": "handlebars",
                "tag": "v0",
                "comment": "Version comment"
            },
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:31 UTC",
                "engine": "handlebars",
                "tag": "v1",
                "comment": "Version comment"
            },
            {
                "createdAt": "Wed, 29 Aug 2018 23:31:41 UTC",
                "engine": "handlebars",
                "tag": "v2",
                "comment": "Version comment"
            }
        ]
    },
    "paging": {
        "first": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?limit=10",
        "last": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=last&limit=10",
        "next": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=next&p=v2&limit=10",
        "prev": "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/z4ujt7CiEeik0RJbspqxaQ/versions?page=prev&p=v0&limit=10"
    }
  }

