
.. code-block:: bash

 # with utility from `quoted-printable` nodejs lib (`npm install -g quoted-printable`)
 decoded_message=$(quoted-printable --decode <<< "${encoded_message}")

.. code-block:: java

 // using Apache Commons / commons-codec
 import org.apache.commons.codec.net.QuotedPrintableCodec;

 // ...
 String decodedMessage = new QuotedPrintableCodec().decode(encodedMessage);

.. code-block:: php

 $decoded_message = quoted_printable_decode($encoded_message);

.. code-block:: py

 import quopri

 # ...
 decoded_message = quopri.decodestring(encoded_message)

.. code-block:: rb

 decoded_message = encoded_message.unpack('M*')

.. code-block:: csharp

 using System;
 using System.Text.RegularExpressions;

 public class DecodeMessageSample
 {
     // from <http://www.dpit.co.uk/decoding-quoted-printable-email-in-c/>
     private string DecodeQuotedPrintable(string input)
     {
       var occurences = new Regex(@"(=[0-9A-Z][0-9A-Z])+", RegexOptions.Multiline);
       var matches = occurences.Matches(input);
       foreach (Match m in matches)
       {
         byte[] bytes = new byte[m.Value.Length / 3];
         for (int i = 0; i < bytes.Length; i++)
         {
            string hex = m.Value.Substring(i * 3 + 1, 2);
            int iHex = Convert.ToInt32(hex, 16);
            bytes[i] = Convert.ToByte(iHex);
          }
          input = input.Replace(m.Value, Encoding.Default.GetString(bytes));
        }
        return input.Replace("=rn", "");
     }

     public void doThings()
     {
             // ...
         var decodedMessage = DecodeQuotedPrintable(encodedMessage);
     }
 }

.. code-block:: go

 import (
    "io/ioutil"
    "mime/quotedprintable"
    "strings"
 )

 func DecodeMessage(encodedMessage string) (string) {
    decodedMessage, err := ioutil.ReadAll(quotedPrintable.NewReader(strings.NewReader(encodedMessage)))
    if err != nil {
        panic(err);
    }
    return decodedMessage
 }
