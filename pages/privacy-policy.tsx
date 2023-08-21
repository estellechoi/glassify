import type { NextPage } from 'next';
import Main from '@/components/Main';
import A from '@/components/A';
import Heading from '@/components/Heading';

const PrivacyPolicy: NextPage = () => {
  return (
    <Main className="Padding_page Font_body_md space-y-page_gap">
      <Heading tagName="h2">Privacy Policy</Heading>

      <p>
        <em>Last modified: Aug 17, 2023</em>
      </p>

      <p>
        This Privacy Policy (the &quot;Policy&quot;) explains how Paper Foundation (&quot;Paper, the &quot;Team&quot;,
        &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) collects, uses, and shares data in connection with the Paper web app
        (paper-vert.vercel.app), www.paper-vert.vercel.app website and all of our other properties, products, and services (the
        &quot;Services&quot;). Your use of the Services is subject to this Policy as well as our Terms of Use.
      </p>

      <h3>High Level Summary</h3>

      <ul className="list-disc list-outside pl-4">
        <li>
          Paper Foundation is not an incorporated company, but stands for a team based in the Republic of Korea that operates
          https://paper-vert.vercel.app among other products and services. Paper Foundation complies with Korean laws and
          regulations.
        </li>

        <br />

        <li>
          Paper does not collect and store personal data, such as first name, last name, street address, date of birth, email
          address, or IP address, in connection with your use of the Services.
        </li>

        <br />

        <li>
          Paper collects non-identifiable data, such as public on-chain data, and limited off-chain data like device type, browser
          version, etc. This is to help drive production vision, not track users.
        </li>

        <br />

        <li>
          If you specifically sign up to receive emails from us, we will store your email address to allow us to send you those
          emails. You can unsubscribe at any time. We will not attempt to link your email address to your wallet address, IP
          address, or other personal data.
        </li>

        <br />

        <li>
          Paper continues to explore methods to further protect consumers&apos; privacy, such as opt-out prompts, migrating to
          privacy-centric tooling and deploying proxies to anonymize network traffic.
        </li>

        <br />

        <li>Any material changes to privacy will be reflected in an updated privacy policy</li>
      </ul>

      <h3>Third Party Cookies</h3>

      <p>
        We use services provided by Google and other third parties that use tracking technology such as cookies, deviceID, and
        localStorage, to collect information about your use of the Services and our interactions with you. You can opt out of
        having your online activity and device data collected through these third-party services, including by:
      </p>

      <p>
        Blocking cookies in your browser by following the instructions in your browser settings. For more information about
        cookies, including how to see the cookies on your device, manage them, and delete them, visit{' '}
        <A href="http://www.allaboutcookies.org/">www.allaboutcookies.org</A>.
      </p>

      <p>Blocking or limiting the use of your advertising ID on your mobile device through the device settings.</p>

      <p>
        Using privacy plug-ins or browsers. Certain browsers and browser extensions can be configured to block third-party cookies
        and trackers.
      </p>

      <p>
        Using the platform opt-out provided by Google at <A href="https://adssettings.google.com">adssettings.google.com</A>. You
        can learn more about how Google uses your information by reviewing Google&apos;s privacy policy at
        <A href="https://policies.google.com/privacy">policies.google.com/privacy</A>.
      </p>

      <p>
        Using advertising industry opt-out tools on each device or browser where you use the Services, available at
        <A href="https://optout.aboutads.info">optout.aboutads.info</A> and{' '}
        <A href="https://optout.networkadvertising.org">optout.networkadvertising.org</A>.
      </p>

      <h3>Third-Party Links and Sites</h3>

      <p>
        We may integrate technologies operated or controlled by other parties into parts of the Services. For example, the
        Services may include links that hyperlink to websites, platforms, and other services not operated or controlled by us.
        Please note that when you interact with these other parties, including when you leave the Site, those parties may
        independently collect information about you and solicit information from you. You can learn more about how those parties
        collect and use your data by consulting their privacy policies and other terms.
      </p>

      <h3>Security</h3>

      <p>
        We implement and maintain reasonable administrative, physical, and technical security safeguards to help protect data from
        loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Nevertheless, transmission via the
        internet is not completely secure and we cannot guarantee the security of information about you. You are responsible for
        all of your activity on the Services, including the security of your blockchain network addresses, cryptocurrency wallets,
        and their cryptographic keys.
      </p>

      <h3>Age Requirements</h3>

      <p>
        The Services are intended for a general audience and are not directed at children. We do not knowingly receive personal
        information (as defined by the U.S. Children&apos;s Privacy Protection Act, or “COPPA”) from children. If you believe we
        have received personal information about a child under the age of 18, please contact us.
      </p>

      <h3>Additional Notice to California Residents (“CCPA Notice”)</h3>

      <p>
        The California Consumer Privacy Act of 2018 (“CCPA”) requires certain businesses to provide a CCPA Notice to California
        residents to explain how we collect, use, and share their personal information, and the rights and choices we offer
        California residents regarding our handling of their information.
      </p>

      <h3>Disclosures for European Union Data Subjects</h3>

      <p>
        We process personal data for the purposes described in the section titled “How We Use Data” above. Our bases for
        processing your data include: (i) you have given consent to the process to us or our service provides for one or more
        specific purposes; (ii) processing is necessary for the performance of a contract with you; (iii) processing is necessary
        for compliance with a legal obligation; and/or (iv) processing is necessary for the purposes of the legitimate interested
        pursued by us or a third party, and your interests and fundamental rights and freedoms do not override those interests.
      </p>

      <h3>Changes to this Policy</h3>

      <p>
        If we make material changes to this Policy, we will notify you via the Services. Nevertheless, your continued use of the
        Services reflects your periodic review of this Policy and other Company terms, and indicates your consent to them.
      </p>
    </Main>
  );
};

export default PrivacyPolicy;
