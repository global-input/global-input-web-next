import React from 'react';


import {externalsLinks,examplesLinks,pagesLinks} from '../../links-components';
import SimpleContainer from '../../page-components/section-containers/simple-container';
import ButtonsContainer from '../../page-components/buttons-container';


const {SendMessageListExample} = examplesLinks;
const {DocumentationButton,SendMessageAppButton}  = pagesLinks.buttons;

const DocuButton=props=>{
    if(props.isSideMenu){
      return null;
    }
    return (<DocumentationButton>Documentation</DocumentationButton>);
}
const FooterButtons=props=>{

  return(
    <ButtonsContainer>
        <SendMessageAppButton>Example</SendMessageAppButton>
        <DocuButton {...props}/>
    </ButtonsContainer>
  )

}




const PortablePersonalStorage=props=>{
    const {P,Title,ListLinks,Code,Concept,FirstSection,NextSection}=props.theme;
    return(
      <React.Fragment>
        <FirstSection>
          <Title>Portable Personal Storage</Title>
        </FirstSection>
        <NextSection>
          <P>
            Global Input App (GIA) provides applications with an option of allowing users to store their personal data in their mobile devices with the
             ability to push the data on demand when they are requested by the applications.

           The data in the mobile app are always encrypted with the encryption keys that are in turn encrypted with a master encryption key.
           The master encryption key is always calculated, as part of the login session, from the app password that the user has provided.
           This mechanism protects the data in the case of somebody having physically got hold of the device, and having bypassed the device security such as biometric authentication or device password authentication.
          </P>
          <P>
          To minimize the reliance on the system security, GIA ensures that the data will always stay encrypted until to the point of actual use and the decrypted data will be discarded immediately after the use.
Hence, confidential data such as user credentials, personal information, user preferences for personalized experiences etc. can be safely stored in
the mobile app's storage with the ability of pushing them to the application on demand.
A connected application can send personalized data to the GIA, which presents the user with an option of saving it for later use.
          </P>

          <P>
      The GIA mobile integration solution also allows applications to conveniently and reliably implement various GDPR compliance requirements such
      as obtaining user consent on collecting and processing personal data, encrypting the data with personal accountability,
      and managing and processing the data with auditability.

          </P>
          <P>
          The GIA privacy solution provides the data security by storing the master encryption keys in the
    mobile devices with the ability to decrypt the encryption keys with the mobile devices, initiating the data processing session.
    This mimises the
    reliance of the data security on the systems security, also provides the possibility of allowing users to take back control of their data,
    so that user data can only be decrypted and accessed with user permission only.

          </P>
          <P>
            The ability of portable encrypted data storage to store any application data provides the possibility of automating some
            manual operations, such as subscription, job applications etc.
          </P>
</NextSection>
<FirstSection>
      <SimpleContainer>
            <FooterButtons {...props}/>
      </SimpleContainer>
</FirstSection>

      </React.Fragment>
    );
};
PortablePersonalStorage.menu={
  id:"portablePersonalStorage",
  label:"Portable Personal Storage"
}
export default PortablePersonalStorage;
