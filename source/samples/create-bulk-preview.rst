.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v4/address/validate/preview/LIST_NAME \
      -F 'file=@/path/to/file' \

.. code-block:: java

    import com.mailgun.api.v4.MailgunEmailVerificationApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.verification.BulkVerificationCreatingResponse;
    import com.mailgun.model.verification.BulkVerificationStatusRequest;
    import java.io.File;

    // ...

    public BulkVerificationCreatingResponse createBulkPreview() {
        MailgunEmailVerificationApi mailgunEmailVerificationApi = MailgunClient.config(API_KEY)
                .createApi(MailgunEmailVerificationApi.class);

        BulkVerificationStatusRequest request = BulkVerificationStatusRequest.builder()
                .file(new File("/path/to/file"))
                .build();

        return mailgunEmailVerificationApi.createBulkVerificationPreview(LIST_NAME, request);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function create_bulk_preview() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/preview/LIST_NAME');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'file'=> curl_file_create('subscribers.csv'))
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def create_bulk_preview():
     return requests.post(
         "https://api.mailgun.net/v4/address/validate/preview/LIST_NAME",
         files = {'file': open('/path/to/file','rb')},
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_bulk_preview
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/address/validate/preview/LIST_NAME",
                   fields_hash.merge(:file => File.new('/path/to/file')))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class BulkPreview
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateBulkPreview ().Content.ToString ());
     }

     public static IRestResponse CreateBulkPreview ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "address/validate/preview/{list}";
         request.AddParameter ("list", "LIST_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.POST;
         request.AddFile("file", @"/path/to/file");
         return client.Execute (request);
     }

 }
