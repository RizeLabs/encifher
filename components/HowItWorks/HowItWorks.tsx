/* eslint-disable */
"use client"

import Image from "next/image";

export default function HowItWorks() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center my-16 md:mb-[2rem] w-full px-4 sm:px-6 md:px-4">
            <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[400] text-white mb-4">
                    How it works — <span className="text-primary-brand-light">Trustless Private Compute</span>
                </h2>
                <p className="text-sm md:text-[16px] font-[300] text-white/60 max-w-3xl mx-auto leading-relaxed">
                    Build private flows with encrypted state, attested execution, and on-chain verification — no custody, no plaintext on chain.
                </p>
            </div>

            {/* How It Works Steps */}
            <div className="w-full max-w-7xl">
                {/* Top Row - SCREENING (Full Width) */}
                <div className="mb-8 md:mb-12">
                    <div className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-xl relative overflow-hidden flex flex-col md:flex-row justify-start items-center">
{/* Icon */}
<div className="bg-none">
                                <Image 
                                    src="/hiw1.svg"
                                    alt="Screening Icon" 
                                    width={200} 
                                    height={200}
                                    className="w-full h-full"
                                />
                            </div>
                        
                        
                            
                            
                            {/* Content */}
                            <div className="flex-1 md:ml-10 p-6 md:p-0 text-center md:text-left">
                                <h3 className="text-xs md:text-lg font-bold text-white mb-3 uppercase tracking-wider">
                                    Screening
                                </h3>
                                <p className="text-[8px] md:text-xs text-white/80 leading-relaxed max-w-2xl">
                                    Encifher screens your wallet against blacklist address registries for fraud, terror financing, dark net transactions, hacks etc. This ensures users have a safe interaction.
                                </p>
                            </div>
                        
                    </div>
                </div>

                {/* Bottom Row - Three Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* ENCRYPT */}
                    <div className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-xl relative overflow-hidden">
                
                        {/* Icon */}
                        <div>
                                <Image 
                                    src="/hiw2.svg" 
                                    alt="Encrypt Icon" 
                                    width={120} 
                                    height={120}
                                    className="w-full h-full"
                                />
                            </div>
                            
                        <div className="flex-col justify-center items-center p-6 md:text-left text-center">
                                <h3 className="text-xs md:text-lg font-bold text-white mb-3 uppercase tracking-wider">
                                Encrypt
                                </h3>
                                <p className="text-[8px] md:text-xs text-white/80 leading-relaxed max-w-2xl">
                                Wrap tokens into encrypted balances. On-chain we store a handle, not your amount
                                </p>
                            </div>
                        
                    </div>

                    {/* EXECUTE */}
                    <div className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-xl relative overflow-hidden">
                
                        {/* Icon */}
                        <div>
                                <Image 
                                    src="/hiw3.svg" 
                                    alt="Encrypt Icon" 
                                    width={120} 
                                    height={120}
                                    className="w-full h-full"
                                />
                            </div>
                            
                        <div className="flex-col justify-center items-center p-6 md:text-left text-center">
                                <h3 className="text-xs md:text-lg font-bold text-white mb-3 uppercase tracking-wider">
                                Execute
                                </h3>
                                <p className="text-[8px] md:text-xs text-white/80 leading-relaxed max-w-2xl">
                                Our TEE co-processor decrypts inside the enclave, routes via Jupiter, re-encrypts results.
                                </p>
                            </div>
                        
                    </div>

                    {/* VERIFY */}
                    <div className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-xl relative overflow-hidden">
                
                        {/* Icon */}
                        <div>
                                <Image 
                                    src="/hiw4.svg" 
                                    alt="Encrypt Icon" 
                                    width={120} 
                                    height={120}
                                    className="w-full h-full"
                                />
                            </div>
                            
                        <div className="flex-col justify-center items-center p-6 md:text-left text-center">
                                <h3 className="text-xs md:text-lg font-bold text-white mb-3 uppercase tracking-wider">
                                Verify                                </h3>
                                <p className="text-[8px] md:text-xs text-white/80 leading-relaxed max-w-2xl">
                                We post a signed Merkle root + DA pointer so anyone can verify the computation.
                                </p>
                            </div>
                        
                    </div>
           
                </div>
            </div>
        </div>
    )
}
// No code needed here; the file is already complete and properly closed.
