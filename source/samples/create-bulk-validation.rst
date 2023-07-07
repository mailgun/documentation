.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME \
      -F 'file=@/path/to/file' \

.. code-block:: java

    import com.mailgun.api.v4.MailgunEmailVerificationApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.verification.BulkVerificationCreatingResponse;
    import com.mailgun.model.verification.BulkVerificationStatusRequest;
    import java.io.File;

    // ...

    public BulkVerificationCreatingResponse createBulkVerificationJob() {
        MailgunEmailVerificationApi mailgunEmailVerificationApi = MailgunClient.config(API_KEY)
                .createApi(MailgunEmailVerificationApi.class);

        BulkVerificationStatusRequest request = BulkVerificationStatusRequest.builder()
                .file(new File("/path/to/file"))
                .build();

        return mailgunEmailVerificationApi.createBulkVerificationJob(LIST_NAME, request);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function upload_bulk_validation() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'file'=> curl_file_create('subscribers.csv'))
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def validate_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME",
         files = {'file': open('/path/to/file','rb')},
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def validate_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/address/validate/bulk/LIST_NAME",
                   fields_hash.merge(:file => File.new('/path/to/file')))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class BulkValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (BulkValidation ().Content.ToString ());
     }

     public static IRestResponse BulkValidation ()
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
         request.Method = Method.POST;
         request.AddFile("file", @"/path/to/file");
         return client.Execute (request);
     }

 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';
  import path from 'node:path';
  import fs from 'node:fs/promises';

  const mailgun = new Mailgun(formData);
  const filepath = path.resolve('../emailsValidationList.csv');

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const file = {
        filename: 'emailsValidationList.csv',
        data: await fs.readFile(filepath)
      };

      const validationRes = await client.validate.multipleValidation.create('validationList', {file: file});
      console.log('validationRes', validationRes);
    } catch (error) {
        console.error(error);
    }
  })();
