.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME \
      -F 'file=@/path/to/file' \

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode validateMailingList() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME")
             .basicAuth("api", API_KEY)
             .field("file", new File("/path/to/file"))
             .asJson();

         return request.getBody();
     }
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

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);
  const path = require('path');
  const fsPromises = require('fs').promises;
  const filepath = path.resolve(__dirname, '../emailsValidationList.csv');

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const file = {
        filename: 'emailsValidationList.csv',
        data: await fsPromises.readFile(filepath)
      };

      const validationRes = await client.validate.multipleValidation.create('validationList', {file: file});
      console.log('validationRes', validationRes);
    } catch (error) {
        console.error(error);
    }
  })();
