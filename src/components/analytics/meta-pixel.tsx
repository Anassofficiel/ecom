"use client"

import Script from "next/script"

const META_PIXEL_ID = "24800348739620824"


export function MetaPixel() {

  return (

    <Script

      id="meta-pixel"

      strategy="afterInteractive"

      dangerouslySetInnerHTML={{

        __html: `

          !function(f,b,e,v,n,t,s)
          {
            if(f.fbq)return;

            n=f.fbq=function()
            {
              n.callMethod ?

              n.callMethod.apply(n,arguments)

              :

              n.queue.push(arguments)
            };


            if(!f._fbq)
              f._fbq=n;


            n.push=n;

            n.loaded=true;

            n.version='2.0';

            n.queue=[];


            t=b.createElement(e);

            t.async=true;

            t.src=v;


            s=b.getElementsByTagName(e)[0];

            s.parentNode.insertBefore(t,s);


          }(
            window,
            document,
            'script',
            'https://connect.facebook.net/en_US/fbevents.js'
          );


          fbq(
            'init',
            '${META_PIXEL_ID}'
          );


          fbq(
            'track',
            'PageView'
          );

        `,

      }}

    />

  )

}