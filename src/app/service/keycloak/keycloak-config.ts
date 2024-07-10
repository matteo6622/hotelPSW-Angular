import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8180/', // URL del server Keycloak
    realm: 'hotelPSW', // Nome del realm
    clientId: 'bsn' // ID del client
    
    
  };
   
  export default keycloakConfig;