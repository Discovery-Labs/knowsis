# Cryptography Behind the Blockchain

**The Blockchains use asymmetric-key cryptography and hashing algorithms such as SHA-256 or ETHASH to function in a secure way. Asymmetric-key cryptography is used to create wallets and accounts for users on blockchain networks. This works by creating a public key that is shown to the entire network, and is used to receive transactions and can serve as an identity on the network. On the opposite side, the private key is the key that the public key is derived from, and is private information.This private key is typically derived randomly and is unique to each wallet. It is possible for a user to recover their public key using their private key, but it is not possible for anybody to derive the private key using the public key \(this is why it is called asymmetric-key cryptography!\)**

**Blockchain networks also use hashing algorithms in order to link the blocks together. A hashing algorithm is a mathematical algorithm that condenses content into a fixed-length string of data. One of the most important factors of a hashing algorithm is that any slight change in the input produces a drastic change in the output.**

**Example: SHA-256 Hashing Algorithm:**

**Input: “Hello World!” -** 

**Hash: ‘03ba204e50d126e4674c005e04d82e84c21366780af1f43bd54a37816b6ab340’**  


**Input: “HeLlo World!” -** 

 **Hash: ‘4a5532055138945f4c82864eed852ab5006d5e5bc4ff35a55ab7fcee7aa94492’**  


**Notice how there is a drastic difference in the hash after only capitalizing one letter in the original input? This is arguably the most important function of hash algorithms. This hash could be decoded, and if it were imputed into a SHA-256 calculator, we would be able to see the exact input with which the hash was created - exactly as it was inputted.**   


 **Each block has its own hash, and each block’s hash includes the hash from the previous block, data for the current block, as well as a “nonce” that is simply a unique number for each particular block. “Nonce” is an abbreviation for “number only used once” and it is simply a sequential number that is hashed into the block’s data when it is mined.Due to these hashing algorithms, as well as the implementation of a consensus mechanism such as Proof of Work, it becomes very expensive to attempt to steal or exploit a vulnerability in a blockchain network.**   


{% embed url="https://www.youtube.com/watch?v=QUG-T3E05P4" %}



#### [ ****](
https://www.youtube.com/watch?v=QUG-T3E05P4
)  



