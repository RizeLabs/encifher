"use client"

import { Shield, Cpu, FileCheck } from 'lucide-react';

export default function HowItWorks() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center my-16 md:mb-[2rem] w-full px-4 sm:px-6 md:px-0">
            <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[400] text-white mb-4">
                    How it works — <span className="text-primary-brand-light">Trustless Private Compute</span>
                </h2>
                <p className="text-sm md:text-[16px] font-[300] text-white/60 max-w-3xl mx-auto leading-relaxed">
                    Build private flows with encrypted state, attested execution, and on-chain verification — no custody, no plaintext on chain.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl">
                {/* Column 1: Commit */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-6">
                        <button className="bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-4 py-2 text-sm rounded-md">
                           EXPRESS
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-[400] text-white mb-4">
                        Make Encryption Expressive
                    </h3>
                    <p className="text-sm md:text-[14px] font-[300] text-white/60 leading-relaxed">
                        Wrap SPL tokens into encrypted equivalents. Express your execution intent on top of it
                    </p>
                </div>

                {/* Column 2: Compute */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-6">
                        <button className="bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-4 py-2 text-sm rounded-md">
                            COMPUTE
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                            <Cpu className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-[400] text-white mb-4">
                        Encrypted Compute at Scale
                    </h3>
                    <p className="text-sm md:text-[14px] font-[300] text-white/60 leading-relaxed">
                    Privacy guarantees derived from the underline encryption scheme, with speed and integrity of TEEs
                    </p>
                </div>

                {/* Column 3: Verify */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-6">
                        <button className="bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-4 py-2 text-sm rounded-md">
                            VERIFY
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                            <FileCheck className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-[400] text-white mb-4">
                        Verify Without Trusting
                    </h3>
                    <p className="text-sm md:text-[14px] font-[300] text-white/60 leading-relaxed">
                     Verify every bit of your encrypted intent against proof and attestations onchain via Encifher's extensive verification mechanism
                    </p>
                </div>
            </div>
        </div>
    )
}
