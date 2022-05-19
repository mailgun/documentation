
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME

.. code-block:: java

    import com.mailgun.api.v4.MailgunEmailVerificationApi;
    import com.mailgun.client.MailgunClient;

    // ...

    public String cancelBulkVerificationJob() {
        MailgunEmailVerificationApi mailgunEmailVerificationApi = MailgunClient.config(API_KEY)
                .createApi(MailgunEmailVerificationApi.class);

        return mailgunEmailVerificationApi.cancelBulkVerificationJob(LIST_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function delete_bulk_validation() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def cancel_bulk_validation():
     return requests.delete(
         ("https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def cancel_bulk_validation
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v4/address/validate/bulk/LIST_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteBulkValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CancelBulkValidation ().Content.ToString ());
     }

     public static IRestResponse CancelBulkValidation()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "address/validate/bulk/{list}";
         request.AddParameter ("list", "LIST_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const canceledJob = await client.validate.multipleValidation.destroy('validationList');
      console.log('canceledJob ->', canceledJob);
    } catch (error) {
      console.error(error);
    }
  })();
