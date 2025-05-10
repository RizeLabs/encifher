export const blogs = [
  {
    title: "Confidential Computing Part - 2: Remote Attestation Transport Layer Security (RA-TLS)",
    slug: "confidential-computing-part-2-remote-attestation-transport-layer-security-ra-tls",
    image: "/confidential-computing-2/cover.png",
    readtime: "20",
    date: "10 May 2025",
    content: "This technical analysis explores the foundations, communication components, and verification mechanisms of Remote Attestation obtained from Trusted Execution Environments (TEEs).",
    sections: [
      {
        header: "Remote Attestation Transport Layer Security (RA-TLS): A Technical Deep Dive",
        content: "This technical analysis explores the foundations, communication components, and verification mechanisms of Remote Attestation obtained from Trusted Execution Environments (TEEs). \n\n In this article, we'll start with the fundamentals of RA-TLS, explore its communication flow, analyze verification mechanisms, and conclude with security considerations. Let's begin with the mathematical foundations. \n\n Remote Attestation Transport Layer Security (RA-TLS) is a security protocol that integrates hardware-based attestation with TLS connections. This article focuses specifically on Intel's implementation of RA-TLS using Intel SGX and TDX technologies, which represent the most widely deployed TEE solutions in cloud environments today. \n\n **In this deep dive, you’ll explore:** \n\n - How RA-TLS extends traditional TLS \n - Cryptographic foundations and trust models \n- Step-by-step RA-TLS certificate generation and verification \n- DCAP infrastructure and technical distinctions \n- Detailed verification algorithms \n- Security considerations and real-world limitations"
      },
      {
        header: "Traditional TLS vs. RA-TLS",
        content: `Transport Layer Security (TLS) is the foundation of secure internet communication, providing confidentiality, integrity, and authentication between clients and servers. Traditional TLS relies on Certificate Authorities (CAs) that pre-issue certificates to establish server identity.

RA-TLS extends this model by:
1. Dynamically generating certificates at runtime instead of relying on pre-issued certificates
2. Including hardware attestation evidence within the certificate  
3. Verifying both server identity **and** the integrity of the execution environment  
4. Establishing trust based on hardware measurements rather than just organizational identity

\nThis allows clients to verify not only *who* they're talking to, but also *what code* is running in the secure environment and whether the platform can be trusted.

\nLet's dive deep!
`
      },
      {
        header: "1. Mathematical Foundations and Core Concepts",
        content: `Our exploration of RA-TLS begins with its foundational concepts. We'll establish the mathematical and cryptographic building blocks that make remote attestation possible, before examining how these components work together in practice.

How can you trust that the remote server isn't compromised? RA-TLS solves this exact challenge by combining hardware-backed remote attestation with TLS.
    
RA-TLS combines Remote Attestation with TLS to establish trusted connections among multiple TEEs. Unlike traditional TLS which relies on pre-issued certificates, RA-TLS dynamically generates certificates at runtime that contain proof of the TEE's trustworthiness.`
      },
      {
        header: "1.1 Components and Trust Model",
        content: `The key components in the RA-TLS system form a trust chain that can be represented as:

![ctm.png](/confidential-computing-2/1.png)

**Where:**

- **TEE Hardware**: Physical Intel platform with security features  
- **Attestation Key**: PCK (Provisioning Certification Key)  
- **Quote**: Cryptographically signed statement about the TEE's state  
- **X.509 Certificate**: Standard certificate format with custom extension containing the quote  
- **TLS Connection**: Secure channel established using the certificate`
      },
      {
        header: "1.2 Cryptographic Primitives",
        content: `RA-TLS relies on these cryptographic primitives:
    
- **ECDSA-P256**: Used for signing quotes and TLS certificates  
- **SHA-256 / SHA-384**: Hash functions used for integrity verification  
- **X.509 Certificate Extensions**: For embedding attestation data  
- **TLS 1.3**: Protocol for secure communication`
      },
      {
        header: "1.3 Trust Anchors",
        content: `- **Intel Root CA**: Ultimate trust anchor in the chain  
- **Intel PCK CA**: Intermediate CA that issues PCK certificates  
- **PCK Certificate**: Binds platform identity to attestation key  
- **Measurement hashes**: Cryptographic representations of code and configuration
    
**Key Takeaways:**

- RA-TLS extends traditional TLS by embedding hardware attestation in certificates  
- The trust chain flows from TEE hardware through to the TLS connection  
- Intel's Root CA serves as the ultimate trust anchor for the system  
- Cryptographic primitives like **ECDSA-P256** and **SHA-256** secure the attestation`
      },
      {
        header: "2. RA-TLS Protocol and Information Flow",
        content: `Now that we understand the trust model and cryptographic foundations of RA-TLS, let's examine how information actually flows between components in a real-world deployment. This section maps out the complete journey from quote generation inside the TEE to verification by the client.
      
The security of RA-TLS depends on the proper flow of attestation information between components. **Figure 2** illustrates this flow in detail:
![ra-tls-flow.png](/confidential-computing-2/2.png)
`
      },
      {
        header: "2.1 Server-Side Certificate Generation",
        content: `The enclave follows these precise steps to generate its certificate:
      
- **Key Generation**: Creates a secp256r1 (NIST P-256) ECC key pair  
- **Report Data Preparation**: Computes \`SHA-256(public_key_der)\` of the public key  
- **Quote Generation**: Calls DCAP APIs to generate a quote containing the hash of the public key  
- **Certificate Creation**: Creates an X.509 certificate with the quote embedded in a custom extension
      
 **Sample Code: Server-side RA-TLS certificate generation (Rust)**
      
\`\`\`rust
fn generate_attested_tls_cert() -> Result<(Vec<Certificate>, PrivateKey), Error> {
    // 1. Generate ECC key pair (secp256r1/P-256)
    let keypair = rcgen::KeyPair::generate(&rcgen::PKCS_ECDSA_P256_SHA256)?;
    let public_key_der = keypair.public_key_raw();

    // 2. Calculate hash of public key for report_data
    let mut report_data = [0u8; 64];
    report_data[..32].copy_from_slice(&sha256(&public_key_der));

    // 3. Request quote from hardware TEE
    let quote = generate_tdx_quote(&report_data)?;

    // 4. Create certificate with embedded quote
    let mut params = CertificateParams::new(vec!["ra-tls-server".to_string()]);
    params.key_pair = Some(keypair);
    params.custom_extensions.push(CustomExtension::from_oid_content(
        "1.2.840.113741.1.13.1", // Intel attestation extension OID
        quote,
    ));

    let cert = Certificate::from_params(params)?;
    let cert_der = cert.serialize_der()?;
    let key_der = cert.serialize_private_key_der();

    Ok((vec![cert_der], key_der))
}
\`\`\`

This process ensures that the generated certificate contains both the public key and verifiable attestation data, forming the foundation for a trusted RA-TLS session.`
      },
      {
        header: "2.2 TLS Server Configuration",
        content: `The RA-TLS server is configured using the attested certificate:
      
**Server Configuration Code (Rust)**
      
\`\`\`rust
// Configure TLS server with attested certificate
let tls_config = ServerConfig::builder()
    .with_safe_defaults()
    .with_no_client_auth()
    .with_single_cert(cert_chain, private_key)?;

let acceptor = TlsAcceptor::from(Arc::new(tls_config));
\`\`\`
      
Now that we've seen how the server generates and configures its attested certificate, let's examine how clients verify this certificate during TLS handshakes.`
      },
      {
        header: "2.3 Client-Side Verification Protocol",
        content: `### Certificate Delivery Mechanism

In RA-TLS, the X.509 certificate with the embedded attestation quote is delivered to the client during the TLS handshake. Here's how it works:
      
**TLS Handshake Initiation:**
      
1. Client sends **ClientHello** message to the server  
2. Server responds with **ServerHello**, followed by a **Certificate** message  
3. This **Certificate** message contains the attestation-enhanced X.509 certificate
      
**Certificate Access:**
      
- The TLS library (like OpenSSL, Rustls, etc.) receives the certificate automatically  
- The client application accesses the certificate through the TLS library's API  
- No special HTTP parameters or separate requests are needed
      
**Replay Attack Prevention**

RA-TLS inherently defends against replay attacks through two mechanisms:

1. **Report Data Binding**: The attestation quote contains the hash of the TLS public key in its \`\`\`report_data\`\`\` field. This binds the quote to a specific TLS session.  
2. **TLS Nonce Integration**: The TLS handshake includes client and server random values (nonces). Since the attestation is tied to the TLS session, which includes these nonces, an attacker cannot replay an old attestation for a new TLS session.

This time-binding ensures that attestation evidence is fresh and relevant to the current connection attempt.

**Implementation in Client Applications**

Here's how a typical client application would implement RA-TLS verification:

\`\`\`rust
// Example using Rustls
fn connect_and_verify(server_address: &str) -> Result<TlsStream<TcpStream>, Error> {
    // Create TLS connector with custom certificate verifier
    let mut root_store = RootCertStore::empty();
    // ... add root certificates if needed ...

    // Create custom certificate verifier that performs RA-TLS verification
    let verifier = RaTlsVerifier::new();

    let mut config = ClientConfig::builder()
        .with_safe_defaults()
        .with_custom_certificate_verifier(Arc::new(verifier))
        .with_no_client_auth();

    let server_name = ServerName::try_from(server_address)?;
    let connector = ClientConnection::new(Arc::new(config), server_name)?;

    // Connect TCP
    let tcp_stream = TcpStream::connect(server_address)?;

    // Start TLS handshake
    let mut tls_stream = TlsStream::new(connector, tcp_stream);

    // TLS handshake occurs here, and our custom verifier is called
    tls_stream.complete_io()?;

    Ok(tls_stream)
}

// Custom certificate verifier that implements Rustls CertificateVerifier trait
struct RaTlsVerifier;

impl CertificateVerifier for RaTlsVerifier {
    fn verify_server_cert(
        &self,
        end_entity: &Certificate,
        intermediates: &[Certificate],
        server_name: &ServerName,
        scts: &mut dyn Iterator<Item = &[u8]>,
        ocsp_response: &[u8],
        now: SystemTime,
    ) -> Result<ServerCertVerified, Error> {
        // Parse the X.509 certificate
        let x509_cert = X509Certificate::from_der(end_entity.as_ref())?;

        // Call our verification function
        verify_ra_tls_cert(&x509_cert)?;

        // If verification succeeds, we approve the certificate
        Ok(ServerCertVerified::assertion())
    }

    // ... other required methods ...
}

\`\`\`

1. **Certificate Extraction**: The certificate comes from the TLS handshake, delivered by the server
2. **Quote Extraction**: The function extracts the Intel attestation quote from a custom X.509 extension
3. **Collateral Fetching**: \`\`\`etch_attestation_collateral()\`\`\` likely queries an attestation service for verification materials
4. **Quote Verification**: The previously detailed \`\`\`verify()\`\`\` function validates the quote's authenticity
5. **Key Binding**: Verifies the certificate's public key matches what's in the quote's report_data
6. **[TCB(Trusted Computing Base)](https://learn.microsoft.com/en-us/azure/confidential-computing/trusted-compute-base)** **Status Check**: Ensures the platform meets security requirements

The verification process requires additional supporting materials beyond just the quote itself. Let's examine how these collateral materials are obtained:

**Collateral Acquisition**

The \`\`\`fetch_attestation_collateral()\`\`\` function is particularly important. It typically:

1. Extracts the FMSPC (Family-Model-Stepping-Platform-Customer) identifier from the quote
2. Queries Intel's Provisioning Certification Service (PCS) or a caching service for fetching necessary collateral for attestation verification.
3. Retrieves the required collateral (PCK certificates, TCB info, etc.) which is required to verify the attestation report.
4. Caches this information to avoid repeated network requests

\`\`\`rust
fn fetch_attestation_collateral(quote: &[u8]) -> Result<Collateral, Error> {
    // Extract FMSPC from quote
    let parsed_quote = parse_tdx_quote(quote)?;
    let fmspc = extract_fmspc_from_quote(parsed_quote)?;

    // Check cache first
    if let Some(collateral) = COLLATERAL_CACHE.get(&fmspc) {
        if !is_collateral_expired(collateral) {
            return Ok(collateral.clone());
        }
    }

    // Fetch from Intel PCS or caching service
    let pck_cert = fetch_from_pcs(&format!("/pckcert?fmspc={}", hex::encode(fmspc)))?;
    let tcb_info = fetch_from_pcs(&format!("/tcb?fmspc={}", hex::encode(fmspc)))?;
    let pck_crl = fetch_from_pcs("/pckcrl")?;
    let root_ca_crl = fetch_from_pcs("/rootcacrl")?;
    // ... fetch other collateral components ...

    let collateral = Collateral {
        fmspc,
        pck_cert,
        pck_crl,
        root_ca_crl,
        tcb_info,
        // ... other components ...
    };

    // Update cache
    COLLATERAL_CACHE.insert(fmspc, collateral.clone());

    Ok(collateral)
}
\`\`\`

**Security Timing Considerations**

A critical security consideration is that the verification must occur during the TLS handshake, before any application data is sent or received. This prevents an attacker from sending unattested data to the client.

Most TLS libraries support this through certificate verification callbacks that are invoked during the handshake. The handshake only completes if the verification is successful.

This integration of attestation verification directly into the TLS certificate validation process is what makes RA-TLS both secure and elegant - it leverages the existing TLS infrastructure while adding powerful attestation capabilities.

The client performs a multi-stage verification process to authenticate the TEE:

\`\`\`rust
// Client verification protocol
pub fn verify_ra_tls_cert(cert: &X509Certificate) -> Result<(), Error> {
    // Stage 1: Parse certificate and extract quote
    let quote_extension = cert.find_extension(&OID_INTEL_SGX_QUOTE)?;
    let quote_data = quote_extension.value;

    // Stage 2: Fetch verification collateral (or use cached version)
    let collateral = fetch_attestation_collateral(quote_data)?;

    // Stage 3: Verify the quote against collateral
    let status = verify(quote_data, &collateral, SystemTime::now())?;

    // Stage 4: Validate TLS public key binding with report_data
    let cert_pubkey_der = cert.public_key.raw_bytes();
    let pubkey_hash = sha256(&cert_pubkey_der);
    let quote = parse_tdx_quote(quote_data)?;

    if !constant_time_eq(&pubkey_hash, &quote.td_report.report_data[0..32]) {
        return Err(Error::ReportDataMismatch);
    }

    // Stage 5: Check TCB status
    match status {
        TcbStatus::UpToDate => Ok(()),
        TcbStatus::OutOfDate => Err(Error::OutdatedTcb),
        TcbStatus::Revoked => Err(Error::RevokedPlatform),
        TcbStatus::ConfigurationNeeded => Err(Error::ConfigurationRequired),
    }
}

\`\`\`

This verification protocol provides a robust security guarantee through the following steps:

1. **Quote Extraction**: The attestation quote is extracted from the X.509 extension
2. **Collateral Retrieval**: Required verification materials are fetched from Intel or a cache
3. **Quote Verification**: The quote's signature and structure are validated
4. **Binding Verification**: The TLS public key is confirmed to match the report_data
5. **TCB Validation**: The platform's security status is checked against trusted values

> Checkpoint: We've seen how RA-TLS certificates are dynamically created and verified in real-time, embedding attestation data directly into TLS handshakes to prevent replay attacks.
> 

Now that we have defined the process of verification, let's go over the differences between some essential components in DCAP verification
`},
      {
        header: "3. DCAP, Quote, and Attestation: Technical Distinctions",
        content: `

With the protocol flow established, it's important to clarify the distinction between several closely related terms in the RA-TLS ecosystem. This section unpacks the specific technical differences between DCAP infrastructure, quotes, and the attestation process itself.

The RA-TLS ecosystem consists of several distinct components that are often confused. Let's formally define each:

### 3.1 Data Center Attestation Primitives (DCAP)

DCAP represents the infrastructure and methodology for attestation in data centre environments(often provided by cloud providers like AWS, Azure, or Google Cloud):

$$
\\text{DCAP} := (\\text{QVE}, \\text{QVL}, \\text{PCS}, \\pi_{\t{dcap}})
$$

Where:

- QVE: Quote Verification Enclave

It is a secure enclave provided by Intel that performs verification of SGX/TDX attestation quotes within a trusted execution environment. By running the verification process inside an enclave, QVE ensures that the quote verification is tamper-resistant and protected from compromised operating systems or untrusted user-space applications. It is typically used in high-assurance scenarios where the integrity of the verification process itself must be trusted.

- QVL: Quote Verification Library

It is a software library offered by Intel that allows applications to verify SGX/TDX attestation quotes outside of an enclave. It performs the same logical checks as the QVE—such as signature validation, measurement checks, and revocation status—but does so in a standard user-space environment. This makes QVL suitable for environments where enclave-level security is not required but performance and ease of deployment are priorities.

- PCS: Provisioning Certification Service

It is an Intel-managed cloud service that provides the necessary certificates, Trusted Computing Base (TCB) information, and revocation data to enable verification of SGX attestation quotes. Whether using QVE or QVL, verifiers typically query PCS to fetch trusted root certificates and the latest TCB status for a given platform. PCS plays a critical role as the root of trust in Intel’s remote attestation infrastructure.

- $\\pi_{\\text{dcap}}$: The DCAP attestation protocol

\`\`\`rust
// DCAP infra at server side 
fn generate_quote_using_dcap(report_data: &[u8; 64]) -> Result<Vec<u8>, Error> {
    // Interface with DCAP components to generate a quote
    let quote = unsafe {
        tdx_attest_get_quote(
            report_data.as_ptr(),
            report_data.len() as u32,
            std::ptr::null(),
            0,
            std::ptr::null(),
            0,
        )
    }?;

    Ok(quote)
}
\`\`\`

### 3.2 Quote Structure

A quote is a cryptographically signed data structure containing evidence about the TEE's state:

$$
Q := (H, \\sigma_{\\text{PCK}}, \\text{TDR})
$$

Where:

- H: Header information (version, type)
- $\\sigma_{\\text{PCK}}$: Signature using the PCK private key
- TDR: TDX Report containing measurements and report data

### 3.2.1 TDX Quote Detailed Structure

The TDX Quote has the following formal structure:

\`\`\`rust
struct TdxQuote {
    version: u16,               // Currently version 4 for TDX
    attestation_key_type: u16,  // Typically 2 for ECDSA-P256
    tee_type: u32,              // 0x81 for TDX
    td_report: TdxReport,       // The actual report structure
    signature_len: u32,         // Length of signature
    signature: Vec<u8>,         // ECDSA signature over report
}

\`\`\`

With sample values:

\`\`\`rust
TdxQuote {
    version: 4,
    attestation_key_type: 2, // ECDSA-P256
    tee_type: 0x81, // TDX
    td_report: TdxReport {
        report_version: 1,
        report_type: 0x81,
        tee_tcb_svn: [0x01, 0x00, ..., 0x10],
        mr_seam: [0xAB, 0xCD, ..., 0xEF], // hash of SEAM loader
        attester_measurement: [0xA0, 0x12, ..., 0x33], // TDX module hash
        ext_config_id: [0x00; 64],
        ext_config_id_hash: [0x00; 48],
        report_data: [0x20, 0x19, ..., 0xFE], // SHA256(pubkey)
        td_attributes: [0x01, 0x00, 0x00, 0x00, ...],
        xfam: 0x0000000000000003,
        mr_td: [0x11, 0x22, ..., 0x44], // TD's identity
        mr_config_id: [0x00; 48],
        mr_owner: [0x88; 48],
        mr_owner_config: [0x99; 48],
        rt_mrs: [[0x01; 48], [0x02; 48], [0x03; 48], [0x04; 48]],
        reserved2: [0x00; 112],
    },
    signature_len: 512,
    signature: vec![0xDE, 0xAD, 0xBE, 0xEF, ...], // ECDSA sig over report
}

\`\`\`

### 3.3 Attestation Process

Attestation is the end-to-end protocol for verifying the authenticity of a TEE:

$$
\\Pi_{\\text{attest}} := (\\text{Setup}, \\text{QuoteGen}, \\text{Verify})
$$

Where:

- $\\text{Setup}$: Initialises the attestation system
- $\\text{QuoteGen}$: Produces a quote from the TEE
- $\\text{Verify}$: Validates the quote against trusted reference values

### Key Takeaways

- DCAP provides the infrastructure for attestation in data centers
- Quotes contain cryptographically signed evidence of a TEE's state
- The attestation process consists of setup, quote generation, and verification
- TDX quotes include detailed measurements that uniquely identify the environment

We've covered the high-level protocol flow, now let's zoom in on each verification component to understand exactly what is being validated and why.
`
      },
      {
        header: "4. Key Verification Components",
        content:`

Having distinguished between the various components of the attestation ecosystem, we now zoom in on the critical verification elements that make RA-TLS secure. This section examines the structure and purpose of each verification component, from PCK certificates to detailed report fields.

The verification process in RA-TLS relies on several critical components:

### 4.1 PCK (Provisioning Certification Key)

The PCK is the cryptographic root of trust for attestation:

\`\`\`
[ Intel Root CA ]
       ↓
[ Intel PCK CA ]
       ↓
[ PCK Certificate ]   ← Contains public key for signing quotes
       ↓
[ Signed Quote ]      ← Contains signature over TEE report

\`\`\`

The PCK certificate is a standard X.509 certificate with Intel-specific extensions:

\`\`\`
Subject: CN = Intel SGX PCK Certificate
Issuer: CN = Intel SGX PCK Processor CA
Extensions:
    1.2.840.113741.1.13.1 = <FMSPC>
    2.5.29.15 = KeyUsage: DigitalSignature

\`\`\`

The PCK public key is used to verify the quote signature:

\`\`\`rust
// PCK signature verification
fn verify_quote_signature(quote: &[u8], pck_cert: &X509Certificate) -> Result<bool, Error> {
    // Extract the quote body (everything before signature)
    let (quote_body, signature) = extract_body_and_signature(quote)?;

    // Calculate hash of quote body
    let quote_hash = sha256(quote_body);

    // Extract public key from PCK certificate
    let public_key = pck_cert.public_key()?;

    // Verify signature
    let verified = public_key.verify(
        &quote_hash,
        &signature,
        &SignatureAlgorithm::ECDSA_P256_SHA256
    )?;

    Ok(verified)
}

\`\`\`

**Trust Chain Responsibility Model**

The RA-TLS trust chain involves multiple parties with distinct responsibilities:

| Trust Chain Level | Responsible Party | Impact if Compromised |
| --- | --- | --- |
| Intel Root CA | Intel Corporation | Complete collapse of trust model for all Intel TEEs |
| Intel PCK CA | Intel Corporation | All platform certificates become untrustable |
| PCK Certificate | Intel + Platform Manufacturer | Specific platform family cannot be trusted |
| Quote Signing | Individual TEE Hardware | Specific machine attestation fails |
| RA-TLS Certificate | Application in TEE | Specific application instance untrusted |

Notice how this trust hierarchy creates a defense-in-depth approach where multiple parties must act honestly for the system to remain secure.

A security compromise at any level invalidates all lower levels in this hierarchy. For example, if the PCK signing key is compromised, all quotes signed with PCK certificates derived from it become untrustable, even if the TEE hardware itself remains secure.

### 4.2 TDX Report Detailed Structure

The TDX Report contains the security-critical measurements:

\`\`\`rust
struct TdxReport {
    report_version: u8,         // Report version (e.g. 1)
    report_type: u8,            // 0x81 for TDX
    reserved1: [u8; 2],         // padding
    tee_tcb_svn: [u8; 16],      // TCB SVN of TEE
    mr_seam: [u8; 48],          // Hash of SEAM module (like BIOS)
    attester_measurement: [u8; 48], // Hash of the TDX module itself
    ext_config_id: [u8; 64],    // Customer config id (optional)
    ext_config_id_hash: [u8; 48],
    report_data: [u8; 64],      // Usually SHA256 of TLS pubkey
    td_attributes: [u8; 8],     // Execution environment settings
    xfam: u64,                  // CPU feature bitmap
    mr_td: [u8; 48],            // Measurement of TD (TD = Trust Domain)
    mr_config_id: [u8; 48],
    mr_owner: [u8; 48],
    mr_owner_config: [u8; 48],
    rt_mrs: [[u8; 48]; 4],      // Runtime measurements
    reserved2: [u8; 112],
}

\`\`\`

Each field serves a specific verification purpose:

| Field | Verification Purpose | Security Impact |
| --- | --- | --- |
| report_version, report_type | Format validation | Ensures correct parsing |
| tee_tcb_svn | TCB level check | Platform security status |
| mr_seam | SEAM module integrity | Boot environment security |
| attester_measurement | TDX module integrity | Attestation subsystem security |
| report_data | Binding to TLS key | Prevents MITM attacks |
| td_attributes | Feature configuration | Checks for debug mode |
| mr_td | TD identity | Ensures expected workload |
| mr_owner | Owner identity | Validates deployer |

### 4.3 Collateral Structure

The verification collateral provides additional trust materials:

\`\`\`rust
struct Collateral {
    fmspc: [u8; 6],                       // Family-Model-Stepping-Platform-Custom
    pck_crl_issuer_chain: Vec<u8>,        // X.509 cert chain of CRL issuer
    root_ca_crl: Vec<u8>,                 // CRL from Intel's root CA
    pck_crl: Vec<u8>,                     // PCK Certificate Revocation List
    tcb_info_issuer_chain: Vec<u8>,       // Cert chain for the TCB info
    tcb_info: Vec<u8>,                    // JSON structure with platform TCB levels
    qe_identity_issuer_chain: Vec<u8>,    // Cert chain for QE identity
    qe_identity: Vec<u8>,                 // JSON identity info for QE itself
}

\`\`\`

The \`tcb_info\` component contains a signed JSON structure with TCB levels:

\`\`\`json
{
  "tcbInfo": {
    "version": 3,
    "issueDate": "2023-01-01T00:00:00Z",
    "nextUpdate": "2024-01-01T00:00:00Z",
    "fmspc": "00906ea10000",
    "tcbLevels": [
      {
        "tcb": {
          "tdxtcbcomp00svn": 10,
          "tdxtcbcomp01svn": 5,
          // ... other components
        },
        "status": "UpToDate"
      },
      {
        "tcb": {
          "tdxtcbcomp00svn": 7,
          "tdxtcbcomp01svn": 5,
          // ... other components
        },
        "status": "OutOfDate"
      }
    ]
  }
}

\`\`\`
`},
      {
        header: "5. Low-Level Verification Algorithm",
        content: `
With a solid understanding of the verification components, we're ready to dive into the actual code that implements the verification process. This section provides a step-by-step walkthrough of the verification algorithm, explaining each security check and its purpose.

The verification of a TDX quote is a multi-stage process with critical security checks at each step:

\`\`\`rust
pub fn verify(quote: &[u8], collateral: &Collateral, now: SystemTime) -> Result<TcbStatus, Error> {
    // Stage 1: Parse and validate quote structure
    let parsed_quote = parse_tdx_quote(quote)?;

    if parsed_quote.version != 4 || parsed_quote.tee_type != 0x81 {
        return Err(Error::UnsupportedQuoteFormat);
    }

    // Stage 2: Extract quote body (everything before the signature)
    let quote_body = &quote[..quote.len() - parsed_quote.signature_len as usize];
    let signature = &quote[quote.len() - parsed_quote.signature_len as usize..];

    // Stage 3: Parse and validate PCK certificate chain
    let pck_cert = parse_x509_certificate(&collateral.pck_cert)?;
    let pck_issuer = parse_x509_certificate(&collateral.pck_crl_issuer_chain)?;

    // Validate certificate against issuer
    if !validate_cert_chain(&pck_cert, &pck_issuer) {
        return Err(Error::InvalidCertificateChain);
    }

    // Stage 4: Check if PCK certificate is revoked
    let pck_crl = parse_crl(&collateral.pck_crl)?;
    if is_cert_revoked(&pck_cert, &pck_crl) {
        return Err(Error::RevokedCertificate);
    }

    // Stage 5: Verify quote signature using PCK public key
    let quote_hash = sha256(quote_body);
    let signature_valid = verify_ecdsa_signature(
        &pck_cert.public_key,
        &quote_hash,
        signature
    )?;

    if !signature_valid {
        return Err(Error::InvalidQuoteSignature);
    }

    // Stage 6: Parse and validate TCB info
    let tcb_info = parse_tcb_info_json(&collateral.tcb_info)?;
    verify_tcb_info_signature(&tcb_info, &collateral.tcb_info_issuer_chain)?;

    // Stage 7: Check platform TCB status against TCB info
    let tcb_status = evaluate_tcb_level(
        &parsed_quote.td_report.tee_tcb_svn,
        &tcb_info.tcb_levels
    );

    // Stage 8: Verify certificate validity period
    if !is_cert_time_valid(&pck_cert, now) {
        return Err(Error::ExpiredCertificate);
    }

    // Return final TCB status
    Ok(tcb_status)
}

\`\`\`

The TCB status evaluation is a critical component:

\`\`\`rust
fn evaluate_tcb_level(tee_tcb_svn: &[u8; 16], tcb_levels: &[TcbLevel]) -> TcbStatus {
    // Sort TCB levels from newest to oldest
    let mut sorted_levels = tcb_levels.to_vec();
    sorted_levels.sort_by(|a, b| b.tcb.cmp(&a.tcb));

    // Find the first level that our platform meets or exceeds
    for level in &sorted_levels {
        if is_tcb_level_met(tee_tcb_svn, &level.tcb) {
            return level.status;
        }
    }

    // Default to Revoked if no matching level is found
    TcbStatus::Revoked
}

fn is_tcb_level_met(platform_tcb: &[u8; 16], level_tcb: &[u8; 16]) -> bool {
    for i in 0..16 {
        if platform_tcb[i] < level_tcb[i] {
            return false;
        }
    }
    true
}

\`\`\`

### High-Level Goals

Before diving into the code details, let's first understand what this verification algorithm is trying to achieve at a high level.

The \`verify()\` function serves as the core trust establishment mechanism for RA-TLS with Intel TDX. Its fundamental purpose is to cryptographically verify that:

1. The quote originated from a genuine Intel TDX platform
2. The platform is running firmware that meets minimum security requirements
3. The quote has not been tampered with since its generation
4. The platform's attestation capabilities haven't been revoked
5. The quote is bound to the expected TLS session

A successful verification means a client can establish trust in the remote TEE environment before transmitting sensitive data or executing confidential computations.

### Component-by-Component Analysis

Let's examine what each stage in this multi-step verification process accomplishes:

### **Stage 1: Quote Structure Validation**

\`\`\`rust
let parsed_quote = parse_tdx_quote(quote)?;
if parsed_quote.version != 4 || parsed_quote.tee_type != 0x81 {
    return Err(Error::UnsupportedQuoteFormat);
}

\`\`\`

This initial stage performs basic sanity checking:

- Parses the binary quote into a structured format
- Verifies the version is the expected value (4 for current TDX quotes)
- Confirms the quote is from a TDX environment (type 0x81)

This prevents processing quotes with unexpected formats or from different TEE technologies, which could lead to parsing errors or security vulnerabilities in later stages.

### Stage 2: Quote Body and Signature Extraction

\`\`\`rust
let quote_body = &quote[..quote.len() - parsed_quote.signature_len as usize];
let signature = &quote[quote.len() - parsed_quote.signature_len as usize..];

\`\`\`

Here the function:

- Separates the quote's content from its signature
- The quote_body contains all the attestation data including the TDX report
- The signature is the cryptographic seal created by the platform's PCK private key

This separation is necessary for cryptographic verification—we need to compute the hash of the body and verify it matches what was signed.

### Stage 3: PCK Certificate Chain Validation

\`\`\`rust
let pck_cert = parse_x509_certificate(&collateral.pck_cert)?;
let pck_issuer = parse_x509_certificate(&collateral.pck_crl_issuer_chain)?;
if !validate_cert_chain(&pck_cert, &pck_issuer) {
    return Err(Error::InvalidCertificateChain);
}

\`\`\`

This stage establishes the first link in our trust chain:

- Parses the PCK certificate that contains the public key for signature verification
- Parses the issuer certificate that should have signed the PCK certificate
- Validates that the PCK certificate was properly signed by its issuer

The PCK certificate is the cryptographic identity of the platform. By validating this chain back to Intel's root CA, we ensure we're using a public key that came from Intel, not an attacker.

### Stage 4: Certificate Revocation Check

\`\`\`rust
let pck_crl = parse_crl(&collateral.pck_crl)?;
if is_cert_revoked(&pck_cert, &pck_crl) {
    return Err(Error::RevokedCertificate);
}

\`\`\`

This implements a critical security measure:

- Parses the Certificate Revocation List (CRL) provided in the collateral
- Checks if the PCK certificate has been revoked by Intel
- Rejects quotes validated with known-compromised keys

If Intel discovers a vulnerability that compromises PCK keys, this stage ensures those keys can no longer be used to create seemingly valid quotes.

### Stage 5: Quote Signature Verification

\`\`\`rust
let quote_hash = sha256(quote_body);
let signature_valid = verify_ecdsa_signature(
    &pck_cert.public_key,
    &quote_hash,
    signature
)?;
if !signature_valid {
    return Err(Error::InvalidQuoteSignature);
}

\`\`\`

This is the core cryptographic verification step:

- Computes SHA-256 hash of the quote body
- Uses the PCK public key to verify the ECDSA signature over this hash
- Confirms the quote was genuinely signed by the platform's PCK private key

This step cryptographically proves the quote originated from the genuine Intel platform that possesses the corresponding PCK private key. It also proves that the quote hasn't been modified since it was signed.

### Stage 6: TCB Info Validation

Having examined the complete verification algorithm, we now focus on four critical security components that are essential to RA-TLS's integrity. 

These components represent the core security guarantees that RA-TLS provides and must be implemented correctly to maintain the trust model.

\`\`\`rust
let tcb_info = parse_tcb_info_json(&collateral.tcb_info)?;
verify_tcb_info_signature(&tcb_info, &collateral.tcb_info_issuer_chain)?;

\`\`\`

This stage ensures the platform security information is authentic:

- Parses the TCB Info JSON document from the collateral
- Verifies the signature on this document against Intel's issuer certificate
- Confirms the TCB information comes from Intel, not an attacker

The TCB (Trusted Computing Base) Info contains Intel's signed statements about which platform versions are considered secure. Verifying its signature ensures we're making security decisions based on genuine Intel data.

### Stage 7: Platform Security Evaluation

\`\`\`rust
let tcb_status = evaluate_tcb_level(
    &parsed_quote.td_report.tee_tcb_svn,
    &tcb_info.tcb_levels
);

\`\`\`

This stage determines if the platform meets security requirements:

- Extracts the platform's TCB SVN (Security Version Numbers) from the quote
- Compares these values against the levels defined in Intel's TCB Info
- Determines if the platform is UpToDate, OutOfDate, Revoked, or ConfigurationNeeded

This is a critical security evaluation that identifies platforms running outdated firmware with known vulnerabilities or platforms that have been revoked by Intel.

### Stage 8: Certificate Time Validation

\`\`\`rust
if !is_cert_time_valid(&pck_cert, now) {
    return Err(Error::ExpiredCertificate);
}

\`\`\`

This final check ensures time-bound validity:

- Verifies the PCK certificate hasn't expired
- Uses the provided current time for comparison
- Prevents accepting quotes verified with expired certificates

Certificate expiration is a standard security practice that limits the lifetime of cryptographic materials.

While we've examined each verification step individually, their power comes from how they interconnect to form a complete chain of trust:

### Cryptographic Linkage

The verification process establishes multiple cryptographic links that form a chain of trust:

1. **Intel Root CA → Intel PCK CA → PCK Certificate**
    - Standard X.509 certificate chain where each issuer signs the next certificate
    - Ensures the PCK public key originates from Intel
2. **PCK Private Key → Quote Signature → Quote Data**
    - Platform's PCK private key signs the quote body
    - The verified signature proves the quote came from the genuine platform
    - Any modification to the quote would invalidate the signature
3. **Quote Body → TDX Report → Security Measurements**
    - The signed quote contains the TDX report with security measurements
    - These measurements (mr_td, mr_seam, etc.) are protected by the signature
    - Includes report_data (typically a hash of TLS public key) to bind to the TLS session
4. **Signed TCB Info → Security Evaluation**
    - Intel signs the TCB info document
    - This prevents attackers from providing fake security information
    - Platform's security version is verified against these signed levels

### Ensuring Soundness and Correctness

The verification function employs several techniques to ensure soundness and correctness:

1. **Defensive Validation**
    - Early validation of formats and versions
    - Strict certificate chain validation
    - Comprehensive error checking with specific error types
2. **Cryptographic Security**
    - Uses standard cryptographic primitives (SHA-256, ECDSA)
    - Validates signatures to ensure data authenticity
    - Properly handles binary data to prevent parsing errors
3. **Trust Verification Hierarchy**
    - Multi-level validation from certificate chain to platform security
    - Each step builds on the previous one's guarantees
    - Ensures all aspects of the platform and quote are trustworthy
4. **Temporal Security**
    - Checks certificate validity periods
    - Validates against current time to prevent expired credential usage
    - Ensures reliance on up-to-date security information

The verification follows "defense in depth" principles by checking multiple aspects before accepting a quote as valid. Each stage must pass for the quote to be considered trustworthy, and the specific TCB status returned provides granular information about the platform's security state.

This comprehensive verification process forms the foundation of trust in RA-TLS systems using Intel TDX, enabling secure communication with genuine, attested TEE environments.

### Key Takeaways

- The verification process follows a defense-in-depth approach with 8 distinct stages, each addressing a specific security concern
- Quote signature verification cryptographically proves the quote originated from a genuine Intel platform and hasn't been tampered with
- The TCB status evaluation determines if the platform meets current security requirements by comparing firmware versions against Intel's trusted values
- Certificate chain validation, revocation checks, and binding verification create multiple cryptographic links that together form a complete chain of trust
`},
      {
        header: "Conclusion",
        content: `

We've explored the world of Remote Attestation TLS, from its mathematical foundations to the detailed verification algorithms that make it work. RA-TLS represents a significant evolution in secure communications by extending traditional TLS with hardware-based trust guarantees.

However, RA-TLS significantly enhances security but is not a silver bullet. It remains vulnerable to advanced threats such as side-channel attacks, Time-of-Check vs. Time-of-Use (TOCTOU) vulnerabilities, and trust breakdown from compromised Certificate Authorities or PCS infrastructure.

By embedding attestation evidence directly into TLS certificates, RA-TLS creates a seamless security model that verifies not just the identity of a server, but also the integrity of its execution environment. The multi-layered verification process we've examined ensures that clients can trust they're communicating with genuine Intel TEEs running unmodified code.

The core strength of RA-TLS lies in its defense-in-depth approach: cryptographic signatures verify authenticity, report data binding prevents MITM attacks, certificate chain validation establishes trust, and TCB verification ensures the platform meets current security standards. Together, these mechanisms create a robust foundation for confidential computing applications.

In next part of this series, we'll examine the critical security components in greater detail, analyze potential attack vectors, and explore optimizations for real-world deployments of RA-TLS.

*Thanks to @[GuyPhy4](https://x.com/GuyPhy4) for reviewing the post and sharing feedback!*
# Glossary

- TEE (Trusted Execution Environment)
- DCAP (Data Center Attestation Primitives)
- PCK (Provisioning Certification Key)
- TCB (Trusted Computing Base)
- QVE/QVL (Quote Verification Enclave/Library)
- FMSPC (Family-Model-Stepping-Platform-Customer)
- ECDSA (Elliptic Curve Digital Signature Algorithm)
- TDX (Trust Domain Extensions)
- SGX (Software Guard Extensions)
- MR measurements (e.g., mr_td, mr_seam)
`
      },
    ]
  },
  {
    title: "Confidential Computing: Dstack SDK and TEEs Part - 1",
    slug: "confidential-computing-dstack-sdk-and-tees-part-1",
    image: "/confidential-computing/cover.png",
    readtime: "8",
    date: "17 March 2025",
    content: "Trusted Execution Environments (TEEs) are revolutionizing blockchain privacy by enabling secure, confidential computing with hardware-backed isolation and remote attestation. Unlike cryptographic solutions like Fully Homomorphic Encryption (FHE) or Multi-Party Computation (MPC), which suffer from high computational overhead, TEEs offer near-native performance while ensuring data integrity and privacy.",
    sections: [
      {
        header: "TLDR;",
        content: "*Trusted Execution Environments (TEEs) create secure hardware enclaves where data and code are protected even from the machine’s owner. This enables “secret” smart contracts and off-chain computations that preserve privacy. Unlike heavy cryptographic solutions like Fully Homomorphic Encryption (FHE) or Multi-Party Computation (MPC), TEEs run at near-native speed and provide remote attestation (proof of code integrity). The Dstack SDK leverages TEEs (Intel’s TDX technology) to let developers deploy Dockerized apps into enclaves with minimal fuss, handling key management and attestation under the hood. As privacy emerges as “the biggest unlock in crypto since smart contracts*"
      },
      {
        header: "From Transparency to Privacy: Why Need for TEEs",
        content: "Blockchains are celebrated for transparency—every transaction is public. Yet for applications like finance, identity, or machine learning, unfettered transparency is a nightmare for confidentiality [(Crypto's New Whitespace: WTF is MPC, FHE, and TEE?)](https://www.gate.io/learn/articles/cryptos-new-whitespace-wtf-is-mpc-fhe-and-tee/5449#). A decentralized app that needs to use your personal data or a DeFi protocol executing trades based on a secret algorithm. Today, developers resort to awkward workarounds or simply avoid these use cases. The promise of confidential computing is to change that: allow sensitive computations to happen privately without sacrificing the decentralized trust model. It’s such a game-changer that industry observers have dubbed it “Privacy 2.0” and “the biggest unlock in crypto since smart contracts and oracles”. \n\n![d4a1e6fa-839b-4189-8468-c6be6dc4d6db.png](/confidential-computing/computing-env.png)\n\n So, how can we achieve privacy in a trustless environment? Enter Trusted Execution Environments (TEEs). A TEE is like a secure, armored vault inside a processor. Code and data running inside a TEE are isolated from the rest of the system, protected by hardware-level encryption. Even the server’s operating system or a malicious admin cannot peer inside. In practical terms, a TEE keeps data encrypted in memory and only decrypts it inside the CPU’s protected area during computation [(Secure computation: Homomorphic encryption or hardware enclaves? - RISE Lab)](https://rise.cs.berkeley.edu/blog/secure-computation-homomorphic-encryption-or-hardware-enclaves/). If someone dumps the RAM from outside, all they see is gibberish. \n\n **Why TEEs and not just cryptography?** \n\n The allure of TEEs is that they solve a problem that pure math solutions are still struggling with: *performing complex computations on private data efficiently*. Cryptographers have developed techniques like FHE, MPC and ZKPs to handle encrypted or secret-shared data without revealing it. These are incredibly powerful— you don't have to trust any hardware, only the math. However, this comes at a steep cost in performance and complexity. \n\n  A recent industry report notes that <b>FHE can be 1,00x to 1,000,000x slower than normal computation</b>, making it “impractical for general purpose computations due to its poor performance.” [(Confidential Computing and Homomorphic Encryption - Confidential Computing Consortium)](https://confidentialcomputing.io/2023/03/29/confidential-computing-and-homomorphic-encryption/) In fact, an operation taking 1 millisecond might take minutes with FHE! MPC, on the other hand, can be more efficient than FHE but still requires multiple parties exchanging data, and setting up an MPC network for every use case can be non-trivial. \n\n Another often-overlooked issue is integrity. FHE can hide data, but it doesn't automatically guarantee the code followed the rules (someone could feed altered ciphertexts to produce bogus outputs). As the Confidential Computing Consortium points out, “code integrity is out-of-scope of the FHE security model”. By contrast, TEEs do ensure code integrity via attestation - you know exactly what code ran, and the hardware will not execute anything else. You only need to trust the CPU’s manufacturer (and its security) instead of trusting multiple parties or experimental cryptography. \n\n In essence, TEEs offer a pragmatic path to privacy. They allow us to run code with sensitive logic or data fast, and with strong assurances that what happens inside the enclave is correct and hidden from prying eyes. Next, let's look at how developers can actually use this technology—specifically, through an open-source SDK called Dstack that makes deploying apps to TEEs much easier and later exploring how Dstack is approaching Key Management Service (KMS)."
      },
      {
        header: "Dstack SDK - Simplifying Confidential Computing",
        content: "> Dstack is an open-source, developer-friendly SDK that simplifies deploying any arbitrary Docker-based applications into TEE. \n\n Building directly with TEEs can be challenging. Traditionally, to use something like Intel SGX, a developer had to write portions of their code in special ways (in C/C++ inside an enclave SDK), deal with low-level details, and manage keys and attestation manually. This is where Dstack SDK comes in where it offers a developer-friendly, security-first SDK that abstracts away much of the complexity of deploying applications in TEEs. if you can containerize your app (e.g. with a Docker image or docker-compose file), you can deploy it to a confidential TEE environment using Dstack, without becoming an expert in enclave programming. \n\n![d4a1e6fa-839b-4189-8468-c6be6dc4d6db.png](/confidential-computing/tdx-flow.png)\n\n **What does Dstack do?** \n\n  It provides the tooling to launch your app inside an isolated enclave/VM, handle secret management, networking, and attestation, all as a platform. Think of it as a specialized container orchestration system that runs containers not on a normal host, but inside secure enclaves. Dstack currently targets Intel’s latest datacenter TEEs (Intel TDX, which powers Confidential VMs). It’s open-sourced on GitHub and community-driven – built by contributors from projects like Phala Network, Netherminds and inspired by researchers like Andrew Miller (Flashbots). \n\n When using Dstack, you don’t have to worry about the nitty-gritty of enclave setup. You write a `docker-compose.yaml` for your application (the same way you’d define a multi-container app normally), specifying your services, images, and any secrets or configs. Dstack then takes care of provisioning a Confidential VM (CVM) on a TEE-enabled host and deploying your containers inside that secure VM. The architecture involves a few key components working together: \n\n **Teepod:** a service on the host machine (the TEE-enabled server) that orchestrates confidential VMs. It starts and stops CVMs in the bare-metal TDX host environment. \n\n **Tappd:** an agent running inside the secure VM (CVM) that assists with key operations for the app containers. Notably, it handles key derivation and attestation requests from the containers. This means if a container inside the enclave needs to prove something about its state (or fetch a key), it asks Tappd via a local socket. \n\n **KMS:** a Key Management Service that works with Dstack to generate and provide cryptographic keys to the enclave environment. For example, when the CVM is initialized, the KMS can furnish it with a unique key (post-attestation) that will be used to decrypt secrets or for TLS. \n\n **Tproxy:** a trusted proxy that acts as a gateway for network traffic to and from the confidential VM. It can terminate TLS connections or forward them, and it maps domain names to the correct ports of services running inside the enclave. Essentially, tproxy lets your enclave-based app be reachable to the outside world in a secure way, without exposing the enclave’s internal IP directly. \n\n **Meta-dstack:** a build system (using Yocto) to produce the base images for the confidential VM. Dstack provides a custom minimal OS that runs inside the enclave, containing the necessary pieces (like the Tappd agent, and a minimal Linux environment to run your Docker containers). \n\n All these components work in concert to give developers a Platform-as-a-Service feel for TEEs. You deploy an app, and Dstack sets up the secure environment and runs it. \n\n *Let's walk through a simple deployment example to solidify this.*"
      },
      {
        header: "Example: Deploying a “Hello World” Web App with Dstack",
        content: "Suppose we have a basic web application that we want to run with confidentiality. For simplicity, imagine it’s just an Nginx server that serves a static webpage which prints “Hello, Confidential World!”. We also want to keep the content secret until it’s served (a contrived example, but it could represent proprietary code or data). \n\n **Step 1: Prepare the Application** \n\n Create a directory for our app with an `index.html` and a Dockerfile or use an off-the-shelf image. In this case, we’ll use the official Nginx image and have it serve our static file. \n\n **Step 2: Write `docker-compose.yaml`** \n\n This file will describe our service. For example: \n\n \`\`\`yaml \n version: '3' \n services: \n   web: \n     image: nginx \n     volumes: \n    - ./html:/usr/share/nginx/html:ro   # mount our static content \n     ports: \n       - 8080:80 \n \`\`\` \n\n Place your `index.html` in a local `html/` folder. \n\n  This compose file says: use the Nginx image, serve files from ./html, and expose port 80 of the container to port 8080 on the host. \n\n Normally, running `docker-compose up` would start this container on your machine. Instead, Dstack will deploy it in a TEE. \n\n **Step 3: Deploy with Dstack** \n\n Ensure you have access to a TEE-enabled host (for example, a cloud VM that supports Intel TDX or an on-prem server with the proper CPU). \n\n Install Dstack following its documentation (it might involve running a setup script on the host to start `teepod` and related services). Then run the deployment command. \n\n Under the hood, Dstack encrypts any sensitive info (in our simple example, we have none except the content of `index.html` which is not particularly secret). It then launches the enclave VM, sets up Nginx inside it, and configures the networking. \n\n **Step 4: Access the App:** \n\n You can now use an attestation verification tool to confirm that the Nginx was indeed running in an enclave. \n\n For instance, Dstack’s `tappd` provides an API to get a quote. One could exec into the enclave or call a provided endpoint to retrieve a quote, then use Intel’s verification library to check its validity against Intel’s Attestation Service. \n\n This step would confirm that the hash of the application code/binary inside the enclave matches what we expect, giving us cryptographic proof of the enclave’s state. \n\n This simple example shows the developer experience: **write normal app, deploy to secure enclave, gain confidentiality.** Dstack supports more complex setups (databases, multi-service apps, etc.), and provides features like a web dashboard to view logs securely or SSH into the enclave for debugging if needed. But the core benefit is clear – it abstracts away the complexity of TEEs into a familiar Docker-centric workflow. \n\n All of this happens with minimal effort required from the developer. Dstack handles the heavy lifting: setting up the enclave, injecting your containers, managing keys, and providing connectivity. From the developer’s perspective, it feels a lot like deploying to a normal cloud, except now your app runs inside a black box that even root users can’t inspect. Secrets stay safe (the env vars were encrypted client-side and only reveal themselves in the enclave), and you gain a level of assurance that is invaluable for sensitive logic. \n\n"
      },
      {
        header: "Conclusion",
        content: "The Dstack SDK exemplifies how we can bring this power to developers in an accessible way. \n\n In the near future, we’ll also see improvements in the developer experience for TEEs. Projects like Dstack are just the beginning. We can anticipate more frameworks, SDKs, and perhaps high-level languages or smart contract platforms that integrate TEE support natively. Open-source SDKs such as Microsoft’s Open Enclave (which generalizes enclave development across different hardware) [(GitHub - openenclave/openenclave: SDK for developing enclaves)](https://github.com/openenclave/openenclave#:~:text=Introduction) and Red Hat’s Enarx are making enclave development more accessible. \n\n We expect TEEs to get faster, more secure, and more integrated with decentralized frameworks. "
      },
      {
        header: "References",
        content: "GitHub GitHub - Dstack-TEE/dstack: Depxloy any app to TEE. (https://github.com/Dstack-TEE/dstack) \n\n Dstack | Phala Network Docs https://docs.phala.network/overview/phala-network/dstack \n\n SpringerLink Trusted Execution Environment https://link.springer.com/chapter/10.1007/978-3-031-33386-6_18 \n\n Automata - Verifiable attestations with machines https://www.ata.network/ \n\n Nitro Enclaves concepts - AWS https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html \n\n c4lvin | ChainLight TEE + Web3: Do you know what you trust in? https://blog.chainlight.io/tee-web3-do-you-know-what-you-trust-in-1c2cde30fe13 \n\n iExec: Pioneering Decentralized Confidential Computing Since https://www.iex.ec/academy/iexec-decentralized-confidential-computing \n\n"
      }
    ]
  },
  {
    title: "Why Privacy in Bitcoin Matters",
    slug: "why-privacy-in-bitcoin-matters",
    image: "/citrea.png",
    readtime: "8",
    date: "07 Feb 2025",
    content:
      "Bitcoin is often praised for being decentralized and censorship-resistant, but its public ledger creates a serious problem—lack of privacy. Every transaction is permanently recorded, meaning anyone can trace wallet addresses, balances, and transaction history. This poses risks for individuals, businesses, and institutions, making privacy a necessity rather than a luxury.",
    sections: [
      {
        header: "Bitcoin’s Privacy Problem",
        content:
          "Bitcoin transactions are transparent, meaning anyone can see wallet balances and transaction histories. While this ensures security and decentralization, it exposes users to risks such as targeted hacks, scams, and financial surveillance. Unlike traditional banking, where transactions remain private, Bitcoin’s open ledger makes it easy to track financial activities. For institutions and businesses handling large sums, this lack of privacy is a significant barrier to adoption.",
      },
      {
        header: "The Risks of Exposure",
        content:
          "Beyond personal safety, Bitcoin’s lack of privacy is also a barrier to wider adoption. Institutions and businesses handling large sums need confidentiality, just like they have with traditional banking. Without it, they’re less likely to integrate Bitcoin into their operations. Even individuals who simply want to transact without exposing their financial activity find themselves limited. If Bitcoin is ever going to function as true digital cash, privacy isn’t optional—it’s essential.",
      },
      {
        header: "Introducing Citrea: Enhancing Bitcoin Privacy",
        content:
          "That’s where Citrea comes in. Citrea is a zero-knowledge rollup that expands Bitcoin’s capabilities while maintaining security and decentralization. By enabling smart contracts and scalable applications, Citrea brings more utility to Bitcoin, but more importantly, it introduces privacy-preserving technology through zero-knowledge proofs. This means users can interact with DeFi, payments, and other financial tools without revealing unnecessary details on-chain.",
      },
      {
        header: "Encifher: Enabling Private Bitcoin Transactions",
        content:
          "Encifher takes privacy to the next level by allowing people to send BTC privately using EncifherBot. Instead of exposing wallet addresses and transaction history, Encifher enables discreet Bitcoin transfers, protecting users from surveillance and tracking. Whether you're a whale, a business, or just an everyday Bitcoiner who values privacy, Encifher makes Bitcoin transactions safer and more secure.",
      },
      {
        header: "The Future of Private Bitcoin Transactions",
        content:
          "Together, Citrea and Encifher are pushing Bitcoin forward—making it scalable, private, and usable for everyone. If Bitcoin is going to be the foundation of the world’s financial system, it can’t just be hard money—it also needs to be private money.",
      },
    ],
  },
  {
    title: "Overview of Distributed Key Generation from Pseudo-Random Secret Sharing (PRSS)",
    slug:
      "overview-of-distributed-key-generation-from-pseudo-random-secret-sharing-prss",
    image: "/prss.jpeg",
    readtime: "8",
    date: "29 Jan 2025",
    content:
      "Key management is a critical part of programmable privacy systems. Pseudo-Random Secret Sharing (PRSS) enables deterministic and secure distributed key generation using shared randomness, eliminating the need for a trusted dealer.",
    sections: [
      {
        header: "Introduction",
        content:
          "Key management is a critical part of programmable privacy systems. Secret keys for encryption are generated using various methods in the literature, one of which is pseudo-random secret sharing.\n\nPRSS allows deterministic and secure key generation using shared randomness, enabling decentralized systems to operate without a trusted dealer. This document explains the basics of PRSS, its role in distributed key generation, and its applications in cryptographic protocols.",
      },
      {
        header: "Pseudo-Random Secret Sharing (PRSS)",
        content:
          "PRSS is a cryptographic primitive that combines secret sharing and pseudo-randomness to enable efficient and secure distributed protocols. In PRSS, a secret $S$ is split into $n$ shares, where each share $s_i$ is computed using a pseudo-random function (PRF) or pseudo-random generator (PRG) based on a shared seed $k$.\n\nThis allows the shares to appear random while still being deterministically derived. The key idea is that PRSS eliminates the need for explicit communication during share generation, as participants independently compute their shares using the same PRF/PRG.\n\nMathematically, if $f_k(x)$ is a PRF with a shared key $k$, the shares are $s_1, s_2, \\ldots, s_n$ and they are computed as:\n\n$$ s_i = f_k(i), \\quad \\forall i \\in \\{1, 2, \\ldots, n\\} $$\n\nThe secret $S$ can then be reconstructed by summing the shares:\n\n$$ S = \\sum_{i=1}^{n} s_i \\mod p $$\n\nwhere $p$ is a large prime.",
      },
      {
        header: "Distributed Key Generation (DKG)",
        content:
          "Distributed Key Generation (DKG) is a cryptographic protocol where a group of participants collaboratively generate a public/private key pair without relying on a trusted third party.\n\nDKG ensures that the private key is never revealed to any individual participant, enhancing the security of the system. The public key is computed collectively, while the private key remains distributed as shares among the participants.\n\nWhen using PRSS in DKG, participants use a shared seed $k$ to generate pseudo-random shares $\\hat{y}^s$. These shares are commitments to their secret contributions. In the first round of the protocol, participants broadcast commitments $H(\\hat{y}^s)$, where $H$ is a cryptographic hash function:\n\n$$ C_s = H(\\hat{y}^s) $$\n\nIn the second round, participants reveal their shares $\\hat{y}^s$, and the protocol verifies the correctness of the shares against the commitments. Incorrect shares are discarded.",
      },
      {
        header: "Public Key Computation in DKG",
        content:
          "After verifying the shares, the participants compute the collective public key $y$ from the valid contributions. Assuming a base generator $g$ in a cyclic group of prime order $p$, the public key is computed as:\n\n$$ y = g^{\\sum_s \\hat{y}^s} \\mod p $$\n\nHere, $\\sum_s \\hat{y}^s$ represents the sum of all valid shares contributed by the participants.\n\nThis computation ensures that the private key, represented as:\n\n$$ x = \\sum_s \\hat{y}^s $$\n\nremains distributed among the participants, while the public key $y$ is publicly available.",
      },
      {
        header: "Security Properties of PRSS-based DKG",
        content:
          "PRSS-based DKG offers several security guarantees:\n\n- **Pseudo-Randomness**: The shares appear random to any adversary without access to the shared seed $k$, ensuring no leakage of information about the secret.\n- **Robustness**: Malicious participants cannot disrupt the protocol because incorrect shares are ignored during verification.\n- **Dealer Independence**: The protocol eliminates the need for a trusted dealer by using PRSS to generate shares deterministically.",
      },
      {
        header: "Applications of PRSS-based DKG",
        content:
          "PRSS-based DKG is widely used in cryptographic systems requiring secure and distributed key generation. For example:\n\n- **Threshold Cryptography**: DKG enables distributed signing or decryption without exposing the private key.\n- **Blockchain Systems**: DKG is critical for generating keys used in multi-signature wallets and consensus protocols.\n- **Secure Multi-Party Computation (MPC)**: PRSS-based DKG efficiently provides random keys for computations.\n\nThese properties make PRSS-based DKG a cornerstone of secure and efficient distributed cryptographic protocols.",
      },
      {
        header: "Conclusion",
        content:
          "Thank you for reading! In this article, we covered pseudo-random secret sharing, its role in distributed key generation, and its applications in cryptographic protocols.\n\nWe will be sharing more content on cryptography and Privacy 2.0 soon. If you have any questions, feel free to reach out to us!",
      },
    ],
  },
  {
    title: "Encifher x Chainsight: Bringing Privacy to On-Chain Data",
    slug: "encifher-x-chainsight-bringing-privacy-to-on-chain-data",
    image: "/ecc.jpeg",
    readtime: "5",
    date: "28 Jan 2025",
    content:
      "Encifher is teaming up with Chainsight to bring privacy to on-chain data. This collaboration will enable dApps to use encrypted data feeds while ensuring security and confidentiality. By leveraging Private Shared State technology, sensitive information remains private while still being utilized for computations and decision-making.",
    sections: [
      {
        header: "Encifher x Chainsight: Bringing Privacy to the Crypto Space",
        content:
          "We’re super excited to team up with **Chainsight** to bring **privacy to the crypto space**. For those who don’t know, Chainsight is a leader in the **oracle** world, delivering **real-time, reliable data** to decentralized apps. They use **zkTLS proofs** to securely bring data on-chain, including important stuff like price feeds, volatility metrics, and ratings for DeFi apps. Oracles are essential for linking the decentralized world to real-world data, but when it comes to privacy—well, that’s where things get tricky. That’s where we step in.",
      },
      {
        header: "How Encifher Enhances Privacy in Chainsight Data Feeds",
        content:
          "With **Encifher's privacy tech**, Chainsight is rolling out the option to **encrypt their data feeds**. That means sensitive info like credit scores, market data, and other real-world metrics can be used by dApps, but kept **secure and private**. Thanks to our **Private Shared State** tech, dApps can still process and use encrypted data for things like complex calculations and decision-making—without ever exposing it. ![](/ecc1.png)",
      },
      {
        header: "A Game-Changer for Developers and Users",
        content:
          "For **developers**, this is a game-changer. You’ll now be able to use **private data feeds** to build more secure, privacy-first applications—whether it’s for DeFi, analytics, or even private voting systems. For **users**, it’s simple: your sensitive data stays safe while dApps continue to offer all the powerful features you love—without compromising privacy. No trade-offs, just better security and privacy for everyone.",
      },
      {
        header: "Chainsight’s Role in the Oracle Space",
        content:
          "Chainsight is a powerhouse in the oracle space, delivering real-time, reliable data feeds to dApps. It securely brings any data on-chain using zkTLS proofs. It offers price feeds, volatility metrics, and ratings for dynamic DeFi apps.\n\nOracles are critical for connecting the decentralized world to real-world data. But privacy? That’s where they needed backup.",
      },
      {
        header: "Encifher’s Announcement on Privacy Integration",
        content:
          "With Encifher's privacy tech, Chainsight will have an option of their data feeds to be encrypted in the roadmap.\n\nThis means sensitive information stays safe and confidential, even while being actively used by dApps.",
      },
      {
        header: "Private Shared State Enables Encrypted Data Computations",
        content:
          "With Private Shared State, dApps can use the encrypted incoming data to operate on it for complicated calculations and take actions.\n\nFor example, by using credit scores as encrypted inputs, we can enable on-chain credit with real-life credit scores.\n\nNo trade-offs, no compromises.",
      },
      {
        header: "Why This Matters",
        content:
          "**For dApp developers:** You can now work with private data feeds to build more secure, privacy-first applications. Think DeFi platforms, analytics tools, or even private voting systems—endless possibilities.\n\n**For users:** Your sensitive data remains safe while dApps provide powerful features.",
      },
    ],
  },
  {
    title: "Private Shared State for Dummies",
    slug: "private-shared-state-for-dummies",
    image: "/pssp.jpeg",
    readtime: "12",
    date: "22 Jan 2025",
    content:
      "Private shared state introduces a privacy-preserving mechanism in blockchain by allowing sensitive state data to be selectively shared or encrypted. This guide explains the concept of shared state, its challenges, and how private shared state enhances security and composability.",
    sections: [
      {
        header: "What is a Shared State?",
        content:
          "Blockchains function as state machines, processing transactions to transition from one state to another. These states are the fundamental representations of data that determine the validity and order of transactions on the blockchain. Transactions executed by users, whether transferring tokens, deploying smart contracts, or interacting with dApps, result in changes to the state. To ensure availability and reliability, the sequence of transactions and the resulting states are stored across the blockchain's distributed network of nodes.",
      },
      {
        header: "But What is 'State'?",
        content:
          "The concept of state is integral to the trustworthiness of a blockchain. It provides an immutable and verifiable record of balances, token ownership, smart contract data, and other critical elements of the blockchain ecosystem. For example, the state indicates how much tokens a particular account holds or the logic governing a smart contract at any point in time. This shared state enables participants to operate with confidence, as the system ensures consistency and prevents fraudulent transactions.\n\nIn blockchain systems, the state is shared among participants in a decentralized manner. All users and nodes in the network have access to the current state and can propose changes through new transactions.",
      },
      {
        header: "Example",
        content:
          "A useful analogy for understanding shared state is that of an infinite whiteboard. This whiteboard is accessible to all participants, who can write on it or modify its content through new entries. The 'content' of the whiteboard represents the state of the blockchain at a given time. Anyone can propose changes, but the decentralized network ensures these changes are valid before they are permanently added to the whiteboard. This transparency and openness underpin the trust and functionality of blockchain systems.\n\nShared state, while foundational to blockchain technology, introduces specific challenges, particularly regarding privacy, scalability, and security. These challenges become more pronounced as the adoption of blockchain applications grows and the volume of data on the shared state increases. Addressing these challenges requires innovations like a private shared state, which combines the benefits of decentralization with enhanced data confidentiality.",
      },
      {
        header: "Why is the Public Shared State Not Enough?",
        content:
          "The shared state on blockchain serves as a global resource accessible to all dApps operating on the network. This design enables composability, where different applications can interact seamlessly by leveraging each other's states. For instance, a staking application may integrate with AAVE to manage funds and enable more complex functionality. This cross-application access to state drives innovation but also introduces significant challenges, particularly around privacy and security.\n\nA key issue arises when certain states hold sensitive or high-value information that should not be publicly visible. For example, consider the token balance of a corporate treasury or a strategic asset position managed by a DAO. If such information is freely accessible, it creates vulnerabilities. Adversaries can monitor and analyze this data to exploit it for financial or strategic gains.\n\nThe problem extends beyond the visibility of static data. On a blockchain, not only is the current state visible, but also the patterns of interaction with that state. For instance, a user interacting with a trading application leaves behind a visible sequence of transactions, which reveals behavioral patterns such as trading strategies or investment decisions. This lack of privacy exposes users to front-running, copy trading, and other forms of exploitation.\n\nMoreover, when a state with high-value data resides on-chain, it attracts attention from bots, trackers, and malicious actors. Large token balances or frequently used addresses become focal points for automated systems designed to monitor and mimic their actions. The lack of confidentiality not only undermines user security but also introduces inefficiencies and risks in decentralized systems.\n\nThese challenges necessitate solutions that allow for composability and transparency while preserving the privacy of sensitive state data and interaction patterns. Private shared state is one such approach, providing a framework for secure and confidential on-chain interactions without compromising the benefits of decentralization.",
      },
      {
        header: "Private Shared State to the Rescue",
        content:
          "A potential solution to address the privacy challenges in shared blockchain states involves enabling the coexistence of private states alongside public states. In this paradigm, while public states remain accessible and composable as they are today, private states would introduce confidentiality by restricting visibility and access to sensitive information. ![pss.png](/pss.png)  \n\nHowever, integrating private states with public states presents a fundamental challenge: composability. Computations involving private states cannot natively interact with public states in the same way traditional blockchain computations do. To address this, computations on private states need to occur off-chain within a secure environment, such as a ZK circuit or a Trusted Execution Environment (TEE). These secure environments generate cryptographic proofs or attestations that validate the computation's correctness without revealing the underlying data.\n\nPrivate states can also be designed to be shared selectively between participants, allowing individual addresses to compute on them independently and produce a new state. This capability enables consensus to be reached on private data without exposing sensitive details. Moreover, by enabling public states to read or modify themselves conditionally based on private states (with appropriate permissions), new application models can emerge. For example, dApps could define mechanisms that allow users to monetize their data securely by granting limited access to private states.",
      },
      {
        header: "Example Use Cases",
        content:
          "An illustrative example is an on-chain poker application. Players' hands could remain encrypted on-chain as private states, ensuring the game’s integrity without revealing individual cards. A more practical example would involve payroll systems where the amounts being transferred to employees are encrypted, preserving confidentiality while maintaining on-chain accountability.",
      },
      {
        header: "Privacy Enhancing Technologies (PETs)",
        content:
          "The implementation of private shared states can leverage various privacy-enhancing technologies (PETs). Multi-Party Computation (MPC), Trusted Execution Environments (TEEs), and Fully Homomorphic Encryption (FHE) offer different methods for secure off-chain computations. ZK SNARKs or STARKs provide cryptographic solutions for enabling on-chain privacy. Each approach comes with unique trade-offs in terms of efficiency, scalability, and implementation complexity.\n\nWhile private shared states provide a framework for balancing privacy and composability, their practical implementation requires further exploration and optimization. A deeper discussion on the comparative merits of different PETs and ZK-based approaches is beyond the scope of this article and warrants dedicated analysis.",
      },
      {
        header: "Conclusion",
        content:
          "Incorporating private shared states into blockchain systems addresses critical privacy and composability challenges while maintaining the transparency and decentralization fundamental to these networks. By leveraging privacy-enhancing technologies and cryptographic methods, this approach enables secure interactions and innovative applications, paving the way for broader adoption and trust in decentralized ecosystems.",
      },
    ],
  },
  {
    title: "Encifher x Rabble: Private Transactions, Made Simple",
    slug: "encifher-x-rabble-private-transactions-made-simple",
    image: "/rabble.jpeg",
    readtime: "5",
    date: "14 Jan 2025",
    content:
      "Encifher is teaming up with Rabble to enable private transactions for users on Arbitrum. Sending money on-chain no longer means exposing transaction history to the world. With Encifher’s privacy technology, users can send funds confidentially and securely with just a few clicks.",
    sections: [
      {
        header: "Encifher x Rabble: Private Transactions, Made Simple",
        content:
          "We’re pumped to team up with **Rabble** to bring **private transactions** to their users on **Arbitrum**! Sending money on-chain shouldn’t mean broadcasting your entire transaction history to the world. With Encifher, you can now send funds to friends **confidentially**—quick, easy, and without the extra noise.",
      },
      {
        header: "Confidential Transfers, No Extra Steps",
        content:
          "Rabble users can keep things private without changing the way they send payments. Just a few clicks, and your transactions stay between you and the person you’re sending to. No more prying eyes, no more unnecessary exposure. Check out the demo below and start sending with **real privacy** today!",
      },
      {
        header: "Private Transactions, Made Simple",
        content:
          "We're joining forces with [@encifherio](https://twitter.com/encifherio) to bring confidential fund transfers to Rabble users on [@arbitrum](https://twitter.com/arbitrum).\n\nSend money to your friends on-chain without broadcasting it to the world.\n\n👇 Watch how to send private transactions in just a few clicks!\n\n<blockquote class=\"twitter-tweet\" data-media-max-width=\"560\">\n  <p lang=\"en\" dir=\"ltr\">Private transactions, made simple.<br><br>We&#39;re joining forces with <a href=\"https://twitter.com/encifherio?ref_src=twsrc%5Etfw\">@encifherio</a> to bring confidential fund transfers to Rabble users on <a href=\"https://twitter.com/arbitrum?ref_src=twsrc%5Etfw\">@arbitrum</a>.<br><br>Send money to your friends on-chain without broadcasting it to the world<br><br>👇Watch how to send private transactions in just a few clicks! <a href=\"https://t.co/gvv21FqzGv\">pic.twitter.com/gvv21FqzGv</a></p>&mdash; Rabble (@0xRabble) <a href=\"https://twitter.com/0xRabble/status/1879107043325575476?ref_src=twsrc%5Etfw\">January 14, 2025</a>\n</blockquote>\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n\n**[Link to tweet](https://x.com/0xRabble/status/1879107043325575476)**",
      },
    ],
  },
  {
    title: "An Incomplete Guide to Encrypted ERC20",
    slug: "an-incomplete-guide-to-encrypted-erc20",
    image: "/header4.png",
    readtime: "10",
    date: "13 Jan 2025",
    content:
      "Encrypted ERC20 tokens extend the ERC20 standard by introducing privacy-preserving mechanisms through encryption. This guide explores how encryption works, the architecture of encrypted tokens, and their benefits.",
    sections: [
      {
        header: "ERC20",
        content:
          "ERC20 is a widely adopted standard for fungible tokens on the Ethereum blockchain. Introduced in 2015, it defines a set of rules and interfaces for token contracts, ensuring consistency and interoperability within the Ethereum ecosystem. The standard supports functions such as `transfer`, `approve`, and `balanceOf`, enabling seamless integration with wallets, decentralized applications, and exchanges. As the backbone of value transfer in the cryptocurrency ecosystem, ERC20 tokens have become a fundamental component of decentralized finance (DeFi) and tokenized assets.",
      },
      {
        header: "What is Encrypted ERC-20?",
        content:
          "The ERC-20 standard relies on a mapping that tracks the balance of each user. In its conventional form, the state of this mapping is publicly visible on the blockchain, exposing the amount held by every address. This mapping is defined as:\n\n\`\`\`solidity\nmapping(address => uint256) balanceOf;\n\`\`\`\n\nEncrypted ERC-20 tokens extend this concept by modifying the mapping to store encrypted balances. Instead of plain integers, the mapping points to encrypted values, represented as:\n\n\`\`\`solidity\nmapping(address => euint256) balanceOf;\n\`\`\`\n\nHere, `euint256` represents an encrypted integer type, ensuring that the balance of a user is not directly visible on the public blockchain. Despite this fundamental change, the token retains all functional properties of a standard ERC-20 token: it can be minted, transferred, and burned.\n\nThe key distinction is that the values involved in these operations—such as the number of tokens minted, transferred, or burned—are not exposed to the blockchain’s public ledger. This ensures transactional privacy while maintaining the token’s compatibility with the existing Ethereum ecosystem.",
      },
      {
        header: "How does encryption take place?",
        content:
          "The primary question when implementing encrypted ERC-20 tokens is how the amount is encrypted and how balances are updated while ensuring privacy. This is achieved through Privacy Enhancing Technologies (PETs) such as Fully Homomorphic Encryption (FHE), Trusted Execution Environments (TEEs), and Multi-Party Computation (MPC). These technologies enable **Programmable Privacy**, allowing operations on encrypted values without decrypting them.\n\nSince computations on encrypted data cannot occur on-chain due to current blockchain limitations, an off-chain PET co-processor performs these operations. The co-processor handles encrypted inputs, performs necessary calculations (such as addition or multiplication), and updates the on-chain state with the computed encrypted results. This approach ensures that all sensitive data remains private while maintaining the integrity of on-chain records.\n\n![d4a1e6fa-839b-4189-8468-c6be6dc4d6db.png](/snippet1.webp)\n\nThe computation relies on homomorphic operations, which allow encrypted values to be composed with one another. For example, an encrypted balance can be updated by adding an encrypted transfer amount, producing a new encrypted balance without exposing the underlying values. This mechanism creates what is known as a **Private Shared State**, where encrypted values can be used alongside public values for secure operations.\n\nThe encryption process begins at the client end. The client encrypts the transfer amount using the **Advanced Encryption Standard (AES)** in Cipher Block Chaining (CBC) mode. Both the client and the co-processor generate private keys and exchange public keys to derive a shared secret key. This shared key is then used for the AES encryption of the ERC-20 token value.\n\nThe encrypted value is passed to the co-processor, which performs the necessary computations and updates the on-chain mapping. For example, when a transfer is initiated:\n\n1. The sender's encrypted balance is decremented by the encrypted amount.\n2. The recipient's encrypted balance is incremented by the same encrypted amount.\n\nThese updates ensure that the balances reflect the transaction without exposing the transferred amount or the parties involved. This design leverages PETs to maintain privacy while enabling secure and verifiable token operations.",
      },
      {
        header: "Architecture",
        content:
          "Encrypted ERC20 tokens are designed as a 1:1 representation of original ERC20 tokens. The process begins when a user deposits standard ERC20 tokens into a **wrapper contract**, which locks the tokens and mints an equivalent amount of Encrypted ERC20 tokens. This ensures that for every token locked in the wrapper contract, a corresponding encrypted token exists in circulation.\n\n![4280423f-74bb-48e2-bb38-02edbdb4521f.png](/snippet2.png)\n\nInitially, the balance of a user in the encrypted token system mirrors their deposit, but it is stored in an encrypted form. For example, if a user deposits 321 tokens, their balance might be represented as an encrypted value such as:\n\n\`\`\`javascript\ne0dce70a03a10845f75e61265bf86cfc7fe58e98818f93378f1a508b3e0c29340e822d4b8563074f8c7506de5814a6a7\n\`\`\`\n\nThis encrypted balance is dynamic and changes even when no tokens are transferred. For instance, after a zero-token transaction, the same balance could update to a new encrypted value, such as:\n\n\`\`\`javascript\nb067af5b5e7c56d6240bcba3a4fdf0a61e0fe9a4c6492185eb01a1cd16e59da03ecf97e6d1f8c28defaeb555b5738ad1\n\`\`\`\n\nThis property ensures that balances cannot be inferred or linked to specific transactions, preserving privacy even in scenarios where the transferred amount is zero. Similarly, non-zero transfers also result in entirely new encrypted representations, preventing the tracking of balances across transactions.\n\nA crucial component of the architecture is the use of **access controllers**. These controllers define permissions for accessing and interacting with encrypted data. They ensure that only authorized entities, such as designated users or smart contracts, can decrypt or utilize encrypted values in their calculations. This access control mechanism maintains the confidentiality of sensitive data while enabling controlled interoperability with other on-chain systems.\n\nTo redeem the original tokens, users can deposit their Encrypted ERC20 tokens back into the wrapper contract. Upon verification, the contract burns the encrypted tokens and releases the equivalent amount of original ERC20 tokens, ensuring a seamless transition between the encrypted and standard token systems.",
      },
      {
        header: "Conclusion",
        content:
          "Encrypted ERC20 tokens extend the ERC20 standard by introducing privacy-preserving mechanisms through encryption. By leveraging wrapper contracts, Privacy Enhancing Technologies, and dynamic encrypted representations, they enable secure token transfers without exposing balances or transaction details. The architecture ensures 1:1 parity with original tokens while maintaining compatibility with existing blockchain infrastructure.\n\nThis design combines cryptographic rigor with practical usability, creating a framework for private yet verifiable token transactions. Encrypted ERC20 tokens represent a step toward programmable privacy, balancing confidentiality and transparency in decentralized systems.",
      },
    ],
  },
];
