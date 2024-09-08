---
slug: fhe-on-bitcoin
title: Why FHE rollups are not possible on Bitcoin?
topic: blog
authors: nitanshu
image: /assets/blog/fhe-on-btc.webp
---

In this blog we are going to talk about what the issues we face while building FHE rollups on top of Bitcoin.
<!--truncate-->

<br></br>

![Docusaurus Plushie2](/assets/blog/fhe-on-btc.webp)

<br></br>

# Why FHE (Fully Homomorphic Encryption) Rollups are Not Possible on Bitcoin

## Introduction

In this post, we will explore a complex and fascinating topic: the potential and limitations of Fully Homomorphic Encryption (FHE) rollups on Bitcoin. We'll cover an overview of rollups, discuss the mechanics of execution, settlement, and data availability (DA) on Bitcoin, and delve into the challenges of integrating FHE operations with rollups on the Bitcoin network.

## What is a Rollup? How Does it Differ from a Sidechain?

A rollup is an off-chain or Layer 1 (L1) execution engine that processes transactions outside the main blockchain, updating the state off-chain and then posting the data back to L1. The key benefit is scalability, as it reduces the burden on the base layer.

In contrast, a sidechain operates independently of the main chain's consensus. This gives it greater flexibility but at the cost of weaker security, as sidechains rely on their infrastructure rather than inheriting security from the base layer. Many Bitcoin Layer 2 solutions are, in fact, sidechains.

## Why Do We Need Rollups?

Rollups are crucial for scaling the base layer while inheriting its security. By reducing trust assumptions on sequencers, rollups enhance censorship resistance, allowing users to withdraw assets directly on L1 without relying entirely on the rollup’s integrity.

## Components of a Rollup

A rollup has three main components:

1. **Off-chain Execution:** The state transition function (STF) processes transactions and produces new states, potentially using innovative virtual machines (VMs) different from the Ethereum Virtual Machine (EVM).
   
2. **Data Availability:** While transactions are posted on L1, high costs are incurred. A modular architecture can reduce costs by using DA layers with availability guarantees, ensuring that anyone can reconstruct the chain from DA data.
   
3. **Settlement:** The final state of the rollup is settled on L1, inheriting security through either validity proofs or fraud proofs.

## Execution and Data Availability on Bitcoin

On Bitcoin, settling the final state of a rollup poses unique challenges. Bitcoin's UTXO model and script limitations make state management difficult, and the lack of certain operations (e.g., integer multiplication) further complicates proof verification.

## Settlement Mechanisms

Different rollup constructions utilize various settlement mechanisms:

- **ZK Rollups:** These rely on validity proofs verified on L1.
- **Optimistic Rollups:** These use fraud proofs where the state can be challenged and validated on L1.
- **Pessimistic Rollups:** These involve re-executing and verifying transactions, though this approach has significant drawbacks.

## Verifying Proofs on Bitcoin

Writing scripts to verify proofs directly on Bitcoin is far from straightforward. Limitations like the lack of state management, limited stack input size, and the absence of necessary operations (e.g., OP_CAT) make native proof verification unfeasible.

## BitVM to the Rescue

BitVM offers a potential solution by enabling state transfers from one script to another, with optimizations like BitVM2 and Snarknado providing more efficient verification mechanisms. However, challenges remain, particularly when attempting to verify FHE operations within a rollup.

## Can We Generate Proofs for FHE Operations?

This is where things get tricky. FHE operations are complex and rely on lattice-based cryptography, which doesn’t align well with most zero-knowledge proofs (ZKPs). FHE operations are also computationally expensive, leading to significant challenges in constrained environments like those required for zk-proofs.

## Developments in Proving FHE

Recent research has made strides in this area:

- **Greco:** Fast ZKPs for FHE RLWE ciphertexts.
- **VFHE:** Proving bootstrapping using Plonky2.
- **Verifying FHE operations in ZKVMs:** Further exploration of this topic is ongoing.

Despite these advancements, creating proofs for arbitrary FHE operations remains elusive. However, with ongoing research, especially from teams like Zama, the future looks promising.

## Pessimistic Verification

One approach to verification is re-executing blocks, but this is impractical for rollups. Building a secure verification network with appropriate consensus would be challenging and might blur the line between rollups and sidechains.

## Optimistic Verification

Some fraud-proof implementations are gaining traction:

- **Optimism Cannon (FPVM):** Executes disputed states on L1 via MIPS.sol.
- **Arbitrum BoLD:** Uses interactive fraud proving to mitigate delay attacks.

## Babylonchain: A Potential Solution?

Babylonchain, a Cosmos SDK-based chain, could offer a solution by deploying cosmwasm contracts and implementing interactive fraud proofs inspired by optimistic constructions. However, this approach is not without limitations, especially concerning the security and liveliness of Babylonchain.

## Conclusion

The integration of FHE with rollups on Bitcoin presents significant challenges, from proof generation to settlement and verification. While current solutions like BitVM and Babylonchain offer promising directions, limitations in Bitcoin’s architecture and the complexity of FHE make fully homomorphic encryption rollups on Bitcoin a daunting, if not impossible, task at present. Yet, with continued research and innovation, we may see breakthroughs in the near future.

## References

[1] https://medium.com/babylonchain-io/babylon-v0-7-1-goes-live-with-smart-contract-capabilities-and-bitcoin-security-for-dapps-e2cbfddd1e17

[2] https://l2ivresearch.substack.com/p/tech-deep-dive-verifying-fhe-in-risc

[3] https://www.alpenlabs.io/blog/snarknado-practical-round-efficient-snark-verifier-on-bitcoin

[4] https://docs.optimism.io/stack/protocol/fault-proofs/explainer

[5] https://docs.arbitrum.io/how-arbitrum-works/fraud-proofs/challenge-manager

[6] https://bitvm.org/bitvm2
