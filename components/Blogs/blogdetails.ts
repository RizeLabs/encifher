export const blogs = [
    {
      title: "Confidential Computing: Dstack SDK and TEEs Part - 1",
      slug: "confidential-computing-dstack-sdk-and-tees-part-1",
      image: "/confidential-computing/cover.png",
      readtime: "8",
      date: "17 March 2025",
      content: "Trusted Execution Environments (TEEs) are revolutionizing blockchain privacy by enabling secure, confidential computing with hardware-backed isolation and remote attestation. Unlike cryptographic solutions like Fully Homomorphic Encryption (FHE) or Multi-Party Computation (MPC), which suffer from high computational overhead, TEEs offer near-native performance while ensuring data integrity and privacy. This is crucial for decentralized applications in finance, identity, and machine learning, where transparency conflicts with confidentiality. In this article, we explore how Dstack SDK simplifies TEE adoption, compare TEEs with existing privacy-preserving techniques, and demonstrate a real-world example of deploying a confidential web application, highlighting how TEEs unlock high-performance privacy for decentralized applications",
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
          content: "Suppose we have a basic web application that we want to run with confidentiality. For simplicity, imagine it’s just an Nginx server that serves a static webpage which prints “Hello, Confidential World!”. We also want to keep the content secret until it’s served (a contrived example, but it could represent proprietary code or data). \n\n **Step 1: Prepare the Application** \n\n Create a directory for our app with an `index.html` and a Dockerfile or use an off-the-shelf image. In this case, we’ll use the official Nginx image and have it serve our static file. \n\n **Step 2: Write `docker-compose.yaml`** \n\n This file will describe our service. For example: \n\n ```yaml \n version: '3' \n services: \n   web: \n     image: nginx \n     volumes: \n    - ./html:/usr/share/nginx/html:ro   # mount our static content \n     ports: \n       - 8080:80 \n ``` \n\n Place your `index.html` in a local `html/` folder. \n\n  This compose file says: use the Nginx image, serve files from ./html, and expose port 80 of the container to port 8080 on the host. \n\n Normally, running `docker-compose up` would start this container on your machine. Instead, Dstack will deploy it in a TEE. \n\n **Step 3: Deploy with Dstack** \n\n Ensure you have access to a TEE-enabled host (for example, a cloud VM that supports Intel TDX or an on-prem server with the proper CPU). \n\n Install Dstack following its documentation (it might involve running a setup script on the host to start `teepod` and related services). Then run the deployment command. \n\n Under the hood, Dstack encrypts any sensitive info (in our simple example, we have none except the content of `index.html` which is not particularly secret). It then launches the enclave VM, sets up Nginx inside it, and configures the networking. \n\n **Step 4: Access the App:** \n\n You can now use an attestation verification tool to confirm that the Nginx was indeed running in an enclave. \n\n For instance, Dstack’s `tappd` provides an API to get a quote. One could exec into the enclave or call a provided endpoint to retrieve a quote, then use Intel’s verification library to check its validity against Intel’s Attestation Service. \n\n This step would confirm that the hash of the application code/binary inside the enclave matches what we expect, giving us cryptographic proof of the enclave’s state. \n\n This simple example shows the developer experience: **write normal app, deploy to secure enclave, gain confidentiality.** Dstack supports more complex setups (databases, multi-service apps, etc.), and provides features like a web dashboard to view logs securely or SSH into the enclave for debugging if needed. But the core benefit is clear – it abstracts away the complexity of TEEs into a familiar Docker-centric workflow. \n\n All of this happens with minimal effort required from the developer. Dstack handles the heavy lifting: setting up the enclave, injecting your containers, managing keys, and providing connectivity. From the developer’s perspective, it feels a lot like deploying to a normal cloud, except now your app runs inside a black box that even root users can’t inspect. Secrets stay safe (the env vars were encrypted client-side and only reveal themselves in the enclave), and you gain a level of assurance that is invaluable for sensitive logic. \n\n"
        },
        {
          header: "Conclusion",
          content: "The Dstack SDK exemplifies how we can bring this power to developers in an accessible way. \n\n In the near future, we’ll also see improvements in the developer experience for TEEs. Projects like Dstack are just the beginning. We can anticipate more frameworks, SDKs, and perhaps high-level languages or smart contract platforms that integrate TEE support natively. Open-source SDKs such as Microsoft’s Open Enclave (which generalizes enclave development across different hardware) [(GitHub - openenclave/openenclave: SDK for developing enclaves)](https://github.com/openenclave/openenclave#:~:text=Introduction) and Red Hat’s Enarx are making enclave development more accessible. \n\n We expect TEEs to get faster, more secure, and more integrated with decentralized frameworks. "
        },
        {
          header: "References",
          content: "GitHub GitHub - Dstack-TEE/dstack: Deploy any app to TEE. (https://github.com/Dstack-TEE/dstack) \n\n Dstack | Phala Network Docs https://docs.phala.network/overview/phala-network/dstack \n\n SpringerLink Trusted Execution Environment https://link.springer.com/chapter/10.1007/978-3-031-33386-6_18 \n\n Automata - Verifiable attestations with machines https://www.ata.network/ \n\n Nitro Enclaves concepts - AWS https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html \n\n c4lvin | ChainLight TEE + Web3: Do you know what you trust in? https://blog.chainlight.io/tee-web3-do-you-know-what-you-trust-in-1c2cde30fe13 \n\n iExec: Pioneering Decentralized Confidential Computing Since https://www.iex.ec/academy/iexec-decentralized-confidential-computing \n\n"
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
            "The ERC-20 standard relies on a mapping that tracks the balance of each user. In its conventional form, the state of this mapping is publicly visible on the blockchain, exposing the amount held by every address. This mapping is defined as:\n\n```solidity\nmapping(address => uint256) balanceOf;\n```\n\nEncrypted ERC-20 tokens extend this concept by modifying the mapping to store encrypted balances. Instead of plain integers, the mapping points to encrypted values, represented as:\n\n```solidity\nmapping(address => euint256) balanceOf;\n```\n\nHere, `euint256` represents an encrypted integer type, ensuring that the balance of a user is not directly visible on the public blockchain. Despite this fundamental change, the token retains all functional properties of a standard ERC-20 token: it can be minted, transferred, and burned.\n\nThe key distinction is that the values involved in these operations—such as the number of tokens minted, transferred, or burned—are not exposed to the blockchain’s public ledger. This ensures transactional privacy while maintaining the token’s compatibility with the existing Ethereum ecosystem.",
        },
        {
          header: "How does encryption take place?",
          content:
            "The primary question when implementing encrypted ERC-20 tokens is how the amount is encrypted and how balances are updated while ensuring privacy. This is achieved through Privacy Enhancing Technologies (PETs) such as Fully Homomorphic Encryption (FHE), Trusted Execution Environments (TEEs), and Multi-Party Computation (MPC). These technologies enable **Programmable Privacy**, allowing operations on encrypted values without decrypting them.\n\nSince computations on encrypted data cannot occur on-chain due to current blockchain limitations, an off-chain PET co-processor performs these operations. The co-processor handles encrypted inputs, performs necessary calculations (such as addition or multiplication), and updates the on-chain state with the computed encrypted results. This approach ensures that all sensitive data remains private while maintaining the integrity of on-chain records.\n\n![d4a1e6fa-839b-4189-8468-c6be6dc4d6db.png](/snippet1.webp)\n\nThe computation relies on homomorphic operations, which allow encrypted values to be composed with one another. For example, an encrypted balance can be updated by adding an encrypted transfer amount, producing a new encrypted balance without exposing the underlying values. This mechanism creates what is known as a **Private Shared State**, where encrypted values can be used alongside public values for secure operations.\n\nThe encryption process begins at the client end. The client encrypts the transfer amount using the **Advanced Encryption Standard (AES)** in Cipher Block Chaining (CBC) mode. Both the client and the co-processor generate private keys and exchange public keys to derive a shared secret key. This shared key is then used for the AES encryption of the ERC-20 token value.\n\nThe encrypted value is passed to the co-processor, which performs the necessary computations and updates the on-chain mapping. For example, when a transfer is initiated:\n\n1. The sender's encrypted balance is decremented by the encrypted amount.\n2. The recipient's encrypted balance is incremented by the same encrypted amount.\n\nThese updates ensure that the balances reflect the transaction without exposing the transferred amount or the parties involved. This design leverages PETs to maintain privacy while enabling secure and verifiable token operations.",
        },
        {
          header: "Architecture",
          content:
            "Encrypted ERC20 tokens are designed as a 1:1 representation of original ERC20 tokens. The process begins when a user deposits standard ERC20 tokens into a **wrapper contract**, which locks the tokens and mints an equivalent amount of Encrypted ERC20 tokens. This ensures that for every token locked in the wrapper contract, a corresponding encrypted token exists in circulation.\n\n![4280423f-74bb-48e2-bb38-02edbdb4521f.png](/snippet2.png)\n\nInitially, the balance of a user in the encrypted token system mirrors their deposit, but it is stored in an encrypted form. For example, if a user deposits 321 tokens, their balance might be represented as an encrypted value such as:\n\n```javascript\ne0dce70a03a10845f75e61265bf86cfc7fe58e98818f93378f1a508b3e0c29340e822d4b8563074f8c7506de5814a6a7\n```\n\nThis encrypted balance is dynamic and changes even when no tokens are transferred. For instance, after a zero-token transaction, the same balance could update to a new encrypted value, such as:\n\n```javascript\nb067af5b5e7c56d6240bcba3a4fdf0a61e0fe9a4c6492185eb01a1cd16e59da03ecf97e6d1f8c28defaeb555b5738ad1\n```\n\nThis property ensures that balances cannot be inferred or linked to specific transactions, preserving privacy even in scenarios where the transferred amount is zero. Similarly, non-zero transfers also result in entirely new encrypted representations, preventing the tracking of balances across transactions.\n\nA crucial component of the architecture is the use of **access controllers**. These controllers define permissions for accessing and interacting with encrypted data. They ensure that only authorized entities, such as designated users or smart contracts, can decrypt or utilize encrypted values in their calculations. This access control mechanism maintains the confidentiality of sensitive data while enabling controlled interoperability with other on-chain systems.\n\nTo redeem the original tokens, users can deposit their Encrypted ERC20 tokens back into the wrapper contract. Upon verification, the contract burns the encrypted tokens and releases the equivalent amount of original ERC20 tokens, ensuring a seamless transition between the encrypted and standard token systems.",
        },
        {
          header: "Conclusion",
          content:
            "Encrypted ERC20 tokens extend the ERC20 standard by introducing privacy-preserving mechanisms through encryption. By leveraging wrapper contracts, Privacy Enhancing Technologies, and dynamic encrypted representations, they enable secure token transfers without exposing balances or transaction details. The architecture ensures 1:1 parity with original tokens while maintaining compatibility with existing blockchain infrastructure.\n\nThis design combines cryptographic rigor with practical usability, creating a framework for private yet verifiable token transactions. Encrypted ERC20 tokens represent a step toward programmable privacy, balancing confidentiality and transparency in decentralized systems.",
        },
      ],
    },
  ];
  