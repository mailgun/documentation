.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate \

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.MailingListVerificationRespo

    // ...

    public MailingListVerificationResponse validateMailingList() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        return mailgunMailingListApi.verifyMailingListMembers(MAILING_LIST_ADDRESS);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support Mailing List verifications.
  # Consider using the following php curl function.
  function upload_bulk_validation() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def validate_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def validate_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ValidateMailingListChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ValidateMailingList ().Content.ToString ());
     }

     public static IRestResponse ValidateMailingList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/validate";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }
