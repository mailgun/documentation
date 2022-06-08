
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v4/address/validate/preview/LIST_NAME

.. code-block:: java

    import com.mailgun.api.v4.MailgunEmailVerificationApi;
    import com.mailgun.client.MailgunClient;
    import feign.Response;

    // ...

    public Response cancelBulkPreview() {
        MailgunEmailVerificationApi mailgunEmailVerificationApi = MailgunClient.config(API_KEY)
                .createApi(MailgunEmailVerificationApi.class);

        return mailgunEmailVerificationApi.deleteBulkVerificationPreview(LIST_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function delete_bulk_preview() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/preview/LIST_NAME');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def delete_bulk_preview():
     return requests.delete(
         ("https://api.mailgun.net/v4/address/validate/preview/LIST_NAME"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def delete_bulk_preview
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v4/address/validate/preview/LIST_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteBulkPreview
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeletePreview ().Content.ToString ());
     }

     public static IRestResponse DeletePreview()
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
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }
