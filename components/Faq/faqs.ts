export const faqs = [
    {
        question: "What is the compliance policy while using Encifher?",
        answer: `Encifher allows users to export a detailed report of their transactions to provide to the relevant authorities. This report includes the total number of blockchain interactions.
Additionally, we perform pre-transaction checks through hooks and predicates to verify the legitimacy of users before executing transactions`,
        linkText: "Learn more about our compliance policy here.",
        link: "https://docs.encifher.io/docs/solution/compliance/"
    },
    {
        question: "Is this similar to being a mixer?",
        answer: `No, Encifher is NOT a mixer. Mixers anonymize transactions and addresses, often at the expense of transparency and compliance. 
Encifher only encrypts the transaction amounts, leaving addresses visible. This data can be decrypted and revealed to authorities if needed, ensuring full compliance.`
    },
    // {
    //     question: "What applications does Encifher currently support?",
    //     answer: `Encifher currently supports encrypted swaps and encrypted payments.
    //     We also offer:
    //     A Telegram Bot for encrypted payments.
    //     Integration with Uniswap and AAVE for private swapping and lending.`
    // },
    {
        question: "What exactly is being hidden on the blockchain?",
        answer: `Encifher hides the transaction amounts while leaving other data, such as addresses, transparent.
Unlike mixers, there are no shielding pools or assets involved. This approach ensures privacy without anonymity or obfuscation.`
    },
    {
        question: "Can I use this on my DeFi protocol?",
        answer: `TL;DR: Yes!
We have integrated with Uniswap and AAVE on Base, and we plan to expand to other protocols.
Encifher also offers an SDK for developers to integrate privacy features into their platforms.
If you're interested in an integration, {contact us.}{https://t.me/rishotics}`
    },
//     {
//         question: "Can I customize the level of privacy for my transactions?",
//         answer: `Yes, developers can define the desired level of privacy for transactions.
// Visit our documentation to learn how to implement these features.`
//     },
    // {
    //     question: "How secure is Encifher?",
    //     answer: ""
    // },
    // {
    //     question: "How can I start using Encifher?",
    //     answer: `We'll soon be launching a couple of applications to get you started`
    // },
    // {
    //     question: "Does using Encifher increase transaction costs?",
    //     answer: "Cost may slightly increase in transactions compared to standard DeFi protocols, but we strive to keep fees competitive"
    // },
    // {
    //     question: "Is Encifher suitable for both individuals and businesses?",
    //     answer: "Absolutely. Encifher is designed for anyone needing privacy and compliance, from individual users to large enterprises."
    // },
    {
        question: "Does Encifher have a community for discussions?",
        answer: "Yes! Join our community on {Telegram}{https://t.me/+ZWHGMW4ZHXQwYTZl} and {Twitter}{https://x.com/@encifherio} to stay updated and share feedback."
    },
    // {
    //     question: "How do I get involved with Encifher as a developer?",
    //     answer: "Developers can access our SDKs and documentation to build on Encifher. Visit our developer portal for more information."
    // }
]