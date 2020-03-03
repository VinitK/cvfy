import CertsActionTypes from "./certs.types";

export const addCerts = certs => (
    {
        type: CertsActionTypes.ADD_CERTS,
        payload: certs
    }
);

export const addCert = cert => (
    {
        type: CertsActionTypes.ADD_CERT,
        payload: cert
    }
);