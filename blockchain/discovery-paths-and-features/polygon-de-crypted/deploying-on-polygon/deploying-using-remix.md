# Deploying using Remix

In this lesson, we will assume that you already know how to use Remix, and are familiar with Solidity. If this is not the case, please take this opportunity to familiarize yourself with Remix. We are assuming a familiarity with Solidity because without a programming language that is custom-built for the Ethereum Virtual Machine, you will be unable to build a dapp that can be deployed on either Ethereum or Polygon. When you are familiar with these two technologies, please continue with this lesson!

Once your smart contracts are written and compiled in Remix, there are only a few steps needed to deploy the contracts onto Polygon! 

The first step is to get a Metamask account\(which you already have used, if you have gotten this far on Discovery\) and to set it to the Matic Network. In this tutorial we will provide the configurations for both the Matic Mumbai Testnet, and the Matic Mainnet, but always remember to test your smart contracts on the testnet before they are deployed to the mainnet, where real money can be exploited through any errors in the smart contracts.

To connect Metamask to the Matic testnet \(or the Mainnet!\), there is a very simple process that takes only a couple of minutes. For this tutorial, I will put the configuration for the Mumbai testnet outside of the parentheses\(\), and I will put the mainnet configurations inside the parentheses \(mainnet settings here\). 

The first step is to enter Metamask, and click on the networks dropdown, and select "Custom RPC", which should be the bottom option on the list. 

![](../../../../.gitbook/assets/image%20%281%29.png)

The fields on this page are very simple. We will:

Enter network Name: Matic Mumbai Testnet \(Matic Mainnet\)

New RPC URL: https://rpc-mumbai.matic.today \(https://rpc-mainnet.maticvigil.com/\)

Chain ID: 80001 \(137\)

Symbol: maticmum \(MATIC\)

Block Explorer URL\(optional\): https://mumbai.polygonscan.com/ \(https://polygonscan.com/\)

![](../../../../.gitbook/assets/image%20%282%29.png)

Once you click save, you will either need to head to the Mumbai Faucet to request test Matic, which you can find at https://faucet.matic.network or if you have deployed to the mainnet, you need to acquire some MATIC from an exchange or as a transfer from another account. 

Now that we have our MATIC, whether that be on the testnet or mainnet, we can deploy our smart contracts. Back in your Remix tab, click on the "Environment" dropdown, and select "Injected Web3". Metamask should pop up and ask if you accept the connection request, and you will need to do this to connect to Remix. 

As soon as you are connected to Remix, you can press the "Deploy" button, which will generate another Metamask popup asking if you would like to confirm this contract deployment. On the testnet, it is very unlikely that this has any gas cost. On the mainnet however, it is probable that there will be a cost associated with this, so plan accordingly. 

![An example of a &quot;HelloWorld&quot; contract deployed on the Matic Testnet](../../../../.gitbook/assets/image%20%283%29.png)

Lastly, it is important to verify your smart contracts on PolygonScan. This helps users on the blockchain see interactions with your Dapp, and verifies that it is trustworthy. Without this verification, many users could look upon your decentralized app and fully believe that it is a scam, and you would be unable to prove them wrong. This is one of the biggest reasons that documentation and verification is important. Especially in an industry like Blockchain, where some of the biggest obstacles are both scams and distrust, it is important to show users of your Dapp that they do not need to trust the programmer, because the program will be available for all to read. This verification is also a short process, and takes little more than a couple of commands.

Start by installing either "truffle-flattener" or "sol-merger" and flatten your smart contracts using the command "sol-merger \"./contracts/\*.sol\" ./build

Now, navigate to your contract's page on Polyscan \(which can be searched using the contract address\) and click verify and publish. You will have to select "Solidity \(Single File\)" in the compiler type, select the appropriate compiler version, and choose the license type of your contract. In the next section, you will paste your flattened contract, and adjust the optimization section if you had done so earlier. 

Voila! You have now deployed your first Dapp to the Polygon network using Remix. This has been your first step on a long journey of scalability and cheaper gas fees, and never forget to take the time to thank those that innovated so that you could come this far. We hope you have enjoyed this lesson, and look forward to seeing you in the next one so that you can continue your path to the Polygon badge!

