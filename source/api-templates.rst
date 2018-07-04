.. _api-templates:

Templates
=========

The template API allows to store predefined templates and use them to send messages using :ref:`sending API <api-sending-messages>`.

.. code-block:: url

    POST /domains/<domain>/templates

Stores a new template

.. container:: ptable

 =============== ============================
 Parameter             Description
 =============== ============================
 domain                Name of the domain
 template              Template to store
 description           Description of the template
 =============== ============================

.. code-block:: url
    
    GET /domains/<domain>/templates

Returns a list of stored templates

.. container:: ptable

 =============== ==============================
 Parameter        Description
 =============== ==============================
 domain          Name of the domain
 =============== ==============================

.. code-block:: url

    GET /domains/<domain>/templates/<template_id>

Returns details about a template specified in url 

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 domain          Name of the domain
 template_id     Id of template
 =============== ==============================

.. code-block:: url

    PUT /domains/<domain>/templates/<template_id>

Update a template specified in url

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 domain          Name of the domain
 template_id     Id of template
 template        Updated template
 description     Updated description of the template
 =============== ==============================

.. code-block:: url

    DELETE /domains/<domain>/templates/<template_id>

Delete a template specified in url

.. container:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 domain          Name of the domain
 template_id     Id of template
 =============== ==============================

.. code-block:: url

   DELETE /domains/<domain>/templates

Delete all stored templates for specified domain

.. containter:: ptable

 =============== ==============================
 Parameter       Description
 =============== ==============================
 domain          Name of the domain
 =============== ==============================


Examples
~~~~~~~~

Store a template

.. include:: samples/templates/create-template.rst

Sample response:

.. code-block:: javascript

  {
    "id":"bcgpf36d2q100094buc0",
    "message":"template has been stored"
  }

Listing templates

.. include:: samples/templates/get-templates.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
      {
        "description": "Simple template",
        "id": "bc6vml0v9e5g00b46utg",
        "template": "<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>"
      },
      {
        "description": "",
        "id": "bcgpf36d2q100094buc0",
        "template": "done"
      }
    ],
    "paging": {
      "first": "https://api.mailgun.net/v3/<YOUR_DOMAIN_NAME>/templates?limit=100",
      "last": "https://api.mailgun.net/v3/<YOUR_DOMAIN_NAME>/templates?page=last&limit=100",
      "next": "https://api.mailgun.net/v3/<YOUR_DOMAIN_NAME>/templates?page=next&p=bcgpf36d2q100094buc0&limit=100",
      "prev": "https://api.mailgun.net/v3/<YOUR_DOMAIN_NAME>/templates?page=prev&p=bc6vml0v9e5g00b46utg&limit=100"
    }
  }

Access the template by id:

.. include:: samples/templates/get-template.rst

Sample response:

.. code-block:: javascript

  {
    "description": "Simple template",
    "id": "bc6vml0v9e5g00b46utg",
    "template": "<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>"
  }

Update template

.. include:: samples/templates/update-template.rst

Sample response:

.. code-block:: javascript

  {
    "item": {
      "description": "New",
      "id": "bc6vml0v9e5g00b46utg",
      "template": "{{body}}"
      },
      "message": "template has been updated"
  }

Delete template

.. include:: samples/templates/delete-template.rst

Sample response:

.. code-block:: javascript

  {
    "id": "bc6vml0v9e5g00b46utg",
    "message": "template has been deleted"
  }

Delete all templates for domain

.. include:: samples/templates/delete-templates.rst

Sample response:

.. code-block:: javascript

  {
    "message": "templates have been deleted"
  }

