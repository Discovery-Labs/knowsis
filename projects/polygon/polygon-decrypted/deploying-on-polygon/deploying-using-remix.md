# Deploying using Remix

## Remix

In this lesson, we will assume that you already know how to use Remix, and are familiar with Solidity. If this is not the case, please take this opportunity to familiarize yourself with Remix. We are assuming a familiarity with Solidity because without a programming language that is custom-built for the Ethereum Virtual Machine, you will be unable to build a dapp that can be deployed on either Ethereum or Polygon. When you are familiar with these two technologies, please continue with this lesson!

## Acquire Smart Contracts

To deploy smart contracts to a blockchain, you need to have a smart contract written and compiled. This lesson also assumes you know how to do this, as you would likely not be attempting to deploy smart contracts that you have not written yet. When the contract is done, it should look something like this example below. Once you have your smart contract, go ahead and compile with Remix, and then you are ready for the rest of this lesson!

{% code title="HelloWorld.sol" %}
```bash
// Specifies that the source code is for a version
// of Solidity greater than 0.5.10
pragma solidity ^0.5.10;

// A contract is a collection of functions and data (its state)
// that resides at a specific address on the Ethereum blockchain.
contract HelloWorld {

    // The keyword "public" makes variables accessible from outside a contract
    // and creates a function that other contracts or SDKs can call to access the value
    string public message;

    // A special function only run during the creation of the contract
    constructor(string memory initMessage) public {
        // Takes a string value and stores the value in the memory data storage area,
        // setting `message` to that value
        message = initMessage;
    }

    // A publicly accessible function that takes a string as a parameter
    // and updates `message`
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```
{% endcode %}

**The first step is to get a Metamask account\(which you already have used, if you have gotten this far on Discovery\) and to set it to the Matic Network. In this tutorial we will provide the configurations for both the Matic Mumbai Testnet, and the Matic Mainnet, but always remember to test your smart contracts on the testnet before they are deployed to the mainnet, where real money can be exploited through any errors in the smart contracts.**

**To connect Metamask to the Matic testnet \(or the Mainnet!\), there is a very simple process that takes only a couple of minutes. For this tutorial, I will put the configuration for the Mumbai testnet outside of the parentheses\(\), and I will put the mainnet configurations inside the parentheses \(mainnet settings here\).**

## Metamask

1. **The first step is to enter Metamask, and click on the networks dropdown, and select "Custom RPC", which should be the bottom option on the list.** 

   ![](https://lh3.googleusercontent.com/EyxtRFFny7QfX6jYAmejpf0l9lmK892LFIQh3E8kUI0U8Gsu3dGWMyI6VeLg4z85RRP8_A9AVKPqW-FOw5qAI36qbEJOGgbmomUDD7HJinO-qsgzK44sGIKhD4fee61KWFxD24cM)

2. **Enter network Name: Matic Mumbai Testnet \(Matic Mainnet\)** 
3. **New RPC URL: https://rpc-mumbai.matic.today \(https://rpc-mainnet.maticvigil.com/\)**
4. **Chain ID: 80001 \(137\)**
5. **Symbol: maticmum \(MATIC\)**
6. **Block Explorer URL\(optional\): https://mumbai.polygonscan.com/ \(https://polygonscan.com/\)**  


   ![](https://lh6.googleusercontent.com/fFj4ZxlGAtXAyr6nuvMimWdN8gbueBIYMpcuHwcPxAyYqMo2u4AFe5gTuGQcMS1nMEMyurdUKNAYQmsXN3ShwahSheJvbu1_33hyQ1A6RV69O37QQ7WRVIukLlMcrHVHcH1_hy6Q)

**Once you click save, you will either need to head to the Mumbai Faucet to request test Matic, which you can find at https://faucet.matic.network or if you have deployed to the mainnet, you need to acquire some MATIC from an exchange or as a transfer from another account.**

**Now that we have our MATIC, whether that be on the testnet or mainnet, we can deploy our smart contracts. Back in your Remix tab, click on the "Environment" dropdown, and select "Injected Web3". Metamask should pop up and ask if you accept the connection request, and you will need to do this to connect to Remix.**

**As soon as you are connected to Remix, you can press the "Deploy" button, which will generate another Metamask popup asking if you would like to confirm this contract deployment. On the testnet, it is very unlikely that this has any gas cost. On the mainnet however, it is probable that there will be a cost associated with this, so plan accordingly.**

![An example of a &quot;HelloWorld&quot; contract deployed on the Matic Testnet](https://lh4.googleusercontent.com/cnMb09EStAUC3_oMvddRkl6jU4ZsJZs9doace3nZQMDKIZnPAO217cAj7DyRBxS3i7c6xzg-p_qot7hOPFWiE0g9-VoTRlKQt-T9GDZXlUl-WYehR--RExQ4wFtev9KuPRu_l0vP)

**Lastly, it is important to verify your smart contracts on PolygonScan. This helps users on the blockchain see interactions with your Dapp, and verifies that it is trustworthy. Without this verification, many users could look upon your decentralized app and fully believe that it is a scam, and you would be unable to prove them wrong. This is one of the biggest reasons that documentation and verification is important. Especially in an industry like Blockchain, where some of the biggest obstacles are both scams and distrust, it is important to show users of your Dapp that they do not need to trust the programmer, because the program will be available for all to read. This verification is also a short process, and takes little more than a couple of commands.**

1. **Install either "truffle-flattener" or "sol-merger"**
2. **Run `sol-merger \"./contracts/*.sol\" ./build`**
3. **Navigate to Polyscan and search the address of your contract**
4. **Select the correct compiler and the license type of your contract**
5. **Press "Verify and Publish"**

**Voila! You have now deployed your first Dapp to the Polygon network using Remix. This has been your first step on a long journey of scalability and cheaper gas fees, and never forget to take the time to thank those that innovated so that you could come this far. We hope you have enjoyed this lesson, and look forward to seeing you in the next one so that you can continue your path to the Polygon badge!**

