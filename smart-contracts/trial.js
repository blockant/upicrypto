let b = web3.utils.toChecksumAddress("f39f3ca22aa1ec05d2b605edc1a3a745526c0d18893d0f4440c3c147a0d52ed5")
console.log("addr: ", b);
let a = web3.eth.sign("f39f3ca22aa1ec05d2b605edc1a3a745526c0d18893d0f4440c3c147a0d52ed5", 0xca591c479d294cec4f7b82209c66d2092497d33ee2ea244a812ce24e62e82664)
console.log("Sign:", a)

ethSignedHash: 0x1f6fbcff85a0bf921d454840d794c2bc3542ab3ac13f07ed801874ea76abe9ad