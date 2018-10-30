.. _api-list-validation:

List Validations
================

The List Validation API uses our :ref:`email address validation service <api-email-validation>` to validate a :ref:`Mailing List <api-mailinglists>`.

.. code-block:: url

     POST /lists/<list_name>/validate

Create a List Email Validation job.

.. code-block:: url

     GET /v3/lists/<list_name>/validate

Retrieve status on List Email Validation job.

.. code-block:: url

     DELETE /v3/lists/<list_name>/validate

Delete List Email Validation list job.

Examples
--------

Submit a Validation List job.

.. include:: samples/create-list-validation.rst

.. code-block:: javascript

    {
      "id": "c12345-df7e-4145-a1d2-5a961867a8ed",
      "message": "The validation job was submitted."
    }

Processing:

.. include:: samples/get-list-validation.rst

.. code-block:: javascript

    {
      "created_at": 1539816623,
      "ended_at": null,
      "id": "c02b6a30-df7e-4145-a1d2-5a961867a8ed",
      "list_id": "testing@domain.com",
      "quantity": 200000,
      "records_processed": null,
      "started_at": 1539816623,
      "status": "processing",
      "updated_at": 1539816623
    }

Completed:

.. code-block:: javascript

    {
      "created_at": 1539816623,
      "download_url": {
        "csv": "https://usw2-mg-validation.s3.amazonaws.com/c02b6a30-df7e-4145-a1d2-5a961867a8ed.csv.gz?AWSAccessKeyId=ASIASBQJZTBC474NQEYS&Expires=1540421571&x-amz-security-token=FQoGZXIvYXdzEAYaDNYtaeQn7%2FsP7QDRViK3Aya5A0IaZ%2FrTDeKyU%2BHHzc3dc5vDMnxU2Ef21gY3SDVdpfJkVheKopzxRQEH6%2FP7gKEZLuF5N%2FmCaUyVvDyqpTS61SSVWBpOZpxnftYWGjpev6V6JWCDOuxjeJsu30COxGwvKUgQUq2C95rfEjCghCA6jFrjYgr%2FIISBPqjfs2AheURRBrGkaG9st0x51QHpPgqRdxeYZOTLjFUXIgNfdBP6QGJ2tGms3IjCRImYw3IR7eJlA7%2FJkrG4pH1RA3dwTiafOhLH5CMEl2t1tGho0U7pH%2FyYk3AVqXqLw0j6oqyADf24LSY4hyR%2BBrUA1YHsJkk4wJFDSId6uaqVn%2BZtnZlZWXaQd0SkY0a8cnmI8XuVjNA1WJ4lTMGRIbfwlluGUiVBVH%2BlhUYhnNrvrO44tp1XAPvHSRMGEt%2BGcFM9oYJQyCqSFEwt0NvGJMIwhiLSgoV0BU2HoSgrWFj2d5FhaER%2F19IIaqrfSJXEXgAVoYvOrTyHdoVkv0aY6op1uQv0Kdd%2BH3UNfdrr4V9UXsQoRha2d1Z7pI3g0rPwbiM8LqY8wYxhwmZqrQSrmTPMMdHhBGrLHHUCqLEorKjD3gU%3D&Signature=U8YtXWv2Ha74O3mf54q%2FdOJP7E4%3D",
        "json": "https://usw2-mg-validation.s3.amazonaws.com/c02b6a30-df7e-4145-a1d2-5a961867a8ed.json.gz?AWSAccessKeyId=ASIASBQJZTBC474NQEYS&Expires=1540421571&x-amz-security-token=FQoGZXIvYXdzEAYaDNYtaeQn7%2FsP7QDRViK3Aya5A0IaZ%2FrTDeKyU%2BHHzc3dc5vDMnxU2Ef21gY3SDVdpfJkVheKopzxRQEH6%2FP7gKEZLuF5N%2FmCaUyVvDyqpTS61SSVWBpOZpxnftYWGjpev6V6JWCDOuxjeJsu30COxGwvKUgQUq2C95rfEjCghCA6jFrjYgr%2FIISBPqjfs2AheURRBrGkaG9st0x51QHpPgqRdxeYZOTLjFUXIgNfdBP6QGJ2tGms3IjCRImYw3IR7eJlA7%2FJkrG4pH1RA3dwTiafOhLH5CMEl2t1tGho0U7pH%2FyYk3AVqXqLw0j6oqyADf24LSY4hyR%2BBrUA1YHsJkk4wJFDSId6uaqVn%2BZtnZlZWXaQd0SkY0a8cnmI8XuVjNA1WJ4lTMGRIbfwlluGUiVBVH%2BlhUYhnNrvrO44tp1XAPvHSRMGEt%2BGcFM9oYJQyCqSFEwt0NvGJMIwhiLSgoV0BU2HoSgrWFj2d5FhaER%2F19IIaqrfSJXEXgAVoYvOrTyHdoVkv0aY6op1uQv0Kdd%2BH3UNfdrr4V9UXsQoRha2d1Z7pI3g0rPwbiM8LqY8wYxhwmZqrQSrmTPMMdHhBGrLHHUCqLEorKjD3gU%3D&Signature=DuvDzHLHRB5np3leopbbIY5xOXA%3D"
      },
      "ended_at": 1539816932,
      "id": "c02b6a30-df7e-4145-a1d2-5a961867a8ed",
      "list_id": "testing@domain.com",
      "quantity": 200000,
      "records_processed": 200000,
      "started_at": 1539816623,
      "status": "uploaded"
    }

Canceled:

.. code-block:: javascript

    {
      "created_at": 1540493890,
      "ended_at": 1540493926,
      "id": "532ea4ba-0f7e-420f-8cbf-243b46f10791",
      "list_id": "testing@domain.com",
      "quantity": 200000,
      "records_processed": null,
      "started_at": 1540493890,
      "status": "canceled"
    }

Delete List Email Validation job.

.. include:: samples/delete-list-validation.rst

.. code-block:: javascript

    {
        "Validation job canceled."
    }
